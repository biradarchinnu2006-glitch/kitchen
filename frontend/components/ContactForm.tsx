"use client";

import { FormEvent, useState } from "react";
import { submitContactMessage } from "@/lib/api";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !/^\S+@\S+\.\S+$/.test(form.email) || !form.message) {
      setError("Fill in your name, a valid email, and a message.");
      return;
    }
    setError(null);
    setStatus("submitting");
    try {
      await submitContactMessage(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-gold/30 bg-charcoal-soft p-8 text-center h-fit">
        <p className="font-display text-2xl text-gold mb-2">Message sent.</p>
        <p className="text-cream/60 text-sm">We&rsquo;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name"
        className="w-full bg-charcoal-soft border border-gold/15 focus:border-gold/50 outline-none px-4 py-3 text-sm text-cream placeholder:text-cream/30"
      />
      <input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
        className="w-full bg-charcoal-soft border border-gold/15 focus:border-gold/50 outline-none px-4 py-3 text-sm text-cream placeholder:text-cream/30"
      />
      <textarea
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="Message"
        className="w-full min-h-32 bg-charcoal-soft border border-gold/15 focus:border-gold/50 outline-none px-4 py-3 text-sm text-cream placeholder:text-cream/30"
      />
      {error && <p className="text-saffron text-sm">{error}</p>}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-saffron hover:bg-saffron-dark disabled:opacity-60 transition-colors text-charcoal font-medium text-sm py-3.5"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
