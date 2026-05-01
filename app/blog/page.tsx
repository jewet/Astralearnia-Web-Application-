"use client";
// ─── app/blog/page.tsx ────────────────────────────────────────────────────────
// AstraLearnia Blog — ENHANCED v4
// ✅ View/read counts per post (fetched from /api/views on mount)
// ✅ Image fallback: missing coverImage → Unsplash by category
// ✅ Image error fallback: broken URL → same category fallback
// ✅ Professional SEO metadata (static export in [slug]/page.tsx server component)
// ✅ All original features retained
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import { useEffect, useRef, useState, useMemo } from "react";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog-data";
import { getFallbackImage }          from "@/lib/seo-config";

// ── LAYOUT CONSTANTS ──────────────────────────────────────────────────────────
const MAX_W = "1600px";
const PX    = "clamp(20px,5vw,80px)";

// ── CATEGORIES ────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Technology", "Institute", "AI Tools", "Tutorials", "Reviews"] as const;
type Category = (typeof CATEGORIES)[number];

// ── TAG COLOUR HELPER ─────────────────────────────────────────────────────────
function tagStyle(tag: string) {
  if (tag === "Technology") return { bg: "rgba(0,200,255,0.12)",  border: "rgba(0,200,255,0.28)",  color: "#00c8ff" };
  if (tag === "Institute")  return { bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.28)", color: "#a855f7" };
  if (tag === "AI Tools")   return { bg: "rgba(0,255,178,0.11)",  border: "rgba(0,255,178,0.25)",  color: "#00ffb2" };
  if (tag === "Tutorials")  return { bg: "rgba(251,191,36,0.11)", border: "rgba(251,191,36,0.25)", color: "#fbbf24" };
  if (tag === "Reviews")    return { bg: "rgba(244,63,94,0.11)",  border: "rgba(244,63,94,0.25)",  color: "#f43f5e" };
  return                          { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)" };
}

// ── FADE-IN HOOK ──────────────────────────────────────────────────────────────
function useFade(thr = 0.06) {
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
      style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(22px)", transition: `opacity .6s ease ${d}ms, transform .6s ease ${d}ms` }}>
      {children}
    </div>
  );
}

