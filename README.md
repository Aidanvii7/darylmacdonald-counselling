# Daryl MacDonald Counselling

Marketing site for Daryl MacDonald, person-centred counsellor in Glasgow.

- **Live:** https://darylmacdonald.vercel.app (will become darylmacdonald.com)
- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind v4 · Vercel · Resend (post-launch)

## Editing the site

All user-visible text — copy, prices, contact details, the Carl Rogers quote — lives in **[`content/site.json`](./content/site.json)**. Components are dumb renderers; they only consume from this file.

To change something:

1. Open [`content/site.json`](./content/site.json) on GitHub
2. Click the pencil icon (✏️) top-right
3. Edit the value (e.g. change `"£50 per session"` to `"£55 per session"`)
4. Scroll down, click **Commit changes**

Vercel auto-deploys to production within ~30 seconds. If the JSON is malformed (missing comma, etc.), the build fails and prod stays on the last good version — you can't accidentally take the site down.

### Emphasis (italic gold accent)

Wrap a word in asterisks to make it gold-italic in the rendered site:

```json
"headline": "How I can *help*."
```

Renders as: How I can _help_. (in gold)

This works in any string field. Use sparingly — the emphasis is meant for the few key words per section.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # production build
```

Requires Node 20+. The contact form's email-sending uses Resend; it falls back to "demo mode" when `RESEND_API_KEY` is unset, so dev works without env vars.

## Deploy

Production is connected to this repo. Push to `main` → Vercel auto-builds → live in ~30s. Each PR also gets its own preview URL.

For one-off manual deploys (rare): `npx vercel --prod`.

## Project layout

```
app/                       # Next.js App Router routes
  layout.tsx               # site shell, metadata, JSON-LD
  page.tsx                 # composes the six sections
  api/contact/route.ts     # Resend handler (demo-mode fallback)
components/
  sections/                # one file per page section
  site-nav.tsx
content/
  site.json                # ← edit copy here
  site.ts                  # zod schema (don't edit unless adding fields)
lib/
  render-emphasis.tsx      # parses *asterisks* into gold-italic spans
  contact-schema.ts        # form validation (shared client/server)
public/
  daryl.webp               # portrait
```

## Deferred / post-launch

- Real Resend contact form (currently mailto fallback) — needs DKIM/SPF on the domain
- Privacy policy page — needs review and sign-off
- Custom domain cutover from `darylmacdonald.vercel.app` to `darylmacdonald.com`
- Decap CMS — friendlier admin UI for Daryl, post-launch addition pointed at `content/site.json`
