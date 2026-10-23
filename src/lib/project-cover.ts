import { getCaseStudy } from '@/content/case-studies';
import type { Project } from '@/content/projects';
import type { Locale } from '@/i18n/config';

/**
 * The first image of a project's case study, in one locale: the picture on its home panel.
 * Server-only, so the case study copy never reaches the client bundle.
 */
export function projectCover(
  project: Project,
  locale: Locale,
): { src: string; alt: string } | undefined {
  const study = project.caseStudySlug ? getCaseStudy(project.caseStudySlug) : undefined;
  const image = study?.media?.find((media) => media.kind === 'image');
  return image && { src: image.src[locale], alt: image.alt[locale] };
}
