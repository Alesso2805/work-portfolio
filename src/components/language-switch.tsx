import { type Locale, localeNames, localePath, locales } from '@/i18n/config';
import { cn } from '@/lib/cn';

/**
 * EN|ES switch. Plain links (no JS) to the same page in each language;
 * the current one is marked with aria-current.
 */
export function LanguageSwitch({
  locale,
  subpath = '',
  label,
}: {
  locale: Locale;
  /** Path after the locale segment, e.g. '/projects/genairator'. */
  subpath?: string;
  label: string;
}) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: these are links, not form controls, so <fieldset> does not apply
    <div role="group" aria-label={label} className="inline-flex border-2 border-rule">
      {locales.map((code) => {
        const current = code === locale;
        return (
          <a
            key={code}
            href={localePath(code, subpath)}
            lang={code}
            hrefLang={code}
            aria-current={current ? 'page' : undefined}
            className={cn(
              'inline-flex min-h-10 min-w-11 items-center justify-center px-2.5 no-underline',
              current ? 'bg-ink text-bg' : 'bg-bg text-ink',
            )}
          >
            {code.toUpperCase()}
            {/* Name reads "EN English": starts with the visible label (WCAG 2.5.3). */}
            <span className="sr-only"> {localeNames[code]}</span>
          </a>
        );
      })}
    </div>
  );
}
