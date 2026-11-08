/**
 * Join conditional class names without pulling in an extra dependency.
 */
export function cn(...values) {
  return values.filter(Boolean).join(' ');
}
