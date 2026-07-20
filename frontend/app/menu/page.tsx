import type { Metadata } from "next";
import MenuHero from "@/components/MenuHero";
import MenuGrid from "@/components/MenuGrid";

export const metadata: Metadata = {
  title: "Menu | Surekha's Kitchen",
};

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-[#090909]">
      <MenuHero />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <MenuGrid />
        </div>
      </section>
    </main>
  );
}