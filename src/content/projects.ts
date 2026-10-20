import type { Locale } from '@/i18n/config';

export const langs = ['python', 'ts', 'csharp', 'sql'] as const;

export type Lang = (typeof langs)[number];

export interface Project {
  slug: string;
  /** '01', '02'… in home order. */
  number: string;
  name: string;
  /** Shows the orange thesis tag. */
  featured: boolean;
  languages: Lang[];
  /** e.g. 'C# · TypeScript · SQL' */
  languagesLabel: string;
  description: Record<Locale, string>;
  repoUrl?: string;
  demoUrl?: string;
  /** Row links to /[locale]/projects/<caseStudySlug>; otherwise to repoUrl; otherwise it is not a link. */
  caseStudySlug?: string;
}

export const projects: readonly Project[] = [
  {
    slug: 'genairator',
    number: '01',
    name: 'GenAIrator',
    featured: true,
    languages: ['csharp', 'ts', 'sql'],
    languagesLabel: 'C# · TypeScript · SQL',
    description: {
      en: 'Generates fullstack projects — Angular + .NET — from a design system and functional requirements, with quality and accessibility gates.',
      es: 'Genera proyectos fullstack — Angular + .NET — a partir de un design system y requisitos funcionales, con controles de calidad y accesibilidad.',
    },
    caseStudySlug: 'genairator',
  },
  {
    slug: 'willay',
    number: '02',
    name: 'Willay',
    featured: false,
    languages: ['python', 'ts', 'sql'],
    languagesLabel: 'Python · TypeScript · SQL',
    description: {
      en: 'Early warning for floods and debris flows — rules, incidents and alerts that escalate until someone acknowledges. FastAPI workers, PostgreSQL as the queue, Keycloak.',
      es: 'Alerta temprana de inundaciones y huaicos — reglas, incidentes y alertas que escalan hasta que alguien confirma. Workers FastAPI, PostgreSQL como cola, Keycloak.',
    },
    repoUrl: 'https://github.com/Alesso2805/willay',
    demoUrl: 'https://willay.duckdns.org',
    caseStudySlug: 'willay',
  },
  {
    slug: 'veriledger',
    number: '03',
    name: 'VeriLedger API',
    featured: false,
    languages: ['python', 'ts', 'sql'],
    languagesLabel: 'Python · TypeScript · SQL',
    description: {
      en: 'Verifiable financial ledger — transaction hashing, Merkle proofs, idempotent writes, audit log.',
      es: 'Ledger financiero verificable — hashing de transacciones, Merkle proofs, escrituras idempotentes, log de auditoría.',
    },
  },
  {
    slug: 'sentinelapi',
    number: '04',
    name: 'SentinelAPI',
    featured: false,
    languages: ['python'],
    languagesLabel: 'Python',
    description: {
      en: 'Adaptive threat-detection middleware for FastAPI — rate limiting, credential stuffing, JWT replay.',
      es: 'Middleware de detección adaptativa de amenazas para FastAPI — rate limiting, credential stuffing, JWT replay.',
    },
  },
];

/** Line under the filter: general practices for "All", tools for each language. */
export const toolbelt: Record<'all' | Lang, string> = {
  all: 'Clean Architecture · DDD · SOLID · REST / OpenAPI · JWT & RBAC · Docker · GitHub Actions · Pytest · SonarQube · WCAG 2.1',
  python: 'FastAPI · SQLAlchemy 2 · Pydantic v2 · Alembic · Pytest · Pandas',
  ts: 'JavaScript · TypeScript · React · Next.js · Angular 20 · Tailwind CSS',
  csharp: 'ASP.NET Core .NET 9 · EF Core · Npgsql · JWT · BCrypt',
  sql: 'PostgreSQL · SQL Server · MongoDB · Redis',
};

/** Filter button labels; "All" is localized in the dictionary. */
export const langLabels: Record<Lang, string> = {
  python: 'Python',
  ts: 'JS / TS',
  csharp: 'C#',
  sql: 'SQL',
};
