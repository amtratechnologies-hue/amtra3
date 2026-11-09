import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useNoIndex } from '../hooks/useNoIndex';
import { cn } from '../utils/cn';
import { useAdminAuth } from './useAdminAuth';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/requests', label: 'Service requests', icon: Inbox },
];

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-sm font-bold text-white">
        A
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-navy-950">AMTRA</p>
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
          Admin panel
        </p>
      </div>
    </div>
  );
}

function NavLinks({ onNavigate }) {
  return (
    <nav className="space-y-1" aria-label="Admin navigation">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-navy-950 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-navy-950',
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default function AdminLayout() {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useNoIndex();

  async function handleLogout() {
    setMenuOpen(false);
    await logout();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="border-b border-slate-200 px-5 py-5">
          <Brand />
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          <NavLinks />
        </div>

        <div className="border-t border-slate-200 p-3">
          <div className="mb-3 rounded-lg bg-slate-50 px-3 py-2.5">
            <p className="truncate text-sm font-medium text-navy-950">
              {admin?.username || 'Administrator'}
            </p>
            <p className="text-[11px] uppercase tracking-wider text-slate-500">
              {admin?.role || 'admin'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <Brand />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="admin-mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-navy-950 transition-colors hover:bg-slate-50"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {menuOpen ? (
          <div
            id="admin-mobile-menu"
            className="border-t border-slate-200 bg-white px-3 py-3"
          >
            <NavLinks onNavigate={() => setMenuOpen(false)} />
            <div className="mt-3 border-t border-slate-200 pt-3">
              <p className="px-3 pb-2 text-xs text-slate-500">
                Signed in as{' '}
                <span className="font-semibold text-navy-950">
                  {admin?.username || 'Administrator'}
                </span>
              </p>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
                Sign out
              </button>
            </div>
          </div>
        ) : null}
      </header>

      <div className="lg:pl-64">
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>

      <div className="sr-only" aria-live="polite">
        <ShieldCheck aria-hidden="true" />
        Secure administrator area
      </div>
    </div>
  );
}
