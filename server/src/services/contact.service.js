import { env } from '../config/env.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import ApiError from '../utils/ApiError.js';
import logger from '../utils/logger.js';
import { createSmtpMailer } from './email/smtp.provider.js';
import { buildConfirmationEmail } from './email/templates/confirmationEmail.js';
import { buildInquiryEmail } from './email/templates/inquiryEmail.js';

const DIRECT_CONTACT_MESSAGE =
  'Online project inquiries are not available right now. Please email us directly at amtratechnologies@gmail.com.';

const DELIVERY_FAILURE_MESSAGE =
  'We could not send your project inquiry right now. Please try again in a moment or email us directly at amtratechnologies@gmail.com.';

function resolveConfiguration(overrides = {}) {
  return {
    ...env.email,
    ...overrides,
  };
}

export function createContactService({
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

  const hasRequiredConfiguration = Boolean(
    config.receiverEmail && config.smtpUser && config.smtpPass,
  );

  return {
    async submit(inquiry) {
      if (!hasRequiredConfiguration) {
        throw new ApiError(
          HTTP_STATUS.SERVICE_UNAVAILABLE,
          DIRECT_CONTACT_MESSAGE,
        );
      }

      const submittedAt = now();

      const internalEmail = buildInquiryEmail({
        inquiry: {
          ...inquiry,
          receiverEmail: config.receiverEmail,
        },
        submittedAt,
      });

      let delivery;

      try {
        delivery = await resolvedMailer.send({
          ...internalEmail,
          replyTo: inquiry.email,
        });
      } catch (error) {
        log.error('Inquiry email delivery failed.', {
          reason: error?.message || 'Unknown email error',
        });

        throw new ApiError(HTTP_STATUS.BAD_GATEWAY, DELIVERY_FAILURE_MESSAGE);
      }

      let acknowledgementSent = false;

      if (config.sendAcknowledgement && inquiry.email) {
        try {
          const acknowledgement = buildConfirmationEmail({
            inquiry,
            publicEmail: config.publicEmail,
          });

          await resolvedMailer.send({
            ...acknowledgement,
            replyTo: config.publicEmail,
          });

          acknowledgementSent = true;
        } catch (error) {
          // The inquiry itself was accepted, so the visitor should still see a
          // success state. The acknowledgement is a best-effort follow-up.
          log.error('Client acknowledgement email failed.', {
            reason: error?.message || 'Unknown email error',
          });
        }
      }

      return {
        id: delivery?.id || null,
        receivedAt: submittedAt.toISOString(),
        acknowledgementSent,
      };
    },
  };
}

export const contactService = createContactService();
