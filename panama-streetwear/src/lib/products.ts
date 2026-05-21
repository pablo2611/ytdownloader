import 'server-only';
import type { Prisma } from '@prisma/client';
import { prisma } from './db';
import {
  parseImages,
  parseSizes,
  parseColors,
} from './utils';
import { PRODUCTS_PER_PAGE } from './constants';
import type {
  SerializedProduct,
  SerializedCategory,
  ProductWithCategory,
  ProductFilters,
} from '@/types';

export function serializeProduct(p: ProductWithCategory): SerializedProduct {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description,
    priceCents: p.priceCents,
    compareAtCents: p.compareAtCents,
    categoryId: p.categoryId,
    categorySlug: p.category.slug,
    categoryName: p.category.name,
    images: parseImages(p.images),
    sizes: parseSizes(p.sizes),
    colors: parseColors(p.colors),
    stock: p.stock,
    featured: p.featured,
    isNew: p.isNew,
    active: p.active,
  };
}

export async function getCategories(): Promise<SerializedCategory[]> {
  const rows = await prisma.category.findMany({
    orderBy: { createdAt: 'asc' },
    include: { _count: { select: { products: true } } },
  });
  return rows.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description,
    imageUrl: c.imageUrl,
    productCount: c._count.products,
  }));
}

export async function getCategoryBySlug(slug: string): Promise<SerializedCategory | null> {
  const c = await prisma.category.findUnique({ where: { slug } });
  if (!c) return null;
  return {
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description,
    imageUrl: c.imageUrl,
  };
}

export async function getProductBySlug(slug: string): Promise<SerializedProduct | null> {
  const p = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!p || !p.active) return null;
  return serializeProduct(p);
}

export async function getAllProductSlugs(): Promise<string[]> {
  const rows = await prisma.product.findMany({
    where: { active: true },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

export async function getFeaturedProducts(limit = 6): Promise<SerializedProduct[]> {
  const rows = await prisma.product.findMany({
    where: { featured: true, active: true },
    include: { category: true },
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
  return rows.map(serializeProduct);
}

export async function getRelatedProducts(
  categoryId: string,
  excludeId: string,
  limit = 4,
): Promise<SerializedProduct[]> {
  const rows = await prisma.product.findMany({
    where: {
      categoryId,
      id: { not: excludeId },
      active: true,
    },
    include: { category: true },
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
  return rows.map(serializeProduct);
}

export type ListProductsResult = {
  products: SerializedProduct[];
  total: number;
  page: number;
  totalPages: number;
};

export async function listProducts(filters: ProductFilters): Promise<ListProductsResult> {
  const where: Prisma.ProductWhereInput = { active: true };

  if (filters.categoria) {
    where.category = { slug: filters.categoria };
  }

  if (filters.q) {
    where.OR = [
      { name: { contains: filters.q } },
      { description: { contains: filters.q } },
    ];
  }

  if (typeof filters.min === 'number' || typeof filters.max === 'number') {
    where.priceCents = {};
    if (typeof filters.min === 'number') (where.priceCents as Prisma.IntFilter).gte = filters.min * 100;
    if (typeof filters.max === 'number') (where.priceCents as Prisma.IntFilter).lte = filters.max * 100;
  }

  // Sort
  const orderBy: Prisma.ProductOrderByWithRelationInput =
    filters.sort === 'precio-asc'
      ? { priceCents: 'asc' }
      : filters.sort === 'precio-desc'
        ? { priceCents: 'desc' }
        : { createdAt: 'desc' };

  // Fetch with category. SQLite no soporta JSON queries → filtramos tallas/colores en memoria.
  const rows = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy,
  });

  let filtered = rows.map(serializeProduct);

  if (filters.talla && filters.talla.length > 0) {
    const tallasSet = new Set(filters.talla);
    filtered = filtered.filter((p) => p.sizes.some((s) => tallasSet.has(s)));
  }

  if (filters.color && filters.color.length > 0) {
    const colorSet = new Set(filters.color);
    filtered = filtered.filter((p) => p.colors.some((c) => colorSet.has(c.name)));
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE));
  const page = Math.min(Math.max(1, filters.page ?? 1), totalPages);
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const products = filtered.slice(start, start + PRODUCTS_PER_PAGE);

  return { products, total, page, totalPages };
}

/**
 * Devuelve la lista única de todas las tallas y colores presentes en
 * productos activos para uso en filtros.
 */
export async function getFilterOptions(): Promise<{
  sizes: string[];
  colors: { name: string; hex: string }[];
}> {
  const rows = await prisma.product.findMany({
    where: { active: true },
    select: { sizes: true, colors: true },
  });

  const sizeSet = new Set<string>();
  const colorMap = new Map<string, string>();

  for (const r of rows) {
    for (const s of parseSizes(r.sizes)) sizeSet.add(s);
    for (const c of parseColors(r.colors)) {
      if (!colorMap.has(c.name)) colorMap.set(c.name, c.hex);
    }
  }

  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '38', '39', '40', '41', '42', '43', '44', 'Única'];
  const sizes = Array.from(sizeSet).sort((a, b) => {
    const ai = sizeOrder.indexOf(a);
    const bi = sizeOrder.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  const colors = Array.from(colorMap.entries()).map(([name, hex]) => ({ name, hex }));

  return { sizes, colors };
}
