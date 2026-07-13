"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/menu#signature", label: "Special Biryani" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/reservations", label: "Reservations" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-charcoal/80 backdrop-blur-md border-b border-gold/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <Link href="/" className="font-display italic text-xl tracking-wide text-cream">
          Surekha&rsquo;s <span className="text-gold not-italic">Kitchen</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm text-cream/80">
          {links.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="hover:text-gold transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-cream"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden mt-4 px-6 pb-6 flex flex-col gap-4 bg-charcoal/95 border-t border-gold/10">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-cream/80 hover:text-gold pt-4 text-sm"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
