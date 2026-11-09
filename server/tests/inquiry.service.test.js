import assert from 'node:assert/strict';
import test from 'node:test';
import { createContactService } from '../src/services/contact.service.js';

const inquiry = {
  fullName: 'Ada Lovelace',
  email: 'ada@example.com',
  phone: '+92 300 1234567',
  company: 'Acme & Sons <script>alert(1)</script>',
  country: 'Pakistan',
  service: 'Web Development',
  budget: '$1,000 \u2013 $3,000',
  timeline: '1\u20133 Months',
  description: 'Build a web application.\r\nIt should support our field team.',
  contactMethod: 'Email',
};

const config = {
  smtpHost: 'smtp.gmail.com',
  smtpPort: 587,
  smtpSecure: false,
  smtpUser: 'amtratechnologies@gmail.com',
  smtpPass: 'test-app-password',
  publicEmail: 'amtratechnologies@gmail.com',
  receiverEmail: 'private-inbox@example.com',
};

function createMemoryRepository() {
  const items = [];

  return {
    items,
    async create(data) {
      const document = {
        _id: `req_${items.length + 1}`,
        ...data,
        createdAt: new Date('2026-01-01T10:00:00.000Z'),
        notificationStatus: 'pending',
      };

      items.push(document);
      return document;
    },
    async markNotificationStatus(id, status) {
      const item = items.find((entry) => entry._id === id);

      if (item) {
        item.notificationStatus = status;
      }
    },
  };
}

function createCollectingMailer({ fail = false } = {}) {
  const messages = [];

  return {
    messages,
    async send(message) {
      messages.push(message);

      if (fail) {
        throw new Error('SMTP rejected: secret-provider-detail');
      }

      return { id: `email_${messages.length}` };
    },
  };
}

test('saves the request before sending the administrator notification', async () => {
  const repository = createMemoryRepository();
  let savedBeforeSend = false;

  const mailer = {
    messages: [],
    async send(message) {
      savedBeforeSend = repository.items.length === 1;
      this.messages.push(message);
      return { id: 'email_1' };
    },
  };

  const service = createContactService({
    repository,
    mailer,
    config,
    now: () => new Date('2026-01-01T10:00:00.000Z'),
  });

  const result = await service.submit(inquiry);

  assert.equal(savedBeforeSend, true);
  assert.equal(repository.items.length, 1);
  assert.equal(result.id, 'req_1');
  assert.equal(result.receivedAt, '2026-01-01T10:00:00.000Z');
  assert.equal(result.notificationSent, true);
  assert.equal(repository.items[0].notificationStatus, 'sent');
});

test('sends one notification to the administrator with the required subject', async () => {
  const repository = createMemoryRepository();
  const mailer = createCollectingMailer();
  const service = createContactService({ repository, mailer, config });

  await service.submit(inquiry);

  assert.equal(mailer.messages.length, 1, 'no client acknowledgement is sent');

  const notification = mailer.messages[0];

  assert.equal(notification.to, 'private-inbox@example.com');
  assert.equal(notification.replyTo, 'ada@example.com');
  assert.equal(
    notification.subject,
    'New Service Request Received \u2014 AMTRA Technologies',
  );
  assert.match(notification.text, /A new client service request has been submitted/);
  assert.match(notification.text, /Client name: Ada Lovelace/);
  assert.match(notification.text, /Requested service: Web Development/);
  assert.match(notification.text, /Submitted:/);
  assert.match(notification.text, /available in the secure admin panel/);
});

test('does not send the full request body to the client', async () => {
  const repository = createMemoryRepository();
  const mailer = createCollectingMailer();
  const service = createContactService({ repository, mailer, config });

  await service.submit(inquiry);

  assert.equal(mailer.messages.length, 1);
  assert.equal(mailer.messages[0].to, 'private-inbox@example.com');
  assert.equal(mailer.messages[0].text.includes(inquiry.description), false);
  assert.equal(mailer.messages[0].text.includes(inquiry.budget), false);
});

test('escapes user values in the HTML notification', async () => {
  const repository = createMemoryRepository();
  const mailer = createCollectingMailer();
  const service = createContactService({ repository, mailer, config });

  await service.submit({
    ...inquiry,
    fullName: 'Acme & Sons <script>alert(1)</script>',
  });

  const notification = mailer.messages[0];

  assert.equal(notification.html.includes('<script>alert(1)</script>'), false);
  assert.match(notification.html, /Acme &amp; Sons/);
  assert.match(notification.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
});

test('removes line breaks from values used in the email subject', async () => {
  const repository = createMemoryRepository();
  const mailer = createCollectingMailer();
  const service = createContactService({ repository, mailer, config });

  await service.submit({
    ...inquiry,
    fullName: 'Eve\r\nBcc: attacker@example.com',
  });

  const notification = mailer.messages[0];

  assert.equal(notification.subject.includes('\r'), false);
  assert.equal(notification.subject.includes('\n'), false);
  assert.equal(
    notification.subject,
    'New Service Request Received \u2014 AMTRA Technologies',
  );
});

test('keeps the saved request when SMTP delivery fails', async () => {
  const repository = createMemoryRepository();
  const mailer = createCollectingMailer({ fail: true });
  const service = createContactService({ repository, mailer, config });

  const result = await service.submit(inquiry);

  assert.equal(repository.items.length, 1);
  assert.equal(result.notificationSent, false);
  assert.equal(result.id, 'req_1');
  assert.equal(repository.items[0].notificationStatus, 'failed');
});

test('saves the request even when SMTP is not configured', async () => {
  const repository = createMemoryRepository();
  const mailer = createCollectingMailer();
  const service = createContactService({
    repository,
    mailer,
    config: { ...config, smtpUser: '', smtpPass: '' },
  });

  const result = await service.submit(inquiry);

  assert.equal(repository.items.length, 1);
  assert.equal(mailer.messages.length, 0);
  assert.equal(result.notificationSent, false);
  assert.equal(repository.items[0].notificationStatus, 'failed');
});

test('does not leak database errors to the client', async () => {
  const repository = {
    async create() {
      throw new Error('MongoServerError: secret-database-detail');
    },
    async markNotificationStatus() {},
  };

  const service = createContactService({
    repository,
    mailer: createCollectingMailer(),
    config,
  });

  await assert.rejects(
    () => service.submit(inquiry),
    (error) => {
      assert.equal(error.statusCode, 500);
      assert.equal(error.message.includes('secret-database-detail'), false);
      return true;
    },
  );
});
