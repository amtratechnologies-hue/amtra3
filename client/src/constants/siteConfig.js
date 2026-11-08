const configuredUrl = (import.meta.env.VITE_SITE_URL || '')
  .trim()
  .replace(/\/+$/, '');

export const siteConfig = {
  name: 'AMTRA Technologies',
  shortName: 'AMTRA',
  tagline: 'Innovative Software. Intelligent Solutions. Digital Growth.',
  brandMessage: 'Turning Ideas Into Powerful Digital Solutions.',
  description:
    'AMTRA Technologies is an emerging software development and IT solutions company dedicated to delivering innovative, reliable, and customized technology solutions that help businesses grow and succeed in the digital world.',
  url: configuredUrl,
  navLinks: [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Our Process', to: '/process' },
    { label: 'Remote Working', to: '/remote-working' },
    { label: 'Founder & Leadership', to: '/founder' },
    { label: 'Contact Us', to: '/contact' },
  ],
  cta: {
    label: 'Request a Service',
    to: '/contact#inquiry',
  },
  contact: {
    email: 'amtratechnologies@gmail.com',
    location: 'Pakistan',
    whatsapp: 'https://wa.me/923212192954',
    whatsappDisplay: '0321 2192954',
    whatsappInternational: '+92 321 2192954',
  },
  founder: {
    name: 'Ali Raza Chakrani',
    role: 'Founder & CEO',
  },
};
