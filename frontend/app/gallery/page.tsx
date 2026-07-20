import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = { title: "Gallery — Surekha's Kitchen" };

export default function GalleryPage() {
  return (
    <section className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <p className="eyebrow text-gold mb-3">Gallery</p>
        <h1 className="font-display text-4xl sm:text-5xl text-cream mb-4">
          A Look Inside
        </h1>
        <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent mb-12" />
        <GalleryGrid />
      </div>
    </section>
  );
}
