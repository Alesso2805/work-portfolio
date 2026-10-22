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
  /** Images or short videos for the 16:9 box; more than one becomes a carousel. Empty → the box is hidden. Files go in public/. */
  media?: readonly CaseStudyMedia[];
  copy: Record<Locale, CaseStudyCopy>;
}

export interface CaseStudyMedia {
  kind: 'image' | 'video';
  /** One file per locale, so a screen of the product shows the page's language. */
  src: Record<Locale, string>;
  alt: Record<Locale, string>;
  /** What the screen shows, for someone who has never used the product. Empty → no caption. */
  caption?: Record<Locale, { title: string; body: string }>;
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
  media: [
    {
      kind: 'image',
      src: {
        en: '/case-studies/willay-live-map-en.png',
        es: '/case-studies/willay-live-map-es.png',
      },
      alt: {
        en: 'Willay’s live map: risk zones along the Rímac colored by their most urgent incident, and stations with their status',
        es: 'El mapa en vivo de Willay: zonas de riesgo del Rímac coloreadas según su incidente más urgente y estaciones con su estado',
      },
    },
  ],
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

const veriledger: CaseStudy = {
  slug: 'veriledger',
  metric: '9/9',
  media: [
    {
      kind: 'image',
      src: {
        en: '/case-studies/veriledger-chain-en.png',
        es: '/case-studies/veriledger-chain-es.png',
      },
      alt: {
        en: 'The chain page: the newest blocks as a ribbon of fingerprints, the newest one selected, and a panel to mine the next block',
        es: 'La página de la cadena: los bloques más nuevos como una cinta de huellas, el más nuevo seleccionado y un panel para minar el siguiente',
      },
      caption: {
        en: {
          title: 'The chain, drawn as fingerprints',
          body: 'Each block’s hash is drawn as coloured bars, one per byte, and each block carries the fingerprint of the one before — so changing any block would break every link after it. Anyone can browse it without an account.',
        },
        es: {
          title: 'La cadena, dibujada como huellas',
          body: 'El hash de cada bloque se dibuja como barras de colores, una por byte, y cada bloque lleva la huella del anterior: cambiar cualquier bloque rompería todos los enlaces que le siguen. Cualquiera puede recorrerla sin cuenta.',
        },
      },
    },
    {
      kind: 'image',
      src: {
        en: '/case-studies/veriledger-wallet-en.png',
        es: '/case-studies/veriledger-wallet-es.png',
      },
      alt: {
        en: 'The wallet page: a new address with its fingerprint, a balance of 0.00 VL and a prompt to save the key file',
        es: 'La página de la billetera: una dirección nueva con su huella, un saldo de 0.00 VL y el aviso para guardar el archivo de la clave',
      },
      caption: {
        en: {
          title: 'A wallet created in the browser',
          body: 'The Ed25519 key pair is generated in this tab and never reaches the server. The page asks you to save the key file, because a reload forgets it.',
        },
        es: {
          title: 'Una billetera creada en el navegador',
          body: 'El par de claves Ed25519 se genera en esta pestaña y nunca llega al servidor. La página pide guardar el archivo de la clave, porque al recargar se olvida.',
        },
      },
    },
    {
      kind: 'image',
      src: {
        en: '/case-studies/veriledger-sign-en.png',
        es: '/case-studies/veriledger-sign-es.png',
      },
      alt: {
        en: 'The sign and send page: a transfer of 10 VL, the exact JSON message being signed and its 64-byte Ed25519 signature',
        es: 'La página de firmar y enviar: una transferencia de 10 VL, el mensaje JSON exacto que se firma y su firma Ed25519 de 64 bytes',
      },
      caption: {
        en: {
          title: 'Exactly what you sign',
          body: 'Before anything is sent, the page shows the canonical message — sorted keys, no spaces, amounts with 8 decimals and a nonce — and its Ed25519 signature. The API rebuilds the same bytes and verifies them.',
        },
        es: {
          title: 'Exactamente lo que firmas',
          body: 'Antes de enviar nada, la página muestra el mensaje canónico — claves ordenadas, sin espacios, montos con 8 decimales y un nonce — y su firma Ed25519. La API reconstruye los mismos bytes y los verifica.',
        },
      },
    },
    {
      kind: 'image',
      src: {
        en: '/case-studies/veriledger-notarize-en.png',
        es: '/case-studies/veriledger-notarize-es.png',
      },
      alt: {
        en: 'Notarizing service-agreement.pdf: its SHA-256 fingerprint, and the signed message with that fingerprint as the payload',
        es: 'Notarizando contrato-de-servicios.pdf: su huella SHA-256 y el mensaje firmado con esa huella como payload',
      },
      caption: {
        en: {
          title: 'Notarizing a document',
          body: 'The file is hashed with SHA-256 in the browser, and only that fingerprint goes into the signed message, as its payload. The document itself never leaves the device.',
        },
        es: {
          title: 'Notarizar un documento',
          body: 'El archivo se hashea con SHA-256 en el navegador y solo esa huella entra en el mensaje firmado, como payload. El documento nunca sale del dispositivo.',
        },
      },
    },
    {
      kind: 'image',
      src: {
        en: '/case-studies/veriledger-transaction-en.png',
        es: '/case-studies/veriledger-transaction-es.png',
      },
      alt: {
        en: 'A transfer’s page: its journey from signed to sealed in a block, its details, and its signature checked in the browser',
        es: 'La página de una transferencia: su recorrido de firmada a sellada en un bloque, sus detalles y su firma verificada en el navegador',
      },
      caption: {
        en: {
          title: 'A transaction’s journey',
          body: 'Signed in the browser, accepted by the node, sealed in a block, then buried under the next ones. The page checks the signature again in this browser against the sender’s address.',
        },
        es: {
          title: 'El recorrido de una transacción',
          body: 'Firmada en el navegador, aceptada por el nodo, sellada en un bloque y luego enterrada bajo los siguientes. La página vuelve a verificar la firma en este navegador con la dirección del remitente.',
        },
      },
    },
    {
      kind: 'image',
      src: {
        en: '/case-studies/veriledger-certificate-en.png',
        es: '/case-studies/veriledger-certificate-es.png',
      },
      alt: {
        en: 'A notarization’s certificate: the date the document existed, its fingerprint, and the same file checked against it with a match',
        es: 'El certificado de una notarización: la fecha en que existía el documento, su huella y el mismo archivo comparado con ella, con resultado coincide',
      },
      caption: {
        en: {
          title: 'Proof of existence',
          body: 'The certificate says when the document was sealed. Choose the same file and it is hashed locally and compared with the chain: a match proves it existed then, unchanged.',
        },
        es: {
          title: 'Prueba de existencia',
          body: 'El certificado indica cuándo se selló el documento. Al elegir el mismo archivo, se hashea en local y se compara con la cadena: si coincide, queda probado que existía en ese momento, sin cambios.',
        },
      },
    },
  ],
  copy: {
    en: {
      kicker: 'Case study — Personal project',
      lead: 'A small, readable verifiable ledger you can try in your browser — a wallet whose private key only you hold, transfers and document notarizations signed in the tab, Proof-of-Work blocks, and peers that adopt a chain only once every block in it is valid.',
      role: 'Solo developer — from spec to deploy',
      context: 'Personal project · an API and a web app',
      status: 'v1.0.0 deployed, with a live demo',
      problemTitle:
        'Showing that a payment happened, or that a document existed at a given moment, usually means trusting whoever keeps the record.',
      problemBody:
        'A ledger where every entry is signed by its author, chained by hashes and replicated between nodes lets anyone check the record instead of trusting it. But blockchains are usually explained, not shown: VeriLedger shows one in a few minutes, in the browser, with nothing to install.',
      steps: [
        {
          title: 'Create a wallet',
          description:
            'The key pair is made in your browser and held only in the tab’s memory. It is never sent and never stored.',
        },
        {
          title: 'Sign and send',
          description:
            'Transfer to any address, or notarize a document: it is hashed in the browser and only its fingerprint is sent. You see the exact message before you sign it.',
        },
        {
          title: 'Mine a block',
          description:
            'Proof of Work seals every waiting transaction into a block, with a reward of 50 plus the fees for the miner. Each block carries the fingerprint of the one before.',
        },
        {
          title: 'Check it yourself',
          description:
            'Open a transaction and its signature is verified again in your browser. For a notarization, hash your own file locally and compare it with the chain.',
        },
      ],
      architecture: [
        {
          layer: 'Web app',
          tech: 'React 19 · TypeScript · Vite',
          notes: 'Ed25519 with @noble/curves · keys in the tab’s memory · EN/ES · light and dark',
        },
        {
          layer: 'API',
          tech: 'FastAPI · Python 3.12',
          notes: 'SQLAlchemy 2 async · Pydantic v2 · layers with ports in the domain',
        },
        {
          layer: 'Ledger',
          tech: 'Ed25519 · SHA-256',
          notes:
            'One canonical signed message · a nonce per sender · Proof of Work off the event loop',
        },
        {
          layer: 'Data',
          tech: 'PostgreSQL 16',
          notes: 'Alembic · one transaction per request, committed before the response',
        },
        {
          layer: 'Peers',
          tech: 'Other nodes · shared token',
          notes:
            'Public addresses only · the longest chain, if every block and transaction is valid',
        },
        {
          layer: 'Deploy',
          tech: 'Docker Compose · Caddy',
          notes: 'HTTPS on one hostname: the web app at /, the API at /api',
        },
        {
          layer: 'CI',
          tech: 'GitHub Actions',
          notes:
            'Ruff · Mypy strict · import-linter · tests on PostgreSQL · a rehearsal of the deploy',
        },
      ],
      decisions: [
        {
          title: 'One signed message, pinned by golden vectors',
          body: 'The first version signed Python’s json.dumps on one side and JSON.stringify on the other, so the API rejected every transaction from the web app. Now both build one canonical message — sorted keys, no whitespace, amounts as 8-decimal strings, a nonce per sender — and both repositories test the same vectors.',
        },
        {
          title: 'The private key never leaves the browser',
          body: 'The server never generates or receives one: key generation answers 404 in production, and a test records every request of the create, transfer and notarize flow and finds no private key.',
        },
        {
          title: 'Mining that cannot create money',
          body: 'An audit found that concurrent mining created money. Now the reward, the block and the confirmations commit in one transaction, two requests for the same height get a 409, and Proof of Work runs in a worker thread so the API keeps answering.',
        },
        {
          title: 'A peer’s chain is checked, not trusted',
          body: 'A longer chain is adopted only if every hash, link, reward, signature, nonce and balance in it is valid. Peers call each other with a shared token, and only at public addresses, so a peer’s URL cannot reach the server’s own network.',
        },
      ],
      results: {
        metricLabel:
          'blocking problems an audit found in the first version of the API — forged tokens, replays, money created by concurrent mining — all fixed',
        cards: [
          {
            title: '199 API tests',
            body: 'Unit, architecture and integration tests against a real PostgreSQL, plus 399 web app tests and 84 checks in a real browser',
          },
          {
            title: '27 rules that fail the build',
            body: '16 in the API and 11 in the web app, each checked by a test: the domain never imports FastAPI or SQLAlchemy, and no request carries a private key',
          },
        ],
      },
    },
    es: {
      kicker: 'Caso de estudio — Proyecto personal',
      lead: 'Un ledger verificable, pequeño y legible, que se prueba en el navegador — una billetera cuya clave privada solo tienes tú, transferencias y notarizaciones de documentos firmadas en la pestaña, bloques con Proof of Work y peers que solo adoptan una cadena cuando cada uno de sus bloques es válido.',
      role: 'Desarrollador único — de la especificación al despliegue',
      context: 'Proyecto personal · una API y una web app',
      status: 'v1.0.0 desplegada, con demo en vivo',
      problemTitle:
        'Demostrar que un pago ocurrió, o que un documento existía en un momento dado, suele significar confiar en quien guarda el registro.',
      problemBody:
        'Un ledger donde cada entrada está firmada por su autor, encadenada por hashes y replicada entre nodos permite que cualquiera verifique el registro en lugar de confiar en él. Pero las blockchains suelen explicarse, no mostrarse: VeriLedger muestra una en pocos minutos, en el navegador, sin instalar nada.',
      steps: [
        {
          title: 'Crea una billetera',
          description:
            'El par de claves se genera en tu navegador y vive solo en la memoria de la pestaña. Nunca se envía ni se guarda.',
        },
        {
          title: 'Firma y envía',
          description:
            'Transfiere a cualquier dirección, o notariza un documento: se hashea en el navegador y solo se envía su huella. Ves el mensaje exacto antes de firmarlo.',
        },
        {
          title: 'Mina un bloque',
          description:
            'El Proof of Work sella en un bloque todas las transacciones en espera, con una recompensa de 50 más las comisiones para quien mina. Cada bloque lleva la huella del anterior.',
        },
        {
          title: 'Compruébalo tú',
          description:
            'Abre una transacción y su firma se verifica de nuevo en tu navegador. Para una notarización, hashea tu propio archivo en local y compáralo con la cadena.',
        },
      ],
      architecture: [
        {
          layer: 'Web app',
          tech: 'React 19 · TypeScript · Vite',
          notes:
            'Ed25519 con @noble/curves · claves en la memoria de la pestaña · ES/EN · claro y oscuro',
        },
        {
          layer: 'API',
          tech: 'FastAPI · Python 3.12',
          notes: 'SQLAlchemy 2 async · Pydantic v2 · capas con puertos en el dominio',
        },
        {
          layer: 'Ledger',
          tech: 'Ed25519 · SHA-256',
          notes:
            'Un único mensaje firmado canónico · un nonce por emisor · Proof of Work fuera del event loop',
        },
        {
          layer: 'Datos',
          tech: 'PostgreSQL 16',
          notes: 'Alembic · una transacción por petición, confirmada antes de la respuesta',
        },
        {
          layer: 'Peers',
          tech: 'Otros nodos · token compartido',
          notes:
            'Solo direcciones públicas · la cadena más larga, si cada bloque y transacción es válido',
        },
        {
          layer: 'Despliegue',
          tech: 'Docker Compose · Caddy',
          notes: 'HTTPS en un solo dominio: la web app en /, la API en /api',
        },
        {
          layer: 'CI',
          tech: 'GitHub Actions',
          notes:
            'Ruff · Mypy strict · import-linter · tests sobre PostgreSQL · un ensayo del despliegue',
        },
      ],
      decisions: [
        {
          title: 'Un mensaje firmado, fijado por vectores de referencia',
          body: 'La primera versión firmaba con json.dumps de Python en un lado y JSON.stringify en el otro, así que la API rechazaba todas las transacciones de la web app. Ahora ambos construyen un único mensaje canónico — claves ordenadas, sin espacios, montos como texto con 8 decimales, un nonce por emisor — y los dos repositorios prueban los mismos vectores.',
        },
        {
          title: 'La clave privada nunca sale del navegador',
          body: 'El servidor nunca genera ni recibe una: la generación de claves responde 404 en producción, y un test registra cada petición del flujo crear, transferir y notarizar sin encontrar ninguna clave privada.',
        },
        {
          title: 'Minar sin crear dinero',
          body: 'Una auditoría encontró que minar en paralelo creaba dinero. Ahora la recompensa, el bloque y las confirmaciones se guardan en una sola transacción, dos peticiones para la misma altura reciben un 409 y el Proof of Work corre en un hilo aparte para que la API siga respondiendo.',
        },
        {
          title: 'La cadena de un peer se comprueba, no se cree',
          body: 'Una cadena más larga solo se adopta si cada hash, enlace, recompensa, firma, nonce y saldo es válido. Los peers se llaman entre sí con un token compartido, y solo en direcciones públicas, para que la URL de un peer no pueda alcanzar la red interna del servidor.',
        },
      ],
      results: {
        metricLabel:
          'problemas bloqueantes que una auditoría encontró en la primera versión de la API — tokens falsificables, repeticiones, dinero creado al minar en paralelo — todos resueltos',
        cards: [
          {
            title: '199 tests de la API',
            body: 'Unitarios, de arquitectura y de integración contra un PostgreSQL real, más 399 tests de la web app y 84 pruebas en un navegador real',
          },
          {
            title: '27 reglas que rompen el build',
            body: '16 en la API y 11 en la web app, cada una comprobada por un test: el dominio nunca importa FastAPI ni SQLAlchemy, y ninguna petición lleva una clave privada',
          },
        ],
      },
    },
  },
};

export const caseStudies: readonly CaseStudy[] = [genairator, willay, veriledger];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
