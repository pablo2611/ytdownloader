'use client';

import { useState } from 'react';
import { Check, Mail } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Endpoint real llega en Task 2/3 — por ahora solo feedback visual.
    setSubmitted(true);
  };

  return (
    <section className="container py-20">
      <div className="bg-ink-100 px-6 md:px-14 py-14 md:py-20 text-center">
        <Mail className="mx-auto h-8 w-8 mb-4 text-accent-500" />
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
          Únete al club 507
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-ink-700">
          Recibe primero los drops, descuentos exclusivos y eventos en Panamá. Sin spam,
          solo lo bueno.
        </p>

        {submitted ? (
          <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-700">
            <Check className="h-5 w-5" /> ¡Bienvenido al club!
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="h-12 flex-1 border border-ink-300 bg-white px-4 text-sm focus:outline-none focus:border-ink-950"
              aria-label="Correo electrónico"
            />
            <button
              type="submit"
              className="h-12 bg-ink-950 px-6 text-sm font-bold uppercase tracking-widest text-white hover:bg-accent-500 transition-colors"
            >
              Suscribirme
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
