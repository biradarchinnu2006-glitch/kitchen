"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatWidget from "@/components/ChatWidget";
import MobileBottomBar from "@/components/MobileBottomBar";

/**
 * The admin dashboard is a separate application surface — it shouldn't
 * carry the public site's navbar, footer, WhatsApp button, or chat widget.
 * Everything under /admin renders its own chrome (see app/admin layouts).
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="pb-16 md:pb-0">{children}</main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <MobileBottomBar />
    </>
  );
}
