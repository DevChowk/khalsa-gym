import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QuoteProvider } from "@/components/quote/QuoteStore";
import { QuoteTray } from "@/components/quote/QuoteTray";
import { SITE } from "@/lib/data";

/* Self-hosted at build time by next/font — no runtime CDN dependency.
   The wdth axis is what makes the display type monumental. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.khalsa.co.in"),
  title: {
    default:
      "Khalsa Exports — Playground, Open Gym & Sports Equipment Manufacturer",
    template: "%s · Khalsa Exports",
  },
  description:
    "Khalsa Exports Private Limited has manufactured playground, outdoor open-gym and sports equipment in Meerut since 1985. ISO 9001 and EN 1176 certified. Supplied to municipal bodies, gram panchayats, schools and export buyers.",
  openGraph: { type: "website", locale: "en_IN", siteName: "Khalsa Exports" },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  foundingDate: String(SITE.founded),
  url: "https://www.khalsa.co.in",
  email: SITE.emails[0],
  telephone: SITE.phones[0],
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} h-full`}>
      <body className="grain flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <QuoteProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <QuoteTray />
        </QuoteProvider>
      </body>
    </html>
  );
}
