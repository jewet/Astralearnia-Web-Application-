// ─── app/robots.ts ────────────────────────────────────────────────────────────
// Robots directives for Google and other crawlers.
// Served automatically at /robots.txt by Next.js App Router.
// ─────────────────────────────────────────────────────────────────────────────

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow:     "/",
        // Disallow any admin or private routes if you add them later
        // disallow: ["/admin/", "/api/private/"],
      },
    ],
    sitemap: "https://astralearnia.com/sitemap.xml",
  };
}