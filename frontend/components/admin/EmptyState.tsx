import { LucideIcon } from "lucide-react";

export default function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-lg border border-dashed border-gold/15">
      <div className="h-10 w-10 rounded-full bg-charcoal-soft flex items-center justify-center mb-4">
        <Icon size={18} className="text-cream/40" />
      </div>
      <p className="text-sm text-cream/70">{title}</p>
      <p className="text-xs text-cream/40 mt-1 max-w-xs">{description}</p>
    </div>
  );
}
