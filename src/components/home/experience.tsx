import { site } from '@/config/site';
import type { Dictionary } from '@/i18n';

export function Experience({ dict }: { dict: Dictionary }) {
  const { experience } = dict;

  return (
    <section id="experience" className="pb-[clamp(48px,6vw,80px)]">
      <h2 className="mb-7 text-section">{experience.title}</h2>
      <ul className="border-rule border-t-2">
        {experience.items.map((item) => (
          <li
            key={item.dates}
            className="flex flex-wrap gap-x-8 gap-y-2 border-rule border-b py-[22px]"
          >
            <span className="flex-[1_1_200px] font-mono text-[14px] text-muted">{item.dates}</span>
            <span className="flex-[2_1_320px] font-bold text-[22px]">{item.role}</span>
            <span className="flex-[2_1_320px] text-soft">{item.summary}</span>
          </li>
        ))}
      </ul>

      <a
        href={site.paper.url}
        className="flex flex-wrap items-baseline gap-x-8 gap-y-2 border-rule border-b py-[22px] no-underline"
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
