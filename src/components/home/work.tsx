import { langLabels, projects } from '@/content/projects';
import type { Dictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { projectCover } from '@/lib/project-cover';
import { spotlightProjects, toRowData } from '@/lib/projects';
import { ProjectExplorer } from './project-explorer';
import { ProjectRail } from './project-rail';

/** The spotlight projects on the rail, then every project in a compact list with the language filter. */
export function Work({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="work" className="py-[clamp(48px,6vw,80px)]">
      <h2 className="mb-7 text-section">{dict.work.title}</h2>
      <ProjectRail
        projects={spotlightProjects(projects).map((project) => ({
          ...toRowData(project, locale),
          cover: projectCover(project, locale),
        }))}
        labels={{ thesisTag: dict.work.thesisTag, open: dict.work.open, hint: dict.work.railHint }}
      />

      <div className="mt-[clamp(56px,7vw,96px)]">
        <ProjectExplorer
          heading={
            <h3 className="font-black text-[clamp(28px,3vw,40px)] leading-none tracking-[-0.035em]">
              {dict.work.allProjects}
            </h3>
          }
          projects={projects.map((project) => toRowData(project, locale))}
          labels={{
            group: dict.work.filterLabel,
            filters: { all: dict.work.all, ...langLabels },
            practices: dict.work.practices,
            toolsFor: dict.work.toolsFor,
            thesisTag: dict.work.thesisTag,
          }}
        />
      </div>
    </section>
  );
}
