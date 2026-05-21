import Link from 'next/link';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Comprar',
    links: [
      { label: 'Camisetas', href: '/categoria/camisetas' },
      { label: 'Hoodies & Sudaderas', href: '/categoria/hoodies' },
      { label: 'Pantalones', href: '/categoria/pantalones' },
      { label: 'Chaquetas', href: '/categoria/chaquetas' },
      { label: 'Accesorios', href: '/categoria/accesorios' },
      { label: 'Sneakers', href: '/categoria/sneakers' },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { label: 'Envíos y entregas', href: '/productos' },
      { label: 'Cambios y devoluciones', href: '/productos' },
      { label: 'Guía de tallas', href: '/productos' },
      { label: 'Métodos de pago', href: '/productos' },
      { label: 'Contacto', href: '/productos' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Nuestra historia', href: '/' },
      { label: 'Tiendas físicas', href: '/' },
      { label: 'Trabaja con nosotros', href: '/' },
      { label: 'Mayorista', href: '/' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-white mt-24">
      <div className="container py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-ink-950 mb-4">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-600 hover:text-ink-950 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-ink-950 mb-4">
              Síguenos
            </h3>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center border border-ink-300 text-ink-700 hover:border-ink-950 hover:text-ink-950 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Twitter"
                className="grid h-10 w-10 place-items-center border border-ink-300 text-ink-700 hover:border-ink-950 hover:text-ink-950 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center border border-ink-300 text-ink-700 hover:border-ink-950 hover:text-ink-950 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-5 text-xs text-ink-500 leading-relaxed">
              507 Street S.A. — Hecho con orgullo en Panamá.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-ink-200 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-ink-500">
              Pagos:
            </span>
            <div className="flex items-center gap-2">
              <PaymentPill label="Yappy" />
              <PaymentPill label="Visa" />
              <PaymentPill label="Mastercard" />
              <PaymentPill label="Pago contra entrega" />
            </div>
          </div>
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} 507 Street. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

function PaymentPill({ label }: { label: string }) {
  return (
    <span className="inline-flex h-7 items-center px-2 border border-ink-200 text-[10px] font-bold uppercase tracking-widest text-ink-700">
      {label}
    </span>
  );
}
