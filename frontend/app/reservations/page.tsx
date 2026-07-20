import type { Metadata } from "next";
import { Sparkles, ShieldCheck, Clock, Car } from "lucide-react";
import ReservationForm from "@/components/ReservationForm";

export const metadata: Metadata = { title: "Reservations — Surekha's Kitchen" };

export default function ReservationsPage() {
  return (
    <section className="pt-32 pb-24 min-h-screen relative overflow-hidden bg-[#090909]">
      {/* Background glows */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-gold/[0.04] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] rounded-full bg-saffron/[0.03] blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-gold text-xs uppercase tracking-widest mb-4">
            <Sparkles size={12} /> Fine Dining & Family Tables
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-cream mb-4">
            Reserve Your Table
          </h1>
          <div className="mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mb-4" />
          <p className="text-cream/60 text-sm sm:text-base leading-relaxed">
            Join us for an unforgettable Hyderabadi culinary journey. Book online in seconds and receive immediate phone confirmation.
          </p>
        </div>

        {/* Benefits Badges */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-cream font-medium text-xs">Zero Booking Fees</p>
              <p className="text-cream/40 text-[11px]">Free cancellation anytime</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-cream font-medium text-xs">Table Held 15 Mins</p>
              <p className="text-cream/40 text-[11px]">15-minute grace period</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
              <Car size={20} />
            </div>
            <div>
              <p className="text-cream font-medium text-xs">Free Valet Parking</p>
              <p className="text-cream/40 text-[11px]">Complimentary service</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <ReservationForm />
      </div>
    </section>
  );
}
