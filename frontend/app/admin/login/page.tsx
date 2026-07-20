"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole } from "lucide-react";
import { useAdminAuth } from "@/lib/adminAuth";

export default function AdminLoginPage() {
  const { login, admin, loading: sessionLoading } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
  if (!sessionLoading && admin) {
    router.replace("/admin");
  }
}, [sessionLoading, admin, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-charcoal text-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="mx-auto mb-5 h-12 w-12 rounded-full border border-gold/30 bg-charcoal-light flex items-center justify-center">
            <LockKeyhole size={18} className="text-gold" />
          </div>
          <h1 className="font-display italic text-2xl text-cream">
            Surekha&rsquo;s <span className="text-gold not-italic">Kitchen</span>
          </h1>
          <p className="mt-2 text-xs eyebrow text-cream/40">Back of House</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-gold/15 bg-charcoal-light p-7 space-y-5"
        >
          <div>
            <label htmlFor="email" className="block text-xs eyebrow text-cream/50 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-charcoal border border-gold/15 px-3 py-2.5 text-sm text-cream placeholder:text-cream/30 focus:border-gold/50 outline-none"
              placeholder="you@surekhaskitchen.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs eyebrow text-cream/50 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-charcoal border border-gold/15 px-3 py-2.5 text-sm text-cream placeholder:text-cream/30 focus:border-gold/50 outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-saffron bg-saffron/10 border border-saffron/20 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-gold text-charcoal font-medium text-sm py-2.5 flex items-center justify-center gap-2 hover:bg-gold-bright transition-colors disabled:opacity-60"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-cream/30">
          Staff accounts are created by a superadmin from the Staff tab.
        </p>
      </div>
    </div>
  );
}
