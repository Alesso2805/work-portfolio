import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { RootDocument } from '@/components/root-document';
import { site } from '@/config/site';
import { localeRedirectScript } from '@/lib/locale-redirect';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'Alessandro David — Portfolio',
  alternates: {
    languages: { en: '/en', es: '/es', 'x-default': '/' },
  },
};

/** Root layout for `/` only: redirects to the visitor's language before first paint. */
export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <RootDocument lang="en" headScript={localeRedirectScript}>
      {children}
    </RootDocument>
  );
}
