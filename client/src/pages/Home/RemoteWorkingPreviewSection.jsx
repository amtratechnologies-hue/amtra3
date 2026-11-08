import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/ui/Button';
import { remoteWorking } from '../../constants/company';

export default function RemoteWorkingPreviewSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Remote working"
            title="Remote-first collaboration, wherever you are."
            description="We work with clients internationally through online meetings, shared development workflows, and clear project communication."
          />

          <Button
            as={Link}
            to="/remote-working"
            variant="secondary"
            className="shrink-0"
          >
            How we collaborate
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {remoteWorking.items.slice(0, 3).map((item) => {
            const Icon = item.icon;

            return (
              <li
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-accent-700 shadow-sm ring-1 ring-slate-200">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
