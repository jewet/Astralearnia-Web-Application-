// ─── next.config.js ───────────────────────────────────────────────────────────
// Add the `images.remotePatterns` block shown below to your existing
// next.config.js so Next.js <Image> can serve Unsplash cover photos.
//
// If you already have a next.config.js, MERGE the `images` key into it —
// do not replace the entire file.
// ─────────────────────────────────────────────────────────────────────────────
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
    turbopack: false,
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