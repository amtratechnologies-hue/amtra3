import { Router } from 'express';
import { createAdminController } from '../controllers/admin.controller.js';
import { createAdminRequestController } from '../controllers/adminRequest.controller.js';
import {
  requireAdmin,
  requireCsrf,
  verifyAdminOrigin,
} from '../middlewares/adminAuth.js';
import { adminLoginLimiter } from '../middlewares/rateLimiter.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { adminLoginValidationRules } from '../validators/admin.validator.js';

export function createAdminRouter({
  adminAuthService,
  serviceRequestRepository,
  enableRateLimit = true,
}) {
  const router = Router();
  const adminController = createAdminController({ adminAuthService });
  const requestController = createAdminRequestController(
    serviceRequestRepository,
  );

  router.post(
    '/login',
    verifyAdminOrigin,
    ...(enableRateLimit ? [adminLoginLimiter] : []),
    ...adminLoginValidationRules,
    validateRequest,
    adminController.login,
  );

  // Everything below this line requires a valid admin session.
  router.use(requireAdmin);

  router.get('/me', adminController.me);
  router.post('/logout', verifyAdminOrigin, requireCsrf, adminController.logout);
  router.get('/requests', requestController.list);
  router.get('/requests/:id', requestController.detail);

  return router;
}
