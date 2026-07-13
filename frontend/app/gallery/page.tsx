import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = { title: "Gallery — Surekha's Kitchen" };

export default function GalleryPage() {
  return (
    <section className="pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow text-gold mb-3">Gallery</p>
        <h1 className="font-display text-4xl sm:text-5xl text-cream mb-12">
          A Look Inside
        </h1>
        <GalleryGrid />
      </div>
    </section>
  );
}
