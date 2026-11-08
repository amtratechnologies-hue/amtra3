import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Container from '../../components/common/Container';
import CtaSection from '../../components/common/CtaSection';
import PageHero from '../../components/common/PageHero';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/ui/Button';
import ServiceCard from '../../components/ui/ServiceCard';
import { services, serviceById } from '../../constants/services';
import { usePageMeta } from '../../hooks/usePageMeta';

const deliverySteps = [
  'Discuss your requirements and clarify the scope',
  'Plan the approach, architecture, and milestones',
  'Build and review the solution in visible increments',
  'Test, deploy, and support the delivered work',
];

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const service = serviceById[serviceId];

  usePageMeta(
    service ? service.title : 'Service Not Found',
    service
      ? service.summary
      : 'The requested service could not be found. Explore the full range of AMTRA Technologies services.',
  );

  if (!service) {
    return (
      <section className="py-24 sm:py-28">
        <Container className="max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-700">
            Service not found
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
            We could not find that service.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            The link may be out of date. Browse our full service list or send us
            an inquiry and we will point you in the right direction.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button as={Link} to="/services" variant="primary">
              View all services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button as={Link} to="/contact#inquiry" variant="secondary">
              Request a Service
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  const Icon = service.icon;
  const relatedServices = services
    .filter((item) => item.id !== service.id)
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Service details"
        title={service.title}
        description={service.summary}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            as={Link}
            to={`/contact?service=${service.id}#inquiry`}
            variant="accent"
            size="lg"
          >
            Request This Service
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button as={Link} to="/services" variant="outlineLight" size="lg">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All services
          </Button>
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-accent-700 ring-1 ring-navy-100">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-700">
                  AMTRA service
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-navy-950">
                  About this service
                </h2>
              </div>
            </div>

            <p className="mt-6 text-base leading-8 text-slate-600">
              {service.description}
            </p>

            <div className="mt-10">
              <h2 className="text-xl font-semibold text-navy-950">
                Key capabilities
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-600"
                      aria-hidden="true"
                    />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>

            {service.disclaimer ? (
              <div className="mt-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
                <AlertCircle
                  className="mt-0.5 h-5 w-5 shrink-0"
                  aria-hidden="true"
                />
                <p>{service.disclaimer}</p>
              </div>
            ) : null}

            <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-navy-950">
                How we deliver this service
              </h2>
              <ol className="mt-5 space-y-4">
                {deliverySteps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-950 text-xs font-bold text-accent-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="pt-1 text-sm leading-6 text-slate-600">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
              <Link
                to="/process"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-600"
              >
                See the full 13-stage process
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-28">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent-700">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Business benefits
            </div>

            <ul className="mt-5 space-y-3">
              {service.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"
                    aria-hidden="true"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-slate-100 pt-6">
              <p className="text-sm leading-6 text-slate-600">
                Tell us about your requirements and we will recommend a
                practical starting point for this service.
              </p>
              <Button
                as={Link}
                to={`/contact?service=${service.id}#inquiry`}
                className="mt-4 w-full"
              >
                Request This Service
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <p className="mt-3 text-center text-xs leading-5 text-slate-500">
                The inquiry form will open with this service already selected.
              </p>
            </div>
          </aside>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Explore more"
            title="Related services"
            description="Many projects combine more than one capability. These services are often discussed alongside the one you are viewing."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((item) => (
              <ServiceCard key={item.id} service={item} />
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title="Ready to discuss this service?"
        description="Share your requirements and we will respond with questions, an initial direction, and the next practical step."
        primaryLabel="Request This Service"
        primaryTo={`/contact?service=${service.id}#inquiry`}
        secondaryLabel="View all services"
        secondaryTo="/services"
      />
    </>
  );
}
