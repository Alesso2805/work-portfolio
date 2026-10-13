import { site } from '@/config/site';
import { type Locale, localePath } from '@/i18n/config';
import { absoluteUrl } from './metadata';

const personId = absoluteUrl('/#person');

/** schema.org Person for the home page. */
export function personJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: site.fullName,
    alternateName: site.name,
    url: absoluteUrl(localePath(locale)),
    email: `mailto:${site.email}`,
    jobTitle: 'Software Engineer',
    worksFor: { '@type': 'Organization', name: 'White Lion Technology' },
    address: { '@type': 'PostalAddress', addressLocality: 'Lima', addressCountry: 'PE' },
    sameAs: [site.github, site.linkedin],
  };
}

/** schema.org ScholarlyArticle for the IEEE Xplore paper. */
export function paperJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: site.paper.title,
    name: site.paper.title,
    url: site.paper.url,
    datePublished: '2026',
    inLanguage: 'en',
    author: { '@type': 'Person', '@id': personId, name: site.fullName },
    publisher: { '@type': 'Organization', name: 'IEEE' },
  };
}
