"use client";

import { MessageCircle } from "lucide-react";
import { whatsappOrderLink } from "@/lib/api";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappOrderLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-20 md:bottom-6 left-5 z-40 w-13 h-13 md:w-14 md:h-14 rounded-full bg-[#25D366] text-charcoal flex items-center justify-center shadow-xl shadow-black/50 hover:scale-110 active:scale-95 transition-all"
    >
      <MessageCircle size={26} />
    </a>
  );
}
