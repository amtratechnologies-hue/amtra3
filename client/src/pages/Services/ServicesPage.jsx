import Container from '../../components/common/Container';
import CtaSection from '../../components/common/CtaSection';
import PageHero from '../../components/common/PageHero';
import SectionHeading from '../../components/common/SectionHeading';
import ServiceCard from '../../components/ui/ServiceCard';
import { deliveryProcess } from '../../constants/company';
import { services } from '../../constants/services';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function ServicesPage() {
  usePageMeta(
    'Services',
    'Explore AMTRA Technologies services: web, mobile, AI, desktop, cybersecurity, cloud and DevOps, and IT consulting.',
  );

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Software services for every stage of the product lifecycle."
        description="Whether you are validating an idea, modernizing an existing system, or scaling a live product, we can help you move forward with confidence."
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title="Focused service areas, delivered by one team."
            description="Each engagement is shaped around your goals. These are the areas where we can contribute the most value."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} detailed />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="A clear path from first conversation to long-term support."
            description="No black boxes. Each phase has a defined purpose, visible progress, and room for your feedback."
          />

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deliveryProcess.map((step, index) => (
              <li
                key={step.id}
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
        title="Not sure which service fits?"
        description="Describe what you are trying to achieve. We will help you identify the right starting point."
        primaryLabel="Talk through your project"
        secondaryLabel="Meet the team"
        secondaryTo="/team"
      />
    </>
  );
}
