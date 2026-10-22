import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { type CaseStudy, type CaseStudyMedia, getCaseStudy } from '@/content/case-studies';
import { type Project, projects } from '@/content/projects';
import { en } from '@/i18n/en';
import { CaseStudyView } from './case-study-view';

const base = getCaseStudy('genairator') as CaseStudy;
const genairator = projects.find((p) => p.caseStudySlug === 'genairator');

function screenOf(n: number): CaseStudyMedia {
  return {
    kind: 'image',
    src: { en: `/case-studies/s${n}-en.png`, es: `/case-studies/s${n}-es.png` },
    alt: { en: `Screen ${n}`, es: `Pantalla ${n}` },
    caption: {
      en: { title: `Title ${n}`, body: `Body ${n}` },
      es: { title: `Título ${n}`, body: `Cuerpo ${n}` },
    },
  };
}

function renderStudy(study: CaseStudy, project: Project | undefined = genairator) {
  if (!project) throw new Error('GenAIrator project missing');
  return render(<CaseStudyView study={study} project={project} locale="en" dict={en} />);
}

describe('CaseStudyView optional blocks', () => {
  it('hides role, problem body and media while they are empty', () => {
    const { container } = renderStudy(base);
    expect(screen.queryByText('Role')).not.toBeInTheDocument();
    expect(screen.getAllByRole('term')).toHaveLength(3);
    expect(container.querySelector('.aspect-video')).toBeNull();
    expect(screen.getByText(base.copy.en.problemTitle).nextElementSibling).toBeNull();
  });

  it('shows them once filled in', () => {
    renderStudy({
      ...base,
      media: [
        {
          kind: 'image',
          src: { en: '/case-studies/x-en.png', es: '/case-studies/x-es.png' },
          alt: { en: 'Dashboard', es: 'Panel' },
        },
      ],
      copy: {
        ...base.copy,
        en: { ...base.copy.en, role: 'Backend lead', problemBody: 'Why it matters.' },
      },
    });
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Backend lead')).toBeInTheDocument();
    expect(screen.getByText('Why it matters.')).toBeInTheDocument();
    // Tests run without the export's `unoptimized`, so next/image wraps the path in its loader URL.
    expect(screen.getByRole('img', { name: 'Dashboard' })).toHaveAttribute(
      'src',
      expect.stringContaining(encodeURIComponent('/case-studies/x-en.png')),
    );
  });

  it('links only the result cards that have an href', () => {
    renderStudy(base);
    expect(screen.getByRole('link', { name: /Published in IEEE Xplore/ })).toHaveAttribute(
      'href',
      'https://ieeexplore.ieee.org/document/11541607',
    );
    expect(screen.queryByRole('link', { name: /Thesis defended/ })).not.toBeInTheDocument();
  });

  it('offers the live demo only when the project has one', () => {
    const { unmount } = renderStudy(base, genairator && { ...genairator, demoUrl: undefined });
    expect(screen.queryByRole('link', { name: /Try the live demo/ })).not.toBeInTheDocument();
    unmount();

    renderStudy(base, genairator && { ...genairator, demoUrl: 'https://demo.example' });
    expect(screen.getByRole('link', { name: /Try the live demo/ })).toHaveAttribute(
      'href',
      'https://demo.example',
    );
  });

  it('keeps a single screen as a figure, with its caption and no carousel', () => {
    renderStudy({ ...base, media: [screenOf(1)] });
    expect(screen.getByRole('img', { name: 'Screen 1' })).toBeInTheDocument();
    expect(screen.getByText('Body 1')).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Screens' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Next screen' })).not.toBeInTheDocument();
  });

  it('turns several screens into a carousel, each with its caption', () => {
    renderStudy({ ...base, media: [screenOf(1), screenOf(2), screenOf(3)] });
    const carousel = screen.getByRole('region', { name: 'Screens' });
    expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
    const slides = screen.getAllByRole('figure');
    expect(slides.map((slide) => slide.getAttribute('aria-label'))).toEqual([
      '1 of 3',
      '2 of 3',
      '3 of 3',
    ]);
    expect(slides[1]).toHaveAttribute('aria-roledescription', 'slide');
    expect(within(slides[1] as HTMLElement).getByText('Title 2')).toBeInTheDocument();
    expect(within(slides[2] as HTMLElement).getByText('Body 3')).toBeInTheDocument();
    // The loop's copies of the last and first screens, at either end, are out of reach.
    const copies = screen.getAllByText('Body 3').filter((el) => !slides[2]?.contains(el));
    expect(copies).toHaveLength(1);
    expect(copies[0]?.closest('[aria-hidden="true"]')).toHaveAttribute('inert');
  });

  it('moves one screen at a time with its buttons, announces each, and loops', () => {
    renderStudy({ ...base, media: [screenOf(1), screenOf(2), screenOf(3)] });
    const previous = screen.getByRole('button', { name: 'Previous screen' });
    const next = screen.getByRole('button', { name: 'Next screen' });
    expect(screen.getByText('01 / 03')).toBeInTheDocument();

    fireEvent.click(next);
    expect(screen.getByText('02 / 03')).toBeInTheDocument();
    expect(screen.getByText('Title 2, 2 of 3')).toBeInTheDocument();

    fireEvent.click(next);
    fireEvent.click(next);
    expect(screen.getByText('01 / 03')).toBeInTheDocument();
    expect(screen.getByText('Title 1, 1 of 3')).toBeInTheDocument();

    fireEvent.click(previous);
    expect(screen.getByText('03 / 03')).toBeInTheDocument();
    expect(previous).toBeEnabled();
    expect(next).toBeEnabled();
  });

  it('moves with a drag, and springs back from a short one', () => {
    renderStudy({ ...base, media: [screenOf(1), screenOf(2), screenOf(3)] });
    const track = screen.getAllByRole('figure')[0]?.parentElement as HTMLElement;
    const dragBy = (distance: number) => {
      fireEvent.pointerDown(track, { pointerId: 1, pointerType: 'mouse', button: 0, clientX: 600 });
      fireEvent.pointerMove(track, { pointerId: 1, pointerType: 'mouse', clientX: 600 + distance });
      fireEvent.pointerUp(track, { pointerId: 1, pointerType: 'mouse', clientX: 600 + distance });
    };

    dragBy(-200);
    expect(screen.getByText('02 / 03')).toBeInTheDocument();
    dragBy(10);
    expect(screen.getByText('02 / 03')).toBeInTheDocument();
    dragBy(200);
    dragBy(200);
    expect(screen.getByText('03 / 03')).toBeInTheDocument();
  });

  it('offers one code button per repository when the project has several', () => {
    renderStudy(
      base,
      genairator && {
        ...genairator,
        repos: [
          { url: 'https://github.com/a/api', label: { en: 'View the API code', es: 'API' } },
          { url: 'https://github.com/a/web', label: { en: 'View the web app code', es: 'Web' } },
        ],
      },
    );
    expect(screen.getByRole('link', { name: 'View the API code' })).toHaveAttribute(
      'href',
      'https://github.com/a/api',
    );
    expect(screen.getByRole('link', { name: 'View the web app code' })).toHaveAttribute(
      'href',
      'https://github.com/a/web',
    );
    expect(screen.queryByRole('link', { name: /^View the code/ })).not.toBeInTheDocument();
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
