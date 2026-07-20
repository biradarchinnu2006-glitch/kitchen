import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Surekha's Kitchen — Traditional Hyderabadi Taste & Fine Dining",
  description:
    "Authentic slow-cooked dum biryani, clay oven tandoori specials, and South Indian delicacies. Hand-ground spices, 100% fresh ingredients.",
  openGraph: {
    title: "Surekha's Kitchen — Traditional Hyderabadi Taste",
    description: "Authentic Hyderabadi slow-cooked dum biryani and tandoori delicacies.",
    url: "https://surekhaskitchen.com",
    siteName: "Surekha's Kitchen",
    images: [
      {
        url: "/food/chicken_biryani.png",
        width: 1200,
        height: 630,
        alt: "Surekha's Kitchen Hyderabadi Dum Biryani",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Surekha's Kitchen",
    description: "Authentic Hyderabadi Dum Biryani & Fine Dining.",
    images: ["/food/chicken_biryani.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Surekha's Kitchen",
  image: "https://surekhaskitchen.com/food/chicken_biryani.png",
  "@id": "https://surekhaskitchen.com",
  url: "https://surekhaskitchen.com",
  telephone: "+918712023665",
  priceRange: "₹₹",
  menu: "https://surekhaskitchen.com/menu",
  servesCuisine: ["Hyderabadi", "South Indian", "Biryani", "Tandoori"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jubilee Hills / Banjara Hills",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500033",
    addressCountry: "IN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "12:00",
    closes: "23:00",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-charcoal text-cream selection:bg-gold selection:text-charcoal">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
