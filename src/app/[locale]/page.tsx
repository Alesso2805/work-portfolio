import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Contact } from '@/components/home/contact';
import { Experience } from '@/components/home/experience';
import { Hero } from '@/components/home/hero';
import { Work } from '@/components/home/work';
import { JsonLd } from '@/components/json-ld';
import { SiteHeader } from '@/components/site-header';
import { getDictionary } from '@/i18n';
import { isLocale } from '@/i18n/config';
import { pageMetadata } from '@/lib/metadata';
import { paperJsonLd, personJsonLd } from '@/lib/structured-data';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    title: 'Alessandro David — Portfolio',
    description: getDictionary(locale).hero.sub,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <JsonLd data={personJsonLd(locale)} />
      <JsonLd data={paperJsonLd()} />
      <SiteHeader locale={locale} dict={dict} />
      <main id="main">
        <Hero locale={locale} dict={dict} />
        <Work locale={locale} dict={dict} />
        <Experience dict={dict} />
        <Contact dict={dict} />
      </main>
    </>
  );
}
