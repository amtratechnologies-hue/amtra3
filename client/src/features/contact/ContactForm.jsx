import { useEffect } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import Button from '../../components/ui/Button';
import { cn } from '../../utils/cn';
import { CONTACT_LIMITS } from '../../utils/validation';
import { useContactForm } from './useContactForm';

const inputBase =
  'w-full rounded-lg border bg-white px-4 py-3 text-sm text-navy-950 shadow-sm transition placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-50';

function Field({ id, label, error, hint, className, children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-navy-900">
        {label}
        <span className="ml-0.5 text-red-500" aria-hidden="true">
          *
        </span>
        <span className="sr-only"> (required)</span>
      </label>

      {children}

      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function ContactForm() {
  const {
    values,
    errors,
    status,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useContactForm();

  useEffect(() => {
    const firstInvalidField = Object.keys(errors)[0];

    if (firstInvalidField) {
      document.getElementById(`contact-${firstInvalidField}`)?.focus();
    }
  }, [errors]);

  const inputClass = (field) =>
    cn(
      inputBase,
      errors[field]
        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
        : 'border-slate-300 focus:border-accent-500 focus:ring-accent-500/20',
    );

  const describedBy = (field, hint) => {
    const ids = [];
    if (hint) ids.push(`contact-${field}-hint`);
    if (errors[field]) ids.push(`contact-${field}-error`);
    return ids.length > 0 ? ids.join(' ') : undefined;
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      {status.type !== 'idle' ? (
        <div
          role={status.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
          className={cn(
            'mb-6 flex items-start gap-3 rounded-lg border p-4 text-sm',
            status.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-red-200 bg-red-50 text-red-700',
          )}
        >
          {status.type === 'success' ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          ) : (
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          )}
          <p>{status.message}</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Name" error={errors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={CONTACT_LIMITS.name.max}
            value={values.name}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            className={inputClass('name')}
          />
        </Field>

        <Field id="contact-email" label="Email" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={CONTACT_LIMITS.email.max}
            value={values.email}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            className={inputClass('email')}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="contact-subject" label="Subject" error={errors.subject}>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            required
            maxLength={CONTACT_LIMITS.subject.max}
            value={values.subject}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="What would you like to discuss?"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={describedBy('subject')}
            className={inputClass('subject')}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field
          id="contact-message"
          label="Message"
          error={errors.message}
          hint={`Please include at least ${CONTACT_LIMITS.message.min} characters.`}
        >
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            required
            maxLength={CONTACT_LIMITS.message.max}
            value={values.message}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="Tell us about your project, goals, and timeline."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy('message', true)}
            className={cn(inputClass('message'), 'resize-y')}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-slate-500">
          We use your details only to respond to this inquiry.
        </p>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Send message
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
