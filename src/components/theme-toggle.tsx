'use client';

import { useEffect, useSyncExternalStore } from 'react';
import type { Dictionary } from '@/i18n';
import { followSystemTheme, getTheme, setTheme, type Theme } from '@/lib/theme';

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

// The server cannot know the theme; the icon is switched by CSS so it never flashes,
// and the label catches up right after hydration.
const getServerTheme = (): Theme => 'light';

export function ThemeToggle({ labels }: { labels: Dictionary['theme'] }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const isDark = theme === 'dark';
  const label = isDark ? labels.toLight : labels.toDark;

  useEffect(followSystemTheme, []);

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
      title={label}
      className="inline-flex nojs:hidden min-h-11 w-11 items-center justify-center border-2 border-rule bg-bg text-ink"
    >
      {/* Moon in light mode */}
      <svg
        aria-hidden="true"
        className="dark:hidden"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      {/* Sun in dark mode */}
      <svg
        aria-hidden="true"
        className="hidden dark:block"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
