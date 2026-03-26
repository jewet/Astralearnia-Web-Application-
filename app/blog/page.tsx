// ─── app/blog/page.tsx ────────────────────────────────────────────────────────
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/blog-data";

const FILTER_TAGS = ["All", "Technology", "Institute", "Case Studies", "Engineering", "Product"];

const tagStyle = (tag: string) => {
  if (tag === "Technology") return { bg: "rgba(0,200,255,0.12)",   border: "rgba(0,200,255,0.28)",   color: "#00c8ff" };
  if (tag === "Institute")  return { bg: "rgba(168,85,247,0.12)",  border: "rgba(168,85,247,0.28)",  color: "#a855f7" };
  return                           { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)" };
};

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [email,     setEmail]     = useState("");
  const [subDone,   setSubDone]   = useState(false);

  const filtered  = activeTag === "All" ? BLOG_POSTS : BLOG_POSTS.filter(p => p.tag === activeTag);
  const featured  = filtered[0];
  const remaining = filtered.slice(1);

  return (
    <div className="bg-[#050810] min-h-screen text-white font-sans antialiased">

      {/* ── ambient background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(0,200,255,0.07),transparent)]" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle,rgba(0,200,255,0.8) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
      </div>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative z-10 pt-32 pb-12 px-4 sm:px-6 lg:px-12 max-w-screen-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                        border border-white/15 bg-white/[0.04]
                        text-white/60 text-xs font-black uppercase tracking-[0.18em] mb-8">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Signal Intelligence
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <h1 className="font-black leading-[0.95] tracking-[-0.04em] text-4xl sm:text-6xl lg:text-7xl mb-5">
              <span className="block text-white">Intelligence</span>
              <span className="block" style={{
                background: "linear-gradient(135deg,#00c8ff,#7c5cff)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: "drop-shadow(0 0 30px rgba(0,200,255,0.35))"
              }}>Insights</span>
            </h1>
            <p className="text-base sm:text-xl text-slate-300 max-w-xl leading-relaxed font-light">
              Deep dives on enterprise AI, adaptive learning, and the future of intelligent organisations —
              from the Astralearnia engineering and education team.
            </p>
          </div>

          {/* quick stats */}
          <div className="flex gap-6 sm:gap-8 shrink-0 pb-1">
            {[
              { val: String(BLOG_POSTS.length), label: "Articles" },
              { val: "Weekly",                  label: "Cadence"  },
              { val: "Free",                    label: "Always"   },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-white"
                  style={{ filter: "drop-shadow(0 0 10px rgba(0,200,255,0.4))" }}>{s.val}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FILTER BAR
      ══════════════════════════════════════════════════ */}
      <div className="relative z-10 border-y border-white/[0.06] bg-[#080c14]/90 backdrop-blur-md">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {FILTER_TAGS.map(t => (
            <button key={t} onClick={() => setActiveTag(t)}
              className="px-3 sm:px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: activeTag === t ? "rgba(0,200,255,0.15)"         : "rgba(255,255,255,0.03)",
                border:     `1px solid ${activeTag === t ? "rgba(0,200,255,0.45)" : "rgba(255,255,255,0.08)"}`,
                color:      activeTag === t ? "#00c8ff"                      : "rgba(255,255,255,0.45)",
                boxShadow:  activeTag === t ? "0 0 16px rgba(0,200,255,0.2)" : "none",
              }}>
              {t}
            </button>
          ))}
          <span className="ml-auto shrink-0 text-[11px] font-bold text-white/25">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          FEATURED POST
      ══════════════════════════════════════════════════ */}
      {featured && (
        <section className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 pt-10 sm:pt-12 pb-4">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/25 mb-5">★ Featured Article</p>
          <Link href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-1"
            style={{ background: "#0d1622", border: "1px solid rgba(255,255,255,0.09)" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,200,255,0.42)"; el.style.boxShadow = "0 0 65px rgba(0,200,255,0.14)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.09)"; el.style.boxShadow = "none"; }}>
            {/* thumbnail */}
            <div className="relative aspect-video lg:aspect-auto min-h-[200px] sm:min-h-[220px] overflow-hidden bg-gradient-to-br from-[#101c2e] to-[#0a0f1a] border-b lg:border-b-0 lg:border-r border-white/[0.06]">
              <Image src={featured.coverImage} alt={featured.coverAlt} fill
                className="object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw" priority />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/[0.06] to-violet-400/[0.06] group-hover:from-cyan-400/[0.12] group-hover:to-violet-400/[0.12] transition-all duration-400" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1622]/70 to-transparent lg:hidden" />
              <div className="absolute top-4 left-4">
                {(() => { const ts = tagStyle(featured.tag); return (
                  <span className="px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider"
                    style={{ background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color }}>{featured.tag}</span>
                ); })()}
              </div>
            </div>
            {/* copy */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-white/25 mb-4">{featured.date} · {featured.readTime}</p>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight mb-4 sm:mb-5 group-hover:text-cyan-100 transition-colors duration-300">{featured.title}</h2>
                <p className="text-sm sm:text-base text-white/55 leading-relaxed mb-6 sm:mb-8">{featured.excerpt}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                    style={{ background: `${featured.authorColor}20`, border: `1px solid ${featured.authorColor}40`, color: featured.authorColor }}>
                    {featured.authorInitials}
                  </div>
                  <div>
                    <div className="text-sm font-black text-white/80">{featured.author}</div>
                    <div className="text-xs text-white/35 hidden sm:block">{featured.authorRole}</div>
                  </div>
                </div>
                <span className="text-sm font-black text-cyan-400/60 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300">Read →</span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          ADVERTISE WITH US — compact contextual banner
      ══════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-2">
        <div className="rounded-2xl px-5 sm:px-7 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
          style={{ background: "linear-gradient(90deg,rgba(124,92,255,0.08),rgba(0,200,255,0.06))", border: "1px solid rgba(124,92,255,0.18)" }}>
          <div className="flex items-center gap-3">
            {/* accent bar */}
            <div className="w-1 h-10 rounded-full shrink-0" style={{ background: "linear-gradient(180deg,#7c5cff,#00c8ff)" }} />
            <div>
              <div className="text-xs font-black text-white/70 uppercase tracking-widest mb-0.5">Advertise on Astralearnia</div>
              <p className="text-xs text-white/40 leading-relaxed max-w-lg">
                Reach <span className="text-white/65 font-bold">50,000+ enterprise AI decision-makers</span> monthly — engineers, L&D leads, and CTOs across Africa and beyond.
              </p>
            </div>
          </div>
          <Link href="/contact?subject=advertise"
            className="shrink-0 px-5 py-2.5 rounded-xl text-xs font-black text-white whitespace-nowrap transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#7c5cff,#00c8ff)", boxShadow: "0 4px 16px rgba(124,92,255,0.3)" }}>
            Get Media Kit →
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          REMAINING POSTS GRID
      ══════════════════════════════════════════════════ */}
      {remaining.length > 0 && (
        <section className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 pb-14 sm:pb-16 pt-6 sm:pt-8">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/25 mb-5">More Articles</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {remaining.map(post => {
              const ts = tagStyle(post.tag);
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "#0d1622", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,200,255,0.35)"; el.style.boxShadow = "0 0 40px rgba(0,200,255,0.10)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.boxShadow = "none"; }}>
                  {/* thumbnail */}
                  <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-[#101c2e] to-[#0a0f1a] border-b border-white/[0.05]">
                    <Image src={post.coverImage} alt={post.coverAlt} fill
                      className="object-cover opacity-55 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1622]/70 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider"
                        style={{ background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color }}>{post.tag}</span>
                    </div>
                  </div>
                  {/* body */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <h3 className="text-sm font-black text-white mb-2.5 leading-snug line-clamp-2 group-hover:text-cyan-100 transition-colors">{post.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black shrink-0"
                          style={{ background: `${post.authorColor}18`, color: post.authorColor }}>{post.authorInitials}</div>
                        <span className="text-xs font-bold text-white/45 truncate max-w-[100px]">{post.author}</span>
                      </div>
                      <span className="text-[10px] text-white/25 shrink-0">{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* empty state */}
      {filtered.length === 0 && (
        <section className="relative z-10 py-28 text-center px-6">
          <div className="text-5xl opacity-25 mb-4">◈</div>
          <h3 className="text-xl font-black text-white mb-2">No articles in this category yet</h3>
          <p className="text-white/40 text-sm mb-7">We publish weekly — check back soon.</p>
          <button onClick={() => setActiveTag("All")}
            className="px-6 py-3 rounded-xl text-sm font-black text-white transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 6px 20px rgba(0,200,255,0.3)" }}>
            View All Articles
          </button>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          NEWSLETTER
      ══════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/[0.06] bg-[#080c14] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-xl mx-auto text-center">
          <div className="text-3xl mb-5">✉</div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Get Insights in Your Inbox</h2>
          <p className="text-white/45 mb-8 text-sm sm:text-base leading-relaxed">
            New deep-dives every week on enterprise AI and adaptive learning. No fluff. Unsubscribe anytime.
          </p>
          {subDone ? (
            <div className="flex items-center justify-center gap-3 py-3">
              <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(0,255,178,0.15)", border: "1px solid rgba(0,255,178,0.35)", color: "#00ffb2" }}>✓</span>
              <span className="font-black text-white/80">You&apos;re subscribed. Welcome aboard.</span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl text-sm text-white bg-white/[0.04] border border-white/10 placeholder:text-white/25 focus:outline-none focus:border-cyan-400/50 transition-all" />
              <button onClick={() => { if (email) setSubDone(true); }}
                className="px-6 py-3 rounded-xl font-black text-white text-sm shrink-0 transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 6px 20px rgba(0,200,255,0.35)" }}>
                Subscribe →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WORK WITH US
      ══════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/[0.06] py-16 sm:py-20 px-4 sm:px-6 bg-[#050810]">
        <div className="max-w-screen-lg mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/50 text-xs font-black uppercase tracking-[0.18em] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Build With Astralearnia
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 leading-tight">Ready to work with us?</h2>
            <p className="text-white/45 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Whether you&apos;re an enterprise looking to deploy AI, or a talented engineer wanting to build the future — there&apos;s a seat at the table for you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-2xl mx-auto">
            {/* Client project */}
            <div className="rounded-2xl p-6 sm:p-8 flex flex-col gap-5"
              style={{ background: "linear-gradient(135deg,rgba(0,200,255,0.07),rgba(124,92,255,0.07))", border: "1px solid rgba(0,200,255,0.2)", boxShadow: "0 0 40px rgba(0,200,255,0.06)" }}>
              <div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg"
                  style={{ background: "rgba(0,200,255,0.15)", border: "1px solid rgba(0,200,255,0.3)" }}>◈</div>
                <h3 className="text-lg font-black text-white mb-2">Start a Project</h3>
                <p className="text-sm text-white/50 leading-relaxed">Need a custom AI solution, LLM integration, or enterprise training platform? We build end-to-end. Tell us what you&apos;re working on.</p>
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <Link href="/contact" className="w-full text-center px-5 py-3 rounded-xl font-black text-white text-sm transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 6px 20px rgba(0,200,255,0.28)" }}>Start a Conversation →</Link>
                <Link href="/book-demo" className="w-full text-center px-5 py-3 rounded-xl font-black text-white/60 text-sm transition-all hover:text-white hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>Book a Demo</Link>
              </div>
            </div>
            {/* Careers */}
            <div className="rounded-2xl p-6 sm:p-8 flex flex-col gap-5"
              style={{ background: "linear-gradient(135deg,rgba(168,85,247,0.07),rgba(255,110,199,0.07))", border: "1px solid rgba(168,85,247,0.2)", boxShadow: "0 0 40px rgba(168,85,247,0.06)" }}>
              <div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg"
                  style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}>✦</div>
                <h3 className="text-lg font-black text-white mb-2">Join the Team</h3>
                <p className="text-sm text-white/50 leading-relaxed">We hire engineers, educators, and AI researchers who want to work on hard problems for African enterprises. We&apos;re always open to strong talent.</p>
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <Link href="/careers" className="w-full text-center px-5 py-3 rounded-xl font-black text-white text-sm transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#a855f7,#ff6ec7)", boxShadow: "0 6px 20px rgba(168,85,247,0.28)" }}>View Open Roles →</Link>
                <Link href="/contact?subject=talent" className="w-full text-center px-5 py-3 rounded-xl font-black text-white/60 text-sm transition-all hover:text-white hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>Send Your CV</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}