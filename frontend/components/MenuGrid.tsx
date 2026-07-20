"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FoodCard from "./FoodCard";
import { menuData } from "@/data/menu";

const categories = [
  "All",
  "Breakfast",
  "Starters",
  "Biryani",
  "Curries",
  "Breads",
  "Rice",
  "Desserts",
  "Cold Drinks",
  "Hot Drinks",
];

function getCategoryCount(cat: string): number {
  if (cat === "All") return menuData.length;
  return menuData.filter((item) => {
    switch (cat) {
      case "Breakfast":
        return item.category === "breakfast";
      case "Starters":
        return item.category.includes("starters");
      case "Biryani":
        return item.category.includes("biryani");
      case "Curries":
        return item.category === "curries";
      case "Breads":
        return item.category === "breads";
      case "Rice":
        return item.category === "rice";
      case "Desserts":
        return item.category === "desserts";
      case "Cold Drinks":
        return item.category === "cold-drinks";
      case "Hot Drinks":
        return item.category === "hot-drinks";
      default:
        return true;
    }
  }).length;
}

export default function MenuGrid() {
  const [selected, setSelected] = useState("All");

  const filtered = useMemo(() => {
    if (selected === "All") return menuData;

    return menuData.filter((item) => {
      switch (selected) {
        case "Breakfast":
          return item.category === "breakfast";
        case "Starters":
          return item.category.includes("starters");
        case "Biryani":
          return item.category.includes("biryani");
        case "Curries":
          return item.category === "curries";
        case "Breads":
          return item.category === "breads";
        case "Rice":
          return item.category === "rice";
        case "Desserts":
          return item.category === "desserts";
        case "Cold Drinks":
          return item.category === "cold-drinks";
        case "Hot Drinks":
          return item.category === "hot-drinks";
        default:
          return true;
      }
    });
  }, [selected]);

  return (
    <>
      {/* Category Filter */}
      <div className="sticky top-20 z-20 bg-[#090909]/90 backdrop-blur-xl py-6 border-b border-white/[0.04]">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const count = getCategoryCount(cat);
            if (count === 0 && cat !== "All") return null;
            return (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  selected === cat
                    ? "bg-gradient-to-r from-[#E8A23A] to-[#D68921] text-black shadow-lg shadow-amber-500/20"
                    : "bg-white/[0.04] text-cream/70 border border-white/[0.08] hover:bg-white/[0.08] hover:text-cream"
                }`}
              >
                {cat}
                {count > 0 && (
                  <span
                    className={`ml-2 text-xs ${
                      selected === cat ? "text-black/60" : "text-cream/30"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <FoodCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}