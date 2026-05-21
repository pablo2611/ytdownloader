import { NextResponse, type NextRequest } from 'next/server';
import { listProducts } from '@/lib/products';
import type { SortOption } from '@/lib/constants';

export const dynamic = 'force-dynamic';

function getNumber(value: string | null): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function getArray(value: string | null): string[] | undefined {
  if (!value) return undefined;
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function getSort(value: string | null): SortOption | undefined {
  if (value === 'nuevos' || value === 'precio-asc' || value === 'precio-desc') {
    return value;
  }
  return undefined;
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  try {
    const result = await listProducts({
      categoria: sp.get('categoria') ?? undefined,
      talla: getArray(sp.get('talla')),
      color: getArray(sp.get('color')),
      min: getNumber(sp.get('min')),
      max: getNumber(sp.get('max')),
      q: sp.get('q') ?? undefined,
      sort: getSort(sp.get('sort')),
      page: getNumber(sp.get('page')) ?? 1,
    });

    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    console.error('GET /api/products error', err);
    return NextResponse.json(
      { error: 'No se pudo obtener la lista de productos.' },
      { status: 500 },
    );
  }
}
