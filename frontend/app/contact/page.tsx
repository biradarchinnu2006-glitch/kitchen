import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact — Surekha's Kitchen" };

export default function ContactPage() {
  return (
    <section className="pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-16">
        <div>
          <p className="eyebrow text-gold mb-3">Get in Touch</p>
          <h1 className="font-display text-4xl sm:text-5xl text-cream mb-6">
            Contact Us
          </h1>
          <div className="space-y-3 text-cream/60 text-sm">
            <p>Phone / WhatsApp: +91 87120 23665</p>
            <p>Email: info@surekhaskitchen.com</p>
            <p>Hours: Daily, 12:00 PM &ndash; 11:00 PM</p>
          </div>
          <div className="mt-8 aspect-video border border-gold/10 bg-charcoal-soft flex items-center justify-center">
            <span className="text-cream/30 text-sm font-display italic">
              Google Maps embed goes here once the address is confirmed
            </span>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
