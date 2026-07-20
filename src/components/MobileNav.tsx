"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Small-screen navigation: a hamburger toggling a flat link panel. Desktop
// uses the CSS-only dropdown groups in Nav.tsx; this only renders below sm.
export function MobileNav({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-lg border border-ifa-border bg-transparent"
      >
        <span aria-hidden className={`h-[2px] w-4 rounded bg-ifa-cream transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
        <span aria-hidden className={`h-[2px] w-4 rounded bg-ifa-cream transition-opacity ${open ? "opacity-0" : ""}`} />
        <span aria-hidden className={`h-[2px] w-4 rounded bg-ifa-cream transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
      </button>
      {open && (
        <div id={menuId} className="absolute left-0 right-0 top-full border-b border-ifa-border bg-ifa-deep shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-2 gap-x-2 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === l.href ? "page" : undefined}
                className="rounded-lg px-3 py-2.5 text-[14px] text-ifa-cream/90 hover:bg-ifa-gold/[0.08] hover:text-ifa-gold aria-[current=page]:bg-ifa-gold/[0.1] aria-[current=page]:text-ifa-gold"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
