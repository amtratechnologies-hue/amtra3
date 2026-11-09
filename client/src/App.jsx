import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminAuthProvider from './admin/AdminAuthProvider';
import AdminLayout from './admin/AdminLayout';
import RequireAdmin from './admin/RequireAdmin';

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
const AdminLoginPage = lazy(
  () => import('./pages/Admin/AdminLoginPage'),
);
const AdminDashboardPage = lazy(
  () => import('./pages/Admin/AdminDashboardPage'),
);
const AdminRequestsPage = lazy(
  () => import('./pages/Admin/AdminRequestsPage'),
);
const AdminRequestDetailPage = lazy(
  () => import('./pages/Admin/AdminRequestDetailPage'),
);

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

      <Route path="admin" element={<AdminAuthProvider />}>
        <Route path="login" element={<AdminLoginPage />} />
        <Route element={<RequireAdmin />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="requests" element={<AdminRequestsPage />} />
            <Route path="requests/:id" element={<AdminRequestDetailPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
  );
}
