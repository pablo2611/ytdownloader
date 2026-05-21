import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';
import type { SerializedProduct } from '@/types';

export interface ProductGridProps {
  products: SerializedProduct[];
  className?: string;
  prioritizeFirst?: number;
}

export function ProductGrid({ products, className, prioritizeFirst = 0 }: ProductGridProps) {
  if (products.length === 0) return null;
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4',
        className,
      )}
    >
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < prioritizeFirst} />
      ))}
    </div>
  );
}
