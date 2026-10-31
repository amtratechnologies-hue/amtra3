import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { corsMiddleware } from './middlewares/cors.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { apiLimiter } from './middlewares/rateLimiter.js';
import { createApiRouter } from './routes/index.js';
import { contactService as defaultContactService } from './services/contact.service.js';

export function createApp({
  contactService = defaultContactService,
  enableRateLimit = true,
} = {}) {
  const app = express();

  app.disable('x-powered-by');

  if (env.trustProxy) {
    app.set('trust proxy', 1);
  }

  app.use(helmet());
  app.use(corsMiddleware);
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: false, limit: '10kb' }));

  if (enableRateLimit) {
    app.use('/api', apiLimiter);
  }

  app.use(
    '/api/v1',
    createApiRouter({ contactService, enableRateLimit }),
  );

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
