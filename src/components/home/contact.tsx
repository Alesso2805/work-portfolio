import { site } from '@/config/site';
import type { Dictionary } from '@/i18n';
import { cn } from '@/lib/cn';

/** On the orange block, links keep its text color for hover and focus too (the site's hover orange would vanish). */
const onAccentLink = 'text-current hover:text-current focus-visible:outline-current';

export function Contact({ dict }: { dict: Dictionary }) {
  const links = [
    { href: site.github, label: 'GitHub' },
    { href: site.linkedin, label: 'LinkedIn' },
  ];

  return (
    <section id="contact" className="border-rule border-t-2 py-[clamp(48px,6vw,80px)]">
      {/* Styled as the mono kicker in the design; an h2 so the section has a heading. */}
      <h2 className="mb-6 font-mono font-normal text-[14px] text-muted">{dict.contact.kicker}</h2>
      <div className="bg-accent p-[clamp(24px,4vw,56px)] text-on-accent">
        <a
          href={`mailto:${site.email}`}
          className={cn(
            'inline-block font-black text-[clamp(28px,4.4vw,64px)] leading-[1.05] tracking-[-0.04em] underline decoration-4 underline-offset-[10px] [word-break:break-word] hover:decoration-8',
            onAccentLink,
          )}
        >
          {site.email}
        </a>
        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-1 font-mono text-[15px]">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn('py-2.5 hover:decoration-2', onAccentLink)}
            >
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
