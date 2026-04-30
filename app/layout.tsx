import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  metadataBase: new URL(site.meta.siteUrl),
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: site.meta.siteName,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f1ea",
  width: "device-width",
  initialScale: 1,
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.meta.siteName,
  description: site.meta.structuredDataDescription,
  url: site.meta.siteUrl,
  telephone: site.contactInfo.phoneE164,
  email: site.contactInfo.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contactInfo.address.streetAddress,
    addressLocality: site.contactInfo.address.locality,
    postalCode: site.contactInfo.address.postalCode,
    addressRegion: site.contactInfo.address.region,
    addressCountry: site.contactInfo.address.country,
  },
  areaServed: { "@type": "City", name: site.contactInfo.address.locality },
  priceRange: site.meta.priceRange,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} antialiased`}
    >
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
