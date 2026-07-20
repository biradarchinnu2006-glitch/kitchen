import { ContactPayload, FoodItem, ReservationPayload } from "./types";
import { menuData } from "@/data/menu";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://kitchen-wd6d.onrender.com";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed with ${res.status}`);
  }
  return res.json();
}

/**
 * Menu items are served by the FastAPI backend at GET /menu.
 * If the backend is unreachable (e.g. running the frontend standalone
 * during early development), we fall back to local seed data so the
 * UI keeps working.
 */
export async function fetchMenu(): Promise<FoodItem[]> {
  try {
    return await request<FoodItem[]>("/menu");
  } catch {
    return menuData;
  }
}

export async function submitReservation(payload: ReservationPayload) {
  return request("/reservations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function submitContactMessage(payload: ContactPayload) {
  return request("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function whatsappOrderLink(itemName?: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918712023665";
  const base = itemName
    ? `Hello Surekha's Kitchen, I would like to order ${itemName}.`
    : "Hello Surekha's Kitchen, I would like to order food.";
  return `https://wa.me/${number}?text=${encodeURIComponent(base)}`;
}
