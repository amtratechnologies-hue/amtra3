import {
  ArrowRight,
  BrainCircuit,
  CloudCog,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/ui/Button';

const focusAreas = [
  {
    title: 'Custom software and digital products',
    description:
      'Web, mobile, desktop, and custom business systems built around real workflows.',
    icon: Globe,
  },
  {
    title: 'AI and workflow automation',
    description:
      'Intelligent features and automation applied where they create genuine value.',
    icon: BrainCircuit,
  },
  {
    title: 'Cloud infrastructure and DevOps',
    description:
      'Deployment and delivery practices that keep applications reliable as they grow.',
    icon: CloudCog,
  },
  {
    title: 'Security and technical consulting',
    description:
      'Clear guidance and safer engineering practices for important technical decisions.',
    icon: ShieldCheck,
  },
];

export default function IntroSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Your technology partner"
            title="Your Technology Partner for Digital Growth"
            description="At AMTRA Technologies, we combine technical expertise, creativity, and modern development practices to deliver solutions that help businesses operate smarter and grow faster."
          />

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            We are an emerging software development company focused on turning
            ideas into practical, reliable, and scalable digital products. Every
            engagement starts with understanding the problem before choosing the
            technology.
          </p>

          <Button as={Link} to="/about" variant="secondary" className="mt-8">
            More about AMTRA
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy-900">
            What we focus on
          </h2>

          <ul className="mt-6 space-y-5">
            {focusAreas.map((area) => {
              const Icon = area.icon;

              return (
                <li key={area.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-accent-700 shadow-sm ring-1 ring-slate-200">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy-950">
                      {area.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {area.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
