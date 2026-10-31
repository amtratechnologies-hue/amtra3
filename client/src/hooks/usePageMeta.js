import { useEffect } from 'react';
import { siteConfig } from '../constants/siteConfig';

/**
 * Keep the document title and meta description in sync with the active page.
 */
export function usePageMeta(title, description = siteConfig.description) {
  useEffect(() => {
    document.title = title ? `${title} | ${siteConfig.name}` : siteConfig.name;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', description);
    }
  }, [title, description]);
}
