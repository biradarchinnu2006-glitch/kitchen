import { FoodItem } from "@/lib/types";

let id = 1;

function createItems(
  category: FoodItem["category"],
  names: string[],
  basePrice: number,
  veg: boolean,
  spice: FoodItem["spiceLevel"] = "medium"
): FoodItem[] {
  return names.map((name, index) => ({
    id: `item-${id++}`,

    name,

    category,

    description: `Authentic ${name} prepared using premium ingredients and traditional recipes.`,

    price: basePrice + (index % 6) * 20,

    calories: 180 + index * 15,

    spiceLevel: spice,

    isVeg: veg,

    isSignature: index % 8 === 0,


    // Premium menu features
    image: `/food/${name
      .toLowerCase()
      .replace(/[()]/g, "")
      .replace(/\s+/g, "-")}.jpg`,


    rating: Number((4.2 + (index % 8) * 0.1).toFixed(1)),


    bestseller: index % 5 === 0,
  }));
}


// BREAKFAST

const breakfast = createItems(
  "breakfast",
  [
    "Idli",
    "Ghee Idli",
    "Mini Idli",
    "Sambar Idli",
    "Vada",
    "Medu Vada",
    "Masala Dosa",
    "Plain Dosa",
    "Onion Dosa",
    "Ghee Dosa",
    "Rava Dosa",
    "Pesarattu",
    "Set Dosa",
    "Poori Bhaji",
    "Upma",
    "Pongal",
    "Uttapam",
    "Chapati",
    "Paneer Paratha",
    "Aloo Paratha"
  ],
  60,
  true,
  "mild"
);


// BIRYANI

const chickenBiryani = createItems(
  "biryani",
  [
    "Chicken Dum Biryani",
    "Chicken Fry Biryani",
    "Chicken 65 Biryani",
    "Chicken Tikka Biryani",
    "Boneless Chicken Biryani",
    "Mughlai Chicken Biryani",
    "Butter Chicken Biryani",
    "Green Chicken Biryani",
    "Special Chicken Biryani",
    "Family Chicken Biryani",
    "Hyderabadi Chicken Biryani",
    "Spicy Chicken Biryani",
    "Supreme Chicken Biryani",
    "Chef Special Chicken Biryani",
    "Premium Chicken Biryani"
  ],
  260,
  false,
  "medium"
);


// STARTERS

const starters = createItems(
  "starters",
  [
    "Chicken 65",
    "Chicken Lollipop",
    "Dragon Chicken",
    "Chicken Majestic",
    "Chicken Manchurian",
    "Chilli Chicken",
    "Pepper Chicken",
    "Apollo Fish",
    "Fish Fry",
    "Prawns Fry",
    "Paneer 65",
    "Paneer Tikka",
    "Veg Manchurian",
    "Gobi 65",
    "Crispy Corn",
    "Spring Rolls",
    "Mushroom Pepper Fry",
    "Baby Corn Fry",
    "Chicken Wings",
    "Tandoori Chicken"
  ],
  180,
  false,
  "hot"
);


// FINAL MENU EXPORT

export const menuData: FoodItem[] = [
  ...breakfast,
  ...starters,
  ...chickenBiryani,
];