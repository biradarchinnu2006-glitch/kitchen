"use client";

import { FormEvent, useState } from "react";
import { Send, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { submitContactMessage } from "@/lib/api";

const inquiryTypes = [
  "General Inquiry",
  "Table Reservation",
  "Party / Bulk Order",
  "Feedback",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Please provide your name.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setError("Please provide a valid email address.");
      return;
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      setError("Please write a message (at least 10 characters).");
      return;
    }

    setError(null);
    setStatus("submitting");

    try {
      await submitContactMessage({
        name: form.name,
        email: form.email,
        message: `[${form.subject}] ${form.message}${form.phone ? ` (Phone: ${form.phone})` : ""}`,
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-gold/40 bg-gradient-to-b from-[#1b1712] to-[#12100d] p-8 text-center shadow-2xl h-full flex flex-col items-center justify-center min-h-[380px]"
      >
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="font-display text-2xl text-gold mb-2">Message Sent Successfully!</h3>
        <p className="text-cream/70 text-sm max-w-sm mb-6 leading-relaxed">
          Thank you for reaching out to Surekha&apos;s Kitchen. Our team will get back to you within 2 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="px-6 py-2.5 rounded-full border border-gold/30 text-gold text-xs uppercase tracking-wider hover:bg-gold hover:text-charcoal transition-all"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#181410] to-[#110f0c] p-6 sm:p-8 space-y-5 shadow-xl relative">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-2">
        <h3 className="font-display text-xl text-cream flex items-center gap-2">
          <MessageSquare size={18} className="text-gold" /> Send a Message
        </h3>
        <span className="text-[11px] text-cream/40">* Required fields</span>
      </div>

      {/* Inquiry Type Chips */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-cream/60 mb-2">
          Inquiry Type
        </label>
        <div className="flex flex-wrap gap-2">
          {inquiryTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setForm({ ...form, subject: type })}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-all ${
                form.subject === type
                  ? "bg-gold text-charcoal font-semibold shadow-md"
                  : "bg-white/[0.04] text-cream/60 hover:bg-white/[0.08] border border-white/5"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1.5">
            Your Name *
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Surekha Reddy"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream placeholder:text-cream/25 focus:border-gold/50 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="surekha@example.com"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream placeholder:text-cream/25 focus:border-gold/50 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1.5">
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+91 98765 43210"
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream placeholder:text-cream/25 focus:border-gold/50 focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1.5">
          Your Message *
        </label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="How can we help you today? Ask about catering, reservations, or menu items..."
          rows={4}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream placeholder:text-cream/25 focus:border-gold/50 focus:outline-none transition-colors resize-none"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-saffron text-xs bg-saffron/10 p-3 rounded-xl border border-saffron/20">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-saffron to-saffron-dark hover:from-saffron-dark hover:to-saffron text-charcoal font-semibold text-sm py-4 rounded-xl shadow-lg shadow-saffron/20 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
      >
        <Send size={16} />
        {status === "submitting" ? "Sending Message..." : "Submit Message"}
      </button>
    </form>
  );
}
