import type { MetadataRoute } from 'next';
import { caseStudies } from '@/content/case-studies';
import { localePath, locales } from '@/i18n/config';
import { absoluteUrl } from '@/lib/metadata';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const subpaths = ['', ...caseStudies.map((study) => `/projects/${study.slug}`)];

  return subpaths.flatMap((subpath) =>
    locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, subpath)),
      alternates: {
        languages: Object.fromEntries(
          locales.map((code) => [code, absoluteUrl(localePath(code, subpath))]),
        ),
      },
    })),
  );
}
