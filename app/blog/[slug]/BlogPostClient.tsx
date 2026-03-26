// ─── app/blog/[slug]/BlogPostClient.tsx ──────────────────────────────────────
"use client";
import Link  from "next/link";
import Image from "next/image";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog-data";
import Comments from "@/components/Comments";

const SITE_URL = "https://astralearnia.com";

const tagStyle = (tag: string) => {
  if (tag === "Technology") return { bg: "rgba(0,200,255,0.12)",   border: "rgba(0,200,255,0.28)",   color: "#00c8ff" };
  if (tag === "Institute")  return { bg: "rgba(168,85,247,0.12)",  border: "rgba(168,85,247,0.28)",  color: "#a855f7" };
  return                           { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)" };
};

// ─── inline image block ───────────────────────────────────────────────────────
function InlineImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-8 sm:my-10">
      <div className="relative w-full rounded-2xl overflow-hidden border border-white/[0.08]"
        style={{ aspectRatio: "16/9", boxShadow: "0 0 40px rgba(0,200,255,0.06)" }}>
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 672px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/30 to-transparent" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs text-white/35 text-center italic leading-relaxed px-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─── inline video thumbnail block ────────────────────────────────────────────
function InlineVideo({ thumb, title, duration, url, caption }: {
  thumb: string; title: string; duration?: string; url?: string; caption?: string;
}) {
  const Wrapper = url && url !== "#" ? "a" : "div";
  const wrapperProps = url && url !== "#"
    ? { href: url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <figure className="my-8 sm:my-10 group">
      <Wrapper {...wrapperProps}>
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/[0.1] cursor-pointer"
          style={{ aspectRatio: "16/9", boxShadow: "0 0 50px rgba(0,200,255,0.08)" }}>
          <Image src={thumb} alt={title} fill className="object-cover opacity-55 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
            sizes="(max-width: 1024px) 100vw, 672px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/75 via-[#050810]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/[0.04] to-violet-400/[0.04] group-hover:from-cyan-400/[0.09] group-hover:to-violet-400/[0.09] transition-all duration-400" />

          {/* play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ background: "rgba(0,200,255,0.15)", border: "2px solid rgba(0,200,255,0.5)", backdropFilter: "blur(8px)", boxShadow: "0 0 30px rgba(0,200,255,0.25)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#00c8ff"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>

          {/* top-left badge */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider"
              style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(0,200,255,0.3)", color: "#00c8ff" }}>
              ▶ Video
            </span>
            {duration && (
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white/60"
                style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {duration}
              </span>
            )}
          </div>

          {/* title overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <p className="text-sm sm:text-base font-black text-white leading-snug line-clamp-2">{title}</p>
          </div>
        </div>
      </Wrapper>
      {caption && (
        <figcaption className="mt-3 text-xs text-white/35 text-center italic leading-relaxed px-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─── main component ───────────────────────────────────────────────────────────
export default function BlogPostClient({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);

  if (!post) return (
    <div className="bg-[#050810] min-h-screen text-white flex flex-col items-center justify-center px-6 gap-6">
      <div className="text-6xl opacity-25">◈</div>
      <h1 className="text-3xl font-black text-white">Article not found</h1>
      <p className="text-white/45 text-center max-w-sm">This article may have moved or been unpublished. Browse all articles below.</p>
      <Link href="/blog" className="px-6 py-3 rounded-xl font-black text-white text-sm transition-all hover:-translate-y-0.5"
        style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 6px 20px rgba(0,200,255,0.3)" }}>
        ← Back to Blog
      </Link>
    </div>
  );

  const ts           = tagStyle(post.tag);
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== post.slug && p.tag === post.tag).slice(0, 3);
  const morePosts    = relatedPosts.length < 3
    ? [...relatedPosts, ...BLOG_POSTS.filter(p => p.slug !== post.slug && p.tag !== post.tag)].slice(0, 3)
    : relatedPosts;

  return (
    <div className="bg-[#050810] min-h-screen text-white font-sans antialiased">

      {/* ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(0,200,255,0.06),transparent)]" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "radial-gradient(circle,rgba(0,200,255,0.8) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
      </div>

      {/* ══════════════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════════════ */}
      <header className="relative z-10 pt-28 sm:pt-32 pb-12 sm:pb-14 px-4 sm:px-6 lg:px-12 max-w-screen-lg mx-auto">
        {/* breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-white/30 mb-6 sm:mb-8 overflow-x-auto scrollbar-none">
          <Link href="/"     className="hover:text-white/60 transition-colors whitespace-nowrap">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-white/60 transition-colors whitespace-nowrap">Blog</Link>
          <span>/</span>
          <span className="text-white/50 line-clamp-1">{post.title}</span>
        </div>

        {/* tag + meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
          <span className="px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider"
            style={{ background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color }}>{post.tag}</span>
          <span className="text-xs font-bold text-white/30">{post.date}</span>
          <span className="text-white/15">·</span>
          <span className="text-xs font-bold text-white/30">{post.readTime}</span>
        </div>

        {/* title */}
        <h1 className="font-black leading-[1.06] tracking-[-0.03em] text-2xl sm:text-4xl lg:text-5xl text-white mb-6 sm:mb-8 max-w-3xl">
          {post.title}
        </h1>

        {/* excerpt */}
        <p className="text-base sm:text-xl text-white/55 leading-relaxed max-w-2xl mb-8 sm:mb-10 font-light">
          {post.excerpt}
        </p>

        {/* author + share */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-5 sm:pt-6 border-t border-white/[0.08]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-sm font-black shrink-0"
              style={{ background: `${post.authorColor}20`, border: `2px solid ${post.authorColor}40`, color: post.authorColor, boxShadow: `0 0 20px ${post.authorColor}25` }}>
              {post.authorInitials}
            </div>
            <div>
              <div className="font-black text-white text-sm">{post.author}</div>
              <div className="text-xs text-white/40">{post.authorRole}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white/25 mr-1">Share</span>
            {[
              { label: "X",        href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(canonicalUrl)}`, sym: "𝕏" },
              { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`,                         sym: "in" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${s.label}`}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white/40 hover:text-white transition-all hover:-translate-y-0.5"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {s.sym}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════
          ARTICLE
      ══════════════════════════════════════════════════ */}
      <article className="relative z-10 max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-12 pb-16 sm:pb-20">

        {/* hero cover */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 sm:mb-14 border border-white/[0.08]"
          style={{ boxShadow: "0 0 80px rgba(0,200,255,0.08)" }}>
          <Image src={post.coverImage} alt={post.coverAlt} fill className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/[0.03] to-violet-400/[0.03]" />
        </div>

        {/* content blocks */}
        <div className="max-w-2xl mx-auto">
          {post.content.map((block, i) => {

            if (block.type === "h2") return (
              <h2 key={i} className="text-xl sm:text-2xl lg:text-3xl font-black text-white mt-10 sm:mt-12 mb-4 sm:mb-5 leading-tight"
                style={{ borderLeft: "3px solid #00c8ff", paddingLeft: "1rem" }}>
                {block.text}
              </h2>
            );

            if (block.type === "h3") return (
              <h3 key={i} className="text-lg sm:text-xl font-black text-white/90 mt-7 sm:mt-8 mb-3 sm:mb-4">{block.text}</h3>
            );

            if (block.type === "quote") return (
              <blockquote key={i} className="my-8 sm:my-10 px-5 sm:px-7 py-5 sm:py-6 rounded-2xl relative"
                style={{ background: "linear-gradient(135deg,rgba(0,200,255,0.07),rgba(124,92,255,0.07))", border: "1px solid rgba(0,200,255,0.2)", boxShadow: "0 0 40px rgba(0,200,255,0.06)" }}>
                <div className="text-3xl sm:text-4xl text-cyan-400/30 font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light italic">{block.text}</p>
                <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ background: "linear-gradient(180deg,#00c8ff,#7c5cff)" }} />
              </blockquote>
            );

            if (block.type === "code") return (
              <div key={i} className="my-6 sm:my-8 rounded-xl overflow-hidden"
                style={{ background: "#080c14", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.07]">
                  {["#ff5f57","#febc2e","#28c840"].map(c => (
                    <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                  ))}
                  {block.lang && <span className="ml-2 text-xs font-bold text-white/25 uppercase">{block.lang}</span>}
                </div>
                <pre className="p-4 sm:p-5 text-xs sm:text-sm text-emerald-300 font-mono leading-relaxed overflow-x-auto">
                  <code>{block.text}</code>
                </pre>
              </div>
            );

            if (block.type === "image") return (
              <InlineImage key={i} src={block.src} alt={block.alt} caption={block.caption} />
            );

            if (block.type === "video") return (
              <InlineVideo key={i} thumb={block.thumb} title={block.title} duration={block.duration} url={block.url} caption={block.caption} />
            );

            // default: paragraph
            return (
              <p key={i} className="text-sm sm:text-base lg:text-lg text-white/65 leading-[1.85] mb-5 sm:mb-6 font-light">
                {block.text}
              </p>
            );
          })}

          {/* ══ COMMENTS ══ */}
          <Comments slug={slug} />

        </div>

        {/* ══════════════════════════════════════════════════
            DUAL CTA
        ══════════════════════════════════════════════════ */}
        <div className="mt-14 sm:mt-16 space-y-4">
          {/* primary */}
          <div className="rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6"
            style={{ background: "linear-gradient(135deg,rgba(0,200,255,0.08),rgba(124,92,255,0.08))", border: "1px solid rgba(0,200,255,0.2)" }}>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-black text-white mb-2">Ready to put this into practice?</h3>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed">See how Astralearnia can accelerate your AI strategy — book a personalised demo with our engineers.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0 w-full sm:w-auto">
              <Link href="/book-demo" className="flex-1 sm:flex-none text-center px-5 sm:px-6 py-3 rounded-xl font-black text-white text-sm transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 6px 20px rgba(0,200,255,0.3)" }}>Book a Demo →</Link>
              <Link href="/contact" className="flex-1 sm:flex-none text-center px-5 sm:px-6 py-3 rounded-xl font-black text-white/70 text-sm transition-all hover:text-white hover:-translate-y-0.5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)" }}>Talk to Sales</Link>
            </div>
          </div>

          {/* secondary — careers + project */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl p-5 sm:p-6 flex items-center gap-4"
              style={{ background: "linear-gradient(135deg,rgba(168,85,247,0.07),rgba(255,110,199,0.07))", border: "1px solid rgba(168,85,247,0.18)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-base"
                style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}>✦</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-black text-white mb-1">We&apos;re Hiring</div>
                <p className="text-xs text-white/45 leading-relaxed">Engineers, educators, and AI researchers.</p>
              </div>
              <Link href="/careers" className="shrink-0 px-4 py-2 rounded-lg text-xs font-black text-white/70 hover:text-white transition-all hover:-translate-y-0.5"
                style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.25)" }}>See Roles →</Link>
            </div>
            <div className="rounded-2xl p-5 sm:p-6 flex items-center gap-4"
              style={{ background: "linear-gradient(135deg,rgba(0,255,178,0.06),rgba(0,200,255,0.06))", border: "1px solid rgba(0,255,178,0.15)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-base"
                style={{ background: "rgba(0,255,178,0.12)", border: "1px solid rgba(0,255,178,0.25)" }}>◈</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-black text-white mb-1">Got a Project?</div>
                <p className="text-xs text-white/45 leading-relaxed">Custom AI builds and enterprise integrations.</p>
              </div>
              <Link href="/contact?subject=project" className="shrink-0 px-4 py-2 rounded-lg text-xs font-black text-white/70 hover:text-white transition-all hover:-translate-y-0.5"
                style={{ background: "rgba(0,255,178,0.12)", border: "1px solid rgba(0,255,178,0.2)" }}>Reach Us →</Link>
            </div>
          </div>
        </div>
      </article>

      {/* ══════════════════════════════════════════════════
          MORE ARTICLES
      ══════════════════════════════════════════════════ */}
      {morePosts.length > 0 && (
        <section className="relative z-10 border-t border-white/[0.06] bg-[#080c14] py-14 sm:py-16 px-4 sm:px-6 lg:px-12">
          <div className="max-w-screen-lg mx-auto">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-black text-white">More Articles</h2>
              <Link href="/blog" className="text-sm font-black text-cyan-400/70 hover:text-cyan-400 transition-colors">View All →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {morePosts.map(rp => {
                const rts = tagStyle(rp.tag);
                return (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{ background: "#0d1622", border: "1px solid rgba(255,255,255,0.08)" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,200,255,0.3)"; el.style.boxShadow = "0 0 35px rgba(0,200,255,0.09)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.boxShadow = "none"; }}>
                    <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-[#101c2e] to-[#0a0f1a] border-b border-white/[0.05]">
                      <Image src={rp.coverImage} alt={rp.coverAlt} fill
                        className="object-cover opacity-55 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1622]/70 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider"
                          style={{ background: rts.bg, border: `1px solid ${rts.border}`, color: rts.color }}>{rp.tag}</span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <h3 className="text-sm font-black text-white mb-2 leading-snug line-clamp-2 group-hover:text-cyan-100 transition-colors">{rp.title}</h3>
                      <p className="text-xs text-white/35 line-clamp-2 mb-4 flex-1">{rp.excerpt}</p>
                      <span className="text-[10px] font-bold text-white/25">{rp.date} · {rp.readTime}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* back to blog */}
      <div className="relative z-10 py-8 sm:py-10 text-center bg-[#050810]">
        <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white/50 hover:text-white transition-all hover:-translate-y-0.5"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}