import { Router } from 'express';
import { createContactRouter } from './contact.routes.js';
import { healthRouter } from './health.routes.js';

export function createApiRouter({ contactService, enableRateLimit = true }) {
  const router = Router();

  router.use('/health', healthRouter);
  router.use(
    '/contact',
    createContactRouter({ contactService, enableRateLimit }),
  );

  return router;
}
