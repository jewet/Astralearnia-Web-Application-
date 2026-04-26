"use client";
// ─── app/blog/page.tsx ────────────────────────────────────────────────────────
// AstraLearnia Blog — listing page
// Fixes the 404 error when navigating to /blog
// Connects to lib/blog-data.ts for all post data
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog-data";

// ── Fade-in hook ──────────────────────────────────────────────────────────────
function useFade(thr = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } },
      { threshold: thr }
    );
    o.observe(el); return () => o.disconnect();
  }, [thr]);
  return { ref, v };
}
function FadeIn({ children, d = 0, cls = "" }: { children: React.ReactNode; d?: number; cls?: string }) {
  const { ref, v } = useFade();
  return (
    <div ref={ref} className={cls}
      style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: `opacity .55s ease ${d}ms, transform .55s ease ${d}ms` }}>
      {children}
    </div>
  );
}

// ── Tag colour helper ─────────────────────────────────────────────────────────
function tagStyle(tag: string) {
  if (tag === "Technology") return { bg: "rgba(0,200,255,0.12)",  border: "rgba(0,200,255,0.28)",  color: "#00c8ff" };
  if (tag === "Institute")  return { bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.28)", color: "#a855f7" };
  return                          { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)" };
}

// ── Featured card ─────────────────────────────────────────────────────────────
function FeaturedCard({ post }: { post: BlogPost }) {
  const ts = tagStyle(post.tag);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block"
      style={{
        borderRadius: 20,
        overflow:     "hidden",
        background:   "#0a1220",
        border:       "1px solid rgba(0,200,255,0.14)",
        transition:   "transform .3s, border-color .3s, box-shadow .3s",
        textDecoration: "none",
        display:      "flex",
        flexDirection: "column",
      }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,200,255,0.38)"; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 0 50px rgba(0,200,255,0.09)"; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,200,255,0.14)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
    >
      {/* Cover */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/8", overflow: "hidden", background: "#060e1c" }}>
        <Image
          src={post.coverImage} alt={post.coverAlt}
          fill className="object-cover"
          style={{ opacity: 0.6, transition: "opacity .4s, transform .5s" }}
          sizes="(max-width: 768px) 100vw, 60vw"
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "0.6"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,#0a1220 5%,transparent 60%)" }} />
        {/* Featured badge */}
        <div style={{
          position:    "absolute", top: 16, left: 16,
          padding:     "4px 10px", borderRadius: 8,
          fontSize:    "0.62rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase",
          background:  "linear-gradient(135deg,#00c8ff,#3b82f6)",
          color:       "#fff",
          boxShadow:   "0 3px 12px rgba(0,200,255,0.35)",
        }}>★ Featured</div>
        <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ padding: "4px 10px", borderRadius: 8, fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color }}>{post.tag}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "clamp(18px,3vw,28px)", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.3)" }}>{post.date}</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
          <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.3)" }}>{post.readTime}</span>
        </div>
        <h2 style={{ fontSize: "clamp(1.1rem,2.5vw,1.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 10, letterSpacing: "-0.02em" }}>{post.title}</h2>
        <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.65, flex: 1, marginBottom: 16 }}>{post.excerpt}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: `${post.authorColor}20`, border: `1.5px solid ${post.authorColor}40`, color: post.authorColor,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 800,
            }}>{post.authorInitials}</div>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.45)" }}>{post.author}</span>
          </div>
          <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#00c8ff" }}>Read article →</span>
        </div>
      </div>
    </Link>
  );
}

