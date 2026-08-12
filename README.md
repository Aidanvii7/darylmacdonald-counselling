# Daryl MacDonald Counselling

Marketing site for Daryl MacDonald, person-centred counsellor in Glasgow.

- **Live:** https://darylmacdonald.com
- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind v4 · Cloudflare Workers · Resend (post-launch)

## Editing the site

All user-visible text — copy, prices, contact details, the Carl Rogers quote — lives in **[`content/site.json`](./content/site.json)**. Components are dumb renderers; they only consume from this file.

**For Daryl:** use the CMS at **https://darylmacdonald.com/admin/** — log in with
GitHub, edit the fields, click Publish. It commits to `main` for you.

**For developers**, or if the CMS is misbehaving:

1. Open [`content/site.json`](./content/site.json) on GitHub
2. Click the pencil icon (✏️) top-right
3. Edit the value (e.g. change `"£50 per session"` to `"£55 per session"`)
4. Scroll down, click **Commit changes**

Cloudflare rebuilds and deploys within a minute or two. If the JSON is malformed (missing comma, etc.), the build fails and prod stays on the last good version — you can't accidentally take the site down.

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

Hosted on **Cloudflare Workers** (via the OpenNext adapter), not Vercel — see
[MIGRATION.md](./MIGRATION.md) for how and why it moved.

Push to `main` → Cloudflare Workers Builds runs `npx opennextjs-cloudflare build`
then `npx opennextjs-cloudflare deploy` → live in a minute or two. Non-production
branches get a preview version uploaded instead of deploying.

For one-off manual deploys:

```bash
npx opennextjs-cloudflare build && npx opennextjs-cloudflare deploy
```

To preview the real Workers runtime locally (closer to production than `next dev`):

```bash
npx opennextjs-cloudflare build && npx wrangler dev
```

Staging URL: https://darylmacdonald.aidanvii.workers.dev

Secrets live on the Worker, not in this repo — set them with
`npx wrangler secret put NAME`. Currently `GITHUB_OAUTH_CLIENT_ID` and
`GITHUB_OAUTH_CLIENT_SECRET` (for the CMS login). `RESEND_API_KEY` is only needed
once the contact form moves off the mailto fallback.

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
  admin/                   # Decap CMS (index.html + config.yml)
  uploads/daryl.webp       # portrait (CMS media folder)
```

## Deferred / post-launch

- Real Resend contact form (currently mailto fallback) — needs DKIM/SPF on the domain
- Privacy policy page — needs review and sign-off
- Fold in content the old site had that this one doesn't: client testimonials, phone number, office address (archived in `archive/old-site/`)
