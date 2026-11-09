import mongoose from 'mongoose';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import ApiError from './ApiError.js';

export const DATABASE_UNAVAILABLE_MESSAGE =
  'The database is temporarily unavailable. Please try again in a moment.';

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

/**
 * Fail fast with an operational 503 instead of letting Mongoose buffer
 * queries for 10 seconds when the database is unreachable.
 */
export function assertDatabaseConnected(
  message = DATABASE_UNAVAILABLE_MESSAGE,
) {
  if (!isDatabaseConnected()) {
    throw new ApiError(HTTP_STATUS.SERVICE_UNAVAILABLE, message);
  }
}
