import { HTTP_STATUS } from '../constants/httpStatus.js';
import ApiError from '../utils/ApiError.js';
import { successResponse } from '../utils/apiResponse.js';
import {
  toRequestDetail,
  toRequestSummary,
} from '../utils/serializers.js';

export function createAdminRequestController(repository) {
  return {
    async list(req, res) {
      const result = await repository.list({
        page: req.query.page,
        limit: req.query.limit,
      });

      const totalPages =
        result.total === 0 ? 0 : Math.ceil(result.total / result.limit);

      res.status(HTTP_STATUS.OK).json(
        successResponse('Service requests retrieved.', {
          items: result.items.map(toRequestSummary),
          pagination: {
            page: result.page,
            limit: result.limit,
            total: result.total,
            totalPages,
          },
        }),
      );
    },

    async detail(req, res) {
      const request = await repository.findById(req.params.id);

      if (!request) {
        throw new ApiError(
          HTTP_STATUS.NOT_FOUND,
          'Service request not found.',
        );
      }

      res.status(HTTP_STATUS.OK).json(
        successResponse('Service request retrieved.', {
          request: toRequestDetail(request),
        }),
      );
    },
  };
}
