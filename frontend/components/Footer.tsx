import Link from "next/link";
import {
  Instagram,
  Facebook,
  MessageCircle,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/10 bg-[#0e0c09]">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gold/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <p className="font-display italic text-xl text-cream mb-3">
            Surekha&rsquo;s{" "}
            <span className="text-gold not-italic">Kitchen</span>
          </p>
          <p className="text-cream/50 text-sm leading-relaxed">
            Family-owned, slow-cooked, and proud of it. Serving authentic
            Hyderabadi flavors since 1994.
          </p>
          <div className="flex gap-3 mt-6">
            <a
              href="https://wa.me/918712023665"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-cream/50 hover:text-[#25D366] hover:border-[#25D366]/30 hover:bg-[#25D366]/10 transition-all duration-300"
            >
              <MessageCircle size={16} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-cream/50 hover:text-pink-400 hover:border-pink-400/30 hover:bg-pink-400/10 transition-all duration-300"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-cream/50 hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-400/10 transition-all duration-300"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>

        {/* Hours */}
        <div>
          <p className="eyebrow text-gold mb-4 flex items-center gap-2">
            <Clock size={12} /> Hours
          </p>
          <div className="space-y-2 text-sm text-cream/60">
            <p>Monday &ndash; Sunday</p>
            <p className="text-cream/80 font-medium">
              12:00 PM &ndash; 11:00 PM
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className="eyebrow text-gold mb-4">Quick Links</p>
          <ul className="space-y-2.5 text-sm text-cream/60">
            {[
              { href: "/menu", label: "Menu" },
              { href: "/reservations", label: "Reservations" },
              { href: "/track-order", label: "Track Order" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-gold transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-gold transition-all duration-300" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Reach Us */}
        <div>
          <p className="eyebrow text-gold mb-4">Reach Us</p>
          <div className="space-y-3 text-sm text-cream/60">
            <p className="flex items-center gap-2">
              <Phone size={14} className="text-gold/60" />
              +91 87120 23665
            </p>
            <p className="flex items-center gap-2">
              <Mail size={14} className="text-gold/60" />
              info@surekhaskitchen.com
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-gold/[0.06] py-5 text-center text-xs text-cream/25">
        © {new Date().getFullYear()} Surekha&rsquo;s Kitchen. Made with{" "}
        <span className="text-red-500/70">❤️</span> in Hyderabad. All rights
        reserved.
      </div>
    </footer>
  );
}
