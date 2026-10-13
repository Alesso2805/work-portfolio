import type { ReactNode } from 'react';
import { archivo, plexMono } from '@/lib/fonts';
import { headCleanupScript } from '@/lib/head-cleanup';
import { themeInitScript } from '@/lib/theme';
import '@/app/globals.css';

/** The <html> shell shared by every root layout (each locale, and the `/` redirect). */
export function RootDocument({
  lang,
  headScript,
  children,
}: {
  lang: string;
  /** Extra inline script that must run before first paint. */
  headScript?: string;
  children: ReactNode;
}) {
  return (
    // data-theme is set by themeInitScript before hydration, hence the warning suppression.
    <html
      lang={lang}
      className={`${archivo.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      {/* biome-ignore lint/style/noHeadElement: App Router root layouts render <head> directly; next/head is Pages Router only */}
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, first-party script; must run before hydration */}
        <script dangerouslySetInnerHTML={{ __html: headCleanupScript }} />
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, first-party anti-flash script */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {headScript && (
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static, first-party script from src/lib
          <script dangerouslySetInnerHTML={{ __html: headScript }} />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
