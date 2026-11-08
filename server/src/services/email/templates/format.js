const HTML_ESCAPE = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => HTML_ESCAPE[character]);
}

/**
 * Remove line breaks and control characters before a value is used inside an
 * email header (subject, reply-to, etc.) to prevent header injection.
 */
export function safeHeaderValue(value, fallback = '') {
  const cleaned = Array.from(String(value ?? ''))
    .map((character) => {
      const code = character.charCodeAt(0);
      return code < 32 || code === 127 ? ' ' : character;
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned || fallback;
}

export function displayValue(value) {
  const text = String(value ?? '').trim();
  return text || 'Not provided';
}

export function formatSubmittedAt(date) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Karachi',
  }).format(date);
}
