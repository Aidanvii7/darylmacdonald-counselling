import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Decap CMS admin panel — serve the static HTML at /admin without
      // requiring the /index.html suffix in the URL.
      { source: "/admin", destination: "/admin/index.html" },
    ];
  },
};

export default nextConfig;
