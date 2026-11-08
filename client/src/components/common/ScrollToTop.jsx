import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      let attempts = 0;
      let timeoutId;

      const scrollToTarget = () => {
        const target = document.getElementById(id);

        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }

        attempts += 1;
        if (attempts < 20) {
          timeoutId = window.setTimeout(scrollToTarget, 50);
        }
      };

      timeoutId = window.setTimeout(scrollToTarget, 50);
      return () => window.clearTimeout(timeoutId);
    }

    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  return null;
}
