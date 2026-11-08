import { CheckCircle2 } from 'lucide-react';
import Container from '../../components/common/Container';
import CtaSection from '../../components/common/CtaSection';
import PageHero from '../../components/common/PageHero';
import SectionHeading from '../../components/common/SectionHeading';
import {
  ciCdNote,
  ciCdWorkflow,
  deliveryProcess,
} from '../../constants/company';
import { usePageMeta } from '../../hooks/usePageMeta';

const principles = [
  'Clear scope and expectations before development starts',
  'Regular progress updates and opportunities for feedback',
  'Testing and quality checks before deployment',
  'A documented handover and agreed post-delivery support',
];

export default function ProcessPage() {
  usePageMeta(
    'Our Process',
    'See the 13-stage AMTRA Technologies development process, from initial inquiry and requirement analysis through design, development, CI/CD, testing, deployment, handover, and maintenance.',
  );

  return (
    <>
      <PageHero
        eyebrow="Our Process"
        title="A clear, collaborative path from idea to launch."
        description="Good software does not happen by accident. Our process keeps the work visible, the decisions understandable, and the outcome aligned with your goals."
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="13 stages"
            title="How a project moves forward with AMTRA."
            description="Every project is different, but the structure stays consistent. Each stage has a purpose and a checkpoint before the next one begins."
          />

          <ol className="relative mt-12 space-y-4 before:absolute before:bottom-6 before:left-6 before:top-6 before:w-px before:bg-slate-200 sm:before:left-8">
            {deliveryProcess.map((step) => {
              const Icon = step.icon;

              return (
                <li
                  key={step.id}
                  className="relative grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 pl-16 transition duration-300 hover:border-accent-300 hover:shadow-lg hover:shadow-navy-900/5 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-5 sm:p-6 sm:pl-20"
                >
                  <span className="absolute left-0 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950 text-sm font-bold text-accent-300 ring-4 ring-white sm:left-2 sm:top-6">
                    {step.number}
                  </span>

                  <div className="sm:col-start-2">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-accent-600" aria-hidden="true" />
                      <h2 className="text-lg font-semibold text-navy-950">
                        {step.title}
                      </h2>
                    </div>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-grid-dark opacity-40" aria-hidden="true" />
        <div
          className="absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-secondary-500/10 blur-3xl"
          aria-hidden="true"
        />

        <Container className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="Version control & CI/CD"
            title="A development workflow built on review and automation."
            description="Code moves through version control, pull requests, automated checks, testing, and approval before production deployment. The exact pipeline is configured for each project."
          />

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ciCdWorkflow.map((step) => {
              const Icon = step.icon;

              return (
                <li
                  key={step.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-accent-400/40 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.16em] text-accent-300">
                      {step.number}
                    </span>
                    <Icon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>

          <p className="mt-8 max-w-3xl rounded-xl border border-accent-400/20 bg-accent-500/10 p-5 text-sm leading-7 text-slate-300">
            {ciCdNote}
          </p>
        </Container>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            eyebrow="What you can expect"
            title="Clarity at every stage."
            description="Our process is designed to reduce uncertainty and keep you involved in the decisions that matter."
          />

          <ul className="space-y-4">
            {principles.map((principle) => (
              <li
                key={principle}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent-600"
                  aria-hidden="true"
                />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection
        title="Ready to start with a clear plan?"
        description="Tell us about your project and we will help you understand the next practical step."
        primaryLabel="Request a Service"
        primaryTo="/contact#inquiry"
        secondaryLabel="Explore Our Services"
        secondaryTo="/services"
      />
    </>
  );
}
