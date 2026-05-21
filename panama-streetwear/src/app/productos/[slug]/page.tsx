import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Truck, Shield, Smartphone } from 'lucide-react';
import { ProductGallery } from '@/components/product/ProductGallery';
import { AddToCartButton } from '@/components/product/AddToCartButton';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/products';
import { formatPrice, discountPercent } from '@/lib/utils';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Producto no encontrado' };
  }
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.categoryId, product.id, 4);
  const discount = discountPercent(product.priceCents, product.compareAtCents);

  return (
    <div className="container py-8 md:py-12">
      <nav
        aria-label="Migas"
        className="text-xs text-ink-500 flex items-center gap-1 flex-wrap mb-6"
      >
        <Link href="/" className="hover:text-ink-950">Inicio</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/productos" className="hover:text-ink-950">Productos</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/categoria/${product.categorySlug}`} className="hover:text-ink-950">
          {product.categoryName}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-ink-700 truncate">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <ProductGallery images={product.images} alt={product.name} />

        <div className="lg:max-w-md">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-500">
            {product.categoryName}
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-black tracking-tighter">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-2 flex-wrap">
            {product.isNew && <Badge variant="dark">Nuevo</Badge>}
            {discount !== null && <Badge variant="accent">-{discount}% Sale</Badge>}
            <Badge variant="outline">Envío gratis sobre B/. 75</Badge>
            <Badge variant="outline">Yappy aceptado</Badge>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-black">
              {formatPrice(product.priceCents)}
            </span>
            {product.compareAtCents && product.compareAtCents > product.priceCents && (
              <span className="text-base text-ink-400 line-through">
                {formatPrice(product.compareAtCents)}
              </span>
            )}
          </div>

          <p className="mt-5 text-ink-700 leading-relaxed">{product.description}</p>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-ink-200 pt-6">
            <Feature icon={<Truck className="h-4 w-4" />} title="Envío rápido" desc="2–4 días en Panamá" />
            <Feature icon={<Smartphone className="h-4 w-4" />} title="Yappy" desc="Pago instantáneo" />
            <Feature icon={<Shield className="h-4 w-4" />} title="Cambios fáciles" desc="14 días" />
          </div>

          <div className="mt-10">
            <Tabs
              items={[
                {
                  value: 'descripcion',
                  label: 'Descripción',
                  content: (
                    <div className="prose prose-sm max-w-none text-ink-700 leading-relaxed">
                      <p>{product.description}</p>
                      <ul className="mt-4 list-disc pl-5 text-sm space-y-1">
                        <li>Diseño unisex, calce {product.sizes.length > 0 ? 'estándar' : 'único'}.</li>
                        <li>Producto auténtico 507 Street.</li>
                        <li>Lavado a máquina con agua fría, evitar secadora.</li>
                      </ul>
                    </div>
                  ),
                },
                {
                  value: 'envios',
                  label: 'Envíos & devoluciones',
                  content: (
                    <div className="text-sm text-ink-700 space-y-3 leading-relaxed">
                      <p>
                        Envío gratis en pedidos superiores a B/. 75 en toda la República
                        de Panamá. Envíos estándar entre 2 y 4 días hábiles.
                      </p>
                      <p>
                        Aceptamos cambios y devoluciones dentro de 14 días desde la entrega.
                        El producto debe estar sin uso, con etiquetas y en empaque original.
                      </p>
                      <p>
                        Para iniciar un cambio escríbenos a{' '}
                        <span className="font-semibold">hola@507street.com</span>.
                      </p>
                    </div>
                  ),
                },
                {
                  value: 'tallas',
                  label: 'Guía de tallas',
                  content: <SizeGuide />,
                },
              ]}
            />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter">
              También te puede gustar
            </h2>
            <Link
              href={`/categoria/${product.categorySlug}`}
              className="text-xs font-bold uppercase tracking-widest hover:text-accent-500"
            >
              Ver todo →
            </Link>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-accent-500 mt-0.5">{icon}</div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest">{title}</p>
        <p className="text-xs text-ink-500">{desc}</p>
      </div>
    </div>
  );
}

function SizeGuide() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b-2 border-ink-950">
            <th className="text-left py-2 px-3 text-xs font-bold uppercase tracking-widest">Talla</th>
            <th className="text-left py-2 px-3 text-xs font-bold uppercase tracking-widest">Pecho (cm)</th>
            <th className="text-left py-2 px-3 text-xs font-bold uppercase tracking-widest">Cintura (cm)</th>
            <th className="text-left py-2 px-3 text-xs font-bold uppercase tracking-widest">Largo (cm)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-ink-200"><td className="py-2 px-3">XS</td><td className="py-2 px-3">86–92</td><td className="py-2 px-3">68–74</td><td className="py-2 px-3">66</td></tr>
          <tr className="border-b border-ink-200"><td className="py-2 px-3">S</td><td className="py-2 px-3">92–98</td><td className="py-2 px-3">74–80</td><td className="py-2 px-3">68</td></tr>
          <tr className="border-b border-ink-200"><td className="py-2 px-3">M</td><td className="py-2 px-3">98–104</td><td className="py-2 px-3">80–86</td><td className="py-2 px-3">70</td></tr>
          <tr className="border-b border-ink-200"><td className="py-2 px-3">L</td><td className="py-2 px-3">104–112</td><td className="py-2 px-3">86–94</td><td className="py-2 px-3">72</td></tr>
          <tr className="border-b border-ink-200"><td className="py-2 px-3">XL</td><td className="py-2 px-3">112–120</td><td className="py-2 px-3">94–102</td><td className="py-2 px-3">74</td></tr>
          <tr><td className="py-2 px-3">XXL</td><td className="py-2 px-3">120–128</td><td className="py-2 px-3">102–110</td><td className="py-2 px-3">76</td></tr>
        </tbody>
      </table>
      <p className="mt-3 text-xs text-ink-500">
        Las medidas son aproximadas. Si tienes dudas escríbenos antes de comprar.
      </p>
    </div>
  );
}
