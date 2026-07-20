"use client";

import { useState } from "react";
import { Users, Flame, Sparkles, ShoppingBag, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { whatsappOrderLink } from "@/lib/api";
import { getDishImage } from "@/lib/dishImages";

const spiceOptions = [
  { id: "mild", label: "Mild & Saffron", emoji: "🌱", desc: "Aromatic & smooth for kids & elders" },
  { id: "medium", label: "Authentic Dum", emoji: "🌶️", desc: "Classic Hyderabadi signature balance" },
  { id: "spicy", label: "Volcanic Hot", emoji: "🔥", desc: "Extra red chili & black pepper kick" },
];

export default function PartyEstimator() {
  const [guests, setGuests] = useState(6);
  const [spice, setSpice] = useState("medium");
  const [vegOption, setVegOption] = useState<"non-veg" | "veg">("non-veg");

  // Calculations
  const biryaniKg = Math.ceil(guests * 0.35 * 10) / 10;
  const starterPortions = Math.ceil(guests / 3);
  const pricePerPerson = vegOption === "veg" ? 180 : 260;
  const totalPrice = guests * pricePerPerson;

  const starterName = vegOption === "veg" ? "Paneer Tikka & Crispy Corn" : "Chicken 65 & Tandoori Chicken";
  const biryaniName = vegOption === "veg" ? "Special Veg Dum Biryani" : "Chicken Dum Biryani";

  const message = `Hello Surekha's Kitchen! I would like to order a Custom Party Pack for ${guests} guests (${vegOption.toUpperCase()}, Spice: ${spice.toUpperCase()}). Includes approx ${biryaniKg} KG Dum Biryani + ${starterName}. Total estimate: ₹${totalPrice}.`;
  const whatsappUrl = `https://wa.me/918712023665?text=${encodeURIComponent(message)}`;

  return (
    <section className="py-24 bg-gradient-to-b from-[#0c0a08] via-[#14100c] to-[#090909] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-gold/[0.04] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-saffron/[0.04] blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs uppercase tracking-widest mb-4">
            <Sparkles size={14} /> Interactive Party Calculator
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-cream mb-4">
            Party Biryani & Portion Estimator
          </h2>
          <div className="mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mb-4" />
          <p className="text-cream/60 text-sm sm:text-base leading-relaxed">
            Planning a gathering? Select your guest count and flavor preference for instant quantity calculations and personalized chef recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Controls Panel */}
          <div className="lg:col-span-7 space-y-8 p-8 rounded-3xl bg-gradient-to-b from-[#1a1611] to-[#120f0b] border border-gold/25 shadow-2xl relative">
            {/* Veg / Non-Veg Toggle */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream/60 mb-3 font-semibold">
                1. Dietary Preference
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setVegOption("non-veg")}
                  className={`p-3.5 rounded-2xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    vegOption === "non-veg"
                      ? "bg-red-500/20 text-red-400 border-red-500/50 shadow-lg shadow-red-500/10"
                      : "bg-white/[0.03] text-cream/60 border-white/10 hover:border-white/20"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Non-Veg Special
                </button>
                <button
                  type="button"
                  onClick={() => setVegOption("veg")}
                  className={`p-3.5 rounded-2xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    vegOption === "veg"
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-lg shadow-emerald-500/10"
                      : "bg-white/[0.03] text-cream/60 border-white/10 hover:border-white/20"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Pure Veg Feast
                </button>
              </div>
            </div>

            {/* Guest Count Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs uppercase tracking-wider text-cream/60 font-semibold flex items-center gap-2">
                  <Users size={14} className="text-gold" /> 2. Number of Guests
                </label>
                <span className="text-2xl font-bold text-gold font-display">{guests} People</span>
              </div>
              <input
                type="range"
                min={2}
                max={40}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full h-2.5 bg-black/60 rounded-lg appearance-none cursor-pointer accent-[#C9A24B]"
              />
              <div className="flex justify-between text-[11px] text-cream/40 mt-2">
                <span>2 Guests (Duo)</span>
                <span>10 Guests (Family)</span>
                <span>25 Guests (Party)</span>
                <span>40 Guests (Grand Feast)</span>
              </div>
            </div>

            {/* Spice Option Buttons */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream/60 mb-3 font-semibold flex items-center gap-2">
                <Flame size={14} className="text-gold" /> 3. Spice Level
              </label>
              <div className="grid sm:grid-cols-3 gap-3">
                {spiceOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSpice(opt.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      spice === opt.id
                        ? "bg-gold/15 border-gold text-gold shadow-lg shadow-gold/10"
                        : "bg-white/[0.03] border-white/10 text-cream/70 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{opt.label}</span>
                      <span>{opt.emoji}</span>
                    </div>
                    <p className="text-[10px] opacity-60 leading-tight">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Visual Card */}
          <div className="lg:col-span-5">
            <motion.div
              layout
              className="p-8 rounded-3xl bg-gradient-to-b from-[#211b14] via-[#17130e] to-[#0e0c08] border border-gold/40 shadow-2xl relative overflow-hidden space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] text-gold uppercase tracking-widest font-bold">Recommended Pack</span>
                  <h3 className="font-display text-2xl text-cream">{biryaniName} Pack</h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gold">₹{totalPrice}</span>
                  <p className="text-[10px] text-cream/40">~₹{pricePerPerson}/person</p>
                </div>
              </div>

              {/* Recommended Items */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <img
                    src={getDishImage(biryaniName)}
                    alt={biryaniName}
                    className="w-14 h-14 rounded-xl object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="font-display text-sm text-cream">{biryaniName}</h4>
                    <p className="text-xs text-gold font-medium mt-0.5">Approx. {biryaniKg} KG Dum Biryani</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <img
                    src={getDishImage(starterName)}
                    alt={starterName}
                    className="w-14 h-14 rounded-xl object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="font-display text-sm text-cream">{starterName}</h4>
                    <p className="text-xs text-cream/60 mt-0.5">{starterPortions} Large Appetizer Portions</p>
                  </div>
                </div>
              </div>

              {/* Inclusions checklist */}
              <div className="space-y-1.5 text-xs text-cream/70 border-t border-white/10 pt-4">
                <p className="flex items-center gap-2"><Check size={14} className="text-gold" /> Includes Mirchi Ka Salan & Raita</p>
                <p className="flex items-center gap-2"><Check size={14} className="text-gold" /> Hot Thermal Dum Packaging</p>
                <p className="flex items-center gap-2"><Check size={14} className="text-gold" /> Guaranteed On-Time Delivery</p>
              </div>

              {/* CTA WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-saffron to-saffron-dark hover:from-saffron-dark hover:to-saffron text-charcoal font-bold text-sm py-4 rounded-2xl shadow-xl shadow-saffron/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <ShoppingBag size={18} /> Order Custom Party Pack on WhatsApp <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
