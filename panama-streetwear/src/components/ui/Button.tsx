import * as React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
type Size = 'sm' | 'md' | 'lg' | 'icon';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-ink-950 text-white hover:bg-ink-800 active:bg-ink-700 border border-ink-950',
  secondary:
    'bg-white text-ink-950 hover:bg-ink-100 border border-ink-200',
  outline:
    'bg-transparent text-ink-950 hover:bg-ink-950 hover:text-white border border-ink-950',
  ghost:
    'bg-transparent text-ink-950 hover:bg-ink-100 border border-transparent',
  accent:
    'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 border border-accent-500',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-7 text-base',
  icon: 'h-10 w-10 p-0',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wide transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          VARIANTS[variant],
          SIZES[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
