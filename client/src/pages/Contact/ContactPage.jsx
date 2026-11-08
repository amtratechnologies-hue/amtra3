import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import Container from '../../components/common/Container';
import FaqAccordion from '../../components/common/FaqAccordion';
import PageHero from '../../components/common/PageHero';
import SectionHeading from '../../components/common/SectionHeading';
import ContactForm from '../../features/contact/ContactForm';
import { faqs } from '../../constants/company';
import { siteConfig } from '../../constants/siteConfig';
import { usePageMeta } from '../../hooks/usePageMeta';

const nextSteps = [
  {
    title: 'We review your inquiry',
    description:
      'Our team reads the requirements, checks the scope, and identifies any details we need to clarify.',
  },
  {
    title: 'We reply with next steps',
    description:
      'We respond using your preferred contact method with questions, an initial direction, or a request for a short discussion.',
  },
  {
    title: 'We agree on the approach',
    description:
      'If the project is a fit, we define the scope, deliverables, timeline, and commercial terms in writing before work begins.',
  },
];

export default function ContactPage() {
  usePageMeta(
    'Contact Us',
    'Contact AMTRA Technologies about a software project, technical challenge, or service requirement. Send a detailed project inquiry to amtratechnologies@gmail.com or message our official WhatsApp.',
  );

  const { contact } = siteConfig;
  const [searchParams] = useSearchParams();

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Build Something Great Together."
        description="Have a project idea, a business challenge, or a technology requirement? Contact AMTRA Technologies. Our team would be happy to discuss your requirements and explore the right solution."
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Start a conversation"
              title="Tell us what you want to build."
              description="The more context you share, the more useful our first response will be. There is no obligation, and we will be straightforward about whether we are the right fit."
            />

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-lg hover:shadow-navy-900/5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-accent-700 ring-1 ring-navy-100">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Business Email
                  </span>
                  <span className="mt-1 block break-all text-sm font-semibold text-navy-950 group-hover:text-accent-700">
                    {contact.email}
                  </span>
                </span>
              </a>

              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-lg hover:shadow-navy-900/5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-accent-700 ring-1 ring-navy-100">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Official WhatsApp
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-navy-950 group-hover:text-accent-700">
                    {contact.whatsappInternational}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">
                    Opens WhatsApp in a new tab.
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-accent-700 ring-1 ring-navy-100">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Location
                  </p>
                  <p className="mt-1 text-sm font-semibold text-navy-950">
                    {contact.location}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    We work with clients locally and remotely.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-sm font-semibold text-navy-950">
                How we communicate
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Email and the inquiry form are the best ways to share detailed
                requirements. WhatsApp is available for quick questions and
                follow-ups. We do not publish a physical office address.
              </p>
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-semibold text-navy-950">
                What happens next
              </h2>
              <ol className="mt-5 space-y-5">
                {nextSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-950 text-xs font-bold text-accent-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-navy-950">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div id="inquiry" className="scroll-mt-28">
            <div className="mb-5">
              <h2 className="text-2xl font-bold tracking-tight text-navy-950">
                Send a project inquiry
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Fields marked with <span className="text-red-500">*</span> are
                required. Your inquiry is sent directly to our team.
              </p>
            </div>

            <ContactForm key={searchParams.get('service') || 'default'} />
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions before you start?"
            description="Here are answers to the questions we are asked most often. If yours is not covered, send us an inquiry and we will respond directly."
          />

          <FaqAccordion items={faqs} />
        </Container>
      </section>
    </>
  );
}
