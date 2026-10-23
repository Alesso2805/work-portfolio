'use client';

import { useRef } from 'react';
import { canAnimate, Draggable, gsap, useGSAP } from '@/lib/gsap';
import type { ProjectRowData } from '@/lib/projects';
import { ProjectPanel } from './project-panel';

/** The rail's screens. The same pair sizes the horizontal strip in CSS (`lg:motion-safe:`). */
const RAIL_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';
const FINE_POINTER = '(hover: hover) and (pointer: fine)';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * The spotlight projects, one panel each. There are at most `spotlightLimit`, so the pinned scroll stays
 * the same length however many projects there are; the list below has them all.
 * On wide screens the panels are prerendered as a strip that scrolls sideways, so every panel is reachable
 * without JS. Once hydrated, the rail pins and the page's own scroll moves the panels sideways;
 * a mouse can also drag them, which scrolls the page, so both stay one position.
 * On phones, tablets and under reduced motion the panels are a plain vertical list.
 */
export function ProjectRail({
  projects,
  labels,
}: {
  projects: ProjectRowData[];
  labels: { thesisTag: string; open: string; hint: string };
}) {
  const root = useRef<HTMLDivElement>(null);
  const count = Math.max(projects.length, 1);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope || !canAnimate()) return;

      const mm = gsap.matchMedia();
      mm.add({ rail: RAIL_QUERY, fine: FINE_POINTER }, (context) => {
        const { rail, fine } = context.conditions as { rail: boolean; fine: boolean };
        const viewport = scope.querySelector<HTMLElement>('[data-rail-viewport]');
        const track = scope.querySelector<HTMLElement>('[data-rail-track]');
        const current = scope.querySelector<HTMLElement>('[data-rail-current]');
        const bar = scope.querySelector<HTMLElement>('[data-rail-bar]');
        if (!rail || !viewport || !track || !current || !bar) return;
        const panels = gsap.utils.toArray<HTMLElement>('[data-rail-panel]', scope);
        const distance = () => track.scrollWidth - viewport.clientWidth;
        // Panels that already fit (one or two spotlight projects) have nothing to move: no rail.
        if (distance() <= 0) return;

        scope.dataset.rail = 'on';
        viewport.scrollLeft = 0;
        gsap.set(viewport, { overflow: 'hidden', scrollSnapType: 'none' });

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: scope,
            start: 'center center',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            // Refreshes before the experience deck below, whose positions include this pin's length.
            refreshPriority: 1,
            onUpdate: ({ progress }) => {
              current.textContent = pad(Math.min(count, Math.floor(progress * count) + 1));
              gsap.set(bar, { scaleX: (1 + progress * (count - 1)) / count });
            },
          },
        });

        // Each panel reacts to its own place in the rail, through the rail's tween. Title and figure start
        // as soon as the panel enters, so a half-counted figure ("0/9") is never left on screen.
        for (const panel of panels) {
          const at = (start: string) => ({ trigger: panel, containerAnimation: slide, start });
          const title = panel.querySelector('[data-rail-title]');
          const figure = panel.querySelector('[data-rail-count]');
          const shot = panel.querySelector('[data-rail-shot]');
          if (title) {
            gsap.from(title, {
              yPercent: 105,
              duration: 0.9,
              ease: 'expo.out',
              scrollTrigger: { ...at('left 88%'), toggleActions: 'play none none reverse' },
            });
          }
          if (figure) {
            gsap.from(figure, {
              textContent: 0,
              snap: { textContent: 1 },
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: at('left 88%'),
            });
          }
          if (shot) {
            gsap.fromTo(
              shot,
              { xPercent: -5 },
              {
                xPercent: 5,
                ease: 'none',
                scrollTrigger: { ...at('left right'), end: 'right left', scrub: true },
              },
            );
          }
        }

        const range = slide.scrollTrigger;

        // Keyboard: focus inside a panel scrolls the page to that panel. Left alone, the browser would
        // scroll the clipped viewport itself, and the rail would show the wrong place.
        const onFocus = (event: FocusEvent) => {
          viewport.scrollLeft = 0;
          const panel = panels.find((p) => p.contains(event.target as Node));
          if (!range || !panel) return;
          const left = panel.getBoundingClientRect().left - track.getBoundingClientRect().left;
          window.scrollTo({ top: range.start + Math.min(left, distance()), behavior: 'instant' });
        };
        viewport.addEventListener('focusin', onFocus);

        // Mouse: the drag moves an invisible proxy; its distance becomes page scroll inside the rail's range.
        let drag: Draggable | undefined;
        if (fine) {
          const proxy = document.createElement('div');
          let startY = 0;
          const follow = function (this: Draggable) {
            if (!range) return;
            const top = gsap.utils.clamp(range.start, range.end, startY - this.x);
            window.scrollTo({ top, behavior: 'instant' }); // the page's smooth scroll would lag behind the pointer
          };
          [drag] = Draggable.create(proxy, {
            type: 'x',
            trigger: viewport,
            inertia: true,
            cursor: 'grab',
            activeCursor: 'grabbing',
            onPress(this: Draggable) {
              startY = window.scrollY;
              gsap.set(proxy, { x: 0 });
              this.update();
            },
            onDrag: follow,
            onThrowUpdate: follow,
          });
        }

        return () => {
          viewport.removeEventListener('focusin', onFocus);
          drag?.kill();
          viewport.style.cursor = '';
          delete scope.dataset.rail;
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="group/rail">
      {/* Rail mode only: invisible until the rail is on, but keeping its space so nothing shifts. */}
      <div
        aria-hidden="true"
        className="invisible mb-5 hidden items-center justify-between gap-4 font-mono text-[13px] text-muted group-data-[rail=on]/rail:visible lg:motion-safe:flex"
      >
        <span>{labels.hint}</span>
        <span className="flex items-center gap-3.5 tabular-nums">
          <span>
            <span data-rail-current>01</span> / {pad(count)}
          </span>
          <span className="h-0.5 w-40 bg-surface">
            <span
              data-rail-bar
              className="block h-full origin-left bg-accent"
              style={{ transform: `scaleX(${1 / count})` }}
            />
          </span>
        </span>
      </div>

      <div
        data-rail-viewport
        className="lg:motion-safe:snap-x lg:motion-safe:snap-mandatory lg:motion-safe:overflow-x-auto"
      >
        <ul
          data-rail-track
          className="flex flex-col gap-5 lg:motion-safe:w-max lg:motion-safe:flex-row"
        >
          {projects.map((project) => (
            <li
              key={project.slug}
              className="lg:motion-safe:min-h-[min(560px,68vh)] lg:motion-safe:w-[min(980px,80vw)] lg:motion-safe:shrink-0 lg:motion-safe:snap-start"
            >
              <ProjectPanel project={project} labels={labels} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
