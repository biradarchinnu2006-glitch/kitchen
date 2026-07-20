"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IndianRupee,
  ClipboardList,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Flame,
  Clock,
  Users,
  AlertCircle,
  CheckCircle2,
  Send,
  Radio,
} from "lucide-react";
import { fetchAnalyticsSummary, fetchOrders } from "@/lib/adminApi";
import type { AdminOrder, AnalyticsSummary } from "@/lib/types";
import StatusPill from "@/components/admin/StatusPill";
import SkeletonRows from "@/components/admin/SkeletonRows";

function formatCurrency(v: number) {
  return `₹${v.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

// Simulated Live Tables
const initialTables = [
  { id: 1, name: "Table 1 (Window Booth)", guests: 4, status: "occupied", time: "45m" },
  { id: 2, name: "Table 2 (Terrace)", guests: 2, status: "reserved", time: "8:00 PM" },
  { id: 3, name: "Table 3 (Main Hall)", guests: 6, status: "occupied", time: "20m" },
  { id: 4, name: "Table 4 (VIP Alcove)", guests: 8, status: "available", time: "Ready" },
  { id: 5, name: "Table 5 (Terrace)", guests: 2, status: "available", time: "Ready" },
  { id: 6, name: "Table 6 (Main Hall)", guests: 4, status: "reserved", time: "8:30 PM" },
];

const hourlyVolume = [
  { hour: "12 PM", count: 18, peak: false },
  { hour: "1 PM", count: 42, peak: true },
  { hour: "2 PM", count: 30, peak: false },
  { hour: "7 PM", count: 24, peak: false },
  { hour: "8 PM", count: 58, peak: true },
  { hour: "9 PM", count: 45, peak: true },
  { hour: "10 PM", count: 20, peak: false },
];

export default function AdminOverviewPage() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [recentOrders, setRecentOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [tables, setTables] = useState(initialTables);

  useEffect(() => {
    Promise.all([fetchAnalyticsSummary(), fetchOrders()])
      .then(([s, orders]) => {
        setSummary(s);
        setRecentOrders(orders.slice(0, 5));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMsg.trim()) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastMsg("");
    }, 3000);
  };

  const toggleTable = (id: number) => {
    setTables((t) =>
      t.map((table) => {
        if (table.id === id) {
          const nextStatus =
            table.status === "available"
              ? "occupied"
              : table.status === "occupied"
              ? "reserved"
              : "available";
          return { ...table, status: nextStatus };
        }
        return table;
      })
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Kitchen Rush Indicator */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#241c13] via-[#1a140d] to-[#120f0a] border border-gold/25 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
            <Radio size={20} className="animate-pulse" />
          </div>
          <div>
            <h2 className="font-display text-base text-cream flex items-center gap-2">
              Live Operations Monitor <Sparkles size={14} className="text-gold" />
            </h2>
            <p className="text-xs text-cream/50">
              Kitchen prep time: <strong className="text-emerald-400 font-medium">18-22 mins</strong> • Average Order Fulfilment: <strong className="text-gold font-medium">98.4%</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/orders"
            className="px-3.5 py-1.5 rounded-lg bg-gold/10 hover:bg-gold hover:text-charcoal border border-gold/30 text-gold text-xs font-semibold transition-all"
          >
            Manage Kitchen Queue →
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={IndianRupee}
          label="Total Revenue"
          value={summary ? formatCurrency(summary.total_revenue) : undefined}
          loading={loading}
          trend="+14.2% vs last week"
        />
        <StatCard
          icon={ClipboardList}
          label="Total Orders"
          value={summary ? summary.total_orders.toLocaleString("en-IN") : undefined}
          loading={loading}
          trend="84% Dum Biryani Packs"
        />
        <StatCard
          icon={TrendingUp}
          label="Top Seller Dish"
          value={summary?.popular_items[0]?.name ?? "Special Chicken Biryani"}
          loading={loading}
          trend="Highest rated dish"
        />
      </div>

      {/* Live Analytics Bar Chart & Live Table Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Peak Hours Volume Analytics */}
        <div className="lg:col-span-7 rounded-2xl border border-gold/15 bg-charcoal-light p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg text-cream flex items-center gap-2">
                <Flame size={18} className="text-gold" /> Hourly Demand Peak Heatmap
              </h2>
              <p className="text-xs text-cream/40">Real-time order density across lunch & dinner shifts</p>
            </div>
            <span className="text-[10px] text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full uppercase font-semibold">
              Peak: 8:00 PM
            </span>
          </div>

          <div className="pt-4 pb-2 border-t border-white/5">
            <div className="flex items-end justify-between gap-2 h-40 pt-6 px-2">
              {hourlyVolume.map((item) => (
                <div key={item.hour} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] text-cream/40 group-hover:text-gold transition-colors font-medium">
                    {item.count}
                  </span>
                  <div className="w-full bg-charcoal-soft rounded-t-lg h-28 flex items-end overflow-hidden p-0.5">
                    <div
                      style={{ height: `${(item.count / 60) * 100}%` }}
                      className={`w-full rounded-t-md transition-all duration-500 ${
                        item.peak
                          ? "bg-gradient-to-t from-saffron to-gold shadow-lg shadow-gold/20"
                          : "bg-gold/30 hover:bg-gold/50"
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-cream/50 group-hover:text-cream transition-colors">
                    {item.hour}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Table Seating Monitor */}
        <div className="lg:col-span-5 rounded-2xl border border-gold/15 bg-charcoal-light p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div>
              <h2 className="font-display text-lg text-cream flex items-center gap-2">
                <Users size={18} className="text-gold" /> Dining Table Status
              </h2>
              <p className="text-xs text-cream/40">Click any table to update occupancy</p>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">
              {tables.filter((t) => t.status === "available").length} Free
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {tables.map((tbl) => (
              <button
                key={tbl.id}
                onClick={() => toggleTable(tbl.id)}
                className={`p-3 rounded-xl border text-left transition-all hover:scale-[1.02] ${
                  tbl.status === "available"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : tbl.status === "occupied"
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                    : "bg-blue-500/10 border-blue-500/30 text-blue-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs truncate">{tbl.name}</span>
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/40">
                    {tbl.status}
                  </span>
                </div>
                <p className="text-[10px] opacity-60 mt-1">
                  {tbl.guests} Seats • {tbl.time}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Stream + Quick Broadcast */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 rounded-2xl border border-gold/15 bg-charcoal-light p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg text-cream">Recent Customer Orders</h2>
            <Link
              href="/admin/orders"
              className="text-xs text-gold hover:text-gold-bright flex items-center gap-1 font-semibold"
            >
              View All Queue <ArrowUpRight size={13} />
            </Link>
          </div>

          {loading ? (
            <SkeletonRows rows={4} />
          ) : recentOrders.length === 0 ? (
            <p className="text-sm text-cream/40 py-6 text-center">No orders received yet.</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between rounded-xl border border-gold/10 bg-charcoal p-4 hover:border-gold/30 transition-all"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-cream font-medium truncate">{o.customer_name}</p>
                    <p className="text-xs text-cream/40">
                      {new Date(o.created_at).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm text-gold font-bold">{formatCurrency(o.total)}</span>
                    <StatusPill status={o.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick WhatsApp Broadcast Alert Box */}
        <div className="lg:col-span-2 rounded-2xl border border-gold/15 bg-charcoal-light p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display text-lg text-cream flex items-center gap-2">
                <Send size={18} className="text-gold" /> Kitchen Broadcast
              </h2>
              <span className="text-[10px] text-cream/40">WhatsApp Alert</span>
            </div>
            <p className="text-xs text-cream/60 leading-relaxed mb-4">
              Send an instant announcement or special dish promo to guests.
            </p>

            <form onSubmit={handleBroadcast} className="space-y-3">
              <textarea
                value={broadcastMsg}
                onChange={(e) => setBroadcastMsg(e.target.value)}
                placeholder="e.g. Fresh Dum Biryani batch ready! Get free Gulab Jamun on orders over ₹500 today."
                rows={3}
                className="w-full bg-charcoal border border-white/10 rounded-xl p-3 text-xs text-cream placeholder:text-cream/25 focus:border-gold/50 outline-none resize-none"
              />

              {broadcastSent ? (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 size={14} /> Broadcast announcement dispatched!
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={!broadcastMsg.trim()}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-gold to-gold-bright text-charcoal font-bold text-xs hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-40"
                >
                  Dispatch Broadcast Notice
                </button>
              )}
            </form>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-cream/40 flex items-center justify-between">
            <span>Server Latency: <strong className="text-emerald-400 font-medium">12ms</strong></span>
            <span>FastAPI Backend Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  loading,
  trend,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
  loading: boolean;
  trend?: string;
}) {
  return (
    <div className="rounded-2xl border border-gold/15 bg-charcoal-light p-5 shadow-lg">
      <div className="flex items-center justify-between text-cream/40 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gold/10 text-gold">
            <Icon size={16} />
          </div>
          <span className="text-xs eyebrow font-semibold">{label}</span>
        </div>
      </div>
      {loading ? (
        <div className="h-7 w-24 rounded bg-charcoal-soft animate-pulse" />
      ) : (
        <div>
          <p className="font-display text-2xl text-cream truncate font-bold">{value}</p>
          {trend && <p className="text-[11px] text-gold/80 mt-1">{trend}</p>}
        </div>
      )}
    </div>
  );
}
