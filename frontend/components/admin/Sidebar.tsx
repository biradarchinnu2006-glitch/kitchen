"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  UtensilsCrossed,
  CalendarCheck,
  MessageSquare,
  Users,
} from "lucide-react";
import { useAdminAuth } from "@/lib/adminAuth";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/reservations", label: "Reservations", icon: CalendarCheck },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { admin } = useAdminAuth();

  const items = admin?.is_superadmin
    ? [...links, { href: "/admin/staff", label: "Staff", icon: Users }]
    : links;

  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-gold/10 bg-charcoal-light min-h-screen sticky top-0">
      <div className="px-6 py-7 border-b border-gold/10">
        <Link href="/admin" className="font-display italic text-lg text-cream">
          Surekha&rsquo;s <span className="text-gold not-italic">Kitchen</span>
        </Link>
        <p className="mt-1 text-[11px] eyebrow text-cream/35">Back of House</p>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1">
        {items.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname?.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-gold/10 text-gold border border-gold/20"
                  : "text-cream/60 hover:text-cream hover:bg-charcoal-soft border border-transparent"
              }`}
            >
              <Icon size={16} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-5 border-t border-gold/10">
        <Link href="/" className="text-xs text-cream/35 hover:text-gold transition-colors">
          ← Back to site
        </Link>
      </div>
    </aside>
  );
}
