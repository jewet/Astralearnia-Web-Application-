// ─── app/blog/[slug]/page.tsx ─────────────────────────────────────────────────
// SERVER COMPONENT — handles SEO metadata for each blog post.
// All interactive UI lives in BlogPostClient.tsx ("use client").
//
// ⚠️  Next.js 15 BREAKING CHANGE: `params` is now a Promise.
//     Both generateMetadata and the default export MUST await it.
//     Not awaiting is why every slug showed "Article not found" —
//     params.slug resolved to a Promise object, not the slug string.
//
// ❌  REMOVED: export const runtime = "edge"
//     Edge runtime and generateStaticParams cannot be used together.
//     Next.js will throw a build error if both are present.
//     Without it, the page uses the default Node.js runtime and
//     static pre-rendering works as expected.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog-data";
import BlogPostClient from "./BlogPostClient";

const SITE_URL = "https://astralearnia.com";

// Next.js 15: params is Promise<{ slug: string }>
type Props = { params: Promise<{ slug: string }> };

// ── pre-render all slugs at build time ───────────────────────────────────────
export async function generateStaticParams() {
  return BLOG_POSTS.map(post => ({ slug: post.slug }));
}

// ── per-post SEO metadata ────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ✅ MUST await params in Next.js 15
  const { slug } = await params;
  const post      = getPostBySlug(slug);

  if (!post) {
    return {
      title:       "Article Not Found | Astralearnia",
      description: "This article may have moved or been unpublished. Browse all articles on the Astralearnia blog.",
    };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title:       post.seoTitle ?? `${post.title} | Astralearnia`,
    description: post.seoDescription ?? post.excerpt,
    keywords:    post.keywords,
    authors:     [{ name: post.author }],

    openGraph: {
      title:         post.title,
      description:   post.excerpt,
      url,
      siteName:      "Astralearnia",
      type:          "article",
      publishedTime: post.date,
      images: [
        {
          url:    post.coverImage,
          width:  1200,
          height: 630,
          alt:    post.coverAlt,
        },
      ],
    },

    twitter: {
      card:        "summary_large_image",
      title:       post.title,
      description: post.excerpt,
      images:      [post.coverImage],
    },

    alternates: {
      canonical: url,
    },
  };
}

// ── page shell ───────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: Props) {
  // ✅ MUST await params in Next.js 15
  const { slug } = await params;
  const post      = getPostBySlug(slug);

  const jsonLd = post
    ? {
        "@context":   "https://schema.org",
        "@type":      "BlogPosting",
        headline:     post.title,
        description:  post.excerpt,
        image:        post.coverImage,
        datePublished: post.date,
        author: {
          "@type":   "Person",
          name:      post.author,
          jobTitle:  post.authorRole,
        },
        publisher: {
          "@type": "Organisation",
          name:    "Astralearnia",
          logo: {
            "@type": "ImageObject",
            url:     `${SITE_URL}/logo.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id":   `${SITE_URL}/blog/${post.slug}`,
        },
        keywords: post.keywords?.join(", "),
      }
    : null;

  return (
    <>
      {/* JSON-LD structured data → Google rich results */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {/* Full interactive client component — receives resolved slug string */}
      <BlogPostClient slug={slug} />
    </>
  );
}