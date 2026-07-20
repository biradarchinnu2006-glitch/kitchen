import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Layers,
  Code,
  DollarSign,
  Utensils,
  Copy,
} from "lucide-react";

export const metadata: Metadata = {
  title: "SaaS Product Demo & Commercial License | Surekha's Kitchen",
  description:
    "Full-Stack Restaurant Management System ready for deployment & customization. Turnkey solution with Admin Dashboard, Reservations, Menu Editor & WhatsApp Ordering.",
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-cream pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs uppercase tracking-widest font-semibold">
            <Sparkles size={14} /> Full-Stack Restaurant SaaS Product
          </div>
          <h1 className="font-display text-3xl sm:text-5xl text-cream font-bold leading-tight">
            Restaurant Management System <br />
            <span className="text-gold">Ready-to-Deploy Solution</span>
          </h1>
          <p className="text-cream/70 text-sm sm:text-base leading-relaxed">
            Complete turnkey digital platform for restaurants, cloud kitchens, cafes, and web development agencies. Fully responsive, 24/7 cloud hosted with FastAPI & Next.js.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <span className="px-5 py-2 rounded-full bg-gold/15 border border-gold/40 text-gold text-lg font-bold">
              Asking Price: ₹30,000 (Negotiable)
            </span>
          </div>
        </div>

        {/* Live Demo Access Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1: Customer Storefront */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#181410] to-[#110f0c] border border-gold/20 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-gold/10 text-gold border border-gold/20">
                <Store size={24} />
              </div>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                Live Customer Portal
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl text-cream font-bold">
              1. Storefront & Customer App
            </h3>
            <p className="text-xs sm:text-sm text-cream/60 leading-relaxed">
              Luxury dark-mode design with smooth category filters, dish customization, interactive party estimator, table reservations, and 1-tap WhatsApp ordering.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-2 text-xs font-bold text-charcoal bg-gradient-to-r from-gold to-gold-bright px-5 py-3 rounded-xl hover:scale-105 transition-all shadow-lg shadow-gold/20"
              >
                Launch Customer Demo <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Card 2: Admin Dashboard */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#181410] to-[#110f0c] border border-gold/20 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-saffron/10 text-saffron border border-saffron/20">
                <ShieldCheck size={24} />
              </div>
              <span className="text-xs text-saffron font-bold bg-saffron/10 border border-saffron/20 px-3 py-1 rounded-full">
                Live Owner Control Panel
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl text-cream font-bold">
              2. Admin Operations Dashboard
            </h3>
            <p className="text-xs sm:text-sm text-cream/60 leading-relaxed">
              Manage menu items, toggle prices, confirm table bookings, track live orders, answer guest messages, and send automated WhatsApp updates.
            </p>
            <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs space-y-1 font-mono text-cream/80">
              <p>📍 Login: <span className="text-gold font-bold">https://frontend-topaz-sigma-51.vercel.app/admin/login</span></p>
              <p>🔑 Email: <span className="text-gold font-bold">owner@surekhaskitchen.com</span></p>
              <p>🔐 Password: <span className="text-gold font-bold">admin123</span></p>
            </div>
            <div className="pt-1">
              <Link
                href="/admin/login"
                target="_blank"
                className="inline-flex items-center gap-2 text-xs font-bold text-cream border border-gold/30 bg-gold/10 hover:bg-gold hover:text-charcoal px-5 py-3 rounded-xl transition-all shadow-md"
              >
                Open Admin Portal Demo <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl text-cream text-center font-bold">
            Complete Feature Matrix Included
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Customer Storefront",
                desc: "Responsive digital menu, category filters, dish search & smooth animations.",
                icon: Utensils,
              },
              {
                title: "Table Reservations",
                desc: "Interactive seating area & guest selector with instant owner confirmation.",
                icon: Store,
              },
              {
                title: "WhatsApp Ordering",
                desc: "Direct 1-tap cart & custom party pack checkout sent straight to WhatsApp.",
                icon: Smartphone,
              },
              {
                title: "Admin Operations",
                desc: "Real-time management for reservations, menu prices, staff & customer inquiries.",
                icon: Layers,
              },
              {
                title: "24/7 Cloud Architecture",
                desc: "Hosted on Render (FastAPI Backend) & Vercel (Next.js 15 Frontend).",
                icon: Code,
              },
              {
                title: "Commercial Ready",
                desc: "Clean modular TypeScript codebase, customizable branding & documentation.",
                icon: DollarSign,
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-gold/30 transition-all space-y-2"
              >
                <div className="flex items-center gap-2.5 text-gold font-semibold text-base">
                  <f.icon size={18} />
                  <span>{f.title}</span>
                </div>
                <p className="text-xs text-cream/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marketplace Sales Kit Summary */}
        <div className="p-6 sm:p-8 rounded-3xl bg-charcoal-light border border-gold/20 space-y-4">
          <h3 className="font-display text-xl text-gold font-bold flex items-center gap-2">
            <CheckCircle2 size={20} /> What Buyer Gets for ₹30,000:
          </h3>
          <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-cream/80">
            <li className="flex items-center gap-2"><span className="text-gold">✓</span> Complete Source Code (Frontend + Backend)</li>
            <li className="flex items-center gap-2"><span className="text-gold">✓</span> Deployable on Render & Vercel Free Tiers</li>
            <li className="flex items-center gap-2"><span className="text-gold">✓</span> Admin Dashboard & Reservation Engine</li>
            <li className="flex items-center gap-2"><span className="text-gold">✓</span> Database Setup & Environment Guide</li>
            <li className="flex items-center gap-2"><span className="text-gold">✓</span> Direct WhatsApp Notification Integration</li>
            <li className="flex items-center gap-2"><span className="text-gold">✓</span> 1-on-1 Deployment Assistance & Branding Customization</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
