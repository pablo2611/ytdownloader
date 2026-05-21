import { NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/products';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const product = await getProductBySlug(params.slug);
    if (!product) {
      return NextResponse.json({ error: 'Producto no encontrado.' }, { status: 404 });
    }
    return NextResponse.json(product, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    console.error('GET /api/products/[slug] error', err);
    return NextResponse.json(
      { error: 'No se pudo obtener el producto.' },
      { status: 500 },
    );
  }
}
