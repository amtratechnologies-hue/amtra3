import { Briefcase, Clock, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import PageHero from '../../components/common/PageHero';
import ContactForm from '../../features/contact/ContactForm';
import { siteConfig } from '../../constants/siteConfig';
import { usePageMeta } from '../../hooks/usePageMeta';

const contactInfo = [
  {
    title: 'Project inquiries',
    description:
      'Share your goals, timeline, and any constraints you already know about. The more context you provide, the more useful our first reply will be.',
    icon: MessageSquare,
  },
  {
    title: 'Careers',
    description:
      'Open roles are listed on the Careers page. For general questions, you are welcome to use this form.',
    icon: Briefcase,
    link: { label: 'View careers', to: '/careers' },
  },
  {
    title: 'What happens next',
    description:
      'We review every message and reply using the contact details you provide. Your information is used only to respond to this inquiry.',
    icon: Clock,
  },
];

export default function ContactPage() {
  usePageMeta(
    'Contact',
    'Contact AMTRA Technologies about a new project, a technical challenge, or a general question.',
  );

  const { contact } = siteConfig;
  const hasDirectContact = Boolean(contact.email || contact.phone || contact.address);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about what you are building."
        description="Tell us where you are today and where you want to go. We will reply with a clear, practical next step."
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-navy-950">
              Start a conversation
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Use the form to tell us about your project, or review the options
              below if you are not sure where to start.
            </p>

            <ul className="mt-8 space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-accent-700 ring-1 ring-navy-100">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-navy-950">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                      {item.link ? (
                        <Link
                          to={item.link.to}
                          className="mt-2 inline-flex text-sm font-semibold text-accent-700 transition-colors hover:text-accent-600"
                        >
                          {item.link.label}
                        </Link>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-semibold text-navy-950">
                Official contact details
              </h3>

              {hasDirectContact ? (
                <dl className="mt-3 space-y-2 text-sm text-slate-600">
                  {contact.email ? (
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd>
                        <a
                          href={`mailto:${contact.email}`}
                          className="font-medium text-accent-700 hover:text-accent-600"
                        >
                          {contact.email}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  {contact.phone ? (
                    <div>
                      <dt className="sr-only">Phone</dt>
                      <dd>{contact.phone}</dd>
                    </div>
                  ) : null}
                  {contact.address ? (
                    <div>
                      <dt className="sr-only">Address</dt>
                      <dd>{contact.address}</dd>
                    </div>
                  ) : null}
                </dl>
              ) : (
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Email, phone, and office details will be published here once they
                  are finalized. For now, the form is the best way to reach us.
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="mb-5">
              <h2 className="text-2xl font-bold tracking-tight text-navy-950">
                Send us a message
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Fields marked with <span className="text-red-500">*</span> are
                required.
              </p>
            </div>

            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
