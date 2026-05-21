import { Hero } from '@/components/home/Hero';
import { FeaturedGrid } from '@/components/home/FeaturedGrid';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { BrandStory } from '@/components/home/BrandStory';
import { Newsletter } from '@/components/home/Newsletter';
import { getCategories, getFeaturedProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedProducts(6),
    getCategories(),
  ]);

  return (
    <>
      <Hero />
      <FeaturedGrid products={featured} />
      <CategoryTiles categories={categories} />
      <BrandStory />
      <Newsletter />
    </>
  );
}
