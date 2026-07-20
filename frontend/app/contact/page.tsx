"use client";

import { useState } from "react";
import { Phone, Mail, Clock, MapPin, Copy, Check, ChevronDown, Sparkles, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const faqs = [
  {
    q: "Do you offer private event & party catering?",
    a: "Yes! We specialize in bulk dum biryani orders, live tandoori counters, and family gatherings for 20 to 500 guests.",
  },
  {
    q: "Is parking available at the restaurant?",
    a: "Yes, complimentary valet parking is available daily during lunch and dinner hours.",
  },
  {
    q: "How far in advance should I reserve a table?",
    a: "We recommend reserving 2 to 4 hours in advance for weekdays, and 24 hours in advance for weekend dinners.",
  },
  {
    q: "Are vegetarian dishes prepared separately?",
    a: "Absolutely. We maintain 100% segregated cooking vessels, prep counters, and fryers for all pure-vegetarian items.",
  },
];

export default function ContactPage() {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic Open Status (12 PM - 11 PM)
  const currentHour = new Date().getHours();
  const isOpen = currentHour >= 12 && currentHour < 23;

  function copyText(text: string, type: "phone" | "email") {
    navigator.clipboard.writeText(text);
    if (type === "phone") {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  }

  return (
    <section className="pt-32 pb-24 min-h-screen relative overflow-hidden bg-[#090909]">
      {/* Background glow */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[400px] rounded-full bg-saffron/[0.03] blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-gold text-xs uppercase tracking-widest mb-4">
            <Sparkles size={12} /> We&apos;d Love to Hear From You
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-cream mb-4">
            Get in Touch
          </h1>
          <div className="mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mb-4" />
          <p className="text-cream/60 text-sm sm:text-base leading-relaxed">
            Have a question about our menu, reservations, or catering? Reach out directly or send us a message below.
          </p>
        </div>

        {/* Live Status Banner */}
        <div className="mb-12 p-4 rounded-2xl bg-gradient-to-r from-[#1a1610] to-[#12100c] border border-gold/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full animate-ping ${isOpen ? "bg-emerald-400" : "bg-amber-400"}`} />
            <div>
              <span className="text-cream font-semibold text-sm">
                Kitchen Status: {isOpen ? "Open Now" : "Closed Currently"}
              </span>
              <p className="text-cream/50 text-xs">
                {isOpen ? "Daily hours: 12:00 PM – 11:00 PM (Serving Fresh)" : "Reopens today at 12:00 PM"}
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/918712023665"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold hover:bg-[#25D366] hover:text-black transition-all"
          >
            Instant WhatsApp Support
          </a>
        </div>

        {/* Grid: Info + Form */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-cream mb-6">
              Contact Information
            </h2>

            {/* Phone Card */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-gold/30 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-cream/40 font-semibold">
                    Phone / WhatsApp
                  </p>
                  <p className="text-cream font-medium text-base mt-0.5">
                    +91 87120 23665
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyText("+918712023665", "phone")}
                className="p-2 rounded-lg bg-white/5 hover:bg-gold hover:text-charcoal text-cream/60 transition-colors text-xs flex items-center gap-1"
                title="Copy phone"
              >
                {copiedPhone ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-gold/30 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-cream/40 font-semibold">
                    Email Address
                  </p>
                  <p className="text-cream font-medium text-base mt-0.5">
                    info@surekhaskitchen.com
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyText("info@surekhaskitchen.com", "email")}
                className="p-2 rounded-lg bg-white/5 hover:bg-gold hover:text-charcoal text-cream/60 transition-colors text-xs flex items-center gap-1"
                title="Copy email"
              >
                {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>

            {/* Hours Card */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-gold/30 transition-all flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-cream/40 font-semibold">
                  Operating Hours
                </p>
                <p className="text-cream font-medium text-base mt-0.5">
                  Monday – Sunday: 12:00 PM – 11:00 PM
                </p>
              </div>
            </div>

            {/* Address & Map Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#16130f] to-[#0e0c09] border border-gold/20 relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MapPin size={22} className="text-gold" />
                  <div>
                    <h3 className="font-display text-cream font-medium text-lg">Location</h3>
                    <p className="text-cream/60 text-xs mt-0.5">Jubilee Hills / Banjara Hills, Hyderabad, TS</p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold hover:bg-gold hover:text-charcoal transition-all"
                >
                  <Navigation size={12} /> Directions
                </a>
              </div>

              {/* Map Graphic Preview */}
              <div className="aspect-[21/9] rounded-xl bg-[#1a1814] border border-white/10 flex items-center justify-center relative overflow-hidden group">
                <div
                  className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity"
                  style={{
                    backgroundImage: `
                      radial-gradient(#C9A24B 1px, transparent 1px),
                      linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px, 40px 40px, 40px 40px",
                  }}
                />
                <div className="relative z-10 flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-gold/40 text-cream text-xs font-medium shadow-xl">
                  <MapPin size={14} className="text-gold animate-bounce" />
                  Surekha&apos;s Kitchen • Hyderabad
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Component */}
          <ContactForm />
        </div>

        {/* FAQ Section */}
        <div className="pt-12 border-t border-white/[0.08]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="eyebrow text-gold mb-2">Got Questions?</p>
            <h2 className="font-display text-3xl text-cream">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const isOpenItem = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpenItem ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-medium text-cream hover:text-gold transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-gold transition-transform duration-300 ${isOpenItem ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpenItem && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-5 pb-5 text-sm text-cream/60 leading-relaxed border-t border-white/[0.04] pt-3">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
