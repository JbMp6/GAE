"use client";

import { useCallback } from 'react';

/**
 * Hook réutilisable pour effectuer un scroll smooth vers un élément par id.
 * Si `offset` n'est pas fourni, essaie de lire la variable CSS `--header-height`.
 */
export default function useSmoothScroll() {
  const scrollToId = useCallback((id: string, offset?: number) => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById(id);
    if (!el) return;

    let off = offset ?? 0;
    if (offset === undefined) {
      try {
        const v = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
        if (v) {
          const parsed = parseFloat(v.replace('px', ''));
          if (!Number.isNaN(parsed)) off = parsed;
        }
      } catch (e) {
        // ignore if SSR or access denied
      }
    }

    const top = el.getBoundingClientRect().top + window.scrollY - off;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  return scrollToId;
}
