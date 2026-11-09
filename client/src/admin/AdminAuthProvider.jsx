import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  fetchCurrentAdmin,
  loginAdmin,
  logoutAdmin,
} from '../services/adminService';
import { setUnauthorizedHandler } from '../services/adminApiClient';
import { AdminAuthContext } from './AdminAuthContext';

export default function AdminAuthProvider() {
  const [status, setStatus] = useState('loading');
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchCurrentAdmin()
      .then((data) => {
        if (cancelled) {
          return;
        }

        setAdmin(data.admin);
        setStatus('authenticated');
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setAdmin(null);
        setStatus('anonymous');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setAdmin(null);
      setStatus('anonymous');
    });

    return () => setUnauthorizedHandler(null);
  }, []);

  const login = useCallback(async (credentials) => {
    const data = await loginAdmin(credentials);
    setAdmin(data.admin);
    setStatus('authenticated');
    return data.admin;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutAdmin();
    } catch {
      // Clear the local state even if the server session already expired.
    }

    setAdmin(null);
    setStatus('anonymous');
  }, []);

  const value = useMemo(
    () => ({ status, admin, login, logout }),
    [status, admin, login, logout],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      <Outlet />
    </AdminAuthContext.Provider>
  );
}
