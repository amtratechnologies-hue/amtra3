import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Button from '../../components/ui/Button';
import { useNoIndex } from '../../hooks/useNoIndex';
import { fetchRequest } from '../../services/adminService';
import { formatDateTime } from '../../utils/formatDate';
import { cn } from '../../utils/cn';

function DetailField({ label, children, className }) {
  return (
    <div className={cn('min-w-0', className)}>
      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </dt>
      <dd className="mt-1.5 break-words text-sm leading-6 text-navy-950">
        {children || '—'}
      </dd>
    </div>
  );
}

export default function AdminRequestDetailPage() {
  const { id } = useParams();
  const [reloadKey, setReloadKey] = useState(0);
  const [state, setState] = useState({
    status: 'loading',
    request: null,
    error: '',
  });

  useNoIndex();

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const request = await fetchRequest(id);

        if (!cancelled) {
          setState({ status: 'ready', request, error: '' });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            status: 'error',
            request: null,
            error: error?.message || 'We could not load this request.',
          });
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [id, reloadKey]);

  function retry() {
    setState((current) => ({ ...current, status: 'loading', error: '' }));
    setReloadKey((key) => key + 1);
  }

  const request = state.request;

  return (
    <div>
      <Link
        to="/admin/requests"
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-navy-950"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to requests
      </Link>

      {state.status === 'loading' ? (
        <LoadingSpinner label="Loading request…" />
      ) : null}

      {state.status === 'error' ? (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800"
        >
          <p>{state.error}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={retry}
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Try again
            </Button>
            <Link
              to="/admin/requests"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-slate-50"
            >
              Return to list
            </Link>
          </div>
        </div>
      ) : null}

      {state.status === 'ready' && request ? (
        <>
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-700">
              Service request
            </p>
            <h1 className="mt-1 break-words text-2xl font-semibold text-navy-950">
              {request.fullName}
            </h1>
            <p className="mt-1 break-words text-sm text-slate-600">
              {request.service}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Submitted {formatDateTime(request.createdAt)}
            </p>
          </div>

          <div className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Client information
              </h2>
              <dl className="mt-4 grid gap-5 sm:grid-cols-2">
                <DetailField label="Full name">{request.fullName}</DetailField>
                <DetailField label="Business email">
                  <a
                    href={`mailto:${request.email}`}
                    className="font-medium text-accent-700 hover:text-accent-600"
                  >
                    {request.email}
                  </a>
                </DetailField>
                <DetailField label="Phone / WhatsApp">
                  {request.phone ? (
                    <a
                      href={`tel:${request.phone.replace(/[^\d+]/g, '')}`}
                      className="font-medium text-accent-700 hover:text-accent-600"
                    >
                      {request.phone}
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </DetailField>
                <DetailField label="Company name">
                  {request.company || 'Not provided'}
                </DetailField>
                <DetailField label="Country">
                  {request.country || 'Not provided'}
                </DetailField>
              </dl>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Project information
              </h2>
              <dl className="mt-4 grid gap-5 sm:grid-cols-2">
                <DetailField label="Service required">
                  {request.service}
                </DetailField>
                <DetailField label="Project budget">
                  {request.budget || 'Not provided'}
                </DetailField>
                <DetailField label="Expected timeline">
                  {request.timeline || 'Not provided'}
                </DetailField>
                <DetailField label="Preferred contact method">
                  {request.contactMethod || 'Not provided'}
                </DetailField>
                <DetailField label="Submission date and time">
                  {formatDateTime(request.createdAt)}
                </DetailField>
              </dl>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Project description
              </h2>
              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-navy-950">
                {request.description}
              </p>
            </section>
          </div>
        </>
      ) : null}
    </div>
  );
}
