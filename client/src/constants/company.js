import {
  Activity,
  BadgeCheck,
  ClipboardList,
  Code2,
  Compass,
  Cpu,
  Eye,
  FileCode2,
  FileText,
  GitBranch,
  GitPullRequest,
  Globe2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  LayoutDashboard,
  LifeBuoy,
  Lightbulb,
  ListChecks,
  MessagesSquare,
  PackageCheck,
  PenTool,
  Puzzle,
  Rocket,
  Server,
  ShieldCheck,
  Target,
  Telescope,
  TestTube2,
  TrendingUp,
  UserCheck,
  Users,
  Video,
  Workflow,
} from 'lucide-react';

export const companyIntro = [
  'AMTRA Technologies is an emerging software development and IT solutions company dedicated to delivering innovative, reliable, and customized technology solutions that help businesses grow and succeed in the digital world.',
  'We work across web, mobile, desktop, and custom software, with additional capabilities in AI, cybersecurity, databases, cloud infrastructure, networking, IT consulting, maintenance, and digital marketing.',
  'Our approach is practical and collaborative: understand the real problem, define a clear scope, build in visible increments, and support what we deliver. We work with clients locally in Pakistan and remotely with businesses internationally.',
];

export const mission = {
  title: 'Our Mission',
  description:
    'To empower businesses and individuals through innovative software development and reliable IT solutions that simplify challenges and accelerate digital growth.',
  icon: Target,
};

export const vision = {
  title: 'Our Vision',
  description:
    'To establish AMTRA Technologies as a trusted global technology partner, delivering impactful digital solutions and contributing to a smarter, more connected future.',
  icon: Telescope,
};

export const values = [
  {
    id: 'innovation',
    title: 'Innovation',
    description:
      'We look for practical ways technology can solve real problems and create new opportunities.',
    icon: Lightbulb,
  },
  {
    id: 'quality',
    title: 'Quality',
    description:
      'We care about reliable software, thoughtful implementation, and details that hold up over time.',
    icon: BadgeCheck,
  },
  {
    id: 'transparency',
    title: 'Transparency',
    description:
      'We keep goals, decisions, and trade-offs visible so clients always understand where the project stands.',
    icon: Eye,
  },
  {
    id: 'client-satisfaction',
    title: 'Client Satisfaction',
    description:
      'We measure success by how well the delivered solution serves the people who use it.',
    icon: HeartHandshake,
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description:
      'We work alongside clients, share knowledge openly, and treat their goals as our own.',
    icon: Users,
  },
  {
    id: 'continuous-learning',
    title: 'Continuous Learning',
    description:
      'We keep learning, refining our craft, and adopting better tools and practices as technology evolves.',
    icon: GraduationCap,
  },
];

export const approach = [
  {
    id: 'understand',
    title: 'Understand the real problem',
    description:
      'We start with your business context, users, and constraints — not with a predefined technology choice.',
    icon: Compass,
  },
  {
    id: 'plan',
    title: 'Plan with clarity',
    description:
      'We define scope, priorities, and a realistic delivery path so expectations are clear from the beginning.',
    icon: ClipboardList,
  },
  {
    id: 'build',
    title: 'Build and review iteratively',
    description:
      'We deliver in focused increments, invite feedback early, and keep the product aligned with your goals.',
    icon: Code2,
  },
  {
    id: 'support',
    title: 'Support what we deliver',
    description:
      'We document, hand over, and provide agreed support so the solution remains useful long after launch.',
    icon: LifeBuoy,
  },
];

export const whyChooseUs = [
  {
    id: 'client-focused',
    title: 'Client-Focused Approach',
    description:
      'Your goals, users, and constraints shape every decision we make — not a one-size-fits-all template.',
    icon: Users,
  },
  {
    id: 'customized-solutions',
    title: 'Customized Solutions',
    description:
      'We design and build around your actual workflow instead of forcing your business into generic software.',
    icon: Puzzle,
  },
  {
    id: 'modern-technologies',
    title: 'Modern Technologies',
    description:
      'We use current, well-supported tools and frameworks that are practical to maintain and extend.',
    icon: Cpu,
  },
  {
    id: 'transparent-communication',
    title: 'Transparent Communication',
    description:
      'Clear scope, visible progress, and honest conversations about risks, changes, and trade-offs.',
    icon: MessagesSquare,
  },
  {
    id: 'scalable-development',
    title: 'Scalable Development',
    description:
      'We build with growth in mind so your product can handle new users, features, and business needs.',
    icon: TrendingUp,
  },
  {
    id: 'ongoing-support',
    title: 'Ongoing Technical Support',
    description:
      'We stay available after delivery for agreed maintenance, fixes, and improvements when you need them.',
    icon: LifeBuoy,
  },
];

