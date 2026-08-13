# Paste this whole file into a Claude session, then say "help me work through this"

## Daryl's setup — read this before suggesting anything

He is on **Windows Home**, using **Claude Code in the Claude desktop app**.
Claude Cowork is not available to him (it needs virtualisation Windows Home
lacks).

This means: **you cannot click around desktop applications.** You can read and
write files and run commands on his machine, and you can talk him through
anything in a web browser — but you cannot drive a native app like Thunderbird
or Outlook for him. Don't propose a plan that depends on you doing that.

Everything below is designed to work in a browser for exactly this reason.

## Who you're helping

You are helping **Daryl MacDonald**, a counsellor in Glasgow. He is **not
technical** — explain things in plain language, one step at a time, and never
assume he knows what DNS, IMAP or MX records are. He has Claude Pro. His website
was recently rebuilt and migrated by **Aidan**, a developer friend, who wrote
this briefing.

## The task

Move the mailbox `daryl@darylmacdonald.com` from its current host (**Stackmail**,
at the old website provider, which is being cancelled) to **Google Workspace
Business Starter**, so the same address works as a normal Gmail inbox.

## Hard constraints — read these before you start

1. **Never handle his credentials or payment details.** Signup, passwords, 2FA
   and card entry are his to do. Guide him through the screens; don't ask him to
   share the values with you, and decline if he offers.
2. **You cannot change DNS.** The domain `darylmacdonald.com` is on Cloudflare in
   **Aidan's** account. Two steps below require DNS records — your job is to help
   Daryl copy the values accurately and send them to Aidan, then confirm once
   they're live.
3. **Verify, don't assume.** After each DNS step, actually check it (commands
   below) before telling him it worked.
4. **There is a deadline.** When the old provider's plan lapses, the mailbox dies
   and stored mail is unrecoverable. The exact date is unconfirmed — possibly end
   of month. Treat this as time-sensitive and tell him so.

## Background facts

| Thing | Value |
|---|---|
| Domain | `darylmacdonald.com` |
| Mailbox to recreate | `daryl@darylmacdonald.com` |
| Current mail host | Stackmail (old provider, plan cancelled) |
| Old IMAP | `imap.stackmail.com`, port `993`, SSL/TLS |
| Old SMTP | `smtp.stackmail.com`, port `465`, SSL/TLS |
| Target | Google Workspace **Business Starter**, 1 user (~£5–6/mo) |
| DNS controlled by | **Aidan** (Cloudflare) |
| Website status | Already migrated and live on Cloudflare — don't touch it |

Daryl has said he **does not need his old messages**. Confirm this once more
before anything irreversible, and make sure he understands they can't be
recovered later. If he changes his mind, see "Rescuing old mail" at the end —
that only works while the old plan is still active.

## Steps

### 1. Google Workspace signup (Daryl drives)

Guide him through `workspace.google.com` → Business Starter:

- He already owns the domain — he must **not** let Google register a new one
- Domain: `darylmacdonald.com`
- Create user `daryl@darylmacdonald.com`
- He enters his own name, card details, and a new password; encourage 2-step
  verification
- Stop and hand over to him for anything credential- or payment-related

### 2. Domain verification (needs Aidan)

Google will display a **TXT record** like `google-site-verification=...`.

- Help Daryl copy it exactly (watch for truncation, and for `O` vs `0`)
- Have him send it to Aidan to add in Cloudflare
- Before he clicks Verify, check it's live:

```bash
dig +short TXT darylmacdonald.com
```

Look for the `google-site-verification=` string. DNS can take a few minutes.

### 3. Mail delivery cutover (needs Aidan)

Google will then give **MX records** (`smtp.google.com`, or several `aspmx`
entries). Send those to Aidan, who will also update SPF and add DKIM. Ask Daryl
to generate DKIM in Google Admin → Apps → Google Workspace → Gmail →
Authenticate email, and pass that value to Aidan too.

The records Aidan needs to end up with:

- MX → Google's values (replacing `mx.stackmail.com`)
- SPF TXT → `v=spf1 include:_spf.google.com ~all`
- DKIM TXT → the value from Google Admin

**This is the moment his email actually switches over.**

### 4. Verify properly

```bash
dig +short MX darylmacdonald.com
```

Should show Google, not `stackmail.com`. Then have him:

- send from the new Gmail to a personal address, and reply back
- confirm the reply lands in Gmail
- send a test from a device not logged into the account

Only call it done when mail has flowed **both** directions.

### 5. Tidy up

- Help him remove the old account from phone/computer mail apps and add the
  Google account
- Tell him to let Aidan know so leftover Stackmail records can be removed

## Rescuing old mail (only if he changes his mind, and only before the plan ends)

**Do this in the browser — do not send him to Thunderbird.** Google Workspace
imports directly from the old IMAP server:

1. Google **Admin console** (`admin.google.com`) → **Data** → **Data import &
   export** → **Data migration**
2. Migration source: **Other IMAP server** (not Gmail/Exchange)
3. Connection protocol: **IMAP**, server `imap.stackmail.com`
4. He signs in with the old mailbox address and its **Stackmail password** — his
   to type, not yours to see
5. Choose what to migrate (mail, and how far back), then start it
6. It runs server-to-server, so his PC can be off. Check progress in the same
   screen and confirm the folder counts look sane afterwards

This only works **while the old mailbox still exists**, so it must happen before
the old plan lapses. If it has already lapsed, the mail is gone — say so plainly
rather than suggesting recovery routes that won't work.

If he specifically wants a copy in files on his own computer as well, you *can*
help: write him a small Python script using `imaplib` that prompts for the
password with `getpass` (so the password never appears in your context or in the
script), connects to `imap.stackmail.com:993`, and saves each message as `.eml`.
Run it for him and check the output. Only offer this if he asks — for most
people the Workspace import is enough.

## Tone

Be encouraging and concrete. Tell him what will happen before it happens,
especially at the cutover in step 3. If something looks wrong, say so plainly
rather than pressing on.
