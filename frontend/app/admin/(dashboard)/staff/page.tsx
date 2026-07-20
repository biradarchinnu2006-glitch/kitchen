"use client";

import { FormEvent, useEffect, useState } from "react";
import { Users, Plus, Trash2, ShieldCheck } from "lucide-react";
import { useAdminAuth } from "@/lib/adminAuth";
import { createStaff, fetchStaff, removeStaff } from "@/lib/adminApi";
import type { Admin } from "@/lib/types";
import EmptyState from "@/components/admin/EmptyState";
import SkeletonRows from "@/components/admin/SkeletonRows";

export default function AdminStaffPage() {
  const { admin: currentAdmin } = useAdminAuth();
  const [staff, setStaff] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!currentAdmin?.is_superadmin) return;
    fetchStaff()
      .then(setStaff)
      .catch(() => setError("Could not load staff accounts."))
      .finally(() => setLoading(false));
  }, [currentAdmin]);

  if (currentAdmin && !currentAdmin.is_superadmin) {
    return (
      <EmptyState
        icon={ShieldCheck}
        title="Superadmin access only"
        description="Ask a superadmin on your team to manage staff accounts."
      />
    );
  }

  async function handleRemove(id: string) {
    if (!confirm("Remove this staff account? They'll immediately lose dashboard access.")) return;
    try {
      await removeStaff(id);
      setStaff((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove this account.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-cream/50">
          Accounts that can sign in to this dashboard.
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-md bg-gold text-charcoal text-xs font-medium px-3.5 py-2 hover:bg-gold-bright transition-colors"
        >
          <Plus size={14} />
          Add staff
        </button>
      </div>

      {error && (
        <p className="text-sm text-saffron bg-saffron/10 border border-saffron/20 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      {loading ? (
        <SkeletonRows rows={4} />
      ) : staff.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No staff accounts yet"
          description="Add teammates so they can help manage orders and the menu."
        />
      ) : (
        <div className="rounded-lg border border-gold/15 bg-charcoal-light divide-y divide-gold/10">
          {staff.map((s) => (
            <div key={s.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm text-cream">{s.full_name}</p>
                <p className="text-xs text-cream/40">{s.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-[11px] rounded-full border px-2.5 py-1 capitalize ${
                    s.is_superadmin
                      ? "border-gold/30 bg-gold/10 text-gold"
                      : "border-cream/20 bg-cream/10 text-cream/60"
                  }`}
                >
                  {s.role}
                </span>
                {s.id !== currentAdmin?.id && (
                  <button
                    onClick={() => handleRemove(s.id)}
                    className="p-1.5 rounded text-cream/40 hover:text-red-400"
                    aria-label="Remove staff account"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <StaffFormModal
          onClose={() => setShowForm(false)}
          onCreated={(created) => {
            setStaff((prev) => [...prev, created]);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}

function StaffFormModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (staff: Admin) => void;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuperadmin, setIsSuperadmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const created = await createStaff({
        full_name: fullName,
        email,
        password,
        is_superadmin: isSuperadmin,
      });
      onCreated(created);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create this account.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-gold/15 bg-charcoal-light p-6 space-y-4"
      >
        <h2 className="font-display text-lg text-cream mb-1">Add staff account</h2>

        <label className="block">
          <span className="block text-xs eyebrow text-cream/50 mb-1.5">Full name</span>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-md bg-charcoal border border-gold/15 px-3 py-2 text-sm text-cream outline-none focus:border-gold/40"
          />
        </label>

        <label className="block">
          <span className="block text-xs eyebrow text-cream/50 mb-1.5">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md bg-charcoal border border-gold/15 px-3 py-2 text-sm text-cream outline-none focus:border-gold/40"
          />
        </label>

        <label className="block">
          <span className="block text-xs eyebrow text-cream/50 mb-1.5">
            Temporary password
          </span>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md bg-charcoal border border-gold/15 px-3 py-2 text-sm text-cream outline-none focus:border-gold/40"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-cream/70">
          <input
            type="checkbox"
            checked={isSuperadmin}
            onChange={(e) => setIsSuperadmin(e.target.checked)}
            className="accent-gold"
          />
          Grant superadmin access
        </label>

        {error && (
          <p className="text-sm text-saffron bg-saffron/10 border border-saffron/20 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm text-cream/60 hover:text-cream"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-gold text-charcoal text-sm font-medium px-4 py-2 hover:bg-gold-bright transition-colors disabled:opacity-60"
          >
            {submitting ? "Creating…" : "Create account"}
          </button>
        </div>
      </form>
    </div>
  );
}
