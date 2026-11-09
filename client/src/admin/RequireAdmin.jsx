import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAdminAuth } from './useAdminAuth';

export default function RequireAdmin() {
  const { status } = useAdminAuth();
  const location = useLocation();

  if (status === 'loading') {
    return <LoadingSpinner fullPage label="Checking your session…" />;
  }

  if (status !== 'authenticated') {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return <Outlet />;
}
