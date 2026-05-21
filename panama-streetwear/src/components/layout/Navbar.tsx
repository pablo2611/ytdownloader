'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, Search, User } from 'lucide-react';
import { Sheet } from '@/components/ui/Sheet';
import { CartButton } from './CartButton';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/utils';

const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Hombre', href: '/productos?genero=hombre' },
  { label: 'Mujer', href: '/productos?genero=mujer' },
  { label: 'Nuevos', href: '/productos?nuevos=1' },
  { label: 'Sale', href: '/productos?sale=1' },
  { label: 'Ayuda', href: '/productos?ayuda=1' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/productos?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 bg-white transition-shadow',
        scrolled ? 'shadow-[0_1px_0_0_rgba(10,10,10,0.08)]' : '',
      )}
    >
      <div className="container flex h-16 items-center gap-4">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menú"
          className="lg:hidden p-2 -ml-2"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/" className="flex items-center" aria-label="507 Street home">
          <span className="text-xl font-black tracking-tighter leading-none">
            507<span className="text-accent-500">.</span>STREET
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 ml-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs font-bold uppercase tracking-widest text-ink-900 hover:text-accent-500 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <form
          onSubmit={onSubmitSearch}
          className="hidden md:flex items-center gap-2 border border-ink-200 px-3 h-9 w-56 focus-within:border-ink-950 transition-colors"
        >
          <Search className="h-4 w-4 text-ink-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos"
            className="bg-transparent text-sm flex-1 focus:outline-none placeholder:text-ink-400"
            aria-label="Buscar"
          />
        </form>

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="Buscar"
          className="md:hidden p-2"
        >
          <Search className="h-5 w-5" />
        </button>

        <Link
          href="/productos"
          aria-label="Cuenta"
          className="p-2 hover:text-accent-500 transition-colors"
        >
          <User className="h-5 w-5" />
        </Link>

        <CartButton />
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} links={NAV_LINKS} />

      <Sheet
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        side="bottom"
        title="Buscar"
        className="md:hidden"
      >
        <form onSubmit={onSubmitSearch} className="p-5 space-y-3">
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿Qué buscas?"
            className="h-12 w-full border border-ink-300 px-3 text-base focus:outline-none focus:border-ink-950"
          />
          <button
            type="submit"
            className="h-12 w-full bg-ink-950 text-white text-sm font-bold uppercase tracking-widest"
          >
            Buscar
          </button>
        </form>
      </Sheet>
    </header>
  );
}
