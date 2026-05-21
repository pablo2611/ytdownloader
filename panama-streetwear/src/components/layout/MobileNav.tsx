'use client';

import Link from 'next/link';
import { Sheet } from '@/components/ui/Sheet';

export interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

const SECONDARY_LINKS = [
  { label: 'Camisetas', href: '/categoria/camisetas' },
  { label: 'Hoodies', href: '/categoria/hoodies' },
  { label: 'Pantalones', href: '/categoria/pantalones' },
  { label: 'Chaquetas', href: '/categoria/chaquetas' },
  { label: 'Accesorios', href: '/categoria/accesorios' },
  { label: 'Sneakers', href: '/categoria/sneakers' },
];

export function MobileNav({ open, onClose, links }: MobileNavProps) {
  return (
    <Sheet open={open} onClose={onClose} side="left" title="Menú">
      <nav className="px-5 py-6 space-y-8">
        <ul className="space-y-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={onClose}
                className="block text-2xl font-black uppercase tracking-tight text-ink-950 hover:text-accent-500 transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-ink-500 mb-3">
            Categorías
          </h3>
          <ul className="space-y-3">
            {SECONDARY_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={onClose}
                  className="block text-sm font-semibold text-ink-800 hover:text-accent-500 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-ink-200 pt-6 space-y-3">
          <Link
            href="/carrito"
            onClick={onClose}
            className="block text-sm font-semibold text-ink-800 hover:text-accent-500"
          >
            Ver carrito
          </Link>
          <Link
            href="/checkout"
            onClick={onClose}
            className="block text-sm font-semibold text-ink-800 hover:text-accent-500"
          >
            Finalizar compra
          </Link>
        </div>
      </nav>
    </Sheet>
  );
}
