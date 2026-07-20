"use client";

import { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";

interface Message {
  from: "user" | "bot";
  text: string;
}

const quickReplies = ["Timings", "Today's specials", "Delivery info", "Reservation help"];

const localAnswers: Record<string, string> = {
  timings: "We're open daily, 12:00 PM – 11:00 PM.",
  "today's specials": "Today's chef pick is the Special Chicken Biryani, dum-cooked to order.",
  "delivery info": "We deliver within 6 km. You can also order directly on WhatsApp for the fastest response.",
  "reservation help": "Head to the Reservations page, or tell me your date, time and party size here and I'll note it down.",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://kitchen-wd6d.onrender.com";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi! I'm here to help with the menu, timings or a reservation. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  async function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch(`${API_URL}/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error("backend chatbot unavailable");
      const data = await res.json();
      setMessages((m) => [...m, { from: "bot", text: data.reply }]);
    } catch {
      const key = text.toLowerCase().trim();
      const reply =
        localAnswers[key] ||
        "I'll pass that along — for anything urgent, tap the WhatsApp button and the team will reply directly.";
      setMessages((m) => [...m, { from: "bot", text: reply }]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 z-50">
      {open && (
        <div className="mb-4 w-80 max-h-[28rem] flex flex-col bg-charcoal-soft border border-gold/20 rounded-sm shadow-2xl shadow-black/50">
          <div className="px-4 py-3 border-b border-gold/10 flex items-center justify-between">
            <span className="font-display italic text-cream">Kitchen Assistant</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={16} className="text-cream/50" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 rounded-sm ${
                  m.from === "user"
                    ? "ml-auto bg-gold text-charcoal"
                    : "bg-charcoal border border-gold/10 text-cream/80"
                }`}
              >
                {m.text}
              </div>
            ))}
            {typing && <div className="text-cream/40 text-xs">Typing…</div>}
          </div>

          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-[11px] border border-gold/20 text-cream/60 px-2 py-1 hover:border-gold/50"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center border-t border-gold/10"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something…"
              className="flex-1 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/30 outline-none"
            />
            <button type="submit" className="px-4 text-gold" aria-label="Send">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat assistant"
        className="w-14 h-14 rounded-full bg-gold text-charcoal flex items-center justify-center shadow-lg shadow-black/40 hover:scale-105 transition-transform ml-auto"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
}
