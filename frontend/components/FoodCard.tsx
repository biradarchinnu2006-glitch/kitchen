"use client";

import { Heart, ShoppingCart, Star, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { getDishImage } from "@/lib/dishImages";

export default function FoodCard({ item }: any) {
  const [liked, setLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageSrc = getDishImage(item.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-2xl bg-gradient-to-b from-[#1a1a1a] to-[#111] border border-white/[0.06] hover:border-gold/20 transition-all duration-500 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-gold/[0.06] card-glow"
    >
      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden">
        {/* Shimmer placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 shimmer" />
        )}

        <img
          src={imageSrc}
          alt={item.name}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/biryani.png";
            setImageLoaded(true);
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60" />

        {/* Bestseller badge */}
        {item.bestseller && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#E8A23A] to-[#D68921] px-3 py-1 text-xs font-bold text-black shadow-lg">
            <Flame size={12} />
            Bestseller
          </div>
        )}

        {/* Heart button */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute right-3 top-3 rounded-full bg-black/50 backdrop-blur-md p-2.5 border border-white/10 transition-all hover:bg-black/70 hover:scale-110"
        >
          <Heart
            size={18}
            className={`transition-colors ${
              liked
                ? "fill-red-500 text-red-500"
                : "text-white/70 hover:text-white"
            }`}
          />
        </button>

        {/* Veg/Non-veg badge */}
        <div className="absolute left-3 bottom-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md ${
              item.isVeg
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                item.isVeg ? "bg-emerald-400" : "bg-red-400"
              }`}
            />
            {item.isVeg ? "VEG" : "NON-VEG"}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-cream line-clamp-1">
          {item.name}
        </h2>

        <p className="mt-1.5 text-xs text-cream/40 line-clamp-1">
          {item.description}
        </p>

        {/* Rating & Spice */}
        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-sm text-cream/80">{item.rating}</span>
          </div>
          {item.spiceLevel && (
            <div className="flex items-center gap-1">
              {Array.from({
                length:
                  item.spiceLevel === "mild"
                    ? 1
                    : item.spiceLevel === "medium"
                    ? 2
                    : 3,
              }).map((_, i) => (
                <span key={i} className="text-xs">🌶️</span>
              ))}
            </div>
          )}
        </div>

        {/* Price & Add */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-[#E0BB66]">₹{item.price}</p>

          <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E8A23A] to-[#D68921] px-4 py-2 text-sm font-semibold text-black transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95">
            <ShoppingCart size={15} />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}