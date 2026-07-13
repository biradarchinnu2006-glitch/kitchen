"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { whatsappOrderLink } from "@/lib/api";
import SpiceOrbit from "./SpiceOrbit";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-charcoal">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_20%_20%,#C9A24B_0,transparent_45%)]" />

      <div className="mx-auto max-w-7xl w-full px-6 pt-24 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow text-gold mb-5">Family-Run · Est. Hyderabad</p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-cream text-balance">
            Surekha&rsquo;s Kitchen
          </h1>
          <p className="font-display italic text-2xl text-gold mt-4">
            Traditional Taste, Modern Experience.
          </p>
          <p className="mt-6 text-cream/70 max-w-md leading-relaxed">
            Fresh ingredients. Authentic recipes. Cooked with love, the same
            way it&rsquo;s been done in this kitchen for three generations.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={whatsappOrderLink()}
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3 bg-saffron hover:bg-saffron-dark transition-colors rounded-sm text-charcoal font-medium text-sm tracking-wide"
            >
              Order on WhatsApp
            </a>
            <Link
              href="/menu"
              className="px-7 py-3 border border-gold/50 hover:border-gold transition-colors rounded-sm text-cream text-sm tracking-wide"
            >
              Explore Menu
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <SpiceOrbit />
          <p className="text-center text-cream/40 text-xs mt-4 eyebrow">
            Chicken Biryani, Dum-Sealed Daily
          </p>
        </motion.div>
      </div>
    </section>
  );
}
