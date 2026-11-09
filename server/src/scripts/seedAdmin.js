import { connectToDatabase, disconnectFromDatabase } from '../config/db.js';
import { env } from '../config/env.js';
import { seedAdminIfEnabled } from '../services/adminSeed.service.js';
import logger from '../utils/logger.js';

async function main() {
  if (!env.mongoUri) {
    logger.error('MONGODB_URI is not set. The admin seed cannot run.');
    process.exitCode = 1;
    return;
  }

  const connection = await connectToDatabase(env.mongoUri);

  if (!connection) {
    process.exitCode = 1;
    return;
  }

  try {
    const result = await seedAdminIfEnabled();

    if (result.reason === 'disabled') {
      logger.info(
        'ADMIN_SEED_ENABLED is false. Set it to true to create the initial administrator, then set it back to false.',
      );
    } else if (result.reason === 'exists') {
      logger.info(
        'An administrator account already exists. No changes were made.',
      );
    } else if (result.reason === 'created') {
      logger.info('Administrator seed completed.');
    } else {
      process.exitCode = 1;
    }
  } finally {
    await disconnectFromDatabase();
  }
}

main().catch((error) => {
  logger.error('Admin seed failed.', {
    reason: error?.message || 'Unknown error',
  });
  process.exitCode = 1;
});
