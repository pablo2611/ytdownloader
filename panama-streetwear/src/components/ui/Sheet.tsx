'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Side = 'right' | 'left' | 'bottom';

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  side?: Side;
  className?: string;
  children: React.ReactNode;
  title?: string;
  ariaLabel?: string;
}

const SIDE_CLASSES: Record<Side, string> = {
  right: 'right-0 top-0 h-full w-full sm:max-w-md translate-x-full data-[open=true]:translate-x-0',
  left: 'left-0 top-0 h-full w-full sm:max-w-md -translate-x-full data-[open=true]:translate-x-0',
  bottom: 'bottom-0 left-0 right-0 max-h-[90vh] translate-y-full data-[open=true]:translate-y-0',
};

export function Sheet({ open, onClose, side = 'right', className, children, title, ariaLabel }: SheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className={cn(
        'fixed inset-0 z-50',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
    >
      <div
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-ink-950/50 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0',
        )}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? title}
        data-open={open}
        className={cn(
          'absolute bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out',
          SIDE_CLASSES[side],
          className,
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
            <h2 className="text-sm font-black uppercase tracking-widest">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="p-1 hover:bg-ink-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
