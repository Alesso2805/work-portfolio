import { site } from '@/config/site';
import type { Dictionary } from '@/i18n';
import { cn } from '@/lib/cn';
import { ExperienceDeck } from './experience-deck';

/** Card colors, in order. */
const faces = [
  'bg-surface text-ink',
  'bg-ink text-bg',
  'bg-accent text-on-accent',
  'bg-ink text-bg',
] as const;

export function Experience({ dict }: { dict: Dictionary }) {
  const { experience } = dict;

  return (
    <section id="experience" className="pb-[clamp(48px,6vw,80px)]">
      <h2 className="mb-7 text-section">{experience.title}</h2>
      <ExperienceDeck>
        {experience.items.map((item, i) => (
          <li key={item.dates} data-deck-card className="relative">
            <div
              data-deck-face
              className={cn(
                'grid min-h-[240px] origin-top gap-x-8 gap-y-3 p-[clamp(24px,3.5vw,44px)] md:grid-cols-[220px_minmax(0,1fr)]',
                faces[i % faces.length],
              )}
            >
              <span className="font-mono text-[14px]">{item.dates}</span>
              <div>
                <h3 className="font-black text-[clamp(28px,3.4vw,44px)] leading-none tracking-[-0.035em]">
                  {item.role}
                </h3>
                <p className="mt-3.5 max-w-[52ch] text-[19px] leading-[1.45]">{item.summary}</p>
              </div>
            </div>
          </li>
        ))}
      </ExperienceDeck>

      <a
        href={site.paper.url}
        className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-2 border-rule border-y py-[22px] no-underline"
      >
        <span className="flex-[1_1_200px] font-mono text-[14px] text-muted">
          {experience.publicationLabel}
        </span>
        <span className="min-w-0 flex-[4_1_640px]">
          <span className="mr-2.5 inline-block bg-accent px-2 py-[3px] align-[3px] font-mono text-[12px] text-on-accent">
            IEEE Xplore
          </span>
          <span className="font-bold text-[20px] leading-[1.3]">{site.paper.title}</span>
        </span>
        <span aria-hidden="true" className="flex-[0_0_24px] text-[24px]">
          ↗
        </span>
      </a>

      <p className="mt-5 font-mono text-[14px] text-muted">{experience.languages}</p>
    </section>
  );
}
