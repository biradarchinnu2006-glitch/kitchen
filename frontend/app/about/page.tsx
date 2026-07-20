import type { Metadata } from "next";
import { Sparkles, Utensils, Flame, Heart, Award } from "lucide-react";

export const metadata: Metadata = { title: "About Us — Surekha's Kitchen" };

const stats = [
  { value: "32+", label: "Years of Culinary Heritage", sub: "Since 1994" },
  { value: "100%", label: "Authentic Hyderabadi Dum", sub: "Cooked fresh daily" },
  { value: "16", label: "Hand-Roasted Whole Spices", sub: "Zero artificial flavors" },
  { value: "50K+", label: "Happy Regular Customers", sub: "Across Hyderabad" },
];

const pillars = [
  {
    icon: Flame,
    title: "Dum-Cooking Tradition",
    text: "Slow-cooked over natural charcoal in heavy dough-sealed pots so every grain of rice absorbs the deep marrow and spice aromas.",
  },
  {
    icon: Sparkles,
    title: "Daily Fresh Masalas",
    text: "No pre-packaged pastes. Whole cardamoms, cloves, mace, and Kashmiri chilies are dry roasted and stone-ground fresh every morning.",
  },
  {
    icon: Heart,
    title: "Home-Style Hospitality",
    text: "Founded by Chef Surekha with recipes passed down through three generations. Cooked with the same care we serve to our own family.",
  },
];

const timeline = [
  {
    year: "1994",
    title: "The Home Stove",
    text: "Surekha starts cooking biryani for neighbourhood gatherings in Jubilee Hills, one clay pot at a time.",
  },
  {
    year: "2008",
    title: "First Kitchen Outlet",
    text: "The demand grows beyond home dabbas. The first dedicated kitchen opens, keeping hand-ground recipes intact.",
  },
  {
    year: "2019",
    title: "Fine Dining Expansion",
    text: "A 100-seat flagship dining space opens with live tandoor and family booths.",
  },
  {
    year: "2026",
    title: "Digital Dining Experience",
    text: "Bringing traditional taste to modern tables with online reservations, direct delivery, and digital order tracking.",
  },
];

export default function AboutPage() {
  return (
    <section className="pt-32 pb-24 min-h-screen relative overflow-hidden bg-[#090909]">
      {/* Background glow */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] rounded-full bg-saffron/[0.03] blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-gold text-xs uppercase tracking-widest mb-4">
            <Award size={12} /> Three Generations of Flavor
          </div>
          <h1 className="font-display text-4xl sm:text-6xl text-cream mb-4">
            Our Story & Legacy
          </h1>
          <div className="mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mb-6" />
          <p className="text-cream/70 text-base sm:text-lg leading-relaxed">
            Surekha&apos;s Kitchen is built on a simple promise: cook the way you would for your own family, with uncompromised freshness, authentic spices, and absolute warmth.
          </p>
        </div>

        {/* Highlight Image Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-gold/20 mb-20 shadow-2xl">
          <div className="grid md:grid-cols-2 bg-gradient-to-r from-[#17140e] via-[#12100b] to-[#0e0c08] items-center">
            <div className="p-8 md:p-12 space-y-4">
              <span className="text-xs uppercase tracking-widest text-gold font-bold">
                Master Recipe • Sealed Dum
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-cream">
                Where Spice Meets Soul
              </h2>
              <p className="text-cream/60 text-sm leading-relaxed">
                Every morning at 6:00 AM, our kitchen hums with the crackle of whole cinnamon, cloves, and mace being stone-ground into fresh masala. No artificial colors, no frozen meats, and no shortcuts.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs text-gold">
                <span className="flex items-center gap-1"><Utensils size={14} /> 100% Dum Cooked</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Flame size={14} /> Clay Tandoor</span>
              </div>
            </div>
            <div className="relative h-64 md:h-full min-h-[300px]">
              <img
                src="/gallery/biryani_seal.png"
                alt="Surekha Kitchen Biryani Dum Seal"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#17140e] via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-gold/30 transition-all text-center group"
            >
              <p className="text-3xl sm:text-4xl font-bold font-display text-gold group-hover:scale-110 transition-transform">
                {s.value}
              </p>
              <p className="text-cream text-xs font-semibold mt-2">{s.label}</p>
              <p className="text-cream/40 text-[11px] mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Culinary Pillars */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="eyebrow text-gold mb-2">Our Standards</p>
            <h2 className="font-display text-3xl text-cream">The Culinary Pillars</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="p-8 rounded-3xl bg-gradient-to-b from-[#181410] to-[#100e0b] border border-white/[0.08] hover:border-gold/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-xl text-cream mb-3">{p.title}</h3>
                  <p className="text-cream/60 text-sm leading-relaxed">{p.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="pt-12 border-t border-white/[0.08]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="eyebrow text-gold mb-2">The Journey</p>
            <h2 className="font-display text-3xl text-cream">Milestones Over Time</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-gold/20 transition-all relative flex flex-col justify-between"
              >
                <div>
                  <span className="font-display text-3xl text-gold font-bold">{item.year}</span>
                  <h3 className="font-display text-lg text-cream mt-2 mb-2">{item.title}</h3>
                  <p className="text-cream/60 text-xs leading-relaxed">{item.text}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/[0.05] text-[10px] text-gold uppercase tracking-wider">
                  Chapter 0{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
