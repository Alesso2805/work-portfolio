import type { Metadata } from 'next';
import { site } from '@/config/site';
import { type Locale, localePath, locales } from '@/i18n/config';

const ogLocale: Record<Locale, string> = { en: 'en_US', es: 'es_ES' };

export const ogImage = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Alessandro David — Software Engineer',
} as const;

/** Absolute URL on the public origin. */
export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

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

/** Full per-page metadata: title, description, canonical/hreflang, Open Graph and Twitter. */
export function pageMetadata({
  locale,
  subpath = '',
  title,
  description,
  type = 'website',
}: {
  locale: Locale;
  subpath?: string;
  title: string;
  description: string;
  type?: 'website' | 'article';
}): Metadata {
  return {
    title,
    description,
    alternates: alternatesFor(locale, subpath),
    openGraph: {
      type,
      title,
      description,
      url: localePath(locale, subpath),
      siteName: site.name,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((code) => code !== locale).map((code) => ogLocale[code]),
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
  };
}
