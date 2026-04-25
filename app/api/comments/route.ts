// app/api/comments/route.ts
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";



interface CommentBody {
  slug: string;
  name: string;
  email?: string;
  message: string;
}

export async function POST(req: Request) {
  let body: CommentBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { slug, name, email, message } = body;

  // ── validation ────────────────────────────────────────────────────
  if (!slug?.trim())          return NextResponse.json({ error: "Missing slug" },    { status: 400 });
  if (!name?.trim())          return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (!message?.trim())       return NextResponse.json({ error: "Message is required" }, { status: 400 });
  if (name.trim().length > 80)    return NextResponse.json({ error: "Name too long" },    { status: 400 });
  if (message.trim().length > 1000) return NextResponse.json({ error: "Message too long" }, { status: 400 });
  if (email && email.trim().length > 120) return NextResponse.json({ error: "Email too long" }, { status: 400 });

  // Basic email format check (if provided)
  if (email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  try {
     const { env } = await getCloudflareContext({ async: true });
    await env.DB.prepare(
      `INSERT INTO comments (slug, name, email, message)
       VALUES (?, ?, ?, ?)`
    )
      .bind(
        slug.trim(),
        name.trim(),
        email?.trim() ?? null,
        message.trim()
      )
      .run();

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("POST /api/comments error:", err);
    return NextResponse.json({ error: "Failed to save comment" }, { status: 500 });
  }
}