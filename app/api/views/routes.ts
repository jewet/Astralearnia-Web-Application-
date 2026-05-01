// ─── app/api/views/route.ts ───────────────────────────────────────────────────
// ENDPOINTS
//   GET  /api/views           → { "post-slug": 142, … }   all post counts
//   GET  /api/views?slug=x    → { slug: "x", count: 42 }  single post count
//   POST /api/views           body: { slug: "x" }          increment + return
//
// FIX: D1Database type is declared locally below — no need for
// @cloudflare/workers-types to be in tsconfig. This removes the
// "Cannot find name 'D1Database'" / "Did you mean 'IDBDatabase'?" error.
// ─────────────────────────────────────────────────────────────────────────────

export const runtime = "edge";

import { type NextRequest, NextResponse } from "next/server";
import { getCloudflareContext }           from "@opennextjs/cloudflare";

// ── Local D1 type — avoids the global @cloudflare/workers-types requirement ───
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T  = Record<string, unknown>>(): Promise<{ results: T[] }>;
  run(): Promise<{ success: boolean }>;
}
interface D1Database {
  prepare(sql: string): D1PreparedStatement;
}

// ── Bot UA fragments ──────────────────────────────────────────────────────────
const BOT_FRAGMENTS = [
  "googlebot","bingbot","slurp","duckduckbot","baiduspider","yandexbot",
  "sogou","exabot","ia_archiver","semrushbot","ahrefsbot","mj12bot","dotbot",
  "petalbot","bytespider","gptbot","ccbot","claudebot","anthropic-ai","diffbot",
  "dataforseobot","serpstatbot","blexbot",
];

function isBot(req: NextRequest): boolean {
  const ua = (req.headers.get("user-agent") ?? "").toLowerCase();
  return BOT_FRAGMENTS.some(b => ua.includes(b));
}

// ── Get D1 binding ────────────────────────────────────────────────────────────
// getCloudflareContext() throws in plain `pnpm dev` (no wrangler runtime),
// so we catch and return null → routes return count:0 gracefully in local dev.
function getDB(): D1Database | null {
  try {
    const { env } = getCloudflareContext();
    return ((env as unknown as Record<string, unknown>).DB as D1Database) ?? null;
  } catch {
    return null;
  }
}

// ── GET /api/views  or  GET /api/views?slug=x ─────────────────────────────────
export async function GET(req: NextRequest) {
  const db   = getDB();
  const slug = req.nextUrl.searchParams.get("slug");

  if (!db) {
    return NextResponse.json(slug ? { slug, count: 0 } : {});
  }

  try {
    if (slug) {
      const row = await db
        .prepare("SELECT count FROM post_views WHERE slug = ?")
        .bind(slug)
        .first<{ count: number }>();

      return NextResponse.json(
        { slug, count: row?.count ?? 0 },
        { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } },
      );
    }

    // All posts
    const { results } = await db
      .prepare("SELECT slug, count FROM post_views ORDER BY count DESC")
      .all<{ slug: string; count: number }>();

    const map: Record<string, number> = {};
    for (const row of results ?? []) map[row.slug] = row.count;

    return NextResponse.json(map, {
      headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" },
    });

  } catch (err) {
    console.error("[GET /api/views]", err);
    return NextResponse.json(slug ? { slug, count: 0 } : {}, { status: 500 });
  }
}

// ── POST /api/views  —  body: { slug: string } ────────────────────────────────
export async function POST(req: NextRequest) {
  if (isBot(req)) {
    return NextResponse.json({ count: 0 }, { headers: { "Cache-Control": "no-store" } });
  }

  const db = getDB();
  if (!db) return NextResponse.json({ count: 0 });

  let slug: string;
  try {
    const body = await req.json() as { slug?: unknown };
    if (!body.slug || typeof body.slug !== "string" || !body.slug.trim()) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }
    slug = body.slug.trim();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    await db
      .prepare(`
        INSERT INTO post_views (slug, count) VALUES (?, 1)
        ON CONFLICT(slug) DO UPDATE SET count = count + 1
      `)
      .bind(slug)
      .run();

    const row = await db
      .prepare("SELECT count FROM post_views WHERE slug = ?")
      .bind(slug)
      .first<{ count: number }>();

    return NextResponse.json(
      { slug, count: row?.count ?? 1 },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    console.error("[POST /api/views]", err);
    return NextResponse.json({ slug, count: 0 }, { status: 500 });
  }
}