import Image from 'next/image';
import { ButtonLink } from '@/components/button-link';
import { site } from '@/config/site';
import type { CaseStudy } from '@/content/case-studies';
import type { Project } from '@/content/projects';
import type { Dictionary } from '@/i18n';
import { type Locale, localePath } from '@/i18n/config';

const sectionClass = 'pt-[clamp(56px,7vw,96px)]';

export function CaseStudyView({
  study,
  project,
  locale,
  dict,
}: {
  study: CaseStudy;
  project: Project;
  locale: Locale;
  dict: Dictionary;
}) {
  const copy = study.copy[locale];
  const labels = dict.caseStudy;

  // Optional fields: an empty value hides its block.
  const meta = [
    copy.role ? { label: labels.meta.role, value: copy.role } : null,
    { label: labels.meta.context, value: copy.context },
    { label: labels.meta.status, value: copy.status },
    { label: labels.meta.languages, value: project.languagesLabel },
  ].filter((item) => item !== null);

  return (
    <>
      <section className="pt-[clamp(48px,7vw,96px)] pb-12">
        <p className="mb-6 font-mono text-[14px] text-muted">{copy.kicker}</p>
        <h1 className="font-black text-[clamp(60px,10vw,148px)] leading-[0.88] tracking-[-0.05em]">
          {project.name}
        </h1>
        <p className="mt-8 max-w-[820px] font-medium text-[clamp(20px,2vw,26px)] leading-[1.35]">
          {copy.lead}
        </p>
      </section>

      <dl className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] border-rule border-y-2">
        {meta.map((item) => (
          <div key={item.label} className="py-5 pr-5">
            <dt className="font-mono text-[13px] text-muted">{item.label}</dt>
            <dd className="mt-1.5 font-semibold">{item.value}</dd>
          </div>
        ))}
      </dl>

      {study.screenshot && (
        <div className="relative mt-12 aspect-video overflow-hidden border-2 border-rule">
          {study.screenshot.kind === 'video' ? (
            <video
              src={study.screenshot.src}
              aria-label={study.screenshot.alt[locale]}
              className="size-full object-cover"
              controls
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <Image
              src={study.screenshot.src}
              alt={study.screenshot.alt[locale]}
              fill
              sizes="(max-width: 1280px) 100vw, 1184px"
              className="object-cover"
            />
          )}
        </div>
      )}

      <section className={`${sectionClass} flex flex-wrap gap-x-12 gap-y-6`}>
        <h2 className="flex-[1_1_280px] text-subsection">{labels.headings.problem}</h2>
        <div className="min-w-0 flex-[999_1_560px]">
          <p className="font-bold text-[clamp(22px,2.2vw,30px)] leading-[1.25] tracking-[-0.01em]">
            {copy.problemTitle}
          </p>
          {copy.problemBody && <p className="mt-5 text-soft">{copy.problemBody}</p>}
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="mb-7 text-subsection">{labels.headings.how}</h2>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] border-rule border-t-2">
          {copy.steps.map((step, index) => (
            <li
              key={step.title}
              className="flex flex-col gap-2.5 border-rule border-b pt-6 pr-6 pb-7"
            >
              <span className="font-black text-[64px] leading-[0.9] tracking-[-0.04em]">
                {index + 1}
              </span>
              <h3 className="font-extrabold text-[22px] leading-[1.2]">{step.title}</h3>
              <p className="text-[16px] text-soft">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={sectionClass}>
        <h2 className="mb-7 text-subsection">{labels.headings.architecture}</h2>
        <ul className="border-rule border-t-2">
          {copy.architecture.map((row) => (
            <li
              key={row.layer}
              className="flex flex-wrap gap-x-8 gap-y-1.5 border-rule border-b py-[18px]"
            >
              <span className="flex-[0_0_140px] font-mono text-[14px] text-muted">{row.layer}</span>
              <span className="flex-[1_1_260px] font-bold text-[20px]">{row.tech}</span>
              <span className="flex-[2_1_320px] text-soft">{row.notes}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={sectionClass}>
        <h2 className="mb-7 text-subsection">{labels.headings.decisions}</h2>
        <ul className="border-rule border-t-2">
          {copy.decisions.map((decision) => (
            <li
              key={decision.title}
              className="flex flex-wrap gap-x-8 gap-y-2 border-rule border-b py-6"
            >
              <h3 className="flex-[1_1_320px] font-extrabold text-[24px] leading-[1.2]">
                {decision.title}
              </h3>
              <p className="flex-[2_1_480px] text-soft">{decision.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${sectionClass} pb-[clamp(48px,6vw,80px)]`}>
        <h2 className="mb-7 text-subsection">{labels.headings.results}</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex-[1_1_320px] bg-accent p-8 text-on-accent">
            <div className="font-black text-[clamp(72px,9vw,120px)] leading-[0.85] tracking-[-0.05em]">
              {study.metric}
            </div>
            <div className="mt-3 font-semibold">{copy.results.metricLabel}</div>
          </div>
          <div className="flex flex-[1_1_260px] flex-col justify-end border-2 border-rule p-8">
            <div className="font-black text-[32px] leading-[1.05] tracking-[-0.03em]">
              {copy.results.thesis}
            </div>
            <div className="mt-2 text-soft">{copy.results.thesisSub}</div>
          </div>
          <a
            href={site.paper.url}
            className="flex flex-[1_1_260px] flex-col justify-end border-2 border-rule p-8 no-underline"
          >
            <div className="font-black text-[32px] leading-[1.05] tracking-[-0.03em]">
              {copy.results.paper} <span aria-hidden="true">↗</span>
            </div>
            <div className="mt-2 text-soft">{copy.results.paperSub}</div>
          </a>
        </div>
        <div className="mt-12 flex flex-wrap gap-2.5">
          <ButtonLink variant="primary" href={project.repoUrl ?? site.github}>
            {labels.viewCode}
          </ButtonLink>
          <ButtonLink variant="secondary" href={`${localePath(locale)}#work`}>
            {labels.backAll}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
