import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container py-24 text-center max-w-xl">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-500">Error 404</p>
      <h1 className="mt-3 text-6xl md:text-8xl font-black tracking-tighter">
        Página no<br />encontrada
      </h1>
      <p className="mt-6 text-ink-600">
        La página que buscas no existe o fue movida. Pero aquí abajo está toda nuestra
        colección esperando por ti.
      </p>
      <Link
        href="/productos"
        className="mt-8 inline-flex h-12 items-center px-6 bg-ink-950 text-white text-xs font-bold uppercase tracking-widest hover:bg-accent-500 transition-colors"
      >
        Explorar productos
      </Link>
    </div>
  );
}
