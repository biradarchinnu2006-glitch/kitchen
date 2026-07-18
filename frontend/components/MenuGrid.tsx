"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { FoodItem } from "@/lib/types";
import { fetchMenu } from "@/lib/api";
import FoodCard from "./FoodCard";

const categories: { value: FoodItem["category"] | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "starters", label: "Starters" },
  { value: "biryani", label: "Biryani" },
  { value: "curries", label: "Curries" },
  { value: "breads", label: "Indian Breads" },
  { value: "rice", label: "Rice" },
  { value: "desserts", label: "Desserts" },
  { value: "cold-drinks", label: "Cold Drinks" },
  { value: "hot-drinks", label: "Hot Drinks" },
];

const PAGE_SIZE = 8;

export default function MenuGrid() {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<(typeof categories)[number]["value"]>("all");
  const [vegOnly, setVegOnly] = useState(false);
  const [spicyOnly, setSpicyOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(500);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMenu()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (vegOnly && !item.isVeg) return false;
      if (spicyOnly && item.spiceLevel !== "hot") return false;
      if (item.price > maxPrice) return false;
      if (query && !item.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [items, category, vegOnly, spicyOnly, query, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      {/* Category pills with animated indicator */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => {
                setCategory(c.value);
                setPage(1);
              }}
              className={`relative px-4 py-2 text-xs eyebrow rounded-full border transition-colors duration-200 ${
                category === c.value
                  ? "text-charcoal border-gold"
                  : "border-gold/20 text-cream/60 hover:border-gold/50 hover:text-cream/90"
              }`}
            >
              {category === c.value && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-full bg-gold"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{c.label}</span>
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full lg:w-64">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40"
          />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search the menu"
            className="w-full bg-charcoal-soft border border-gold/15 rounded-full py-2.5 pl-9 pr-3 text-sm text-cream placeholder:text-cream/30 focus:border-gold/50 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Filter toggles */}
      <div className="flex flex-wrap gap-6 items-center mb-10 text-sm text-cream/60">
        <label className="flex items-center gap-2 cursor-pointer hover:text-cream/80 transition-colors">
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={(e) => {
              setVegOnly(e.target.checked);
              setPage(1);
            }}
            className="accent-olive"
          />
          Veg only
        </label>
        <label className="flex items-center gap-2 cursor-pointer hover:text-cream/80 transition-colors">
          <input
            type="checkbox"
            checked={spicyOnly}
            onChange={(e) => {
              setSpicyOnly(e.target.checked);
              setPage(1);
            }}
            className="accent-saffron"
          />
          Spicy only
        </label>
        <label className="flex items-center gap-3">
          Max ₹{maxPrice}
          <input
            type="range"
            min={50}
            max={500}
            step={10}
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(Number(e.target.value));
              setPage(1);
            }}
            className="accent-gold"
          />
        </label>
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-charcoal-soft border border-gold/10 overflow-hidden"
            >
              <div className="aspect-[4/3] bg-charcoal-light animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-3/4 bg-charcoal-light rounded animate-pulse" />
                <div className="h-3 w-full bg-charcoal-light rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-charcoal-light rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : paged.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-cream/30 font-display italic text-lg">No dishes match those filters.</p>
          <p className="text-cream/20 text-sm mt-2">Try adjusting the category or price range.</p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {paged.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <FoodCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-full text-xs border transition-all duration-200 ${
                page === i + 1
                  ? "bg-gold text-charcoal border-gold shadow-[0_0_12px_rgba(201,162,75,0.3)]"
                  : "border-gold/20 text-cream/50 hover:border-gold/50 hover:text-cream"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
