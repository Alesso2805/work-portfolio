import type { Metadata } from 'next';
import { type Locale, localePath, locales } from '@/i18n/config';

/** Canonical URL for this locale plus hreflang alternates for every locale. */
export function alternatesFor(locale: Locale, subpath = ''): Metadata['alternates'] {
  return {
    canonical: localePath(locale, subpath),
    languages: {
      ...Object.fromEntries(locales.map((code) => [code, localePath(code, subpath)])),
      'x-default': subpath === '' ? '/' : localePath('en', subpath),
    },
  };
}
