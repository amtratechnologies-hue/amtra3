import { ArrowRight, BrainCircuit, CloudCog, Globe, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/ui/Button';
import { companyIntro } from '../../constants/company';

const focusAreas = [
  {
    title: 'Web, mobile, and desktop products',
    description: 'Interfaces and platforms that feel fast, clear, and dependable.',
    icon: Globe,
  },
  {
    title: 'AI and workflow automation',
    description: 'Practical intelligence embedded where it adds real value.',
    icon: BrainCircuit,
  },
  {
    title: 'Cloud infrastructure and DevOps',
    description: 'Delivery pipelines and environments that scale with you.',
    icon: CloudCog,
  },
  {
    title: 'Security and technical consulting',
    description: 'Independent guidance for safer, clearer technical decisions.',
    icon: ShieldCheck,
  },
];

export default function IntroSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Who we are"
            title="A software partner focused on outcomes, not just output."
            description={companyIntro[0]}
          />
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            {companyIntro[1]}
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
                    <p className="text-sm font-semibold text-navy-950">{area.title}</p>
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
