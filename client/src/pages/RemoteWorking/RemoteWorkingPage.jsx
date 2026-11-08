import { ArrowRight, CheckCircle2, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import CtaSection from '../../components/common/CtaSection';
import PageHero from '../../components/common/PageHero';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/ui/Button';
import { remoteWorking } from '../../constants/company';
import { usePageMeta } from '../../hooks/usePageMeta';

const collaborationPoints = [
  'Communication channels and meeting rhythm are agreed at kickoff',
  'Work is visible through shared repositories, tasks, and milestone updates',
  'Meetings are scheduled with time-zone differences in mind',
  'Written summaries keep decisions clear between calls',
];

export default function RemoteWorkingPage() {
  usePageMeta(
    'Remote Working',
    'Learn how AMTRA Technologies collaborates remotely with clients internationally through virtual meetings, GitHub-based workflows, progress updates, and digital project management.',
  );

  return (
    <>
      <PageHero
        eyebrow="Remote Working"
        title="Remote-first collaboration, built around clear communication."
        description="We work with clients in Pakistan and internationally through online meetings, shared development workflows, and structured project communication."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button as={Link} to="/contact#inquiry" variant="accent" size="lg">
            Request a Service
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button as={Link} to="/process" variant="outlineLight" size="lg">
            See our process
          </Button>
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="How we collaborate"
            title="A remote-first model with visible progress."
            description={remoteWorking.intro}
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {remoteWorking.items.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-lg hover:shadow-navy-900/5"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-100">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 text-base font-semibold text-navy-950">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Working together"
              title="International collaboration without unnecessary friction."
              description="Remote work only succeeds when communication is deliberate. We agree on how and when we will communicate, keep decisions written down, and make progress easy to follow."
            />

            <ul className="mt-8 space-y-4">
              {collaborationPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent-600"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-navy-950 p-6 text-white sm:p-8">
            <div className="absolute inset-0 bg-grid-dark opacity-40" aria-hidden="true" />
            <div
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-500/20 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-accent-300 ring-1 ring-accent-400/20">
                <Globe2 className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-white">
                Location and availability
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                AMTRA Technologies is based in Pakistan and works remotely with
                clients internationally. {remoteWorking.note}
              </p>
              <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-7 text-slate-300">
                If you prefer a specific meeting platform or project-management
                tool, tell us during the initial discussion and we will confirm
                what works for the engagement.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CtaSection
        title="Let's plan a remote engagement."
        description="Tell us where you are based, how you prefer to communicate, and what you want to build. We will suggest a practical working arrangement."
        primaryLabel="Request a Service"
        primaryTo="/contact#inquiry"
        secondaryLabel="Meet the founder"
        secondaryTo="/founder"
      />
    </>
  );
}
