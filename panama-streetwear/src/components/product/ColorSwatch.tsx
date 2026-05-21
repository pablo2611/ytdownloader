'use client';

import { Check } from 'lucide-react';
import { cn, type ColorOption } from '@/lib/utils';

export interface ColorSwatchProps {
  colors: ColorOption[];
  value: ColorOption | null;
  onChange: (color: ColorOption) => void;
  className?: string;
}

export function ColorSwatch({ colors, value, onChange, className }: ColorSwatchProps) {
  if (colors.length === 0) return null;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest">Color</span>
        {value && <span className="text-xs text-ink-500">{value.name}</span>}
      </div>
      <div className="flex flex-wrap gap-3">
        {colors.map((c) => {
          const selected = value?.name === c.name;
          const isLight = ['#f4f4f4', '#efe7d5', '#d2b48c'].includes(c.hex.toLowerCase());
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => onChange(c)}
              aria-label={c.name}
              aria-pressed={selected}
              title={c.name}
              className={cn(
                'relative h-9 w-9 rounded-full border-2 transition-all',
                selected ? 'border-ink-950 ring-2 ring-ink-950/20 ring-offset-2' : 'border-ink-300 hover:border-ink-500',
              )}
              style={{ backgroundColor: c.hex }}
            >
              {selected && (
                <Check
                  className={cn(
                    'absolute inset-0 m-auto h-4 w-4',
                    isLight ? 'text-ink-950' : 'text-white',
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
