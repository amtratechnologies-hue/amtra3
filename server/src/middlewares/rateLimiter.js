import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { errorResponse } from '../utils/apiResponse.js';

function createLimiter({ windowMs, limit }) {
  return rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (_req, res) => {
      res
        .status(HTTP_STATUS.TOO_MANY_REQUESTS)
        .json(errorResponse('Too many requests. Please try again later.'));
    },
  });
}

export const apiLimiter = createLimiter({
  windowMs: env.rateLimit.windowMs,
  limit: env.rateLimit.max,
});

export const contactLimiter = createLimiter({
  windowMs: env.contactRateLimit.windowMs,
  limit: env.contactRateLimit.max,
});
