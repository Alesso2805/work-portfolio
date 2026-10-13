import type { Dictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { LanguageSwitch } from './language-switch';
import { ThemeToggle } from './theme-toggle';

/** Home navigation: name on the left; section links, EN|ES and theme on the right. */
export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links = [
    { href: '#work', label: dict.nav.work },
    { href: '#experience', label: dict.nav.experience },
    { href: '#contact', label: dict.nav.contact },
  ];

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-rule border-b-2 py-[22px]">
      <a href="#top" className="font-extrabold text-[18px] tracking-[-0.01em] no-underline">
        Alessandro David
      </a>
      <nav
        aria-label={dict.nav.label}
        className="flex flex-wrap items-center gap-x-7 gap-y-1 font-mono text-[14px]"
      >
        {links.map((link) => (
          <a key={link.href} href={link.href} className="py-2.5 no-underline">
            {link.label}
          </a>
        ))}
        <div className="inline-flex gap-2">
          <LanguageSwitch locale={locale} label={dict.nav.languageGroup} />
          <ThemeToggle labels={dict.theme} />
        </div>
      </nav>
    </header>
  );
}
