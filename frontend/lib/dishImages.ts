/**
 * Maps dish names to their category representative images.
 * AI-generated food photography images are stored in /food/.
 * This utility finds the best matching image for any dish.
 */

/** Emoji fallbacks for dishes without a photo match */
const categoryEmoji: Record<string, string> = {
  idli: "🍚",
  dosa: "🥞",
  vada: "🍩",
  biryani: "🍛",
  chicken: "🍗",
  tandoori: "🔥",
  paneer: "🧀",
  fish: "🐟",
  breakfast: "🍽️",
};

export function getDishImage(name: string): string {
  const lower = name.toLowerCase();

  // === BREAKFAST ===
  if (lower.includes("idli")) return "/food/idli_plate.png";
  if (
    lower.includes("dosa") ||
    lower.includes("uttapam") ||
    lower.includes("pesarattu")
  )
    return "/food/masala_dosa.png";
  if (lower.includes("vada")) return "/food/vada_plate.png";
  if (
    lower.includes("paratha") ||
    lower.includes("chapati") ||
    lower.includes("poori") ||
    lower.includes("upma") ||
    lower.includes("pongal")
  )
    return "/food/breakfast_plate.png";

  // === BIRYANI ===
  if (lower.includes("biryani")) return "/food/chicken_biryani.png";

  // === STARTERS ===
  if (lower.includes("tandoori")) return "/food/tandoori_chicken.png";
  if (
    lower.includes("fish") ||
    lower.includes("prawns") ||
    lower.includes("apollo")
  )
    return "/food/fish_fry.png";
  if (
    lower.includes("paneer") ||
    lower.includes("gobi") ||
    lower.includes("veg") ||
    lower.includes("mushroom") ||
    lower.includes("corn") ||
    lower.includes("spring")
  )
    return "/food/paneer_tikka.png";
  if (lower.includes("chicken")) return "/food/fried_chicken.png";

  // === FALLBACK ===
  return "/food/chicken_biryani.png";
}

/** Get a food emoji for a dish category */
export function getDishEmoji(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("idli")) return categoryEmoji.idli;
  if (lower.includes("dosa") || lower.includes("uttapam") || lower.includes("pesarattu"))
    return categoryEmoji.dosa;
  if (lower.includes("vada")) return categoryEmoji.vada;
  if (lower.includes("biryani")) return categoryEmoji.biryani;
  if (lower.includes("tandoori")) return categoryEmoji.tandoori;
  if (lower.includes("paneer") || lower.includes("gobi") || lower.includes("veg"))
    return categoryEmoji.paneer;
  if (lower.includes("fish") || lower.includes("prawns")) return categoryEmoji.fish;
  if (lower.includes("chicken")) return categoryEmoji.chicken;
  return categoryEmoji.breakfast;
}
