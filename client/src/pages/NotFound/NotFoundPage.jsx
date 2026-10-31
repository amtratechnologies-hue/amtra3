import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import Button from '../../components/ui/Button';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function NotFoundPage() {
  usePageMeta(
    'Page not found',
    'The page you are looking for could not be found on the AMTRA Technologies website.',
  );

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-200/40 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-700">
          Error 404
        </p>
        <p className="mt-4 text-7xl font-extrabold tracking-tight text-navy-950 sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
          This page could not be found.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base leading-7 text-slate-600">
          The page may have moved, or the address may be incorrect. Let&apos;s get
          you back to something useful.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button as={Link} to="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Button>
          <Button as={Link} to="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}
