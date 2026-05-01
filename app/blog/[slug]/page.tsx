// ─── app/blog/[slug]/page.tsx ─────────────────────────────────────────────────
// SERVER COMPONENT — handles SEO metadata for each blog post.
// All interactive UI lives in BlogPostClient.tsx ("use client").
//
// SEO enhancements in this version:
//   ✅ Full OpenGraph / Twitter cards
//   ✅ BlogPosting JSON-LD structured data
//   ✅ BreadcrumbList JSON-LD (Google rich results)
//   ✅ WebSite / Organisation JSON-LD (in layout.tsx — see comment below)
//   ✅ Canonical URL per post
//   ✅ Fallback OG image for posts missing coverImage
//   ✅ keywords, datePublished, dateModified in meta
//
// ⚠️  Next.js 15: `params` is a Promise — must be awaited.
// ❌  No `export const runtime = "edge"` — incompatible with generateStaticParams.
// ─────────────────────────────────────────────────────────────────────────────
//
// 📌 ALSO ADD to app/layout.tsx inside <head>:
//
//   import { buildOrganisationSchema, buildWebsiteSchema } from "@/lib/seo-config";
//   ...
//   <script type="application/ld+json"
//     dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganisationSchema()) }} />
//   <script type="application/ld+json"
//     dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebsiteSchema()) }} />
//
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog-data";
import BlogPostClient                from "./BlogPostClient";
import {
  SITE_URL,
  SITE_NAME,
  SITE_HANDLE,
  DEFAULT_OG_IMAGE,
  getFallbackImage,
  buildArticleSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo-config";

// ── Types ─────────────────────────────────────────────────────────────────────
type Props = { params: Promise<{ slug: string }> };

// ── Pre-render all slugs at build time ───────────────────────────────────────
export async function generateStaticParams() {
  return BLOG_POSTS.map(post => ({ slug: post.slug }));
}

// ── Per-post SEO metadata ─────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post      = getPostBySlug(slug);

  if (!post) {
    return {
      title:       `Article Not Found | ${SITE_NAME}`,
      description: "This article may have moved or been unpublished. Browse all articles on the Astralearnia blog.",
      robots:      { index: false, follow: false },
    };
  }

  const url      = `${SITE_URL}/blog/${post.slug}`;
  // Use the post's own cover or fall back to the category default
  const ogImage  = post.coverImage?.trim() || getFallbackImage(post.tag);
  const title    = post.seoTitle       ?? `${post.title} | ${SITE_NAME}`;
  const desc     = post.seoDescription ?? post.excerpt;

  return {
    title,
    description: desc,
    keywords:    post.keywords,
    authors:     [{ name: post.author }],

    // ── Open Graph ────────────────────────────────────────────────────────────
    openGraph: {
      type:          "article",
      locale:        "en_US",
      url,
      siteName:      SITE_NAME,
      title:         post.title,
      description:   post.excerpt,
      publishedTime: post.date,
      modifiedTime:  post.date,
      authors:       [post.author],
      tags:          post.keywords,
      images: [
        {
          url:    ogImage,
          width:  1200,
          height: 630,
          alt:    post.coverAlt ?? post.title,
        },
      ],
    },

    // ── Twitter / X ───────────────────────────────────────────────────────────
    twitter: {
      card:        "summary_large_image",
      site:        SITE_HANDLE,
      creator:     SITE_HANDLE,
      title:       post.title,
      description: post.excerpt,
      images:      [ogImage],
    },

    // ── Canonical ─────────────────────────────────────────────────────────────
    alternates: { canonical: url },

    // ── Robots ────────────────────────────────────────────────────────────────
    robots: {
      index:  true,
      follow: true,
      googleBot: {
        index:                 true,
        follow:                true,
        "max-image-preview":   "large",
        "max-snippet":         -1,
        "max-video-preview":   -1,
      },
    },
  };
}

// ── Page shell ────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post      = getPostBySlug(slug);

  // ── JSON-LD structured data ────────────────────────────────────────────────
  const articleSchema = post
    ? buildArticleSchema({
        title:       post.title,
        excerpt:     post.excerpt,
        coverImage:  post.coverImage?.trim() || getFallbackImage(post.tag),
        date:        post.date,
        slug:        post.slug,
        author:      post.author,
        authorRole:  post.authorRole,
        keywords:    post.keywords,
      })
    : null;

  const breadcrumbSchema = post
    ? buildBreadcrumbSchema([
        { name: "Home",  url: SITE_URL },
        { name: "Blog",  url: `${SITE_URL}/blog` },
        { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
      ])
    : null;

  return (
    <>
      {/* BlogPosting schema → enables Google Article rich results */}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}

      {/* BreadcrumbList schema → enables breadcrumb trail in SERPs */}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      {/* Full interactive client component */}
      <BlogPostClient slug={slug} />
    </>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// 📌 VIEW TRACKING — add to BlogPostClient.tsx
//
// Paste this hook near the top of your BlogPostClient component.
// It fires a POST to /api/views/[slug] on first render (not bots),
// then shows the live view count.
//
//   import { useEffect, useState } from "react";
//
//   function usePostViews(slug: string) {
//     const [views, setViews] = useState<number | null>(null);
//
//     useEffect(() => {
//       // POST increments the counter for this slug
//       fetch(`/api/views/${slug}`, { method: "POST" })
//         .then(r => r.json())
//         .then(data => setViews(data.views))
//         .catch(() => {});
//     }, [slug]);
//
//     return views;
//   }
//
// Then inside your BlogPostClient function:
//   const viewCount = usePostViews(slug);
//
// Render it wherever you show post meta:
//   {viewCount !== null && (
//     <span style={{ display:"inline-flex", alignItems:"center", gap:5,
//                    fontSize:"0.75rem", color:"rgba(255,255,255,0.35)" }}>
//       👁 {viewCount.toLocaleString()} reads
//     </span>
//   )}
// ─────────────────────────────────────────────────────────────────────────────