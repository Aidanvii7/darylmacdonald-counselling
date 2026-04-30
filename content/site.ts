import { z } from "zod";
import data from "./site.json";

// All user-visible copy lives in `site.json`. This file is only the schema
// that validates `site.json` at module load and exports a typed `site`
// object for components to consume. If you're editing copy, edit
// `site.json`, not this file.

const linkSchema = z.object({
  href: z.string(),
  label: z.string(),
});

const paragraphSchema = z.object({
  text: z.string(),
  emphasis: z.boolean().optional(),
});

const sessionItemSchema = z.object({
  numeral: z.string(),
  title: z.string(),
  body: z.string(),
});

const siteSchema = z.object({
  meta: z.object({
    siteUrl: z.string().url(),
    siteName: z.string(),
    title: z.string(),
    description: z.string(),
    structuredDataDescription: z.string(),
    priceRange: z.string(),
  }),
  contactInfo: z.object({
    email: z.string().email(),
    phoneDisplay: z.string(),
    phoneHref: z.string(),
    phoneE164: z.string(),
    address: z.object({
      lines: z.array(z.string()).min(1),
      streetAddress: z.string(),
      locality: z.string(),
      postalCode: z.string(),
      region: z.string(),
      country: z.string(),
    }),
    directionsUrl: z.string().url(),
  }),
  nav: z.object({
    brand: z.string(),
    brandSubheading: z.string(),
    brandHref: z.string(),
    links: z.array(linkSchema).min(1),
  }),
  hero: z.object({
    eyebrow: z.string(),
    headlineLines: z.array(z.string()).min(1),
    lead: z.string(),
    ctaLabel: z.string(),
    ctaHref: z.string(),
  }),
  approach: z.object({
    eyebrow: z.string(),
    photo: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    photoCaption: z.object({
      name: z.string(),
      title: z.string(),
    }),
    headline: z.string(),
    paragraphs: z.array(paragraphSchema).min(1),
  }),
  about: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    bio: z.string(),
    quote: z.string(),
    quoteAttribution: z.string(),
  }),
  sessions: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    items: z.array(sessionItemSchema).min(1),
  }),
  contact: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    lead: z.string(),
    ctaLabel: z.string(),
    subjectLine: z.string(),
  }),
  footer: z.object({
    brand: z.string(),
    directionsLabel: z.string(),
  }),
});

export const site = siteSchema.parse(data);
export type Site = z.infer<typeof siteSchema>;
