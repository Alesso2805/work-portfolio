import type { Dictionary } from '@/i18n';

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="flex flex-wrap justify-between gap-2 border-rule border-t-2 py-[22px] font-mono text-[13px] text-muted">
      <span>{dict.footer.copyright}</span>
      <span>{dict.footer.location}</span>
    </footer>
  );
}
