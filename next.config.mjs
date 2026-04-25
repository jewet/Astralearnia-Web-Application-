// ─── next.config.js ───────────────────────────────────────────────────────────
// Add the `images.remotePatterns` block shown below to your existing
// next.config.js so Next.js <Image> can serve Unsplash cover photos.
//
// If you already have a next.config.js, MERGE the `images` key into it —
// do not replace the entire file.
//
// Cloudflare local dev is OPTIONAL.
// Normal `pnpm run dev` runs standard Next.js locally.
// Use `USE_CLOUDFLARE_DEV=true pnpm run dev` only when needed.
//
// This prevents macOS 12.6 / workerd crashes while keeping deployment support.
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
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  images: {
    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;