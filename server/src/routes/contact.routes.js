import { Router } from 'express';
import { createContactController } from '../controllers/contact.controller.js';
import { contactLimiter } from '../middlewares/rateLimiter.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { contactValidationRules } from '../validators/contact.validator.js';

export function createContactRouter({
  contactService,
  enableRateLimit = true,
}) {
  const router = Router();
  const controller = createContactController(contactService);

  const handlers = [
    ...(enableRateLimit ? [contactLimiter] : []),
    ...contactValidationRules,
    validateRequest,
    controller.submit,
  ];

  router.post('/', ...handlers);

  return router;
}
