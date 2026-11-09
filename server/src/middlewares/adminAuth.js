import crypto from 'node:crypto';
import { env } from '../config/env.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import ApiError from '../utils/ApiError.js';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

function timingSafeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left ?? ''));
  const rightBuffer = Buffer.from(String(right ?? ''));

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function requireAdmin(req, _res, next) {
  if (!req.session?.admin?.id) {
    next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required.'));
    return;
  }

  next();
}

export function requireCsrf(req, _res, next) {
  if (SAFE_METHODS.has(req.method)) {
    next();
    return;
  }

  const token = req.get('x-csrf-token');
  const expected = req.session?.csrfToken;

  if (!token || !expected || !timingSafeEqual(token, expected)) {
    next(
      new ApiError(
        HTTP_STATUS.FORBIDDEN,
        'Your session could not be verified. Please refresh the page and try again.',
      ),
    );
    return;
  }

  next();
}

export function verifyAdminOrigin(req, _res, next) {
  if (SAFE_METHODS.has(req.method)) {
    next();
    return;
  }

  const origin = req.get('origin');

  if (!origin || env.clientOrigins.includes(origin)) {
    next();
    return;
  }

  next(
    new ApiError(
      HTTP_STATUS.FORBIDDEN,
      'This origin is not allowed to access the admin API.',
    ),
  );
}
