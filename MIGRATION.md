# Migration: 20i host → Cloudflare, Stackmail → Google Workspace

Status as of **2026-07-22**. The old provider's plan **may already be cancelled**
(Daryl actioned the provider's premature advice) — as of today DNS, the old site,
and Stackmail are all still up, so service likely runs until the end of the
billing period. **Treat every step in Phase 0–1 as urgent: the shutdown date is
unknown.**

## Context

- Old setup: 20i-based host (`ns1-4.stackdns.com`), site on their Website
  Builder, domain via Tucows reseller (expires 2027-03-11), email
  `daryl@darylmacdonald.com` on Stackmail (`mx.stackmail.com`).
- Transfer lock is **disabled** and an **EPP/auth code has been issued** to
  Daryl (not stored in this repo — check the code carefully when entering it;
  the copy we saw had a suspicious non-ASCII character in it).
- New site: this repo, verified working on Cloudflare Workers via
  `@opennextjs/cloudflare` (needs Next ≥ 16.2.11). Local preview:
  `npx opennextjs-cloudflare build && npx wrangler dev`.
- Why Cloudflare: free tier permits commercial use (Vercel Hobby doesn't;
  compliant Vercel = Pro $20/mo). Site traffic is far below free limits.

## Phase 0 — TODAY (before anything can shut down)

- [ ] Ask Daryl for the **exact end-of-service date** (in the cancellation
      email) and confirm the mailbox still accepts logins
- [ ] **Back up the mailbox now**: full IMAP copy from `imap.stackmail.com:993`
      (Thunderbird account copy, or `imapsync`). Daryl enters his own
      credentials. This is the only irreplaceable data in the whole migration.
- [ ] If the end-of-service date is imminent (<1 week), ask the provider to
      extend or un-cancel until the transfer completes

## Phase 1 — DNS escape hatch (survives the old host disappearing)

- [ ] Create Cloudflare account (Daryl's or agency account), add zone
      `darylmacdonald.com`
- [ ] Replicate ALL current DNS records, **including** `MX 10 mx.stackmail.com`
      and `TXT "v=spf1 include:spf.stackmail.com a mx -all"` — email must keep
      flowing to Stackmail until Phase 3 cutover
- [ ] Change nameservers to Cloudflare's at the old provider's control panel
      (do this while the panel still works!)

## Phase 2 — Domain transfer

- [ ] Cloudflare Registrar → transfer in `darylmacdonald.com` with the EPP code
      (at-cost, ~$10/yr; requires the zone from Phase 1 to be active)
- [ ] Approve the transfer from the Tucows/reseller side if prompted (faster
      than the 5-day auto-approve)

## Phase 3 — Email → Google Workspace

- [ ] Google Workspace **Business Starter** (~£5/mo, the only recurring cost)
      for `daryl@darylmacdonald.com`; verify domain via Cloudflare TXT record
- [ ] Migrate inbox: Workspace Data Migration Service ← IMAP from
      `imap.stackmail.com` (or restore from the Phase 0 backup if Stackmail is
      already gone)
- [ ] Flip MX/SPF to Google in Cloudflare DNS, add Google DKIM
- [ ] Send/receive test both directions; check old mail is present

## Phase 4 — Site cutover

- [ ] `wrangler secret put` × `RESEND_API_KEY`, `GITHUB_OAUTH_CLIENT_ID`,
      `GITHUB_OAUTH_CLIENT_SECRET`
- [ ] Fix hardcoded `SITE_URL` in `app/api/auth/route.ts` (currently the
      vercel.app URL) → env var / `https://darylmacdonald.com`
- [ ] Update the GitHub OAuth app's callback URL to the new domain
- [ ] `npx opennextjs-cloudflare build && npx opennextjs-cloudflare deploy`;
      attach `darylmacdonald.com` as the Worker's custom domain
- [ ] Update `site_url` in `public/admin/config.yml` (Decap) to the new domain
- [ ] Post-launch: swap the mailto contact section for the real Resend form
      (domain DKIM/SPF now controllable in Cloudflare DNS)

## Phase 5 — Decommission

- [ ] Confirm cancellation state of the old plan (already actioned?) — nothing
      further needed once Phases 1–4 are green
- [ ] Retire the Vercel project once the domain points at Cloudflare
