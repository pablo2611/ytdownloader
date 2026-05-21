import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductGrid } from '@/components/product/ProductGrid';
import type { SerializedProduct } from '@/types';

export interface FeaturedGridProps {
  products: SerializedProduct[];
}

export function FeaturedGrid({ products }: FeaturedGridProps) {
  return (
    <section className="container py-20">
      <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent-500 mb-2 inline-block">
            Lo más buscado
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
            Destacados
          </h2>
        </div>
        <Link
          href="/productos"
          className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-widest hover:text-accent-500 transition-colors"
        >
          Ver todo <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ProductGrid products={products} prioritizeFirst={4} />
    </section>
  );
}
