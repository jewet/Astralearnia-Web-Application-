// ─── app/sitemap.ts ───────────────────────────────────────────────────────────
// Auto-generated sitemap for Google indexing.
// Next.js App Router will serve this at /sitemap.xml automatically.
// ─────────────────────────────────────────────────────────────────────────────

import { MetadataRoute } from "next";
import { BLOG_POSTS }    from "@/lib/blog-data";

const BASE_URL = "https://astralearnia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── static pages ──────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                lastModified: now, changeFrequency: "monthly",  priority: 1.0 },
    { url: `${BASE_URL}/blog`,      lastModified: now, changeFrequency: "weekly",   priority: 0.9 },
    { url: `${BASE_URL}/contact`,   lastModified: now, changeFrequency: "yearly",   priority: 0.7 },
    { url: `${BASE_URL}/careers`,   lastModified: now, changeFrequency: "monthly",  priority: 0.7 },
    { url: `${BASE_URL}/book-demo`, lastModified: now, changeFrequency: "monthly",  priority: 0.8 },
    { url: `${BASE_URL}/about`,     lastModified: now, changeFrequency: "yearly",   priority: 0.6 },
  ];

  // ── blog post pages ────────────────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url:             `${BASE_URL}/blog/${post.slug}`,
    lastModified:    now,
    changeFrequency: "monthly" as const,
    priority:        0.8,
  }));

  return [...staticPages, ...blogPages];
}