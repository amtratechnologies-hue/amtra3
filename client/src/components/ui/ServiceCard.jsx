import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export default function ServiceCard({ service, detailed = false, className }) {
  const Icon = service.icon;
  const isFeatured = Boolean(service.featured);

  return (
    <article
      id={service.id}
      className={cn(
        'group h-full scroll-mt-28 rounded-2xl border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-900/5',
        isFeatured
          ? 'border-accent-200 ring-1 ring-accent-100 hover:border-accent-400'
          : 'border-slate-200 hover:border-accent-300',
        className,
      )}
    >
      <Link
        to={`/services/${service.id}`}
        className="flex h-full flex-col rounded-2xl p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-800 ring-1 ring-navy-100 transition duration-300 group-hover:scale-105 group-hover:bg-navy-900 group-hover:text-accent-300">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>

          {isFeatured ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-accent-700 ring-1 ring-accent-100">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              {service.featuredLabel || 'Featured'}
            </span>
          ) : null}
        </div>

        <h3 className="mt-5 text-lg font-semibold text-navy-950">
          {service.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
          {detailed ? service.description : service.summary}
        </p>

        {detailed ? (
          <>
            <div className="mt-5 border-t border-slate-100 pt-5">
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Key capabilities
              </h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {service.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-600"
                      aria-hidden="true"
                    />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Benefits to clients
              </h4>
              <ul className="mt-3 space-y-2">
                {service.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-2">
            {service.capabilities.slice(0, 3).map((capability) => (
              <li
                key={capability}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                {capability}
              </li>
            ))}
          </ul>
        )}

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition-colors group-hover:text-accent-700">
          View service details
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </Link>
    </article>
  );
}
