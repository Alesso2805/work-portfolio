import { afterEach, describe, expect, it, vi } from 'vitest';
import { THEME_STORAGE_KEY, themeInitScript } from './theme';

function runWith({ stored, systemDark }: { stored: string | null; systemDark: boolean }) {
  document.documentElement.removeAttribute('data-theme');
  if (stored === null) localStorage.removeItem(THEME_STORAGE_KEY);
  else localStorage.setItem(THEME_STORAGE_KEY, stored);
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: systemDark && query === '(prefers-color-scheme: dark)',
  }));
  new Function(themeInitScript)();
  return document.documentElement.getAttribute('data-theme');
}

describe('themeInitScript', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it('follows the system preference when nothing is stored', () => {
    expect(runWith({ stored: null, systemDark: true })).toBe('dark');
    expect(runWith({ stored: null, systemDark: false })).toBe('light');
  });

  it('prefers the stored choice over the system preference', () => {
    expect(runWith({ stored: 'light', systemDark: true })).toBe('light');
    expect(runWith({ stored: 'dark', systemDark: false })).toBe('dark');
  });

  it('ignores invalid stored values', () => {
    expect(runWith({ stored: 'purple', systemDark: true })).toBe('dark');
  });
});
