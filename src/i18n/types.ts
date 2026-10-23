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
    /** Heading of the full, filterable list under the rail. */
    allProjects: string;
    filterLabel: string;
    all: string;
    thesisTag: string;
    practices: string;
    toolsFor: string;
    /** Link on each project panel; screen readers hear the project's name after it. */
    open: string;
    /** Above the project rail on wide screens: how to move it. */
    railHint: string;
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
    /** The carousel of screens: its name, its buttons, and the word in "2 of 6". */
    media: { label: string; previous: string; next: string; of: string };
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
