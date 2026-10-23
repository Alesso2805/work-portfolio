import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Every animation runs inside `gsap.matchMedia()` under this query, so reduced motion turns it off
 * and the prerendered HTML stays the final state. The CSS rule in globals.css only covers CSS motion.
 */
export const motionQuery = '(prefers-reduced-motion: no-preference)';

/** The server, jsdom (the tests) and very old browsers have no matchMedia: nothing animates there. */
export function canAnimate(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function';
}

// Registered once, for every animated component. ScrollTrigger reads matchMedia as it registers.
if (canAnimate()) gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable, InertiaPlugin);

export { Draggable, gsap, ScrollTrigger, useGSAP };
