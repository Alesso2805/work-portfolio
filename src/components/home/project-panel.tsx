import Image from 'next/image';
import { cn } from '@/lib/cn';
import type { ProjectRowData } from '@/lib/projects';

/** Text and link colors follow the panel (`current`), so focus rings and hovers stay visible on every tone. */
const tones = {
  accent: 'bg-accent text-on-accent',
  ink: 'bg-ink text-bg',
  surface: 'bg-surface text-ink',
} as const;

/** The thesis in orange, then ink and surface by number: fixed per project, so a filter never repaints one. */
function toneOf(project: ProjectRowData): keyof typeof tones {
  if (project.featured) return 'accent';
  return Number(project.number) % 2 === 0 ? 'ink' : 'surface';
}

/** '500 ms' → ['500', ' ms']: the leading number is what the rail counts up. */
function splitFigure(value: string): [string, string] {
  const match = /^(\d+)(.*)$/.exec(value);
  return match ? [match[1] ?? '', match[2] ?? ''] : ['', value];
}

/** One project on the home page: text and figure on the left, the first screen of its case study on the right. */
export function ProjectPanel({
  project,
  labels,
}: {
  project: ProjectRowData;
  labels: { thesisTag: string; open: string };
}) {
  const titleId = `project-${project.slug}`;
  const [count, rest] = project.highlight ? splitFigure(project.highlight.value) : ['', ''];

  return (
    <article
      data-rail-panel
      aria-labelledby={titleId}
      className={cn(
        'grid h-full content-center items-center gap-x-10 gap-y-7 p-[clamp(24px,3.5vw,48px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]',
        tones[toneOf(project)],
      )}
    >
      <div className="min-w-0">
        <p className="font-mono text-[13px]">
          {project.number}
          {project.featured && ` · ${labels.thesisTag}`}
        </p>
        <h3
          id={titleId}
          className="mt-1 overflow-hidden py-[0.1em] font-black text-[clamp(36px,4.2vw,64px)] leading-none tracking-[-0.045em]"
        >
          <span data-rail-title className="block">
            {project.name}
          </span>
        </h3>
        <p className="mt-3 max-w-[46ch]">{project.description}</p>
        <p className="mt-3.5 font-mono text-[13px]">{project.languagesLabel}</p>

        {project.highlight && (
          <p className="mt-6 flex flex-wrap items-baseline gap-x-3.5 gap-y-1 border-current border-t-2 pt-4">
            <span className="font-black text-[clamp(36px,4vw,56px)] tabular-nums leading-none tracking-[-0.04em]">
              {count && <span data-rail-count>{count}</span>}
              {rest}
            </span>
            <span className="text-[14px]">{project.highlight.label}</span>
          </p>
        )}

        {project.href && (
          <a
            href={project.href}
            className="group/link mt-5 inline-flex min-h-11 items-center gap-2 border-current border-b-2 font-extrabold text-current no-underline hover:text-current focus-visible:outline-current"
          >
            {labels.open}
            <span className="sr-only">: {project.name}</span>
            <span
              aria-hidden="true"
              className="transition-transform group-hover/link:translate-x-1"
            >
              →
            </span>
          </a>
        )}
      </div>

      <div className="relative aspect-[16/10] overflow-hidden border-2 border-current">
        {project.cover ? (
          // Wider than its frame, so the rail can slide it a little for parallax.
          <div data-rail-shot className="absolute inset-y-0 -left-[6%] w-[112%]">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover object-left-top"
              draggable={false}
            />
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex flex-col justify-between bg-ink p-6 text-bg"
          >
            <span className="font-mono text-[13px]">{project.languagesLabel}</span>
            <span className="font-black text-[clamp(40px,5vw,72px)] leading-[0.9] tracking-[-0.04em]">
              {project.name}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
