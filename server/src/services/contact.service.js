import { env } from '../config/env.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { serviceRequestRepository as defaultRepository } from '../repositories/serviceRequest.repository.js';
import ApiError from '../utils/ApiError.js';
import logger from '../utils/logger.js';
import { createSmtpMailer } from './email/smtp.provider.js';
import { buildAdminNotificationEmail } from './email/templates/adminNotificationEmail.js';

const SAVE_FAILURE_MESSAGE =
  'We could not save your project inquiry right now. Please try again in a moment or email us directly at amtratechnologies@gmail.com.';

function resolveConfiguration(overrides = {}) {
  return {
    ...env.email,
    ...overrides,
  };
}

/**
 * Persist a service request first, then send a best-effort notification to the
 * administrator. Email failures never remove or hide a saved request.
 */
export function createContactService({
  repository = defaultRepository,
  mailer,
  config: configOverrides,
  now = () => new Date(),
  log = logger,
} = {}) {
  const config = resolveConfiguration(configOverrides);

  const resolvedMailer =
    mailer ??
    createSmtpMailer({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpSecure,
      user: config.smtpUser,
      pass: config.smtpPass,
    });

  const canNotify = Boolean(
    config.receiverEmail && config.smtpUser && config.smtpPass,
  );

  return {
    async submit(inquiry) {
      const payload = {
        fullName: inquiry.fullName,
        email: inquiry.email,
        phone: inquiry.phone || '',
        company: inquiry.company || '',
        country: inquiry.country || '',
        service: inquiry.service,
        budget: inquiry.budget || '',
        timeline: inquiry.timeline || '',
        description: inquiry.description,
        contactMethod: inquiry.contactMethod || '',
      };

      let saved;

      try {
        saved = await repository.create(payload);
      } catch (error) {
        if (error?.isOperational) {
          throw error;
        }

        log.error('Service request could not be saved.', {
          reason: error?.message || 'Unknown database error',
        });

        throw new ApiError(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          SAVE_FAILURE_MESSAGE,
        );
      }

      const submittedAt = saved?.createdAt ? new Date(saved.createdAt) : now();
      const requestId = String(saved?._id ?? '');

      if (!canNotify) {
        log.warn(
          'SMTP is not configured. The service request was saved without an email notification.',
          { requestId },
        );

        try {
          await repository.markNotificationStatus(requestId, 'failed');
        } catch {
          // The request is already saved; notification bookkeeping is optional.
        }

        return {
          id: requestId,
          receivedAt: submittedAt.toISOString(),
          notificationSent: false,
        };
      }

      let notificationSent = false;

      try {
        const notification = buildAdminNotificationEmail({
          request: saved,
          submittedAt,
          receiverEmail: config.receiverEmail,
        });

        await resolvedMailer.send({
          ...notification,
          replyTo: saved?.email || inquiry.email,
        });

        notificationSent = true;

        try {
          await repository.markNotificationStatus(requestId, 'sent');
        } catch {
          // Bookkeeping only.
        }
      } catch (error) {
        log.error('Service request notification email failed.', {
          requestId,
          reason: error?.message || 'Unknown email error',
        });

        try {
          await repository.markNotificationStatus(requestId, 'failed');
        } catch {
          // Bookkeeping only.
        }
      }

      return {
        id: requestId,
        receivedAt: submittedAt.toISOString(),
        notificationSent,
      };
    },
  };
}

export const contactService = createContactService();
