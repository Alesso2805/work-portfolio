import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Contact } from '@/components/home/contact';
import { Experience } from '@/components/home/experience';
import { Hero } from '@/components/home/hero';
import { Work } from '@/components/home/work';
import { SiteHeader } from '@/components/site-header';
import { getDictionary } from '@/i18n';
import { isLocale } from '@/i18n/config';
import { alternatesFor } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { alternates: alternatesFor(locale) };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
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
