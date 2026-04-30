// ─── next.config.mjs ──────────────────────────────────────────────────────────
// Configuration for Next.js 15 + OpenNext Cloudflare deployment.
//
// KEY NOTES:
//   • images.unoptimized: true  — disables Next.js image optimisation so that
//     external images (Unsplash, Pexels) load correctly on Cloudflare Workers,
//     which does not support the /_next/image optimisation endpoint.
//
//   • images.remotePatterns — whitelists external hostnames used across the
//     site (Unsplash photos, Pexels videos).
//
//   • Cloudflare local dev is OPTIONAL.
//     Normal `pnpm run dev` runs standard Next.js locally.
//     Use `USE_CLOUDFLARE_DEV=true pnpm run dev` only when you need to test
//     Cloudflare Workers behaviour (D1, KV, etc.) locally.
//     This prevents macOS 12.6 / workerd crashes on older systems.
// ─────────────────────────────────────────────────────────────────────────────

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Only enable Cloudflare local runtime when explicitly requested
if (
  process.env.NODE_ENV === "development" &&
  process.env.USE_CLOUDFLARE_DEV === "true"
) {
  initOpenNextCloudflareForDev();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Tree-shake large packages to reduce bundle size
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  images: {
    // Required for Cloudflare Pages — disables /_next/image optimisation
    // which is not available in the Cloudflare Workers runtime.
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port:     "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "videos.pexels.com",
        port:     "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;