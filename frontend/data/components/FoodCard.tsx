"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { FoodItem } from "@/lib/types";

interface Props {
  item: FoodItem;
}

export default function FoodCard({ item }: Props) {

  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden rounded-2xl bg-[#151515] shadow-xl"
    >

      {/* IMAGE */}
      <div className="relative">

        <img
          src={item.image}
          alt={item.name}
          className="h-56 w-full object-cover"
        />


        {/* Bestseller */}
        {item.bestseller && (
          <div
            className="
            absolute
            left-3
            top-3
            rounded-full
            bg-[#C8A046]
            px-3
            py-1
            text-sm
            font-bold
            text-black
            "
          >
            🔥 Bestseller
          </div>
        )}


        {/* Favorite */}
        <button
          onClick={() => setLiked(!liked)}
          className="
          absolute
          right-3
          top-3
          rounded-full
          bg-black/70
          p-2
          "
        >

          <Heart
            size={22}
            className={
              liked
                ? "fill-red-500 text-red-500"
                : "text-white"
            }
          />

        </button>

      </div>



      {/* DETAILS */}
      <div className="p-5">


        <div className="flex items-center justify-between">

          <h2 className="text-xl font-semibold text-white">
            {item.name}
          </h2>


          <span className="text-lg">
            {item.isVeg ? "🟢" : "🔴"}
          </span>

        </div>



        <p className="mt-2 text-sm text-gray-400">
          {item.description}
        </p>



        {/* Rating */}

        <div className="mt-3 flex items-center gap-2">

          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-white">
            {item.rating ?? "4.5"}
          </span>

        </div>



        {/* Price + Cart */}

        <div className="mt-5 flex items-center justify-between">


          <div>

            <p className="text-xl font-bold text-[#C8A046]">
              ₹{item.price}
            </p>


            <p className="text-xs text-gray-400">
              {item.calories} calories
            </p>

          </div>



          <button
            className="
            flex
            items-center
            gap-2
            rounded-full
            bg-[#C8A046]
            px-4
            py-2
            font-semibold
            text-black
            transition
            hover:scale-105
            "
          >

            <ShoppingCart size={18}/>

            Add

          </button>


        </div>


      </div>


    </motion.div>
  );
}