// ── Small card ────────────────────────────────────────────────────────────────
function PostCard({ post, delay = 0 }: { post: BlogPost; delay?: number }) {
  const ts = tagStyle(post.tag);
  return (
    <FadeIn d={delay}>
      <Link
        href={`/blog/${post.slug}`}
        style={{
          display:      "flex",
          flexDirection: "column",
          borderRadius: 18,
          overflow:     "hidden",
          background:   "#0a1220",
          border:       "1px solid rgba(255,255,255,0.07)",
          textDecoration: "none",
          height:       "100%",
          transition:   "transform .25s, border-color .25s, box-shadow .25s",
        }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,200,255,0.3)"; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 0 35px rgba(0,200,255,0.08)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
      >
        {/* Thumbnail */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "#060e1c", flexShrink: 0 }}>
          <Image src={post.coverImage} alt={post.coverAlt} fill
            className="object-cover" style={{ opacity: 0.55, transition: "opacity .4s, transform .5s" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,#0a1220 5%,transparent 60%)" }} />
          <div style={{ position: "absolute", top: 12, left: 12 }}>
            <span style={{ padding: "3px 9px", borderRadius: 7, fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color }}>{post.tag}</span>
          </div>
          <div style={{ position: "absolute", top: 12, right: 12, fontSize: "1.1rem" }}>{post.emoji}</div>
        </div>

        {/* Body */}
        <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.28)" }}>{post.date}</span>
            <span style={{ width: 2, height: 2, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.28)" }}>{post.readTime}</span>
          </div>
          <h3 style={{ fontSize: "0.875rem", fontWeight: 800, color: "#fff", lineHeight: 1.3, marginBottom: 8, letterSpacing: "-0.01em" }}>{post.title}</h3>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.6, flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.excerpt}</p>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${post.authorColor}20`, border: `1px solid ${post.authorColor}40`, color: post.authorColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", fontWeight: 800 }}>{post.authorInitials}</div>
            <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.3)" }}>{post.author}</span>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [filter,  setFilter]  = useState<"All" | "Technology" | "Institute">("All");
  const [search,  setSearch]  = useState("");
  const [focused, setFocused] = useState(false);

  const featured = BLOG_POSTS[BLOG_POSTS.length - 1]; // most recent long-form

  const filtered = useMemo(() => {
    let posts = BLOG_POSTS.filter(p => p.slug !== featured.slug);
    if (filter !== "All") posts = posts.filter(p => p.tag === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [filter, search, featured.slug]);

  return (
    <main style={{ background: "#040710", color: "#fff", fontFamily: "sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes gpulse{0%,100%{opacity:.35}50%{opacity:1}}
        .blog-shimmer{background-size:200% auto;animation:shimmer 5s linear infinite}
        .blog-search:focus{outline:none;border-color:rgba(0,200,255,0.45)!important;box-shadow:0 0 0 3px rgba(0,200,255,0.08)!important}
        .blog-search::placeholder{color:rgba(255,255,255,0.22)}
        .blog-filter-btn{transition:all .2s}
        .blog-filter-btn:hover{border-color:rgba(0,200,255,0.45)!important;color:rgba(255,255,255,0.8)!important}
      `}</style>

      {/* Fixed ambient bg */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 45% at 50% -5%,rgba(0,180,255,0.09),transparent)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 85% 70%,rgba(168,85,247,0.05),transparent)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.018, backgroundImage: "linear-gradient(rgba(0,220,255,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,255,.9) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
      </div>

      {/* ── HERO ── */}
      <section style={{ position: "relative", zIndex: 10, padding: "clamp(88px,14vw,130px) clamp(16px,4vw,56px) clamp(32px,5vw,56px)", maxWidth: 1280, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <Link href="/" style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>← Home</Link>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 20,
              fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase",
              border: "1px solid rgba(0,200,255,0.28)", background: "rgba(0,200,255,0.07)", color: "#00c8ff",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00c8ff", boxShadow: "0 0 5px #00c8ff", animation: "gpulse 2.5s ease-in-out infinite" }} />
              Insights & Research
            </span>
          </div>
        </FadeIn>

        <FadeIn d={60}>
          <h1 style={{ fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.04em", fontSize: "clamp(2.2rem,8vw,6rem)", marginBottom: "clamp(14px,2vw,20px)" }}>
            <span style={{ display: "block", color: "#fff" }}>Intelligence,</span>
            <span className="blog-shimmer" style={{ display: "block", background: "linear-gradient(90deg,#00c8ff,#3b82f6,#a855f7,#00c8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Written Down.
            </span>
          </h1>
        </FadeIn>

        <FadeIn d={120}>
          <p style={{ fontSize: "clamp(0.9rem,2vw,1.1rem)", color: "rgba(255,255,255,0.5)", maxWidth: 540, lineHeight: 1.65, fontWeight: 500, marginBottom: "clamp(24px,4vw,36px)" }}>
            Deep guides on enterprise AI, adaptive learning, data engineering, and the future of work — written by the engineers and educators building these systems.
          </p>
        </FadeIn>

        {/* Stats */}
        <FadeIn d={170}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(16px,4vw,36px)" }}>
            {[
              [String(BLOG_POSTS.length), "Articles", "#00c8ff"],
              ["2",   "Divisions covered",  "#a855f7"],
              ["28m", "Longest read",        "#00ffb2"],
            ].map(([v, l, c]) => (
              <div key={l}>
                <div style={{ fontSize: "clamp(1.2rem,3vw,1.7rem)", fontWeight: 900, color: c, filter: `drop-shadow(0 0 6px ${c}45)` }}>{v}</div>
                <div style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── FEATURED POST ── */}
      <section style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,4vw,56px) clamp(32px,5vw,52px)" }}>
        <FadeIn>
          <FeaturedCard post={featured} />
        </FadeIn>
      </section>

      {/* ── FILTER + SEARCH BAR ── */}
      <section style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,4vw,56px) clamp(24px,4vw,36px)" }}>
        <FadeIn>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
            {/* Filter pills */}
            <div style={{ display: "flex", gap: 8 }}>
              {(["All", "Technology", "Institute"] as const).map(f => {
                const active = filter === f;
                const c = f === "Technology" ? "#00c8ff" : f === "Institute" ? "#a855f7" : undefined;
                return (
                  <button
                    key={f}
                    className="blog-filter-btn"
                    onClick={() => setFilter(f)}
                    style={{
                      padding: "7px 16px", borderRadius: 20, border: "1px solid",
                      fontSize: "0.75rem", fontWeight: 800, cursor: "pointer",
                      background: active ? (c ? `${c}14` : "rgba(255,255,255,0.08)") : "rgba(255,255,255,0.03)",
                      borderColor: active ? (c ?? "rgba(255,255,255,0.35)") + (c ? "45" : "") : "rgba(255,255,255,0.1)",
                      color: active ? (c ?? "#fff") : "rgba(255,255,255,0.42)",
                    }}
                  >{f}</button>
                );
              })}
            </div>

            {/* Search */}
            <div style={{ position: "relative", flexGrow: 1, maxWidth: 280 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
              <input
                className="blog-search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search articles…"
                style={{
                  width: "100%", padding: "8px 12px 8px 34px",
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${focused ? "rgba(0,200,255,0.38)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 20, color: "#fff", fontSize: "0.8rem", fontFamily: "inherit", fontWeight: 500,
                  transition: "border-color .2s",
                }}
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── POST GRID ── */}
      <section style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,4vw,56px) clamp(48px,8vw,80px)" }}>
        {filtered.length === 0 ? (
          <FadeIn>
            <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.28)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 12, opacity: 0.3 }}>◈</div>
              <p style={{ fontWeight: 700, fontSize: "1rem" }}>No articles match your search.</p>
              <button onClick={() => { setSearch(""); setFilter("All"); }} style={{ marginTop: 14, padding: "8px 18px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "#fff", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700 }}>
                Clear filters
              </button>
            </div>
          </FadeIn>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(clamp(260px,30vw,340px),1fr))", gap: "clamp(12px,2vw,20px)" }}>
            {filtered.map((post, i) => (
              <PostCard key={post.slug} post={post} delay={i * 45} />
            ))}
          </div>
        )}
      </section>

      {/* ── CTA BAND ── */}
      <section style={{ position: "relative", zIndex: 10, padding: "clamp(48px,7vw,80px) clamp(16px,4vw,56px)", textAlign: "center", background: "linear-gradient(180deg,#040710,#070c18 40%,#040710)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 55% at 50% 50%,rgba(0,200,255,0.05),transparent)", pointerEvents: "none" }} />
        <FadeIn>
          <div style={{ maxWidth: 520, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <h2 style={{ fontWeight: 900, fontSize: "clamp(1.5rem,3.5vw,2.4rem)", color: "#fff", marginBottom: 10, letterSpacing: "-0.02em" }}>
              Want to see it in practice?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.925rem", maxWidth: 400, margin: "0 auto 24px", lineHeight: 1.65, fontWeight: 500 }}>
              Our technology and learning systems are built on the principles our engineers write about. Book a demo to see them live.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              <Link href="/book-demo" style={{
                padding: "11px 24px", borderRadius: 12, fontWeight: 800, color: "#fff", fontSize: "0.875rem",
                textDecoration: "none", textAlign: "center",
                background: "linear-gradient(135deg,#00c8ff,#3b82f6)",
                boxShadow: "0 6px 22px rgba(0,200,255,0.3)",
              }}>Book a Demo →</Link>
              <Link href="/contact" style={{
                padding: "11px 22px", borderRadius: 12, fontWeight: 700, color: "rgba(255,255,255,0.55)", fontSize: "0.875rem",
                textDecoration: "none", textAlign: "center",
                border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.02)",
              }}>Talk to an Engineer</Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}