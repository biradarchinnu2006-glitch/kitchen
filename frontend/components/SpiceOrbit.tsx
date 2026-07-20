"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Clock } from "lucide-react";

export default function SpiceOrbit() {
  return (
    <div className="relative mx-auto flex items-center justify-center w-full max-w-[650px] aspect-square">

      {/* Ambient Glow */}
      <div className="absolute w-[130%] h-[130%] rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.14),transparent_70%)] blur-3xl" />

      {/* Decorative Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[112%] h-[112%] rounded-full border border-gold/10"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 90,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[96%] h-[96%] rounded-full border border-gold/15"
      />

      {/* Image Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.35 },
        }}
        className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#111] shadow-[0_40px_80px_rgba(0,0,0,.55)]"
      >
        <Image
          src="/images/biryani.png"
          alt="Hyderabadi Chicken Dum Biryani"
          width={620}
          height={620}
          priority
          className="object-cover"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

        {/* Caption */}
        <div className="absolute bottom-8 left-8">
          <p className="uppercase tracking-[0.35em] text-[11px] text-gold">
            Chef Signature
          </p>

          <h2 className="mt-2 font-display text-4xl text-cream">
            Hyderabadi
            <br />
            Dum Biryani
          </h2>
        </div>
      </motion.div>

      {/* Chef Choice Badge */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute top-8 right-0"
      >
        <div className="rounded-full border border-gold/30 bg-black/70 backdrop-blur-xl px-5 py-3">
          <div className="flex items-center gap-2">
            <Sparkles
              size={14}
              className="text-gold"
            />

            <span className="text-[11px] uppercase tracking-[0.28em] text-gold">
              Chef's Choice
            </span>
          </div>
        </div>
      </motion.div>

      {/* Fresh Card */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute -bottom-4 left-8"
      >
        <div className="rounded-2xl border border-white/10 bg-black/65 backdrop-blur-2xl px-6 py-4 shadow-xl">
          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
              <Clock
                size={22}
                className="text-gold"
              />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
                Fresh Every Day
              </p>

              <h3 className="mt-1 text-2xl font-display text-cream">
                Dum-Sealed Biryani
              </h3>
            </div>

          </div>
        </div>
      </motion.div>

    </div>
  );
}