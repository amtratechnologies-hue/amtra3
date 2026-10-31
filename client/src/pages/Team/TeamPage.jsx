import { Info } from 'lucide-react';
import Container from '../../components/common/Container';
import CtaSection from '../../components/common/CtaSection';
import PageHero from '../../components/common/PageHero';
import SectionHeading from '../../components/common/SectionHeading';
import TeamCard from '../../components/ui/TeamCard';
import { teamMembers, teamNote } from '../../constants/team';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function TeamPage() {
  usePageMeta(
    'Team',
    'Meet the disciplines behind AMTRA Technologies: engineering, product and design, quality, and cloud and security.',
  );

  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="The people behind the work."
        description="AMTRA is organized around a small set of core disciplines. Together, they cover the product journey from early discovery through long-term support."
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Disciplines"
            title="How our team is organized."
            description="Each discipline owns a part of the delivery lifecycle while working closely with the others."
          />

          <div className="mt-8 flex max-w-3xl items-start gap-3 rounded-xl border border-accent-200 bg-accent-50 p-5 text-sm leading-6 text-navy-900">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent-700" aria-hidden="true" />
            <p>{teamNote}</p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title="Want to build with us?"
        description="We announce open roles on our Careers page as soon as they are available."
        primaryLabel="Visit careers"
        primaryTo="/careers"
        secondaryLabel="Contact us"
        secondaryTo="/contact"
      />
    </>
  );
}
