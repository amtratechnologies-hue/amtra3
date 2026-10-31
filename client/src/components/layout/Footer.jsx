import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../../constants/services';
import { siteConfig } from '../../constants/siteConfig';
import Container from '../common/Container';
import Logo from '../common/Logo';

const companyLinks = [
  { label: 'About', to: '/about' },
  { label: 'Team', to: '/team' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              {siteConfig.description}
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="text-sm font-semibold text-white">Company</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {companyLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-slate-400 transition-colors hover:text-accent-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">Services</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {services.slice(0, 5).map((service) => (
                  <li key={service.id}>
                    <Link
                      to={`/services#${service.id}`}
                      className="text-slate-400 transition-colors hover:text-accent-300"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">Get in touch</h2>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Tell us about your project and we will reply using the details you
                share.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-300 transition-colors hover:text-accent-200"
              >
                Contact us
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built with the MERN stack.</p>
        </div>
      </Container>
    </footer>
  );
}
