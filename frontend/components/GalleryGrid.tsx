"use client";

import { useState } from "react";
import { X } from "lucide-react";

const items = [
  { id: 1, label: "Dum biryani, sealed", tall: true },
  { id: 2, label: "The tandoor" },
  { id: 3, label: "Chef Surekha" },
  { id: 4, label: "Fresh masala, ground daily", tall: true },
  { id: 5, label: "The dining room" },
  { id: 6, label: "Regulars at the counter" },
  { id: 7, label: "Gulab jamun, plated" },
  { id: 8, label: "Sunday prep", tall: true },
];

export default function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full block break-inside-avoid bg-charcoal-soft border border-gold/10 hover:border-gold/30 transition-colors ${
              item.tall ? "aspect-[3/4]" : "aspect-square"
            } flex items-center justify-center`}
          >
            <span className="font-display italic text-cream/25 text-sm px-4 text-center">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 text-cream/60"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <div className="max-w-2xl w-full aspect-video bg-charcoal-soft border border-gold/20 flex items-center justify-center">
            <span className="font-display italic text-cream/40">
              {items.find((i) => i.id === active)?.label}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
