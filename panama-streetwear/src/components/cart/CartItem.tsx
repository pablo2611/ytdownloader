'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import type { CartItem as TCartItem } from '@/types';

export interface CartItemProps {
  item: TCartItem;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <li className="flex gap-4 md:gap-6 py-6 border-b border-ink-200">
      <Link
        href={`/productos/${item.slug}`}
        className="relative h-28 w-24 md:h-32 md:w-28 shrink-0 bg-ink-100 overflow-hidden"
      >
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="120px"
            className="object-cover"
          />
        )}
      </Link>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/productos/${item.slug}`}
              className="text-sm md:text-base font-semibold leading-tight hover:underline line-clamp-2"
            >
              {item.name}
            </Link>
            <p className="mt-1 text-xs text-ink-500">
              {item.size && <>Talla {item.size}</>}
              {item.size && item.color ? ' · ' : ''}
              {item.color && <>{item.color.name}</>}
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label="Eliminar"
            className="p-2 text-ink-400 hover:text-accent-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div className="inline-flex items-center border border-ink-300">
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              aria-label="Restar"
              className="h-9 w-9 grid place-items-center hover:bg-ink-100"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-10 text-center text-sm font-semibold">{item.quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Sumar"
              disabled={item.quantity >= item.maxStock}
              className="h-9 w-9 grid place-items-center hover:bg-ink-100 disabled:opacity-50"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="text-right">
            <p className="text-base md:text-lg font-bold">
              {formatPrice(item.priceCents * item.quantity)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-ink-500">
                {formatPrice(item.priceCents)} c/u
              </p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
