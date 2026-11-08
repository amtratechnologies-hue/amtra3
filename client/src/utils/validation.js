import {
  BUDGET_OPTIONS,
  CONTACT_METHOD_OPTIONS,
  INQUIRY_LIMITS,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
} from '../constants/inquiry';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s().-]{6,30}$/;

/**
 * Validate the project inquiry form and return a map of field -> message.
 * An empty object means the form is valid.
 */
export function validateInquiry(values) {
  const errors = {};
  const fullName = String(values.fullName ?? '').trim();
  const email = String(values.email ?? '').trim();
  const phone = String(values.phone ?? '').trim();
  const company = String(values.company ?? '').trim();
  const country = String(values.country ?? '').trim();
  const service = String(values.service ?? '').trim();
  const budget = String(values.budget ?? '').trim();
  const timeline = String(values.timeline ?? '').trim();
  const description = String(values.description ?? '').trim();
  const contactMethod = String(values.contactMethod ?? '').trim();

  if (!fullName) {
    errors.fullName = 'Please enter your full name.';
  } else if (fullName.length < INQUIRY_LIMITS.fullName.min) {
    errors.fullName = `Full name must be at least ${INQUIRY_LIMITS.fullName.min} characters.`;
  } else if (fullName.length > INQUIRY_LIMITS.fullName.max) {
    errors.fullName = `Full name must be ${INQUIRY_LIMITS.fullName.max} characters or fewer.`;
  }

  if (!email) {
    errors.email = 'Please enter your business email address.';
  } else if (email.length > INQUIRY_LIMITS.email.max) {
    errors.email = 'Please use a shorter email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (phone) {
    if (phone.length > INQUIRY_LIMITS.phone.max) {
      errors.phone = `Phone number must be ${INQUIRY_LIMITS.phone.max} characters or fewer.`;
    } else if (!PHONE_PATTERN.test(phone)) {
      errors.phone =
        'Please enter a valid phone number, including the country code.';
    }
  }

  if (company.length > INQUIRY_LIMITS.company.max) {
    errors.company = `Company name must be ${INQUIRY_LIMITS.company.max} characters or fewer.`;
  }

  if (country.length > INQUIRY_LIMITS.country.max) {
    errors.country = `Country must be ${INQUIRY_LIMITS.country.max} characters or fewer.`;
  }

  if (!service) {
    errors.service = 'Please select the service you need.';
  } else if (!SERVICE_OPTIONS.includes(service)) {
    errors.service = 'Please select a valid service.';
  }

  if (budget && !BUDGET_OPTIONS.includes(budget)) {
    errors.budget = 'Please select a valid budget range.';
  }

  if (timeline && !TIMELINE_OPTIONS.includes(timeline)) {
    errors.timeline = 'Please select a valid timeline.';
  }

  if (!description) {
    errors.description = 'Please describe your project.';
  } else if (description.length < INQUIRY_LIMITS.description.min) {
    errors.description = `Please provide at least ${INQUIRY_LIMITS.description.min} characters so we can understand your requirements.`;
  } else if (description.length > INQUIRY_LIMITS.description.max) {
    errors.description = `Project description must be ${INQUIRY_LIMITS.description.max.toLocaleString('en-US')} characters or fewer.`;
  }

  if (contactMethod && !CONTACT_METHOD_OPTIONS.includes(contactMethod)) {
    errors.contactMethod = 'Please select a valid contact method.';
  }

  if (values.consent !== true) {
    errors.consent =
      'Please confirm that AMTRA Technologies may contact you about your inquiry.';
  }

  return errors;
}
