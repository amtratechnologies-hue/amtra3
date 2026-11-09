import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { errorResponse } from '../utils/apiResponse.js';

/**
 * express-rate-limit writes the Retry-After header before calling the handler
 * when standard headers are enabled, so the handler can reuse the same value
 * in the JSON message.
 */
function retryAfterSeconds(res) {
  const header = res.getHeader('Retry-After');
  const value = Array.isArray(header) ? header[0] : header;
  const seconds = Number.parseInt(value, 10);

  return Number.isFinite(seconds) && seconds > 0 ? seconds : null;
}

function formatRetryHint(seconds) {
  if (!seconds) {
    return ' Please try again later.';
  }

  if (seconds < 60) {
    return ` Please try again in ${seconds} second${seconds === 1 ? '' : 's'}.`;
  }

  const minutes = Math.ceil(seconds / 60);

  return ` Please try again in about ${minutes} minute${minutes === 1 ? '' : 's'}.`;
}

/**
 * Both limiters use the default in-memory store. Counters are per backend
 * process, so restarting the API resets them. For a multi-instance deployment,
 * replace the store with a shared one (for example Redis).
 */
function createLimiter({
  windowMs,
  limit,
  message,
  skipSuccessfulRequests = false,
}) {
  return rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    // Contact submissions count every attempt, including failed validation and
    // SMTP failures. Login attempts only count failures so a legitimate admin
    // is not locked out after repeated successful sign-ins.
    skipSuccessfulRequests,
    skipFailedRequests: false,
    handler: (_req, res) => {
      res
        .status(HTTP_STATUS.TOO_MANY_REQUESTS)
        .json(
          errorResponse(
            `${message}${formatRetryHint(retryAfterSeconds(res))}`,
          ),
        );
    },
  });
}

export const apiLimiter = createLimiter({
  windowMs: env.rateLimit.windowMs,
  limit: env.rateLimit.max,
  message: 'Too many requests to the API.',
});

export const contactLimiter = createLimiter({
  windowMs: env.contactRateLimit.windowMs,
  limit: env.contactRateLimit.max,
  message: 'Too many project inquiry attempts from this connection.',
});

export const adminLoginLimiter = createLimiter({
  windowMs: env.admin.loginRateLimit.windowMs,
  limit: env.admin.loginRateLimit.max,
  message: 'Too many admin sign-in attempts.',
  skipSuccessfulRequests: true,
});
