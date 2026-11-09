import cors from 'cors';
import { env } from '../config/env.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import ApiError from '../utils/ApiError.js';

export const corsMiddleware = cors({
  origin(origin, callback) {
    if (!origin || env.clientOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(
      new ApiError(
        HTTP_STATUS.FORBIDDEN,
        'This origin is not allowed to access the API.',
      ),
    );
  },
  // Admin sessions use an HTTP-only cookie, so credentialed requests must be
  // explicitly allowed. Origins are still restricted to the allow-list above.
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'X-CSRF-Token'],
  maxAge: 86400,
});
