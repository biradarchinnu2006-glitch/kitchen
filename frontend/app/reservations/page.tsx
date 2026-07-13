import type { Metadata } from "next";
import ReservationForm from "@/components/ReservationForm";

export const metadata: Metadata = { title: "Reservations — Surekha's Kitchen" };

export default function ReservationsPage() {
  return (
    <section className="pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-2xl px-6">
        <p className="eyebrow text-gold mb-3">Book a Table</p>
        <h1 className="font-display text-4xl sm:text-5xl text-cream mb-4">
          Reserve Your Table
        </h1>
        <p className="text-cream/55 mb-10">
          We'll confirm by phone within the hour.
        </p>
        <ReservationForm />
      </div>
    </section>
  );
}
