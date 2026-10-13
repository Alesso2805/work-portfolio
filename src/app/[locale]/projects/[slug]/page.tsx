import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudyHeader } from '@/components/case-study/case-study-header';
import { CaseStudyView } from '@/components/case-study/case-study-view';
import { caseStudies, getCaseStudy } from '@/content/case-studies';
import { projects } from '@/content/projects';
import { getDictionary } from '@/i18n';
import { isLocale, locales } from '@/i18n/config';
import { pageMetadata } from '@/lib/metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => caseStudies.map((study) => ({ locale, slug: study.slug })));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

async function resolve(params: Props['params']) {
  const { locale, slug } = await params;
  const study = getCaseStudy(slug);
  const project = projects.find((p) => p.caseStudySlug === slug);
  if (!isLocale(locale) || !study || !project) return null;
  return { locale, study, project };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await resolve(params);
  if (!resolved) return {};
  const { locale, study, project } = resolved;
  return pageMetadata({
    locale,
    subpath: `/projects/${study.slug}`,
    title: `${project.name} — ${getDictionary(locale).caseStudy.titleSuffix}`,
    description: study.copy[locale].lead,
    type: 'article',
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const resolved = await resolve(params);
  if (!resolved) notFound();
  const { locale, study, project } = resolved;
  const dict = getDictionary(locale);

  return (
    <>
      <CaseStudyHeader locale={locale} subpath={`/projects/${study.slug}`} dict={dict} />
      <main id="main">
        <CaseStudyView study={study} project={project} locale={locale} dict={dict} />
      </main>
    </>
  );
}
