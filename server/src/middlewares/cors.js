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
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  maxAge: 86400,
});
