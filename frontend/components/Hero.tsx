"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { whatsappOrderLink } from "@/lib/api";
import SpiceOrbit from "./SpiceOrbit";

const badges = [
  { label: "3rd Generation Recipes", top: "8%", left: "-4%", delay: 0 },
  { label: "Dum-Sealed Daily", top: "78%", left: "2%", delay: 0.15 },
  { label: "100% Fresh Spice Ground", top: "42%", left: "-8%", delay: 0.3 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-charcoal">
      {/* Base ambient radial gold glow */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_20%_20%,#C9A24B_0,transparent_45%)]" />

      {/* Premium gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(201,162,75,0.06),transparent_60%)]" />

      {/* SVG-based Noise/Grain Overlay for tactile premium feel */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="relative mx-auto max-w-7xl w-full px-6 pt-24 grid md:grid-cols-2 gap-16 items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.22em" }}
            transition={{ duration: 1, delay: 0.1 }}
            className="eyebrow text-gold mb-5"
          >
            Family-Run · Est. Hyderabad
          </motion.p>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-cream text-balance">
            Surekha&rsquo;s Kitchen
          </h1>
          <p className="font-display italic text-2xl sm:text-3xl text-gold mt-4">
            Traditional Taste, Modern Experience.
          </p>
          <p className="mt-6 text-cream/70 max-w-md leading-relaxed text-[15px] sm:text-base">
            Fresh ingredients. Authentic recipes. Cooked with love, the same
            way it&rsquo;s been done in this kitchen for three generations.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={whatsappOrderLink()}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden px-7 py-3.5 rounded-full bg-saffron text-charcoal font-medium text-sm tracking-wide shadow-[0_8px_24px_-8px_rgba(217,125,43,0.6)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="absolute inset-0 -translate-x-full bg-saffron-dark transition-transform duration-300 group-hover:translate-x-0" />
              <span className="relative z-10">Order on WhatsApp</span>
            </a>
            <Link
              href="/menu"
              className="group relative overflow-hidden px-7 py-3.5 rounded-full border border-gold/50 text-cream text-sm tracking-wide transition-colors duration-300 hover:text-charcoal"
            >
              <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-300 ease-out group-hover:translate-x-0" />
              <span className="relative z-10">Explore Menu</span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <SpiceOrbit />
          <p className="text-center text-cream/40 text-xs mt-4 eyebrow">
            Chicken Biryani, Dum-Sealed Daily
          </p>

          {/* Floating premium badges */}
          {badges.map((b) => (
            <motion.div
              key={b.label}
              className="hidden lg:block absolute z-10"
              style={{ top: b.top, left: b.left }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [10, -6, 10] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.6 + b.delay },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: b.delay },
              }}
            >
              <span className="inline-flex items-center rounded-full border border-gold/30 bg-charcoal/70 backdrop-blur-md px-3.5 py-1.5 text-[11px] eyebrow text-gold/90 shadow-lg">
                {b.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="eyebrow text-[10px]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
