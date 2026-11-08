import assert from 'node:assert/strict';
import test from 'node:test';
import { createSmtpMailer } from '../src/services/email/smtp.provider.js';

test('sends through Gmail SMTP with the authenticated account as sender', async () => {
  let transportOptions;
  let sentMessage;

  const mailer = createSmtpMailer({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    user: 'amtratechnologies@gmail.com',
    pass: 'test-app-password',
    transportFactory: (options) => {
      transportOptions = options;

      return {
        async sendMail(message) {
          sentMessage = message;
          return { messageId: '<message-id@example>' };
        },
      };
    },
  });

  const result = await mailer.send({
    to: 'amtratechnologies@gmail.com',
    subject: 'New Project Inquiry',
    html: '<p>Inquiry</p>',
    text: 'Inquiry',
    replyTo: 'ada@example.com',
  });

  assert.equal(transportOptions.host, 'smtp.gmail.com');
  assert.equal(transportOptions.port, 587);
  assert.equal(transportOptions.secure, false);
  assert.equal(transportOptions.auth.user, 'amtratechnologies@gmail.com');
  assert.equal(transportOptions.auth.pass, 'test-app-password');

  assert.equal(sentMessage.from.address, 'amtratechnologies@gmail.com');
  assert.equal(sentMessage.from.name, 'AMTRA Technologies');
  assert.equal(sentMessage.to, 'amtratechnologies@gmail.com');
  assert.equal(sentMessage.replyTo, 'ada@example.com');
  assert.equal(sentMessage.subject, 'New Project Inquiry');
  assert.equal(result.id, '<message-id@example>');
});

test('rejects sending when SMTP credentials are missing', async () => {
  const mailer = createSmtpMailer({
    user: '',
    pass: '',
    transportFactory: () => {
      throw new Error('Transport should not be created without credentials.');
    },
  });

  await assert.rejects(
    () =>
      mailer.send({
        to: 'amtratechnologies@gmail.com',
        subject: 'Test',
        html: '<p>Test</p>',
        text: 'Test',
      }),
    /Missing SMTP configuration/,
  );
});
