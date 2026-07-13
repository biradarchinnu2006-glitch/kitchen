export type SpiceLevel = "mild" | "medium" | "hot";

export interface FoodItem {
  id: string;
  name: string;
  category:
    | "starters"
    | "biryani"
    | "curries"
    | "breads"
    | "rice"
    | "desserts"
    | "cold-drinks"
    | "hot-drinks";
  description: string;
  price: number;
  calories: number;
  spiceLevel: SpiceLevel;
  isVeg: boolean;
  isSignature?: boolean;
  image: string;
}

export interface ReservationPayload {
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  specialRequest?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface CartLine {
  item: FoodItem;
  quantity: number;
}
