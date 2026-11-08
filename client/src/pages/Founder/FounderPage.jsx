import { ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import CtaSection from '../../components/common/CtaSection';
import PageHero from '../../components/common/PageHero';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/ui/Button';
import { founder } from '../../constants/company';
import { siteConfig } from '../../constants/siteConfig';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function FounderPage() {
  usePageMeta(
    'Founder & Leadership',
    'Meet Ali Raza Chakrani, Founder and CEO of AMTRA Technologies, and learn about the vision, project planning, team collaboration, and business development he leads.',
  );

  return (
    <>
      <PageHero
        eyebrow="Founder & Leadership"
        title="Led with a builder’s mindset."
        description="AMTRA Technologies is led by its founder with a focus on practical software, clear project planning, and long-term client value."
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
          <div className="rounded-2xl border border-slate-200 bg-navy-950 p-8 text-center text-white shadow-sm">
            <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500/20 via-transparent to-secondary-500/20"
                aria-hidden="true"
              />
              <span className="relative text-5xl font-extrabold tracking-[0.12em] text-accent-300">
                {founder.initials}
              </span>
            </div>

            <h2 className="mt-6 text-2xl font-bold text-white">
              {founder.name}
            </h2>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-accent-300">
              {founder.role}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              AMTRA Technologies · Pakistan
            </p>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Focus areas
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {founder.focusAreas.map((area) => (
                  <li key={area.id}>{area.title}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="About the founder"
              title="Technology, opportunity, and practical delivery."
            />

            <p className="mt-6 text-base leading-8 text-slate-600">
              {founder.bio}
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-semibold text-navy-950">
                What this means for clients
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Every engagement is led with attention to the original business
                goal, not just the list of features. That means clear
                requirements, realistic planning, and a delivery approach that
                keeps communication open from the first discussion onward.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button as={Link} to="/contact#inquiry" variant="primary">
                  Request a Service
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button as={Link} to="/about" variant="secondary">
                  About AMTRA
                </Button>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5">
              <Info
                className="mt-0.5 h-5 w-5 shrink-0 text-slate-400"
                aria-hidden="true"
              />
              <p className="text-sm leading-6 text-slate-600">
                A verified professional profile and founder photograph can be
                added here when they are available. For project discussions,
                use the inquiry form or email{' '}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-semibold text-accent-700 hover:text-accent-600"
                >
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Leadership focus"
            title="The areas the founder leads day to day."
            description="These responsibilities shape how projects are planned, how the team works together, and how the company develops client relationships."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {founder.focusAreas.map((area) => {
              const Icon = area.icon;

              return (
                <article
                  key={area.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-100">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 text-base font-semibold text-navy-950">
                    {area.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {area.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <CtaSection
        title="Have a project in mind?"
        description="Share your requirements with our team and we will review the details, ask the right questions, and suggest a practical next step."
        primaryLabel="Request a Service"
        primaryTo="/contact#inquiry"
        secondaryLabel="How we work"
        secondaryTo="/process"
      />
    </>
  );
}
