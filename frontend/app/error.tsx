"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#090909] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 rounded-3xl bg-gradient-to-b from-[#1c1813] to-[#12100d] border border-gold/30 shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-full bg-saffron/10 border border-saffron/30 flex items-center justify-center text-saffron mx-auto">
          <AlertTriangle size={32} />
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl text-cream">Something Went Wrong</h2>
          <p className="text-cream/60 text-sm leading-relaxed">
            We encountered a temporary hiccup while processing your request. Please try refreshing or return home.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gold text-charcoal font-semibold text-xs uppercase tracking-wider hover:bg-gold-bright transition-all"
          >
            <RefreshCw size={14} /> Try Again
          </button>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/10 text-cream/70 text-xs uppercase tracking-wider hover:bg-white/5 transition-all"
          >
            <Home size={14} /> Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
