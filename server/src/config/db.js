import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import { env } from './env.js';

export async function connectDB(uri = env.mongodbUri) {
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
  });

  logger.info('Connected to MongoDB.');
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    logger.info('Disconnected from MongoDB.');
  }
}
