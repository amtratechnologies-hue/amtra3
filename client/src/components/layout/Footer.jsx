import { ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../../constants/services';
import { siteConfig } from '../../constants/siteConfig';
import Container from '../common/Container';
import Logo from '../common/Logo';

export default function Footer() {
  const { contact } = siteConfig;

  return (
    <footer className="bg-navy-950 text-slate-300">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              {siteConfig.description}
            </p>
            <p className="mt-6 text-xs font-semibold uppercase leading-5 tracking-[0.16em] text-slate-400">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="text-sm font-semibold text-white">Company</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {siteConfig.navLinks.map((link) => (
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
                {services.slice(0, 6).map((service) => (
                  <li key={service.id}>
                    <Link
                      to={`/services/${service.id}`}
                      className="text-slate-400 transition-colors hover:text-accent-300"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1 font-semibold text-accent-300 transition-colors hover:text-accent-200"
                  >
                    View all services
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-sm font-semibold text-white">Get in touch</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-start gap-2 transition-colors hover:text-accent-300"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="break-all">{contact.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-start gap-2 transition-colors hover:text-accent-300"
                  >
                    <MessageCircle
                      className="mt-0.5 h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      WhatsApp
                      <span className="mt-0.5 block text-xs text-slate-400">
                        {contact.whatsappInternational}
                      </span>
                    </span>
                  </a>
                </li>
                <li className="inline-flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{contact.location}</span>
                </li>
              </ul>

              <Link
                to="/contact#inquiry"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-300 transition-colors hover:text-accent-200"
              >
                Request a Service
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 AMTRA Technologies. All Rights Reserved.</p>
          <p>{siteConfig.brandMessage}</p>
        </div>
      </Container>
    </footer>
  );
}
