"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Sparkles, ChefHat, ExternalLink, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { whatsappOrderLink } from "@/lib/api";
import { getDishImage } from "@/lib/dishImages";

interface RecommendedDish {
  name: string;
  price: number;
  spice: string;
  isVeg: boolean;
  image: string;
}

interface Message {
  id: string;
  from: "user" | "bot";
  text: string;
  dish?: RecommendedDish;
  options?: string[];
}

const initialMessages: Message[] = [
  {
    id: "m-1",
    from: "bot",
    text: "Namaste! 🙏 I'm Chef Surekha's AI Culinary Assistant. Looking for dish recommendations, spice levels, or delivery info?",
    options: ["🪄 Personal Flavor Quiz", "🍛 Top Biryanis", "🥗 Best Veg Starters", "🕒 Timings & Delivery"],
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [quizStep, setQuizStep] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ diet?: string; spice?: string }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, typing, open]);

  const addBotReply = (text: string, dish?: RecommendedDish, options?: string[]) => {
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `bot-${Date.now()}`,
          from: "bot",
          text,
          dish,
          options,
        },
      ]);
      setTyping(false);
    }, 600);
  };

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;
    const text = userText.trim();

    // Add user message
    setMessages((m) => [...m, { id: `user-${Date.now()}`, from: "user", text }]);
    setInput("");

    const lower = text.toLowerCase();

    // Flavor quiz triggers
    if (lower.includes("quiz") || lower.includes("flavor quiz")) {
      setQuizStep(1);
      addBotReply("Let's find your perfect dish! Step 1/2: What is your dietary preference?", undefined, [
        "🥦 Pure Veg",
        "🍗 Non-Veg (Chicken/Mutton)",
        "🐟 Seafood",
      ]);
      return;
    }

    if (quizStep === 1) {
      setQuizAnswers({ diet: lower });
      setQuizStep(2);
      addBotReply(`Got it (${text})! Step 2/2: How much heat/spice do you enjoy?`, undefined, [
        "🌱 Mild & Creamy",
        "🌶️ Medium Authentic",
        "🔥 Volcanic Spicy",
      ]);
      return;
    }

    if (quizStep === 2) {
      setQuizStep(null);
      const diet = quizAnswers.diet || "";

      if (diet.includes("veg") && !diet.includes("non")) {
        addBotReply(
          `Chef Surekha recommends Paneer Tikka & Ghee Dosa for a rich ${text} vegetarian meal!`,
          {
            name: "Paneer Tikka",
            price: 240,
            spice: text,
            isVeg: true,
            image: getDishImage("Paneer Tikka"),
          },
          ["Order Paneer Tikka on WhatsApp", "Start Quiz Again"]
        );
      } else if (diet.includes("seafood")) {
        addBotReply(
          `For seafood lovers enjoying ${text} flavor, Apollo Fish Fry is crisp, juicy, and legendary!`,
          {
            name: "Apollo Fish",
            price: 280,
            spice: text,
            isVeg: false,
            image: getDishImage("Apollo Fish"),
          },
          ["Order Apollo Fish on WhatsApp", "Start Quiz Again"]
        );
      } else {
        addBotReply(
          `Your ideal match is Chef Surekha's Special Chicken Dum Biryani cooked dum-style for 2 hours!`,
          {
            name: "Special Chicken Biryani",
            price: 320,
            spice: text,
            isVeg: false,
            image: getDishImage("Chicken Dum Biryani"),
          },
          ["Order Special Biryani on WhatsApp", "Explore Full Menu"]
        );
      }
      return;
    }

    // Natural conversation matching
    if (lower.includes("biryani") || lower.includes("top biryani")) {
      addBotReply(
        "Our Special Chicken Dum Biryani is marinated overnight with 16 spices and slow-cooked in sealed clay pots.",
        {
          name: "Chicken Dum Biryani",
          price: 320,
          spice: "Medium Spice",
          isVeg: false,
          image: getDishImage("Chicken Dum Biryani"),
        },
        ["Order on WhatsApp", "See Veg Options"]
      );
    } else if (lower.includes("veg") || lower.includes("vegetarian")) {
      addBotReply(
        "We serve 100% segregated Pure-Veg specialties including Ghee Idli, Masala Dosa, and Smokey Paneer Tikka!",
        {
          name: "Masala Dosa",
          price: 120,
          spice: "Mild",
          isVeg: true,
          image: getDishImage("Masala Dosa"),
        },
        ["Order Masala Dosa", "View Paneer Tikka"]
      );
    } else if (lower.includes("timing") || lower.includes("time") || lower.includes("open")) {
      addBotReply("We are open daily from 12:00 PM to 11:00 PM for dine-in, takeaway, and direct WhatsApp delivery!", undefined, [
        "Book a Table",
        "Order Food Now",
      ]);
    } else if (lower.includes("delivery") || lower.includes("order")) {
      addBotReply("We deliver fresh & piping hot within a 6 km radius. Tap below to place your order directly via WhatsApp!", undefined, [
        "Order on WhatsApp",
        "Check Menu Prices",
      ]);
    } else if (lower.includes("whatsapp")) {
      window.open(whatsappOrderLink(), "_blank");
      addBotReply("Opening WhatsApp for your order! Feel free to ask anything else.");
    } else {
      addBotReply(
        "Chef Surekha recommends trying our signature Hyderabadi Dum Biryani or crisp Chicken 65! Would you like to check out our specials?",
        {
          name: "Chicken 65",
          price: 220,
          spice: "Hot & Crispy",
          isVeg: false,
          image: getDishImage("Chicken 65"),
        },
        ["🪄 Personal Flavor Quiz", "View All Specials"]
      );
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 w-[92vw] sm:w-[380px] max-h-[520px] h-[520px] flex flex-col bg-gradient-to-b from-[#181410] to-[#0f0d0a] border border-gold/30 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-[#221c15] to-[#16120d] border-b border-gold/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shadow-md">
                  <ChefHat size={20} />
                </div>
                <div>
                  <h3 className="font-display text-cream text-sm font-semibold flex items-center gap-1.5">
                    Chef Surekha AI <Sparkles size={12} className="text-gold" />
                  </h3>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Culinary Advisor
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-cream/70 hover:text-cream transition-colors"
                aria-label="Close AI chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-xs">
              {messages.map((m) => (
                <div key={m.id} className="space-y-2">
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl leading-relaxed ${
                      m.from === "user"
                        ? "ml-auto bg-gradient-to-r from-gold to-gold-bright text-charcoal font-medium rounded-br-none shadow-md"
                        : "bg-white/[0.04] border border-white/[0.08] text-cream/90 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Visual Dish Recommendation Card */}
                  {m.dish && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="ml-2 my-2 p-3 rounded-2xl bg-gradient-to-r from-[#251e16] to-[#18130e] border border-gold/30 flex items-center gap-3 shadow-lg max-w-[88%]"
                    >
                      <img
                        src={m.dish.image}
                        alt={m.dish.name}
                        className="w-16 h-16 rounded-xl object-cover border border-white/10"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-display text-sm text-cream truncate">{m.dish.name}</h4>
                          <span className="text-gold font-bold text-xs">₹{m.dish.price}</span>
                        </div>
                        <p className="text-[10px] text-cream/50 mt-0.5">{m.dish.spice}</p>
                        <a
                          href={whatsappOrderLink(m.dish.name)}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-charcoal bg-gold hover:bg-gold-bright px-2.5 py-1 rounded-full transition-transform hover:scale-105"
                        >
                          Order on WhatsApp <ExternalLink size={10} />
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {/* Quick Options */}
                  {m.options && (
                    <div className="flex flex-wrap gap-1.5 pl-2 pt-1">
                      {m.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSend(opt)}
                          className="text-[10px] bg-white/[0.04] hover:bg-gold hover:text-charcoal border border-gold/20 text-gold px-3 py-1 rounded-full transition-all"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="flex items-center gap-2 text-cream/40 text-xs bg-white/[0.04] px-3 py-2 rounded-xl w-fit">
                  <RefreshCw size={12} className="animate-spin text-gold" /> Chef Surekha is crafting a response...
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 bg-[#13100c] border-t border-white/[0.08] flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about biryani, mild dishes, timings..."
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2.5 text-xs text-cream placeholder:text-cream/30 outline-none focus:border-gold/50 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-9 h-9 rounded-full bg-gradient-to-r from-gold to-gold-bright text-charcoal flex items-center justify-center disabled:opacity-40 hover:scale-105 active:scale-95 transition-all shadow-md flex-shrink-0"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Open AI Chef Assistant"
        className="relative group w-14 h-14 rounded-full bg-gradient-to-r from-gold via-gold-bright to-saffron text-charcoal flex items-center justify-center shadow-2xl shadow-gold/40 border border-white/20"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border border-white"></span>
        </span>
        <ChefHat size={26} className="group-hover:rotate-12 transition-transform duration-300" />
      </motion.button>
    </div>
  );
}
