'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Select } from '@/components/ui/Select';
import { SORT_OPTIONS, type SortOption } from '@/lib/constants';

export interface SortSelectProps {
  current: SortOption;
}

export function SortSelect({ current }: SortSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set('sort', e.target.value);
    next.delete('page');
    router.push(`${pathname}?${next.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-xs font-bold uppercase tracking-widest text-ink-500">
        Ordenar
      </label>
      <Select id="sort" value={current} onChange={onChange} className="w-44">
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
