import { Star } from "lucide-react";

export default function Reviews() {
  return (
    <section className="py-24 bg-charcoal">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="eyebrow text-gold mb-4">Customer Reviews</p>
        <h2 className="font-display text-3xl sm:text-4xl text-cream mb-6">
          We&rsquo;re excited to serve you
        </h2>
        <div className="border border-gold/15 bg-charcoal-soft px-8 py-12">
          <div className="flex justify-center gap-1 mb-5 opacity-30">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} className="text-gold" />
            ))}
          </div>
          <p className="text-cream/60 leading-relaxed">
            Reviews will appear here once verified feedback has been received.
          </p>
        </div>
      </div>
    </section>
  );
}
