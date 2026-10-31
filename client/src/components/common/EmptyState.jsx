import { cn } from '../../utils/cn';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center',
        className,
      )}
    >
      {Icon ? (
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-accent-600 shadow-sm ring-1 ring-slate-200">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </div>
      ) : null}

      <h2 className="mt-5 text-xl font-semibold text-navy-950">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
        {description}
      </p>

      {action ? (
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {action}
        </div>
      ) : null}
    </div>
  );
}
