import { type Lang, langs, type Project } from '@/content/projects';
import { type Locale, localePath } from '@/i18n/config';

export type StackFilter = 'all' | Lang;

export const stackFilters: readonly StackFilter[] = ['all', ...langs];

/**
 * How many projects the home rail shows. Each panel adds about a screen of pinned scroll,
 * so the rail stays this short however many projects there are; the list below has them all.
 */
export const spotlightLimit = 4;

export function spotlightProjects<P extends Pick<Project, 'spotlight'>>(items: readonly P[]): P[] {
  return items.filter((p) => p.spotlight).slice(0, spotlightLimit);
}

/** Reads `?stack=` — anything unknown falls back to 'all'. */
export function parseStack(value: string | null | undefined): StackFilter {
  return stackFilters.find((filter) => filter === value) ?? 'all';
}

export function filterProjects<P extends Pick<Project, 'languages'>>(
  items: readonly P[],
  filter: StackFilter,
): P[] {
  return filter === 'all' ? [...items] : items.filter((p) => p.languages.includes(filter));
}

export function countByStack(items: readonly Pick<Project, 'languages'>[]) {
  return Object.fromEntries(
    stackFilters.map((filter) => [filter, filterProjects(items, filter).length]),
  ) as Record<StackFilter, number>;
}

export function caseStudyPath(locale: Locale, slug: string): string {
  return localePath(locale, `/projects/${slug}`);
}

/** Case study first, then the repo; undefined means the row is not a link. */
export function projectHref(project: Project, locale: Locale): string | undefined {
  if (project.caseStudySlug) return caseStudyPath(locale, project.caseStudySlug);
  return project.repoUrl;
}

/** What a home row needs, already resolved for one locale (keeps the client payload small). */
export interface ProjectRowData {
  slug: string;
  number: string;
  name: string;
  featured: boolean;
  languages: Lang[];
  languagesLabel: string;
  description: string;
  href?: string;
  /** The panel's figure, already in this locale. */
  highlight?: { value: string; label: string };
  /** The panel's image: the first screen of the case study. Resolved on the server (see project-cover.ts). */
  cover?: { src: string; alt: string };
}

export function toRowData(project: Project, locale: Locale): ProjectRowData {
  const href = projectHref(project, locale);
  return {
    slug: project.slug,
    number: project.number,
    name: project.name,
    featured: project.featured,
    languages: project.languages,
    languagesLabel: project.languagesLabel,
    description: project.description[locale],
    ...(href ? { href } : {}),
    ...(project.highlight
      ? { highlight: { value: project.highlight.value, label: project.highlight.label[locale] } }
      : {}),
  };
}
