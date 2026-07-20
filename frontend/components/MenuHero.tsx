"use client";

import { motion } from "framer-motion";
import { Sparkles, UtensilsCrossed, Star, Clock } from "lucide-react";

const stats = [
  { icon: UtensilsCrossed, number: "55+", label: "Premium Dishes" },
  { icon: Star, number: "12", label: "Chef Specials" },
  { icon: Clock, number: "15+", label: "Years Legacy" },
  { icon: Sparkles, number: "100%", label: "Fresh Ingredients" },
];

export default function MenuHero() {
  return (
    <section className="relative overflow-hidden bg-[#090909] pt-36 pb-24">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute right-[-10%] top-[-20%] h-[700px] w-[700px] rounded-full bg-[#C8A046]/10 blur-[180px]" />
        <div className="absolute left-[-15%] bottom-[-20%] h-[500px] w-[500px] rounded-full bg-[#8B5E20]/10 blur-[180px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#101010] to-[#090909]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-gold/30 bg-white/5 px-6 py-3 backdrop-blur-xl">
            <Sparkles size={16} className="text-gold" />
            <span className="uppercase tracking-[0.35em] text-xs text-gold">
              Michelin Inspired Cuisine
            </span>
          </div>

          <h1 className="mt-8 font-display text-6xl md:text-7xl xl:text-8xl text-cream">
            Our
            <span className="block bg-gradient-to-r from-[#E0BB66] to-[#D97D2B] bg-clip-text text-transparent">
              Signature Menu
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-cream/70">
            Every dish at Surekha&apos;s Kitchen is crafted with premium
            ingredients, authentic Hyderabadi spices, and recipes perfected over
            generations.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20 grid gap-6 md:grid-cols-4"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(201,162,75,0.3)",
                }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-gold/[0.05] card-glow"
              >
                <Icon className="mb-4 text-gold" size={30} />
                <h2 className="text-4xl font-bold text-gold">{stat.number}</h2>
                <p className="mt-2 text-cream/70">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}