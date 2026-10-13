import type { ReactNode } from 'react';

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-site px-gutter">{children}</div>;
}
