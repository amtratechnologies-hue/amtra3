import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useNoIndex } from '../../hooks/useNoIndex';
import { useAdminAuth } from '../../admin/useAdminAuth';
import { cn } from '../../utils/cn';

const inputBase =
  'w-full rounded-lg border bg-white px-4 py-3 text-base text-navy-950 shadow-sm transition placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-50';

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-navy-900">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function AdminLoginPage() {
  const { status, login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useNoIndex();

  if (status === 'loading') {
    return <LoadingSpinner fullPage label="Checking your session…" />;
  }

  if (status === 'authenticated') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  function validate() {
    const nextErrors = {};

    if (!username.trim()) {
      nextErrors.username = 'Please enter your username.';
    } else if (username.trim().length < 3) {
      nextErrors.username = 'Username must be at least 3 characters.';
    }

    if (!password) {
      nextErrors.password = 'Please enter your password.';
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage('');
      return;
    }

    setErrors({});
    setMessage('');
    setIsSubmitting(true);

    try {
      await login({ username: username.trim(), password });

      const from = location.state?.from;
      const destination =
        typeof from === 'string' && from.startsWith('/admin/') && from !== '/admin/login'
          ? from
          : '/admin/dashboard';

      navigate(destination, { replace: true });
    } catch (error) {
      setMessage(error?.message || 'Sign-in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-7 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            <ShieldCheck className="h-7 w-7 text-accent-300" aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold text-white">
            AMTRA Admin
          </h1>
          <p className="mt-2 text-sm text-navy-200">
            Secure access to client service requests.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          aria-busy={isSubmitting}
          className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
        >
          {message ? (
            <div
              role="alert"
              aria-live="polite"
              className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm text-red-800"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{message}</span>
            </div>
          ) : null}

          <div className="space-y-5">
            <Field id="admin-username" label="Username" error={errors.username}>
              <div className="relative">
                <UserRound
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  id="admin-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                    setErrors((current) => {
                      if (!current.username) return current;
                      const next = { ...current };
                      delete next.username;
                      return next;
                    });
                  }}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.username)}
                  aria-describedby={
                    errors.username ? 'admin-username-error' : undefined
                  }
                  placeholder="Enter your username"
                  className={cn(
                    inputBase,
                    'pl-10',
                    errors.username
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-300 focus:border-accent-500 focus:ring-accent-500/20',
                  )}
                />
              </div>
            </Field>

            <Field id="admin-password" label="Password" error={errors.password}>
              <div className="relative">
                <LockKeyhole
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setErrors((current) => {
                      if (!current.password) return current;
                      const next = { ...current };
                      delete next.password;
                      return next;
                    });
                  }}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? 'admin-password-error' : undefined
                  }
                  placeholder="Enter your password"
                  className={cn(
                    inputBase,
                    'pl-10 pr-12',
                    errors.password
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-300 focus:border-accent-500 focus:ring-accent-500/20',
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-1.5 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-navy-950"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </Field>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-950 disabled:pointer-events-none disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-navy-300">
          Authorised personnel only. Access is monitored.
        </p>
      </div>
    </div>
  );
}