// ── COVER IMAGE — lazy, shimmer, fallback on missing/broken src ───────────────
function CoverImage({ src, alt, accent, tag }: { src?: string; alt: string; accent?: string; tag?: string }) {
  const [loaded,  setLoaded]  = useState(false);
  const [imgSrc,  setImgSrc]  = useState<string>(() => {
    const s = src?.trim();
    return (s && s.length > 0) ? s : getFallbackImage(tag);
  });

  const col = accent ?? "rgba(0,200,255,0.18)";

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Shimmer skeleton while loading */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg,#0a1220 25%,#0d1828 50%,#0a1220 75%)",
        backgroundSize: "200% 100%",
        animation: loaded ? "none" : "coverShimmer 1.5s ease-in-out infinite",
        opacity: loaded ? 0 : 1, transition: "opacity 0.4s ease",
      }} />
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        onLoad={()  => setLoaded(true)}
        onError={() => { setImgSrc(getFallbackImage(tag)); setLoaded(false); }}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover",
          opacity: loaded ? 1 : 0,
          filter: "saturate(0.65) brightness(0.48)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${col} 0%, transparent 55%)` }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${col.replace("0.18","0.10")} 1px, transparent 1px),
                          linear-gradient(90deg, ${col.replace("0.18","0.10")} 1px, transparent 1px)`,
        backgroundSize: "38px 38px", opacity: 0.7,
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a1220 0%, transparent 55%)" }} />
    </div>
  );
}

// ── VIEW COUNT BADGE ──────────────────────────────────────────────────────────
function ViewBadge({ count }: { count: number | undefined }) {
  if (count === undefined) return null;
  const label = count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      fontSize: "0.62rem", fontWeight: 700, color: "rgba(255,255,255,0.28)",
    }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
      {label}
    </span>
  );
}

// ── TRENDING COMPACT CARD ─────────────────────────────────────────────────────
function TrendingCard({ post, rank, views }: { post: BlogPost; rank: number; views?: number }) {
  const ts = tagStyle(post.tag);
  return (
    <Link href={`/blog/${post.slug}`}
      style={{ display: "flex", gap: 14, alignItems: "flex-start", textDecoration: "none", padding: "14px 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", transition: "background .2s, border-color .2s" }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(0,200,255,0.05)"; el.style.borderColor = "rgba(0,200,255,0.22)"; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.02)"; el.style.borderColor = "rgba(255,255,255,0.06)"; }}
    >
      <div style={{ fontSize: "1.7rem", fontWeight: 900, color: rank === 1 ? "#00c8ff" : rank === 2 ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.1)", minWidth: 34, lineHeight: 1, letterSpacing: "-0.04em" }}>0{rank}</div>
      <div style={{ flex: 1 }}>
        <span style={{ padding: "2px 7px", borderRadius: 5, fontSize: "0.58rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color, display: "inline-block", marginBottom: 6 }}>{post.tag}</span>
        <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#fff", lineHeight: 1.3, marginBottom: 5 }}>{post.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.28)", fontWeight: 600 }}>{post.readTime} · {post.date}</span>
          <ViewBadge count={views} />
        </div>
      </div>
    </Link>
  );
}

// ── SMALL POST CARD ───────────────────────────────────────────────────────────
function PostCard({ post, delay = 0, views }: { post: BlogPost; delay?: number; views?: number }) {
  const ts  = tagStyle(post.tag);
  const col = post.tag === "Technology" ? "rgba(0,200,255,0.16)"
            : post.tag === "Institute"  ? "rgba(168,85,247,0.16)"
            : post.tag === "AI Tools"   ? "rgba(0,255,178,0.12)"
            : post.tag === "Tutorials"  ? "rgba(251,191,36,0.12)"
            : post.tag === "Reviews"    ? "rgba(244,63,94,0.12)"
            : "rgba(255,255,255,0.06)";
  return (
    <FadeIn d={delay}>
      <Link href={`/blog/${post.slug}`}
        style={{ display: "flex", flexDirection: "column", borderRadius: 18, overflow: "hidden", background: "#0a1220", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none", height: "100%", transition: "transform .25s, border-color .25s, box-shadow .25s" }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "rgba(0,200,255,0.3)"; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 0 42px rgba(0,200,255,0.09)";
          const img = el.querySelector("img") as HTMLImageElement | null;
          if (img) { img.style.transform = "scale(1.05)"; img.style.filter = "saturate(0.8) brightness(0.55)"; }
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none";
          const img = el.querySelector("img") as HTMLImageElement | null;
          if (img) { img.style.transform = "scale(1)"; img.style.filter = "saturate(0.65) brightness(0.48)"; }
        }}
      >
        {/* Cover image — will auto-fallback if src missing or broken */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "#060e1c", flexShrink: 0 }}>
          <CoverImage src={post.coverImage} alt={post.coverAlt ?? post.title} accent={col} tag={post.tag} />
          <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2 }}>
            <span style={{ padding: "3px 9px", borderRadius: 7, fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color }}>{post.tag}</span>
          </div>
          <div style={{ position: "absolute", right: 12, bottom: 12, fontSize: "1.5rem", opacity: 0.18, zIndex: 1, userSelect: "none" }}>{post.emoji}</div>
        </div>

        <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 9 }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.28)" }}>{post.date}</span>
            <span style={{ width: 2, height: 2, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.28)" }}>{post.readTime}</span>
            <span style={{ width: 2, height: 2, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
            <ViewBadge count={views} />
          </div>
          <h3 style={{ fontSize: "0.925rem", fontWeight: 800, color: "#fff", lineHeight: 1.3, marginBottom: 9, letterSpacing: "-0.01em" }}>{post.title}</h3>
          <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.excerpt}</p>
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${post.authorColor}20`, border: `1px solid ${post.authorColor}40`, color: post.authorColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", fontWeight: 800 }}>{post.authorInitials}</div>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.32)" }}>{post.author}</span>
            </div>
            <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#22d3ee" }}>Read →</span>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

