"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { fetchMessages } from "@/lib/adminApi";
import type { AdminMessage } from "@/lib/types";
import EmptyState from "@/components/admin/EmptyState";
import SkeletonRows from "@/components/admin/SkeletonRows";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages()
      .then(setMessages)
      .catch(() => setError("Could not load messages."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {error && (
        <p className="text-sm text-saffron bg-saffron/10 border border-saffron/20 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      {loading ? (
        <SkeletonRows rows={6} />
      ) : messages.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No messages yet"
          description="Messages sent from the contact form will land here."
        />
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className="rounded-lg border border-gold/15 bg-charcoal-light p-5"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div>
                  <p className="text-sm text-cream">{m.name}</p>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-xs text-gold/80 hover:text-gold"
                  >
                    {m.email}
                  </a>
                </div>
                <p className="text-xs text-cream/35 whitespace-nowrap">
                  {new Date(m.created_at).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <p className="text-sm text-cream/70 whitespace-pre-wrap">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
