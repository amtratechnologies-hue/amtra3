import { HTTP_STATUS } from '../constants/httpStatus.js';
import { errorResponse } from '../utils/apiResponse.js';

export function notFoundHandler(req, res) {
  res
    .status(HTTP_STATUS.NOT_FOUND)
    .json(
      errorResponse(
        `Route ${req.method} ${req.originalUrl} was not found.`,
      ),
    );
}
