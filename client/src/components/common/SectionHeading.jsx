import { cn } from '../../utils/cn';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  as: Heading = 'h2',
  className,
}) {
  const isDark = tone === 'dark';
  const isCentered = align === 'center';

  return (
    <div
      className={cn(
        isCentered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]',
            isDark ? 'text-accent-300' : 'text-accent-700',
            isCentered && 'justify-center',
          )}
        >
          <span
            className={cn('h-px w-6', isDark ? 'bg-accent-400' : 'bg-accent-500')}
            aria-hidden="true"
          />
          {eyebrow}
        </p>
      ) : null}

      <Heading
        className={cn(
          'mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl',
          isDark ? 'text-white' : 'text-navy-950',
        )}
      >
        {title}
      </Heading>

      {description ? (
        <p
          className={cn(
            'mt-4 text-base leading-7 sm:text-lg',
            isDark ? 'text-slate-300' : 'text-slate-600',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
