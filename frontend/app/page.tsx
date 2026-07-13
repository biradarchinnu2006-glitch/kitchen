import Hero from "@/components/Hero";
import SignatureDish from "@/components/SignatureDish";
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

      <section className="py-24 bg-charcoal">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eyebrow text-gold mb-3">From the Kitchen</p>
              <h2 className="font-display text-3xl sm:text-4xl text-cream">
                Today&rsquo;s Favourites
              </h2>
            </div>
            <Link href="/menu" className="text-sm text-gold hover:underline hidden sm:block">
              Full menu →
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

      <section className="py-24 bg-charcoal-light">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="eyebrow text-gold mb-3">Our Story</p>
            <h2 className="font-display text-3xl sm:text-4xl text-cream mb-6">
              Three generations, one stove
            </h2>
            <p className="text-cream/60 leading-relaxed">
              Surekha&rsquo;s Kitchen started as a home kitchen feeding the
              neighbourhood, and grew one dabba at a time. The recipes
              haven&rsquo;t changed — only the number of people we get to
              feed with them.
            </p>
            <Link
              href="/about"
              className="inline-block mt-6 text-sm text-gold border-b border-gold/40 hover:border-gold"
            >
              Read our story
            </Link>
          </div>
          <div className="aspect-square bg-charcoal-soft border border-gold/10 flex items-center justify-center">
            <span className="font-display italic text-cream/20">Kitchen photography</span>
          </div>
        </div>
      </section>

      <Reviews />
    </>
  );
}
