// OpenNext → Cloudflare Workers adapter config.
// Defaults are fine for this site: fully static pages + two lightweight
// API routes (contact/Resend, Decap OAuth proxy). No ISR/cache bindings needed.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
