import { site } from '@/config/site';
import type { Dictionary } from '@/i18n';

export function Contact({ dict }: { dict: Dictionary }) {
  const links = [
    { href: site.github, label: 'GitHub' },
    { href: site.linkedin, label: 'LinkedIn' },
  ];

  return (
    <section id="contact" className="border-rule border-t-2 py-[clamp(48px,6vw,80px)]">
      {/* Styled as the mono kicker in the design; an h2 so the section has a heading. */}
      <h2 className="mb-4 font-mono font-normal text-[14px] text-muted">{dict.contact.kicker}</h2>
      <a
        href={`mailto:${site.email}`}
        className="inline-block font-black text-[clamp(30px,5.2vw,76px)] leading-[1.05] tracking-[-0.04em] underline decoration-8 decoration-accent underline-offset-[10px] [word-break:break-word]"
      >
        {site.email}
      </a>
      <div className="mt-9 flex flex-wrap gap-x-7 gap-y-1 font-mono text-[15px]">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="py-2.5">
            {link.label} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
