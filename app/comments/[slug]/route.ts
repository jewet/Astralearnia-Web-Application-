// app/api/comments/[slug]/route.ts
import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from "next/server";

export const runtime = "edge";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  try {
    const { env } = getRequestContext() as unknown as { env: CloudflareEnv };

    const { results } = await env.DB.prepare(
      `SELECT id, name, message, created_at
       FROM comments
       WHERE slug = ? AND status = 'approved'
       ORDER BY created_at DESC
       LIMIT 50`
    )
      .bind(slug)
      .all();

    return NextResponse.json({ comments: results });
  } catch (err) {
    console.error("GET /api/comments error:", err);
    return NextResponse.json({ error: "Failed to load comments" }, { status: 500 });
  }
}