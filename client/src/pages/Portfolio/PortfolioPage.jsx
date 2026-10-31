import { FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import CtaSection from '../../components/common/CtaSection';
import EmptyState from '../../components/common/EmptyState';
import PageHero from '../../components/common/PageHero';
import Button from '../../components/ui/Button';
import ProjectCard from '../../components/ui/ProjectCard';
import { projects } from '../../constants/projects';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function PortfolioPage() {
  usePageMeta(
    'Portfolio',
    'Approved AMTRA Technologies project stories and case studies will be published here.',
  );

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work we can stand behind."
        description="We publish project stories only after client approval. Approved case studies will appear here as they are finalized."
      />

      <section className="py-20 sm:py-24">
        <Container>
          {projects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FolderOpen}
              title="Project showcase coming soon"
              description="We are preparing approved case studies that show how we approach real problems. In the meantime, we would be glad to discuss the kind of work you have in mind."
              action={
                <>
                  <Button as={Link} to="/contact">
                    Discuss your project
                  </Button>
                  <Button as={Link} to="/services" variant="secondary">
                    Explore services
                  </Button>
                </>
              }
            />
          )}
        </Container>
      </section>

      <CtaSection
        title="Your project could be the next story here."
        description="Tell us what you are building. We will be straightforward about whether and how we can help."
        secondaryLabel="Meet the team"
        secondaryTo="/team"
      />
    </>
  );
}
