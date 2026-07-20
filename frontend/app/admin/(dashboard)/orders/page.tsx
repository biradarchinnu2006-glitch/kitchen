"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, ClipboardList, Loader2 } from "lucide-react";
import { downloadOrdersCsv, fetchOrders, updateOrderStatus } from "@/lib/adminApi";
import type { AdminOrder, OrderStatus } from "@/lib/types";
import StatusPill from "@/components/admin/StatusPill";
import EmptyState from "@/components/admin/EmptyState";
import SkeletonRows from "@/components/admin/SkeletonRows";

const STATUS_FLOW: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

const FILTERS: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Preparing", value: "preparing" },
  { label: "Out for delivery", value: "out_for_delivery" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

function formatCurrency(v: number) {
  return `₹${v.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch(() => setError("Could not load orders."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter]
  );

  async function handleStatusChange(orderId: string, status: OrderStatus) {
    setUpdatingId(orderId);
    setError(null);
    try {
      const updated = await updateOrderStatus(orderId, status);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
    } catch {
      setError("Could not update order status. Try again.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleExport() {
    setExporting(true);
    try {
      const blob = await downloadOrdersCsv();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "orders.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Could not export orders right now.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-full px-3.5 py-1.5 text-xs border transition-colors ${
                filter === f.value
                  ? "bg-gold/10 text-gold border-gold/30"
                  : "border-gold/10 text-cream/50 hover:text-cream hover:border-gold/20"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-2 rounded-md border border-gold/20 px-3.5 py-2 text-xs text-cream/70 hover:text-gold hover:border-gold/40 transition-colors disabled:opacity-60"
        >
          {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
          Export CSV
        </button>
      </div>

      {error && (
        <p className="text-sm text-saffron bg-saffron/10 border border-saffron/20 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      {loading ? (
        <SkeletonRows rows={6} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No orders here"
          description="Orders placed on the storefront will show up in this list as they come in."
        />
      ) : (
        <div className="rounded-lg border border-gold/15 bg-charcoal-light overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs eyebrow text-cream/40 border-b border-gold/10">
                <th className="px-5 py-3 font-normal">Customer</th>
                <th className="px-5 py-3 font-normal">Placed</th>
                <th className="px-5 py-3 font-normal">Total</th>
                <th className="px-5 py-3 font-normal">Status</th>
                <th className="px-5 py-3 font-normal">Update</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-gold/5 last:border-0">
                  <td className="px-5 py-4">
                    <p className="text-cream">{order.customer_name}</p>
                    <p className="text-xs text-cream/40">{order.customer_phone}</p>
                  </td>
                  <td className="px-5 py-4 text-cream/60 whitespace-nowrap">
                    {new Date(order.created_at).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-5 py-4 text-gold font-medium whitespace-nowrap">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill status={order.status} />
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value as OrderStatus)
                      }
                      className="rounded-md bg-charcoal border border-gold/15 px-2.5 py-1.5 text-xs text-cream focus:border-gold/40 outline-none disabled:opacity-50"
                    >
                      {STATUS_FLOW.map((s) => (
                        <option key={s} value={s}>
                          {s.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
