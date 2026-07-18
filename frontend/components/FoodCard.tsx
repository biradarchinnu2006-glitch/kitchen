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

const categoryLabels: Record<FoodItem["category"], string> = {
  starters: "Starter",
  biryani: "Biryani",
  curries: "Curry",
  breads: "Bread",
  rice: "Rice",
  desserts: "Dessert",
  "cold-drinks": "Cold Drink",
  "hot-drinks": "Hot Drink",
};

export default function FoodCard({ item }: { item: FoodItem }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative bg-charcoal-soft border border-gold/10 rounded-2xl overflow-hidden hover:border-gold/30 transition-all duration-300 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_-16px_rgba(201,162,75,0.2)]"
    >
      <div className="aspect-[4/3] bg-wood-dark/40 relative overflow-hidden flex items-center justify-center">
        <motion.span
          className="font-display italic text-cream/20 text-sm"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {item.name}
        </motion.span>

        {/* Category badge */}
        <span className="absolute top-3 left-3 rounded-full bg-charcoal/70 backdrop-blur-sm border border-gold/20 px-2.5 py-1 text-[10px] eyebrow text-cream/70">
          {categoryLabels[item.category]}
        </span>

        {/* Veg/Non-veg indicator */}
        <span
          className={`absolute top-3 right-3 w-5 h-5 rounded-full border flex items-center justify-center bg-charcoal/70 backdrop-blur-sm ${
            item.isVeg ? "border-olive" : "border-saffron"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              item.isVeg ? "bg-olive" : "bg-saffron"
            }`}
          />
        </span>

        {/* Chef's pick badge */}
        {item.isSignature && (
          <span className="absolute bottom-3 left-3 text-[10px] eyebrow bg-gold text-charcoal px-2.5 py-1 rounded-full shadow">
            Chef&rsquo;s Pick
          </span>
        )}

        {/* Price pill */}
        <span className="absolute bottom-3 right-3 rounded-full bg-gold text-charcoal font-medium text-xs px-3 py-1 shadow-lg">
          ₹{item.price}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg text-cream">{item.name}</h3>
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
          className="mt-4 block text-center text-xs eyebrow border border-gold/30 rounded-full text-gold py-2.5 hover:bg-gold hover:text-charcoal transition-all duration-300"
        >
          Add to Cart
        </a>
      </div>
    </motion.div>
  );
}
