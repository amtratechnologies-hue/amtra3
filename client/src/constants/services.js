import {
  Boxes,
  BrainCircuit,
  CloudCog,
  CreditCard,
  Database,
  Globe,
  Lightbulb,
  Megaphone,
  Monitor,
  Network,
  ShieldCheck,
  Smartphone,
  Wrench,
} from 'lucide-react';

export const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    icon: Globe,
    summary:
      'Modern, responsive, and secure websites and web applications built around your business goals.',
    description:
      'We build modern, responsive, secure, and scalable websites and web applications that help businesses establish a strong online presence and run their operations more effectively. Every build is shaped around the people who will use it and the outcomes the business needs.',
    capabilities: [
      'Business and corporate websites',
      'E-commerce websites',
      'Custom web applications',
      'Full-stack development',
      'API integration',
      'Performance and accessibility improvements',
    ],
    benefits: [
      'A professional, mobile-friendly presence that builds trust',
      'Faster, more reliable day-to-day digital operations',
      'A scalable foundation you can extend over time',
    ],
  },
  {
    id: 'mobile-development',
    title: 'Mobile Application Development',
    icon: Smartphone,
    summary:
      'User-friendly mobile applications designed for smooth experiences and practical, everyday functionality.',
    description:
      'We develop mobile applications that give customers and teams a direct, convenient way to interact with your business. The focus is on clear interfaces, dependable performance, and functionality that earns a place on the user’s device.',
    capabilities: [
      'Android applications',
      'Cross-platform applications',
      'Mobile UI/UX design',
      'API integration',
      'Push notifications and device features',
      'Application maintenance and updates',
    ],
    benefits: [
      'A direct, convenient channel for your customers',
      'A consistent experience across supported devices',
      'A product that can grow with your business',
    ],
  },
  {
    id: 'desktop-development',
    title: 'Desktop Application Development',
    icon: Monitor,
    summary:
      'Custom desktop tools that automate tasks, organize operations, and improve team productivity.',
    description:
      'We develop custom desktop applications for teams that need dependable, focused tools for daily operations. These solutions are useful when work depends on local files, specialized hardware, offline access, or workflows that are better served outside a browser.',
    capabilities: [
      'Windows applications',
      'Business management software',
      'Desktop workflow automation',
      'Database-driven applications',
      'Local and network-based systems',
      'Reporting and data export tools',
    ],
    benefits: [
      'Less repetitive manual work for your team',
      'Centralized business data and workflows',
      'Software tailored to how your team already works',
    ],
  },
  {
    id: 'custom-software-development',
    title: 'Custom Software Development',
    icon: Boxes,
    featured: true,
    featuredLabel: 'Core specialty',
    summary:
      'Purpose-built software that fits your workflows instead of forcing your business into a generic template.',
    description:
      'Custom software is at the center of what we do. We design and build systems around the way your business actually operates, connecting people, data, and processes in one dependable solution. Whether you are replacing spreadsheets, connecting disconnected tools, or launching an internal platform, the result is software shaped by your requirements.',
    capabilities: [
      'Business management systems',
      'ERP and CRM solutions',
      'Enterprise applications',
      'Workflow automation',
      'API development and integration',
      'Customized web and desktop applications',
    ],
    benefits: [
      'One system aligned with your real operating model',
      'Less manual work and fewer disconnected tools',
      'A platform that can evolve as your business changes',
      'Clear ownership of the software and its data',
    ],
  },
  {
    id: 'payment-application-development',
    title: 'Payment Application Development',
    icon: CreditCard,
    featured: true,
    featuredLabel: 'Specialized capability',
    summary:
      'Secure payment experiences, transaction workflows, and billing systems built around your provider and requirements.',
    description:
      'We build payment-related applications and interfaces with careful attention to transaction clarity, security, and reliability. Work can range from a payment gateway integration to a billing workflow, a transaction dashboard, or a wallet-style solution, depending on your business model and the providers you work with.',
    capabilities: [
      'Payment-related applications',
      'Payment gateway integration',
      'Digital payment interfaces',
      'Transaction management',
      'Billing systems',
      'Wallet-related solutions',
    ],
    benefits: [
      'A clearer, more dependable payment experience for users',
      'Transaction records and workflows that are easier to manage',
      'Integration shaped around your chosen payment providers',
      'A foundation that can support future payment methods',
    ],
    disclaimer:
      'Payment gateway availability, provider accounts, regulatory requirements, and third-party integrations depend on the client’s requirements and chosen providers.',
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions & Automation',
    icon: BrainCircuit,
    summary:
      'Practical AI integration that makes applications and business workflows smarter and more efficient.',
    description:
      'We integrate artificial intelligence into applications and business workflows where it creates genuine value. That may mean an assistant that answers common questions, automation that removes repetitive steps, or an AI-powered feature that helps your team make better use of the information it already has.',
    capabilities: [
      'AI-powered applications',
      'AI chatbots and assistants',
      'Conversational AI',
      'AI API integration',
      'Intelligent workflow automation',
      'AI-based business solutions',
    ],
    benefits: [
      'Faster responses and reduced manual effort',
      'Smarter use of your existing business information',
      'Practical automation that fits real workflows',
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Services',
    icon: ShieldCheck,
    summary:
      'Security-focused development practices and authorized assessments that help reduce application risk.',
    description:
      'We help improve application and system security through security-focused development practices and authorized security assessments. The goal is to identify practical risks, reduce exposure, and leave your team with clearer habits for building and operating software safely.',
    capabilities: [
      'Web application security',
      'Vulnerability assessment',
      'Security testing',
      'Input validation and secure coding',
      'Authentication and access-control review',
      'Security consultation',
    ],
    benefits: [
      'Reduced exposure to common application risks',
      'Clearer visibility into security weaknesses',
      'Safer development habits for your team',
    ],
  },
  {
    id: 'database-solutions',
    title: 'Database Solutions',
    icon: Database,
    summary:
      'Well-structured, optimized databases that support reliable data management and application performance.',
    description:
      'We design, develop, and optimize database systems that support reliable data management and application performance. Good database work is often invisible when it is done well: queries stay responsive, data remains consistent, and the structure can support the next stage of growth.',
    capabilities: [
      'Database design and modeling',
      'SQL databases',
      'MongoDB and document databases',
      'Database optimization',
      'Data migration and management',
      'Backup and recovery planning',
    ],
    benefits: [
      'Reliable access to business-critical data',
      'Better application performance under load',
      'A data structure that supports future growth',
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Computing & DevOps',
    icon: CloudCog,
    summary:
      'Deployment, infrastructure, and delivery automation that keep applications reliable and maintainable.',
    description:
      'We help businesses deploy, manage, and maintain applications using modern cloud and DevOps practices. This includes setting up repeatable deployment workflows, configuring cloud infrastructure, and improving visibility into how a running application is behaving.',
    capabilities: [
      'Application deployment',
      'Cloud infrastructure setup',
      'CI/CD pipelines',
      'Server configuration',
      'Deployment automation',
      'Application monitoring',
    ],
    benefits: [
      'Predictable, repeatable deployments',
      'Infrastructure that can scale with demand',
      'Better visibility into application health',
    ],
  },
  {
    id: 'networking-it-infrastructure',
    title: 'Networking & IT Infrastructure',
    icon: Network,
    summary:
      'Technical assistance for network configuration, troubleshooting, systems, and IT infrastructure.',
    description:
      'We provide technical assistance for network infrastructure, system configuration, and IT-related challenges. Support is practical and scoped to the environment you have, whether that means diagnosing connectivity issues, configuring systems, or improving the reliability of day-to-day IT operations.',
    capabilities: [
      'Network configuration',
      'Network troubleshooting',
      'IT infrastructure support',
      'System configuration',
      'Connectivity and performance review',
      'Technical documentation',
    ],
    benefits: [
      'A more stable day-to-day IT environment',
      'Faster diagnosis of connectivity issues',
      'Practical support for system configuration',
    ],
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting',
    icon: Lightbulb,
    summary:
      'Clear technical guidance for choosing technologies, planning software, and improving digital operations.',
    description:
      'We provide technical guidance to help businesses select suitable technologies, plan software solutions, and improve their digital operations. Consulting is useful when you need an experienced perspective before committing to a platform, architecture, or delivery approach.',
    capabilities: [
      'Technical consultation',
      'Software planning and roadmaps',
      'Technology selection',
      'Digital transformation guidance',
      'Architecture and feasibility review',
      'Delivery and team process advice',
    ],
    benefits: [
      'Clearer technology decisions',
      'A realistic software roadmap',
      'Better alignment between business goals and technology',
    ],
  },
  {
    id: 'website-maintenance-support',
    title: 'Website Maintenance & Technical Support',
    icon: Wrench,
    summary:
      'Ongoing updates, fixes, and improvements that keep existing websites and applications healthy.',
    description:
      'We help maintain and improve existing websites and applications through regular updates, bug fixes, technical improvements, and feature enhancements. Support can be arranged as an ongoing arrangement or as focused work on a specific issue.',
    capabilities: [
      'Bug fixing',
      'Website and dependency updates',
      'Feature development',
      'Performance improvements',
      'Technical support',
      'Security and compatibility checks',
    ],
    benefits: [
      'A safer, more current website',
      'Faster resolution of bugs and issues',
      'Continuous improvements without starting over',
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    icon: Megaphone,
    summary:
      'Digital presence and online marketing support aligned with your business and communication goals.',
    description:
      'We help businesses improve their digital presence through online marketing strategies and digital growth solutions. The work starts with a clear understanding of your audience and goals, then focuses on consistent communication and measurable improvements over time.',
    capabilities: [
      'Digital presence strategy',
      'Social media management',
      'Online marketing support',
      'Content and campaign planning',
      'Audience and channel review',
      'Performance reporting',
    ],
    benefits: [
      'A more consistent digital presence',
      'Clearer communication with your audience',
      'Marketing activity aligned with business goals',
    ],
  },
];

export const featuredServices = services.filter((service) => service.featured);

export const serviceById = Object.fromEntries(
  services.map((service) => [service.id, service]),
);
