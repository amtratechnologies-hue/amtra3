import { createApp } from './app.js';
import { env } from './config/env.js';
import logger from './utils/logger.js';

const app = createApp();

const server = app.listen(env.port, () => {
  logger.info(`AMTRA API listening on port ${env.port} (${env.nodeEnv}).`);

  if (!env.email.smtpUser || !env.email.smtpPass) {
    logger.warn(
      'Email delivery is not configured. Set SMTP_USER and SMTP_PASS in server/.env to enable project inquiries.',
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

  server.close(() => {
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
