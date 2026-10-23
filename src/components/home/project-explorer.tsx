'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { toolbelt } from '@/content/projects';
import { cn } from '@/lib/cn';
import { canAnimate, ScrollTrigger } from '@/lib/gsap';
import {
  countByStack,
  filterProjects,
  type ProjectRowData,
  parseStack,
  type StackFilter,
  stackFilters,
} from '@/lib/projects';
import { ProjectRow } from './project-row';

const STACK_PARAM = 'stack';

function readStackFromUrl(): StackFilter {
  return parseStack(new URLSearchParams(window.location.search).get(STACK_PARAM));
}

function writeStackToUrl(filter: StackFilter) {
  const url = new URL(window.location.href);
  if (filter === 'all') url.searchParams.delete(STACK_PARAM);
  else url.searchParams.set(STACK_PARAM, filter);
  window.history.replaceState(window.history.state, '', url);
}

/**
 * The home page's stateful component: language filter, toolbelt line and the list of every project.
 * The filter lives in `?stack=` so a filtered view can be shared. Prerendered as "All".
 */
export function ProjectExplorer({
  heading,
  projects,
  labels,
}: {
  heading: ReactNode;
  projects: ProjectRowData[];
  labels: {
    group: string;
    filters: Record<StackFilter, string>;
    practices: string;
    toolsFor: string;
    thesisTag: string;
  };
}) {
  const [filter, setFilter] = useState<StackFilter>('all');

  useEffect(() => {
    const sync = () => setFilter(readStackFromUrl());
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  // The list's height changes with the filter, and the experience deck below pins at measured positions.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs after each filter change; it reads the layout, not the value
  useEffect(() => {
    if (canAnimate()) ScrollTrigger.refresh();
  }, [filter]);

  const select = (next: StackFilter) => {
    setFilter(next);
    writeStackToUrl(next);
  };

  const counts = countByStack(projects);
  const visible = filterProjects(projects, filter);
  const toolbeltLabel =
    filter === 'all' ? labels.practices : `${labels.toolsFor} · ${labels.filters[filter]}`;

  return (
    <>
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-4">
        {heading}
        {/* biome-ignore lint/a11y/useSemanticElements: a toggle-button group; <fieldset> would need a visible legend the design does not have */}
        <div
          role="group"
          aria-label={labels.group}
          className="flex flex-wrap gap-1.5 font-mono text-[13px]"
        >
          {stackFilters.map((id) => {
            const pressed = id === filter;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={pressed}
                onClick={() => select(id)}
                className={cn(
                  'min-h-11 border-2 border-rule px-4',
                  pressed ? 'bg-ink text-bg' : 'bg-bg text-ink',
                )}
              >
                {labels.filters[id]} {counts[id]}
              </button>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" className="mb-7 font-mono text-[13px] text-muted">
        {toolbeltLabel} — {toolbelt[filter]}
      </p>

      <ul className="border-rule border-t-2">
        {visible.map((project) => (
          <li key={project.slug}>
            <ProjectRow project={project} thesisTag={labels.thesisTag} />
          </li>
        ))}
      </ul>
    </>
  );
}
