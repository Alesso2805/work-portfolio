'use client';

import { type ReactNode, useRef } from 'react';
import { canAnimate, gsap, motionQuery, ScrollTrigger, useGSAP } from '@/lib/gsap';

/** Where each card pins: near the top, one step lower per card, so the edges of the covered ones still show. */
const offset = (i: number) => 24 + i * 18;

/**
 * The experience cards. Scrolling pins each card near the top while the next one slides over it,
 * and the covered card settles back a little. Prerendered, and under reduced motion kept, as a plain list.
 */
export function ExperienceDeck({ children }: { children: ReactNode }) {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const list = root.current;
      if (!list || !canAnimate()) return;

      const mm = gsap.matchMedia();
      mm.add(motionQuery, () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-deck-card]', list);
        const last = cards.at(-1);
        if (!last) return;

        cards.forEach((card, i) => {
          gsap.set(card, { zIndex: i + 1 }); // each card slides over the ones pinned before it
          const next = cards[i + 1];
          if (!next) return;
          ScrollTrigger.create({
            trigger: card,
            start: () => `top top+=${offset(i)}`,
            endTrigger: last,
            end: () => `top top+=${offset(cards.length - 1)}`,
            pin: true,
            pinSpacing: false,
          });
          gsap.to(card.querySelector('[data-deck-face]'), {
            scale: 0.92,
            ease: 'none',
            scrollTrigger: {
              trigger: next,
              start: 'top bottom',
              end: () => `top top+=${offset(i + 1)}`,
              scrub: true,
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <ol ref={root} className="flex flex-col gap-5">
      {children}
    </ol>
  );
}
