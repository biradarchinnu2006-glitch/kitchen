"use client";

import { FormEvent, useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import type { AdminProduct } from "@/lib/types";

const CATEGORIES: AdminProduct["category"][] = [
  "starters",
  "biryani",
  "curries",
  "breads",
  "rice",
  "desserts",
  "cold-drinks",
  "hot-drinks",
];

const SPICE_LEVELS = ["mild", "medium", "hot"] as const;

export interface ProductFormValues {
  name: string;
  category: AdminProduct["category"];
  description: string;
  price: number;
  calories: number;
  spice_level: (typeof SPICE_LEVELS)[number];
  is_veg: boolean;
  is_signature: boolean;
  image_url: string | null;
}

export default function ProductFormModal({
  initial,
  onClose,
  onSubmit,
}: {
  initial?: AdminProduct | null;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => Promise<void>;
}) {
  const [values, setValues] = useState<ProductFormValues>({
    name: initial?.name ?? "",
    category: initial?.category ?? "starters",
    description: initial?.description ?? "",
    price: initial?.price ?? 0,
    calories: initial?.calories ?? 0,
    spice_level: initial?.spice_level ?? "mild",
    is_veg: initial?.is_veg ?? true,
    is_signature: initial?.is_signature ?? false,
    image_url: initial?.image_url ?? "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        ...values,
        image_url: values.image_url?.trim() ? values.image_url.trim() : null,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save this item.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg border border-gold/15 bg-charcoal-light">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10 sticky top-0 bg-charcoal-light">
          <h2 className="font-display text-lg text-cream">
            {initial ? "Edit item" : "Add menu item"}
          </h2>
          <button onClick={onClose} className="text-cream/50 hover:text-cream" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <Field label="Name">
            <input
              required
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              className="input"
            />
          </Field>

          <Field label="Description">
            <textarea
              required
              rows={3}
              value={values.description}
              onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
              className="input resize-none"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select
                value={values.category}
                onChange={(e) =>
                  setValues((v) => ({ ...v, category: e.target.value as AdminProduct["category"] }))
                }
                className="input"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c.replace(/-/g, " ")}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Spice level">
              <select
                value={values.spice_level}
                onChange={(e) =>
                  setValues((v) => ({
                    ...v,
                    spice_level: e.target.value as ProductFormValues["spice_level"],
                  }))
                }
                className="input"
              >
                {SPICE_LEVELS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Price (₹)">
              <input
                type="number"
                required
                min={1}
                step="0.01"
                value={values.price}
                onChange={(e) => setValues((v) => ({ ...v, price: Number(e.target.value) }))}
                className="input"
              />
            </Field>

            <Field label="Calories">
              <input
                type="number"
                required
                min={0}
                value={values.calories}
                onChange={(e) => setValues((v) => ({ ...v, calories: Number(e.target.value) }))}
                className="input"
              />
            </Field>
          </div>

          <Field label="Image URL (optional)">
            <input
              value={values.image_url ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, image_url: e.target.value }))}
              className="input"
              placeholder="https://…"
            />
          </Field>

          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2 text-sm text-cream/70">
              <input
                type="checkbox"
                checked={values.is_veg}
                onChange={(e) => setValues((v) => ({ ...v, is_veg: e.target.checked }))}
                className="accent-gold"
              />
              Vegetarian
            </label>
            <label className="flex items-center gap-2 text-sm text-cream/70">
              <input
                type="checkbox"
                checked={values.is_signature}
                onChange={(e) => setValues((v) => ({ ...v, is_signature: e.target.checked }))}
                className="accent-gold"
              />
              Signature dish
            </label>
          </div>

          {error && (
            <p className="text-sm text-saffron bg-saffron/10 border border-saffron/20 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
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
              className="flex items-center gap-2 rounded-md bg-gold text-charcoal text-sm font-medium px-4 py-2 hover:bg-gold-bright transition-colors disabled:opacity-60"
            >
              {submitting && <Loader2 size={14} className="animate-spin" />}
              {initial ? "Save changes" : "Add item"}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.375rem;
          background: #17140f;
          border: 1px solid rgba(201, 162, 75, 0.15);
          padding: 0.55rem 0.75rem;
          font-size: 0.875rem;
          color: #f4eedf;
          outline: none;
        }
        .input:focus {
          border-color: rgba(201, 162, 75, 0.5);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs eyebrow text-cream/50 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
