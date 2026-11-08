import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Container from './Container';

export default function CtaSection({
  title = 'Have a project in mind?',
  description = 'Tell us what you are building, what is getting in the way, and where you want to go next. We will take it from there.',
  primaryLabel = 'Start Your Project',
  primaryTo = '/contact',
  secondaryLabel = 'Explore services',
  secondaryTo = '/services',
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-6 py-14 shadow-2xl sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-16">
          <div className="absolute inset-0 bg-grid-dark opacity-40" aria-hidden="true" />
          <div
            className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent-500/25 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative max-w-2xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
              <span className="h-px w-6 bg-accent-400" aria-hidden="true" />
              Start a project
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
          </div>

          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <Button as={Link} to={primaryTo} variant="accent" size="lg">
              {primaryLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>

            {secondaryLabel && secondaryTo ? (
              <Button as={Link} to={secondaryTo} variant="outlineLight" size="lg">
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
