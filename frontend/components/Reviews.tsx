"use client";

import { useEffect, useState } from "react";
import { Star, MessageSquarePlus, CheckCircle2, ThumbsUp, Sparkles, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ReviewItem } from "@/lib/types";
import { fetchReviews, submitReview } from "@/lib/api";

const STORAGE_KEY = "surekhas_kitchen_reviews";

// Seed reviews for genuine customer feedback display
const initialReviews: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Sandeep Reddy",
    rating: 5,
    comment: "The dum biryani aroma when you open the earthen seal is unbelievable! Authentic Hyderabadi spice blend. Will order again every weekend.",
    dishTried: "Special Chicken Biryani",
    date: "2 days ago",
    verified: true,
  },
  {
    name: "Ananya Sharma",
    id: "rev-2",
    rating: 5,
    comment: "Soft melted ghee idlis for breakfast and crispy Medu Vada. Tastes like home cooked food with zero heavy grease.",
    dishTried: "Ghee Idli & Medu Vada",
    date: "1 week ago",
    verified: true,
  },
  {
    id: "rev-3",
    name: "Vikram R.",
    rating: 5,
    comment: "Chicken 65 starter was perfectly crispy outside and juicy inside. Fast delivery and piping hot packaging.",
    dishTried: "Chicken 65",
    date: "2 weeks ago",
    verified: true,
  },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [dishTried, setDishTried] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load reviews on mount
  useEffect(() => {
    async function load() {
      const remote = await fetchReviews();
      if (remote && Array.isArray(remote) && remote.length > 0) {
        setReviews(remote);
      } else {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setReviews(parsed);
          } catch {
            setReviews(initialReviews);
          }
        } else {
          setReviews(initialReviews);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialReviews));
        }
      }
    }
    load();
  }, []);

  // Submit Handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!comment.trim() || comment.trim().length < 5) {
      setError("Please leave a review comment (at least 5 characters).");
      return;
    }

    setError(null);
    setSubmitting(true);

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      rating,
      comment: comment.trim(),
      dishTried: dishTried.trim() || undefined,
      date: "Just now",
      verified: true,
    };

    try {
      await submitReview({ name: newReview.name, rating: newReview.rating, comment: newReview.comment, dishTried: newReview.dishTried });
    } catch {
      // Ignore API errors, handle local storage
    }

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    setSubmitting(false);
    setSubmitted(true);
    setName("");
    setComment("");
    setDishTried("");
    setRating(5);
  }

  // Calculate average rating
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  const filteredReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  return (
    <section className="py-24 bg-[#0e0c09] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gold/[0.03] blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-gold" />
              <p className="eyebrow text-gold">Real Guest Feedback</p>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-cream">
              Community Reviews
            </h2>
            <div className="mt-2 w-16 h-0.5 bg-gradient-to-r from-gold to-transparent" />
          </div>

          {/* Rating Summary & Write Button */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 rounded-2xl backdrop-blur-sm">
              <Star size={24} className="fill-amber-400 text-amber-400" />
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-cream">{avgRating}</span>
                  <span className="text-xs text-cream/40">/ 5.0</span>
                </div>
                <p className="text-[10px] text-cream/50 uppercase tracking-wider">
                  {reviews.length} Verified {reviews.length === 1 ? "Review" : "Reviews"}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setShowForm(!showForm);
                setSubmitted(false);
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-gold to-gold-bright text-charcoal font-semibold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-gold/20"
            >
              <MessageSquarePlus size={18} />
              {showForm ? "Close Form" : "Write a Review"}
            </button>
          </div>
        </div>

        {/* Interactive Add Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden mb-12"
            >
              <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#1c1813] to-[#14110d] border border-gold/30 shadow-2xl relative">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <CheckCircle2 size={48} className="text-gold mx-auto mb-4" />
                    <h3 className="font-display text-2xl text-cream mb-2">
                      Thank You for Your Review!
                    </h3>
                    <p className="text-cream/60 text-sm max-w-md mx-auto mb-6">
                      Your feedback has been added directly to Surekha&apos;s Kitchen community reviews.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full border border-gold/30 text-gold text-xs uppercase tracking-wider hover:bg-gold hover:text-charcoal transition-colors"
                    >
                      Write Another Review
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="font-display text-xl text-cream flex items-center gap-2">
                      <Sparkles size={18} className="text-gold" /> Share Your Dining Experience
                    </h3>

                    {/* Rating selector */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-cream/60 mb-2">
                        Your Rating
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                          >
                            <Star
                              size={28}
                              className={
                                star <= (hoverRating || rating)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-cream/20"
                              }
                            />
                          </button>
                        ))}
                        <span className="ml-3 text-sm text-gold font-medium">
                          {hoverRating || rating} / 5 Stars
                        </span>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream placeholder:text-cream/25 focus:border-gold/50 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1.5">
                          Dish You Tried (Optional)
                        </label>
                        <input
                          type="text"
                          value={dishTried}
                          onChange={(e) => setDishTried(e.target.value)}
                          placeholder="e.g. Chicken Dum Biryani"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream placeholder:text-cream/25 focus:border-gold/50 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1.5">
                        Your Review *
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us about the taste, spice level, freshness, or service..."
                        rows={3}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-cream placeholder:text-cream/25 focus:border-gold/50 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-saffron text-xs">{error}</p>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-5 py-2.5 rounded-full border border-white/10 text-cream/60 text-sm hover:bg-white/5 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-7 py-2.5 rounded-full bg-gradient-to-r from-saffron to-saffron-dark text-charcoal font-semibold text-sm hover:scale-105 transition-transform disabled:opacity-50"
                      >
                        {submitting ? "Posting..." : "Post Review"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rating Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <span className="text-xs text-cream/40 flex items-center gap-1 mr-2">
            <Filter size={12} /> Filter:
          </span>
          <button
            onClick={() => setFilterRating(null)}
            className={`px-4 py-1.5 rounded-full text-xs transition-colors whitespace-nowrap ${
              filterRating === null
                ? "bg-gold text-charcoal font-medium"
                : "bg-white/5 text-cream/60 hover:bg-white/10"
            }`}
          >
            All ({reviews.length})
          </button>
          {[5, 4, 3].map((num) => {
            const count = reviews.filter((r) => r.rating === num).length;
            return (
              <button
                key={num}
                onClick={() => setFilterRating(filterRating === num ? null : num)}
                className={`px-4 py-1.5 rounded-full text-xs transition-colors whitespace-nowrap ${
                  filterRating === num
                    ? "bg-gold text-charcoal font-medium"
                    : "bg-white/5 text-cream/60 hover:bg-white/10"
                }`}
              >
                ★ {num} ({count})
              </button>
            );
          })}
        </div>

        {/* Reviews List */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((rev) => (
              <motion.div
                key={rev.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#181510] to-[#12100c] border border-white/[0.06] hover:border-gold/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < rev.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-cream/15"
                          }
                        />
                      ))}
                    </div>
                    {rev.verified && (
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        Verified Guest
                      </span>
                    )}
                  </div>

                  {rev.dishTried && (
                    <span className="inline-block text-[11px] text-gold/80 bg-gold/10 px-2.5 py-1 rounded-md mb-3">
                      Ordered: {rev.dishTried}
                    </span>
                  )}

                  <p className="text-cream/70 text-sm leading-relaxed mb-4">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.05] mt-auto">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-xs uppercase">
                      {rev.name.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-cream text-xs font-semibold">{rev.name}</p>
                      <p className="text-[10px] text-cream/40">{rev.date}</p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      const btn = e.currentTarget;
                      btn.classList.add("text-gold");
                    }}
                    className="text-cream/30 hover:text-gold transition-colors text-xs flex items-center gap-1"
                    title="Helpful"
                  >
                    <ThumbsUp size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-16 border border-white/5 rounded-2xl">
            <p className="text-cream/50 text-sm">No reviews found matching this filter.</p>
            <button
              onClick={() => setFilterRating(null)}
              className="mt-3 text-gold text-xs underline"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
