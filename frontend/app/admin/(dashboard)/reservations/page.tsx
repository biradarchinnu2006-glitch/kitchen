"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Check,
  Clock,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  User,
  Users,
} from "lucide-react";
import { confirmReservation, fetchReservations } from "@/lib/adminApi";
import type { AdminReservation } from "@/lib/types";
import EmptyState from "@/components/admin/EmptyState";
import SkeletonRows from "@/components/admin/SkeletonRows";

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<AdminReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "awaiting" | "confirmed">("all");
  const [search, setSearch] = useState("");

  const loadData = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const data = await fetchReservations();
      setReservations(data || []);
    } catch {
      setError("Could not load reservations. Please check connection.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  async function handleConfirm(id: string) {
    setConfirmingId(id);
    try {
      const updated = await confirmReservation(id);
      setReservations((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch {
      setError("Could not confirm this reservation. Try again.");
    } finally {
      setConfirmingId(null);
    }
  }

  const filtered = reservations.filter((r) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "confirmed"
        ? r.confirmed
        : !r.confirmed;
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search) ||
      r.date.includes(search);
    return matchesFilter && matchesSearch;
  });

  const awaitingCount = reservations.filter((r) => !r.confirmed).length;
  const confirmedCount = reservations.filter((r) => r.confirmed).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display italic text-2xl sm:text-3xl text-cream">
            Table <span className="text-gold not-italic">Reservations</span>
          </h1>
          <p className="text-xs sm:text-sm text-cream/50 mt-1">
            Manage table bookings, confirm guests & send instant updates.
          </p>
        </div>

        <button
          onClick={() => loadData(true)}
          disabled={refreshing || loading}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-gold/20 bg-charcoal-light text-xs font-semibold text-cream hover:border-gold/50 transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin text-gold" : "text-gold"} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Filter Tabs & Search Box */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              filter === "all"
                ? "bg-gold text-charcoal shadow-md shadow-gold/20"
                : "bg-charcoal-light border border-gold/10 text-cream/60 hover:text-cream"
            }`}
          >
            All ({reservations.length})
          </button>

          <button
            onClick={() => setFilter("awaiting")}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              filter === "awaiting"
                ? "bg-saffron text-charcoal shadow-md shadow-saffron/20 font-bold"
                : "bg-charcoal-light border border-gold/10 text-saffron/80 hover:text-saffron"
            }`}
          >
            Awaiting Confirmation
            {awaitingCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-charcoal text-saffron text-[10px] flex items-center justify-center font-bold">
                {awaitingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setFilter("confirmed")}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              filter === "confirmed"
                ? "bg-emerald-500 text-charcoal font-bold shadow-md shadow-emerald-500/20"
                : "bg-charcoal-light border border-gold/10 text-emerald-400/80 hover:text-emerald-400"
            }`}
          >
            Confirmed ({confirmedCount})
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/40" />
          <input
            type="text"
            placeholder="Search name, phone, date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-charcoal-light border border-gold/15 text-xs text-cream placeholder:text-cream/30 focus:border-gold/50 outline-none"
          />
        </div>
      </div>

      {error && (
        <div className="text-sm text-saffron bg-saffron/10 border border-saffron/20 rounded-xl px-4 py-3 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => loadData(true)} className="underline text-xs">Retry</button>
        </div>
      )}

      {loading ? (
        <SkeletonRows rows={4} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={CalendarCheck}
          title={search ? "No matching bookings found" : "No reservations yet"}
          description={
            search
              ? "Try adjusting your search criteria or filters."
              : "Table bookings made from the storefront will appear here."
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <div
              key={r.id}
              className={`rounded-2xl border transition-all duration-300 p-5 flex flex-col justify-between space-y-4 ${
                r.confirmed
                  ? "border-emerald-500/20 bg-emerald-950/10 hover:border-emerald-500/40"
                  : "border-saffron/20 bg-charcoal-light hover:border-saffron/40 shadow-lg shadow-black/30"
              }`}
            >
              {/* Card Header: Guest info & Status Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User size={15} className="text-gold" />
                    <h3 className="font-semibold text-sm sm:text-base text-cream">{r.name}</h3>
                  </div>
                  <a
                    href={`tel:${r.phone}`}
                    className="text-xs text-cream/50 hover:text-gold flex items-center gap-1.5 pt-0.5 transition-colors"
                  >
                    <Phone size={12} className="text-cream/40" />
                    {r.phone}
                  </a>
                </div>

                {r.confirmed ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 px-3 py-1">
                    <Check size={12} /> Confirmed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold rounded-full border border-saffron/30 bg-saffron/15 text-saffron px-3 py-1 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron"></span> Awaiting
                  </span>
                )}
              </div>

              {/* Booking Details Grid */}
              <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-charcoal/60 border border-white/5 text-center text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-cream/40 block mb-1">Date</span>
                  <span className="font-medium text-cream">{r.date}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-cream/40 block mb-1">Time</span>
                  <span className="font-medium text-gold flex items-center justify-center gap-1">
                    <Clock size={11} /> {r.time}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-cream/40 block mb-1">Guests</span>
                  <span className="font-medium text-cream flex items-center justify-center gap-1">
                    <Users size={11} className="text-cream/60" /> {r.guests}
                  </span>
                </div>
              </div>

              {/* Special Request */}
              {r.special_request && (
                <div className="text-xs text-cream/70 bg-white/[0.02] border border-white/5 rounded-xl p-3">
                  <span className="text-[10px] uppercase tracking-wider text-gold/80 block mb-1 font-bold">
                    Special Request
                  </span>
                  <p className="italic">“{r.special_request}”</p>
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-2 flex items-center gap-2">
                {!r.confirmed && (
                  <button
                    onClick={() => handleConfirm(r.id)}
                    disabled={confirmingId === r.id}
                    className="flex-1 rounded-xl bg-gradient-to-r from-gold to-gold-bright text-charcoal font-bold text-xs py-2.5 px-4 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-gold/20 disabled:opacity-60"
                  >
                    {confirmingId === r.id ? (
                      "Confirming..."
                    ) : (
                      <>
                        <Check size={14} /> Confirm Table
                      </>
                    )}
                  </button>
                )}

                {/* WhatsApp Guest Quick Action */}
                <a
                  href={`https://wa.me/${r.phone.replace(/\+/g, "")}?text=${encodeURIComponent(
                    `Hello ${r.name}, your table reservation at Surekha's Kitchen for ${r.guests} guests on ${r.date} at ${r.time} has been confirmed! We look forward to hosting you.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 p-2.5 hover:bg-emerald-500/20 transition-all flex items-center justify-center"
                  title="Send WhatsApp update to guest"
                >
                  <MessageSquare size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
