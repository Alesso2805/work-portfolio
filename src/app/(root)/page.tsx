import { Container } from '@/components/container';
import { localeNames, localePath, locales } from '@/i18n/config';

/** Shown only when JS is off (otherwise the head script has already redirected). */
export default function LanguagePicker() {
  return (
    <Container>
      <main id="main" className="py-[clamp(48px,7vw,96px)]">
        <p className="m-0 font-extrabold text-[18px] tracking-[-0.01em]">Alessandro David</p>
        <ul className="mt-6 flex list-none flex-wrap gap-x-7 gap-y-1 p-0 font-mono text-[14px]">
          {locales.map((code) => (
            <li key={code}>
              <a
                href={localePath(code)}
                lang={code}
                hrefLang={code}
                className="inline-block py-2.5"
              >
                {localeNames[code]}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </Container>
  );
}
