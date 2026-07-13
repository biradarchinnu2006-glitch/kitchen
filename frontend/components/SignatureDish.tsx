"use client";

import { motion } from "framer-motion";
import { whatsappOrderLink } from "@/lib/api";
import SpiceOrbit from "./SpiceOrbit";

export default function SignatureDish() {
  return (
    <section id="signature" className="relative py-28 bg-charcoal-light overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <SpiceOrbit size={380} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow text-gold mb-4">Chef&rsquo;s Recommendation</p>
          <h2 className="font-display text-4xl sm:text-5xl text-cream text-balance">
            Special Chicken Biryani
          </h2>
          <p className="text-cream/60 mt-6 leading-relaxed max-w-md">
            Marinated overnight, layered with saffron rice and sealed with a
            dough lid so the steam never escapes. Two hours over a low flame,
            finished tableside.
          </p>
          <div className="flex items-center gap-6 mt-8 text-sm text-cream/50">
            <span>₹320</span>
            <span className="w-1 h-1 rounded-full bg-cream/30" />
            <span>Serves 1&ndash;2</span>
            <span className="w-1 h-1 rounded-full bg-cream/30" />
            <span>Medium spice</span>
          </div>
          <a
            href={whatsappOrderLink("Special Chicken Biryani")}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-8 px-7 py-3 bg-saffron hover:bg-saffron-dark transition-colors rounded-sm text-charcoal font-medium text-sm tracking-wide"
          >
            Order Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
