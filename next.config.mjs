// ─── next.config.js ───────────────────────────────────────────────────────────
// Add the `images.remotePatterns` block shown below to your existing
// next.config.js so Next.js <Image> can serve Unsplash cover photos.
//
// If you already have a next.config.js, MERGE the `images` key into it —
// do not replace the entire file.
// ─────────────────────────────────────────────────────────────────────────────
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Only run in dev, and silently skip if macOS version is too old
if (process.env.NODE_ENV === "development") {
  try {
    initOpenNextCloudflareForDev();
  } catch {
    // macOS 12.6 doesn't support workerd — safe to ignore locally
  }
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