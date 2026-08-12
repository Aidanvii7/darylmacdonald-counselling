# Moving daryl@darylmacdonald.com to Gmail — briefing for an AI assistant

**Read this first, Daryl:** paste or upload this whole file into a Claude
session (Claude Code or Cowork) and say *"help me work through this"*. It tells
your assistant everything it needs to know. Anything involving your password or
payment card, **you** must do — no assistant can or should do those parts, so
don't be surprised when it asks you to take over.

There is one important limit: **the website's DNS settings live in Aidan's
Cloudflare account**, so your assistant cannot change them. Two steps below need
Aidan. Everything else you can do together.

---

## The situation

- Domain: **darylmacdonald.com**
- Current mailbox: **daryl@darylmacdonald.com**, hosted on **Stackmail** at the
  old website provider (the one being cancelled)
- The website itself has already moved to Cloudflare and is live. Email is the
  last thing still tied to the old provider.
- Goal: **Google Workspace**, so the same address works as a normal Gmail inbox
  (Business Starter, roughly £5–6/month for one mailbox)

### ⏰ Deadline that matters

When the old provider's plan ends, the mailbox stops working — mail sent to
`daryl@darylmacdonald.com` will bounce, and anything still stored there is gone
for good. The exact end date is unconfirmed; it may be the end of this month.
**Get the Google Workspace side done before then.** Ask Aidan if the date has
been confirmed.

### About your old email

You said you don't need your old messages, which is fine and makes this much
simpler. But be clear-eyed: **once the old plan lapses, they are unrecoverable.**
If there is any chance you'll want old client correspondence, receipts, or
records, copy them to your computer *before* the plan ends — see the optional
section at the end.

---

## What your assistant should help you do

Work through these in order. Your assistant can explain each screen, check that
things worked, and tell you what to send Aidan.

### Step 1 — Sign up for Google Workspace (you drive)

Go to `workspace.google.com` and start a Business Starter signup.

- When it asks whether you have a domain: **yes**, `darylmacdonald.com`
- Do **not** let it register a new domain for you
- Create the user `daryl@darylmacdonald.com`
- You will enter your own name, card details and a new password. **Your
  assistant must not do this part** — if it offers, decline.
- Turn on 2-step verification when offered

### Step 2 — Prove you own the domain (needs Aidan)

Google will show you a **TXT verification record** — a long string starting
`google-site-verification=...`.

Your assistant can help you copy it accurately, then **send it to Aidan**, who
adds it in Cloudflare. Ask Aidan to confirm when it's in; then click Verify in
Google.

> Tip: ask your assistant to check the record is live before you click Verify.
> It can run `dig +short TXT darylmacdonald.com` and look for the string.

### Step 3 — Switch mail delivery over (needs Aidan)

Once verified, Google gives **MX records** (usually `smtp.google.com`, or five
`aspmx`-style entries). Send those to Aidan too. He will:

- replace the current Stackmail MX record with Google's
- update the SPF record to `v=spf1 include:_spf.google.com ~all`
- add the DKIM record you generate in Google Admin (Apps → Google Workspace →
  Gmail → Authenticate email)

**This is the moment your email actually changes over.** After it, new mail
arrives in Gmail instead of Stackmail.

### Step 4 — Test it properly (you and your assistant)

Don't assume it works:

- send a mail from your Gmail to a personal address, and reply back
- check the reply arrives in Gmail
- ask your assistant to verify the DNS looks right:
  `dig +short MX darylmacdonald.com` should show Google, not stackmail
- send yourself a test from a phone that isn't logged in to the account

### Step 5 — Tidy up

- Remove the old mailbox from any phone/computer mail apps and add the Google
  account instead (Gmail app, or Apple Mail with Google sign-in)
- Tell Aidan it's done so he can remove the leftover Stackmail records

---

## Optional — rescuing your old email after all

If you change your mind and want the old messages, this must happen **while the
old plan is still active**. Ask your assistant to walk you through Thunderbird
(free, works on Windows and Mac):

- Install Thunderbird from `thunderbird.net`
- Add an account: `daryl@darylmacdonald.com`, your **Stackmail webmail
  password**, choose **IMAP**
- Manual settings if needed: incoming `imap.stackmail.com` port `993` SSL/TLS;
  outgoing `smtp.stackmail.com` port `465` SSL/TLS
- In Account Settings → Synchronisation & Storage, tick *Keep messages on this
  computer* and *Synchronise all messages*
- Wait for it to finish downloading, then copy the Inbox and Sent folders into
  **Local Folders** so the copy survives the account being deleted

Once that's done, Google Workspace can import it (Admin console → Data →
Data Import, or the Data Migration Service, pointing at `imap.stackmail.com`) —
but only while the old mailbox still exists.

---

## Quick reference

| Thing | Value |
|---|---|
| Domain | `darylmacdonald.com` |
| Mailbox to recreate | `daryl@darylmacdonald.com` |
| Old mail host (IMAP) | `imap.stackmail.com` port `993`, SSL/TLS |
| Old mail host (SMTP) | `smtp.stackmail.com` port `465`, SSL/TLS |
| Old webmail | Stackmail, via the old provider's control panel |
| Google product | Google Workspace **Business Starter**, 1 user |
| Who controls DNS | **Aidan** (Cloudflare) — send him TXT/MX/DKIM values |

## Things to tell your assistant explicitly

- "Don't ask me to hand over passwords or card details — I'll do those bits."
- "I can't change DNS; those values go to Aidan."
- "Check things actually worked rather than assuming."
