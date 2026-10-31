export const CONTACT_LIMITS = Object.freeze({
  name: { min: 2, max: 80 },
  email: { max: 254 },
  subject: { min: 3, max: 120 },
  message: { min: 20, max: 2000 },
});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validate the contact form and return a map of field -> message.
 * An empty object means the form is valid.
 */
export function validateContactForm(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length < CONTACT_LIMITS.name.min) {
    errors.name = `Name must be at least ${CONTACT_LIMITS.name.min} characters.`;
  } else if (name.length > CONTACT_LIMITS.name.max) {
    errors.name = `Name must be ${CONTACT_LIMITS.name.max} characters or fewer.`;
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (email.length > CONTACT_LIMITS.email.max) {
    errors.email = 'Please use a shorter email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!subject) {
    errors.subject = 'Please add a subject.';
  } else if (subject.length < CONTACT_LIMITS.subject.min) {
    errors.subject = `Subject must be at least ${CONTACT_LIMITS.subject.min} characters.`;
  } else if (subject.length > CONTACT_LIMITS.subject.max) {
    errors.subject = `Subject must be ${CONTACT_LIMITS.subject.max} characters or fewer.`;
  }

  if (!message) {
    errors.message = 'Please tell us a little about your project.';
  } else if (message.length < CONTACT_LIMITS.message.min) {
    errors.message = `Please provide a little more detail (at least ${CONTACT_LIMITS.message.min} characters).`;
  } else if (message.length > CONTACT_LIMITS.message.max) {
    errors.message = `Message must be ${CONTACT_LIMITS.message.max} characters or fewer.`;
  }

  return errors;
}