export const deliveryProcess = [
  {
    id: 'client-inquiry',
    number: '01',
    title: 'Client Inquiry & Initial Discussion',
    description:
      'We start with a conversation about your idea, the problem you want to solve, and the outcome you expect. This helps us understand whether the project is a good fit and what information we need next.',
    icon: MessagesSquare,
  },
  {
    id: 'requirement-analysis',
    number: '02',
    title: 'Requirement Analysis',
    description:
      'We examine the users, workflows, features, constraints, and existing systems involved. Open questions are clarified before estimates or technical decisions are treated as final.',
    icon: ClipboardList,
  },
  {
    id: 'proposal-estimation',
    number: '03',
    title: 'Project Proposal & Cost Estimation',
    description:
      'You receive a written proposal covering the proposed scope, deliverables, assumptions, timeline, and cost. The goal is a shared understanding of what will be built and what it depends on.',
    icon: FileText,
  },
  {
    id: 'agreement-kickoff',
    number: '04',
    title: 'Agreement & Project Kickoff',
    description:
      'Once the scope and commercial terms are agreed, we confirm responsibilities, communication channels, milestones, and the working schedule before development begins.',
    icon: Handshake,
  },
  {
    id: 'design-architecture',
    number: '05',
    title: 'UI/UX Design & Software Architecture',
    description:
      'We shape the user experience and the technical structure together, so the interface is clear to use and the system has a sound foundation for the features that follow.',
    icon: PenTool,
  },
  {
    id: 'development',
    number: '06',
    title: 'Development & Implementation',
    description:
      'We build the solution in focused increments, following the agreed scope and keeping the work reviewable as it progresses. Important decisions and changes are documented.',
    icon: Code2,
  },
  {
    id: 'version-control',
    number: '07',
    title: 'Version Control & Team Collaboration',
    description:
      'Code is managed in Git and shared through a remote repository such as GitHub. Branches, pull requests, and reviews keep changes traceable and reduce the risk of conflicting work.',
    icon: GitBranch,
  },
  {
    id: 'ci-cd',
    number: '08',
    title: 'CI/CD Pipeline',
    description:
      'Where appropriate for the project, automated checks and deployment workflows are configured so changes can be tested and released consistently instead of relying on manual steps.',
    icon: Workflow,
  },
  {
    id: 'testing-qa',
    number: '09',
    title: 'Testing & Quality Assurance',
    description:
      'We test functionality, edge cases, responsiveness, performance, and reliability. Issues found during review are fixed before the release is treated as ready.',
    icon: TestTube2,
  },
  {
    id: 'client-review',
    number: '10',
    title: 'Client Review & Approval',
    description:
      'You review the delivered increment against the agreed requirements and provide consolidated feedback. Approval confirms that the next stage can proceed.',
    icon: UserCheck,
  },
  {
    id: 'production-deployment',
    number: '11',
    title: 'Production Deployment',
    description:
      'We prepare the production environment, deploy the approved build, and verify the essential flows after release. Rollback or recovery considerations are agreed where relevant.',
    icon: Rocket,
  },
  {
    id: 'delivery-handover',
    number: '12',
    title: 'Final Delivery & Handover',
    description:
      'We provide the agreed deliverables, access details, documentation, and a handover walkthrough so your team understands how to operate and maintain the solution.',
    icon: PackageCheck,
  },
  {
    id: 'maintenance-support',
    number: '13',
    title: 'Maintenance & Technical Support',
    description:
      'After delivery, we can continue with agreed maintenance, updates, fixes, monitoring, and improvements as your business and the software evolve.',
    icon: LifeBuoy,
  },
];

