import dotenv from 'dotenv';

dotenv.config({ quiet: true });

function toPositiveInt(value, fallback) {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseOrigins(value) {
  return (value || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function toBoolean(value, fallback = false) {
  if (value === undefined || value === '') {
    return fallback;
  }

  return String(value).trim().toLowerCase() === 'true';
}

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  port: toPositiveInt(process.env.PORT, 5000),
  clientOrigins: parseOrigins(process.env.CLIENT_ORIGINS),
  trustProxy: process.env.TRUST_PROXY === 'true',
  rateLimit: {
    windowMs: toPositiveInt(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
    max: toPositiveInt(process.env.RATE_LIMIT_MAX, 300),
  },
  contactRateLimit: {
    windowMs: toPositiveInt(
      process.env.CONTACT_RATE_LIMIT_WINDOW_MS,
      15 * 60 * 1000,
    ),
    max: toPositiveInt(process.env.CONTACT_RATE_LIMIT_MAX, 5),
  },
  email: Object.freeze({
    smtpHost: (process.env.SMTP_HOST || 'smtp.gmail.com').trim(),
    smtpPort: toPositiveInt(process.env.SMTP_PORT, 587),
    smtpSecure: toBoolean(process.env.SMTP_SECURE, false),
    smtpUser: (process.env.SMTP_USER || '').trim(),
    smtpPass: (process.env.SMTP_PASS || '').trim(),
    // Public address shown to visitors and used in client-facing emails.
    publicEmail: (
      process.env.CONTACT_PUBLIC_EMAIL || 'amtratechnologies@gmail.com'
    ).trim(),
    // Private inbox that receives project inquiries. Server-side only; never
    // expose this address in the frontend or in client-facing emails.
    receiverEmail: (
      process.env.CONTACT_RECEIVER_EMAIL ||
      'alirazachakrani090@gmail.com'
    ).trim(),
    sendAcknowledgement: process.env.CONTACT_SEND_ACKNOWLEDGEMENT !== 'false',
  }),
});
