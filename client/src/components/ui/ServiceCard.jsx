import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export default function ServiceCard({ service, detailed = false, className }) {
  const Icon = service.icon;

  return (
    <article
      id={service.id}
      className={cn(
        'group flex h-full scroll-mt-28 flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-lg hover:shadow-navy-900/5',
        className,
      )}
    >
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-800 ring-1 ring-navy-100 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-accent-300">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>

      <h3 className="text-lg font-semibold text-navy-950">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
        {service.summary}
      </p>

      {detailed ? (
        <>
          <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5">
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

          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition-colors hover:text-accent-700"
          >
            Discuss this service
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </>
      ) : null}
    </article>
  );
}
