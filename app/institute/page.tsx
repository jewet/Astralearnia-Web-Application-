"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useFade(thr = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: thr });
    o.observe(el); return () => o.disconnect();
  }, [thr]);
  return { ref, v };
}
function FadeIn({ children, d = 0, cls = "" }: { children: React.ReactNode; d?: number; cls?: string }) {
  const { ref, v } = useFade();
  return (
    <div ref={ref} className={cls} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(22px)", transition: `opacity .65s ease ${d}ms,transform .65s ease ${d}ms` }}>
      {children}
    </div>
  );
}

function VideoSlot({ color = "#a855f7", h = 300, title = "Institute Demo", sub = "3 min" }: { color?: string; h?: number; title?: string; sub?: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative w-full rounded-2xl overflow-hidden cursor-pointer group" style={{ height: h, background: "#0d0920", border: `1px solid ${color}1c` }} onClick={() => setOn(p => !p)}>
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(${color} 1px,transparent 1px),linear-gradient(90deg,${color} 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%,${color}0d,transparent)` }} />
      <div className="absolute top-0 left-0 w-14 h-px" style={{ background: `linear-gradient(90deg,${color}55,transparent)` }} />
      <div className="absolute top-0 left-0 w-px h-14" style={{ background: `linear-gradient(180deg,${color}55,transparent)` }} />
      <div className="absolute bottom-0 right-0 w-14 h-px" style={{ background: `linear-gradient(270deg,${color}55,transparent)` }} />
      <div className="absolute bottom-0 right-0 w-px h-14" style={{ background: `linear-gradient(0deg,${color}55,transparent)` }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `${color}1c`, filter: "blur(18px)", transform: "scale(2.2)" }} />
          <div className="relative w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: `${color}14`, border: `1.5px solid ${color}4a` }}>
            {on ? <div className="flex gap-1.5"><div className="w-1.5 h-5 rounded-sm" style={{ background: color }} /><div className="w-1.5 h-5 rounded-sm" style={{ background: color }} /></div>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill={color}><path d="M8 5v14l11-7z" /></svg>}
          </div>
        </div>
        <div className="text-center">
          <p className="text-white font-black text-sm">{title}</p>
          <p className="text-white/30 text-xs mt-0.5">{sub}</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0920] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black" style={{ background: "rgba(0,0,0,0.5)", border: `1px solid ${color}28`, color }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 5px ${color}` }} />WATCH DEMO
      </div>
    </div>
  );
}

const AUDIENCES = [
  { icon: "👤", label: "Individuals", title: "Professionals Upskilling", color: "#a855f7",
    desc: "Build in-demand AI, data, and digital skills with personalised learning paths that adapt to your pace and goals.",
    features: ["Self-paced modules", "AI skill assessments", "Industry certifications", "Career path planning"], cta: "Start Learning", href: "/signup" },
  { icon: "🏢", label: "Enterprises", title: "Corporate Training Teams", color: "#7c5cff",
    desc: "Deploy customised training across your workforce with manager dashboards, compliance tracking, and skills analytics.",
    features: ["Custom curricula", "Team dashboards", "Compliance modules", "Skills gap reports"], cta: "Book Enterprise Demo", href: "/book-demo" },
  { icon: "🏛️", label: "Institutions", title: "Academic & Training Bodies", color: "#ff6ec7",
    desc: "White-label our AI learning engine with your branding, your content, and our intelligence layer underneath.",
    features: ["White-label platform", "LMS integration", "Custom certification", "Learner analytics"], cta: "Partner With Us", href: "/contact" },
];

const FEATURES = [
  { icon: "📊", title: "Skills Gap Analytics", desc: "Real-time dashboard showing exactly where each learner falls short — and what to do about it.", tag: "Analytics", color: "#00ffb2" },
  { icon: "🎓", title: "Certification Engine", desc: "Issue blockchain-verified certificates tied to demonstrated skill, not just course completion.", tag: "Certifications", color: "#a855f7" },
  { icon: "🛠️", title: "Instructor Tools", desc: "Content builder, cohort management, automated nudges, and deep reporting for L&D teams.", tag: "Management", color: "#ff6ec7" },
  { icon: "🔗", title: "LMS & HRIS Integration", desc: "Native connectors for Workday, SAP SuccessFactors, Cornerstone, Moodle, and more.", tag: "Integration", color: "#7c5cff" },
];

const RESULTS = [
  { metric: "60%", label: "Average reduction in training time without sacrificing retention", org: "FinCorp Africa", color: "#a855f7" },
  { metric: "94%", label: "Certification pass rate vs 67% industry average", org: "Scale Ventures", color: "#00ffb2" },
  { metric: "40%", label: "Reduction in L&D costs after full platform deployment", org: "DataStack NG", color: "#ff6ec7" },
];

