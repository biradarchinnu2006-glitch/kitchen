"use client";

import { useState, useEffect } from "react";
import { Search, Clock, CheckCircle2, Flame, Truck, Phone, MessageCircle, Sparkles, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { whatsappOrderLink } from "@/lib/api";

const stages = [
  { id: 1, title: "Order Confirmed", desc: "Received at kitchen counter", icon: CheckCircle2 },
  { id: 2, title: "Dum Cooking", desc: "Sealed clay pot over charcoal flame", icon: Flame },
  { id: 3, title: "Quality Check", desc: "Temperature & raita packing", icon: Sparkles },
  { id: 4, title: "Out for Delivery", desc: "Express delivery partner assigned", icon: Truck },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("SK-8492");
  const [activeStage, setActiveStage] = useState(2);
  const [timeLeft, setTimeLeft] = useState(22);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 1 ? t - 1 : 1));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      setActiveStage(Math.floor(Math.random() * 3) + 2);
    }, 600);
  };

  return (
    <section className="pt-32 pb-24 min-h-screen relative overflow-hidden bg-[#090909]">
      {/* Background Glows */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gold/[0.04] blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs uppercase tracking-widest mb-4">
            <Clock size={12} /> Live Kitchen Tracking
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-cream mb-4">
            Track Your Order
          </h1>
          <div className="mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mb-4" />
          <p className="text-cream/60 text-sm sm:text-base leading-relaxed">
            Enter your Order ID to see real-time dum-cooking progress, kitchen status, and estimated delivery time.
          </p>
        </div>

        {/* Order Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12">
          <div className="relative flex items-center">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. SK-8492"
              className="w-full bg-[#181410] border border-gold/30 rounded-full px-6 py-4 pr-12 text-sm text-cream placeholder:text-cream/30 focus:border-gold outline-none shadow-xl transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 w-10 h-10 rounded-full bg-gold text-charcoal flex items-center justify-center hover:scale-105 transition-transform"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Tracker Panel */}
        <motion.div
          layout
          className="rounded-3xl border border-gold/30 bg-gradient-to-b from-[#1b1712] via-[#14110d] to-[#0e0c09] p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8"
        >
          {/* Top Bar Summary */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-[10px] text-cream/40 uppercase tracking-widest font-bold">Active Order</span>
              <h2 className="font-display text-2xl text-cream font-bold">{orderId}</h2>
              <p className="text-xs text-gold mt-0.5">Special Chicken Dum Biryani (Family Pack)</p>
            </div>

            <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 px-5 py-3 rounded-2xl">
              <Clock size={24} className="text-gold animate-pulse" />
              <div>
                <span className="text-2xl font-bold text-cream font-display">{timeLeft} Mins</span>
                <p className="text-[10px] text-cream/50 uppercase tracking-wider">Est. Delivery Time</p>
              </div>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="py-4">
            <div className="grid sm:grid-cols-4 gap-4 relative">
              {stages.map((stg) => {
                const Icon = stg.icon;
                const isPassed = stg.id <= activeStage;
                const isCurrent = stg.id === activeStage;

                return (
                  <div
                    key={stg.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? "bg-gold/15 border-gold shadow-lg shadow-gold/20 scale-105"
                        : isPassed
                        ? "bg-white/[0.04] border-gold/40 text-cream/90"
                        : "bg-white/[0.02] border-white/5 opacity-40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isCurrent
                            ? "bg-gold text-charcoal font-bold animate-bounce"
                            : isPassed
                            ? "bg-gold/20 text-gold"
                            : "bg-white/5 text-cream/30"
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <span className="text-[10px] font-bold text-gold/80">Stage 0{stg.id}</span>
                    </div>

                    <h4 className="font-display text-sm text-cream font-semibold">{stg.title}</h4>
                    <p className="text-[11px] text-cream/50 mt-1 leading-tight">{stg.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Location & Direct Driver Action */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-cream/70">
              <MapPin size={16} className="text-gold" />
              <span>Delivering to: <strong>Jubilee Hills, Road No 36, Hyderabad</strong></span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={whatsappOrderLink(`Order ${orderId}`)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold hover:bg-[#25D366] hover:text-black transition-all"
              >
                <MessageCircle size={14} /> WhatsApp Support
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
