import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

const variants = {
  primary: 'bg-ink text-bg',
  secondary: 'border-2 border-rule',
} as const;

/** 52px call-to-action link: solid ink (primary) or 2px outline (secondary). */
export function ButtonLink({
  variant,
  className,
  ...props
}: ComponentPropsWithoutRef<'a'> & { variant: keyof typeof variants }) {
  return (
    <a
      {...props}
      className={cn(
        'inline-flex min-h-[52px] items-center px-6 font-semibold no-underline',
        variants[variant],
        className,
      )}
    />
  );
}
