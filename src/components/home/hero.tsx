import type { CSSProperties } from 'react';
import { ButtonLink } from '@/components/button-link';
import type { Dictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { cn } from '@/lib/cn';
import { CvMenu } from './cv-menu';

/**
 * The entrance follows the D1 prototype's timeline: letters, then the line under them, the buttons,
 * the stats wiping up and their figures counting. Each piece starts this many ms after the first paint.
 */
const at = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/** One line of the name. Each letter rises out of the line's clip, 28 ms after the one before it. */
function NameLine({ word, from }: { word: string; from: number }) {
  const letters = Array.from(word, (char, i) => ({ char, n: from + i }));
  return (
    // The padding keeps ascenders and descenders inside the clip.
    <span className="-my-[0.1em] block overflow-hidden py-[0.1em]">
      {letters.map(({ char, n }) => (
        <span key={n} className="inline-block motion-safe:animate-rise" style={at(100 + n * 28)}>
          {char}
        </span>
      ))}
    </span>
  );
}

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const stats = [
    { value: 97, suffix: '%', label: dict.stats.coverage },
    { value: 20, suffix: '+', label: dict.stats.endpoints },
    { value: 40, suffix: '%', label: dict.stats.faster },
  ];

  return (
    <section
      id="top"
      className="border-rule border-b-2 pt-[clamp(48px,7vw,96px)] pb-[clamp(48px,6vw,80px)]"
    >
      <p className="mb-7 font-mono text-[14px] text-muted motion-safe:animate-fade-up">
        {dict.hero.kicker}
      </p>
      <h1 className="text-display">
        {/* Screen readers get the name whole; the letters below are split for the entrance. */}
        <span className="sr-only">Alessandro David</span>
        <span aria-hidden="true">
          <NameLine word="Alessandro" from={0} />
          <NameLine word="David" from={10} />
        </span>
      </h1>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
        <div className="flex max-w-[560px] flex-[1_1_340px] flex-col gap-7">
          <div className="overflow-hidden">
            <p
              className="font-medium text-[22px] leading-[1.35] motion-safe:animate-rise motion-safe:[animation-duration:0.9s]"
              style={at(840)}
            >
              {dict.hero.sub}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <ButtonLink
              variant="primary"
              href="#work"
              className="motion-safe:animate-fade-up"
              style={at(1040)}
            >
              {dict.hero.ctaWork}
            </ButtonLink>
            <div className="motion-safe:animate-fade-up" style={at(1120)}>
              <CvMenu locale={locale} />
            </div>
          </div>
        </div>

        <div>
          <p
            id="stats-label"
            className="mb-3 font-mono text-[13px] text-muted motion-safe:animate-fade-up"
            style={at(350)}
          >
            {dict.stats.at}
          </p>
          <ul aria-labelledby="stats-label" className="flex flex-wrap gap-2">
            {stats.map((stat, i) => (
              <li
                key={stat.label}
                className={cn(
                  'px-4 py-3 text-[15px] motion-safe:animate-wipe-up',
                  i === 0 ? 'bg-accent text-on-accent' : 'bg-surface',
                )}
                style={at(350 + i * 80)}
              >
                <b className="font-black tabular-nums">
                  <span className="sr-only">{stat.value}</span>
                  {/* Drawn by a CSS counter (count-up in globals.css). Its width is fixed, so counting never moves the chips. */}
                  <span
                    aria-hidden="true"
                    className="count-up inline-block text-right motion-safe:animate-count"
                    style={
                      {
                        '--count': stat.value,
                        width: `${String(stat.value).length}ch`,
                        ...at(900 + i * 120),
                      } as CSSProperties
                    }
                  />
                  {stat.suffix}
                </b>{' '}
                {stat.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
