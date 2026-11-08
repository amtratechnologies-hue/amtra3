import { ArrowRight, Check, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import Button from '../../components/ui/Button';
import { siteConfig } from '../../constants/siteConfig';

const highlights = [
  'Custom software, web, and mobile applications',
  'Payment applications and gateway integration',
  'AI automation and long-term technical support',
];

const workflow = [
  'Discovery and requirement analysis',
  'UI/UX design and architecture',
  'Development and code review',
  'Testing, approval, and deployment',
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 bg-grid-dark opacity-50" aria-hidden="true" />
      <div
        className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-accent-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-secondary-500/20 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-14 py-20 lg:grid-cols-[1.02fr_0.98fr] lg:py-28">
        <div className="animate-fade-up">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-300">
            <span className="h-px w-8 bg-accent-400" aria-hidden="true" />
            {siteConfig.name}
          </p>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Turning Ideas Into{' '}
            <span className="bg-gradient-to-r from-accent-300 via-accent-400 to-secondary-300 bg-clip-text text-transparent">
              Powerful Digital Solutions.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            From custom software and web applications to AI-powered solutions,
            AMTRA Technologies helps businesses transform their ideas into
            reliable, scalable, and practical digital products.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button as={Link} to="/contact#inquiry" variant="accent" size="lg">
              Request a Service
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button as={Link} to="/services" variant="outlineLight" size="lg">
              Explore Our Services
            </Button>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-6 text-slate-300"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent-400"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-up animate-fade-up-delay-2 relative mx-auto w-full max-w-lg">
          <div
            className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent-500/20 via-transparent to-secondary-500/20 blur-2xl"
            aria-hidden="true"
          />

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900/90 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" aria-hidden="true" />
              </div>
              <p className="text-xs font-medium text-slate-400">
                Project overview
              </p>
              <Code2 className="h-4 w-4 text-slate-500" aria-hidden="true" />
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Web', value: 'Applications' },
                  { label: 'Mobile', value: 'Products' },
                  { label: 'Custom', value: 'Software' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                  >
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Delivery workflow
                </p>

                <ul className="mt-4 space-y-3">
                  {workflow.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs leading-5 text-slate-300"
                    >
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-400"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 bg-navy-950/80 p-4 font-mono text-[0.7rem] leading-6 text-slate-400">
                <p>
                  <span className="text-secondary-300">const</span>{' '}
                  <span className="text-accent-300">solution</span> = build(
                </p>
                <p className="pl-4">
                  <span className="text-emerald-300">&apos;your idea&apos;</span>,
                </p>
                <p className="pl-4">
                  <span className="text-emerald-300">&apos;modern stack&apos;</span>,
                </p>
                <p className="pl-4">
                  <span className="text-emerald-300">&apos;clear process&apos;</span>
                </p>
                <p>);</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 -left-3 hidden rounded-xl border border-white/10 bg-navy-800/95 px-4 py-3 shadow-xl sm:block">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Built for
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              Custom · Web · Mobile
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
