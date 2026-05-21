'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn, type ColorOption } from '@/lib/utils';
import type { SerializedCategory } from '@/types';

export interface FilterSidebarProps {
  categories: SerializedCategory[];
  allSizes: string[];
  allColors: ColorOption[];
  className?: string;
  hideCategoryFilter?: boolean;
}

function splitParam(value: string | null): string[] {
  if (!value) return [];
  return value.split(',').map((s) => s.trim()).filter(Boolean);
}

export function FilterSidebar({
  categories,
  allSizes,
  allColors,
  className,
  hideCategoryFilter = false,
}: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoria = searchParams.get('categoria');
  const tallas = useMemo(() => splitParam(searchParams.get('talla')), [searchParams]);
  const colores = useMemo(() => splitParam(searchParams.get('color')), [searchParams]);
  const minParam = searchParams.get('min') ?? '';
  const maxParam = searchParams.get('max') ?? '';

  const [min, setMin] = useState(minParam);
  const [max, setMax] = useState(maxParam);

  useEffect(() => {
    setMin(minParam);
    setMax(maxParam);
  }, [minParam, maxParam]);

  const push = (next: URLSearchParams) => {
    next.delete('page');
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const toggleArrayParam = (key: 'talla' | 'color', value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    const current = splitParam(next.get(key));
    const exists = current.includes(value);
    const updated = exists ? current.filter((v) => v !== value) : [...current, value];
    if (updated.length === 0) next.delete(key);
    else next.set(key, updated.join(','));
    push(next);
  };

  const setCategoryParam = (slug: string | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (slug) next.set('categoria', slug);
    else next.delete('categoria');
    push(next);
  };

  const applyPriceRange = () => {
    const next = new URLSearchParams(searchParams.toString());
    if (min) next.set('min', min);
    else next.delete('min');
    if (max) next.set('max', max);
    else next.delete('max');
    push(next);
  };

  const clearAll = () => {
    const next = new URLSearchParams();
    const q = searchParams.get('q');
    const sort = searchParams.get('sort');
    if (q) next.set('q', q);
    if (sort) next.set('sort', sort);
    push(next);
  };

  const hasFilters =
    !!categoria || tallas.length > 0 || colores.length > 0 || !!minParam || !!maxParam;

  return (
    <aside className={cn('w-full space-y-8', className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-widest">Filtrar</h2>
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1 text-xs text-ink-500 hover:text-ink-950 transition-colors"
          >
            <X className="h-3 w-3" /> Limpiar
          </button>
        )}
      </div>

      {!hideCategoryFilter && (
        <FilterGroup title="Categoría">
          <ul className="space-y-2">
            <li>
              <button
                type="button"
                onClick={() => setCategoryParam(null)}
                className={cn(
                  'text-sm transition-colors',
                  !categoria ? 'font-bold text-ink-950' : 'text-ink-500 hover:text-ink-950',
                )}
              >
                Todas
              </button>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setCategoryParam(c.slug)}
                  className={cn(
                    'text-sm transition-colors',
                    categoria === c.slug ? 'font-bold text-ink-950' : 'text-ink-500 hover:text-ink-950',
                  )}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </FilterGroup>
      )}

      <FilterGroup title="Talla">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => {
            const selected = tallas.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleArrayParam('talla', s)}
                className={cn(
                  'min-w-10 h-9 px-3 border text-xs font-semibold transition-colors',
                  selected
                    ? 'bg-ink-950 text-white border-ink-950'
                    : 'bg-white text-ink-950 border-ink-300 hover:border-ink-950',
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-3">
          {allColors.map((c) => {
            const selected = colores.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => toggleArrayParam('color', c.name)}
                aria-label={c.name}
                aria-pressed={selected}
                title={c.name}
                className={cn(
                  'h-8 w-8 rounded-full border-2 transition-all',
                  selected
                    ? 'border-ink-950 ring-2 ring-ink-950/20 ring-offset-2'
                    : 'border-ink-300 hover:border-ink-500',
                )}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Precio (USD)">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Mín"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            min="0"
          />
          <span className="text-ink-500">—</span>
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Máx"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            min="0"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={applyPriceRange}
          className="mt-3"
        >
          Aplicar
        </Button>
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-ink-700">{title}</h3>
      {children}
    </div>
  );
}
