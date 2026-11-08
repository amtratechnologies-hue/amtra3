import { HTTP_STATUS } from '../constants/httpStatus.js';
import { errorResponse } from '../utils/apiResponse.js';
import logger from '../utils/logger.js';

function normalizeError(error) {
  if (error.type === 'entity.parse.failed') {
    return {
      status: HTTP_STATUS.BAD_REQUEST,
      message: 'Invalid JSON payload.',
    };
  }

  if (error.type === 'entity.too.large') {
    return {
      status: HTTP_STATUS.PAYLOAD_TOO_LARGE,
      message: 'Request payload is too large.',
    };
  }

  if (error.isOperational) {
    return {
      status: error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: error.message,
      details: error.details,
    };
  }

  return {
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: 'Something went wrong. Please try again later.',
  };
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    next(error);
    return;
  }

  const normalized = normalizeError(error);

  if (normalized.status >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    logger.error('Request failed', {
      method: req.method,
      path: req.originalUrl,
      error: error.stack || error.message,
    });
  }

  res
    .status(normalized.status)
    .json(errorResponse(normalized.message, normalized.details));
}
