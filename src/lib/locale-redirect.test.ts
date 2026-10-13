import { describe, expect, it, vi } from 'vitest';
import { localeRedirectScript } from './locale-redirect';

function redirectFor(language: string | undefined) {
  const replace = vi.fn();
  // Shadow the globals the inline script reads, so it runs against fakes.
  new Function('navigator', 'location', localeRedirectScript)({ language }, { replace });
  return replace.mock.calls[0]?.[0];
}

describe('localeRedirectScript', () => {
  it('sends Spanish browsers to /es', () => {
    expect(redirectFor('es')).toBe('/es');
    expect(redirectFor('es-PE')).toBe('/es');
    expect(redirectFor('ES-es')).toBe('/es');
  });

  it('sends everyone else to /en', () => {
    expect(redirectFor('en-US')).toBe('/en');
    expect(redirectFor('fr')).toBe('/en');
    expect(redirectFor(undefined)).toBe('/en');
  });
});
