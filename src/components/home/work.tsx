import { langLabels, projects } from '@/content/projects';
import type { Dictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { toRowData } from '@/lib/projects';
import { ProjectExplorer } from './project-explorer';

export function Work({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="work" className="py-[clamp(48px,6vw,80px)]">
      <ProjectExplorer
        heading={<h2 className="text-section">{dict.work.title}</h2>}
        projects={projects.map((project) => toRowData(project, locale))}
        labels={{
          group: dict.work.filterLabel,
          filters: { all: dict.work.all, ...langLabels },
          practices: dict.work.practices,
          toolsFor: dict.work.toolsFor,
          thesisTag: dict.work.thesisTag,
        }}
      />
    </section>
  );
}
