"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X, Flame, BellRing, Circle } from "lucide-react";
import { useAdminAuth } from "@/lib/adminAuth";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/menu", label: "Menu" },
  { href: "/admin/reservations", label: "Reservations" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/staff", label: "Staff", superadminOnly: true },
];

const titleByPath: Record<string, string> = {
  "/admin": "Overview",
  "/admin/orders": "Orders",
  "/admin/menu": "Menu",
  "/admin/reservations": "Reservations",
  "/admin/messages": "Messages",
  "/admin/staff": "Staff",
};

export default function Topbar() {
  const { admin, logout } = useAdminAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [kitchenStatus, setKitchenStatus] = useState<"online" | "rush" | "paused">("online");
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("surekhas_kitchen_status");
    if (saved === "online" || saved === "rush" || saved === "paused") {
      setKitchenStatus(saved);
    }
  }, []);

  const changeStatus = (newStatus: "online" | "rush" | "paused") => {
    setKitchenStatus(newStatus);
    localStorage.setItem("surekhas_kitchen_status", newStatus);
    setShowStatusMenu(false);
  };

  const title = (pathname && titleByPath[pathname]) || "Overview";
  const visibleLinks = links.filter((l) => !l.superadminOnly || admin?.is_superadmin);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 bg-charcoal/95 backdrop-blur-xl">
      <div className="flex items-center justify-between px-5 md:px-8 py-3.5">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-cream"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div>
            <h1 className="font-display text-lg md:text-xl text-cream flex items-center gap-2">
              {title}
            </h1>
            <p className="text-[10px] text-cream/40 hidden sm:block">Kitchen Command Center</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Live Kitchen Status Switcher Badge */}
          <div className="relative">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all shadow-md ${
                kitchenStatus === "online"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                  : kitchenStatus === "rush"
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
                  : "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
              }`}
            >
              <Circle
                size={8}
                className={`fill-current ${
                  kitchenStatus === "online"
                    ? "text-emerald-400 animate-pulse"
                    : kitchenStatus === "rush"
                    ? "text-amber-400 animate-bounce"
                    : "text-red-400"
                }`}
              />
              <span className="capitalize">
                {kitchenStatus === "online"
                  ? "Kitchen Online"
                  : kitchenStatus === "rush"
                  ? "High Demand Rush"
                  : "Orders Paused"}
              </span>
            </button>

            {/* Dropdown Menu */}
            {showStatusMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#1c1813] border border-gold/30 p-2 shadow-2xl z-50 text-xs space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-cream/40 px-2 py-1 font-bold">
                  Set Kitchen Status
                </p>
                <button
                  onClick={() => changeStatus("online")}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-emerald-500/10 text-emerald-400 transition-colors text-left"
                >
                  <Circle size={8} className="fill-emerald-400" /> Kitchen Online (Normal)
                </button>
                <button
                  onClick={() => changeStatus("rush")}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-amber-500/10 text-amber-400 transition-colors text-left"
                >
                  <Flame size={12} className="text-amber-400" /> Rush Hour (30m delay)
                </button>
                <button
                  onClick={() => changeStatus("paused")}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors text-left"
                >
                  <Circle size={8} className="fill-red-400" /> Pause Orders (Busy)
                </button>
              </div>
            )}
          </div>

          {admin && (
            <div className="hidden sm:flex flex-col items-end leading-tight border-l border-gold/15 pl-4">
              <span className="text-sm text-cream/90 font-medium">{admin.full_name}</span>
              <span className="text-[11px] text-gold capitalize font-sans">{admin.role}</span>
            </div>
          )}

          <button
            onClick={logout}
            className="flex items-center gap-1.5 rounded-lg border border-gold/15 px-3 py-1.5 text-xs text-cream/70 hover:text-gold hover:border-gold/30 transition-colors"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden px-5 pb-4 flex flex-col gap-1 border-t border-gold/10 pt-3">
          {visibleLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`rounded-md px-3 py-2 text-sm ${
                pathname === l.href ? "bg-gold/10 text-gold font-medium" : "text-cream/60 hover:text-cream"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
