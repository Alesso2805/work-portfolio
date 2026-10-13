import type { ProjectRowData } from '@/lib/projects';

const rowClass =
  'flex flex-wrap items-baseline gap-x-8 gap-y-3 border-rule border-b py-7 no-underline';

/** One project in the Work list. A link only when the project has somewhere to go. */
export function ProjectRow({ project, thesisTag }: { project: ProjectRowData; thesisTag: string }) {
  const content = (
    <>
      <span className="flex-[0_0_56px] font-mono text-[14px] text-muted">{project.number}</span>
      <span className="flex-[1_1_260px] text-project">
        {project.name}
        {project.featured && (
          <>
            {' '}
            <span className="ml-2 inline-block bg-accent px-2 py-[3px] align-middle font-medium font-mono text-[12px] text-on-accent tracking-normal">
              {thesisTag}
            </span>
          </>
        )}
      </span>
      <span className="flex-[2_1_360px] text-soft">{project.description}</span>
      <span className="flex-[1_1_200px] font-mono text-[13px] text-muted">
        {project.languagesLabel}
      </span>
      <span aria-hidden="true" className="flex-[0_0_24px] text-[24px]">
        {project.href ? '→' : ''}
      </span>
    </>
  );

  return project.href ? (
    <a href={project.href} className={rowClass}>
      {content}
    </a>
  ) : (
    <div className={rowClass}>{content}</div>
  );
}
