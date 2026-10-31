import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';

const HomePage = lazy(() => import('./pages/Home/HomePage'));
const AboutPage = lazy(() => import('./pages/About/AboutPage'));
const ServicesPage = lazy(() => import('./pages/Services/ServicesPage'));
const PortfolioPage = lazy(() => import('./pages/Portfolio/PortfolioPage'));
const TeamPage = lazy(() => import('./pages/Team/TeamPage'));
const CareersPage = lazy(() => import('./pages/Careers/CareersPage'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFoundPage'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
