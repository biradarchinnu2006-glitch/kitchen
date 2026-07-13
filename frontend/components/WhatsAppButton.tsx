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
      className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-charcoal flex items-center justify-center shadow-lg shadow-black/40 hover:scale-105 transition-transform"
    >
      <MessageCircle size={26} />
    </a>
  );
}
