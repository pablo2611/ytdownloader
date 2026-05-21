import type { Product, Category } from '@prisma/client';
import type { ColorOption } from '@/lib/utils';

/**
 * Producto serializado para uso en cliente (con arrays ya parseados).
 */
export type SerializedProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  compareAtCents: number | null;
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  images: string[];
  sizes: string[];
  colors: ColorOption[];
  stock: number;
  featured: boolean;
  isNew: boolean;
  active: boolean;
};

export type SerializedCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  productCount?: number;
};

export type ProductWithCategory = Product & { category: Category };

export type CartItem = {
  /** id compuesto productId-size-color para diferenciar variantes en el carrito */
  id: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  priceCents: number;
  size: string | null;
  color: ColorOption | null;
  quantity: number;
  maxStock: number;
};

export type ProductFilters = {
  categoria?: string;
  talla?: string[];
  color?: string[];
  min?: number;
  max?: number;
  q?: string;
  sort?: 'nuevos' | 'precio-asc' | 'precio-desc';
  page?: number;
};
