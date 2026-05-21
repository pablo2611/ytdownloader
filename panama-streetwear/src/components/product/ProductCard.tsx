import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { cn, formatPrice, discountPercent } from '@/lib/utils';
import type { SerializedProduct } from '@/types';

export interface ProductCardProps {
  product: SerializedProduct;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority }: ProductCardProps) {
  const cover = product.images[0] ?? '';
  const hover = product.images[1] ?? cover;
  const discount = discountPercent(product.priceCents, product.compareAtCents);
  const outOfStock = product.stock <= 0;

  return (
    <Link
      href={`/productos/${product.slug}`}
      className={cn('group block', className)}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-100">
        {cover ? (
          <>
            <Image
              src={cover}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
            {hover && hover !== cover && (
              <Image
                src={hover}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <div className="absolute inset-0 grid place-items-center text-ink-400 text-xs">
            Sin imagen
          </div>
        )}

        <div className="absolute left-3 top-3 flex flex-col items-start gap-1">
          {product.isNew && <Badge variant="dark">Nuevo</Badge>}
          {discount !== null && <Badge variant="accent">-{discount}%</Badge>}
          {outOfStock && <Badge variant="outline">Agotado</Badge>}
        </div>
      </div>

      <div className="pt-3 space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-ink-500">
          {product.categoryName}
        </p>
        <h3 className="text-sm font-semibold text-ink-950 leading-tight group-hover:underline underline-offset-4 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-ink-950">
            {formatPrice(product.priceCents)}
          </span>
          {product.compareAtCents && product.compareAtCents > product.priceCents && (
            <span className="text-xs text-ink-400 line-through">
              {formatPrice(product.compareAtCents)}
            </span>
          )}
        </div>
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.slice(0, 5).map((c) => (
              <span
                key={c.name}
                title={c.name}
                aria-label={c.name}
                className="h-3 w-3 rounded-full border border-ink-300"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-[10px] text-ink-500">+{product.colors.length - 5}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
