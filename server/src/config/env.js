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

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  port: toPositiveInt(process.env.PORT, 5000),
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/amtra',
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
});
