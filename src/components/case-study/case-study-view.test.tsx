import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { type CaseStudy, getCaseStudy } from '@/content/case-studies';
import { projects } from '@/content/projects';
import { en } from '@/i18n/en';
import { CaseStudyView } from './case-study-view';

const base = getCaseStudy('genairator') as CaseStudy;
const project = projects.find((p) => p.caseStudySlug === 'genairator');

function renderStudy(study: CaseStudy) {
  if (!project) throw new Error('GenAIrator project missing');
  return render(<CaseStudyView study={study} project={project} locale="en" dict={en} />);
}

describe('CaseStudyView optional blocks', () => {
  it('hides role, problem body and screenshot while they are empty', () => {
    const { container } = renderStudy(base);
    expect(screen.queryByText('Role')).not.toBeInTheDocument();
    expect(screen.getAllByRole('term')).toHaveLength(3);
    expect(container.querySelector('.aspect-video')).toBeNull();
    expect(screen.getByText(base.copy.en.problemTitle).nextElementSibling).toBeNull();
  });

  it('shows them once filled in', () => {
    renderStudy({
      ...base,
      screenshot: {
        kind: 'image',
        src: '/case-studies/x.png',
        alt: { en: 'Dashboard', es: 'Panel' },
      },
      copy: {
        ...base.copy,
        en: { ...base.copy.en, role: 'Backend lead', problemBody: 'Why it matters.' },
      },
    });
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Backend lead')).toBeInTheDocument();
    expect(screen.getByText('Why it matters.')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Dashboard' })).toBeInTheDocument();
  });

  it('links only the result cards that have an href', () => {
    renderStudy(base);
    expect(screen.getByRole('link', { name: /Published in IEEE Xplore/ })).toHaveAttribute(
      'href',
      'https://ieeexplore.ieee.org/document/11541607',
    );
    expect(screen.queryByRole('link', { name: /Thesis defended/ })).not.toBeInTheDocument();
  });

  it('has a single h1 and section h2s in order', () => {
    renderStudy(base);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)).toEqual([
      '01 — Problem',
      '02 — How it works',
      '03 — Architecture',
      '04 — Decisions',
      '05 — Results',
    ]);
  });
});
