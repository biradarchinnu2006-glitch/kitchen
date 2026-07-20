"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, UtensilsCrossed, Leaf } from "lucide-react";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@/lib/adminApi";
import type { AdminProduct } from "@/lib/types";
import EmptyState from "@/components/admin/EmptyState";
import SkeletonRows from "@/components/admin/SkeletonRows";
import ProductFormModal, {
  ProductFormValues,
} from "@/components/admin/ProductFormModal";

export default function AdminMenuPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<"closed" | "create" | AdminProduct>("closed");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError("Could not load the menu."))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const filtered = useMemo(
    () =>
      categoryFilter === "all"
        ? products
        : products.filter((p) => p.category === categoryFilter),
    [products, categoryFilter]
  );

  async function handleCreate(values: ProductFormValues) {
    const created = await createProduct(values);
    setProducts((prev) => [...prev, created]);
    setModal("closed");
  }

  async function handleUpdate(id: string, values: ProductFormValues) {
    const updated = await updateProduct(id, values);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    setModal("closed");
  }

  async function handleToggleActive(product: AdminProduct) {
    const updated = await updateProduct(product.id, { is_active: !product.is_active });
    setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)));
  }

  async function handleDelete(product: AdminProduct) {
    if (!confirm(`Remove "${product.name}" from the menu? This can't be undone.`)) return;
    setDeletingId(product.id);
    try {
      await deleteProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch {
      setError("Could not remove this item. Try again.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`rounded-full px-3.5 py-1.5 text-xs border capitalize transition-colors ${
                categoryFilter === c
                  ? "bg-gold/10 text-gold border-gold/30"
                  : "border-gold/10 text-cream/50 hover:text-cream hover:border-gold/20"
              }`}
            >
              {c.replace(/-/g, " ")}
            </button>
          ))}
        </div>

        <button
          onClick={() => setModal("create")}
          className="flex items-center gap-2 rounded-md bg-gold text-charcoal text-xs font-medium px-3.5 py-2 hover:bg-gold-bright transition-colors"
        >
          <Plus size={14} />
          Add item
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
          icon={UtensilsCrossed}
          title="No items in this category"
          description="Add your first dish to get the menu started."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => (
            <div
              key={product.id}
              className={`rounded-lg border p-4 flex flex-col gap-3 ${
                product.is_active
                  ? "border-gold/15 bg-charcoal-light"
                  : "border-gold/10 bg-charcoal-light/50 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm text-cream truncate">{product.name}</p>
                  <p className="text-xs text-cream/40 capitalize">
                    {product.category.replace(/-/g, " ")}
                  </p>
                </div>
                {product.is_veg && (
                  <span title="Vegetarian" className="shrink-0 mt-0.5">
                    <Leaf size={13} className="text-[#7BC08A]" />
                  </span>
                )}
              </div>

              <p className="text-xs text-cream/50 line-clamp-2">{product.description}</p>

              <div className="flex items-center justify-between mt-auto pt-2 border-t border-gold/10">
                <span className="text-sm text-gold font-medium">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleActive(product)}
                    className="text-[11px] px-2 py-1 rounded border border-gold/15 text-cream/50 hover:text-cream"
                    title={product.is_active ? "Mark unavailable" : "Mark available"}
                  >
                    {product.is_active ? "Available" : "Hidden"}
                  </button>
                  <button
                    onClick={() => setModal(product)}
                    className="p-1.5 rounded text-cream/50 hover:text-gold"
                    aria-label="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    disabled={deletingId === product.id}
                    className="p-1.5 rounded text-cream/50 hover:text-red-400 disabled:opacity-50"
                    aria-label="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal !== "closed" && (
        <ProductFormModal
          initial={modal === "create" ? null : modal}
          onClose={() => setModal("closed")}
          onSubmit={(values) =>
            modal === "create" ? handleCreate(values) : handleUpdate(modal.id, values)
          }
        />
      )}
    </div>
  );
}
