// ─── app/api/views/[slug]/route.ts ───────────────────────────────────────────
// ENDPOINTS
//   GET  /api/views/:slug   → { slug, count: N }
//   POST /api/views/:slug   → { slug, count: N }  (slug from URL, no body needed)
//
// FIX: D1Database type declared locally — no @cloudflare/workers-types needed.
// FIX: No longer imports from ../route.ts (removed fs / /tmp dependency).
// ─────────────────────────────────────────────────────────────────────────────

export const runtime = "edge";

import { type NextRequest, NextResponse } from "next/server";
import { getCloudflareContext }           from "@opennextjs/cloudflare";

// Next.js 15 — params is a Promise
type RouteContext = { params: Promise<{ slug: string }> };

// ── Local D1 type — same as in parent route, self-contained ──────────────────
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
function getDB(): D1Database | null {
  try {
    const { env } = getCloudflareContext();
    return ((env as unknown as Record<string, unknown>).DB as D1Database) ?? null;
  } catch {
    return null;
  }
}

// ── GET /api/views/:slug ──────────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: RouteContext,
) {
  const { slug } = await params;
  const db       = getDB();

  if (!db) {
    return NextResponse.json(
      { slug, count: 0 },
      { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } },
    );
  }

  try {
    const row = await db
      .prepare("SELECT count FROM post_views WHERE slug = ?")
      .bind(slug)
      .first<{ count: number }>();

    return NextResponse.json(
      { slug, count: row?.count ?? 0 },
      { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } },
    );
  } catch (err) {
    console.error("[GET /api/views/:slug]", err);
    return NextResponse.json({ slug, count: 0 }, { status: 500 });
  }
}

// ── POST /api/views/:slug ─────────────────────────────────────────────────────
export async function POST(
  req: NextRequest,
  { params }: RouteContext,
) {
  const { slug } = await params;

  if (isBot(req)) {
    return NextResponse.json(
      { slug, count: 0 },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const db = getDB();
  if (!db) return NextResponse.json({ slug, count: 0 });

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
    console.error("[POST /api/views/:slug]", err);
    return NextResponse.json({ slug, count: 0 }, { status: 500 });
  }
}