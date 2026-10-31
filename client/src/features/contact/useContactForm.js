import { useState } from 'react';
import { submitContactMessage } from '../../services/contactService';
import { validateContactForm } from '../../utils/validation';

const INITIAL_VALUES = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function useContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((current) => ({ ...current, [name]: value }));

    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const next = { ...current };
      delete next[name];
      return next;
    });

    setStatus((current) =>
      current.type === 'idle' ? current : { type: 'idle', message: '' },
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validationErrors = validateContactForm(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({
        type: 'error',
        message: 'Please correct the highlighted fields and try again.',
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setStatus({ type: 'idle', message: '' });

    try {
      await submitContactMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      });

      setValues(INITIAL_VALUES);
      setStatus({
        type: 'success',
        message:
          'Thank you — your message has been received. We will reply using the details you provided.',
      });
    } catch (error) {
      if (Array.isArray(error.details) && error.details.length > 0) {
        const serverFieldErrors = Object.fromEntries(
          error.details
            .filter((detail) => detail.field && detail.message)
            .map((detail) => [detail.field, detail.message]),
        );

        if (Object.keys(serverFieldErrors).length > 0) {
          setErrors(serverFieldErrors);
        }
      }

      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    values,
    errors,
    status,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
