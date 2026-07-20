"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { whatsappOrderLink } from "@/lib/api";
import SpiceOrbit from "./SpiceOrbit";

export default function SignatureDish() {
  return (
    <section
      id="signature"
      className="relative py-28 bg-charcoal-light overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/[0.04] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-saffron/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <SpiceOrbit />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Glass card background */}
          <div className="absolute -inset-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm -z-10" />

          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={16} className="text-gold" />
            <p className="eyebrow text-gold">Chef&rsquo;s Recommendation</p>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl text-cream text-balance">
            Special Chicken{" "}
            <span className="text-gold">Biryani</span>
          </h2>

          {/* Gold accent line */}
          <div className="mt-4 w-16 h-0.5 bg-gradient-to-r from-gold to-transparent" />

          <p className="text-cream/60 mt-6 leading-relaxed max-w-md">
            Marinated overnight, layered with saffron rice and sealed with a
            dough lid so the steam never escapes. Two hours over a low flame,
            finished tableside.
          </p>

          <div className="flex items-center gap-6 mt-8 text-sm text-cream/50">
            <span className="text-2xl font-bold text-gold">₹320</span>
            <span className="w-1 h-1 rounded-full bg-cream/30" />
            <span>Serves 1&ndash;2</span>
            <span className="w-1 h-1 rounded-full bg-cream/30" />
            <span>Medium spice 🌶️🌶️</span>
          </div>

          <a
            href={whatsappOrderLink("Special Chicken Biryani")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-gradient-to-r from-saffron to-saffron-dark hover:from-saffron-dark hover:to-saffron transition-all rounded-full text-charcoal font-semibold text-sm tracking-wide hover:scale-105 hover:shadow-lg hover:shadow-saffron/20 active:scale-95"
          >
            Order Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
