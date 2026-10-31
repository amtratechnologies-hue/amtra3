import { createApp } from './app.js';
import { connectDB, disconnectDB } from './config/db.js';
import { env } from './config/env.js';
import logger from './utils/logger.js';

const app = createApp();

async function start() {
  await connectDB();

  const server = app.listen(env.port, () => {
    logger.info(`AMTRA API listening on port ${env.port} (${env.nodeEnv}).`);
  });

  let isShuttingDown = false;

  async function shutdown(signal) {
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
        await disconnectDB();
        process.exit(0);
      } catch (error) {
        logger.error('Error while shutting down.', error);
        process.exit(1);
      }
    });
  }

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

start().catch((error) => {
  logger.error('Failed to start the API.', error);
  process.exit(1);
});
