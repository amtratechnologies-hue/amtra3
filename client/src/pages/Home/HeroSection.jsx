import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import Button from '../../components/ui/Button';
import { deliveryProcess } from '../../constants/company';

const highlights = [
  'Product strategy through launch',
  'Security-first engineering',
  'Long-term support and handover',
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
      <div
        className="absolute -right-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-accent-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-32 h-[26rem] w-[26rem] rounded-full bg-navy-200/40 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" aria-hidden="true" />
            Software development &amp; IT services
          </p>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-navy-950 text-balance sm:text-5xl lg:text-6xl">
            Engineering dependable software for{' '}
            <span className="underline decoration-accent-400/70 decoration-4 underline-offset-[6px]">
              ambitious teams.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            AMTRA Technologies helps organizations design, build, and scale digital
            products across web, mobile, AI, cloud, and security — with clear
            communication at every step.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button as={Link} to="/contact" size="lg">
              Start a conversation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button as={Link} to="/services" variant="secondary" size="lg">
              Explore our services
            </Button>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-2 text-sm text-slate-600"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-100 text-accent-700">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-lg animate-fade-up animate-fade-up-delay-2">
          <div
            className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent-200/60 via-transparent to-navy-200/50 blur-2xl"
            aria-hidden="true"
          />

          <div className="relative rounded-2xl bg-navy-950 p-6 shadow-2xl ring-1 ring-white/10 sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
                  Delivery lifecycle
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  From idea to production
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10">
                End to end
              </span>
            </div>

            <ol className="mt-6 space-y-5">
              {deliveryProcess.map((step, index) => (
                <li key={step.id} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-500/10 text-xs font-bold text-accent-300 ring-1 ring-accent-400/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{step.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-7 flex items-start gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
              <ShieldCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-accent-300"
                aria-hidden="true"
              />
              <p className="text-sm leading-6 text-slate-200">
                Security and maintainability built in from day one.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
