import nodemailer from 'nodemailer';

/**
 * Gmail SMTP provider adapter built on Nodemailer.
 *
 * The authenticated Gmail account (SMTP_USER) is always the sender. The
 * visitor's address is passed only as Reply-To, so the message is not spoofed.
 * Credentials stay on the server and are never logged.
 */
export function createSmtpMailer({
  host = 'smtp.gmail.com',
  port = 587,
  secure = false,
  user,
  pass,
  transportFactory = nodemailer.createTransport,
} = {}) {
  let transporter;

  function getTransporter() {
    if (!transporter) {
      transporter = transportFactory({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        },
        connectionTimeout: 15000,
        greetingTimeout: 10000,
        socketTimeout: 20000,
        tls: {
          minVersion: 'TLSv1.2',
        },
      });
    }

    return transporter;
  }

  return {
    async send({ to, subject, html, text, replyTo }) {
      if (!host || !user || !pass) {
        throw new Error('Missing SMTP configuration.');
      }

      const info = await getTransporter().sendMail({
        from: {
          name: 'AMTRA Technologies',
          address: user,
        },
        to,
        subject,
        html,
        text,
        replyTo,
      });

      return { id: info?.messageId || null };
    },
  };
}
