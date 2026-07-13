import type { Metadata } from "next";

export const metadata: Metadata = { title: "About — Surekha's Kitchen" };

const timeline = [
  { year: "1994", text: "Surekha starts cooking biryani for the street, one dabba at a time." },
  { year: "2008", text: "The first proper kitchen opens, still run by family, still by hand." },
  { year: "2019", text: "A dedicated dining room opens so the neighbourhood can eat in." },
  { year: "2026", text: "Surekha's Kitchen goes online, same recipes, wider table." },
];

export default function AboutPage() {
  return (
    <section className="pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-4xl px-6">
        <p className="eyebrow text-gold mb-3">Our Story</p>
        <h1 className="font-display text-4xl sm:text-5xl text-cream mb-8">
          Cooked With Love, Since Day One
        </h1>
        <p className="text-cream/65 leading-relaxed max-w-2xl">
          Surekha's Kitchen is a family-owned restaurant built on a simple
          idea: cook the way you would for your own family, and never cut a
          corner nobody asked you to cut. Every biryani is dum-cooked to
          order. Every curry starts from a fresh masala, ground that morning.
          Hygiene and freshness aren't a slogan here, they're the only way
          Surekha ever knew how to cook.
        </p>

        <div className="mt-16 space-y-10 border-l border-gold/20 pl-8">
          {timeline.map((t) => (
            <div key={t.year} className="relative">
              <span className="absolute -left-[41px] top-1 w-3 h-3 rounded-full bg-gold" />
              <p className="text-gold font-display text-xl">{t.year}</p>
              <p className="text-cream/60 mt-2 leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
