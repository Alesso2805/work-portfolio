'use client';

import { type PointerEvent, type TransitionEvent, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { cn } from '@/lib/cn';
import { MediaFigure, type MediaSlide } from './case-study-media';

const buttonClass =
  'inline-flex min-h-[52px] min-w-[52px] items-center justify-center border-2 border-rule font-semibold';

/** A drag shorter than this, in px or as a share of the width, springs back instead of moving. */
const DRAG_MIN_PX = 40;
const DRAG_MIN_SHARE = 0.15;
/** If the glide's transitionend never comes (a hidden tab), the loop settles after this. */
const GLIDE_MS = 500;

const pad = (n: number) => String(n).padStart(2, '0');

/** Under reduced motion there is no glide, so the loop jumps straight to the screen. */
function noGlide(): boolean {
  return (
    typeof window.matchMedia !== 'function' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Several screens, one at a time, that loop: after the last comes the first, and before the first the last.
 * Moved by the buttons, or by dragging with a mouse, a finger or a pen; it never moves by itself.
 * Prerendered as a strip that scrolls sideways, so without JS every screen is still reachable.
 */
export function CaseStudyCarousel({
  slides,
  labels,
}: {
  slides: MediaSlide[];
  labels: { label: string; previous: string; next: string; of: string };
}) {
  const count = slides.length;
  const track = useRef<HTMLDivElement>(null);
  // Place on the looped track: 0 is a copy of the last screen, 1..count the screens, count + 1 a copy of the first.
  const [place, setPlaceState] = useState(1);
  const placeRef = useRef(1);
  const [glide, setGlide] = useState(true);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ pointer: number; startX: number } | null>(null);
  const moving = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [ready, setReady] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const index = (place - 1 + count) % count;

  function setPlace(next: number) {
    placeRef.current = next;
    setPlaceState(next);
  }

  useEffect(() => setReady(true), []);
  useEffect(() => () => clearTimeout(settleTimer.current), []);

  // Ends a glide. After gliding onto a copy, it jumps to the screen the copy shows: that is what makes the loop
  // endless. The two look the same, so the jump is drawn at once, without the glide, before anything else moves.
  function settle() {
    clearTimeout(settleTimer.current);
    moving.current = false;
    const at = placeRef.current;
    if (at !== 0 && at !== count + 1) return;
    flushSync(() => {
      setGlide(false);
      setPlace(at === 0 ? count : 1);
    });
    track.current?.getBoundingClientRect();
  }

  // A click or a drag in the middle of a glide ends it first, so input is never ignored.
  function go(step: 1 | -1) {
    if (moving.current) settle();
    const next = (index + step + count) % count;
    const slide = slides[next];
    if (!slide) return;
    setAnnouncement(`${slide.caption?.title ?? slide.alt}, ${next + 1} ${labels.of} ${count}`);
    setDragX(0);
    if (noGlide()) {
      setGlide(false);
      setPlace(next + 1);
      return;
    }
    moving.current = true;
    setGlide(true);
    setPlace(placeRef.current + step);
    settleTimer.current = setTimeout(settle, GLIDE_MS + 300);
  }

  function onTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.target === track.current && event.propertyName === 'transform') settle();
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (moving.current) settle();
    drag.current = { pointer: event.pointerId, startX: event.clientX };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointer !== event.pointerId) return;
    setDragX(event.clientX - drag.current.startX);
  }

  function onPointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointer !== event.pointerId) return;
    const distance = event.type === 'pointercancel' ? 0 : event.clientX - drag.current.startX;
    drag.current = null;
    setDragging(false);
    const width = track.current?.clientWidth ?? 0;
    if (Math.abs(distance) > Math.max(DRAG_MIN_PX, width * DRAG_MIN_SHARE))
      go(distance < 0 ? 1 : -1);
    else {
      setGlide(true);
      setDragX(0);
    }
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
            onClick={() => go(-1)}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className={buttonClass}
            aria-label={labels.next}
            onClick={() => go(1)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <p aria-live="polite" className="sr-only">
          {announcement}
        </p>
      </div>
      {/* Before JS, a strip that scrolls sideways. After it, a track the buttons and drags move. */}
      <div
        className={
          ready
            ? 'overflow-hidden'
            : 'snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        }
      >
        <div
          ref={track}
          className={cn(
            'flex',
            ready && 'cursor-grab touch-pan-y select-none',
            dragging && 'cursor-grabbing',
            ready && glide && !dragging && 'transition-transform duration-500 ease-out',
          )}
          style={
            ready ? { transform: `translateX(calc(${-place * 100}% + ${dragX}px))` } : undefined
          }
          onTransitionEnd={onTransitionEnd}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
        >
          {ready && <LoopCopy slide={slides[count - 1]} />}
          {slides.map((slide, i) => (
            <MediaFigure
              key={slide.src}
              slide={slide}
              className="w-full shrink-0 snap-start"
              roleDescription="slide"
              label={`${i + 1} ${labels.of} ${count}`}
            />
          ))}
          {ready && <LoopCopy slide={slides[0]} />}
        </div>
      </div>
    </section>
  );
}

/** The copy at either end of the loop: seen while gliding past it, hidden from screen readers and focus. */
function LoopCopy({ slide }: { slide: MediaSlide | undefined }) {
  if (!slide) return null;
  return (
    <div aria-hidden="true" inert className="w-full shrink-0">
      <MediaFigure slide={slide} />
    </div>
  );
}
