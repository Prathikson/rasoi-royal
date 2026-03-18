import type { Metadata, Viewport } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";

const playfair = Playfair_Display({
  subsets: ["latin"], variable: "--font-playfair",
  weight: ["400","500","600","700","800","900"],
  style: ["normal","italic"], display: "swap",
});
const jost = Jost({
  subsets: ["latin"], variable: "--font-jost",
  weight: ["200","300","400","500","600","700","800"], display: "swap",
});

export const viewport: Viewport = {
  width: "device-width", initialScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#faf8f3" }],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: ["Indian restaurant Edmonton","fine dining Indian","butter chicken Edmonton","biryani Edmonton","Rasoi Royal","Indian cuisine Alberta"],
  openGraph: {
    type: "website", url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: siteConfig.og.image, width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Restaurant",
    name: siteConfig.name, description: siteConfig.description,
    url: siteConfig.url, telephone: siteConfig.restaurant.phone,
    servesCuisine: "Indian", priceRange: "$$$",
    address: { "@type": "PostalAddress", streetAddress: siteConfig.restaurant.address, addressLocality: "Edmonton", addressRegion: "AB", addressCountry: "CA" },
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></head>
      <body className={`${playfair.variable} ${jost.variable}`}>{children}</body>
    </html>
  );
}
