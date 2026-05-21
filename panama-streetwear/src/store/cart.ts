'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem } from '@/types';
import { CART_STORAGE_KEY } from '@/lib/constants';

type AddItemInput = Omit<CartItem, 'quantity'> & { quantity?: number };

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: AddItemInput) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  subtotalCents: () => number;
  itemCount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (input) => {
        const incoming: CartItem = {
          ...input,
          quantity: Math.max(1, input.quantity ?? 1),
        };
        const existing = get().items.find((it) => it.id === incoming.id);
        if (existing) {
          const next = Math.min(existing.quantity + incoming.quantity, existing.maxStock);
          set({
            items: get().items.map((it) =>
              it.id === incoming.id ? { ...it, quantity: next } : it,
            ),
          });
        } else {
          const clamped: CartItem = {
            ...incoming,
            quantity: Math.min(incoming.quantity, incoming.maxStock || incoming.quantity),
          };
          set({ items: [...get().items, clamped] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((it) => it.id !== id) });
      },

      updateQuantity: (id, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((it) => it.id !== id) });
          return;
        }
        set({
          items: get().items.map((it) =>
            it.id === id ? { ...it, quantity: Math.min(qty, it.maxStock) } : it,
          ),
        });
      },

      clear: () => set({ items: [] }),

      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),

      subtotalCents: () =>
        get().items.reduce((acc, it) => acc + it.priceCents * it.quantity, 0),

      itemCount: () => get().items.reduce((acc, it) => acc + it.quantity, 0),
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

/**
 * Hidratación segura: en SSR/primer render, los stores persistidos no están
 * disponibles. Este hook devuelve `true` solo tras la hidratación en cliente
 * para que los componentes puedan render condicional sin desajuste SSR.
 */
export function useHasHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}

/**
 * Construye el id compuesto de un item del carrito.
 */
export function buildCartItemId(productId: string, size: string | null, colorName: string | null): string {
  return `${productId}__${size ?? 'na'}__${colorName ?? 'na'}`;
}
