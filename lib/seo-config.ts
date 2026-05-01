// ─── lib/seo-config.ts ────────────────────────────────────────────────────────
// Central SEO config + structured-data (JSON-LD) helpers.
// Import this everywhere you need meta/schema — one source of truth.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";

// ── Site-wide constants ───────────────────────────────────────────────────────
export const SITE_URL    = "https://astralearnia.com";
export const SITE_NAME   = "Astralearnia";
export const SITE_HANDLE = "@astralearnia";          // Twitter/X
export const LOGO_URL    = `${SITE_URL}/favicon.png`;

// ── Default / fallback OG image (1200 × 630) ─────────────────────────────────
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

// ── Category fallback cover images (Unsplash — CC0 licensed) ─────────────────
export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  Technology: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&auto=format&fit=crop&q=75",
  Institute:  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&auto=format&fit=crop&q=75",
  "AI Tools": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=75",
  Tutorials:  "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=900&auto=format&fit=crop&q=75",
  Reviews:    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=75",
  Default:    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=900&auto=format&fit=crop&q=75",
};

export function getFallbackImage(tag?: string): string {
  return CATEGORY_FALLBACK_IMAGES[tag ?? ""] ?? CATEGORY_FALLBACK_IMAGES.Default;
}

// ── Site-level metadata (put in app/layout.tsx `metadata` export) ─────────────
export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  `${SITE_NAME} — Enterprise AI & Adaptive Learning`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Deep guides on enterprise AI, adaptive learning, data engineering, and the future of work — by the engineers building these systems.",
  keywords: [
    "enterprise AI", "adaptive learning", "AI tools", "LLM", "machine learning",
    "edtech", "data engineering", "AI tutorials", "astralearnia",
  ],
  authors:   [{ name: SITE_NAME, url: SITE_URL }],
  creator:   SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index:               true,
    follow:              true,
    googleBot: {
      index:             true,
      follow:            true,
      "max-image-preview":   "large",
      "max-snippet":         -1,
      "max-video-preview":   -1,
    },
  },
  openGraph: {
    type:      "website",
    locale:    "en_US",
    url:       SITE_URL,
    siteName:  SITE_NAME,
    title:     `${SITE_NAME} — Enterprise AI & Adaptive Learning`,
    description:
      "Deep guides on enterprise AI, adaptive learning, data engineering, and the future of work.",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card:        "summary_large_image",
    site:        SITE_HANDLE,
    creator:     SITE_HANDLE,
    title:       `${SITE_NAME} — Enterprise AI & Adaptive Learning`,
    description: "Deep guides on enterprise AI, adaptive learning, and data engineering.",
    images:      [DEFAULT_OG_IMAGE],
  },
  alternates: { canonical: SITE_URL },
  verification: {
    // Add your tokens from Google / Bing Search Console:
    // google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
    // yandex: "YOUR_YANDEX_VERIFICATION_TOKEN",
  },
};

// ── JSON-LD helpers ───────────────────────────────────────────────────────────

/** Organisation schema — add once in <head> via layout.tsx */
export function buildOrganisationSchema() {
  return {
    "@context":   "https://schema.org",
    "@type":      "Organization",
    name:         SITE_NAME,
    url:          SITE_URL,
    logo:         LOGO_URL,
    sameAs: [
      // Add your social profiles:
      // "https://twitter.com/astralearnia",
      // "https://linkedin.com/company/astralearnia",
    ],
  };
}

/** WebSite schema — enables Google Sitelinks Search Box */
export function buildWebsiteSchema() {
  return {
    "@context":    "https://schema.org",
    "@type":       "WebSite",
    name:          SITE_NAME,
    url:           SITE_URL,
    potentialAction: {
      "@type":       "SearchAction",
      target:        `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** BlogPosting schema — one per article */
export function buildArticleSchema(post: {
  title:       string;
  excerpt:     string;
  coverImage:  string;
  date:        string;
  slug:        string;
  author:      string;
  authorRole?: string;
  keywords?:   string[];
}) {
  return {
    "@context":    "https://schema.org",
    "@type":       "BlogPosting",
    headline:      post.title,
    description:   post.excerpt,
    image:         post.coverImage || getFallbackImage(),
    datePublished: post.date,
    dateModified:  post.date,
    url:           `${SITE_URL}/blog/${post.slug}`,
    inLanguage:    "en-US",
    author: {
      "@type":   "Person",
      name:      post.author,
      jobTitle:  post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name:    SITE_NAME,
      logo:    { "@type": "ImageObject", url: LOGO_URL },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":   `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.keywords?.join(", "),
  };
}

/** BreadcrumbList schema */
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context":        "https://schema.org",
    "@type":           "BreadcrumbList",
    itemListElement:   items.map((item, i) => ({
      "@type":   "ListItem",
      position:  i + 1,
      name:      item.name,
      item:      item.url,
    })),
  };
}