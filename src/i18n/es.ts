import type { Dictionary } from './types';

export const es: Dictionary = {
  skipLink: 'Saltar al contenido',
  nav: {
    label: 'Principal',
    work: 'Proyectos',
    experience: 'Experiencia',
    contact: 'Contacto',
    languageGroup: 'Idioma',
  },
  theme: {
    toDark: 'Cambiar a modo nocturno',
    toLight: 'Cambiar a modo claro',
  },
  hero: {
    kicker: 'Software Engineer — Lima, PE — Remoto EE. UU. / LatAm / UE',
    sub: 'Ingeniero backend primero. Python, FastAPI, SQLAlchemy, SQL Server y Docker — y el frontend en React o Angular encima.',
    ctaWork: 'Ver proyectos ↓',
  },
  stats: {
    at: 'En White Lion Technology',
    coverage: 'cobertura de pruebas con Pytest',
    endpoints: 'endpoints REST',
    faster: 'consultas más rápidas',
  },
  work: {
    title: '01 — Proyectos',
    filterLabel: 'Filtrar proyectos por lenguaje',
    all: 'Todos',
    thesisTag: 'tesis · 44/44 pruebas',
    practices: 'Prácticas',
    toolsFor: 'Herramientas',
  },
  experience: {
    title: '02 — Experiencia',
    items: [
      {
        dates: 'Oct 2025 — actualidad',
        role: 'Software Engineer, White Lion Technology',
        summary:
          'Más de 20 endpoints FastAPI sobre SQL Server, control de acceso JWT, arquitectura por capas.',
      },
      {
        dates: 'Ene 2025 — Oct 2025',
        role: 'Practicante de Automatización de Procesos, Flip',
        summary: 'Automatización de reportes con Python y Pandas — 70% menos tiempo de ejecución.',
      },
      {
        dates: 'Mar 2023 — Nov 2023',
        role: 'Junior Frontend Developer, Promitia',
        summary: 'Páginas responsivas y funcionalidades con React, Next.js, Angular y Tailwind.',
      },
      {
        dates: 'Ago 2021 — Ago 2026',
        role: 'Ingeniería de Software, UPC',
        summary: 'Décimo superior. Tesis: GenAIrator, sustentada.',
      },
    ],
    publicationLabel: '2026 — Publicación',
    languages: 'Español — nativo · Inglés — avanzado · Francés — básico',
  },
  contact: {
    kicker: '03 — Contacto · contractor, sin patrocinio de visado',
  },
  caseStudy: {
    titleSuffix: 'Caso de estudio',
    back: '← Todos los proyectos',
    backAll: '← Volver a todos los proyectos',
    viewCode: 'Ver el código ↗',
    meta: { role: 'Rol', context: 'Contexto', status: 'Estado', languages: 'Lenguajes' },
    headings: {
      problem: '01 — Problema',
      how: '02 — Cómo funciona',
      architecture: '03 — Arquitectura',
      decisions: '04 — Decisiones',
      results: '05 — Resultados',
    },
  },
  footer: {
    copyright: '© 2026 Alessandro Alonso David Polanco',
    location: 'Lima, Perú',
  },
};
