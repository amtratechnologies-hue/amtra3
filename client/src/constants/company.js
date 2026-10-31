import {
  Code2,
  Compass,
  Handshake,
  LifeBuoy,
  MessagesSquare,
  ShieldCheck,
  Target,
  Telescope,
  Wrench,
} from 'lucide-react';

export const companyIntro = [
  'AMTRA Technologies is a software development and IT services company. We partner with organizations to design, build, and maintain digital products across web, mobile, desktop, cloud, and AI.',
  'Our approach is deliberately practical: understand the problem, choose the right tools, and deliver software that is clear, secure, and maintainable. We work as an extension of your team, not a black box.',
];

export const mission = {
  title: 'Our mission',
  description:
    'Help organizations turn complex requirements into dependable software that creates lasting value for their users and their business.',
  icon: Target,
};

export const vision = {
  title: 'Our vision',
  description:
    'Be a trusted long-term technology partner known for thoughtful engineering, transparent collaboration, and products built to evolve.',
  icon: Telescope,
};

export const values = [
  {
    id: 'clarity',
    title: 'Clarity',
    description: 'We make goals, decisions, and trade-offs visible so everyone can move in the same direction.',
    icon: Compass,
  },
  {
    id: 'craftsmanship',
    title: 'Craftsmanship',
    description: 'We care about readable code, sensible architecture, and the details that make software last.',
    icon: Wrench,
  },
  {
    id: 'integrity',
    title: 'Integrity',
    description: 'We communicate honestly, protect client information, and stand behind the work we deliver.',
    icon: ShieldCheck,
  },
  {
    id: 'partnership',
    title: 'Partnership',
    description: 'We build alongside your team, share knowledge openly, and plan for your long-term independence.',
    icon: Handshake,
  },
];

export const whyChooseUs = [
  {
    id: 'engineering-quality',
    title: 'Engineering quality',
    description:
      'Maintainable code, thoughtful architecture, and testing where it matters most.',
    icon: Code2,
  },
  {
    id: 'transparent-communication',
    title: 'Transparent communication',
    description:
      'Clear scope, visible progress, and honest conversations about risks and trade-offs.',
    icon: MessagesSquare,
  },
  {
    id: 'security-first',
    title: 'Security by default',
    description:
      'Secure development practices and sensible safeguards are part of the process, not an afterthought.',
    icon: ShieldCheck,
  },
  {
    id: 'built-to-evolve',
    title: 'Built to evolve',
    description:
      'Documentation and knowledge transfer that help your team own and grow the product.',
    icon: LifeBuoy,
  },
];

export const deliveryProcess = [
  {
    id: 'discover',
    title: 'Discover',
    description: 'Understand your goals, users, and constraints before writing code.',
  },
  {
    id: 'design',
    title: 'Design',
    description: 'Shape the architecture, experience, and delivery plan together.',
  },
  {
    id: 'build',
    title: 'Build',
    description: 'Ship in focused increments with visible progress and regular feedback.',
  },
  {
    id: 'evolve',
    title: 'Evolve',
    description: 'Support, measure, and improve the product as your needs change.',
  },
];
