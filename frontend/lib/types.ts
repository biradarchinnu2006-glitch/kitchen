export type SpiceLevel = "mild" | "medium" | "hot";

export type FoodCategory =
  | "breakfast"
  | "hyderabadi-breakfast"
  | "starters"
  | "veg-starters"
  | "chicken-starters"
  | "mutton-starters"
  | "seafood"
  | "biryani"
  | "veg-biryani"
  | "chicken-biryani"
  | "mutton-biryani"
  | "family-packs"
  | "curries"
  | "breads"
  | "rice"
  | "chinese"
  | "noodles"
  | "tandoor"
  | "desserts"
  | "ice-cream"
  | "mocktails"
  | "cold-drinks"
  | "hot-drinks";


export interface FoodItem {

  id: string;

  name: string;

  category: FoodCategory;

  description: string;

  price: number;

  calories: number;

  spiceLevel: SpiceLevel;

  isVeg: boolean;


  // Menu badges
  isSignature?: boolean;

  isPopular?: boolean;

  chefChoice?: boolean;

  isNew?: boolean;

  bestseller?: boolean;


  // Rating and timing
  rating?: number;

  preparationTime?: number;


  // Image
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

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  comment: string;
  dishTried?: string;
  date: string;
  verified?: boolean;
}

export interface ReviewPayload {
  name: string;
  rating: number;
  comment: string;
  dishTried?: string;
}


export interface CartLine {
  item: FoodItem;
  quantity: number;
}


// ===============================
// ADMIN DASHBOARD
// ===============================


export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";


export interface AdminOrder {
  id: string;
  customer_name: string;
  customer_phone: string;
  subtotal: number;
  gst: number;
  delivery_charge: number;
  total: number;
  status: OrderStatus;
  created_at: string;
}


export interface AdminProduct {

  id: string;

  name: string;

  category: FoodCategory;

  description: string;

  price: number;

  calories: number;

  spice_level: SpiceLevel;

  is_veg: boolean;

  is_signature: boolean;

  image_url: string | null;

  is_active: boolean;
}


export interface AdminReservation {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  special_request: string | null;
  confirmed: boolean;
  created_at: string;
}


export interface AdminMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}


export interface Admin {

  id: string;

  email: string;

  full_name: string;

  is_superadmin: boolean;

  role: "superadmin" | "staff";

  created_at: string;
}


export interface AnalyticsSummary {

  total_revenue: number;

  total_orders: number;

  popular_items: {
    name: string;
    quantity: number;
  }[];

}