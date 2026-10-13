import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { archivo, plexMono } from '@/lib/fonts';
import { themeInitScript } from '@/lib/theme';
import './globals.css';

export const metadata: Metadata = {
  title: 'Alessandro David — Portfolio',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // data-theme is set by themeInitScript before hydration, hence the warning suppression.
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, first-party anti-flash script */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
