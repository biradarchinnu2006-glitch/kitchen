"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, Calendar, Clock, Users, Utensils, Sparkles } from "lucide-react";
import { submitReservation } from "@/lib/api";
import { ReservationPayload } from "@/lib/types";

const timeSlots = {
  lunch: ["12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM"],
  dinner: ["07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM"],
};

const seatingAreas = [
  { id: "indoor", name: "Main Indoor Dining", desc: "Warm cozy ambiance" },
  { id: "terrace", name: "Terrace Garden", desc: "Open-air starry view" },
  { id: "vip", name: "Family VIP Alcove", desc: "Private group booth" },
];

const guestOptions = [1, 2, 4, 6, 8, 10, 12];

const initial: ReservationPayload = {
  name: "",
  phone: "",
  guests: 2,
  date: new Date().toISOString().split("T")[0],
  time: "08:00 PM",
  specialRequest: "",
};

export default function ReservationForm() {
  const [form, setForm] = useState<ReservationPayload>(initial);
  const [seating, setSeating] = useState("indoor");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function validate(): string | null {
    if (form.name.trim().length < 2) return "Please enter your full name.";
    if (!/^\+?[0-9]{10,13}$/.test(form.phone.replace(/\s/g, "")))
      return "Please enter a valid 10-digit phone number.";
    if (form.guests < 1 || form.guests > 20) return "Guest count must be between 1 and 20.";
    if (!form.date) return "Please select a date.";
    if (!form.time) return "Please select a preferred time slot.";
    return null;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setStatus("submitting");

    const payload: ReservationPayload = {
      ...form,
      specialRequest: `${seatingAreas.find((s) => s.id === seating)?.name || seating}${
        form.specialRequest ? ` — ${form.specialRequest}` : ""
      }`,
    };

    try {
      await submitReservation(payload);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="border border-gold/40 bg-gradient-to-b from-[#1b1712] to-[#12100d] rounded-3xl p-8 md:p-10 text-center shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
            className="mx-auto mb-5 w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shadow-lg shadow-gold/20"
          >
            <CheckCircle2 size={36} />
          </motion.div>
          <h3 className="font-display text-3xl text-gold mb-2">Table Reserved!</h3>
          <p className="text-cream/70 text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Thank you, <strong className="text-cream">{form.name}</strong>. Your table for{" "}
            <strong className="text-gold">{form.guests} Guests</strong> on{" "}
            <strong className="text-gold">{form.date}</strong> at{" "}
            <strong className="text-gold">{form.time}</strong> is tentatively booked.
            Our host will call you shortly to confirm.
          </p>

          <button
            onClick={() => {
              setStatus("idle");
              setForm(initial);
            }}
            className="text-xs eyebrow text-gold border border-gold/30 rounded-full px-6 py-3 hover:bg-gold hover:text-charcoal transition-all shadow-md"
          >
            Reserve Another Table
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-8 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#181410] to-[#110f0c] p-6 md:p-8 shadow-2xl"
        >
          {/* Seating Area Selection */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-cream/60 mb-3 flex items-center gap-1.5">
              <Utensils size={14} className="text-gold" /> Preferred Seating Area
            </label>
            <div className="grid sm:grid-cols-3 gap-3">
              {seatingAreas.map((area) => (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => setSeating(area.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    seating === area.id
                      ? "bg-gold/10 border-gold text-gold shadow-lg shadow-gold/10"
                      : "bg-white/[0.03] border-white/10 text-cream/70 hover:border-white/20"
                  }`}
                >
                  <p className="text-sm font-semibold">{area.name}</p>
                  <p className="text-[11px] opacity-60 mt-0.5">{area.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Guest Count Pills */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-cream/60 mb-3 flex items-center gap-1.5">
              <Users size={14} className="text-gold" /> Number of Guests
            </label>
            <div className="flex flex-wrap gap-2">
              {guestOptions.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setForm({ ...form, guests: g })}
                  className={`w-12 h-11 rounded-xl text-sm font-semibold transition-all ${
                    form.guests === g
                      ? "bg-gradient-to-r from-gold to-gold-bright text-charcoal shadow-lg shadow-gold/20 scale-105"
                      : "bg-white/[0.04] text-cream/70 border border-white/10 hover:bg-white/[0.08]"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time Slots */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream/60 mb-2 flex items-center gap-1.5">
                <Calendar size={14} className="text-gold" /> Date
              </label>
              <input
                type="date"
                value={form.date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream focus:border-gold/50 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-cream/60 mb-2 flex items-center gap-1.5">
                <Clock size={14} className="text-gold" /> Time Slot ({form.time})
              </label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-1">
                {[...timeSlots.lunch, ...timeSlots.dinner].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm({ ...form, time: t })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      form.time === t
                        ? "bg-gold text-charcoal font-semibold"
                        : "bg-white/[0.04] text-cream/60 hover:bg-white/[0.08] border border-white/5"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Name & Phone */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1.5">
                Your Full Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ramesh Sharma"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream placeholder:text-cream/25 focus:border-gold/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1.5">
                Phone Number *
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 87120 23665"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream placeholder:text-cream/25 focus:border-gold/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1.5">
              Special Requests / Dietary Needs (Optional)
            </label>
            <textarea
              value={form.specialRequest}
              onChange={(e) => setForm({ ...form, specialRequest: e.target.value })}
              placeholder="e.g., Birthday celebration, high-chair needed, quiet corner preferred..."
              rows={2}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream placeholder:text-cream/25 focus:border-gold/50 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Live Preview Bar */}
          <div className="p-4 rounded-2xl bg-gold/10 border border-gold/20 flex flex-wrap items-center justify-between text-xs gap-3">
            <span className="text-gold font-medium flex items-center gap-1.5">
              <Sparkles size={14} /> Summary: {form.guests} Guests • {form.date} at {form.time}
            </span>
            <span className="text-cream/50">Instant Confirmation via Call</span>
          </div>

          {error && <p className="text-saffron text-xs">{error}</p>}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-saffron to-saffron-dark hover:from-saffron-dark hover:to-saffron text-charcoal font-semibold text-sm py-4 rounded-xl shadow-lg shadow-saffron/20 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-70"
          >
            {status === "submitting" ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Reserving Table...
              </>
            ) : (
              "Confirm Table Reservation"
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
