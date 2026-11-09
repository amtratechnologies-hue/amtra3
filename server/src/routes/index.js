import { Router } from 'express';
import { createAdminRouter } from './admin.routes.js';
import { createContactRouter } from './contact.routes.js';
import { healthRouter } from './health.routes.js';

export function createApiRouter({
  contactService,
  adminAuthService,
  serviceRequestRepository,
  enableRateLimit = true,
}) {
  const router = Router();

  router.use('/health', healthRouter);
  router.use(
    '/contact',
    createContactRouter({ contactService, enableRateLimit }),
  );
  router.use(
    '/admin',
    createAdminRouter({
      adminAuthService,
      serviceRequestRepository,
      enableRateLimit,
    }),
  );

  return router;
}
