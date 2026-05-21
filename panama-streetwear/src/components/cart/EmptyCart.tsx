import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-6">
      <div className="h-20 w-20 grid place-items-center bg-ink-100 mb-6">
        <ShoppingBag className="h-8 w-8 text-ink-500" />
      </div>
      <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-3">
        Tu carrito está vacío
      </h1>
      <p className="max-w-md text-ink-600 mb-8">
        Aún no has agregado nada. Explora la nueva colección y encuentra tu próxima
        pieza favorita.
      </p>
      <Link
        href="/productos"
        className="inline-flex h-12 items-center px-6 bg-ink-950 text-white text-sm font-bold uppercase tracking-widest hover:bg-accent-500 transition-colors"
      >
        Empezar a comprar
      </Link>
    </div>
  );
}
