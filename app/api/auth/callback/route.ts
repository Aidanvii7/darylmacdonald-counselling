import { NextRequest } from "next/server";

// Receives GitHub's OAuth callback, exchanges the code for an access token,
// then returns an HTML page that posts the token back to the Decap window
// that opened this popup. After Decap receives the token it stores it and
// uses it to commit edits to the GitHub repo.

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const cookieState = request.cookies.get("decap_oauth_state")?.value;

  if (!code) {
    return errorPage("Missing authorization code from GitHub.");
  }
  if (!state || !cookieState || state !== cookieState) {
    return errorPage("Invalid OAuth state — possible CSRF. Please try again.");
  }

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return errorPage("OAuth not configured on the server.");
  }

  let token: string;
  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    if (!tokenRes.ok) {
      console.error("GitHub token exchange failed", tokenRes.status);
      return errorPage("Could not exchange the GitHub code for an access token.");
    }

    const data = (await tokenRes.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };

    if (data.error || !data.access_token) {
      console.error("GitHub token error", data.error, data.error_description);
      return errorPage(data.error_description || "GitHub returned an error during the token exchange.");
    }

    token = data.access_token;
  } catch (err) {
    console.error("OAuth callback failed", err);
    return errorPage("Network error talking to GitHub.");
  }

  return successPage(token);
}

function successPage(token: string) {
  // Decap's two-step handshake:
  //   1. Popup posts "authorizing:github" to its opener (Decap, in /admin)
  //   2. Decap responds with its origin so the popup can verify it
  //   3. Popup posts the token to the verified origin
  //
  // The token is rendered into a <script> tag, so we have to make sure it
  // can't break out of the JS string context. The OAuth token format is
  // alphanumeric + a few safe chars — no quotes or backslashes — but we
  // JSON-encode anyway as defence in depth.
  const payload = JSON.stringify({ token, provider: "github" });
  const safePayload = JSON.stringify(payload).replace(/</g, "\\u003c");

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Authorizing</title></head>
<body>
<p>Authenticated. You can close this window.</p>
<script>
(function() {
  var payload = ${safePayload};
  var sent = false;
  function send(origin) {
    if (sent) return;
    sent = true;
    window.opener.postMessage("authorization:github:success:" + payload, origin);
  }
  window.addEventListener("message", function(e) { send(e.origin); }, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function errorPage(message: string) {
  const safeMessage = message.replace(/</g, "&lt;").replace(/&/g, "&amp;");
  const payload = JSON.stringify(JSON.stringify({ message })).replace(/</g, "\\u003c");
  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Authorization failed</title></head>
<body>
<p>Authorization failed: ${safeMessage}</p>
<script>
(function() {
  if (window.opener) {
    window.opener.postMessage("authorization:github:error:" + ${payload}, "*");
  }
})();
</script>
</body>
</html>`;

  return new Response(html, {
    status: 400,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
