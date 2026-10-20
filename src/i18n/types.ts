/**
 * Shape shared by every locale. `en.ts` and `es.ts` are both typed against it,
 * so a key missing (or extra) in either one is a TypeScript error.
 */
export interface Dictionary {
  skipLink: string;
  nav: {
    label: string;
    work: string;
    experience: string;
    contact: string;
    languageGroup: string;
  };
  theme: {
    toDark: string;
    toLight: string;
  };
  hero: {
    kicker: string;
    sub: string;
    ctaWork: string;
  };
  stats: {
    at: string;
    coverage: string;
    endpoints: string;
    faster: string;
  };
  work: {
    title: string;
    filterLabel: string;
    all: string;
    thesisTag: string;
    practices: string;
    toolsFor: string;
  };
  experience: {
    title: string;
    items: ReadonlyArray<{ dates: string; role: string; summary: string }>;
    publicationLabel: string;
    languages: string;
  };
  contact: {
    kicker: string;
  };
  caseStudy: {
    titleSuffix: string;
    back: string;
    backAll: string;
    viewCode: string;
    tryDemo: string;
    meta: { role: string; context: string; status: string; languages: string };
    headings: {
      problem: string;
      how: string;
      architecture: string;
      decisions: string;
      results: string;
    };
  };
  footer: {
    copyright: string;
    location: string;
  };
}
