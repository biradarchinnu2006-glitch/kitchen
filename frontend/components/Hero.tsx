"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Clock } from "lucide-react";
import { whatsappOrderLink } from "@/lib/api";
import SpiceOrbit from "./SpiceOrbit";

export default function Hero() {
  // Generate stable, deterministic positions to prevent Next.js hydration mismatches
  const goldDustParticles = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: `${(i * 7 + 13) % 100}%`,
      top: `${(i * 11 + 7) % 100}%`,
    }));
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#090909]">
      {/* ==========================================
          PREMIUM LUXURY BACKGROUND
         ========================================== */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Gold Glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-15%] top-[-20%] h-[700px] w-[700px] rounded-full bg-[#C8A046]/10 blur-[180px]"
        />

        {/* Left Ambient Glow */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-15%] bottom-[-20%] h-[500px] w-[500px] rounded-full bg-[#8B5E20]/10 blur-[180px]"
        />

        {/* Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#101010] to-[#090909]" />

        {/* Luxury Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />

        {/* Floating Gold Dust */}
        <div className="absolute inset-0">
          {goldDustParticles.map((particle, i) => (
            <motion.span
              key={particle.id}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="absolute h-1 w-1 rounded-full bg-[#D4AF37] blur-[1px]"
              style={{
                left: particle.left,
                top: particle.top,
              }}
            />
          ))}
        </div>

        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.025] bg-[url('/noise.png')]" />
      </div>

      {/* ==========================================
          CONTENT
         ========================================== */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 pt-36 pb-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <h1 className="font-display text-7xl xl:text-8xl leading-[0.95] text-[#F5E6C8]">
              Surekha's
              <span className="block text-[#D4AF37]">Kitchen</span>
            </h1>

            <p className="mt-8 text-3xl italic text-[#D4AF37] font-display">
              Traditional Taste,
              <br />
              Modern Experience.
            </p>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#F5E6C8]/70">
              Experience handcrafted Hyderabadi biryani prepared using authentic spices,
              premium ingredients, and recipes passed down through generations.
            </p>

            {/* STATS */}
            <div className="mt-10 flex flex-wrap gap-10">
              {[
                ["2K+", "Happy Customers"],
                ["25+", "Signature Dishes"],
                ["15", "Years Legacy"],
              ].map(([number, label]) => (
                <div key={label}>
                  <h2 className="text-4xl font-bold text-[#D4AF37]">{number}</h2>
                  <p className="text-[#F5E6C8]/60">{label}</p>
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="mt-12 flex flex-wrap gap-5">
              <a
                href={whatsappOrderLink()}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-[#E8A23A] to-[#D68921] px-8 py-4 font-semibold text-black transition hover:scale-105 hover:shadow-[0_15px_45px_rgba(233,170,40,.35)]"
              >
                Order Now
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </a>

              <Link
                href="/menu"
                className="rounded-full border border-[#D4AF37]/40 px-8 py-4 text-[#F5E6C8] transition hover:bg-[#D4AF37] hover:text-black"
              >
                Explore Menu
              </Link>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <SpiceOrbit />

            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute -bottom-10 left-8 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl px-7 py-5"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-[#D4AF37]/20 p-3">
                  <Clock className="text-[#D4AF37]" size={22} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                    Fresh Every Day
                  </p>
                  <h3 className="text-xl text-[#F5E6C8]">Dum-Sealed Biryani</h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={28} className="text-[#D4AF37]" />
      </motion.div>
    </section>
  );
}