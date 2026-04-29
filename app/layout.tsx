import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
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
  title: "Daryl MacDonald — Counsellor in Glasgow",
  description:
    "Person-centred counselling in Glasgow for adults navigating anxiety, grief, relationships, and life's difficult moments.",
  metadataBase: new URL("https://darylmacdonald.com"),
  openGraph: {
    title: "Daryl MacDonald — Counsellor in Glasgow",
    description:
      "Person-centred counselling in Glasgow for adults navigating anxiety, grief, relationships, and life's difficult moments.",
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Daryl MacDonald Counselling",
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
  name: "Daryl MacDonald Counselling",
  description: "Person-centred counselling in Glasgow City Centre for adults.",
  url: "https://darylmacdonald.com",
  telephone: "+44 7840 373448",
  email: "daryl@darylmacdonald.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "The Consulting Rooms, 34 West George Street",
    addressLocality: "Glasgow",
    postalCode: "G2 1DA",
    addressRegion: "Scotland",
    addressCountry: "GB",
  },
  areaServed: { "@type": "City", name: "Glasgow" },
  priceRange: "££",
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
