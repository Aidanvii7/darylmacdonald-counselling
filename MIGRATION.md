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

- [ ] Ask Daryl for the **exact end-of-service date** — now folded into the
      nameserver request email to provider support (2026-07-22)
- [x] ~~Back up the mailbox~~ — **dropped 2026-07-22: Daryl confirmed he does
      not need his old emails.** (Flagged to him that anything unbacked-up is
      gone forever at end of service; his call.) This removes the IMAP
      migration from Phase 3 entirely — Google Workspace starts with a fresh
      mailbox.
- [ ] If the end-of-service date is imminent (<1 week), ask the provider to
      extend or un-cancel until the transfer completes

## Phase 1 — DNS escape hatch (survives the old host disappearing)

- [x] Create Cloudflare account (Aidan's, GitHub SSO; invite Daryl as member
      later if wanted), add zone `darylmacdonald.com` — done 2026-07-22
- [x] Replicate ALL current DNS records — done 2026-07-22: auto-scan imported
      all 8 (A @, CNAME www/mail/smtp/imap/pop3, MX mx.stackmail.com,
      TXT spf) and every record was set to **DNS only** (auto-scan had 6 of
      them proxied; proxying the mail CNAMEs would break IMAP/SMTP)
- [x] Change nameservers to `byron.ns.cloudflare.com` +
      `emerie.ns.cloudflare.com` — **DONE 2026-07-22** by provider support
      ("Jonathon"), after Daryl's panel turned out to have no nameserver
      option. Verified: whois shows both CF nameservers at the registry, and
      all 8 records resolve identically from `byron.ns.cloudflare.com`
      (A → 34.202.63.170, www CNAME, MX mx.stackmail.com, SPF TXT, and the
      four mail CNAMEs). Live checks: site 200, www 301, imap:993 + smtp:465
      reachable. **The old provider is no longer a single point of failure.**

## Phase 2 — Domain transfer

- [ ] Cloudflare Registrar → transfer in `darylmacdonald.com` with the EPP code
      (at-cost, ~$10/yr; requires the zone from Phase 1 to be active)
- [ ] Approve the transfer from the Tucows/reseller side if prompted (faster
      than the 5-day auto-approve)

## Phase 3 — Email → Google Workspace

- [ ] Google Workspace **Business Starter** (~£5/mo, the only recurring cost)
      for `daryl@darylmacdonald.com`; verify domain via Cloudflare TXT record
- [ ] ~~Migrate inbox~~ — not needed; Daryl doesn't want his old mail.
      Fresh mailbox. (Also means the four Stackmail CNAMEs and the Stackmail
      MX can simply be deleted at this point rather than preserved.)
- [ ] Flip MX/SPF to Google in Cloudflare DNS, add Google DKIM
- [ ] Send/receive test both directions

## Phase 4 — Site cutover ✅ DONE 2026-07-22

- [x] Fix hardcoded `SITE_URL` in `app/api/auth/route.ts` → env-overridable,
      defaults to `https://darylmacdonald.com`
- [x] Update `base_url`/`site_url`/`display_url` in `public/admin/config.yml`
- [x] Registered account subdomain `aidanvii.workers.dev`; staging lives at
      `https://darylmacdonald.aidanvii.workers.dev` (kept enabled via
      `workers_dev: true`)
- [x] `opennextjs-cloudflare build && deploy`; both apex and www attached as
      custom domains. **Gotcha for next time:** Cloudflare refuses to attach a
      custom domain over an existing externally-managed A/CNAME — the old A
      record and www CNAME had to be deleted first, so there was a ~45s
      resolution gap. Deleted values were `A @ 34.202.63.170` and
      `CNAME www → darylmacdonald.com` if a rollback is ever needed.
- [x] Verified live: apex 200, www 200, /admin 200, portrait + `/_next/image`
      optimizer 200, `server: cloudflare`. Mail DNS untouched (MX + all four
      Stackmail CNAMEs still resolving).

### Phase 4 remainder — CMS login ✅ DONE 2026-07-22

