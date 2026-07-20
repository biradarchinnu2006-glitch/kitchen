import Hero from "@/components/Hero";
import SignatureDish from "@/components/SignatureDish";
import PartyEstimator from "@/components/PartyEstimator";
import Reviews from "@/components/Reviews";
import FoodCard from "@/components/FoodCard";
import Link from "next/link";
import { fetchMenu } from "@/lib/api";

export default async function HomePage() {
  const menu = await fetchMenu();
  const featured = menu.slice(0, 4);

  return (
    <>
      <Hero />

      <section className="py-24 bg-charcoal relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-gold/[0.03] blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eyebrow text-gold mb-3">From the Kitchen</p>
              <h2 className="font-display text-3xl sm:text-4xl text-cream">
                Today&rsquo;s Favourites
              </h2>
              <div className="mt-3 w-12 h-0.5 bg-gradient-to-r from-gold to-transparent" />
            </div>
            <Link
              href="/menu"
              className="text-sm text-gold hover:text-gold-bright transition-colors hidden sm:flex items-center gap-2 group"
            >
              Full menu
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <SignatureDish />

      <PartyEstimator />

      <section className="py-24 bg-charcoal-light relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-saffron/[0.03] blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="eyebrow text-gold mb-3">Our Story</p>
            <h2 className="font-display text-3xl sm:text-4xl text-cream mb-6">
              Three generations, one stove
            </h2>
            <div className="mb-6 w-12 h-0.5 bg-gradient-to-r from-gold to-transparent" />
            <p className="text-cream/60 leading-relaxed">
              Surekha&rsquo;s Kitchen started as a home kitchen feeding the
              neighbourhood, and grew one dabba at a time. The recipes
              haven&rsquo;t changed — only the number of people we get to feed
              with them.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-6 text-sm text-gold border-b border-gold/40 hover:border-gold transition-colors group"
            >
              Read our story
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
          <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-amber-900/30 via-charcoal-soft to-charcoal-light border border-gold/10 flex flex-col items-center justify-center overflow-hidden">
            {/* Decorative rings */}
            <div className="absolute w-48 h-48 rounded-full border border-gold/10 animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-32 h-32 rounded-full border border-gold/15" />
            <div className="w-24 h-24 rounded-full bg-gold/[0.08] border border-gold/20 flex items-center justify-center">
              <span className="font-display text-gold text-sm italic text-center leading-tight">
                EST.
                <br />
                1994
              </span>
            </div>
            <p className="mt-4 text-cream/30 text-xs eyebrow">
              Family Kitchen
            </p>
          </div>
        </div>
      </section>

      <Reviews />
    </>
  );
}