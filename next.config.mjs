// ─── next.config.mjs ──────────────────────────────────────────────────────────
// Next.js 15 + OpenNext Cloudflare deployment config.
//
// WHY IMAGES WEREN'T SHOWING:
//   ✅ unoptimized: true  — correct for Cloudflare Workers (no /_next/image)
//   ✅ remotePatterns     — was missing several hostnames used across the site:
//        images.pexels.com      (Pexels photos — different from videos.pexels.com)
//        plus.unsplash.com      (Unsplash variant CDN)
//        cdn.pixabay.com        (Pixabay fallback images)
//        lh3.googleusercontent  (Google avatars, if used)
//        i.imgur.com            (Imgur embeds)
//   ✅ Added a catch-all ** pattern for your own domain so /public/ images
//      served via <Image src="/some-file.png"> never get blocked.
//
// CLOUDFLARE DEV:
//   Normal dev:            pnpm run dev
//   CF Workers dev (D1):   USE_CLOUDFLARE_DEV=true pnpm run dev
// ─────────────────────────────────────────────────────────────────────────────

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

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
    // ── REQUIRED for Cloudflare Workers ─────────────────────────────────────
    // Cloudflare does not support the Node.js /_next/image optimisation
    // endpoint. Setting this to true makes <Image> render a plain <img> tag
    // so all external sources load without any proxy.
    unoptimized: true,

    // ── Remote patterns — every external hostname used in the codebase ───────
    // Add new hostnames here if you ever get a blank image with the error:
    //   "hostname not configured under images.remotePatterns"
    remotePatterns: [
      // ── Unsplash ────────────────────────────────────────────────────────
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port:     "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",       // Unsplash Plus CDN variant
        port:     "",
        pathname: "/**",
      },

      // ── Pexels ──────────────────────────────────────────────────────────
      {
        protocol: "https",
        hostname: "images.pexels.com",       // Pexels photos (≠ videos)
        port:     "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "videos.pexels.com",       // Pexels video thumbnails
        port:     "",
        pathname: "/**",
      },

      // ── Pixabay ─────────────────────────────────────────────────────────
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port:     "",
        pathname: "/**",
      },

      // ── Imgur ───────────────────────────────────────────────────────────
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port:     "",
        pathname: "/**",
      },

      // ── Google user-content (avatars, Drive thumbnails) ──────────────────
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port:     "",
        pathname: "/**",
      },

      // ── Cloudflare R2 / Images (if you store assets there) ──────────────
      // Uncomment and replace YOUR_ACCOUNT_HASH if using CF Images:
      // {
      //   protocol: "https",
      //   hostname: "imagedelivery.net",
      //   port:     "",
      //   pathname: "/YOUR_ACCOUNT_HASH/**",
      // },

      // ── Your own domain — covers /public/ assets served via absolute URL ─
      {
        protocol: "https",
        hostname: "astralearnia.com",
        port:     "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.astralearnia.com",
        port:     "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
