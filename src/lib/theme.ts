export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

const DARK_QUERY = '(prefers-color-scheme: dark)';

/**
 * Runs inline in <head> before first paint: applies the stored theme, or the
 * system preference when nothing is stored, so the page never flashes.
 * Kept as a plain ES5 string because it is injected verbatim.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('${DARK_QUERY}').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`;

export function getTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

/** Applies a theme chosen by the user and remembers it. */
export function setTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); the choice still applies to this page.
  }
}

function hasStoredTheme(): boolean {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

/** Keeps following the OS setting live until the user makes an explicit choice. */
export function followSystemTheme(): () => void {
  const media = window.matchMedia(DARK_QUERY);
  const onChange = (event: MediaQueryListEvent) => {
    if (!hasStoredTheme()) {
      document.documentElement.setAttribute('data-theme', event.matches ? 'dark' : 'light');
    }
  };
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}
