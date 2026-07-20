"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Check } from "lucide-react";
import { confirmReservation, fetchReservations } from "@/lib/adminApi";
import type { AdminReservation } from "@/lib/types";
import EmptyState from "@/components/admin/EmptyState";
import SkeletonRows from "@/components/admin/SkeletonRows";

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<AdminReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  useEffect(() => {
    fetchReservations()
      .then(setReservations)
      .catch(() => setError("Could not load reservations."))
      .finally(() => setLoading(false));
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

  return (
    <div className="space-y-6">
      {error && (
        <p className="text-sm text-saffron bg-saffron/10 border border-saffron/20 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      {loading ? (
        <SkeletonRows rows={6} />
      ) : reservations.length === 0 ? (
        <EmptyState
          icon={CalendarCheck}
          title="No reservations yet"
          description="Table bookings made from the site will show up here for confirmation."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reservations.map((r) => (
            <div
              key={r.id}
              className="rounded-lg border border-gold/15 bg-charcoal-light p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-cream">{r.name}</p>
                  <p className="text-xs text-cream/40">{r.phone}</p>
                </div>
                {r.confirmed ? (
                  <span className="flex items-center gap-1 text-[11px] rounded-full border border-[#4A7A55]/40 bg-[#4A7A55]/15 text-[#7BC08A] px-2.5 py-1">
                    <Check size={11} /> Confirmed
                  </span>
                ) : (
                  <span className="text-[11px] rounded-full border border-cream/20 bg-cream/10 text-cream/70 px-2.5 py-1">
                    Awaiting
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-cream/70">
                <span>{r.date}</span>
                <span className="text-cream/30">·</span>
                <span>{r.time}</span>
                <span className="text-cream/30">·</span>
                <span>
                  {r.guests} {r.guests === 1 ? "guest" : "guests"}
                </span>
              </div>

              {r.special_request && (
                <p className="text-xs text-cream/50 border-t border-gold/10 pt-3">
                  “{r.special_request}”
                </p>
              )}

              {!r.confirmed && (
                <button
                  onClick={() => handleConfirm(r.id)}
                  disabled={confirmingId === r.id}
                  className="mt-1 self-start rounded-md bg-gold text-charcoal text-xs font-medium px-3.5 py-1.5 hover:bg-gold-bright transition-colors disabled:opacity-60"
                >
                  Confirm table
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
