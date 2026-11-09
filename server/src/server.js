import { createApp } from './app.js';
import { connectToDatabase, disconnectFromDatabase } from './config/db.js';
import { env } from './config/env.js';
import { seedAdminIfEnabled } from './services/adminSeed.service.js';
import logger from './utils/logger.js';

const connection = await connectToDatabase(env.mongoUri, {
  dbName: env.mongoDbName,
});

if (connection) {
  try {
    await seedAdminIfEnabled();
  } catch (error) {
    logger.error('Admin seed check failed.', {
      reason: error?.message || 'Unknown error',
    });
  }
}

const app = createApp();

const server = app.listen(env.port, () => {
  logger.info(`AMTRA API listening on port ${env.port} (${env.nodeEnv}).`);

  if (!connection) {
    logger.warn(
      'Service requests cannot be saved until MONGODB_URI is configured and reachable.',
    );
  }

  if (!env.email.smtpUser || !env.email.smtpPass) {
    logger.warn(
      'Email delivery is not configured. Set SMTP_USER and SMTP_PASS in server/.env to enable administrator notifications.',
    );
  }
});

let isShuttingDown = false;

function shutdown(signal) {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  logger.info(`${signal} received. Shutting down gracefully.`);

  const forceExit = setTimeout(() => {
    logger.error('Forced shutdown after timeout.');
    process.exit(1);
  }, 10000);

  forceExit.unref();

  server.close(async () => {
    try {
      await disconnectFromDatabase();
    } finally {
      process.exit(0);
    }
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
