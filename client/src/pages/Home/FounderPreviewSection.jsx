import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/ui/Button';
import { founder } from '../../constants/company';

export default function FounderPreviewSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-16">
        <div className="mx-auto w-full max-w-xs">
          <div className="relative flex aspect-square items-center justify-center rounded-2xl border border-slate-200 bg-navy-950 shadow-lg shadow-navy-900/10">
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500/20 via-transparent to-secondary-500/20"
              aria-hidden="true"
            />
            <span className="relative text-5xl font-extrabold tracking-[0.12em] text-accent-300">
              {founder.initials}
            </span>
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">
            Founder & CEO
          </p>
        </div>

        <div>
          <SectionHeading
            eyebrow="Founder & leadership"
            title="Led by a focus on practical technology."
            description="AMTRA Technologies was founded with a vision to build innovative digital solutions and create opportunities through technology."
          />

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-lg font-semibold text-navy-950">
              {founder.name}
            </p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-accent-700">
              {founder.role}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              He leads the company&apos;s vision, project planning, team
              collaboration, and business development, with a focus on
              delivering valuable technology solutions to clients.
            </p>
          </div>

          <Button as={Link} to="/founder" variant="secondary" className="mt-6">
            Meet the founder
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
