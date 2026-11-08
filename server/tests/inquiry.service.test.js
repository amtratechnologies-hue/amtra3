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
  sendAcknowledgement: true,
};

function createCollectingMailer() {
  const messages = [];

  return {
    messages,
    async send(message) {
      messages.push(message);
      return { id: `email_${messages.length}` };
    },
  };
}

test('sends the internal inquiry email with the correct recipient and Reply-To', async () => {
  const mailer = createCollectingMailer();
  const service = createContactService({
    mailer,
    config,
    now: () => new Date('2026-01-01T10:00:00.000Z'),
  });

  const result = await service.submit(inquiry);

  assert.equal(mailer.messages.length, 2);

  const internal = mailer.messages[0];
  assert.equal(internal.to, 'private-inbox@example.com');
  assert.equal(internal.replyTo, 'ada@example.com');
  assert.equal(
    internal.subject,
    'New Project Inquiry \u2013 Web Development \u2013 Ada Lovelace',
  );
  assert.match(internal.text, /NEW CLIENT PROJECT INQUIRY/);
  assert.match(internal.text, /Service Required: Web Development/);
  assert.match(internal.text, /Project Budget: \$1,000 \u2013 \$3,000/);

  assert.equal(result.id, 'email_1');
  assert.equal(result.receivedAt, '2026-01-01T10:00:00.000Z');
  assert.equal(result.acknowledgementSent, true);
});

test('escapes user values in the HTML email body', async () => {
  const mailer = createCollectingMailer();
  const service = createContactService({ mailer, config });

  await service.submit(inquiry);

  const internal = mailer.messages[0];

  assert.equal(internal.html.includes('<script>alert(1)</script>'), false);
  assert.match(internal.html, /Acme &amp; Sons &lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(internal.html, /white-space:pre-wrap/);
});

test('removes line breaks from values used in the email subject', async () => {
  const mailer = createCollectingMailer();
  const service = createContactService({ mailer, config });

  await service.submit({
    ...inquiry,
    fullName: 'Eve\r\nBcc: attacker@example.com',
  });

  const internal = mailer.messages[0];

  assert.equal(internal.subject.includes('\r'), false);
  assert.equal(internal.subject.includes('\n'), false);
  assert.match(
    internal.subject,
    /New Project Inquiry \u2013 Web Development \u2013 Eve Bcc: attacker@example.com/,
  );
});

test('sends a client acknowledgement after the internal email succeeds', async () => {
  const mailer = createCollectingMailer();
  const service = createContactService({ mailer, config });

  await service.submit(inquiry);

  const acknowledgement = mailer.messages[1];

  assert.equal(acknowledgement.to, 'ada@example.com');
  assert.equal(
    acknowledgement.subject,
    'Thank You for Contacting AMTRA Technologies',
  );
  assert.equal(acknowledgement.replyTo, 'amtratechnologies@gmail.com');
  assert.match(acknowledgement.text, /Dear Ada Lovelace/);
  assert.match(acknowledgement.text, /regarding Web Development/);
  assert.equal(acknowledgement.html.includes('private-inbox@example.com'), false);
  assert.equal(acknowledgement.text.includes('private-inbox@example.com'), false);
});

test('skips the acknowledgement when it is disabled', async () => {
  const mailer = createCollectingMailer();
  const service = createContactService({
    mailer,
    config: { ...config, sendAcknowledgement: false },
  });

  const result = await service.submit(inquiry);

  assert.equal(mailer.messages.length, 1);
  assert.equal(result.acknowledgementSent, false);
});

test('a failed acknowledgement does not fail a delivered inquiry', async () => {
  const messages = [];
  const mailer = {
    async send(message) {
      messages.push(message);

      if (messages.length === 2) {
        throw new Error('acknowledgement rejected');
      }

      return { id: 'email_1' };
    },
  };

  const service = createContactService({ mailer, config });
  const result = await service.submit(inquiry);

  assert.equal(messages.length, 2);
  assert.equal(result.acknowledgementSent, false);
  assert.equal(result.id, 'email_1');
});

test('returns a 503 configuration error when email is not configured', async () => {
  const mailer = createCollectingMailer();
  const service = createContactService({
    mailer,
    config: { ...config, smtpUser: '', smtpPass: '' },
  });

  await assert.rejects(
    () => service.submit(inquiry),
    (error) => {
      assert.equal(error.statusCode, 503);
      assert.match(error.message, /not available right now/i);
      assert.match(error.message, /amtratechnologies@gmail\.com/);
      return true;
    },
  );

  assert.equal(mailer.messages.length, 0);
});

test('returns a safe 502 error when the provider rejects the email', async () => {
  const mailer = {
    async send() {
      throw new Error('SMTP rejected the message: secret-provider-detail');
    },
  };

  const service = createContactService({ mailer, config });

  await assert.rejects(
    () => service.submit(inquiry),
    (error) => {
      assert.equal(error.statusCode, 502);
      assert.equal(
        error.message,
        'We could not send your project inquiry right now. Please try again in a moment or email us directly at amtratechnologies@gmail.com.',
      );
      assert.equal(error.message.includes('secret-provider-detail'), false);
      return true;
    },
  );
});
