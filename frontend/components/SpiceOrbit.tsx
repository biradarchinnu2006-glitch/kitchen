"use client";

import { motion } from "framer-motion";

const spices = [
  { label: "Star Anise", radius: 170, duration: 22, size: 34, delay: 0 },
  { label: "Cinnamon", radius: 140, duration: 16, size: 26, delay: -4 },
  { label: "Cardamom", radius: 200, duration: 26, size: 20, delay: -9 },
  { label: "Bay Leaf", radius: 120, duration: 14, size: 22, delay: -2 },
  { label: "Chilli", radius: 190, duration: 20, size: 18, delay: -12 },
];

export default function SpiceOrbit({ size = 460 }: { size?: number }) {
  return (
    <div
      className="relative mx-auto flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Steam rising effect */}
      <div className="absolute left-1/2 top-[5%] -translate-x-1/2 flex gap-3 z-10 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-1.5 h-20 rounded-full bg-gradient-to-t from-cream/0 via-gold/25 to-cream/0 animate-rise"
            style={{ animationDelay: `${i * 0.7}s` }}
          />
        ))}
      </div>

      {/* Central Food Plate (Hyderabadi Chicken Biryani) */}
      <motion.div
        className="absolute rounded-full border border-gold/30 p-1.5 shadow-[0_0_80px_-10px_rgba(201,162,75,0.4)] bg-charcoal/80 backdrop-blur-sm z-20 cursor-pointer overflow-hidden"
        style={{
          width: size * 0.58,
          height: size * 0.58,
        }}
        whileHover={{ 
          scale: 1.05,
          borderColor: "rgba(201,162,75,0.6)",
          boxShadow: "0 0 90px -5px rgba(201,162,75,0.55)"
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden border border-gold/20">
          <img
            src="/images/hero/biryani_hero.png"
            alt="Michelin-star Hyderabadi Chicken Biryani"
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out hover:scale-110"
          />
          {/* Subtle gold overlay vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(10,9,7,0.65))] pointer-events-none" />
        </div>
      </motion.div>

      {/* Orbiting spices */}
      {spices.map((s) => (
        <div
          key={s.label}
          className="absolute left-1/2 top-1/2 animate-orbit z-30"
          style={
            {
              "--r": `${s.radius}px`,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
              marginLeft: -s.size / 2,
              marginTop: -s.size / 2,
            } as React.CSSProperties
          }
        >
          <motion.div
            className="rounded-full bg-gradient-to-br from-gold-bright/35 to-gold/10 border border-gold/45 shadow-[0_0_12px_rgba(201,162,75,0.45)] backdrop-blur-[1px] hover:scale-125 transition-transform"
            style={{ width: s.size, height: s.size }}
            title={s.label}
            whileHover={{ scale: 1.25 }}
          />
        </div>
      ))}
    </div>
  );
}
