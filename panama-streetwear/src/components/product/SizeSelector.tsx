'use client';

import { cn } from '@/lib/utils';

export interface SizeSelectorProps {
  sizes: string[];
  value: string | null;
  onChange: (size: string) => void;
  disabled?: boolean;
  className?: string;
}

export function SizeSelector({ sizes, value, onChange, disabled, className }: SizeSelectorProps) {
  if (sizes.length === 0) return null;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest">Talla</span>
        {value && (
          <span className="text-xs text-ink-500">Seleccionada: {value}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => {
          const selected = value === s;
          return (
            <button
              key={s}
              type="button"
              disabled={disabled}
              onClick={() => onChange(s)}
              aria-pressed={selected}
              className={cn(
                'min-w-12 h-11 px-3 border text-sm font-semibold transition-colors',
                selected
                  ? 'bg-ink-950 text-white border-ink-950'
                  : 'bg-white text-ink-950 border-ink-300 hover:border-ink-950',
                disabled && 'opacity-50 cursor-not-allowed',
              )}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}
