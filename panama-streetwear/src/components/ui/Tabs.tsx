'use client';

import * as React from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export type TabItem = {
  value: string;
  label: string;
  content: React.ReactNode;
};

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
}

export function Tabs({ items, defaultValue, className }: TabsProps) {
  const [active, setActive] = useState<string>(defaultValue ?? items[0]?.value ?? '');

  return (
    <div className={cn('w-full', className)}>
      <div role="tablist" className="flex border-b border-ink-200 overflow-x-auto">
        {items.map((it) => (
          <button
            key={it.value}
            role="tab"
            aria-selected={active === it.value}
            type="button"
            onClick={() => setActive(it.value)}
            className={cn(
              'shrink-0 px-5 py-3 text-xs font-bold uppercase tracking-widest transition-colors border-b-2',
              active === it.value
                ? 'border-ink-950 text-ink-950'
                : 'border-transparent text-ink-500 hover:text-ink-950',
            )}
          >
            {it.label}
          </button>
        ))}
      </div>
      <div className="pt-6">
        {items.map((it) => (
          <div key={it.value} role="tabpanel" hidden={active !== it.value}>
            {active === it.value && it.content}
          </div>
        ))}
      </div>
    </div>
  );
}
