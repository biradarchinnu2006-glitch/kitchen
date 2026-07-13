"use client";

import { FormEvent, useState } from "react";
import { submitReservation } from "@/lib/api";
import { ReservationPayload } from "@/lib/types";

const initial: ReservationPayload = {
  name: "",
  phone: "",
  guests: 2,
  date: "",
  time: "",
  specialRequest: "",
};

export default function ReservationForm() {
  const [form, setForm] = useState<ReservationPayload>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function validate(): string | null {
    if (form.name.trim().length < 2) return "Enter your full name.";
    if (!/^\+?[0-9]{10,13}$/.test(form.phone.replace(/\s/g, "")))
      return "Enter a valid phone number.";
    if (form.guests < 1 || form.guests > 20) return "Guests must be between 1 and 20.";
    if (!form.date) return "Pick a date.";
    if (!form.time) return "Pick a time.";
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
    try {
      await submitReservation(form);
      setStatus("success");
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-gold/30 bg-charcoal-soft p-8 text-center">
        <p className="font-display text-2xl text-gold mb-2">Table reserved.</p>
        <p className="text-cream/60 text-sm">
          We&rsquo;ll call to confirm shortly. See you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs eyebrow text-gold border border-gold/30 px-4 py-2 hover:bg-gold hover:text-charcoal"
        >
          Book another table
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-5">
      <Field label="Name">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input"
          placeholder="Your name"
        />
      </Field>
      <Field label="Phone">
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="input"
          placeholder="10-digit number"
        />
      </Field>
      <Field label="Guests">
        <input
          type="number"
          min={1}
          max={20}
          value={form.guests}
          onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
          className="input"
        />
      </Field>
      <Field label="Date">
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="input"
        />
      </Field>
      <Field label="Time">
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          className="input"
        />
      </Field>
      <Field label="Special Request" full>
        <textarea
          value={form.specialRequest}
          onChange={(e) => setForm({ ...form, specialRequest: e.target.value })}
          className="input min-h-24"
          placeholder="Window seat, birthday cake, allergy notes…"
        />
      </Field>

      {error && <p className="sm:col-span-2 text-saffron text-sm">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="sm:col-span-2 mt-2 bg-saffron hover:bg-saffron-dark disabled:opacity-60 transition-colors text-charcoal font-medium text-sm py-3.5"
      >
        {status === "submitting" ? "Reserving…" : "Reserve Table"}
      </button>

      <style jsx global>{`
        .input {
          width: 100%;
          background: #211c15;
          border: 1px solid rgba(201, 162, 75, 0.15);
          padding: 0.75rem 1rem;
          color: #f4eedf;
          font-size: 0.875rem;
        }
        .input:focus {
          outline: none;
          border-color: rgba(201, 162, 75, 0.5);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`text-xs text-cream/50 space-y-2 block ${full ? "sm:col-span-2" : ""}`}>
      <span className="eyebrow">{label}</span>
      {children}
    </label>
  );
}
