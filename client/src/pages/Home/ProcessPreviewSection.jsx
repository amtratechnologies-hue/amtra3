import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/ui/Button';
import { deliveryProcess } from '../../constants/company';

export default function ProcessPreviewSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="How we work"
            title="A clear process from idea to launch."
            description="Every phase has a defined purpose, visible progress, and room for your feedback. No black boxes."
          />

          <Button
            as={Link}
            to="/process"
            variant="secondary"
            className="shrink-0"
          >
            Explore Our Process
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

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

        <p className="mt-6 text-sm text-slate-600">
          The process continues through testing, deployment, and ongoing
          maintenance. {' '}
          <Link
            to="/process"
            className="font-semibold text-accent-700 hover:text-accent-600"
          >
            See all 13 stages
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
