import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'accent' | 'success' | 'outline' | 'dark';

const VARIANTS: Record<BadgeVariant, string> = {
  default: 'bg-ink-100 text-ink-900 border-ink-200',
  accent: 'bg-accent-500 text-white border-accent-500',
  success: 'bg-emerald-600 text-white border-emerald-600',
  outline: 'bg-transparent text-ink-950 border-ink-950',
  dark: 'bg-ink-950 text-white border-ink-950',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-none border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest',
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}
