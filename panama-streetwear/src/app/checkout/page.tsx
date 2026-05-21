import Link from 'next/link';
import { CreditCard, Smartphone, Truck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Finalizar compra',
  description: 'Procesa tu pedido en 507 Street. Yappy, tarjeta y pago contra entrega disponibles.',
};

export default function CheckoutPage() {
  return (
    <div className="container py-16 md:py-24 max-w-3xl">
      <Link
        href="/carrito"
        className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-ink-500 hover:text-ink-950 transition-colors"
      >
        <ArrowLeft className="h-3 w-3" /> Volver al carrito
      </Link>

      <header className="mt-6">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent-500">
          Paso final
        </span>
        <h1 className="mt-2 text-4xl md:text-6xl font-black tracking-tighter">
          Finalizar compra
        </h1>
      </header>

      <div className="mt-10 border border-ink-200 p-8 md:p-12 bg-ink-50">
        <p className="text-xs font-bold uppercase tracking-widest text-accent-600">
          Próximamente
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-black tracking-tight">
          Estamos preparando el pago en línea
        </h2>
        <p className="mt-4 text-ink-700 leading-relaxed">
          La Task 2 conectará los formularios de envío y los siguientes métodos de pago:
        </p>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <Method icon={<Smartphone className="h-5 w-5" />} title="Yappy" desc="Pago instantáneo desde tu app bancaria." />
          <Method icon={<CreditCard className="h-5 w-5" />} title="Tarjeta" desc="Visa, Mastercard y débito con Stripe." />
          <Method icon={<Truck className="h-5 w-5" />} title="Contra entrega" desc="Paga al recibir tu pedido." />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/productos"
            className="inline-flex h-12 items-center px-5 bg-ink-950 text-white text-xs font-bold uppercase tracking-widest hover:bg-accent-500 transition-colors"
          >
            Seguir comprando
          </Link>
          <Link
            href="/carrito"
            className="inline-flex h-12 items-center px-5 border border-ink-950 text-xs font-bold uppercase tracking-widest hover:bg-ink-950 hover:text-white transition-colors"
          >
            Ver carrito
          </Link>
        </div>
      </div>
    </div>
  );
}

function Method({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="border border-ink-200 bg-white p-4">
      <div className="text-accent-500 mb-2">{icon}</div>
      <h3 className="text-sm font-black uppercase tracking-widest">{title}</h3>
      <p className="mt-1 text-xs text-ink-600 leading-relaxed">{desc}</p>
    </div>
  );
}
