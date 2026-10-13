import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Container } from '@/components/container';
import { RootDocument } from '@/components/root-document';
import { SiteFooter } from '@/components/site-footer';
import { SkipLink } from '@/components/skip-link';
import { site } from '@/config/site';
import { getDictionary } from '@/i18n';
import { isLocale, locales } from '@/i18n/config';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'Alessandro David — Portfolio',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <RootDocument lang={locale}>
      <SkipLink label={dict.skipLink} />
      <Container>
        {children}
        <SiteFooter dict={dict} />
      </Container>
    </RootDocument>
  );
}
