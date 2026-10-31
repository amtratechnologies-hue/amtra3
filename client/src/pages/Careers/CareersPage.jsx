import { Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import CtaSection from '../../components/common/CtaSection';
import EmptyState from '../../components/common/EmptyState';
import PageHero from '../../components/common/PageHero';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/ui/Button';
import { usePageMeta } from '../../hooks/usePageMeta';

const hiringSteps = [
  {
    title: 'Application review',
    description: 'When a role opens, we review every application against the published requirements.',
  },
  {
    title: 'Conversation',
    description: 'A focused discussion about your experience, interests, and what you want to build next.',
  },
  {
    title: 'Practical discussion',
    description: 'A role-relevant conversation or exercise that respects your time and demonstrates how you work.',
  },
];

export default function CareersPage() {
  usePageMeta(
    'Careers',
    'Learn about working at AMTRA Technologies and check back for open roles when they are announced.',
  );

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your career at AMTRA Technologies."
        description="We are interested in people who care about their craft, communicate clearly, and want to build software that lasts."
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Current openings"
              title="No open positions right now."
              description="New roles will be announced on this page when they become available. There are no vacancies to apply for at this time."
            />
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              We do not advertise roles before they are ready to hire. When an
              opening is published, you will find the full description and
              application details here.
            </p>
          </div>

          <EmptyState
            icon={Briefcase}
            title="There are no vacancies to apply for at this time."
            description="Check back later, or get in touch if you have a general question about working with AMTRA."
            action={
              <Button as={Link} to="/contact" variant="secondary">
                Ask a question
              </Button>
            }
          />
        </Container>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="When roles open"
            title="A straightforward hiring process."
            description="We keep the process focused, respectful, and relevant to the role."
          />

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {hiringSteps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <span className="text-xs font-bold tracking-[0.16em] text-accent-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-base font-semibold text-navy-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaSection
        title="Have a question about working with us?"
        description="For general inquiries, use the contact form and we will respond using the details you share."
        primaryLabel="Get in touch"
        secondaryLabel={null}
      />
    </>
  );
}
