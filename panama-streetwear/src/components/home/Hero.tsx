import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-[78vh] min-h-[520px] max-h-[820px] w-full overflow-hidden bg-ink-950 text-white">
      <Image
        src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1800&q=80&auto=format&fit=crop"
        alt="Modelo con streetwear urbano"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

      <div className="relative h-full container flex flex-col justify-end pb-16 md:pb-24">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent-500 mb-4">
          Colección · Otoño 25
        </span>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] max-w-3xl">
          VESTIDO
          <br />
          PARA EL
          <br />
          <span className="text-accent-500">507</span>
        </h1>
        <p className="mt-6 max-w-xl text-base md:text-lg text-ink-100">
          Streetwear unisex hecho con orgullo panameño. De la 24 de diciembre a la Cinta
          Costera, sin perder estilo.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/productos"
            className="inline-flex h-12 items-center gap-2 bg-accent-500 px-6 text-sm font-bold uppercase tracking-widest text-white hover:bg-accent-600 transition-colors"
          >
            Comprar nueva colección
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/productos?nuevos=1"
            className="inline-flex h-12 items-center gap-2 border border-white/80 px-6 text-sm font-bold uppercase tracking-widest text-white hover:bg-white hover:text-ink-950 transition-colors"
          >
            Ver lo nuevo
          </Link>
        </div>
      </div>
    </section>
  );
}
