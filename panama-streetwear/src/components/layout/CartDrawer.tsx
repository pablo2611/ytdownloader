'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Sheet } from '@/components/ui/Sheet';
import { Button } from '@/components/ui/Button';
import { useCartStore, useHasHydrated } from '@/store/cart';
import { formatPrice, calculateShippingCents, FREE_SHIPPING_THRESHOLD_CENTS } from '@/lib/utils';

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotalCents());
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const hydrated = useHasHydrated();

  const shipping = calculateShippingCents(subtotal);
  const total = subtotal + shipping;
  const remainingForFree = FREE_SHIPPING_THRESHOLD_CENTS - subtotal;

  return (
    <Sheet open={isOpen} onClose={closeDrawer} side="right" title="Tu carrito">
      {!hydrated || items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
          <ShoppingBag className="h-12 w-12 text-ink-300 mb-4" />
          <h3 className="text-lg font-black uppercase tracking-tight mb-2">
            Tu carrito está vacío
          </h3>
          <p className="text-sm text-ink-500 mb-6">
            Empieza a llenarlo con la colección 507.
          </p>
          <Button onClick={closeDrawer} variant="primary" size="md">
            Seguir comprando
          </Button>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {subtotal < FREE_SHIPPING_THRESHOLD_CENTS && (
            <div className="bg-ink-100 px-5 py-3 text-xs text-ink-700">
              Te faltan <strong>{formatPrice(remainingForFree)}</strong> para envío gratis.
            </div>
          )}

          <ul className="flex-1 overflow-y-auto divide-y divide-ink-200">
            {items.map((it) => (
              <li key={it.id} className="flex gap-3 p-5">
                <Link
                  href={`/productos/${it.slug}`}
                  onClick={closeDrawer}
                  className="relative h-24 w-20 shrink-0 bg-ink-100 overflow-hidden"
                >
                  {it.image && (
                    <Image
                      src={it.image}
                      alt={it.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  )}
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/productos/${it.slug}`}
                      onClick={closeDrawer}
                      className="text-sm font-semibold leading-tight line-clamp-2 hover:underline"
                    >
                      {it.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeItem(it.id)}
                      aria-label="Eliminar"
                      className="p-1 text-ink-400 hover:text-accent-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-ink-500">
                    {it.size && <>Talla {it.size}</>}
                    {it.size && it.color ? ' · ' : ''}
                    {it.color && <>{it.color.name}</>}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center border border-ink-300">
                      <button
                        type="button"
                        onClick={() => updateQuantity(it.id, it.quantity - 1)}
                        aria-label="Restar"
                        className="h-8 w-8 grid place-items-center hover:bg-ink-100"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-8 text-center text-xs font-semibold">{it.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(it.id, it.quantity + 1)}
                        aria-label="Sumar"
                        disabled={it.quantity >= it.maxStock}
                        className="h-8 w-8 grid place-items-center hover:bg-ink-100 disabled:opacity-50"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="text-sm font-bold">
                      {formatPrice(it.priceCents * it.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-ink-200 px-5 py-5 space-y-3 bg-white">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-500">Subtotal</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-500">Envío</span>
              <span className="font-semibold">
                {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex items-center justify-between text-base border-t border-ink-200 pt-3">
              <span className="font-bold uppercase tracking-widest text-sm">Total</span>
              <span className="font-black">{formatPrice(total)}</span>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="inline-flex h-11 items-center justify-center gap-2 bg-ink-950 px-5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-ink-800 transition-colors"
              >
                Pagar
              </Link>
              <Link
                href="/carrito"
                onClick={closeDrawer}
                className="text-center text-xs font-bold uppercase tracking-widest text-ink-700 hover:text-ink-950 py-2"
              >
                Ver carrito completo
              </Link>
            </div>
          </div>
        </div>
      )}
    </Sheet>
  );
}
