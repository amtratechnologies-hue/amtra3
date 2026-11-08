import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';

const HomePage = lazy(() => import('./pages/Home/HomePage'));
const AboutPage = lazy(() => import('./pages/About/AboutPage'));
const ServicesPage = lazy(() => import('./pages/Services/ServicesPage'));
const ServiceDetailPage = lazy(
  () => import('./pages/Services/ServiceDetailPage'),
);
const ProcessPage = lazy(() => import('./pages/Process/ProcessPage'));
const RemoteWorkingPage = lazy(
  () => import('./pages/RemoteWorking/RemoteWorkingPage'),
);
const FounderPage = lazy(() => import('./pages/Founder/FounderPage'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFoundPage'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:serviceId" element={<ServiceDetailPage />} />
        <Route path="process" element={<ProcessPage />} />
        <Route path="remote-working" element={<RemoteWorkingPage />} />
        <Route path="founder" element={<FounderPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
