import { env } from '../config/env.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { successResponse } from '../utils/apiResponse.js';

export function getHealth(_req, res) {
  res.status(HTTP_STATUS.OK).json(
    successResponse('API is healthy.', {
      status: 'ok',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      environment: env.nodeEnv,
    }),
  );
}
