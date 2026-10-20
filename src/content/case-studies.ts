import { site } from '@/config/site';
import type { Locale } from '@/i18n/config';

/** Text of one case study in one language. `en` and `es` must have the same shape. */
export interface CaseStudyCopy {
  kicker: string;
  lead: string;
  /** Your role on the team. Empty → the "Role" metadata column is hidden. */
  role?: string;
  context: string;
  status: string;
  problemTitle: string;
  /** Paragraph under the problem statement. Empty → only the big sentence is shown. */
  problemBody?: string;
  steps: ReadonlyArray<{ title: string; description: string }>;
  architecture: ReadonlyArray<{ layer: string; tech: string; notes: string }>;
  decisions: ReadonlyArray<{ title: string; body: string }>;
  results: {
    metricLabel: string;
    /** Cards beside the metric. One with `href` is a link and shows ↗. */
    cards: ReadonlyArray<{ title: string; body: string; href?: string }>;
  };
}

export interface CaseStudy {
  /** URL segment: /[locale]/projects/<slug>. A project points here with `caseStudySlug`. */
  slug: string;
  /** Big number in the orange results block. */
  metric: string;
  /** Image or short video for the 16:9 box. Empty → the box is hidden. Files go in public/. */
  screenshot?: {
    kind: 'image' | 'video';
    src: string;
    alt: Record<Locale, string>;
  };
  copy: Record<Locale, CaseStudyCopy>;
}

const genairator: CaseStudy = {
  slug: 'genairator',
  metric: '44/44',
  copy: {
    en: {
      kicker: 'Case study — Capstone thesis — UPC',
      lead: 'From a design system and a list of functional requirements to a working fullstack project — Angular frontend, .NET backend — generated, documented and checked for quality and accessibility.',
      context: 'Capstone thesis · UPC',
      status: 'Implemented, validated end to end',
      problemTitle: 'Turning a finished design into a working codebase is slow, repetitive work.',
      steps: [
        {
          title: 'Read the design system',
          description:
            'Imports tokens from Figma and analyses colors, type and spacing alongside the functional requirements.',
        },
        {
          title: 'Orchestrate the model',
          description:
            'Asynchronous workers and queues run the GenAI generation so long jobs never block the API.',
        },
        {
          title: 'Generate the stack',
          description:
            'Produces an Angular frontend and a .NET backend with API docs, and pushes the result to GitHub.',
        },
        {
          title: 'Validate it',
          description:
            'Quality and accessibility gates — SonarQube, Lighthouse, WAVE and axe against WCAG 2.1.',
        },
      ],
      architecture: [
        { layer: 'Client', tech: 'Angular 20 SPA', notes: 'S3 + CDN' },
        {
          layer: 'API',
          tech: 'ASP.NET Core .NET 9',
          notes: 'Private VPC · JWT Bearer · BCrypt · Swagger',
        },
        { layer: 'Data', tech: 'RDS PostgreSQL', notes: 'EF Core · Npgsql' },
        { layer: 'Model', tech: 'OpenAI API', notes: 'GPT-5' },
        { layer: 'Artifacts', tech: 'S3', notes: 'Generated projects and assets' },
        { layer: 'Output', tech: 'GitHub', notes: 'via Octokit' },
        { layer: 'CI', tech: 'GitHub Actions', notes: 'SonarQube · Lighthouse · WAVE · axe' },
      ],
      decisions: [
        {
          title: 'Benchmark before picking a model',
          body: 'GPT-5 was chosen after comparing candidate LLMs on accuracy, context size, latency and deployment.',
        },
        {
          title: 'Generation off the request path',
          body: 'Workers and queues handle generation asynchronously, so the API stays responsive while a project builds.',
        },
        {
          title: 'Quality is a gate, not a report',
          body: 'SonarQube, Lighthouse, WAVE and axe run in GitHub Actions against WCAG 2.1 for every generated project.',
        },
      ],
      results: {
        metricLabel: 'software test cases passed (CP001–CP044)',
        cards: [
          {
            title: 'Thesis defended',
            body: 'Final cycle of the Software Engineering degree at UPC',
          },
          {
            title: 'Published in IEEE Xplore',
            body: 'Peer-reviewed conference paper (2026) — read it on IEEE Xplore',
            href: site.paper.url,
          },
        ],
      },
    },
    es: {
      kicker: 'Caso de estudio — Proyecto de tesis — UPC',
      lead: 'De un design system y una lista de requisitos funcionales a un proyecto fullstack funcionando — frontend en Angular, backend en .NET — generado, documentado y validado en calidad y accesibilidad.',
      context: 'Proyecto de tesis · UPC',
      status: 'Implementado y validado de punta a punta',
      problemTitle:
        'Convertir un diseño terminado en código funcional es un trabajo lento y repetitivo.',
      steps: [
        {
          title: 'Lee el design system',
          description:
            'Importa tokens desde Figma y analiza colores, tipografía y espaciado junto con los requisitos funcionales.',
        },
        {
          title: 'Orquesta el modelo',
          description:
            'Workers y colas asíncronas ejecutan la generación con IA para que los trabajos largos nunca bloqueen la API.',
        },
        {
          title: 'Genera el stack',
          description:
            'Produce un frontend en Angular y un backend en .NET con documentación de la API, y sube el resultado a GitHub.',
        },
        {
          title: 'Lo valida',
          description:
            'Controles de calidad y accesibilidad — SonarQube, Lighthouse, WAVE y axe contra WCAG 2.1.',
        },
      ],
      architecture: [
        { layer: 'Cliente', tech: 'Angular 20 SPA', notes: 'S3 + CDN' },
        {
          layer: 'API',
          tech: 'ASP.NET Core .NET 9',
          notes: 'VPC privada · JWT Bearer · BCrypt · Swagger',
        },
        { layer: 'Datos', tech: 'RDS PostgreSQL', notes: 'EF Core · Npgsql' },
        { layer: 'Modelo', tech: 'OpenAI API', notes: 'GPT-5' },
        { layer: 'Artefactos', tech: 'S3', notes: 'Proyectos y recursos generados' },
        { layer: 'Salida', tech: 'GitHub', notes: 'vía Octokit' },
        { layer: 'CI', tech: 'GitHub Actions', notes: 'SonarQube · Lighthouse · WAVE · axe' },
      ],
      decisions: [
        {
          title: 'Comparar antes de elegir un modelo',
          body: 'GPT-5 se eligió tras comparar LLMs candidatos en precisión, tamaño de contexto, latencia y despliegue.',
        },
        {
          title: 'Generación fuera del flujo de la petición',
          body: 'Workers y colas manejan la generación de forma asíncrona, así la API sigue respondiendo mientras se construye un proyecto.',
        },
        {
          title: 'La calidad es un filtro, no un reporte',
          body: 'SonarQube, Lighthouse, WAVE y axe corren en GitHub Actions contra WCAG 2.1 en cada proyecto generado.',
        },
      ],
      results: {
        metricLabel: 'casos de prueba de software aprobados (CP001–CP044)',
        cards: [
          {
            title: 'Tesis sustentada',
            body: 'Último ciclo de Ingeniería de Software en la UPC',
          },
          {
            title: 'Publicado en IEEE Xplore',
            body: 'Paper de congreso revisado por pares (2026) — léelo en IEEE Xplore',
            href: site.paper.url,
          },
        ],
      },
    },
  },
};

export const caseStudies: readonly CaseStudy[] = [genairator];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
