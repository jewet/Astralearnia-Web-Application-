// ─── app/blog/layout.tsx ─────────────────────────────────────────────────────
// Server component layout for the /blog section.
// Provides metadata for the blog landing page.
// Individual post pages use generateMetadata in their own page.tsx and will
// override this layout's metadata automatically (Next.js metadata merging).
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Astralearnia Blog | AI Engineering, Adaptive Learning & Enterprise Intelligence",
  description:
    "Deep dives on enterprise AI, adaptive learning systems, and the future of intelligent organisations — from the Astralearnia engineering and education team.",
  keywords: [
    "enterprise AI blog",
    "AI engineering",
    "adaptive learning",
    "decision intelligence",
    "AI Africa",
    "corporate AI training",
    "LLM fine-tuning",
    "API-first AI",
  ],
  openGraph: {
    title: "Astralearnia Intelligence Blog",
    description:
      "Deep insights on AI engineering, enterprise architecture, and adaptive learning systems.",
    url: "https://astralearnia.com/blog",
    siteName: "Astralearnia",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=630&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Astralearnia Blog — AI Intelligence Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Astralearnia Blog | AI & Adaptive Learning Insights",
    description:
      "Deep insights on enterprise AI, LLMs, and intelligent learning systems.",
    images: [
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=630&fit=crop&q=80",
    ],
  },
  alternates: {
    canonical: "https://astralearnia.com/blog",
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}