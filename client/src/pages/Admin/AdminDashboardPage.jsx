import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Inbox, RefreshCw } from 'lucide-react';
import EmptyState from '../../components/common/EmptyState';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Button from '../../components/ui/Button';
import { useNoIndex } from '../../hooks/useNoIndex';
import { fetchRequests } from '../../services/adminService';
import { formatDateTime } from '../../utils/formatDate';

export default function AdminDashboardPage() {
  const [state, setState] = useState({
    status: 'loading',
    items: [],
    total: 0,
    error: '',
  });

  const [reloadKey, setReloadKey] = useState(0);

  useNoIndex();

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const data = await fetchRequests({ page: 1, limit: 5 });

        if (!cancelled) {
          setState({
            status: 'ready',
            items: data.items,
            total: data.pagination.total,
            error: '',
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            status: 'error',
            items: [],
            total: 0,
            error: error?.message || 'We could not load service requests.',
          });
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  function retry() {
    setState((current) => ({ ...current, status: 'loading', error: '' }));
    setReloadKey((key) => key + 1);
  }

  const latest = state.items[0];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-navy-950">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">
            Read-only overview of client service requests.
          </p>
        </div>

        <Link
          to="/admin/requests"
          className="inline-flex items-center gap-2 rounded-lg bg-navy-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          View all requests
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total service requests
          </p>
          <p className="mt-2 text-3xl font-semibold text-navy-950">
            {state.status === 'ready' ? state.total : '—'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Latest submission
          </p>
          <p className="mt-2 text-lg font-semibold text-navy-950">
            {state.status === 'ready'
              ? latest
                ? formatDateTime(latest.createdAt)
                : 'No requests yet'
              : '—'}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-navy-950">
            Recent requests
          </h2>
          {state.status === 'ready' && state.items.length > 0 ? (
            <Link
              to="/admin/requests"
              className="text-sm font-semibold text-accent-700 hover:text-accent-600"
            >
              See all
            </Link>
          ) : null}
        </div>

        {state.status === 'loading' ? (
          <LoadingSpinner label="Loading requests…" />
        ) : null}

        {state.status === 'error' ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800"
          >
            <p>{state.error}</p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4"
              onClick={retry}
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Try again
            </Button>
          </div>
        ) : null}

        {state.status === 'ready' && state.items.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No service requests yet"
            description="New submissions from the public contact form will appear here."
          />
        ) : null}

        {state.status === 'ready' && state.items.length > 0 ? (
          <>
            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Client
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Email
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Service
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Submitted
                    </th>
                    <th scope="col" className="px-5 py-3 text-right font-semibold">
                      <span className="sr-only">Open</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {state.items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4 font-medium text-navy-950">
                        {item.fullName}
                      </td>
                      <td className="max-w-[16rem] truncate px-5 py-4 text-slate-600">
                        {item.email}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {item.service}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                        {formatDateTime(item.createdAt)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          to={`/admin/requests/${item.id}`}
                          className="font-semibold text-accent-700 hover:text-accent-600"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 md:hidden">
              {state.items.map((item) => (
                <Link
                  key={item.id}
                  to={`/admin/requests/${item.id}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-accent-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-navy-950">
                        {item.fullName}
                      </p>
                      <p className="mt-0.5 truncate text-sm text-slate-600">
                        {item.email}
                      </p>
                    </div>
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-slate-400"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-3 text-sm font-medium text-navy-900">
                    {item.service}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatDateTime(item.createdAt)}
                  </p>
                </Link>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
