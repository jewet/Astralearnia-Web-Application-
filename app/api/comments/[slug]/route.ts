import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
//export const runtime = "edge";
type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  try {
    const { env } = await getCloudflareContext({ async: true });
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