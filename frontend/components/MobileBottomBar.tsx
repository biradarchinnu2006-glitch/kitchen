"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Calendar, MessageSquare, Phone } from "lucide-react";
import { whatsappOrderLink } from "@/lib/api";

export default function MobileBottomBar() {
  const pathname = usePathname();

  // Hide floating bar on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#14100c]/95 backdrop-blur-2xl border-t border-gold/20 px-3 py-2 shadow-2xl shadow-black/80">
      <div className="grid grid-cols-4 gap-1 text-center">
        <Link
          href="/menu"
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
            pathname === "/menu"
              ? "bg-gold/15 text-gold font-bold"
              : "text-cream/60 hover:text-cream active:scale-95"
          }`}
        >
          <BookOpen size={18} />
          <span className="text-[10px] mt-1 tracking-tight">Menu</span>
        </Link>

        <Link
          href="/reservations"
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
            pathname === "/reservations"
              ? "bg-gold/15 text-gold font-bold"
              : "text-cream/60 hover:text-cream active:scale-95"
          }`}
        >
          <Calendar size={18} />
          <span className="text-[10px] mt-1 tracking-tight">Reserve</span>
        </Link>

        <a
          href="tel:+918712023665"
          className="flex flex-col items-center justify-center py-1.5 rounded-xl text-cream/60 hover:text-gold active:scale-95 transition-all"
        >
          <Phone size={18} />
          <span className="text-[10px] mt-1 tracking-tight">Call</span>
        </a>

        <a
          href={whatsappOrderLink()}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-1.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-charcoal font-bold shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
        >
          <MessageSquare size={18} />
          <span className="text-[10px] mt-1 tracking-tight">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
