/** First focusable element on every page; visible only while focused. */
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only bg-ink px-4 py-3 font-mono text-[14px] text-bg focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10"
    >
      {label}
    </a>
  );
}