- [x] Both Worker secrets set (`GITHUB_OAUTH_CLIENT_ID`,
      `GITHUB_OAUTH_CLIENT_SECRET`). **Note:** Vercel's env vars were flagged
      *Sensitive* = write-only, so neither value could be recovered from there;
      the client secret had to be regenerated on the GitHub OAuth app.
- [x] GitHub OAuth app "Daryl MacDonald Counselling CMS" updated: Homepage
      URL and Authorization callback URL now on `darylmacdonald.com`
- [x] Verified live: `/api/auth` 307s to GitHub with the right client_id and
      a matching redirect_uri, sets an HttpOnly/Secure/SameSite=lax CSRF
      cookie; callback rejects a missing code (400) and a forged state;
      `/admin/` serves and its config points at the right repo + domain
- [x] Fixed two things the first login attempt exposed:
      1. Decap calls `crypto.randomUUID()` during config validation with no
         fallback, so Safari failed with "Error loading the CMS configuration".
         Polyfilled in `public/admin/index.html`; also pinned decap-cms to
         3.15.1 (the floating `^3.0.0` range is how the breakage arrived).
      2. The OAuth client ID is `Ov23libkwNxHLA1a3Gby` — that first character
         is a **capital letter O, not a zero**. Transcribing it wrong made
         GitHub 404 the authorize popup. Worth re-checking with a DOM read
         rather than a screenshot if it's ever re-entered.
- [ ] Final check only Daryl can do: actually log in at
      `https://darylmacdonald.com/admin/` and publish a test edit

## Phase 5 — Automatic deploys ✅ DONE 2026-07-22

Without this, Daryl's CMS "Publish" committed to GitHub but never reached the
live site — worse than the Vercel setup it replaced.

- [x] Cloudflare Workers Builds connected to `Aidanvii7/darylmacdonald-counselling`,
      production branch `main`, via the GitHub app (scoped to that one repo)
- [x] Build config — **Cloudflare's defaults are wrong for this project** and
      must be overridden, or builds run plain `next build` and deploy
      unadapted output:
      - Build command: `npx opennextjs-cloudflare build`
      - Deploy command: `npx opennextjs-cloudflare deploy`
      - Version command: `npx opennextjs-cloudflare upload`
      - Root directory `/`
- [x] Verified: pushing 42b281e produced version `fbafaaec` labelled with the
      commit message and branch `main` (not "Manually deployed / Wrangler"),
      and the live site stayed healthy — apex/www/admin 200, portrait 200,
      CMS polyfill and correct OAuth client ID intact.

### Gotchas worth remembering

- The dashboard's Build section only appears under **Settings**, and the connect
  flow needs a real browser: it requires GitHub sudo-mode (passkey), and the
  build-command fields are React-controlled, so setting them by script silently
  fails — the "Unsaved changes" bar never appears and nothing persists.
- Installing the GitHub app alone does not connect the Worker; the repo must
  then be picked from the Cloudflare side.

## Remaining

- [ ] Post-launch: swap the mailto contact section for the real Resend form
      (`RESEND_API_KEY` secret; domain DKIM/SPF now controllable in Cloudflare)
- [ ] Email → Google Workspace (deferred; see `docs/EMAIL-SETUP-FOR-DARYL.md`
      and `docs/email-setup-agent-prompt.md`). **Deadline: whenever the old
      provider's plan lapses, `daryl@darylmacdonald.com` stops working.**
- [ ] Optional: transfer the domain to Cloudflare Registrar with the EPP code
      (at-cost renewals; current registration runs to 2027-03-11)
- [ ] Optional: retire the Vercel project — nothing points at it now
- [x] Fold in content from the old site — testimonials added 2026-07-22; the
      phone number turned out to be rendering already. Still unused in
      `archive/old-site/`: the brush-circle logo and the office address (which
      is in `contactInfo` but only shown in the footer).

## Phase 6 — Decommission

- [ ] Confirm cancellation state of the old plan (already actioned?) — nothing
      further needed once Phases 1–4 are green
- [ ] Retire the Vercel project once the domain points at Cloudflare
