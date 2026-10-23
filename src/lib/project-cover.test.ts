import { describe, expect, it } from 'vitest';
import { projects } from '@/content/projects';
import { projectCover } from './project-cover';

function project(slug: string) {
  const found = projects.find((p) => p.slug === slug);
  if (!found) throw new Error(`No project ${slug}`);
  return found;
}

describe('projectCover', () => {
  it('is the first image of the case study, in the page language', () => {
    expect(projectCover(project('willay'), 'es')?.src).toBe('/case-studies/willay-map-es.png');
    expect(projectCover(project('sentinelapi'), 'en')?.src).toBe(
      '/case-studies/sentinelapi-console-en.png',
    );
    expect(projectCover(project('veriledger'), 'en')?.alt).toBeTruthy();
  });

  it('is undefined when the case study has no screens yet', () => {
    expect(projectCover(project('genairator'), 'en')).toBeUndefined();
  });
});
