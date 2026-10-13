import { describe, expect, it } from 'vitest';
import { generateStaticParams } from '@/app/[locale]/projects/[slug]/page';
import { locales } from '@/i18n/config';
import { caseStudies } from './case-studies';
import { projects } from './projects';

/** Structural fingerprint: keys and array lengths, ignoring the text itself. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => [k, shape(v)]),
    );
  }
  return typeof value;
}

describe('case studies', () => {
  it('every caseStudySlug has its page in every locale', () => {
    const pages = generateStaticParams().map((p) => `${p.locale}/${p.slug}`);
    for (const project of projects) {
      if (!project.caseStudySlug) continue;
      for (const locale of locales) {
        expect(pages).toContain(`${locale}/${project.caseStudySlug}`);
      }
    }
  });

  it('every case study belongs to a project', () => {
    for (const study of caseStudies) {
      expect(projects.some((p) => p.caseStudySlug === study.slug)).toBe(true);
    }
  });

  it('has the same structure in EN and ES', () => {
    for (const study of caseStudies) {
      expect(shape(study.copy.es)).toEqual(shape(study.copy.en));
    }
  });
});
