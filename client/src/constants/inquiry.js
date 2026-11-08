import { services } from './services';

export const SERVICE_OPTIONS = [
  ...services.map((service) => service.title),
  'Other',
];

export const BUDGET_OPTIONS = [
  'Not Decided Yet',
  'Under $500',
  '$500 \u2013 $1,000',
  '$1,000 \u2013 $3,000',
  '$3,000 \u2013 $5,000',
  '$5,000 \u2013 $10,000',
  'Above $10,000',
];

export const TIMELINE_OPTIONS = [
  'As Soon As Possible',
  'Within 1 Month',
  '1\u20133 Months',
  '3\u20136 Months',
  'Flexible',
];

export const CONTACT_METHOD_OPTIONS = ['Email', 'WhatsApp', 'Phone'];

export const INQUIRY_LIMITS = Object.freeze({
  fullName: { min: 2, max: 100 },
  email: { max: 254 },
  phone: { max: 30 },
  company: { max: 120 },
  country: { max: 80 },
  description: { min: 20, max: 5000 },
});

export const INITIAL_INQUIRY_VALUES = Object.freeze({
  fullName: '',
  email: '',
  phone: '',
  company: '',
  country: '',
  service: '',
  budget: '',
  timeline: '',
  description: '',
  contactMethod: '',
  consent: false,
  website: '',
});

export function getServiceTitleFromId(serviceId) {
  if (!serviceId) {
    return '';
  }

  const match = services.find((service) => service.id === serviceId);
  return match ? match.title : '';
}
