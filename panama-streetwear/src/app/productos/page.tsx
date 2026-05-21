import { Suspense } from 'react';
import Link from 'next/link';
import { ProductGrid } from '@/components/product/ProductGrid';
import { FilterSidebar } from '@/components/product/FilterSidebar';
import { SortSelect } from './SortSelect';
import {
  getCategories,
  getFilterOptions,
  listProducts,
} from '@/lib/products';
import { buildQuery } from '@/lib/utils';
import type { SortOption } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Catálogo',
  description: 'Explora toda la colección de 507 Street: tees, hoodies, pantalones, chaquetas, sneakers y accesorios.',
};

type SearchParams = Record<string, string | string[] | undefined>;

function pickString(sp: SearchParams, key: string): string | undefined {
  const v = sp[key];
  if (typeof v === 'string' && v.length > 0) return v;
  if (Array.isArray(v) && v.length > 0) return v[0];
  return undefined;
}

function pickArray(sp: SearchParams, key: string): string[] | undefined {
  const v = pickString(sp, key);
  if (!v) return undefined;
  return v
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function pickNumber(sp: SearchParams, key: string): number | undefined {
  const v = pickString(sp, key);
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function pickSort(sp: SearchParams): SortOption | undefined {
  const v = pickString(sp, 'sort');
  if (v === 'nuevos' || v === 'precio-asc' || v === 'precio-desc') return v;
  return undefined;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const filters = {
    categoria: pickString(searchParams, 'categoria'),
    talla: pickArray(searchParams, 'talla'),
    color: pickArray(searchParams, 'color'),
    min: pickNumber(searchParams, 'min'),
    max: pickNumber(searchParams, 'max'),
    q: pickString(searchParams, 'q'),
    sort: pickSort(searchParams),
    page: pickNumber(searchParams, 'page') ?? 1,
  };

  const [{ products, total, page, totalPages }, categories, { sizes, colors }] =
    await Promise.all([
      listProducts(filters),
      getCategories(),
      getFilterOptions(),
    ]);

  return (
    <div className="container py-10 md:py-14">
      <header className="mb-10">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent-500 mb-2 inline-block">
          Catálogo
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
          {filters.q ? `Resultados para "${filters.q}"` : 'Todos los productos'}
        </h1>
        <p className="mt-2 text-ink-600 text-sm">
          {total} {total === 1 ? 'producto' : 'productos'} encontrados
        </p>
      </header>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
        <Suspense fallback={<div className="text-xs text-ink-500">Cargando filtros…</div>}>
          <FilterSidebar
            categories={categories}
            allSizes={sizes}
            allColors={colors}
          />
        </Suspense>

        <div>
          <div className="flex items-center justify-between mb-6 border-b border-ink-200 pb-4">
            <p className="text-xs text-ink-500">
              Página {page} de {totalPages}
            </p>
            <Suspense fallback={null}>
              <SortSelect current={filters.sort ?? 'nuevos'} />
            </Suspense>
          </div>

          {products.length === 0 ? (
            <EmptyResults />
          ) : (
            <>
              <ProductGrid products={products} prioritizeFirst={4} />
              <Pagination
                page={page}
                totalPages={totalPages}
                searchParams={searchParams}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyResults() {
  return (
    <div className="border border-dashed border-ink-300 py-20 text-center px-6">
      <h2 className="text-2xl font-black tracking-tight mb-2">
        No encontramos productos
      </h2>
      <p className="text-sm text-ink-600 mb-6">
        Prueba ajustando los filtros o limpiándolos para ver todo el catálogo.
      </p>
      <Link
        href="/productos"
        className="inline-flex h-11 items-center px-5 bg-ink-950 text-white text-xs font-bold uppercase tracking-widest hover:bg-accent-500 transition-colors"
      >
        Ver todo
      </Link>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  searchParams,
}: {
  page: number;
  totalPages: number;
  searchParams: SearchParams;
}) {
  if (totalPages <= 1) return null;

  const cleanedSearchParams: Record<string, string> = {};
  for (const [k, v] of Object.entries(searchParams)) {
    if (k === 'page') continue;
    if (typeof v === 'string') cleanedSearchParams[k] = v;
    else if (Array.isArray(v) && v[0]) cleanedSearchParams[k] = v[0];
  }

  const buildPageHref = (p: number) =>
    buildQuery('/productos', { ...cleanedSearchParams, page: p });

  return (
    <nav
      aria-label="Paginación"
      className="mt-12 flex items-center justify-center gap-2"
    >
      {page > 1 && (
        <Link
          href={buildPageHref(page - 1)}
          className="inline-flex h-10 items-center px-4 border border-ink-300 text-xs font-bold uppercase tracking-widest hover:border-ink-950 transition-colors"
        >
          ← Anterior
        </Link>
      )}
      <span className="text-xs text-ink-500 px-3">
        {page} / {totalPages}
      </span>
      {page < totalPages && (
        <Link
          href={buildPageHref(page + 1)}
          className="inline-flex h-10 items-center px-4 border border-ink-300 text-xs font-bold uppercase tracking-widest hover:border-ink-950 transition-colors"
        >
          Siguiente →
        </Link>
      )}
    </nav>
  );
}

