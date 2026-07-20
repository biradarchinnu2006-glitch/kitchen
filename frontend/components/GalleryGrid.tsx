"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn, Sparkles } from "lucide-react";

interface GalleryItem {
  id: number;
  label: string;
  category: "kitchen" | "dishes" | "ambiance";
  image: string;
  tall?: boolean;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    label: "Handcrafted Clay Dum Biryani",
    category: "kitchen",
    image: "/gallery/biryani_seal.png",
    tall: true,
    description: "Sealed with fresh dough rim to lock in natural steam and 16 fragrant spices.",
  },
  {
    id: 2,
    label: "Clay Oven Tandoor Roast",
    category: "kitchen",
    image: "/gallery/tandoor.png",
    description: "Traditional high-heat clay pit cooking over charcoal for smokey authentic taste.",
  },
  {
    id: 3,
    label: "Fresh Masala Ground Daily",
    category: "kitchen",
    image: "/gallery/spices.png",
    description: "Whole cardamom, star anise, saffron, and cinnamon roasted and ground every morning.",
  },
  {
    id: 4,
    label: "Warm Elegant Dining Room",
    category: "ambiance",
    image: "/gallery/dining.png",
    tall: true,
    description: "Cozy ambient pendant lighting designed for family dinners and special occasions.",
  },
  {
    id: 5,
    label: "Special Chicken Dum Biryani",
    category: "dishes",
    image: "/food/chicken_biryani.png",
    description: "Layered saffron basmati rice with slow-cooked marinated chicken.",
  },
  {
    id: 6,
    label: "Charcoal Grilled Tandoori Chicken",
    category: "dishes",
    image: "/food/tandoori_chicken.png",
    description: "Marinated overnight in hung curd and spices, charred to perfection.",
  },
  {
    id: 7,
    label: "Smokey Paneer Tikka Skewers",
    category: "dishes",
    image: "/food/paneer_tikka.png",
    description: "Fresh cottage cheese cubes tossed with bell peppers and green mint chutney.",
  },
  {
    id: 8,
    label: "Crispy Masala Fish Fry",
    category: "dishes",
    image: "/food/fish_fry.png",
    tall: true,
    description: "Fresh coast fish marinated in chili garlic masala and crisp fried.",
  },
];

const categories = ["All", "Kitchen", "Dishes", "Ambiance"];

export default function GalleryGrid() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [selectedCat, setSelectedCat] = useState("All");

  const activeItem = galleryItems.find((i) => i.id === activeId);

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCat === "All") return true;
    return item.category.toLowerCase() === selectedCat.toLowerCase();
  });

  return (
    <>
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              selectedCat === cat
                ? "bg-gradient-to-r from-gold to-gold-bright text-charcoal shadow-lg shadow-gold/20"
                : "bg-white/[0.04] text-cream/70 border border-white/10 hover:border-gold/30 hover:text-cream"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setActiveId(item.id)}
              className={`group cursor-pointer relative w-full break-inside-avoid rounded-2xl overflow-hidden border border-white/10 bg-[#14120e] shadow-xl hover:border-gold/40 transition-all duration-500 ${
                item.tall ? "aspect-[3/4]" : "aspect-[4/3]"
              }`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.label}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content Badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/10 text-gold">
                  <Sparkles size={10} /> {item.category}
                </span>
              </div>

              {/* Zoom Button */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                <ZoomIn size={16} />
              </div>

              {/* Title & Caption */}
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="font-display text-lg text-cream group-hover:text-gold transition-colors">
                  {item.label}
                </h3>
                <p className="mt-1 text-xs text-cream/60 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setActiveId(null)}
          >
            <button
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-cream hover:text-gold hover:border-gold transition-all"
              onClick={() => setActiveId(null)}
              aria-label="Close modal"
            >
              <X size={22} />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full overflow-hidden rounded-3xl border border-gold/30 bg-[#16130e] shadow-2xl grid md:grid-cols-2"
            >
              {/* Modal Image */}
              <div className="relative aspect-square md:aspect-auto max-h-[500px]">
                <img
                  src={activeItem.image}
                  alt={activeItem.label}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Modal Text */}
              <div className="p-8 flex flex-col justify-center bg-gradient-to-br from-[#1c1813] to-[#12100d]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 border border-gold/30 text-gold w-fit mb-4">
                  <Sparkles size={12} /> {activeItem.category}
                </span>

                <h2 className="font-display text-2xl sm:text-3xl text-cream mb-4">
                  {activeItem.label}
                </h2>

                <div className="w-12 h-0.5 bg-gradient-to-r from-gold to-transparent mb-4" />

                <p className="text-cream/70 text-sm leading-relaxed mb-6">
                  {activeItem.description}
                </p>

                <p className="text-xs text-cream/40 italic">
                  Shot on location at Surekha&apos;s Kitchen, Hyderabad.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
