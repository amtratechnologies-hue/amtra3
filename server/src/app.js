import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { corsMiddleware } from './middlewares/cors.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { apiLimiter } from './middlewares/rateLimiter.js';
import { getAdminSessionMiddleware } from './middlewares/adminSession.js';
import { adminAuthService as defaultAdminAuthService } from './services/adminAuth.service.js';
import { contactService as defaultContactService } from './services/contact.service.js';
import { serviceRequestRepository as defaultServiceRequestRepository } from './repositories/serviceRequest.repository.js';
import { createApiRouter } from './routes/index.js';

export function createApp({
  contactService = defaultContactService,
  adminAuthService = defaultAdminAuthService,
  serviceRequestRepository = defaultServiceRequestRepository,
  enableRateLimit = true,
  sessionMiddleware = getAdminSessionMiddleware(),
} = {}) {
  const app = express();

  app.disable('x-powered-by');

  if (env.trustProxy) {
    app.set('trust proxy', 1);
  }

  app.use(helmet());
  app.use(corsMiddleware);
  app.use(express.json({ limit: '32kb' }));
  app.use(express.urlencoded({ extended: false, limit: '32kb' }));
  app.use(sessionMiddleware);

  if (enableRateLimit) {
    app.use('/api', apiLimiter);
  }

  app.use(
    '/api/v1',
    createApiRouter({
      contactService,
      adminAuthService,
      serviceRequestRepository,
      enableRateLimit,
    }),
  );

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
