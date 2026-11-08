import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getServiceTitleFromId,
  INITIAL_INQUIRY_VALUES,
} from '../../constants/inquiry';
import { submitProjectInquiry } from '../../services/contactService';
import { validateInquiry } from '../../utils/validation';

function emptyValues() {
  return { ...INITIAL_INQUIRY_VALUES };
}

export function useContactForm() {
  const [searchParams] = useSearchParams();
  const requestedService = getServiceTitleFromId(searchParams.get('service'));

  // Initialise directly from the query string so no state update is needed in
  // an effect. ContactForm is keyed by the service parameter so it remounts
  // when the link changes.
  const [values, setValues] = useState(() => ({
    ...emptyValues(),
    service: requestedService || '',
  }));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);

  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    const nextValue = type === 'checkbox' ? checked : value;

    setValues((current) => ({ ...current, [name]: nextValue }));

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

    if (submittingRef.current) {
      return;
    }

    const validationErrors = validateInquiry(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({
        type: 'error',
        message: 'Please correct the highlighted fields and try again.',
      });
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    setErrors({});
    setStatus({ type: 'idle', message: '' });

    const payload = {
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      company: values.company.trim(),
      country: values.country.trim(),
      service: values.service.trim(),
      budget: values.budget.trim(),
      timeline: values.timeline.trim(),
      description: values.description.trim(),
      contactMethod: values.contactMethod.trim(),
      consent: values.consent === true,
      website: values.website,
    };

    try {
      const response = await submitProjectInquiry(payload);
      const acknowledgementSent = Boolean(
        response?.data?.acknowledgementSent,
      );

      setValues(emptyValues());
      setStatus({
        type: 'success',
        message: acknowledgementSent
          ? 'Thank you. Your project inquiry has been received, and a confirmation email is on its way to the address you provided. Our team will review your requirements and get back to you.'
          : 'Thank you. Your project inquiry has been received. Our team will review your requirements and reply using the contact details you provided.',
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
        message:
          error.message ||
          'We could not send your inquiry. Please try again in a moment.',
      });
    } finally {
      submittingRef.current = false;
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
