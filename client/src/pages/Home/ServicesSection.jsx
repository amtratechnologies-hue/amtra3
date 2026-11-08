import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/ui/Button';
import ServiceCard from '../../components/ui/ServiceCard';
import { services } from '../../constants/services';

export default function ServicesSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Services built around your business goals."
            description="From a new website to a custom platform or an AI feature, we bring the right mix of product thinking and hands-on engineering."
          />

          <Button
            as={Link}
            to="/services"
            variant="secondary"
            className="shrink-0"
          >
            View all services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
