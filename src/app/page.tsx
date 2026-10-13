import { Container } from '@/components/container';

// Phase 1 only: token and type preview. Replaced by the language redirect in phase 2.
const tokens = [
  ['bg', 'bg-bg'],
  ['ink', 'bg-ink'],
  ['muted', 'bg-muted'],
  ['soft', 'bg-soft'],
  ['rule', 'bg-rule'],
  ['accent', 'bg-accent'],
  ['hover', 'bg-hover'],
] as const;

export default function TokenPreview() {
  return (
    <Container>
      <main className="flex flex-col gap-12 border-rule border-t-2 py-12">
        <p className="font-mono text-[14px] text-muted">
          Software Engineer — Lima, PE — Remote US / LatAm / EU
        </p>
        <h1 className="text-display">
          <span className="block">Alessandro</span>
          <span className="block">David</span>
        </h1>
        <h2 className="text-section">01 — Work</h2>
        <p className="text-project">GenAIrator</p>
        <p className="max-w-[520px] text-soft">
          Backend-first engineer. Python, FastAPI, SQLAlchemy, SQL Server and Docker — and the React
          or Angular frontend on top.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <a
            href="#top"
            className="inline-flex min-h-[52px] items-center bg-ink px-6 font-semibold text-bg no-underline"
          >
            See work ↓
          </a>
          <a
            href="#top"
            className="inline-flex min-h-[52px] items-center border-2 border-rule px-6 font-semibold no-underline"
          >
            CV ↓
          </a>
        </div>
        <ul className="flex flex-wrap gap-4 font-mono text-[13px] text-muted">
          {tokens.map(([name, cls]) => (
            <li key={name} className="flex items-center gap-2">
              <span aria-hidden="true" className={`block size-8 border-2 border-rule ${cls}`} />
              --{name}
            </li>
          ))}
        </ul>
        <div className="bg-accent p-7 text-on-accent">
          <div className="font-black text-[88px] leading-[0.9] tracking-[-0.04em]">97%</div>
          <div className="font-semibold">test coverage with Pytest</div>
        </div>
      </main>
    </Container>
  );
}
