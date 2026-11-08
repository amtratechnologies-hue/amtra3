import { validationResult } from 'express-validator';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import ApiError from '../utils/ApiError.js';

export function validateRequest(req, _res, next) {
  const result = validationResult(req);

  if (result.isEmpty()) {
    next();
    return;
  }

  const details = result.array({ onlyFirstError: true }).map((error) => ({
    field: error.path,
    message: error.msg,
  }));

  next(
    new ApiError(
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      'Please correct the highlighted fields.',
      details,
    ),
  );
}
