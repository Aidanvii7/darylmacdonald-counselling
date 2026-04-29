"use client";

import { useState } from "react";

const links = [
  { href: "#approach", label: "Approach" },
  { href: "#about", label: "About" },
  { href: "#sessions", label: "Sessions" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-ink/10">
      <div className="max-w-[1200px] mx-auto px-8 py-6 flex justify-between items-center">
        <a href="#top" className="no-underline">
          <div className="font-serif text-2xl text-ink tracking-tight">
            Daryl <span className="italic text-accent">MacDonald</span>
          </div>
          <div className="text-[0.65rem] tracking-[0.3em] uppercase text-muted mt-0.5">
            Counsellor — Glasgow
          </div>
        </a>

        <div className="hidden md:flex gap-10 items-center">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs tracking-[0.15em] uppercase text-ink hover:text-accent transition-colors no-underline"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden w-8 h-8 flex items-center justify-center bg-transparent border-0 cursor-pointer"
        >
          <span className="relative w-5 h-px bg-ink block">
            <span className="absolute w-full h-px bg-ink -top-1.5 left-0" />
            <span className="absolute w-full h-px bg-ink top-1.5 left-0" />
          </span>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink/10 px-8 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-xs tracking-[0.15em] uppercase text-ink hover:text-accent transition-colors no-underline"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