export const ciCdWorkflow = [
  {
    id: 'code-updates',
    number: '01',
    title: 'Developers write and update code',
    description:
      'Work is completed in focused branches with clear, reviewable changes.',
    icon: Code2,
  },
  {
    id: 'push-github',
    number: '02',
    title: 'Code is pushed to GitHub',
    description:
      'Changes are stored in a shared remote repository with a traceable history.',
    icon: GitBranch,
  },
  {
    id: 'pull-requests',
    number: '03',
    title: 'Pull requests are created for review',
    description:
      'Each change is proposed, described, and reviewed before it reaches the main branch.',
    icon: GitPullRequest,
  },
  {
    id: 'github-actions',
    number: '04',
    title: 'Automated checks run through GitHub Actions',
    description:
      'Configured workflows run automatically when code is pushed or a pull request is opened.',
    icon: Workflow,
  },
  {
    id: 'code-quality',
    number: '05',
    title: 'Code quality checks and linting run',
    description:
      'Static analysis catches common mistakes, style issues, and risky patterns early.',
    icon: ShieldCheck,
  },
  {
    id: 'types-formatting',
    number: '06',
    title: 'TypeScript and formatting checks run where applicable',
    description:
      'Projects that use TypeScript or formatting tools run those checks as part of the pipeline.',
    icon: FileCode2,
  },
  {
    id: 'automated-tests',
    number: '07',
    title: 'Automated tests run',
    description:
      'The test suite verifies critical behavior so regressions are caught before release.',
    icon: TestTube2,
  },
  {
    id: 'build-verification',
    number: '08',
    title: 'Production build is verified',
    description:
      'The application is compiled in the same way it will be built for production.',
    icon: PackageCheck,
  },
  {
    id: 'preview-staging',
    number: '09',
    title: 'Preview or staging deployment is prepared when configured',
    description:
      'Where the project has a preview or staging environment, the build is deployed there for review.',
    icon: Server,
  },
  {
    id: 'client-approval',
    number: '10',
    title: 'Client reviews and approves the application',
    description:
      'You review the build against the agreed requirements before production release.',
    icon: UserCheck,
  },
  {
    id: 'production-release',
    number: '11',
    title: 'Production deployment takes place',
    description:
      'The approved build is released to the production environment through the agreed process.',
    icon: Rocket,
  },
  {
    id: 'monitoring-maintenance',
    number: '12',
    title: 'Monitoring, updates, and maintenance continue as agreed',
    description:
      'After release, the application is monitored and maintained according to the agreed support arrangement.',
    icon: Activity,
  },
];

export const ciCdNote =
  'The pipeline is configured according to each project’s technology and requirements. Not every project automatically uses identical checks, tools, or deployment steps.';

export const remoteWorking = {
  intro:
    'AMTRA Technologies operates with a remote-first collaboration model. We work with clients in Pakistan and internationally through online meetings, shared development workflows, and structured communication.',
  note:
    'We do not publish a physical office address. Collaboration, delivery, and support are coordinated remotely using the tools agreed for each project.',
  items: [
    {
      id: 'global-collaboration',
      title: 'Global Collaboration',
      description:
        'We collaborate with clients across time zones through online meetings, shared documents, and structured development workflows.',
      icon: Globe2,
    },
    {
      id: 'virtual-meetings',
      title: 'Virtual Meetings',
      description:
        'Requirements discussions, progress reviews, and handover sessions take place through scheduled video or voice meetings.',
      icon: Video,
    },
    {
      id: 'github-collaboration',
      title: 'GitHub-Based Team Collaboration',
      description:
        'Code, issues, reviews, and change history are managed in GitHub so work stays visible and traceable.',
      icon: GitBranch,
    },
    {
      id: 'client-communication',
      title: 'Regular Client Communication',
      description:
        'We agree on communication channels and update clients at meaningful milestones, not only at the end of a project.',
      icon: MessagesSquare,
    },
    {
      id: 'progress-updates',
      title: 'Project Progress Updates',
      description:
        'Clients receive clear updates on completed work, current priorities, open questions, and upcoming milestones.',
      icon: ListChecks,
    },
    {
      id: 'digital-project-management',
      title: 'Digital Project Management',
      description:
        'Tasks, timelines, and deliverables are tracked with digital project-management tools agreed for the engagement.',
      icon: LayoutDashboard,
    },
  ],
};

