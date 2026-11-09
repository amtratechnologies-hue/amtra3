import mongoose from 'mongoose';
import logger from '../utils/logger.js';

/**
 * Connect to MongoDB once at startup. The connection string is never logged
 * because it can contain credentials.
 */
export async function connectToDatabase(uri, { log = logger } = {}) {
  if (!uri) {
    log.error(
      'MONGODB_URI is not set. Service requests cannot be saved and the admin panel will be unavailable.',
    );
    return null;
  }

  mongoose.set('strictQuery', true);

  try {
    const client = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
    });

    log.info(
      `Connected to MongoDB database "${client.connection.name}" (${client.connection.host}).`,
    );

    return client.connection;
  } catch (error) {
    log.error('MongoDB connection failed. Database-backed features are unavailable.', {
      reason: error?.message || 'Unknown MongoDB error',
    });
    return null;
  }
}

export async function disconnectFromDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}
