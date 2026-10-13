import { site } from '@/config/site';
import type { Locale } from '@/i18n/config';

/**
 * "CV ↓" opens a list of every CV. A native <details> disclosure: keyboard
 * accessible and works without JavaScript. Styled like the secondary CTA.
 */
export function CvMenu({ locale }: { locale: Locale }) {
  return (
    <details className="relative">
      <summary className="inline-flex min-h-[52px] cursor-pointer list-none items-center border-2 border-rule px-6 font-semibold hover:text-hover [&::-webkit-details-marker]:hidden">
        CV ↓
      </summary>
      <ul className="absolute top-full right-0 z-10 mt-2.5 w-max border-2 border-rule bg-bg">
        {site.cvs.map((cv) => (
          <li key={cv.href} className="border-rule border-b last:border-b-0">
            <a
              href={cv.href}
              hrefLang={cv.lang}
              download
              className="flex min-h-11 items-center justify-between gap-6 px-4 py-2.5 font-semibold no-underline"
            >
              {cv.label[locale]}
              <span className="font-mono font-normal text-[13px] text-muted">
                {cv.lang.toUpperCase()}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
