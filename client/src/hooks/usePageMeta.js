import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../constants/siteConfig';

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');

  if (!href) {
    link?.remove();
    return;
  }

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
}

function buildCanonicalUrl(pathname) {
  if (!siteConfig.url) {
    return '';
  }

  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  return `${siteConfig.url}${path}`;
}

/**
 * Keep the document title, description, canonical URL, Open Graph, and
 * Twitter metadata in sync with the active page.
 */
export function usePageMeta(title, description = siteConfig.description) {
  const { pathname } = useLocation();

  useEffect(() => {
    const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
    const canonicalUrl = buildCanonicalUrl(pathname);

    document.title = pageTitle;

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:title', pageTitle);
    setMeta('name', 'twitter:description', description);

    setCanonical(canonicalUrl);

    if (canonicalUrl) {
      setMeta('property', 'og:url', canonicalUrl);
    }
  }, [title, description, pathname]);
}