// ── NEWSLETTER BAND ───────────────────────────────────────────────────────────
function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [sent,  setSent]  = useState(false);
  const [err,   setErr]   = useState(false);

  function handleSubmit() {
    if (!email.includes("@")) { setErr(true); return; }
    setErr(false); setSent(true);
  }

  return (
    <section style={{ position: "relative", zIndex: 10, maxWidth: MAX_W, margin: "0 auto", padding: `0 ${PX} clamp(40px,5vw,64px)` }}>
      <FadeIn>
        <div style={{
          borderRadius: 24, overflow: "hidden", position: "relative",
          background: "linear-gradient(135deg,#06101e 0%,#0b1a2e 100%)",
          border: "1px solid rgba(0,200,255,0.16)",
          padding: "clamp(32px,4vw,56px) clamp(28px,5vw,64px)",
          display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ position: "absolute", top: "-40%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,200,255,0.07),transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-30%", left: "8%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,0.05),transparent 70%)", pointerEvents: "none" }} />

          <div style={{ flex: "1 1 320px", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
              <span style={{ fontSize: "1.2rem" }}>📬</span>
              <span style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00c8ff" }}>Intelligence Digest</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.2rem,2.8vw,1.9rem)", fontWeight: 900, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Get our best articles — every week
            </h2>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.7, maxWidth: 420 }}>
              Enterprise AI, adaptive learning, and engineering deep-dives. No spam. Join 2,400+ readers building the future.
            </p>
          </div>

          <div style={{ flex: "1 1 340px", position: "relative", zIndex: 1 }}>
            {sent ? (
              <div style={{ padding: "20px 28px", borderRadius: 14, background: "rgba(0,255,178,0.08)", border: "1px solid rgba(0,255,178,0.22)", color: "#00ffb2", fontWeight: 800, fontSize: "0.925rem", textAlign: "center" }}>
                ✅ You&apos;re in! First digest lands this week.
              </div>
            ) : (
              <>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <input
                    type="email" value={email}
                    onChange={e => { setEmail(e.target.value); setErr(false); }}
                    placeholder="your@email.com"
                    style={{ flex: 1, padding: "13px 18px", borderRadius: 13, border: `1px solid ${err ? "rgba(244,63,94,0.5)" : "rgba(255,255,255,0.12)"}`, background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: "0.875rem", fontFamily: "inherit", outline: "none" }}
                  />
                  <button onClick={handleSubmit}
                    style={{ padding: "13px 26px", borderRadius: 13, fontWeight: 800, color: "#fff", fontSize: "0.875rem", background: "linear-gradient(135deg,#00c8ff,#3b82f6)", border: "none", cursor: "pointer", whiteSpace: "nowrap", boxShadow: "0 5px 22px rgba(0,200,255,0.32)" }}>
                    Subscribe →
                  </button>
                </div>
                {err && <div style={{ fontSize: "0.72rem", color: "#f43f5e", fontWeight: 700, marginBottom: 8 }}>Please enter a valid email address.</div>}
                <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.22)", fontWeight: 600, margin: 0 }}>No spam. Unsubscribe anytime. 100% free.</p>
              </>
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ── AUTHORS SPOTLIGHT ─────────────────────────────────────────────────────────
function AuthorsSpotlight() {
  const authors = useMemo(() => {
    const map = new Map<string, { name: string; role: string; color: string; initials: string; count: number }>();
    BLOG_POSTS.forEach(p => {
      if (!map.has(p.author)) {
        map.set(p.author, {
          name:     p.author,
          role:     (p as any).authorRole ?? "Writer",
          color:    p.authorColor,
          initials: p.authorInitials,
          count:    0,
        });
      }
      map.get(p.author)!.count++;
    });
    return [...map.values()].sort((a, b) => b.count - a.count).slice(0, 5);
  }, []);

  return (
    <section style={{ position: "relative", zIndex: 10, maxWidth: MAX_W, margin: "0 auto", padding: `0 ${PX} clamp(40px,5vw,60px)` }}>
      <FadeIn>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
          <span style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", whiteSpace: "nowrap" }}>Written by</span>
          <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.06)" }} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {authors.map(a => (
            <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${a.color}20`, border: `2px solid ${a.color}40`, color: a.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 900 }}>{a.initials}</div>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#fff" }}>{a.name}</div>
                <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>{a.role} · {a.count} article{a.count !== 1 ? "s" : ""}</div>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ── RELATED POSTS ROW ─────────────────────────────────────────────────────────
function RelatedPostsRow({ allViews }: { allViews: Record<string, number> }) {
  const related = useMemo(() => BLOG_POSTS.slice(0, 4), []);
  return (
    <section style={{ position: "relative", zIndex: 10, maxWidth: MAX_W, margin: "0 auto", padding: `0 ${PX} clamp(48px,7vw,80px)` }}>
      <FadeIn>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
          <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.06)" }} />
          <span style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", whiteSpace: "nowrap" }}>You might also like</span>
          <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.06)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(clamp(240px,22vw,380px),1fr))", gap: "clamp(14px,2vw,24px)" }}>
          {related.map((post, i) => <PostCard key={post.slug} post={post} delay={i * 60} views={allViews[post.slug]} />)}
        </div>
      </FadeIn>
    </section>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [filter,   setFilter]   = useState<Category>("All");
  const [search,   setSearch]   = useState("");
  const [focused,  setFocused]  = useState(false);
  const [allViews, setAllViews] = useState<Record<string, number>>({});

  // ── Fetch all view counts once on mount ──────────────────────────────────────
  useEffect(() => {
    fetch("/api/views")
      .then(r => r.json())
      .then((data: Record<string, number>) => setAllViews(data))
      .catch(() => { /* silently ignore — views are non-critical */ });
  }, []);

  const featured = BLOG_POSTS[BLOG_POSTS.length - 1];

  const trending = useMemo(() =>
    BLOG_POSTS.filter(p => p.slug !== featured.slug).slice(-4).reverse()
  , [featured.slug]);

  const filtered = useMemo(() => {
    let posts = BLOG_POSTS.filter(p => p.slug !== featured.slug);
    if (filter !== "All") posts = posts.filter(p => p.tag === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q)   ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)  ||
        p.tag.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [filter, search, featured.slug]);

  return (
    <main style={{ background: "#040710", color: "#fff", fontFamily: "sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @keyframes shimmer        { 0%   { background-position:200% center } 100% { background-position:-200% center } }
        @keyframes coverShimmer   { 0%,100% { background-position:200% 0 } 50% { background-position:-200% 0 } }
        @keyframes gpulse         { 0%,100% { opacity:.35 } 50% { opacity:1 } }
        .blog-shimmer             { background-size:200% auto; animation:shimmer 5s linear infinite }
        .filter-btn               { transition:all .2s; cursor:pointer; }
        .filter-btn:hover         { border-color:rgba(0,200,255,0.5)!important; color:rgba(255,255,255,0.85)!important; }
        input::placeholder        { color:rgba(255,255,255,0.22); }
        input:focus               { outline:none; }
        @media (max-width: 820px) {
          .feat-split             { grid-template-columns: 1fr !important; }
          .feat-img               { min-height: 240px !important; }
          .hero-cols              { flex-direction: column !important; }
        }
      `}</style>

      {/* ── Fixed ambient background ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 120% 55% at 50% -8%,rgba(0,180,255,0.1),transparent)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 90% 75%,rgba(168,85,247,0.07),transparent)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.018, backgroundImage: "linear-gradient(rgba(0,220,255,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,255,.9) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          HERO — headline left, trending sidebar right
      ═════════════════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 10, padding: `clamp(96px,14vw,148px) ${PX} clamp(36px,5vw,64px)`, maxWidth: MAX_W, margin: "0 auto" }}>

        {/* Breadcrumb */}
        <FadeIn>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <Link href="/" style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>← Home</Link>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 13px", borderRadius: 20,
              fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase",
              border: "1px solid rgba(0,200,255,0.28)", background: "rgba(0,200,255,0.07)", color: "#00c8ff" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00c8ff", boxShadow: "0 0 5px #00c8ff", animation: "gpulse 2.5s ease-in-out infinite" }} />
              Insights &amp; Research
            </span>
          </div>
        </FadeIn>

        {/* Hero two-column */}
        <div className="hero-cols" style={{ display: "flex", gap: "clamp(32px,5vw,80px)", alignItems: "flex-start" }}>

          {/* LEFT — big headline + stats */}
          <div style={{ flex: "1 1 480px" }}>
            <FadeIn d={50}>
              <h1 style={{ fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.04em", fontSize: "clamp(2.8rem,8vw,7.5rem)", marginBottom: "clamp(18px,2.5vw,28px)" }}>
                <span style={{ display: "block", color: "#fff" }}>Intelligence,</span>
                <span className="blog-shimmer" style={{ display: "block", background: "linear-gradient(90deg,#00c8ff,#3b82f6,#a855f7,#00c8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Written Down.</span>
              </h1>
            </FadeIn>

            <FadeIn d={110}>
              <p style={{ fontSize: "clamp(0.95rem,2vw,1.18rem)", color: "rgba(255,255,255,0.5)", maxWidth: 620, lineHeight: 1.72, fontWeight: 500, marginBottom: "clamp(28px,4vw,44px)" }}>
                Deep guides on enterprise AI, adaptive learning, data engineering, and the future of work — written by the engineers and educators building these systems.
              </p>
            </FadeIn>

            <FadeIn d={170}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(22px,4vw,50px)" }}>
                {[
                  [String(BLOG_POSTS.length),                                                                           "Articles",          "#00c8ff"],
                  ["2",                                                                                                  "Divisions covered", "#a855f7"],
                  ["28m",                                                                                                "Longest read",      "#00ffb2"],
                  [Object.values(allViews).reduce((a, b) => a + b, 0) > 0
                    ? `${(Object.values(allViews).reduce((a, b) => a + b, 0) / 1000).toFixed(1)}k`
                    : "—",                                                                                              "Total reads",       "#fbbf24"],
                ].map(([v, l, c]) => (
                  <div key={l}>
                    <div style={{ fontSize: "clamp(1.4rem,3.2vw,2.2rem)", fontWeight: 900, color: c, filter: `drop-shadow(0 0 9px ${c}55)` }}>{v}</div>
                    <div style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* RIGHT — Trending sidebar */}
          {trending.length > 0 && (
            <div style={{ flex: "0 1 380px", minWidth: 260 }}>
              <FadeIn d={230}>
                <div style={{ padding: "22px 20px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                    <span style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f43f5e" }}>🔥 Trending Now</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {trending.map((p, i) => (
                      <TrendingCard key={p.slug} post={p} rank={i + 1} views={allViews[p.slug]} />
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FEATURED POST — wide side-by-side split card
      ═════════════════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 10, maxWidth: MAX_W, margin: "0 auto", padding: `0 ${PX} clamp(36px,5vw,56px)` }}>
        <FadeIn>
          <div className="feat-split" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            borderRadius: 24, overflow: "hidden",
            background: "#0a1220", border: "1px solid rgba(0,200,255,0.14)",
            transition: "transform .3s, border-color .3s, box-shadow .3s",
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,200,255,0.38)"; el.style.transform = "translateY(-5px)"; el.style.boxShadow = "0 0 80px rgba(0,200,255,0.11)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,200,255,0.14)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
          >
            {/* Left — image */}
            <Link href={`/blog/${featured.slug}`} className="feat-img"
              style={{ position: "relative", minHeight: 440, overflow: "hidden", background: "#060e1c", display: "block" }}>
              <CoverImage
                src={featured.coverImage}
                alt={featured.coverAlt ?? featured.title}
                accent={featured.tag === "Technology" ? "rgba(0,200,255,0.18)" : "rgba(168,85,247,0.18)"}
                tag={featured.tag}
              />
              <div style={{ position: "absolute", top: 20, left: 20, zIndex: 2, padding: "5px 14px", borderRadius: 9, fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", background: "linear-gradient(135deg,#00c8ff,#3b82f6)", color: "#fff", boxShadow: "0 3px 14px rgba(0,200,255,0.38)" }}>★ Featured</div>
              <div style={{ position: "absolute", top: 20, right: 20, zIndex: 2 }}>
                {(() => { const ts = tagStyle(featured.tag); return (<span style={{ padding: "5px 12px", borderRadius: 9, fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color }}>{featured.tag}</span>); })()}
              </div>
              <div style={{ position: "absolute", right: 28, bottom: 28, fontSize: "5.5rem", opacity: 0.1, zIndex: 1, userSelect: "none" }}>{featured.emoji}</div>
            </Link>

            {/* Right — text */}
            <div style={{ padding: "clamp(28px,4vw,60px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.3)" }}>{featured.date}</span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.3)" }}>{featured.readTime}</span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                <ViewBadge count={allViews[featured.slug]} />
              </div>
              <h2 style={{ fontSize: "clamp(1.3rem,2.6vw,2.3rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 16, letterSpacing: "-0.03em" }}>{featured.title}</h2>
              <p style={{ fontSize: "0.975rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 32, flex: 1 }}>{featured.excerpt}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${featured.authorColor}20`, border: `2px solid ${featured.authorColor}40`, color: featured.authorColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 800 }}>{featured.authorInitials}</div>
                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "rgba(255,255,255,0.55)" }}>{featured.author}</div>
                    {(featured as any).authorRole && <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.28)", fontWeight: 600 }}>{(featured as any).authorRole}</div>}
                  </div>
                </div>
                <Link href={`/blog/${featured.slug}`} style={{ fontSize: "0.85rem", fontWeight: 800, color: "#00c8ff", textDecoration: "none" }}>Read article →</Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FILTER BAR — category pills + search
      ═════════════════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 10, maxWidth: MAX_W, margin: "0 auto", padding: `0 ${PX} clamp(24px,3vw,36px)` }}>
        <FadeIn>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", padding: "16px 22px", borderRadius: 18, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Category pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {CATEGORIES.map(f => {
                const active = filter === f;
                const c = tagStyle(f).color !== "rgba(255,255,255,0.45)" ? tagStyle(f).color : undefined;
                return (
                  <button key={f} className="filter-btn" onClick={() => setFilter(f)} style={{
                    padding: "7px 18px", borderRadius: 20, border: "1px solid",
                    fontSize: "0.73rem", fontWeight: 800,
                    background:  active ? (c ? `${c}14` : "rgba(255,255,255,0.09)") : "rgba(255,255,255,0.03)",
                    borderColor: active ? (c ?? "rgba(255,255,255,0.4)") : "rgba(255,255,255,0.1)",
                    color:       active ? (c ?? "#fff") : "rgba(255,255,255,0.42)",
                  }}>{f}</button>
                );
              })}
            </div>

            {/* Search */}
            <div style={{ position: "relative", flexGrow: 1, maxWidth: 360, minWidth: 200 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                placeholder="Search articles…"
                style={{ width: "100%", padding: "10px 14px 10px 40px", background: "rgba(255,255,255,0.04)", border: `1px solid ${focused ? "rgba(0,200,255,0.45)" : "rgba(255,255,255,0.1)"}`, borderRadius: 20, color: "#fff", fontSize: "0.82rem", fontFamily: "inherit", fontWeight: 500, transition: "border-color .2s", boxSizing: "border-box" }}
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          POST GRID — 4-column on wide screens
      ═════════════════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 10, maxWidth: MAX_W, margin: "0 auto", padding: `0 ${PX} clamp(40px,6vw,64px)` }}>
        {filtered.length === 0 ? (
          <FadeIn>
            <div style={{ textAlign: "center", padding: "70px 0", color: "rgba(255,255,255,0.28)" }}>
              <div style={{ fontSize: "2.8rem", marginBottom: 14, opacity: 0.3 }}>◈</div>
              <p style={{ fontWeight: 700, fontSize: "1.05rem" }}>No articles match your search.</p>
              <button onClick={() => { setSearch(""); setFilter("All"); }}
                style={{ marginTop: 16, padding: "9px 22px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "#fff", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700 }}>
                Clear filters
              </button>
            </div>
          </FadeIn>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(clamp(280px,21vw,380px),1fr))", gap: "clamp(14px,2vw,26px)" }}>
            {filtered.map((post, i) => (
              <PostCard key={post.slug} post={post} delay={i * 45} views={allViews[post.slug]} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <NewsletterBand />

      {/* Authors */}
      <AuthorsSpotlight />

      {/* Related posts */}
      <RelatedPostsRow allViews={allViews} />

      {/* ════════════════════════════════════════════════════════════════════
          CTA BAND
      ═════════════════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 10, padding: `clamp(56px,8vw,100px) ${PX}`, textAlign: "center", background: "linear-gradient(180deg,#040710,#070c18 40%,#040710)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%,rgba(0,200,255,0.055),transparent)", pointerEvents: "none" }} />
        <FadeIn>
          <div style={{ maxWidth: 580, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <h2 style={{ fontWeight: 900, fontSize: "clamp(1.6rem,4vw,2.8rem)", color: "#fff", marginBottom: 14, letterSpacing: "-0.025em" }}>Want to see it in practice?</h2>
            <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.975rem", maxWidth: 460, margin: "0 auto 30px", lineHeight: 1.72, fontWeight: 500 }}>
              Our technology and learning systems are built on the principles our engineers write about. Book a demo to see them live.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <Link href="/book-demo" style={{ padding: "14px 32px", borderRadius: 13, fontWeight: 800, color: "#fff", fontSize: "0.95rem", textDecoration: "none", background: "linear-gradient(135deg,#00c8ff,#3b82f6)", boxShadow: "0 7px 28px rgba(0,200,255,0.34)" }}>Book a Demo →</Link>
              <Link href="/contact"   style={{ padding: "14px 28px", borderRadius: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.02)" }}>Talk to an Engineer</Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}