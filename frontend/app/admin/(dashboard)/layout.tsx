"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import { useAdminAuth } from "@/lib/adminAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, loading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !admin) {
      router.push("/admin/login");
    }
  }, [admin, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal text-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
          <span className="text-xs text-cream/50">Verifying session...</span>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-charcoal text-cream">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Topbar />

        <main className="px-5 md:px-8 py-7 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
