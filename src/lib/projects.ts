import { type Lang, langs, type Project } from '@/content/projects';
import { type Locale, localePath } from '@/i18n/config';

export type StackFilter = 'all' | Lang;

export const stackFilters: readonly StackFilter[] = ['all', ...langs];

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
  };
}
