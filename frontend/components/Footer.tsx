import Link from "next/link";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-charcoal-light">
      <div className="mx-auto max-w-7xl px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="font-display italic text-xl text-cream mb-3">
            Surekha&rsquo;s <span className="text-gold not-italic">Kitchen</span>
          </p>
          <p className="text-cream/50 text-sm leading-relaxed">
            Family-owned, slow-cooked, and proud of it.
          </p>
        </div>

        <div>
          <p className="eyebrow text-gold mb-4">Hours</p>
          <p className="text-cream/60 text-sm">Daily · 12:00 PM &ndash; 11:00 PM</p>
        </div>

        <div>
          <p className="eyebrow text-gold mb-4">Quick Links</p>
          <ul className="space-y-2 text-sm text-cream/60">
            <li><Link href="/menu" className="hover:text-gold">Menu</Link></li>
            <li><Link href="/reservations" className="hover:text-gold">Reservations</Link></li>
            <li><Link href="/about" className="hover:text-gold">About</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold mb-4">Reach Us</p>
          <p className="text-cream/60 text-sm">+91 87120 23665</p>
          <p className="text-cream/60 text-sm mt-1">info@surekhaskitchen.com</p>
          <div className="flex gap-4 mt-4 text-cream/50">
            <a href="https://wa.me/918712023665" aria-label="WhatsApp"><MessageCircle size={18} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gold/10 py-5 text-center text-xs text-cream/30">
        © {new Date().getFullYear()} Surekha&rsquo;s Kitchen. All rights reserved.
      </div>
    </footer>
  );
}
