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

function VideoSlot({ color = "#00c8ff", h = 300, title = "Platform Demo", sub = "4 min" }: { color?: string; h?: number; title?: string; sub?: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative w-full rounded-2xl overflow-hidden cursor-pointer group" style={{ height: h, background: "#060e1c", border: `1px solid ${color}1c` }} onClick={() => setOn(p => !p)}>
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(${color} 1px,transparent 1px),linear-gradient(90deg,${color} 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%,${color}0d,transparent)` }} />
      {/* corner accents — no full-width lines */}
      <div className="absolute top-0 left-0 w-14 h-px" style={{ background: `linear-gradient(90deg,${color}55,transparent)` }} />
      <div className="absolute top-0 left-0 w-px h-14" style={{ background: `linear-gradient(180deg,${color}55,transparent)` }} />
      <div className="absolute bottom-0 right-0 w-14 h-px" style={{ background: `linear-gradient(270deg,${color}55,transparent)` }} />
      <div className="absolute bottom-0 right-0 w-px h-14" style={{ background: `linear-gradient(0deg,${color}55,transparent)` }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `${color}1c`, filter: "blur(18px)", transform: "scale(2.2)" }} />
          <div className="relative w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: `${color}14`, border: `1.5px solid ${color}4a` }}>
            {on
              ? <div className="flex gap-1.5"><div className="w-1.5 h-5 rounded-sm" style={{ background: color }} /><div className="w-1.5 h-5 rounded-sm" style={{ background: color }} /></div>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill={color}><path d="M8 5v14l11-7z" /></svg>
            }
          </div>
        </div>
        <div className="text-center">
          <p className="text-white font-black text-sm">{title}</p>
          <p className="text-white/30 text-xs mt-0.5">{sub}</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#060e1c] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black" style={{ background: "rgba(0,0,0,0.5)", border: `1px solid ${color}28`, color }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 5px ${color}` }} />WATCH DEMO
      </div>
    </div>
  );
}

const SERVICES = [
  { icon: "🧠", title: "Custom AI Model Development",  desc: "Fine-tuned LLMs, classification models, vision systems, and recommendation engines trained on your proprietary data.", tag: "Core",          color: "#00c8ff" },
  { icon: "⚡", title: "Intelligence API Platform",    desc: "REST & GraphQL endpoints with sub-100ms response times, token-level streaming, and enterprise-grade auth built in.", tag: "Developer",      color: "#00ffb2" },
  { icon: "🔄", title: "Data Pipeline Automation",     desc: "Ingestion, transformation, and real-time enrichment pipelines connecting your warehouse to your AI layer without friction.", tag: "Infrastructure", color: "#7c5cff" },
  { icon: "📊", title: "Decision Intelligence Suite",  desc: "AI-guided dashboards and alert systems that surface the right information exactly when decisions need to happen.", tag: "Analytics",      color: "#3b82f6" },
  { icon: "🔗", title: "Enterprise Integrations",      desc: "Native connectors for Salesforce, SAP, Microsoft 365, Slack, and 400+ enterprise platforms — no middleware required.", tag: "Integration",   color: "#a855f7" },
  { icon: "🛡️", title: "AI Governance & Security",    desc: "Model auditing, bias detection, data privacy controls, and compliance frameworks for regulated industries.", tag: "Compliance",    color: "#fbbf24" },
  { icon: "🤖", title: "Robotics & Automation",        desc: "AI-driven robotics systems, autonomous process control, and intelligent sensor fusion for industrial and enterprise automation.", tag: "Robotics",      color: "#00e5ff" },
  { icon: "🔒", title: "Cybersecurity AI",             desc: "Threat intelligence, anomaly detection, zero-day prediction, and automated incident response powered by machine learning.", tag: "Security",      color: "#ff4d6d" },
  { icon: "⬡",  title: "Embedded AI Systems",         desc: "Edge AI deployment, microcontroller ML inference, RTOS integration, and optimised C/C++ AI pipelines for constrained hardware.", tag: "Embedded",      color: "#06d6a0" },
  { icon: "⛓️", title: "Blockchain Intelligence",      desc: "Smart contract analytics, on-chain ML models, decentralised AI oracles, and Web3 data pipelines for blockchain-native applications.", tag: "Web3",          color: "#f9c74f" },
];

const STEPS = [
  { n: "01", icon: "🔍", title: "Discovery Call",      body: "We map your data, pain points, and success metrics in a focused 1-hour session.", days: "Day 1" },
  { n: "02", icon: "🏗️", title: "Architecture Design", body: "Our engineers design a custom AI system scoped to your exact requirements — no templates.", days: "Days 2–5" },
  { n: "03", icon: "⚙️", title: "Build & Integrate",   body: "We build, test, and connect your system to production infrastructure with zero disruption.", days: "Days 6–25" },
  { n: "04", icon: "🚀", title: "Go Live & Monitor",   body: "Your system ships with full monitoring, alerting, and ongoing optimisation included.", days: "Day 30" },
];

