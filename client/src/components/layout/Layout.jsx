import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import ScrollToTop from '../common/ScrollToTop';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-navy-950 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1">
        <Suspense fallback={<LoadingSpinner fullPage label="Loading page…" />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
