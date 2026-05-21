'use client';

import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const safeImages = images.length > 0 ? images : ['https://picsum.photos/seed/placeholder/800/1000'];
  const current = safeImages[active] ?? safeImages[0];

  return (
    <div className="flex gap-3 md:gap-4">
      {/* Thumbs verticales en desktop */}
      <div className="hidden md:flex flex-col gap-3 w-20 shrink-0">
        {safeImages.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Ver imagen ${i + 1}`}
            className={cn(
              'relative aspect-[4/5] w-full overflow-hidden border-2 transition-colors',
              active === i ? 'border-ink-950' : 'border-transparent hover:border-ink-300',
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Imagen principal */}
      <div className="flex-1 min-w-0">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-100">
          {current && (
            <Image
              src={current}
              alt={alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          )}
        </div>

        {/* Swipe / dots en mobile */}
        <div className="md:hidden mt-3 flex items-center justify-center gap-2">
          {safeImages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Imagen ${i + 1}`}
              className={cn(
                'h-1.5 transition-all',
                active === i ? 'w-6 bg-ink-950' : 'w-1.5 bg-ink-300',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
