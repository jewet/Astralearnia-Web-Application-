// ─── app/robots.ts ────────────────────────────────────────────────────────────
// Served automatically at /robots.txt by Next.js App Router.
//
// WHAT'S BLOCKED AND WHY:
//   ✅ AI training scrapers (GPTBot, Claude, Common Crawl, etc.)
//      → Prevents your content being used to train LLMs without consent
//   ✅ Aggressive SEO crawlers (AhrefsBot, SemrushBot, MJ12bot, DotBot)
//      → These crawl very frequently and inflate your server costs with zero
//        ranking benefit — they are data harvesting tools, not search engines
//   ✅ Scrapers and data harvesters
//      → PetalBot, DataForSeoBot, BLEXBot, SeznamBot, etc.
//   ✅ Internal / private routes
//      → /api/ (except intentionally public endpoints like /api/views)
//
// WHAT'S ALLOWED:
//   ✅ Google (Googlebot, Google-InspectionTool, GoogleOther)
//   ✅ Bing (bingbot)
//   ✅ Apple (Applebot)
//   ✅ DuckDuckGo (DuckDuckBot)
//   ✅ Facebook / Meta share previews (facebookexternalhit)
//   ✅ Twitter card scraper (Twitterbot)
//   ✅ LinkedIn share previews (LinkedInBot)
//   ✅ Slack / WhatsApp / Telegram link previews
//
// NOTE: robots.txt is advisory — a bad actor can ignore it.
//   For real protection against scrapers, add Cloudflare WAF rules
//   or rate-limit at the edge using a Cloudflare Worker.
// ─────────────────────────────────────────────────────────────────────────────

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [

      // ── 1. Main search engines — full access ────────────────────────────
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Googlebot-Video",
          "Google-InspectionTool",
          "GoogleOther",
          "Storebot-Google",
          "bingbot",
          "Bingbot",
          "Slurp",              // Yahoo
          "DuckDuckBot",
          "Applebot",
          "Baiduspider",
          "YandexBot",
          "facebookexternalhit",// Facebook OG preview
          "Twitterbot",         // Twitter card preview
          "LinkedInBot",        // LinkedIn share preview
          "Slackbot",           // Slack unfurl preview
          "TelegramBot",        // Telegram link preview
          "WhatsApp",           // WhatsApp link preview
        ],
        allow:    "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },

      // ── 2. AI training crawlers — block everything ───────────────────────
      // These harvest content to train large language models.
      {
        userAgent: [
          "GPTBot",             // OpenAI
          "ChatGPT-User",       // OpenAI ChatGPT browsing
          "OAI-SearchBot",      // OpenAI search
          "anthropic-ai",       // Anthropic Claude
          "Claude-Web",         // Anthropic Claude
          "ClaudeBot",          // Anthropic
          "CCBot",              // Common Crawl (feeds many LLMs)
          "Google-Extended",    // Google Bard / Gemini training
          "Cohere-ai",          // Cohere
          "PerplexityBot",      // Perplexity AI
          "YouBot",             // You.com
          "Meta-ExternalAgent", // Meta AI training
          "Diffbot",            // Diffbot AI data extraction
          "ImagesiftBot",       // Image AI training
          "Omgilibot",          // Social media AI harvesting
          "omgili",
        ],
        disallow: ["/"],
      },

      // ── 3. Aggressive SEO crawlers — block everything ────────────────────
      // Pure data harvesting — zero SEO benefit for your site.
      {
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
          "DotBot",
          "BLEXBot",
          "DataForSeoBot",
          "PetalBot",
          "SeznamBot",
          "Seekport",
          "Exabot",
          "ia_archiver",        // Alexa / Internet Archive aggressive crawler
          "MojeekBot",
          "PiplBot",
          "BomboraBot",
          "Bytespider",         // TikTok / ByteDance scraper
          "Amazonbot",          // Amazon Alexa training
          "Applebot-Extended",  // Apple AI training (separate from Applebot)
        ],
        disallow: ["/"],
      },

      // ── 4. Default rule — all other bots get read access, no API/admin ───
      {
        userAgent: "*",
        allow:    ["/", "/blog/"],
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/book-demo/thank-you",
        ],
      },
    ],

    sitemap: "https://astralearnia.com/sitemap.xml",
    host:    "https://astralearnia.com",
  };
}