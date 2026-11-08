import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import CtaSection from '../../components/common/CtaSection';
import PageHero from '../../components/common/PageHero';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/ui/Button';
import ServiceCard from '../../components/ui/ServiceCard';
import { deliveryProcess } from '../../constants/company';
import { featuredServices, services } from '../../constants/services';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function ServicesPage() {
  usePageMeta(
    'Services',
    'Explore AMTRA Technologies services: web, mobile, desktop, and custom software development, payment applications, AI and automation, cybersecurity, databases, cloud and DevOps, networking, IT consulting, maintenance, and digital marketing.',
  );

  const otherServices = services.filter((service) => !service.featured);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Technology services that move your business forward."
        description="Whether you are validating an idea, modernizing an existing system, or scaling a live product, we can help you move forward with a clear, practical plan."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button as={Link} to="/contact#inquiry" variant="accent" size="lg">
            Request a Service
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button as={Link} to="/process" variant="outlineLight" size="lg">
            See how we work
          </Button>
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Core specialties"
            title="Custom software and payment applications."
            description="These are two areas where we place particular focus. Each engagement is shaped around your requirements, your providers, and the way your business actually operates."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} detailed />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="All services"
            title="Focused service areas, delivered by one team."
            description="Select any service to see its capabilities, business benefits, and a direct way to request it. We only present services we can actually deliver."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="A clear path from first conversation to long-term support."
            description="No black boxes. Each of our 13 stages has a defined purpose, visible progress, and room for your feedback."
          />

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {deliveryProcess.slice(0, 4).map((step) => {
              const Icon = step.icon;

              return (
                <li
                  key={step.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.16em] text-accent-700">
                      {step.number}
                    </span>
                    <Icon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-navy-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>

          <div className="mt-8">
            <Button as={Link} to="/process" variant="secondary">
              Explore all 13 stages
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>

      <CtaSection
        title="Not sure which service fits?"
        description="Describe what you are trying to achieve. We will help you identify the right starting point."
        primaryLabel="Request a Service"
        primaryTo="/contact#inquiry"
        secondaryLabel="Read about our process"
        secondaryTo="/process"
      />
    </>
  );
}
