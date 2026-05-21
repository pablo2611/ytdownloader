'use client';

import Link from 'next/link';
import { Lock } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import {
  formatPrice,
  calculateShippingCents,
  FREE_SHIPPING_THRESHOLD_CENTS,
} from '@/lib/utils';

export function CartSummary() {
  const subtotal = useCartStore((s) => s.subtotalCents());
  const items = useCartStore((s) => s.items);
  const shipping = calculateShippingCents(subtotal);
  const total = subtotal + shipping;
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - subtotal);
  const itemsCount = items.reduce((a, b) => a + b.quantity, 0);

  return (
    <aside className="border border-ink-200 p-6 md:p-8 bg-white sticky top-24 space-y-5">
      <h2 className="text-sm font-black uppercase tracking-widest">Resumen</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-ink-500">Productos ({itemsCount})</span>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-500">Envío</span>
          <span className="font-semibold">
            {shipping === 0 ? (subtotal === 0 ? '—' : 'Gratis') : formatPrice(shipping)}
          </span>
        </div>
      </div>

      {subtotal > 0 && remainingForFree > 0 && (
        <div className="bg-ink-100 p-3 text-xs text-ink-700">
          Añade <strong>{formatPrice(remainingForFree)}</strong> más y tu envío es gratis.
        </div>
      )}

      <div className="border-t border-ink-200 pt-4 flex justify-between items-baseline">
        <span className="font-black uppercase tracking-widest text-sm">Total</span>
        <span className="text-2xl font-black">{formatPrice(total)}</span>
      </div>

      <Link
        href="/checkout"
        className={`inline-flex h-14 w-full items-center justify-center gap-2 px-6 text-sm font-bold uppercase tracking-widest text-white transition-colors ${
          items.length === 0
            ? 'pointer-events-none bg-ink-300'
            : 'bg-ink-950 hover:bg-accent-500'
        }`}
        aria-disabled={items.length === 0}
      >
        Proceder al pago
      </Link>

      <p className="text-xs text-ink-500 flex items-center justify-center gap-1.5">
        <Lock className="h-3 w-3" /> Pago seguro · Yappy · Tarjeta · Contra entrega
      </p>
    </aside>
  );
}