export default function InstitutePage() {
  return (
    <main className="bg-[#040710] text-white font-sans antialiased overflow-x-hidden">
      <style>{`
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes gpulse{0%,100%{opacity:.35}50%{opacity:1}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .st{background-size:200% auto;animation:shimmer 5s linear infinite}
        .gp{animation:gpulse 2.5s ease-in-out infinite}
        .fl{animation:float 4.5s ease-in-out infinite}
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 55% at 50% -8%,rgba(130,50,255,0.11),transparent)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 40% at 5% 65%,rgba(200,50,255,0.06),transparent)" }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(180,100,255,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(180,100,255,.9) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
      </div>

      {/* ── HERO — pt-20 on mobile clears the fixed navbar ── */}
      <section className="relative z-10 pt-20 sm:pt-24 lg:pt-32 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-14 max-w-screen-xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-6 sm:mb-7">
            <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">← Home</Link>
            <span className="text-white/15">/</span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
              style={{ border: "1px solid rgba(168,85,247,0.28)", background: "rgba(168,85,247,0.07)", color: "#a855f7" }}>
              <span className="w-1.5 h-1.5 rounded-full gp" style={{ background: "#a855f7" }} />Division 02 — Institute
            </span>
          </div>
        </FadeIn>
        <FadeIn d={60}>
          <h1 className="font-black leading-[0.93] tracking-[-0.045em] text-[clamp(2.4rem,8vw,8rem)] max-w-5xl mb-5 sm:mb-6">
            <span className="block text-white">Learning That</span>
            <span className="block st" style={{ background: "linear-gradient(90deg,#a855f7,#ec4899,#7c5cff,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Adapts to You.
            </span>
          </h1>
        </FadeIn>
        <FadeIn d={130}>
          <p className="text-base sm:text-xl text-white/50 max-w-2xl leading-relaxed mb-7 sm:mb-9 font-light">
            AI-powered learning systems that meet each person where they are, close skill gaps faster, and produce measurable outcomes for individuals and enterprises alike.
          </p>
        </FadeIn>
        <FadeIn d={200}>
          <div className="flex flex-row flex-wrap gap-3 mb-8 sm:mb-12">
            <Link href="/book-demo" className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-black text-white text-sm hover:-translate-y-0.5 transition-all"
              style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", boxShadow: "0 6px 28px rgba(168,85,247,0.32)" }}>
              Book a Learning Demo →
            </Link>
            <Link href="/contact" className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-white/50 text-sm hover:text-white transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
              Talk to Our Team
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 sm:gap-10 pt-7 sm:pt-9">
            {[["12K+","Active Learners","#a855f7"],["60%","Training Time Saved","#00ffb2"],["94%","Certification Rate","#ff6ec7"],["300+","Corporate Clients","#fbbf24"]].map(([v,l,c])=>(
              <div key={l} className="shrink-0">
                <div className="text-2xl sm:text-3xl font-black" style={{ color: c, filter: `drop-shadow(0 0 8px ${c}45)` }}>{v}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/28 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Hero Video */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-14 pb-14 sm:pb-20">
        <FadeIn><VideoSlot color="#a855f7" h={260} title="Institute Platform Demo" sub="3 min · Adaptive learning in action" /></FadeIn>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-14" style={{ paddingTop: 80, paddingBottom: 80, background: "linear-gradient(180deg,#040710,#0c0718 30%,#0c0718 70%,#040710)" }}>
        <div className="max-w-screen-xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
                style={{ border: "1px solid rgba(168,85,247,0.25)", background: "rgba(168,85,247,0.07)", color: "#a855f7" }}>Who We Serve</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3">Built for Every Learner</h2>
              <p className="text-white/38 text-sm max-w-sm mx-auto">From individual professionals to enterprise L&D teams — one platform, multiple journeys.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AUDIENCES.map((a,i)=>(
              <FadeIn key={a.title} d={i*60}>
                <div className="rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "#0a1020", border: `1px solid ${a.color}18` }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=a.color+"45";(e.currentTarget as HTMLElement).style.boxShadow=`0 0 35px ${a.color}10`;}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=a.color+"18";(e.currentTarget as HTMLElement).style.boxShadow="none";}}>
                  <div className="h-28 flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg,${a.color}09,transparent)` }}>
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle,${a.color} 1px,transparent 1px)`, backgroundSize: "18px 18px" }} />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest" style={{ background: "rgba(0,0,0,0.5)", color: a.color }}>{a.label}</div>
                    <span className="text-4xl fl relative z-10" style={{ animationDelay: `${i*0.4}s` }}>{a.icon}</span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-black text-white mb-2">{a.title}</h3>
                    <p className="text-xs text-white/45 leading-relaxed mb-4 flex-1">{a.desc}</p>
                    <ul className="flex flex-col gap-1.5 mb-5">
                      {a.features.map(f=>(
                        <li key={f} className="flex items-center gap-2 text-xs text-white/55">
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ background: a.color }} />{f}
                        </li>
                      ))}
                    </ul>
                    <Link href={a.href} className="w-full text-center py-2.5 rounded-xl font-black text-xs text-white hover:-translate-y-0.5 transition-all"
                      style={{ background: `linear-gradient(135deg,${a.color},#ec4899)`, boxShadow: `0 4px 16px ${a.color}28` }}>
                      {a.cta} →
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE FEATURE + SMALL GRID ── */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-14" style={{ paddingTop: 80, paddingBottom: 80, background: "#040710" }}>
        <div className="max-w-screen-xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
                style={{ border: "1px solid rgba(168,85,247,0.25)", background: "rgba(168,85,247,0.07)", color: "#a855f7" }}>Platform Features</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">The Intelligence Inside the{" "}
                <span className="st" style={{ background: "linear-gradient(90deg,#a855f7,#ec4899,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Learning Engine</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FadeIn>
              <div className="rounded-2xl overflow-hidden flex flex-col h-full" style={{ background: "#0a1020", border: "1px solid rgba(168,85,247,0.18)" }}>
                <VideoSlot color="#a855f7" h={200} title="Adaptive AI Engine in Action" sub="See personalisation live" />
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <span className="inline-block px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest mb-3 self-start" style={{ background: "rgba(168,85,247,0.12)", color: "#a855f7" }}>Core Feature</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3 leading-tight">Adaptive AI Learning Engine</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-5 flex-1">
                    Our AI continuously analyses each learner performance, adjusts difficulty in real time, identifies knowledge gaps, and recommends the next best content — automatically, without instructor intervention.
                  </p>
                  <div className="flex flex-row flex-wrap gap-3">
                    <Link href="/book-demo" className="px-5 py-2.5 rounded-xl font-black text-xs text-white hover:-translate-y-0.5 transition-all"
                      style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", boxShadow: "0 4px 16px rgba(168,85,247,0.28)" }}>See It in Action →</Link>
                    <Link href="/contact" className="px-5 py-2.5 rounded-xl font-bold text-xs text-white/50 hover:text-white transition-all"
                      style={{ border: "1px solid rgba(255,255,255,0.12)" }}>Learn More</Link>
                  </div>
                </div>
              </div>
            </FadeIn>
            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map((f,i)=>(
                <FadeIn key={f.title} d={i*50}>
                  <div className="rounded-2xl p-5 h-full flex flex-col transition-all duration-300 hover:-translate-y-1"
                    style={{ background: "#0a1020", border: `1px solid ${f.color}14` }}
                    onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor=f.color+"40"}
                    onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor=f.color+"14"}>
                    <span className="text-2xl fl mb-2" style={{ animationDelay: `${i*0.4}s` }}>{f.icon}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest mb-1.5" style={{ color: f.color }}>{f.tag}</span>
                    <h3 className="text-sm font-black text-white mb-1.5 leading-tight">{f.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed flex-1">{f.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-14" style={{ paddingTop: 80, paddingBottom: 80, background: "linear-gradient(180deg,#040710,#0c0718 40%,#040710)" }}>
        <div className="max-w-screen-xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
                style={{ border: "1px solid rgba(168,85,247,0.25)", background: "rgba(168,85,247,0.07)", color: "#a855f7" }}>Proof of Impact</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">Learning Results That Move Businesses</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESULTS.map((r,i)=>(
              <FadeIn key={r.metric} d={i*65}>
                <div className="rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "#0a1020", border: `1px solid ${r.color}14` }}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor=r.color+"40"}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor=r.color+"14"}>
                  <div className="w-full h-24 rounded-xl mb-5 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg,${r.color}08,transparent)`, border: `1px solid ${r.color}0f` }}>
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle,${r.color} 1px,transparent 1px)`, backgroundSize: "18px 18px" }} />
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: r.color + "88" }}>{r.org}</div>
                  <div className="text-4xl font-black text-white mb-2" style={{ filter: `drop-shadow(0 0 10px ${r.color}30)` }}>{r.metric}</div>
                  <p className="text-sm text-white/48 leading-relaxed">{r.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-20 sm:py-24 px-4 sm:px-6 text-center overflow-hidden" style={{ background: "#040710" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 50%,rgba(168,85,247,0.07),transparent)" }} />
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 relative z-10">Give Your Team the Intelligence to Grow</h2>
          <p className="text-white/40 text-base max-w-md mx-auto mb-8 relative z-10">Book a demo tailored to your learning goals. We will show you exactly how Astralearnia Institute can transform your workforce — in 30 minutes.</p>
          <div className="flex flex-row flex-wrap justify-center gap-3 relative z-10">
            <Link href="/book-demo" className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-black text-white text-sm hover:-translate-y-0.5 transition-all"
              style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", boxShadow: "0 8px 26px rgba(168,85,247,0.3)" }}>Book Learning Demo →</Link>
            <Link href="/contact" className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-white/50 text-sm hover:text-white transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}>Talk to Our Team</Link>
          </div>
          <div className="mt-8 relative z-10">
            <Link href="/divisions/technology" className="text-xs text-white/22 hover:text-white/50 transition-colors underline underline-offset-4">
              Need AI systems instead? → Visit Technology Division
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}