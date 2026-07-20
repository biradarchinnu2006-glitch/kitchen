"use client";

import { motion } from "framer-motion";
import { Flame, Leaf } from "lucide-react";
import { FoodItem } from "@/lib/types";
import { whatsappOrderLink } from "@/lib/api";

const spiceDots: Record<FoodItem["spiceLevel"], number> = {
  mild: 1,
  medium: 2,
  hot: 3,
};

export default function FoodCard({ item }: { item: FoodItem }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative bg-charcoal-soft border border-gold/10 rounded-sm overflow-hidden hover:border-gold/30 transition-colors"
    >
      <div className="aspect-[4/3] bg-wood-dark/40 relative overflow-hidden flex items-center justify-center">
        {/* Swap for next/image with a real Cloudinary asset once photography is uploaded */}
        <span className="font-display italic text-cream/20 text-sm">
          {item.name}
        </span>
        <span
          className={`absolute top-3 left-3 w-5 h-5 border flex items-center justify-center ${
            item.isVeg ? "border-olive" : "border-saffron"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              item.isVeg ? "bg-olive" : "bg-saffron"
            }`}
          />
        </span>
        {item.isSignature && (
          <span className="absolute top-3 right-3 text-[10px] eyebrow bg-gold text-charcoal px-2 py-1">
            Chef&rsquo;s Pick
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg text-cream">{item.name}</h3>
          <span className="text-gold font-medium whitespace-nowrap">₹{item.price}</span>
        </div>
        <p className="text-cream/55 text-sm mt-2 leading-relaxed line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-4 text-xs text-cream/45">
          <span>{item.calories} kcal</span>
          <span className="flex items-center gap-1">
            {Array.from({ length: spiceDots[item.spiceLevel] }).map((_, i) => (
              <Flame key={i} size={12} className="text-saffron" />
            ))}
            {item.isVeg && <Leaf size={12} className="text-olive ml-1" />}
          </span>
        </div>

        <a
          href={whatsappOrderLink(item.name)}
          target="_blank"
          rel="noreferrer"
          className="mt-4 block text-center text-xs eyebrow border border-gold/30 text-gold py-2.5 hover:bg-gold hover:text-charcoal transition-colors"
        >
          Add to Cart
        </a>
      </div>
    </motion.div>
  );
}
