"use client";
import { useState } from "react";
import Link from "next/link";
import { DivisionModal } from "@/components/DivisionModal";
import { BLOG_POSTS, PILLARS } from "@/lib/constants";

// ─── Shared style tokens ────────────────────────────────────────
const pill = `inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full
  border border-white/20 bg-white/5
  text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.18em]`;

const btnCyan = `inline-flex items-center justify-center gap-2
  px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-black text-sm sm:text-base tracking-wide text-white
  bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600
  hover:from-cyan-300 hover:via-blue-400 hover:to-violet-500
  shadow-[0_0_30px_rgba(0,200,255,0.4)]
  hover:shadow-[0_0_55px_rgba(0,200,255,0.65)]
  transition-all duration-300 hover:-translate-y-0.5 active:scale-95`;

const btnGhost = `inline-flex items-center justify-center gap-2
  px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-black text-sm sm:text-base tracking-wide
  border-2 border-white/25 hover:border-white/60 text-white
  hover:bg-white/8 transition-all duration-300 hover:-translate-y-0.5 active:scale-95`;

const btnViolet = `inline-flex items-center justify-center gap-2
  px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-black text-sm sm:text-base tracking-wide text-white
  bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500
  hover:from-violet-400 hover:via-fuchsia-400 hover:to-pink-400
  shadow-[0_0_30px_rgba(160,80,255,0.4)]
  hover:shadow-[0_0_55px_rgba(160,80,255,0.65)]
  transition-all duration-300 hover:-translate-y-0.5 active:scale-95`;

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <DivisionModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ── Global mobile-fix styles injected once ── */}
      <style>{`
        /* Prevent horizontal overflow on all sections */
        .hp-root { overflow-x:hidden; }

        /* Compact hero video on mobile */
        .hp-hero-video { aspect-ratio:16/9; max-height:220px; }
        @media(min-width:640px) { .hp-hero-video { max-height:none; } }

        /* Division cards — equal height columns on sm+ */
        .hp-division-grid { display:grid; grid-template-columns:1fr; gap:14px; }
        @media(min-width:640px) { .hp-division-grid { grid-template-columns:repeat(2,1fr); gap:20px; } }
        @media(min-width:1024px){ .hp-division-grid { gap:28px; } }

        /* Division card image height — compact on mobile */
        .hp-div-img { height:100px; }
        @media(min-width:640px){ .hp-div-img { height:208px; } }

        /* Problem steps — stacked on mobile, side by side on sm */
        .hp-problem-grid { display:grid; grid-template-columns:1fr; }
        @media(min-width:640px){ .hp-problem-grid { grid-template-columns:repeat(3,1fr); } }

        /* Pillars — 2-col mobile, 4-col lg */
        .hp-pillars-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
        @media(min-width:640px) { .hp-pillars-grid { gap:14px; } }
        @media(min-width:1024px){ .hp-pillars-grid { grid-template-columns:repeat(4,1fr); gap:18px; } }

        /* Solutions inner 2-col sub-grid on mobile */
        .hp-solutions-sub { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
        @media(min-width:1024px){ .hp-solutions-sub { grid-template-columns:1fr; gap:18px; } }
        .hp-solutions-sub-img { height:80px; }
        @media(min-width:640px){ .hp-solutions-sub-img { height:160px; } }

        /* Testimonials — 2-col mobile, 3-col md */
        .hp-testimonials-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
        @media(min-width:768px){ .hp-testimonials-grid { grid-template-columns:repeat(3,1fr); gap:20px; } }

        /* Blog — 2-col mobile, 3-col lg */
        .hp-blog-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
        @media(min-width:1024px){ .hp-blog-grid { grid-template-columns:repeat(3,1fr); gap:20px; } }

        /* CTA cards — 2-col mobile, 3-col md */
        .hp-cta-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; max-width:900px; margin:0 auto; }
        @media(min-width:768px){ .hp-cta-grid { grid-template-columns:repeat(3,1fr); gap:20px; } }

        /* Stats row — 3-col on mobile */
        .hp-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
        @media(min-width:640px){ .hp-stats { display:flex; flex-wrap:wrap; gap:28px; } }

        /* Hero buttons — 2-col on mobile */
        .hp-hero-btns { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
        @media(min-width:640px){ .hp-hero-btns { display:flex; flex-wrap:wrap; gap:14px; } }

        /* Glassmorphism utility */
        .glass-card {
          background: rgba(13,22,34,0.7);
          backdrop-filter: blur(12px) saturate(140%);
          -webkit-backdrop-filter: blur(12px) saturate(140%);
        }
        .glass-panel {
          background: rgba(8,12,20,0.8);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
        }
      `}</style>

      <main className="hp-root bg-[#050810] text-white font-sans antialiased">

        {/* ═══════════════════════════════════════════════════════
            1. HERO
        ═══════════════════════════════════════════════════════ */}
        <section className="relative min-h-[100dvh] flex flex-col justify-start overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-5%,rgba(0,180,255,0.22),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_80%,rgba(130,50,255,0.15),transparent)]" />
            <div className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: `linear-gradient(rgba(0,220,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,255,1) 1px,transparent 1px)`,
                backgroundSize: "80px 80px",
              }}
            />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-32 pb-8 sm:pb-16 lg:pb-20">

            <div className={`${pill} mb-5 sm:mb-8`}>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span className="hidden sm:inline">Two Divisions. One Unified Intelligence Platform.</span>
              <span className="sm:hidden">Two Divisions. One Platform.</span>
            </div>

            <h1 className="font-black leading-[1.02] tracking-[-0.04em]
                           text-[clamp(2rem,8vw,6rem)]
                           max-w-6xl mb-4 sm:mb-8">
              <span className="block text-white">Engineering Intelligence.</span>
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300
                               bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(0,200,255,0.5)]">
                Empowering Minds.
              </span>
            </h1>

            <p className="text-sm sm:text-xl lg:text-2xl text-slate-300 max-w-3xl leading-relaxed mb-6 sm:mb-10 font-semibold">
              Astralearnia is the intelligence layer modern organisations need —
              delivering enterprise AI systems through our{" "}
              <strong className="text-white font-black">Technology Division</strong> and
              transforming human potential through our{" "}
              <strong className="text-white font-black">Institute Division</strong>.
            </p>

            {/* Buttons — compact 2-col grid on mobile */}
            <div className="hp-hero-btns mb-8 sm:mb-16 lg:mb-20">
              <Link href="/book-demo" className={`${btnCyan} text-center`}>
                Book a Free Demo →
              </Link>
              <button onClick={() => setModalOpen(true)} className={`${btnGhost} text-center`}>
                Explore Divisions ↓
              </button>
            </div>

            {/* Stats — 3-col grid on mobile */}
            <div className="hp-stats border-t border-white/10 pt-5 sm:pt-10">
              {[
                { val: "500+",  label: "Enterprises" },
                { val: "99.9%", label: "Uptime" },
                { val: "3.2×",  label: "Avg. ROI" },
                { val: "<48h",  label: "Deploy Time" },
                { val: "12K+",  label: "Learners" },
              ].map(s => (
                <div key={s.label} className="text-center sm:text-left">
                  <span className="block text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">{s.val}</span>
                  <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-slate-500">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero media slot — compact height on mobile */}
          <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 pb-12 sm:pb-24">
            <div className="hp-hero-video w-full rounded-2xl border border-white/10
                            bg-gradient-to-br from-[#0d1622] to-[#080c14]
                            flex items-center justify-center overflow-hidden relative
                            shadow-[0_0_80px_rgba(0,200,255,0.12)]">
              <div className="text-center space-y-3 text-slate-600 pointer-events-none select-none">
                <svg className="mx-auto w-10 h-10 sm:w-16 sm:h-16 text-cyan-400/30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            2. DIVISION BRIDGE
        ═══════════════════════════════════════════════════════ */}
        <section id="divisions" className="relative bg-[#080c14] py-14 sm:py-24 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(0,200,255,0.06),transparent)] pointer-events-none" />

          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="text-center mb-8 sm:mb-16 lg:mb-20">
              <div className={`${pill} mb-4 sm:mb-6 mx-auto`}>Our Two Divisions</div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-tight mb-4 sm:mb-6">
                One Company. Two Powerful{" "}
                <span className="block sm:inline">
                  <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                    Paths to Impact.
                  </span>
                </span>
              </h2>
              <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-semibold">
                Whether you need AI systems for your business or transformative learning
                programmes for your people — Astralearnia has a dedicated division for it.
              </p>
            </div>

            {/* Division cards */}
            <div className="hp-division-grid mb-8 sm:mb-12">

              {/* Technology */}
              <div className="group relative rounded-2xl border border-cyan-400/20
                              hover:border-cyan-400/50 overflow-hidden bg-[#0a1020]
                              transition-all duration-400 hover:shadow-[0_0_60px_rgba(0,200,255,0.18)]">
                <div className="hp-div-img w-full bg-gradient-to-br from-cyan-900/25 to-blue-900/15
                                border-b border-cyan-400/15 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center text-slate-700 pointer-events-none select-none">
                    <div className="text-2xl sm:text-5xl mb-1 text-cyan-400/20">🖼</div>
                    <p className="text-[9px] sm:text-xs font-black uppercase tracking-widest">Technology Division</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1020] via-[#0a1020]/20 to-transparent" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4 sm:p-8 lg:p-10">
                  <div className="flex items-start justify-between mb-3 sm:mb-6">
                    <div>
                      <div className="inline-flex px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-cyan-400/10 border border-cyan-400/20
                                      text-cyan-300 text-[9px] sm:text-xs font-black uppercase tracking-widest mb-2 sm:mb-3">
                        Division 01
                      </div>
                      <h3 className="text-lg sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                        Astralearnia<br />Technology
                      </h3>
                    </div>
                    <span className="text-2xl sm:text-5xl mt-1">⚡</span>
                  </div>
                  <p className="text-xs sm:text-lg text-slate-300 leading-relaxed mb-4 sm:mb-6 font-semibold">
                    We design, build, and deploy custom AI systems that turn your organisation&apos;s
                    data into decisions. From intelligent APIs to full automation pipelines —
                    we are the technical backbone enterprises trust.
                  </p>
                  <div className="grid grid-cols-2 gap-1 sm:gap-3 mb-4 sm:mb-8">
                    {["AI Model Dev","Decision Intel","API Platform","Data Automation","Enterprise Int.","Real-time AI"].map(f => (
                      <div key={f} className="flex items-center gap-1.5 text-[10px] sm:text-sm text-slate-300 font-semibold">
                        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan-400 shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href="/divisions/technology" className={`${btnCyan} w-full`}>Explore Technology →</Link>
                    <button onClick={() => setModalOpen(true)} className={`${btnGhost} w-full`}>Compare Divisions</button>
                  </div>
                </div>
              </div>

              {/* Institute */}
              <div className="group relative rounded-2xl border border-violet-400/20
                              hover:border-violet-400/50 overflow-hidden bg-[#0e0a1a]
                              transition-all duration-400 hover:shadow-[0_0_60px_rgba(160,80,255,0.18)]">
                <div className="hp-div-img w-full bg-gradient-to-br from-violet-900/25 to-fuchsia-900/15
                                border-b border-violet-400/15 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center text-slate-700 pointer-events-none select-none">
                    <div className="text-2xl sm:text-5xl mb-1 text-violet-400/20">🖼</div>
                    <p className="text-[9px] sm:text-xs font-black uppercase tracking-widest">Institute Division</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a1a] via-[#0e0a1a]/20 to-transparent" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4 sm:p-8 lg:p-10">
                  <div className="flex items-start justify-between mb-3 sm:mb-6">
                    <div>
                      <div className="inline-flex px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-violet-400/10 border border-violet-400/20
                                      text-violet-300 text-[9px] sm:text-xs font-black uppercase tracking-widest mb-2 sm:mb-3">
                        Division 02
                      </div>
                      <h3 className="text-lg sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                        Astralearnia<br />Institute
                      </h3>
                    </div>
                    <span className="text-2xl sm:text-5xl mt-1">🎓</span>
                  </div>
                  <p className="text-xs sm:text-lg text-slate-300 leading-relaxed mb-4 sm:mb-6 font-semibold">
                    We transform how people learn and grow. Our adaptive AI learning engine
                    builds personalised pathways, measures skills in real time, and delivers
                    certifications that matter in today&apos;s market.
                  </p>
                  <div className="grid grid-cols-2 gap-1 sm:gap-3 mb-4 sm:mb-8">
                    {["Adaptive Paths","Corp Training","AI Certs","Skills Analytics","Instructor Tools","Dashboards"].map(f => (
                      <div key={f} className="flex items-center gap-1.5 text-[10px] sm:text-sm text-slate-300 font-semibold">
                        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-violet-400 shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href="/divisions/institute" className={`${btnViolet} w-full`}>Explore Institute →</Link>
                    <button onClick={() => setModalOpen(true)} className={`${btnGhost} w-full`}>Compare Divisions</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Help me choose */}
            <div className="text-center">
              <p className="text-slate-400 text-sm sm:text-lg mb-3 sm:mb-4 font-semibold">Not sure which division fits your needs?</p>
              <button onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-3 px-5 sm:px-10 py-3 sm:py-4 rounded-xl
                           bg-gradient-to-r from-cyan-400/10 via-white/5 to-violet-400/10
                           border-2 border-white/20 hover:border-white/40
                           text-white font-black text-sm sm:text-lg tracking-wide
                           hover:bg-white/8 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto">
                ✦ Help Me Choose My Division
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            3. PROBLEM → SOLUTION
        ═══════════════════════════════════════════════════════ */}
        <section className="relative bg-[#050810] py-14 sm:py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(0,200,255,0.05),transparent)] pointer-events-none" />
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="text-center mb-8 sm:mb-16">
              <div className={`${pill} mb-4 sm:mb-6 mx-auto`}>The Problem We Solve</div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4 sm:mb-6">
                Most Companies Have Data.<br />
                <span className="text-red-400">Few Have Intelligence.</span>
              </h2>
              <p className="text-sm sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-semibold">
                Siloed tools, disconnected training, and AI that doesn&apos;t integrate.
                We fix all three — with one unified platform, two specialised divisions.
              </p>
            </div>
            {/* 3-step — stacked on mobile, side-by-side on sm+ */}
            <div className="hp-problem-grid relative">
              <div className="hidden sm:block absolute top-1/2 left-1/3 right-1/3 h-px
                              bg-gradient-to-r from-red-500/30 via-cyan-400/50 to-emerald-400/30 -translate-y-1/2" />
              {[
                { n:"01",icon:"⚡",c:"border-red-500/30 hover:border-red-400/60",a:"text-red-400",bg:"bg-[#0e0810]",
                  title:"The Problem",body:"Teams run on 5+ platforms that don't communicate. Insight gets buried. Training is generic. Decisions take too long." },
                { n:"02",icon:"◈",c:"border-cyan-400/30 hover:border-cyan-300/60",a:"text-cyan-300",bg:"bg-[#080c14]",
                  title:"Astralearnia Unifies",body:"One platform ingests your data, trains your team, runs your AI models, and surfaces intelligence exactly where work happens." },
                { n:"03",icon:"✦",c:"border-emerald-500/30 hover:border-emerald-400/60",a:"text-emerald-400",bg:"bg-[#080e10]",
                  title:"Measurable Outcomes",body:"Clients report 3× faster decisions, 40% lower training costs, and AI deployments that go live in under 48 hours." },
              ].map((item, i) => (
                <div key={i} className={`relative ${item.bg} border-2 ${item.c} p-4 sm:p-8 lg:p-10
                               transition-all duration-300 hover:brightness-110 hover:-translate-y-1
                               ${i === 0 ? "rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none" : i === 2 ? "rounded-b-2xl sm:rounded-r-2xl sm:rounded-bl-none" : ""}`}>
                  <div className={`text-3xl sm:text-5xl mb-3 sm:mb-5 ${item.a}`}>{item.icon}</div>
                  <div className={`text-[10px] sm:text-xs font-black uppercase tracking-widest ${item.a} mb-1.5 sm:mb-3`}>Step {item.n}</div>
                  <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-white mb-2 sm:mb-4 leading-tight">{item.title}</h3>
                  <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-semibold">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            4. FOUR PILLARS
        ═══════════════════════════════════════════════════════ */}
        <section className="relative bg-[#080c14] py-14 sm:py-24 lg:py-28">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-8 sm:mb-14">
              <div className={`${pill} mb-4 sm:mb-6 mx-auto`}>Core Architecture</div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                  Four Pillars of Intelligence
                </span>
              </h2>
            </div>
            <div className="hp-pillars-grid">
              {PILLARS.map(pillar => (
                <div key={pillar.name}
                  className="group relative bg-[#0d1622] rounded-2xl border border-white/10
                              hover:border-cyan-400/40 p-4 sm:p-7 lg:p-8
                              transition-all duration-300 hover:bg-[#101c2e] hover:-translate-y-1
                              hover:shadow-[0_0_35px_rgba(0,200,255,0.15)]">
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl
                                  bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="text-2xl sm:text-4xl mb-2.5 sm:mb-5 text-cyan-400/60 group-hover:text-cyan-300 transition-colors">{pillar.icon}</div>
                  <h3 className="text-sm sm:text-xl font-black text-white mb-1.5 sm:mb-3 group-hover:text-cyan-100 transition-colors">{pillar.name}</h3>
                  <p className="text-[11px] sm:text-sm text-slate-400 leading-relaxed font-semibold">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            5. SOLUTIONS GRID
        ═══════════════════════════════════════════════════════ */}
        <section className="relative bg-[#050810] py-14 sm:py-24 lg:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_20%,rgba(120,40,255,0.08),transparent)] pointer-events-none" />
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-14">
              <div>
                <div className={`${pill} mb-3 sm:mb-5`}>What We Deliver</div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                  Solutions Built for{" "}
                  <span className="block">
                    <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                      Real Business Impact
                    </span>
                  </span>
                </h2>
              </div>
              <Link href="/solutions" className={`${btnGhost} w-full sm:w-auto`}>Explore All Solutions →</Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4">
              {/* Large featured card */}
              <div className="lg:row-span-2 group relative bg-[#0d1622] rounded-2xl border border-cyan-400/20
                               hover:border-cyan-400/50 overflow-hidden
                               hover:shadow-[0_0_55px_rgba(0,200,255,0.2)] flex flex-col
                               transition-all duration-400">
                <div className="w-full h-36 sm:h-56 bg-gradient-to-br from-cyan-900/30 to-blue-900/20
                                 border-b border-cyan-400/10 flex items-center justify-center relative overflow-hidden">
                  <div className="text-slate-700 text-center pointer-events-none select-none">
                    <div className="text-4xl sm:text-5xl mb-2 text-cyan-400/20">🖼</div>
                    <p className="text-xs font-black uppercase tracking-widest">Image / Video Slot</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1622]/80 to-transparent" />
                </div>
                <div className="p-4 sm:p-8 lg:p-10 flex flex-col flex-1">
                  <div className="inline-flex px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-cyan-400/10 border border-cyan-400/15
                                  text-cyan-300 text-[9px] sm:text-xs font-black uppercase tracking-widest mb-2.5 sm:mb-4 self-start">
                    Core Platform
                  </div>
                  <h3 className="text-lg sm:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-4 leading-tight">
                    Adaptive AI Learning Engine
                  </h3>
                  <p className="text-xs sm:text-lg text-slate-300 leading-relaxed mb-4 sm:mb-6 flex-1 font-semibold">
                    Deploy personalised learning paths, knowledge graph management, and
                    real-time skill-gap analysis across your entire organisation.
                    No data science team required.
                  </p>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                    <Link href="/book-demo" className={`${btnCyan} w-full sm:w-auto`}>Book a Demo →</Link>
                    <Link href="/solutions/learning" className={`${btnGhost} w-full sm:w-auto`}>Learn More</Link>
                  </div>
                </div>
              </div>

              {/* 2 smaller cards — sub-grid */}
              <div className="hp-solutions-sub">
                <div className="group relative bg-[#0d1622] rounded-2xl border border-violet-400/20
                                 hover:border-violet-400/50 overflow-hidden
                                 hover:shadow-[0_0_45px_rgba(120,40,255,0.2)] flex flex-col
                                 transition-all duration-400">
                  <div className="hp-solutions-sub-img w-full bg-gradient-to-br from-violet-900/30 to-blue-900/20
                                   border-b border-violet-400/10 flex items-center justify-center relative overflow-hidden">
                    <div className="text-slate-700 text-center pointer-events-none select-none">
                      <div className="text-2xl sm:text-3xl mb-1 text-violet-400/20">🖼</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1622]/80 to-transparent" />
                  </div>
                  <div className="p-3 sm:p-7 flex flex-col flex-1">
                    <div className="inline-flex px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-violet-400/10 border border-violet-400/15
                                    text-violet-300 text-[8px] sm:text-xs font-black uppercase tracking-widest mb-2 sm:mb-3 self-start">
                      Enterprise AI
                    </div>
                    <h3 className="text-xs sm:text-2xl font-black text-white mb-1.5 sm:mb-3 leading-tight">Decision Intelligence Suite</h3>
                    <p className="text-[10px] sm:text-base text-slate-300 leading-relaxed mb-3 sm:mb-5 flex-1 font-semibold">
                      AI-assisted decision support connected directly to your existing data warehouse. Real-time pipelines, no migrations needed.
                    </p>
                    <Link href="/contact" className={`${btnViolet} w-full`}>Get a Quote →</Link>
                  </div>
                </div>

                <div className="group relative bg-[#0d1622] rounded-2xl border border-blue-400/20
                                 hover:border-blue-400/50 overflow-hidden
                                 hover:shadow-[0_0_45px_rgba(60,120,255,0.2)] flex flex-col
                                 transition-all duration-400">
                  <div className="hp-solutions-sub-img w-full bg-gradient-to-br from-blue-900/30 to-cyan-900/20
                                   border-b border-blue-400/10 flex items-center justify-center relative overflow-hidden">
                    <div className="text-slate-700 text-center pointer-events-none select-none">
                      <div className="text-2xl sm:text-3xl mb-1 text-blue-400/20">🖼</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1622]/80 to-transparent" />
                  </div>
                  <div className="p-3 sm:p-7 flex flex-col flex-1">
                    <div className="inline-flex px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-blue-400/10 border border-blue-400/15
                                    text-blue-300 text-[8px] sm:text-xs font-black uppercase tracking-widest mb-2 sm:mb-3 self-start">
                      Developer API
                    </div>
                    <h3 className="text-xs sm:text-2xl font-black text-white mb-1.5 sm:mb-3 leading-tight">Intelligence API & SDK</h3>
                    <p className="text-[10px] sm:text-base text-slate-300 leading-relaxed mb-3 sm:mb-5 flex-1 font-semibold">
                      REST & GraphQL endpoints, model fine-tuning, and webhooks ready for production in under 48 hours.
                    </p>
                    <Link href="/docs" className={`${btnGhost} w-full`}>View Docs →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            6. TESTIMONIALS
        ═══════════════════════════════════════════════════════ */}
        <section className="relative bg-[#080c14] py-14 sm:py-20 lg:py-24 border-y border-white/5">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-6 sm:mb-12">
              <div className={`${pill} mb-3 sm:mb-5 mx-auto`}>Client Results</div>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white">What Our Clients Say</h2>
            </div>
            <div className="hp-testimonials-grid">
              {[
                { quote: "Astralearnia cut our compliance training time by 60% and test scores went up immediately. ROI was clear within 3 months.", name: "Yemi Adeyemi", role: "Chief People Officer, FinCorp Africa", div: "Institute" },
                { quote: "Their API is the cleanest I've integrated in 10 years. Docs are real, endpoints stable, support responds in hours.", name: "Tunde Okonkwo", role: "Lead Engineer, DataStack NG", div: "Technology" },
                { quote: "We replaced three legacy vendors with Astralearnia. One invoice, one team, three times the output.", name: "Amara Osei", role: "CTO, Scale Ventures", div: "Technology" },
              ].map((t, i) => (
                <div key={i} className={`bg-[#0d1622] rounded-2xl border border-white/10 p-3 sm:p-7 lg:p-8
                              hover:border-cyan-400/30 transition-all duration-300 hover:bg-[#101c2e]
                              ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}>
                  <div className={`inline-flex px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[9px] sm:text-xs font-black uppercase tracking-widest mb-2.5 sm:mb-4
                    ${t.div === "Institute" ? "text-violet-300 bg-violet-400/10 border border-violet-400/20"
                      : "text-cyan-300 bg-cyan-400/10 border border-cyan-400/20"}`}>
                    {t.div}
                  </div>
                  <div className="text-lg sm:text-3xl text-white/20 mb-1.5 sm:mb-2 font-serif leading-none">&ldquo;</div>
                  <p className="text-[11px] sm:text-base text-slate-200 leading-relaxed mb-2.5 sm:mb-6 font-semibold italic">{t.quote}</p>
                  <div>
                    <div className="font-black text-white text-[11px] sm:text-sm">{t.name}</div>
                    <div className="text-[9px] sm:text-xs text-slate-500 font-semibold">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            7. BLOG
        ═══════════════════════════════════════════════════════ */}
        <section className="relative bg-[#050810] py-14 sm:py-24 lg:py-32">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-14">
              <div>
                <div className={`${pill} mb-3 sm:mb-5`}>Intelligence Insights</div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                    Signal Intelligence
                  </span>
                </h2>
              </div>
              <Link href="/blog" className="flex items-center gap-2 text-white hover:text-cyan-300 font-black text-sm sm:text-lg transition-colors shrink-0">
                View All →
              </Link>
            </div>
            <div className="hp-blog-grid">
              {BLOG_POSTS.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`}
                  className="group bg-[#0d1622] rounded-2xl border border-white/10
                              hover:border-cyan-400/40 overflow-hidden flex flex-col
                              transition-all duration-300 hover:bg-[#101c2e] hover:-translate-y-1
                              hover:shadow-[0_0_40px_rgba(0,200,255,0.12)]">
                  <div className="w-full aspect-video bg-gradient-to-br from-[#101c2e] to-[#0a0f1a]
                                   border-b border-white/5 flex items-center justify-center relative overflow-hidden">
                    <span className="text-2xl sm:text-7xl opacity-15 group-hover:opacity-25 transition-opacity select-none">{post.emoji}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1622]/70 to-transparent" />
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                      <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-[#050810]/80 border border-white/15
                                       text-white text-[8px] sm:text-xs font-black uppercase tracking-widest">
                        {post.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 sm:p-6 flex flex-col flex-1">
                    <h3 className="text-[11px] sm:text-lg font-black text-white mb-1 sm:mb-3 leading-snug line-clamp-2
                                    group-hover:text-cyan-100 transition-colors">{post.title}</h3>
                    <p className="hidden sm:block text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4 sm:mb-5 flex-1 font-semibold">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-[9px] sm:text-xs text-slate-500 border-t border-white/5 pt-2 sm:pt-4 font-semibold">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            8. FINAL CTA
        ═══════════════════════════════════════════════════════ */}
        <section className="relative bg-[#080c14] py-14 sm:py-24 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,200,255,0.1),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(130,50,255,0.08),transparent)]" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-16">
              <div className={`${pill} mb-4 sm:mb-8 mx-auto`}>Get Started Today</div>
              <h2 className="text-2xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.04] mb-4 sm:mb-8">
                Ready to See What AI{" "}
                <span className="block">
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent
                                   drop-shadow-[0_0_50px_rgba(0,200,255,0.4)]">
                    Can Do for You?
                  </span>
                </span>
              </h2>
              <p className="text-sm sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-semibold">
                Get a personalised demo, talk to our engineers, or explore our divisions —
                no fluff, no commitments.
              </p>
            </div>
            {/* CTA cards — 2-col on mobile, 3-col on md */}
            <div className="hp-cta-grid">
              {[
                { icon: "📅", title: "Book a Demo", body: "See the platform live with your own data. 30-minute focused sessions tailored to your use case.", cta: "Schedule Now →", href: "/book-demo", btn: btnCyan },
                { icon: "📞", title: "Talk to Sales", body: "Speak directly with a solutions engineer about pricing, integrations, and go-live timelines.", cta: "Contact Us →", href: "/contact", btn: btnViolet },
                { icon: "🚀", title: "Free Trial", body: "Try the core platform free for 14 days. No card required. Full feature access from day one.", cta: "Start Free →", href: "/signup", btn: btnGhost },
              ].map((card, i) => (
                <div key={i} className={`bg-[#0d1622] rounded-2xl border-2 border-white/15
                               hover:border-white/30 p-3 sm:p-8 text-center flex flex-col items-center gap-2.5 sm:gap-5
                               transition-all duration-300 hover:bg-[#101c2e] hover:-translate-y-1
                               ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}>
                  <div className="text-2xl sm:text-5xl">{card.icon}</div>
                  <h3 className="text-sm sm:text-2xl font-black text-white">{card.title}</h3>
                  <p className="text-[10px] sm:text-base text-slate-300 leading-relaxed flex-1 font-semibold">{card.body}</p>
                  <Link href={card.href} className={`${card.btn} w-full`}>{card.cta}</Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-8 sm:mt-14">
              <p className="text-slate-500 mb-3 text-xs sm:text-sm font-semibold">Still deciding which division?</p>
              <button onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-3 px-5 sm:px-8 py-3 sm:py-3.5 rounded-xl
                           border border-white/20 hover:border-white/40
                           text-white font-black text-xs sm:text-base tracking-wide
                           hover:bg-white/5 transition-all duration-300 w-full sm:w-auto">
                ✦ Compare Our Two Divisions
              </button>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}