export const founder = {
  name: 'Ali Raza Chakrani',
  role: 'Founder & CEO',
  initials: 'ARC',
  bio: "Ali Raza Chakrani is the Founder and CEO of AMTRA Technologies. With a background in Computer Science and a passion for software development and emerging technologies, he established AMTRA Technologies with a vision to build innovative digital solutions and create opportunities through technology. He leads the company's vision, project planning, team collaboration, and business development, focusing on delivering valuable technology solutions to clients.",
  focusAreas: [
    {
      id: 'vision-strategy',
      title: 'Vision & Strategy',
      description:
        'Setting the company’s direction and keeping technology decisions aligned with client value.',
      icon: Target,
    },
    {
      id: 'project-planning',
      title: 'Project Planning',
      description:
        'Shaping scope, delivery approach, and practical plans for each engagement.',
      icon: ClipboardList,
    },
    {
      id: 'team-collaboration',
      title: 'Team Collaboration',
      description:
        'Building a collaborative working model across development and delivery.',
      icon: Users,
    },
    {
      id: 'business-development',
      title: 'Business Development',
      description:
        'Developing client relationships and identifying opportunities to create lasting impact.',
      icon: TrendingUp,
    },
  ],
};

export const faqs = [
  {
    id: 'services',
    question: 'What services does AMTRA Technologies offer?',
    answer:
      'We provide web, mobile, and desktop application development, custom software development, payment application development, AI solutions and automation, cybersecurity services, database solutions, cloud computing and DevOps, networking and IT infrastructure support, IT consulting, website maintenance and technical support, and digital marketing.',
  },
  {
    id: 'quotation',
    question: 'How can I request a project quotation?',
    answer:
      'Use the project inquiry form on our Contact page and share your requirements, preferred timeline, and any budget range you have in mind. Our team will review the details and respond with the next steps. We do not publish fixed pricing because every project has a different scope.',
  },
  {
    id: 'custom-software',
    question: 'Does AMTRA Technologies develop custom software?',
    answer:
      'Yes. Custom software is a core part of our work. We build business management systems, ERP and CRM solutions, enterprise applications, workflow automation, APIs, and customized web and desktop applications around your specific requirements.',
  },
  {
    id: 'payment-applications',
    question: 'Can you build payment applications and integrate payment gateways?',
    answer:
      'Yes, we work on payment-related applications, gateway integrations, digital payment interfaces, transaction management, billing systems, and wallet-related solutions. Gateway availability, provider accounts, regulatory requirements, and third-party integrations depend on your requirements and the providers you choose.',
  },
  {
    id: 'web-mobile',
    question: 'Can you develop Android and web applications?',
    answer:
      'Yes. We develop responsive web applications and mobile applications, including cross-platform builds, with API integration and ongoing maintenance when required.',
  },
  {
    id: 'ai-integration',
    question: 'Do you provide AI integration services?',
    answer:
      'Yes. We help integrate AI features such as assistants, chatbots, intelligent automation, and AI APIs into applications and business workflows where they add practical value.',
  },
  {
    id: 'maintenance',
    question: 'Can you maintain an existing website?',
    answer:
      'In many cases, yes. We first review the existing codebase, hosting setup, and access requirements, then recommend a practical maintenance plan. The exact scope depends on the condition and technology of the current site.',
  },
  {
    id: 'remote-collaboration',
    question: 'Do you work with international clients?',
    answer:
      'Yes. We work remotely with clients internationally through online meetings, shared development workflows, and structured project communication. We do not publish a physical office address.',
  },
  {
    id: 'contact',
    question: 'How can I contact your team?',
    answer:
      'You can email us at amtratechnologies@gmail.com, message our official WhatsApp number at +92 321 2192954, or submit the project inquiry form on the Contact page. The form is the best way to share detailed requirements with us.',
  },
  {
    id: 'post-delivery-support',
    question: 'Do you provide support after project delivery?',
    answer:
      'Yes. Support and maintenance can be agreed as part of a project or arranged afterward. The level of support, response expectations, and scope are confirmed in writing before work begins.',
  },
];
