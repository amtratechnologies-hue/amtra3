import {
  BrainCircuit,
  CloudCog,
  Globe,
  Lightbulb,
  Monitor,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';

export const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    icon: Globe,
    summary:
      'Fast, accessible, and maintainable web applications built with modern JavaScript, React, and Node.js.',
    capabilities: ['React & Vite frontends', 'Node.js & Express APIs', 'MongoDB data modeling'],
  },
  {
    id: 'mobile-development',
    title: 'Mobile Application Development',
    icon: Smartphone,
    summary:
      'Cross-platform mobile experiences designed for performance, clarity, and a smooth user journey.',
    capabilities: ['React Native', 'API integration', 'Store-ready builds'],
  },
  {
    id: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    icon: BrainCircuit,
    summary:
      'Practical AI features — from data pipelines and automation to intelligent assistants and model integration.',
    capabilities: ['Model integration', 'Data pipelines', 'Workflow automation'],
  },
  {
    id: 'desktop-development',
    title: 'Desktop Application Development',
    icon: Monitor,
    summary:
      'Reliable desktop applications for internal tools and workflow-heavy environments.',
    capabilities: ['Cross-platform tooling', 'Offline-first workflows', 'System integration'],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Services',
    icon: ShieldCheck,
    summary:
      'Security reviews, hardening, and secure development practices that protect your product and data.',
    capabilities: ['Security reviews', 'Secure coding practices', 'Hardening & monitoring'],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    icon: CloudCog,
    summary:
      'Scalable infrastructure, CI/CD pipelines, and observability that keep releases predictable.',
    capabilities: ['Containerized deployments', 'CI/CD automation', 'Monitoring & observability'],
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting',
    icon: Lightbulb,
    summary:
      'Architecture guidance, technical assessments, and delivery support for teams planning their next step.',
    capabilities: ['Architecture reviews', 'Technical discovery', 'Delivery planning'],
  },
];
