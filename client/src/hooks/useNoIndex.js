import { useEffect } from 'react';

/**
 * Keep the admin area out of search indexes without adding it to the public
 * sitemap. Restores the previous robots value on unmount.
 */
export function useNoIndex() {
  useEffect(() => {
    let element = document.head.querySelector('meta[name="robots"]');
    const created = !element;

    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('name', 'robots');
      document.head.appendChild(element);
    }

    const previous = element.getAttribute('content');
    element.setAttribute('content', 'noindex,nofollow');

    return () => {
      if (created) {
        element.remove();
      } else if (previous !== null) {
        element.setAttribute('content', previous);
      }
    };
  }, []);
}
