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

const willay: CaseStudy = {
  slug: 'willay',
  metric: '500',
  screenshot: {
    kind: 'image',
    src: '/case-studies/willay-live-map.png',
    alt: {
      en: 'Willay’s live map: risk zones along the Rímac colored by their most urgent incident, and stations with their status',
      es: 'El mapa en vivo de Willay: zonas de riesgo del Rímac coloreadas según su incidente más urgente y estaciones con su estado',
    },
  },
  copy: {
    en: {
      kicker: 'Case study — Personal project',
      lead: 'An early warning layer for floods and debris flows — it evaluates every sensor reading as it arrives, opens the incident and alerts the right people by email and Telegram in seconds, escalating level by level until someone acknowledges.',
      role: 'Solo developer — from spec to deploy',
      context: 'Personal project · 9 two-week sprints',
      status: 'MVP deployed, with a live demo',
      problemTitle:
        'Between a sensor that detects an anomaly and the person who must act, there is a phone chain — and minutes lost.',
      problemBody:
        'In the Rasuwa flood (Nepal, August 2026) the hydrological station went silent about ten minutes after the river overflowed, and downstream warnings went out 25 minutes later: its silence was the first signal. In Peru, municipal risk offices facing huaicos and the coastal El Niño still detect events by watching charts and calling each other. Monitoring portals show the data, but nobody decides or escalates.',
      steps: [
        {
          title: 'Ingest every reading',
          description:
            'Stations send batches over HTTP with their own API key. Each reading and its queue row are written in the same transaction.',
        },
        {
          title: 'Recognize the danger',
          description:
            'Workers evaluate thresholds and sudden rises or drops as readings arrive. A station that goes silent in a risk zone counts as a signal too.',
        },
        {
          title: 'Open the incident',
          description:
            'One active incident per cause, even with several evaluators racing, and a timeline that cannot be edited and outlives the readings.',
        },
        {
          title: 'Alert and escalate',
          description:
            'Email and Telegram in seconds, in each contact’s language. If nobody acknowledges in time, the next level is alerted; one click stops it for everyone.',
        },
      ],
      architecture: [
        {
          layer: 'Sources',
          tech: 'Sensors · simulator',
          notes: 'HTTP batches · per-station API key (Argon2id) · rate limit in Postgres',
        },
        {
          layer: 'API',
          tech: 'FastAPI · Python 3.12',
          notes: 'SQLAlchemy 2 async · Pydantic v2 · SSE per organization',
        },
        {
          layer: 'Workers',
          tech: '5 Python processes',
          notes: 'Evaluator · silence · dispatcher · escalation · Telegram',
        },
        {
          layer: 'Data',
          tech: 'PostgreSQL 16',
          notes: 'PostGIS · TimescaleDB · queue with SKIP LOCKED · LISTEN/NOTIFY',
        },
        {
          layer: 'Identity',
          tech: 'Keycloak 26',
          notes: 'Organizations · one tenant per user · roles from the JWT',
        },
        {
          layer: 'Dashboard',
          tech: 'Angular',
          notes: 'Signals · Leaflet · Tailwind CSS · EN/ES · light and dark',
        },
        {
          layer: 'Channels',
          tech: 'Email · Telegram',
          notes: 'SMTP · Bot API with an acknowledge button',
        },
        {
          layer: 'Deploy',
          tech: 'Docker Compose · Caddy',
          notes: 'Automatic HTTPS on one hostname · arm64 and amd64',
        },
      ],
      decisions: [
        {
          title: 'PostgreSQL as the queue, not Redis',
          body: 'A reading and its queue row commit together, so nothing accepted is lost. Workers claim rows with SKIP LOCKED, and a row that fails five times is set aside instead of blocking the rest.',
        },
        {
          title: 'Silence is a signal',
          body: 'A station that stops reporting in a risk zone opens its own incident after K times its expected interval, because in Rasuwa the silence came first.',
        },
        {
          title: 'One backend, separate processes',
          body: 'One Python package runs as the API and five workers. Import contracts fail the build if the domain imports FastAPI or SQLAlchemy, and an injected clock tests escalation without waiting.',
        },
        {
          title: 'The tenant comes from the token',
          body: 'Keycloak 26 Organizations puts the organization in the JWT. Every query and every live event is scoped to it, and isolation is tested on every endpoint and on the SSE channel.',
        },
      ],
      results: {
        metricLabel:
          'milliseconds (p95) from reading received to first alert sent, under load — the target is 30 s',
        cards: [
          {
            title: 'No reading lost',
            body: '9,000 batches from 50 stations in 30 minutes, every reading evaluated',
          },
          {
            title: '990 backend tests',
            body: 'Unit and integration against a real Postgres, plus 336 dashboard tests and 32 checks in a real browser',
          },
        ],
      },
    },
    es: {
      kicker: 'Caso de estudio — Proyecto personal',
      lead: 'Una capa de alerta temprana para inundaciones y huaicos — evalúa cada lectura de los sensores apenas llega, abre el incidente y alerta a las personas correctas por correo y Telegram en segundos, escalando nivel por nivel hasta que alguien confirma.',
      role: 'Desarrollador único — de la especificación al despliegue',
      context: 'Proyecto personal · 9 sprints de dos semanas',
      status: 'MVP desplegado, con demo en vivo',
      problemTitle:
        'Entre un sensor que detecta una anomalía y la persona que debe actuar hay una cadena de llamadas — y minutos perdidos.',
      problemBody:
        'En la inundación de Rasuwa (Nepal, agosto de 2026) la estación hidrológica dejó de transmitir unos diez minutos después del desborde, y las alertas aguas abajo salieron 25 minutos más tarde: su silencio fue la primera señal. En Perú, las oficinas municipales de gestión del riesgo que enfrentan huaicos y el Niño costero todavía detectan los eventos mirando gráficos y llamándose entre sí. Los portales de monitoreo muestran los datos, pero nadie decide ni escala.',
      steps: [
        {
          title: 'Recibe cada lectura',
          description:
            'Las estaciones envían lotes por HTTP con su propia API key. Cada lectura y su fila en la cola se escriben en la misma transacción.',
        },
        {
          title: 'Reconoce el peligro',
          description:
            'Los workers evalúan umbrales y subidas o caídas bruscas a medida que llegan las lecturas. Una estación que se queda en silencio en una zona de riesgo también es una señal.',
        },
        {
          title: 'Abre el incidente',
          description:
            'Un solo incidente activo por causa, aunque varios evaluadores compitan, y una línea de tiempo que no se puede editar y sobrevive a las lecturas.',
        },
        {
          title: 'Alerta y escala',
          description:
            'Correo y Telegram en segundos, en el idioma de cada contacto. Si nadie confirma a tiempo, se alerta al siguiente nivel; un clic lo detiene para todos.',
        },
      ],
      architecture: [
        {
          layer: 'Fuentes',
          tech: 'Sensores · simulador',
          notes: 'Lotes HTTP · API key por estación (Argon2id) · rate limit en Postgres',
        },
        {
          layer: 'API',
          tech: 'FastAPI · Python 3.12',
          notes: 'SQLAlchemy 2 async · Pydantic v2 · SSE por organización',
        },
        {
          layer: 'Workers',
          tech: '5 procesos Python',
          notes: 'Evaluador · silencio · despachador · escalamiento · Telegram',
        },
        {
          layer: 'Datos',
          tech: 'PostgreSQL 16',
          notes: 'PostGIS · TimescaleDB · cola con SKIP LOCKED · LISTEN/NOTIFY',
        },
        {
          layer: 'Identidad',
          tech: 'Keycloak 26',
          notes: 'Organizations · un tenant por usuario · roles desde el JWT',
        },
        {
          layer: 'Dashboard',
          tech: 'Angular',
          notes: 'Signals · Leaflet · Tailwind CSS · ES/EN · claro y oscuro',
        },
        {
          layer: 'Canales',
          tech: 'Correo · Telegram',
          notes: 'SMTP · Bot API con botón para confirmar',
        },
        {
          layer: 'Despliegue',
          tech: 'Docker Compose · Caddy',
          notes: 'HTTPS automático en un solo dominio · arm64 y amd64',
        },
      ],
      decisions: [
        {
          title: 'PostgreSQL como cola, no Redis',
          body: 'Una lectura y su fila en la cola se confirman juntas, así que nada de lo aceptado se pierde. Los workers toman filas con SKIP LOCKED, y una fila que falla cinco veces se aparta en lugar de bloquear al resto.',
        },
        {
          title: 'El silencio es una señal',
          body: 'Una estación que deja de reportar en una zona de riesgo abre su propio incidente tras K veces su intervalo esperado, porque en Rasuwa el silencio llegó primero.',
        },
        {
          title: 'Un backend, procesos separados',
          body: 'Un solo paquete Python corre como la API y cinco workers. Los contratos de importación rompen el build si el dominio importa FastAPI o SQLAlchemy, y un reloj inyectado prueba el escalamiento sin esperar.',
        },
        {
          title: 'El tenant viene del token',
          body: 'Keycloak 26 Organizations pone la organización en el JWT. Cada consulta y cada evento en vivo se limitan a ella, y el aislamiento se prueba en cada endpoint y en el canal SSE.',
        },
      ],
      results: {
        metricLabel:
          'milisegundos (p95) desde la lectura recibida hasta la primera alerta enviada, bajo carga — la meta es 30 s',
        cards: [
          {
            title: 'Ninguna lectura perdida',
            body: '9000 lotes de 50 estaciones en 30 minutos, todas las lecturas evaluadas',
          },
          {
            title: '990 tests de backend',
            body: 'Unitarios y de integración contra un Postgres real, más 336 tests del dashboard y 32 pruebas en un navegador real',
          },
        ],
      },
    },
  },
};

export const caseStudies: readonly CaseStudy[] = [genairator, willay];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
