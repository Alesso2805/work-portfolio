import type { Dictionary } from '@/i18n';

export function Work({ dict }: { dict: Dictionary }) {
  return (
    <section id="work" className="py-[clamp(48px,6vw,80px)]">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="text-section">{dict.work.title}</h2>
        {/* Phase 4: language filter, toolbelt line and project rows. */}
      </div>
    </section>
  );
}
