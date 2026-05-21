'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SizeSelector } from './SizeSelector';
import { ColorSwatch } from './ColorSwatch';
import { useCartStore, buildCartItemId } from '@/store/cart';
import { cn, type ColorOption } from '@/lib/utils';
import type { SerializedProduct } from '@/types';

export interface AddToCartButtonProps {
  product: SerializedProduct;
  className?: string;
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const initialSize = product.sizes.length === 1 ? (product.sizes[0] ?? null) : null;
  const initialColor = product.colors.length === 1 ? (product.colors[0] ?? null) : null;

  const [size, setSize] = useState<string | null>(initialSize);
  const [color, setColor] = useState<ColorOption | null>(initialColor);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);

  const outOfStock = product.stock <= 0;
  const requiresSize = product.sizes.length > 0;
  const requiresColor = product.colors.length > 0;

  const handleAdd = () => {
    setError(null);
    if (outOfStock) {
      setError('Producto agotado.');
      return;
    }
    if (requiresSize && !size) {
      setError('Selecciona una talla.');
      return;
    }
    if (requiresColor && !color) {
      setError('Selecciona un color.');
      return;
    }

    const id = buildCartItemId(product.id, size, color?.name ?? null);
    addItem({
      id,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] ?? '',
      priceCents: product.priceCents,
      size,
      color,
      maxStock: product.stock,
      quantity,
    });
    setJustAdded(true);
    openDrawer();
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className={cn('space-y-5', className)}>
      {product.sizes.length > 0 && (
        <SizeSelector
          sizes={product.sizes}
          value={size}
          onChange={setSize}
          disabled={outOfStock}
        />
      )}

      {product.colors.length > 0 && (
        <ColorSwatch colors={product.colors} value={color} onChange={setColor} />
      )}

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest">Cantidad</span>
        <div className="inline-flex items-center border border-ink-300">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Restar"
            className="h-11 w-11 grid place-items-center hover:bg-ink-100 disabled:opacity-50"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-12 text-center text-sm font-semibold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
            aria-label="Sumar"
            className="h-11 w-11 grid place-items-center hover:bg-ink-100 disabled:opacity-50"
            disabled={product.stock > 0 && quantity >= product.stock}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-xs font-semibold text-accent-600">
          {error}
        </p>
      )}

      <Button
        variant={justAdded ? 'accent' : 'primary'}
        size="lg"
        fullWidth
        onClick={handleAdd}
        disabled={outOfStock}
      >
        {justAdded ? (
          <>
            <Check className="h-5 w-5" /> Añadido al carrito
          </>
        ) : outOfStock ? (
          'Agotado'
        ) : (
          <>
            <ShoppingBag className="h-5 w-5" /> Añadir al carrito
          </>
        )}
      </Button>

      <p className="text-xs text-ink-500">
        {product.stock > 0
          ? `${product.stock} unidades disponibles`
          : 'Sin existencias'}
      </p>
    </div>
  );
}
