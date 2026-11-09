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

function toSameSite(value, fallback = 'lax') {
  const normalized = String(value ?? '').trim().toLowerCase();
  return ['lax', 'strict', 'none'].includes(normalized) ? normalized : fallback;
}

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const adminCookieSameSite = toSameSite(
  process.env.ADMIN_COOKIE_SAME_SITE,
  'lax',
);

export const env = Object.freeze({
  nodeEnv,
  isProduction,
  port: toPositiveInt(process.env.PORT, 5000),
  clientOrigins: parseOrigins(process.env.CLIENT_ORIGINS),
  trustProxy: process.env.TRUST_PROXY === 'true',
  // MongoDB connection string. Requests cannot be persisted without it.
  mongoUri: (process.env.MONGODB_URI || '').trim(),
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
  admin: Object.freeze({
    username: (process.env.ADMIN_USERNAME || '').trim(),
    initialPassword: process.env.ADMIN_INITIAL_PASSWORD || '',
    seedEnabled: toBoolean(process.env.ADMIN_SEED_ENABLED, false),
    sessionSecret: process.env.SESSION_SECRET || '',
    sessionTtlMs: toPositiveInt(
      process.env.ADMIN_SESSION_TTL_MS,
      8 * 60 * 60 * 1000,
    ),
    cookieName: (process.env.ADMIN_COOKIE_NAME || 'amtra_admin_sid').trim(),
    // The session cookie is only sent to admin API routes.
    cookiePath: (process.env.ADMIN_COOKIE_PATH || '/api/v1/admin').trim(),
    cookieSameSite: adminCookieSameSite,
    // Production cookies are always Secure. Outside production an explicit
    // value may be used, and SameSite=None still requires Secure.
    cookieSecure: isProduction
      ? true
      : toBoolean(process.env.ADMIN_COOKIE_SECURE, adminCookieSameSite === 'none'),
    loginRateLimit: {
      windowMs: toPositiveInt(
        process.env.ADMIN_LOGIN_RATE_LIMIT_WINDOW_MS,
        15 * 60 * 1000,
      ),
      max: toPositiveInt(process.env.ADMIN_LOGIN_RATE_LIMIT_MAX, 10),
    },
  }),
  email: Object.freeze({
    smtpHost: (process.env.SMTP_HOST || 'smtp.gmail.com').trim(),
    smtpPort: toPositiveInt(process.env.SMTP_PORT, 587),
    smtpSecure: toBoolean(process.env.SMTP_SECURE, false),
    smtpUser: (process.env.SMTP_USER || '').trim(),
    smtpPass: (process.env.SMTP_PASS || '').trim(),
    // Public address shown to visitors.
    publicEmail: (
      process.env.CONTACT_PUBLIC_EMAIL || 'amtratechnologies@gmail.com'
    ).trim(),
    // Inbox that receives new-request notifications. Server-side only.
    receiverEmail: (
      process.env.CONTACT_RECEIVER_EMAIL || 'amtratechnologies@gmail.com'
    ).trim(),
  }),
});
