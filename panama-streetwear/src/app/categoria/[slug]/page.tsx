import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ProductGrid } from '@/components/product/ProductGrid';
import { FilterSidebar } from '@/components/product/FilterSidebar';
import { SortSelect } from '../../productos/SortSelect';
import {
  getCategories,
  getCategoryBySlug,
  getFilterOptions,
  listProducts,
} from '@/lib/products';
import type { SortOption } from '@/lib/constants';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cat = await getCategoryBySlug(params.slug);
  if (!cat) return { title: 'Categoría' };
  return {
    title: cat.name,
    description: cat.description ?? `Colección ${cat.name} de 507 Street.`,
  };
}

function pickString(sp: PageProps['searchParams'], key: string): string | undefined {
  const v = sp[key];
  if (typeof v === 'string' && v.length > 0) return v;
  if (Array.isArray(v) && v.length > 0) return v[0];
  return undefined;
}
function pickArray(sp: PageProps['searchParams'], key: string): string[] | undefined {
  const v = pickString(sp, key);
  if (!v) return undefined;
  return v.split(',').map((s) => s.trim()).filter(Boolean);
}
function pickNumber(sp: PageProps['searchParams'], key: string): number | undefined {
  const v = pickString(sp, key);
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}
function pickSort(sp: PageProps['searchParams']): SortOption | undefined {
  const v = pickString(sp, 'sort');
  if (v === 'nuevos' || v === 'precio-asc' || v === 'precio-desc') return v;
  return undefined;
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const cat = await getCategoryBySlug(params.slug);
  if (!cat) notFound();

  const filters = {
    categoria: params.slug,
    talla: pickArray(searchParams, 'talla'),
    color: pickArray(searchParams, 'color'),
    min: pickNumber(searchParams, 'min'),
    max: pickNumber(searchParams, 'max'),
    q: pickString(searchParams, 'q'),
    sort: pickSort(searchParams),
    page: pickNumber(searchParams, 'page') ?? 1,
  };

  const [{ products, total }, categories, { sizes, colors }] = await Promise.all([
    listProducts(filters),
    getCategories(),
    getFilterOptions(),
  ]);

  return (
    <>
      <section className="relative bg-ink-950 text-white overflow-hidden">
        {cat.imageUrl && (
          <>
            <Image
              src={cat.imageUrl}
              alt={cat.name}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
          </>
        )}
        <div className="relative container py-20 md:py-28">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent-500">
            Colección
          </span>
          <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tighter">
            {cat.name}
          </h1>
          {cat.description && (
            <p className="mt-4 max-w-2xl text-ink-100">{cat.description}</p>
          )}
          <p className="mt-4 text-xs font-bold uppercase tracking-widest opacity-80">
            {total} productos
          </p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
          <FilterSidebar
            categories={categories}
            allSizes={sizes}
            allColors={colors}
            hideCategoryFilter
          />

          <div>
            <div className="flex items-center justify-between mb-6 border-b border-ink-200 pb-4">
              <p className="text-xs text-ink-500">
                {total} {total === 1 ? 'producto' : 'productos'}
              </p>
              <SortSelect current={filters.sort ?? 'nuevos'} />
            </div>

            {products.length === 0 ? (
              <div className="border border-dashed border-ink-300 py-20 text-center px-6">
                <p className="text-sm text-ink-500">
                  No hay productos con los filtros seleccionados.
                </p>
              </div>
            ) : (
              <ProductGrid products={products} prioritizeFirst={4} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
