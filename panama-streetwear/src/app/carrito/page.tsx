'use client';

import { useCartStore, useHasHydrated } from '@/store/cart';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { Skeleton } from '@/components/ui/Skeleton';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const hydrated = useHasHydrated();

  if (!hydrated) {
    return (
      <div className="container py-12">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-14">
      <header className="mb-8">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent-500">
          Tu selección
        </span>
        <h1 className="mt-2 text-4xl md:text-6xl font-black tracking-tighter">
          Carrito
        </h1>
        <p className="mt-2 text-ink-600 text-sm">
          {items.reduce((a, b) => a + b.quantity, 0)} ítems
        </p>
      </header>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-start">
        <ul>
          {items.map((it) => (
            <CartItem key={it.id} item={it} />
          ))}
        </ul>

        <CartSummary />
      </div>
    </div>
  );
}
