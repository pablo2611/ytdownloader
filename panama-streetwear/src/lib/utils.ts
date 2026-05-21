import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formatea un precio en centavos USD como balboa panameño (1:1 con USD).
 * Ej.: 2599 → "B/. 25.99"
 */
export function formatPrice(cents: number): string {
  const value = cents / 100;
  return `B/. ${value.toLocaleString('es-PA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Convierte un string en slug url-safe.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export type ColorOption = { name: string; hex: string };

function safeParse<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function parseImages(raw: string | null | undefined): string[] {
  return safeParse<string[]>(raw, []);
}

export function parseSizes(raw: string | null | undefined): string[] {
  return safeParse<string[]>(raw, []);
}

export function parseColors(raw: string | null | undefined): ColorOption[] {
  return safeParse<ColorOption[]>(raw, []);
}

/**
 * Calcula el porcentaje de descuento entre el precio comparado y el actual.
 */
export function discountPercent(priceCents: number, compareAtCents: number | null | undefined): number | null {
  if (!compareAtCents || compareAtCents <= priceCents) return null;
  return Math.round(((compareAtCents - priceCents) / compareAtCents) * 100);
}

/**
 * Costo de envío: gratis si subtotal ≥ 75 USD, si no $5.
 */
export const FREE_SHIPPING_THRESHOLD_CENTS = 7500;
export const FLAT_SHIPPING_CENTS = 500;

export function calculateShippingCents(subtotalCents: number): number {
  if (subtotalCents === 0) return 0;
  return subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : FLAT_SHIPPING_CENTS;
}

/**
 * Construye una URL de tipo /productos?categoria=...&talla=... a partir de un objeto.
 */
export function buildQuery(
  base: string,
  params: Record<string, string | string[] | number | undefined | null>,
): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === '') continue;
    if (Array.isArray(v)) {
      if (v.length > 0) sp.set(k, v.join(','));
    } else {
      sp.set(k, String(v));
    }
  }
  const qs = sp.toString();
  return qs ? `${base}?${qs}` : base;
}
