import { getToken } from "./adminAuth";
import type {
  Admin,
  AdminMessage,
  AdminOrder,
  AdminProduct,
  AdminReservation,
  AnalyticsSummary,
  OrderStatus,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.detail || `Request failed with ${res.status}`, res.status);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

// ---------- Analytics ----------
export const fetchAnalyticsSummary = () =>
  request<AnalyticsSummary>("/admin/analytics/summary");

export async function downloadOrdersCsv(): Promise<Blob> {
  const token = getToken();
  const res = await fetch(`${API_URL}/admin/orders/export`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new ApiError("Could not export orders", res.status);
  return res.blob();
}

// ---------- Orders ----------
export const fetchOrders = () => request<AdminOrder[]>("/admin/orders");

export const updateOrderStatus = (orderId: string, status: OrderStatus) =>
  request<AdminOrder>(`/admin/orders/${orderId}/status?status=${status}`, {
    method: "POST",
  });

// ---------- Menu / products ----------
// Full catalogue including inactive items — distinct from the public
// /menu endpoint the storefront uses, which only returns active items.
export const fetchProducts = () => request<AdminProduct[]>("/admin/products");

export type ProductPayload = Omit<AdminProduct, "id" | "is_active">;

export const createProduct = (payload: ProductPayload) =>
  request<AdminProduct>("/admin/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateProduct = (id: string, payload: Partial<ProductPayload & { is_active: boolean }>) =>
  request<AdminProduct>(`/admin/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const deleteProduct = (id: string) =>
  request<{ deleted: boolean }>(`/admin/products/${id}`, { method: "DELETE" });

// ---------- Reservations ----------
export const fetchReservations = () =>
  request<AdminReservation[]>("/admin/reservations");

export const confirmReservation = (id: string) =>
  request<AdminReservation>(`/admin/reservations/${id}/confirm`, { method: "POST" });

// ---------- Messages ----------
export const fetchMessages = () => request<AdminMessage[]>("/admin/messages");

// ---------- Staff ----------
export const fetchStaff = () => request<Admin[]>("/admin/staff");

export const createStaff = (payload: {
  email: string;
  password: string;
  full_name: string;
  is_superadmin: boolean;
}) =>
  request<Admin>("/admin/staff", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const removeStaff = (id: string) =>
  request<{ deleted: boolean }>(`/admin/staff/${id}`, { method: "DELETE" });

export { ApiError };
