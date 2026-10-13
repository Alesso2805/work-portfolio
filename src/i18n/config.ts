export const locales = ['en', 'es'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Each language named in itself, as shown to screen readers in the EN|ES switch. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** `localePath('es', '/projects/genairator')` → `/es/projects/genairator` */
export function localePath(locale: Locale, subpath = ''): string {
  return `/${locale}${subpath}`;
}
