function toIsoString(value) {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function toRequestSummary(document) {
  return {
    id: String(document._id),
    fullName: document.fullName,
    email: document.email,
    service: document.service,
    createdAt: toIsoString(document.createdAt),
  };
}

export function toRequestDetail(document) {
  return {
    id: String(document._id),
    fullName: document.fullName,
    email: document.email,
    phone: document.phone || '',
    company: document.company || '',
    country: document.country || '',
    service: document.service,
    budget: document.budget || '',
    timeline: document.timeline || '',
    description: document.description,
    contactMethod: document.contactMethod || '',
    createdAt: toIsoString(document.createdAt),
  };
}
