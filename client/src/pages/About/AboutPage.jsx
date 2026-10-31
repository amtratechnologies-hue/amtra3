import Container from '../../components/common/Container';
import CtaSection from '../../components/common/CtaSection';
import PageHero from '../../components/common/PageHero';
import SectionHeading from '../../components/common/SectionHeading';
import { companyIntro, mission, vision, values } from '../../constants/company';
import { usePageMeta } from '../../hooks/usePageMeta';

const atAGlance = [
  { label: 'Focus', value: 'End-to-end software delivery' },
  { label: 'Disciplines', value: 'Web, mobile, AI, cloud, and security' },
  { label: 'Engagement', value: 'Collaborative and transparent' },
  { label: 'Stack', value: 'MERN and modern cloud tooling' },
];

export default function AboutPage() {
  usePageMeta(
    'About',
    'Learn how AMTRA Technologies approaches software delivery, our mission, vision, and the values that guide our work.',
  );

  return (
    <>
      <PageHero
        eyebrow="About AMTRA"
        title="A software company built around clarity and craft."
        description="We believe dependable software comes from understanding the problem deeply, communicating openly, and caring about how the work is done."
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="Practical engineering for teams with real problems to solve."
              description={companyIntro[0]}
            />
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              {companyIntro[1]}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy-900">
              At a glance
            </h2>
            <dl className="mt-6 space-y-5">
              {atAGlance.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-navy-950">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
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
                  <p className="mt-3 text-sm leading-6 text-slate-600">
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
            eyebrow="Our values"
            title="The principles behind how we work."
            description="These values shape how we scope projects, make technical decisions, and communicate with the teams we work with."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      <CtaSection
        title="Let's talk about the problem you need to solve."
        description="Bring us the goals, the constraints, and the open questions. We will help you find a clear path forward."
        secondaryLabel="Meet the team"
        secondaryTo="/team"
      />
    </>
  );
}
