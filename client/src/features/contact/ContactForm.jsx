import { useEffect } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import Button from '../../components/ui/Button';
import {
  BUDGET_OPTIONS,
  CONTACT_METHOD_OPTIONS,
  INQUIRY_LIMITS,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
} from '../../constants/inquiry';
import { cn } from '../../utils/cn';
import { useContactForm } from './useContactForm';

const inputBase =
  'w-full rounded-lg border bg-white px-4 py-3 text-sm text-navy-950 shadow-sm transition placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-50';

function Field({
  id,
  label,
  error,
  hint,
  required = false,
  className,
  children,
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-navy-900">
        {label}
        {required ? (
          <>
            <span className="ml-0.5 text-red-500" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : (
          <span className="ml-1 text-xs font-normal text-slate-500">
            (optional)
          </span>
        )}
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
    const firstInvalidField = Object.keys(errors).find(
      (field) => field !== 'website',
    );

    if (firstInvalidField) {
      document.getElementById(`inquiry-${firstInvalidField}`)?.focus();
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
    if (hint) ids.push(`inquiry-${field}-hint`);
    if (errors[field]) ids.push(`inquiry-${field}-error`);
    return ids.length > 0 ? ids.join(' ') : undefined;
  };

  const fieldProps = (field, hint) => ({
    id: `inquiry-${field}`,
    name: field,
    value: values[field],
    onChange: handleChange,
    disabled: isSubmitting,
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': describedBy(field, hint),
    className: inputClass(field),
  });

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
          <p className="leading-6">{status.message}</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="inquiry-fullName"
          label="Full Name"
          error={errors.fullName}
          required
        >
          <input
            {...fieldProps('fullName')}
            id="inquiry-fullName"
            type="text"
            autoComplete="name"
            required
            maxLength={INQUIRY_LIMITS.fullName.max}
            placeholder="Your full name"
          />
        </Field>

        <Field
          id="inquiry-email"
          label="Business Email"
          error={errors.email}
          required
        >
          <input
            {...fieldProps('email')}
            id="inquiry-email"
            type="email"
            autoComplete="email"
            required
            maxLength={INQUIRY_LIMITS.email.max}
            placeholder="you@company.com"
          />
        </Field>

        <Field
          id="inquiry-phone"
          label="Phone / WhatsApp"
          error={errors.phone}
          hint="Include your country code, for example +92 300 1234567."
        >
          <input
            {...fieldProps('phone', true)}
            id="inquiry-phone"
            type="tel"
            autoComplete="tel"
            maxLength={INQUIRY_LIMITS.phone.max}
            placeholder="+92 300 1234567"
          />
        </Field>

        <Field
          id="inquiry-company"
          label="Company Name"
          error={errors.company}
        >
          <input
            {...fieldProps('company')}
            id="inquiry-company"
            type="text"
            autoComplete="organization"
            maxLength={INQUIRY_LIMITS.company.max}
            placeholder="Your company or organization"
          />
        </Field>

        <Field id="inquiry-country" label="Country" error={errors.country}>
          <input
            {...fieldProps('country')}
            id="inquiry-country"
            type="text"
            autoComplete="country-name"
            maxLength={INQUIRY_LIMITS.country.max}
            placeholder="Pakistan"
          />
        </Field>

        <Field
          id="inquiry-service"
          label="Service Required"
          error={errors.service}
          required
        >
          <select
            {...fieldProps('service')}
            id="inquiry-service"
            required
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id="inquiry-budget" label="Project Budget" error={errors.budget}>
          <select {...fieldProps('budget')} id="inquiry-budget">
            <option value="">Select a budget range</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="inquiry-timeline"
          label="Expected Project Timeline"
          error={errors.timeline}
        >
          <select {...fieldProps('timeline')} id="inquiry-timeline">
            <option value="">Select a timeline</option>
            {TIMELINE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="inquiry-contactMethod"
          label="Preferred Contact Method"
          error={errors.contactMethod}
          className="sm:col-span-2"
        >
          <select
            {...fieldProps('contactMethod')}
            id="inquiry-contactMethod"
          >
            <option value="">No preference</option>
            {CONTACT_METHOD_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="inquiry-description"
          label="Project Description"
          error={errors.description}
          hint={`Tell us about your idea, requirements, and expected functionality. Minimum ${INQUIRY_LIMITS.description.min} characters.`}
          required
          className="sm:col-span-2"
        >
          <textarea
            {...fieldProps('description', true)}
            id="inquiry-description"
            rows={7}
            required
            maxLength={INQUIRY_LIMITS.description.max}
            placeholder="Describe the project, the problem it should solve, the main features you need, and anything else we should know."
            className={cn(inputClass('description'), 'resize-y')}
          />
          <p
            className="mt-1.5 text-right text-xs text-slate-500"
            aria-hidden="true"
          >
            {values.description.length.toLocaleString('en-US')} /{' '}
            {INQUIRY_LIMITS.description.max.toLocaleString('en-US')}
          </p>
        </Field>
      </div>

      <div className="mt-5">
        <label
          htmlFor="inquiry-consent"
          className="flex items-start gap-3 text-sm leading-6 text-slate-600"
        >
          <input
            id="inquiry-consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={handleChange}
            disabled={isSubmitting}
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy('consent')}
            className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-accent-600 focus:ring-accent-500"
          />
          <span>
            I agree that AMTRA Technologies may contact me regarding my project
            inquiry.
            <span className="ml-0.5 text-red-500" aria-hidden="true">
              *
            </span>
          </span>
        </label>

        {errors.consent ? (
          <p id="inquiry-consent-error" className="mt-1.5 text-sm text-red-600">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="inquiry-website">Website</label>
        <input
          id="inquiry-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-slate-500">
          We use your details only to respond to this project inquiry.
        </p>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending inquiry…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Send Project Inquiry
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
