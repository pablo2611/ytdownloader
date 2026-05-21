import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { SerializedCategory } from '@/types';

export interface CategoryTilesProps {
  categories: SerializedCategory[];
}

export function CategoryTiles({ categories }: CategoryTilesProps) {
  return (
    <section className="container py-20">
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent-500 mb-2 inline-block">
          Por categoría
        </span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
          Compra por estilo
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {categories.map((c, i) => (
          <Link
            key={c.id}
            href={`/categoria/${c.slug}`}
            className={cn(
              'group relative aspect-[4/5] overflow-hidden bg-ink-100',
              i === 0 && 'md:col-span-2 md:row-span-2 md:aspect-square',
            )}
          >
            {c.imageUrl && (
              <Image
                src={c.imageUrl}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/0 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7 text-white">
              <h3 className="text-xl md:text-3xl font-black tracking-tighter leading-none mb-1">
                {c.name}
              </h3>
              <span className="text-xs font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100">
                Comprar ahora →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
