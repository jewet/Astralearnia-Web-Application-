// env.d.ts  — lives at the project root
// Tells TypeScript about your Cloudflare bindings

interface CloudflareEnv {
  DB: D1Database;
}