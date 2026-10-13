import { ButtonLink } from '@/components/button-link';
import { site } from '@/config/site';
import type { Dictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section
      id="top"
      className="flex flex-wrap gap-8 border-rule border-b-2 pt-[clamp(48px,7vw,96px)] pb-[clamp(48px,6vw,80px)]"
    >
      <div className="min-w-0 flex-[999_1_640px]">
        <p className="mb-7 font-mono text-[14px] text-muted">{dict.hero.kicker}</p>
        <h1 className="text-display">
          <span className="block">Alessandro</span>
          <span className="block">David</span>
        </h1>
        <div className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-6">
          <p className="max-w-[520px] flex-[1_1_340px] font-medium text-[22px] leading-[1.35]">
            {dict.hero.sub}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <ButtonLink variant="primary" href="#work">
              {dict.hero.ctaWork}
            </ButtonLink>
            <ButtonLink variant="secondary" href={site.cv[locale]} download>
              CV ↓
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-[1_1_300px] flex-col justify-end">
        <div className="flex flex-col gap-5 bg-accent p-7 text-on-accent">
          <span className="font-mono text-[13px]">{dict.stats.at}</span>
          <div>
            <div className="font-black text-[88px] leading-[0.9] tracking-[-0.04em]">97%</div>
            <div className="font-semibold">{dict.stats.coverage}</div>
          </div>
          <div className="flex gap-7 border-on-accent border-t-2 pt-4">
            <div>
              <div className="font-extrabold text-[32px] leading-none">20+</div>
              <div className="text-[14px]">{dict.stats.endpoints}</div>
            </div>
            <div>
              <div className="font-extrabold text-[32px] leading-none">40%</div>
              <div className="text-[14px]">{dict.stats.faster}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
