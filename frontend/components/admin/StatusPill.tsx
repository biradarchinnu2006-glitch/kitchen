import type { OrderStatus } from "@/lib/types";

const styles: Record<OrderStatus, string> = {
  pending: "bg-cream/10 text-cream/70 border-cream/20",
  confirmed: "bg-gold/10 text-gold border-gold/25",
  preparing: "bg-saffron/10 text-saffron border-saffron/25",
  out_for_delivery: "bg-olive/20 text-[#9DB27C] border-olive/40",
  delivered: "bg-[#4A7A55]/15 text-[#7BC08A] border-[#4A7A55]/40",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/25",
};

const labels: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function StatusPill({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium whitespace-nowrap ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
