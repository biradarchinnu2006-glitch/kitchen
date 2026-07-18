"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Facebook, MessageCircle, MapPin, Phone, Mail, Clock } from "lucide-react";

const quickLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/reservations", label: "Reservations" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { href: "https://wa.me/918712023665", label: "WhatsApp", icon: MessageCircle },
  { href: "#", label: "Instagram", icon: Instagram },
  { href: "#", label: "Facebook", icon: Facebook },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/10 bg-charcoal-light overflow-hidden">
      {/* Decorative gold gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <p className="font-display italic text-2xl text-cream mb-4">
            Surekha&rsquo;s{" "}
            <span className="text-gold not-italic">Kitchen</span>
          </p>
          <p className="text-cream/50 text-sm leading-relaxed max-w-xs">
            Family-owned, slow-cooked, and proud of it. Every dish is a love letter from our kitchen to your table.
          </p>
          <div className="flex gap-3 mt-6">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/50 transition-colors"
              >
                <s.icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Hours & Location */}
        <div>
          <p className="eyebrow text-gold mb-5">Visit Us</p>
          <ul className="space-y-3 text-cream/55 text-sm">
            <li className="flex items-start gap-3">
              <Clock size={14} className="text-gold/60 mt-0.5 flex-shrink-0" />
              <span>Daily · 12:00 PM &ndash; 11:00 PM</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={14} className="text-gold/60 mt-0.5 flex-shrink-0" />
              <span>Hyderabad, India</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <p className="eyebrow text-gold mb-5">Quick Links</p>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-sm text-cream/55 hover:text-gold transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-3 h-[1px] bg-gold transition-all duration-300" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Reach Us */}
        <div>
          <p className="eyebrow text-gold mb-5">Reach Us</p>
          <ul className="space-y-3 text-sm text-cream/55">
            <li className="flex items-center gap-3">
              <Phone size={14} className="text-gold/60 flex-shrink-0" />
              <a href="tel:+918712023665" className="hover:text-gold transition-colors">
                +91 87120 23665
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={14} className="text-gold/60 flex-shrink-0" />
              <a href="mailto:info@surekhaskitchen.com" className="hover:text-gold transition-colors">
                info@surekhaskitchen.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/8">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream/25">
            © {new Date().getFullYear()} Surekha&rsquo;s Kitchen. All rights reserved.
          </p>
          <p className="text-xs text-cream/20">
            Crafted with love in Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
}