const RESULTS = [
  { metric: "3.4×",  label: "Faster decisions reported by enterprise clients",    industry: "Financial Services",    color: "#00c8ff" },
  { metric: "91%",   label: "Reduction in manual data processing after automation", industry: "Logistics & Supply Chain", color: "#00ffb2" },
  { metric: "$2.1M", label: "Average annual cost saving per client post-integration", industry: "Healthcare Tech",        color: "#a855f7" },
];

export default function TechnologyPage() {
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
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 55% at 50% -8%,rgba(0,180,255,0.11),transparent)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 40% at 90% 65%,rgba(59,130,246,0.06),transparent)" }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(0,220,255,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,255,.9) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 pt-32 pb-12 px-6 lg:px-14 max-w-screen-xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-7">
            <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">← Home</Link>
            <span className="text-white/15">/</span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
              style={{ border: "1px solid rgba(0,200,255,0.28)", background: "rgba(0,200,255,0.07)", color: "#00c8ff" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 gp" />Division 01 — Technology
            </span>
          </div>
        </FadeIn>
        <FadeIn d={60}>
          <h1 className="font-black leading-[0.93] tracking-[-0.045em] text-[clamp(3rem,9vw,8rem)] max-w-5xl mb-6">
            <span className="block text-white">Enterprise AI</span>
            <span className="block st" style={{ background: "linear-gradient(90deg,#00c8ff,#3b82f6,#00ffb2,#00c8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              That Actually Ships.
            </span>
          </h1>
        </FadeIn>
        <FadeIn d={130}>
          <p className="text-xl text-white/50 max-w-2xl leading-relaxed mb-9 font-light">
            We build, integrate, and operate custom AI systems for businesses ready to move beyond demos — turning your data into working intelligence, fast.
          </p>
        </FadeIn>
        <FadeIn d={200}>
          <div className="flex flex-wrap gap-3 mb-12">
            <Link href="/book-demo" className="px-7 py-3.5 rounded-xl font-black text-white text-sm hover:-translate-y-0.5 transition-all"
              style={{ background: "linear-gradient(135deg,#00c8ff,#3b82f6)", boxShadow: "0 6px 28px rgba(0,200,255,0.32)" }}>
              Book Technical Demo →
            </Link>
            <Link href="/contact" className="px-7 py-3.5 rounded-xl font-bold text-white/50 text-sm hover:text-white hover:border-white/30 transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
              Talk to an Engineer
            </Link>
          </div>
          {/* Stats — soft inset glow instead of a hard border line */}
          <div className="flex flex-wrap gap-10 pt-9" style={{ background: "linear-gradient(180deg,transparent,rgba(0,200,255,0.025) 50%,transparent)", paddingLeft: "0.5rem", borderRadius: 12 }}>
            {[["< 48h","Avg Deployment","#00c8ff"],["99.9%","API Uptime","#00ffb2"],["200+","Enterprise Clients","#a855f7"],["50M+","Daily API Calls","#fbbf24"]].map(([v,l,c])=>(
              <div key={l}>
                <div className="text-3xl font-black" style={{ color: c, filter: `drop-shadow(0 0 8px ${c}45)` }}>{v}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/28 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Hero Video */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 pb-20">
        <FadeIn><VideoSlot color="#00c8ff" h={320} title="Technology Platform Demo" sub="4 min · Live system walkthrough" /></FadeIn>
      </section>

      {/* ── SERVICES (10 cards) ── */}
      <section className="relative z-10 px-6 lg:px-14" style={{ paddingTop: 80, paddingBottom: 80, background: "linear-gradient(180deg,#040710,#070c18 30%,#070c18 70%,#040710)" }}>
        <div className="max-w-screen-xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
                style={{ border: "1px solid rgba(0,200,255,0.25)", background: "rgba(0,200,255,0.07)", color: "#00c8ff" }}>Our Services</div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">What We Build for You</h2>
              <p className="text-white/38 text-sm max-w-sm mx-auto">Every engagement custom. Every system production-ready.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {SERVICES.map((s, i) => (
              <FadeIn key={s.title} d={i * 40}>
                <div className="rounded-2xl p-5 h-full flex flex-col transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "#0a1220", border: `1px solid ${s.color}14` }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=s.color+"45";(e.currentTarget as HTMLElement).style.boxShadow=`0 0 30px ${s.color}10`;}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=s.color+"14";(e.currentTarget as HTMLElement).style.boxShadow="none";}}>
                  <div className="w-full h-20 rounded-xl mb-3.5 flex items-center justify-center relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg,${s.color}09,transparent)`, border: `1px solid ${s.color}10` }}>
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle,${s.color} 1px,transparent 1px)`, backgroundSize: "14px 14px" }} />
                    <span className="text-2xl fl relative z-10" style={{ animationDelay: `${i*0.3}s` }}>{s.icon}</span>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest mb-2"
                    style={{ background: `${s.color}12`, color: s.color }}>{s.tag}</span>
                  <h3 className="text-[13px] font-black text-white mb-1.5 leading-tight">{s.title}</h3>
                  <p className="text-[11px] text-white/38 leading-relaxed flex-1">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="relative z-10 px-6 lg:px-14" style={{ paddingTop: 80, paddingBottom: 80, background: "#040710" }}>
        <div className="max-w-screen-xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
                style={{ border: "1px solid rgba(0,200,255,0.25)", background: "rgba(0,200,255,0.07)", color: "#00c8ff" }}>Our Process</div>
              <h2 className="text-4xl sm:text-5xl font-black text-white">
                Discovery to{" "}
                <span className="st" style={{ background: "linear-gradient(90deg,#00c8ff,#3b82f6,#00c8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Live in 30 Days</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            <div className="hidden lg:block absolute top-7 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-px"
              style={{ background: "linear-gradient(90deg,rgba(0,200,255,0.08),rgba(0,200,255,0.35),rgba(0,200,255,0.08))" }} />
            {STEPS.map((s,i)=>(
              <FadeIn key={s.n} d={i*70}>
                <div className="rounded-2xl p-5 h-full transition-all duration-300 hover:-translate-y-1" style={{ background: "#0a1220", border: "1px solid rgba(0,200,255,0.1)" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black mb-4"
                    style={{ background: "rgba(0,200,255,0.12)", border: "1px solid rgba(0,200,255,0.3)", color: "#00c8ff" }}>{s.n}</div>
                  <div className="text-xl mb-2.5 fl" style={{ animationDelay: `${i*0.5}s` }}>{s.icon}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400/40 mb-1">{s.days}</div>
                  <h3 className="text-sm font-black text-white mb-1.5">{s.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="relative z-10 px-6 lg:px-14" style={{ paddingTop: 80, paddingBottom: 80, background: "linear-gradient(180deg,#040710,#070c18 40%,#040710)" }}>
        <div className="max-w-screen-xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
                style={{ border: "1px solid rgba(0,200,255,0.25)", background: "rgba(0,200,255,0.07)", color: "#00c8ff" }}>Proof of Work</div>
              <h2 className="text-4xl sm:text-5xl font-black text-white">Results That Speak</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {RESULTS.map((r,i)=>(
              <FadeIn key={r.metric} d={i*65}>
                <div className="rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "#0a1220", border: `1px solid ${r.color}14` }}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor=r.color+"40"}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor=r.color+"14"}>
                  <div className="w-full h-24 rounded-xl mb-5 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg,${r.color}08,transparent)`, border: `1px solid ${r.color}0f` }}>
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle,${r.color} 1px,transparent 1px)`, backgroundSize: "18px 18px" }} />
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: r.color + "88" }}>{r.industry}</div>
                  <div className="text-4xl font-black text-white mb-2" style={{ filter: `drop-shadow(0 0 10px ${r.color}30)` }}>{r.metric}</div>
                  <p className="text-sm text-white/48 leading-relaxed">{r.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-24 px-6 text-center overflow-hidden" style={{ background: "#040710" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 50%,rgba(0,200,255,0.07),transparent)" }} />
        <FadeIn>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 relative z-10">Let's Build Your AI System</h2>
          <p className="text-white/40 text-base max-w-md mx-auto mb-8 relative z-10">Book a 30-minute technical discovery call. We'll tell you exactly what we can build and what it costs — no pressure.</p>
          <div className="flex flex-wrap justify-center gap-3 relative z-10">
            <Link href="/book-demo" className="px-8 py-4 rounded-xl font-black text-white text-sm hover:-translate-y-0.5 transition-all"
              style={{ background: "linear-gradient(135deg,#00c8ff,#3b82f6)", boxShadow: "0 8px 26px rgba(0,200,255,0.3)" }}>Book Technical Demo →</Link>
            <Link href="/contact" className="px-8 py-4 rounded-xl font-bold text-white/50 text-sm hover:text-white hover:border-white/30 transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}>Contact an Engineer</Link>
          </div>
          <div className="mt-8 relative z-10">
            <Link href="/divisions/institute" className="text-xs text-white/22 hover:text-white/50 transition-colors underline underline-offset-4">
              Looking for learning solutions? → Visit Institute Division
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}