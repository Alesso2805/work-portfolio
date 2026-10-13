import type { Dictionary } from '@/i18n';
import { type Locale, localePath } from '@/i18n/config';
import { LanguageSwitch } from '../language-switch';
import { ThemeToggle } from '../theme-toggle';

/** Case study navigation: back to the work list on the left; name, EN|ES and theme on the right. */
export function CaseStudyHeader({
  locale,
  subpath,
  dict,
}: {
  locale: Locale;
  subpath: string;
  dict: Dictionary;
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-rule border-b-2 py-[22px]">
      <a
        href={`${localePath(locale)}#work`}
        className="inline-flex min-h-11 items-center font-mono text-[14px] no-underline"
      >
        {dict.caseStudy.back}
      </a>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="font-extrabold text-[18px] tracking-[-0.01em]">Alessandro David</span>
        <div className="inline-flex gap-2 font-mono text-[14px]">
          <LanguageSwitch locale={locale} subpath={subpath} label={dict.nav.languageGroup} />
          <ThemeToggle labels={dict.theme} />
        </div>
      </div>
    </header>
  );
}
