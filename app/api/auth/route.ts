import { NextRequest, NextResponse } from "next/server";

// Initiates GitHub OAuth for Decap CMS. Decap opens a popup pointing at this
// route; we redirect to GitHub's authorize URL with a CSRF state token, then
// GitHub redirects back to /api/auth/callback once the user has approved.

const SITE_URL = "https://darylmacdonald.vercel.app";
const CALLBACK_URL = `${SITE_URL}/api/auth/callback`;

function randomState() {
  // 32 bytes of randomness, hex-encoded — plenty for CSRF protection.
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new Response("OAuth not configured", { status: 500 });
  }

  // Decap passes scope=public_repo or repo (for private repos). Default to
  // public_repo since this is a public site.
  const scope = request.nextUrl.searchParams.get("scope") || "public_repo";
  const state = randomState();

  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", CALLBACK_URL);
  authorizeUrl.searchParams.set("scope", scope);
  authorizeUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizeUrl.toString());
  response.cookies.set("decap_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600, // 10 minutes
    path: "/api/auth",
  });
  return response;
}
