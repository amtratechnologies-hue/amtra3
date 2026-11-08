import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { siteConfig } from '../../constants/siteConfig';
import { cn } from '../../utils/cn';
import Logo from '../common/Logo';
import Button from '../ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Logo onClick={closeMenu} />

        <div className="hidden items-center gap-0.5 xl:flex">
          {siteConfig.navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-navy-50 text-navy-950'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-navy-900',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden xl:block">
          <Button as={Link} to={siteConfig.cta.to} size="sm">
            {siteConfig.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-navy-900 transition-colors hover:bg-slate-50 xl:hidden"
        >
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {isOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white xl:hidden"
        >
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <ul className="space-y-1">
              {siteConfig.navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-lg px-3 py-3 text-base font-medium transition-colors',
                        isActive
                          ? 'bg-navy-50 text-navy-950'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-navy-900',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <Button
              as={Link}
              to={siteConfig.cta.to}
              onClick={closeMenu}
              className="mt-4 w-full"
            >
              {siteConfig.cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
