import { ArrowRight, Globe2, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import CtaSection from '../../components/common/CtaSection';
import PageHero from '../../components/common/PageHero';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/ui/Button';
import {
  approach,
  companyIntro,
  mission,
  values,
  vision,
} from '../../constants/company';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function AboutPage() {
  usePageMeta(
    'About Us',
    'Learn about AMTRA Technologies, our mission, vision, core values, and the collaborative approach we use to build practical digital solutions.',
  );

  return (
    <>
      <PageHero
        eyebrow="About AMTRA"
        title="Building Technology That Moves Businesses Forward."
        description="We believe dependable software comes from understanding the problem deeply, communicating openly, and caring about how the work is done."
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="An emerging software company with a practical point of view."
            />

            <div className="mt-5 space-y-4 text-base leading-7 text-slate-600">
              {companyIntro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <Button as={Link} to="/services" variant="secondary" className="mt-8">
              Explore our services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-navy-950 p-6 text-white sm:p-8">
            <div className="absolute inset-0 bg-grid-dark opacity-40" aria-hidden="true" />
            <div
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-500/20 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-300">
                Our brand promise
              </p>
              <p className="mt-4 text-2xl font-bold leading-snug text-balance">
                Turning Ideas Into Powerful Digital Solutions.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                We focus on practical outcomes: software that is clear to use,
                sensible to maintain, and aligned with the goals of the business
                behind it.
              </p>

              <ul className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm text-slate-300">
                <li>Custom software and digital products</li>
                <li>Modern web, mobile, and desktop applications</li>
                <li>AI integration, automation, and technical consulting</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {[mission, vision].map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-accent-700 ring-1 ring-navy-100">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-navy-950">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Our core values"
            title="The principles behind how we work."
            description="These values shape how we scope projects, make technical decisions, and communicate with the people we work with."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-lg hover:shadow-navy-900/5"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-100">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-navy-950">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our approach"
            title="How we turn requirements into working software."
            description="We keep the process understandable and collaborative, with clear checkpoints and no unnecessary surprises."
          />

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((step, index) => {
              const Icon = step.icon;

              return (
                <li
                  key={step.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.16em] text-accent-700">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Icon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-navy-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-6 md:grid-cols-2">
          <Link
            to="/founder"
            className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-lg hover:shadow-navy-900/5 sm:p-8"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-accent-700 ring-1 ring-navy-100">
              <UserRound className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-navy-950">
              Founder & Leadership
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Meet Ali Raza Chakrani, Founder and CEO, and learn about the
              vision and focus areas that guide AMTRA Technologies.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700">
              Meet the founder
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>

          <Link
            to="/remote-working"
            className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-lg hover:shadow-navy-900/5 sm:p-8"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-accent-700 ring-1 ring-navy-100">
              <Globe2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-navy-950">
              Remote Working
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              See how we collaborate with clients internationally through
              virtual meetings, GitHub workflows, and structured communication.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700">
              How we collaborate
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        </Container>
      </section>

      <CtaSection
        title="Let's talk about the problem you need to solve."
        description="Bring us the goals, the constraints, and the open questions. We will help you find a clear path forward."
        secondaryLabel="View our process"
        secondaryTo="/process"
      />
    </>
  );
}
