'use client';

import { ShoppingBag } from 'lucide-react';
import { useCartStore, useHasHydrated } from '@/store/cart';

export function CartButton() {
  const openDrawer = useCartStore((s) => s.openDrawer);
  const count = useCartStore((s) => s.itemCount());
  const hydrated = useHasHydrated();

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={`Abrir carrito (${count} ítems)`}
      className="relative p-2 hover:text-accent-500 transition-colors"
    >
      <ShoppingBag className="h-5 w-5" />
      {hydrated && count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 grid place-items-center min-w-5 h-5 px-1 rounded-full bg-accent-500 text-white text-[10px] font-bold leading-none">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}
