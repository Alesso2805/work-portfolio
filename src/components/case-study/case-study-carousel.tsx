'use client';

import { type PointerEvent, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { MediaFigure, type MediaSlide } from './case-study-media';

const buttonClass =
  'inline-flex min-h-[52px] min-w-[52px] items-center justify-center border-2 border-rule font-semibold disabled:cursor-default disabled:opacity-40';

/** A horizontal swipe longer than this, in px, moves one screen. */
const SWIPE = 40;

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Several screens, one at a time, with previous/next buttons and touch swipes; it never moves by itself.
 * Prerendered as a strip that scrolls sideways, so without JS every screen is still reachable.
 */
export function CaseStudyCarousel({
  slides,
  labels,
}: {
  slides: MediaSlide[];
  labels: { label: string; previous: string; next: string; of: string };
}) {
  const track = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const count = slides.length;

  useEffect(() => setReady(true), []);

  function go(next: number) {
    const slide = slides[next];
    if (!slide) return;
    setIndex(next);
    setAnnouncement(`${slide.caption?.title ?? slide.alt}, ${next + 1} ${labels.of} ${count}`);
    // `scroll-smooth` glides there, and the reduced-motion rule in globals.css turns that off.
    track.current?.scrollTo({ left: next * track.current.clientWidth });
  }

  function onPointerUp(event: PointerEvent) {
    if (event.pointerType !== 'touch' || swipeStart.current === null) return;
    const distance = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(distance) > SWIPE) go(index + (distance < 0 ? 1 : -1));
  }

  return (
    <section aria-roledescription="carousel" aria-label={labels.label} className="mt-12">
      {/* Invisible until hydrated (the buttons need JS), but always taking its space, so nothing shifts. */}
      <div className={cn('mb-4 flex items-center justify-between gap-4', !ready && 'invisible')}>
        <p aria-hidden="true" className="font-mono text-[14px] text-muted">
          {pad(index + 1)} / {pad(count)}
        </p>
        <div className="flex gap-2.5">
          <button
            type="button"
            className={buttonClass}
            aria-label={labels.previous}
            disabled={index === 0}
            onClick={() => go(index - 1)}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className={buttonClass}
            aria-label={labels.next}
            disabled={index === count - 1}
            onClick={() => go(index + 1)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <p aria-live="polite" className="sr-only">
          {announcement}
        </p>
      </div>
      {/* Scrolls by hand only before JS; after it, the buttons and swipes move it, so it is not a scroll region. */}
      <div
        ref={track}
        className={cn(
          'flex touch-pan-y snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          ready ? 'overflow-x-hidden' : 'overflow-x-auto',
        )}
        onPointerDown={(event) => {
          swipeStart.current = event.clientX;
        }}
        onPointerUp={onPointerUp}
      >
        {slides.map((slide, i) => (
          <MediaFigure
            key={slide.src}
            slide={slide}
            className="w-full shrink-0 snap-start"
            roleDescription="slide"
            label={`${i + 1} ${labels.of} ${count}`}
          />
        ))}
      </div>
    </section>
  );
}
