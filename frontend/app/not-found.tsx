import Link from "next/link";
import { Utensils, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#090909] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 rounded-3xl bg-gradient-to-b from-[#1b1712] to-[#12100c] border border-gold/30 shadow-2xl space-y-6">
        <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mx-auto">
          <Utensils size={36} />
        </div>

        <div className="space-y-2">
          <span className="text-5xl font-display font-bold text-gold">404</span>
          <h2 className="font-display text-2xl text-cream">Dish or Page Not Found</h2>
          <p className="text-cream/60 text-sm leading-relaxed">
            The page you are looking for has been moved or does not exist on Surekha&apos;s Kitchen menu.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold to-gold-bright text-charcoal font-semibold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-lg shadow-gold/20"
          >
            <ArrowLeft size={14} /> Back To Main Kitchen
          </Link>
        </div>
      </div>
    </div>
  );
}
