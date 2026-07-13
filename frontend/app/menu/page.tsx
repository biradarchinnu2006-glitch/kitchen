import type { Metadata } from "next";
import MenuGrid from "@/components/MenuGrid";

export const metadata: Metadata = { title: "Menu — Surekha's Kitchen" };

export default function MenuPage() {
  return (
    <section className="pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow text-gold mb-3">Full Menu</p>
        <h1 className="font-display text-4xl sm:text-5xl text-cream mb-12">
          Everything We Cook
        </h1>
        <MenuGrid />
      </div>
    </section>
  );
}
