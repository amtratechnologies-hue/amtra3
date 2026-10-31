import { cn } from '../../utils/cn';
import Container from './Container';

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-navy-950 py-20 text-white sm:py-24',
        className,
      )}
    >
      <div className="absolute inset-0 bg-grid-dark opacity-60" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-navy-600/40 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        {eyebrow ? (
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
            <span className="h-px w-6 bg-accent-400" aria-hidden="true" />
            {eyebrow}
          </p>
        ) : null}

        <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>

        {description ? (
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            {description}
          </p>
        ) : null}

        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}
