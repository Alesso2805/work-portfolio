import { describe, expect, it } from 'vitest';
import { type Project, projects } from '@/content/projects';
import {
  countByStack,
  filterProjects,
  parseStack,
  projectHref,
  type StackFilter,
  stackFilters,
} from './projects';

const names = (filter: StackFilter) => filterProjects(projects, filter).map((p) => p.name);

describe('project filter', () => {
  it('returns the right projects for each filter, in home order', () => {
    expect(names('all')).toEqual(['GenAIrator', 'Willay', 'VeriLedger', 'SentinelAPI']);
    expect(names('python')).toEqual(['Willay', 'VeriLedger', 'SentinelAPI']);
    expect(names('ts')).toEqual(['GenAIrator', 'Willay', 'VeriLedger']);
    expect(names('csharp')).toEqual(['GenAIrator']);
    expect(names('sql')).toEqual(['GenAIrator', 'Willay', 'VeriLedger']);
  });

  it('counts projects per filter', () => {
    expect(countByStack(projects)).toEqual({ all: 4, python: 3, ts: 3, csharp: 1, sql: 3 });
  });

  it('keeps every count in sync with the filtered list', () => {
    const counts = countByStack(projects);
    for (const filter of stackFilters) {
      expect(counts[filter]).toBe(filterProjects(projects, filter).length);
    }
  });

  it('parses ?stack= and falls back to all', () => {
    expect(parseStack('python')).toBe('python');
    expect(parseStack('csharp')).toBe('csharp');
    expect(parseStack('cobol')).toBe('all');
    expect(parseStack(null)).toBe('all');
  });
});

describe('projects content', () => {
  it('has no repeated slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('numbers projects 01, 02… in order', () => {
    expect(projects.map((p) => p.number)).toEqual(
      projects.map((_, i) => String(i + 1).padStart(2, '0')),
    );
  });
});

describe('projectHref', () => {
  const base: Project = {
    slug: 'x',
    number: '09',
    name: 'X',
    featured: false,
    languages: ['python'],
    languagesLabel: 'Python',
    description: { en: '', es: '' },
  };

  it('prefers the case study, localized', () => {
    const project = { ...base, caseStudySlug: 'x', repoUrl: 'https://github.com/a/x' };
    expect(projectHref(project, 'es')).toBe('/es/projects/x');
  });

  it('falls back to the repo', () => {
    expect(projectHref({ ...base, repoUrl: 'https://github.com/a/x' }, 'en')).toBe(
      'https://github.com/a/x',
    );
  });

  it('is undefined without case study or repo', () => {
    expect(projectHref(base, 'en')).toBeUndefined();
  });
});
