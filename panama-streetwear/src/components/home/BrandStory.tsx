import Image from 'next/image';
import Link from 'next/link';

export function BrandStory() {
  return (
    <section className="bg-ink-950 text-white py-20">
      <div className="container grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1542406775-ade58c52d2e4?w=1200&q=80&auto=format&fit=crop"
            alt="Calles de Panamá con cultura urbana"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="max-w-xl">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent-500">
            Nuestra historia
          </span>
          <h2 className="mt-3 text-4xl md:text-6xl font-black tracking-tighter leading-[0.9]">
            Hecho en el<br />
            <span className="text-accent-500">istmo</span>
          </h2>
          <div className="mt-6 space-y-4 text-ink-100 leading-relaxed">
            <p>
              507 Street nació de la mezcla. Mezcla de culturas, ritmos, idiomas y gente que
              cruza el canal todos los días. Diseñamos ropa que vive en esa intersección.
            </p>
            <p>
              Cada pieza está pensada para el clima del trópico y la energía de la ciudad.
              Cortes amplios, tejidos pesados, paleta urbana. Nada sobra.
            </p>
            <p>
              Producimos en lotes pequeños, con materiales premium. Apoyamos talleres
              locales y diseñadores panameños emergentes.
            </p>
          </div>

          <Link
            href="/productos"
            className="mt-8 inline-flex items-center gap-2 border border-white px-6 h-12 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-ink-950 transition-colors"
          >
            Explorar la colección →
          </Link>
        </div>
      </div>
    </section>
  );
}
