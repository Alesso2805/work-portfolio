import type { Dictionary } from './types';

export const en: Dictionary = {
  skipLink: 'Skip to content',
  nav: {
    label: 'Main',
    work: 'Work',
    experience: 'Experience',
    contact: 'Contact',
    languageGroup: 'Language',
  },
  theme: {
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
  },
  hero: {
    kicker: 'Software Engineer — Lima, PE — Remote US / LatAm / EU',
    sub: 'Backend-first engineer. Python, FastAPI, SQLAlchemy, SQL Server and Docker — and the React or Angular frontend on top.',
    ctaWork: 'See work ↓',
  },
  stats: {
    at: 'At White Lion Technology',
    coverage: 'test coverage with Pytest',
    endpoints: 'REST endpoints',
    faster: 'faster queries',
  },
  work: {
    title: '01 — Work',
    filterLabel: 'Filter projects by language',
    all: 'All',
    thesisTag: 'thesis · 44/44 tests',
    practices: 'Practices',
    toolsFor: 'Tools',
  },
  experience: {
    title: '02 — Experience',
    items: [
      {
        dates: 'Oct 2025 — present',
        role: 'Software Engineer, White Lion Technology',
        summary: '20+ FastAPI endpoints on SQL Server, JWT access control, layered architecture.',
      },
      {
        dates: 'Jan 2025 — Oct 2025',
        role: 'Process Automation Intern, Flip',
        summary: 'Reporting automation with Python and Pandas — 70% less execution time.',
      },
      {
        dates: 'Mar 2023 — Nov 2023',
        role: 'Junior Frontend Developer, Promitia',
        summary: 'Responsive pages and features with React, Next.js, Angular and Tailwind.',
      },
      {
        dates: 'Aug 2021 — Aug 2026',
        role: 'B.S. Software Engineering, UPC',
        summary: 'Top 10% of class. Capstone: GenAIrator, defended.',
      },
    ],
    publicationLabel: '2026 — Publication',
    languages: 'Spanish — native · English — advanced · French — basic',
  },
  contact: {
    kicker: '03 — Contact · contractor, no visa sponsorship required',
  },
  caseStudy: {
    titleSuffix: 'Case study',
    back: '← All work',
    backAll: '← Back to all work',
    viewCode: 'View the code ↗',
    tryDemo: 'Try the live demo ↗',
    meta: { role: 'Role', context: 'Context', status: 'Status', languages: 'Languages' },
    headings: {
      problem: '01 — Problem',
      how: '02 — How it works',
      architecture: '03 — Architecture',
      decisions: '04 — Decisions',
      results: '05 — Results',
    },
  },
  footer: {
    copyright: '© 2026 Alessandro Alonso David Polanco',
    location: 'Lima, Peru',
  },
};
