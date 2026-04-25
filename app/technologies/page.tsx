"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─── Fade-in hook ─── */
function useFade(thr = 0.06) {
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
    <div ref={ref} className={cls}
      style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(18px)", transition: `opacity .6s ease ${d}ms,transform .6s ease ${d}ms` }}>
      {children}
    </div>
  );
}

/* ─── Video slot ─── */
function VideoSlot({ color = "#00c8ff", h = 260, title = "Platform Demo", sub = "4 min" }: { color?: string; h?: number; title?: string; sub?: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="hp-video" onClick={() => setOn(p => !p)}
      style={{ position: "relative", width: "100%", borderRadius: 16, overflow: "hidden", cursor: "pointer", height: h, background: "#060e1c", border: `1px solid ${color}1c` }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `linear-gradient(${color} 1px,transparent 1px),linear-gradient(90deg,${color} 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: 48, height: 1, background: `linear-gradient(90deg,${color}55,transparent)` }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: 48, background: `linear-gradient(180deg,${color}55,transparent)` }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 48, height: 1, background: `linear-gradient(270deg,${color}55,transparent)` }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 1, height: 48, background: `linear-gradient(0deg,${color}55,transparent)` }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: `${color}14`, border: `1.5px solid ${color}4a`,
          transition: "transform .3s",
        }}>
          {on
            ? <div style={{ display: "flex", gap: 5 }}>
                <div style={{ width: 5, height: 20, borderRadius: 2, background: color }} />
                <div style={{ width: 5, height: 20, borderRadius: 2, background: color }} />
              </div>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill={color}><path d="M8 5v14l11-7z"/></svg>}
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ margin: 0, color: "#fff", fontWeight: 800, fontSize: "0.85rem" }}>{title}</p>
          <p style={{ margin: "3px 0 0", color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}>{sub}</p>
        </div>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,#060e1c,transparent)", pointerEvents: "none" }} />
      <div style={{
        position: "absolute", top: 12, left: 12,
        display: "flex", alignItems: "center", gap: 6,
        padding: "4px 10px", borderRadius: 20, fontSize: "0.65rem", fontWeight: 800,
        background: "rgba(0,0,0,0.5)", border: `1px solid ${color}28`, color,
      }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, boxShadow: `0 0 5px ${color}` }} />
        WATCH DEMO
      </div>
    </div>
  );
}

/* ─── Data ─── */
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
  { metric: "3.4×",  label: "Faster decisions reported by enterprise clients",       industry: "Financial Services",      color: "#00c8ff" },
  { metric: "91%",   label: "Reduction in manual data processing after automation",  industry: "Logistics & Supply Chain", color: "#00ffb2" },
  { metric: "$2.1M", label: "Average annual cost saving per client post-integration",industry: "Healthcare Tech",          color: "#a855f7" },
];

/* ─── Shared tokens ─── */
const PILL = (label: string) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "4px 12px", borderRadius: 20, marginBottom: 14,
    fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" as const,
    color: "#00c8ff",
    border: "1px solid rgba(0,200,255,0.22)",
    background: "rgba(0,200,255,0.06)",
  }}>{label}</div>
);

export default function TechnologyPage() {
  return (
    <main style={{ background: "#040710", color: "#fff", fontFamily: "sans-serif", overflowX: "hidden" }}>
      <style>{`
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes gpulse  { 0%,100%{opacity:.35} 50%{opacity:1} }
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes beam    { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        .st  { background-size:200% auto; animation:shimmer 5s linear infinite; }
        .gp  { animation:gpulse 2.5s ease-in-out infinite; }
        .fl  { animation:float 4.5s ease-in-out infinite; }

        /* ── Compact service card ── */
        .svc-card {
          background: #0a1220;
          border-radius: 14px;
          padding: 14px;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: transform .25s, box-shadow .25s;
        }
        .svc-card:hover { transform: translateY(-3px); }

        /* ── Mobile-first grid overrides ── */
        .hp-services-grid  { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
        .hp-process-grid   { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
        .hp-results-grid   { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
        .hp-stats-row      { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; }
        .hp-cta-btns       { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; max-width:340px; margin:0 auto; }

        @media (min-width:640px) {
          .hp-services-grid  { grid-template-columns:repeat(3,1fr); gap:12px; }
          .hp-process-grid   { grid-template-columns:repeat(4,1fr); gap:12px; }
          .hp-results-grid   { grid-template-columns:repeat(3,1fr); }
          .hp-stats-row      { display:flex; flex-wrap:wrap; gap:28px; }
          .hp-cta-btns       { display:flex; flex-wrap:wrap; justify-content:center; max-width:none; }
        }
        @media (min-width:1024px) {
          .hp-services-grid { grid-template-columns:repeat(5,1fr); gap:14px; }
        }

        /* Hide desc on mobile, show on sm+ */
        .svc-desc { display:none; }
        @media (min-width:640px) { .svc-desc { display:block; } }

        /* Video height responsive */
        .hp-video { height: 200px !important; }
        @media (min-width:640px) { .hp-video { height: 240px !important; } }
        @media (min-width:1024px){ .hp-video { height: 300px !important; } }
      `}</style>

      {/* ── Fixed bg ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 50% at 50% -5%,rgba(0,180,255,0.1),transparent)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 90% 65%,rgba(59,130,246,0.05),transparent)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.018,
          backgroundImage: "linear-gradient(rgba(0,220,255,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,255,.9) 1px,transparent 1px)",
          backgroundSize: "72px 72px" }} />
      </div>

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 10, paddingTop: "clamp(72px,12vw,120px)", paddingBottom: "clamp(24px,5vw,48px)", padding: "clamp(72px,12vw,120px) clamp(16px,4vw,56px) clamp(24px,5vw,48px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Breadcrumb */}
          <FadeIn>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              <Link href="/" style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.38)", textDecoration: "none" }}>← Home</Link>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "3px 10px", borderRadius: 20,
                fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase",
                border: "1px solid rgba(0,200,255,0.28)", background: "rgba(0,200,255,0.07)", color: "#00c8ff",
              }}>
                <span className="gp" style={{ width: 6, height: 6, borderRadius: "50%", background: "#00c8ff", display: "inline-block" }} />
                Division 01 — Technology
              </span>
            </div>
          </FadeIn>

          {/* Headline */}
          <FadeIn d={60}>
            <h1 style={{
              fontWeight: 900, lineHeight: 0.95,
              letterSpacing: "-0.04em",
              fontSize: "clamp(2.2rem,9vw,7.5rem)",
              maxWidth: 900, marginBottom: "clamp(14px,3vw,24px)",
            }}>
              <span style={{ display: "block", color: "#fff" }}>Enterprise AI</span>
              <span className="st" style={{
                display: "block",
                background: "linear-gradient(90deg,#00c8ff,#3b82f6,#00ffb2,#00c8ff)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>That Actually Ships.</span>
            </h1>
          </FadeIn>

          {/* Sub */}
          <FadeIn d={120}>
            <p style={{
              fontSize: "clamp(0.9rem,2vw,1.15rem)", color: "rgba(255,255,255,0.55)",
              maxWidth: 580, lineHeight: 1.65, fontWeight: 500,
              marginBottom: "clamp(20px,4vw,36px)",
            }}>
              We build, integrate, and operate custom AI systems for businesses ready to move beyond demos — turning your data into working intelligence, fast.
            </p>
          </FadeIn>

          {/* CTAs */}
          <FadeIn d={180}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, maxWidth: 340, marginBottom: "clamp(24px,5vw,44px)" }}
              className="hp-cta-btns-inner">
              <style>{`@media(min-width:480px){.hp-cta-btns-inner{display:flex;flex-wrap:wrap;max-width:none;}}`}</style>
              <Link href="/book-demo" style={{
                padding: "11px 20px", borderRadius: 10,
                fontWeight: 800, color: "#fff", fontSize: "0.875rem",
                textDecoration: "none", textAlign: "center",
                background: "linear-gradient(135deg,#00c8ff,#3b82f6)",
                boxShadow: "0 5px 22px rgba(0,200,255,0.3)",
              }}>Book Technical Demo →</Link>
              <Link href="/contact" style={{
                padding: "11px 20px", borderRadius: 10,
                fontWeight: 700, color: "rgba(255,255,255,0.6)", fontSize: "0.875rem",
                textDecoration: "none", textAlign: "center",
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.02)",
              }}>Talk to an Engineer</Link>
            </div>

            {/* Stats */}
            <div className="hp-stats-row" style={{ paddingTop: "clamp(18px,3vw,32px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {[["< 48h","Avg Deployment","#00c8ff"],["99.9%","API Uptime","#00ffb2"],["200+","Enterprise Clients","#a855f7"],["50M+","Daily API Calls","#fbbf24"]].map(([v,l,c]) => (
                <div key={l}>
                  <div style={{ fontSize: "clamp(1.4rem,4vw,2rem)", fontWeight: 900, color: c, filter: `drop-shadow(0 0 6px ${c}45)` }}>{v}</div>
                  <div style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Hero Video */}
      <section style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,4vw,56px) clamp(32px,6vw,60px)" }}>
        <FadeIn>
          <VideoSlot color="#00c8ff" title="Technology Platform Demo" sub="4 min · Live system walkthrough" />
        </FadeIn>
      </section>

      {/* ════════════════════════════════
          SERVICES
      ════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 10, padding: "clamp(40px,6vw,72px) clamp(16px,4vw,56px)", background: "linear-gradient(180deg,#040710,#070c18 30%,#070c18 70%,#040710)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "clamp(24px,4vw,48px)" }}>
              {PILL("Our Services")}
              <h2 style={{ fontWeight: 900, fontSize: "clamp(1.6rem,4vw,3rem)", color: "#fff", marginBottom: 8, marginTop: 0 }}>What We Build for You</h2>
              <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.875rem", maxWidth: 280, margin: "0 auto", fontWeight: 500 }}>Every engagement custom. Every system production-ready.</p>
            </div>
          </FadeIn>

          <div className="hp-services-grid">
            {SERVICES.map((s, i) => (
              <FadeIn key={s.title} d={i * 35}>
                <div className="svc-card"
                  style={{ border: `1px solid ${s.color}14` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=s.color+"40"; (e.currentTarget as HTMLElement).style.boxShadow=`0 0 24px ${s.color}0d`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor=s.color+"14"; (e.currentTarget as HTMLElement).style.boxShadow="none"; }}>
                  {/* Icon area */}
                  <div style={{
                    width: "100%", height: "clamp(44px,8vw,72px)", borderRadius: 10, marginBottom: 10,
                    display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden",
                    background: `linear-gradient(135deg,${s.color}09,transparent)`,
                    border: `1px solid ${s.color}0f`,
                  }}>
                    <span className="fl" style={{ fontSize: "clamp(1rem,3vw,1.4rem)", position: "relative", zIndex: 1, animationDelay: `${i*0.3}s` }}>{s.icon}</span>
                  </div>
                  <span style={{
                    display: "inline-block", padding: "2px 7px", borderRadius: 5,
                    fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase",
                    background: `${s.color}12`, color: s.color, marginBottom: 7,
                  }}>{s.tag}</span>
                  <h3 style={{ fontSize: "clamp(0.7rem,2vw,0.8rem)", fontWeight: 800, color: "#fff", marginBottom: 4, lineHeight: 1.3 }}>{s.title}</h3>
                  <p className="svc-desc" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.55, fontWeight: 500, flex: 1 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          PROCESS
      ════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 10, padding: "clamp(40px,6vw,72px) clamp(16px,4vw,56px)", background: "#040710" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "clamp(24px,4vw,48px)" }}>
              {PILL("Our Process")}
              <h2 style={{ fontWeight: 900, fontSize: "clamp(1.6rem,4vw,3rem)", color: "#fff", margin: "0 0 0" }}>
                Discovery to{" "}
                <span className="st" style={{ background: "linear-gradient(90deg,#00c8ff,#3b82f6,#00c8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Live in 30 Days
                </span>
              </h2>
            </div>
          </FadeIn>

          <div className="hp-process-grid" style={{ position: "relative" }}>
            {/* Connector line — desktop only */}
            <div style={{
              display: "none", position: "absolute", top: 22, left: "12.5%", right: "12.5%", height: 1,
              background: "linear-gradient(90deg,rgba(0,200,255,0.06),rgba(0,200,255,0.28),rgba(0,200,255,0.06))",
            }} className="hp-connector" />
            <style>{`@media(min-width:640px){.hp-connector{display:block!important;}}`}</style>

            {STEPS.map((s, i) => (
              <FadeIn key={s.n} d={i * 60}>
                <div style={{
                  background: "#0a1220", borderRadius: 14, padding: "clamp(14px,3vw,20px)",
                  border: "1px solid rgba(0,200,255,0.1)", height: "100%",
                  transition: "transform .25s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-3px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform="translateY(0)"; }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.65rem", fontWeight: 800, marginBottom: 10,
                    background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.28)", color: "#00c8ff",
                  }}>{s.n}</div>
                  <div className="fl" style={{ fontSize: "clamp(1rem,3vw,1.25rem)", marginBottom: 6, animationDelay: `${i*0.5}s` }}>{s.icon}</div>
                  <div style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,200,255,0.38)", marginBottom: 4 }}>{s.days}</div>
                  <h3 style={{ fontSize: "0.8rem", fontWeight: 800, color: "#fff", marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.55, fontWeight: 500, margin: 0 }}>{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          RESULTS
      ════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 10, padding: "clamp(40px,6vw,72px) clamp(16px,4vw,56px)", background: "linear-gradient(180deg,#040710,#070c18 40%,#040710)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "clamp(24px,4vw,48px)" }}>
              {PILL("Proof of Work")}
              <h2 style={{ fontWeight: 900, fontSize: "clamp(1.6rem,4vw,3rem)", color: "#fff", margin: 0 }}>Results That Speak</h2>
            </div>
          </FadeIn>

          <div className="hp-results-grid">
            {RESULTS.map((r, i) => (
              <FadeIn key={r.metric} d={i * 55}>
                <div style={{
                  background: "#0a1220", borderRadius: 14,
                  padding: "clamp(16px,3vw,24px)",
                  border: `1px solid ${r.color}14`, height: "100%",
                  gridColumn: i === 2 ? "1 / -1" : "auto",
                  transition: "transform .25s, border-color .25s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=r.color+"38"; (e.currentTarget as HTMLElement).style.transform="translateY(-3px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor=r.color+"14"; (e.currentTarget as HTMLElement).style.transform="translateY(0)"; }}>
                  <div style={{
                    width: "100%", height: "clamp(48px,8vw,80px)", borderRadius: 10, marginBottom: 14,
                    background: `linear-gradient(135deg,${r.color}07,transparent)`,
                    border: `1px solid ${r.color}0f`, position: "relative", overflow: "hidden",
                  }}>
                    <div style={{ position: "absolute", inset: 0, opacity: 0.035,
                      backgroundImage: `radial-gradient(circle,${r.color} 1px,transparent 1px)`, backgroundSize: "18px 18px" }} />
                  </div>
                  <div style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6, color: r.color + "88" }}>{r.industry}</div>
                  <div style={{ fontSize: "clamp(1.6rem,5vw,2.4rem)", fontWeight: 900, color: "#fff", marginBottom: 6, filter: `drop-shadow(0 0 8px ${r.color}28)` }}>{r.metric}</div>
                  <p style={{ fontSize: "clamp(0.72rem,2vw,0.875rem)", color: "rgba(255,255,255,0.48)", lineHeight: 1.55, fontWeight: 500, margin: 0 }}>{r.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CTA
      ════════════════════════════════ */}
      <section style={{ position: "relative", zIndex: 10, padding: "clamp(48px,8vw,96px) clamp(16px,4vw,56px)", textAlign: "center", overflow: "hidden", background: "#040710" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 50% at 50% 50%,rgba(0,200,255,0.06),transparent)", pointerEvents: "none" }} />
        <FadeIn>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(1.7rem,4vw,3rem)", color: "#fff", marginBottom: 14, position: "relative", zIndex: 1 }}>
            Let&apos;s Build Your AI System
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "clamp(0.85rem,2vw,1rem)", maxWidth: 420, margin: "0 auto clamp(20px,4vw,32px)", lineHeight: 1.6, fontWeight: 500, position: "relative", zIndex: 1 }}>
            Book a 30-minute technical discovery call. We&apos;ll tell you exactly what we can build and what it costs — no pressure.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, maxWidth: 340, margin: "0 auto clamp(18px,3vw,28px)", position: "relative", zIndex: 1 }}
            className="hp-cta-final">
            <style>{`@media(min-width:480px){.hp-cta-final{display:flex;justify-content:center;max-width:none;}}`}</style>
            <Link href="/book-demo" style={{
              position: "relative", overflow: "hidden",
              padding: "clamp(11px,2vw,15px) clamp(18px,3vw,30px)",
              borderRadius: 10, fontWeight: 800, color: "#fff",
              fontSize: "0.875rem", textDecoration: "none", textAlign: "center",
              background: "linear-gradient(135deg,#00c8ff,#3b82f6)",
              boxShadow: "0 6px 22px rgba(0,200,255,0.3)",
            }}>
              <span style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.15) 50%,transparent 65%)", animation: "beam 2.8s linear infinite" }} />
              <span style={{ position: "relative", zIndex: 1 }}>Book Technical Demo →</span>
            </Link>
            <Link href="/contact" style={{
              padding: "clamp(11px,2vw,15px) clamp(18px,3vw,30px)",
              borderRadius: 10, fontWeight: 700, color: "rgba(255,255,255,0.55)",
              fontSize: "0.875rem", textDecoration: "none", textAlign: "center",
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.02)",
            }}>Contact an Engineer</Link>
          </div>
          <Link href="/institute" style={{
            fontSize: "0.75rem", color: "rgba(255,255,255,0.25)",
            textDecoration: "underline", textUnderlineOffset: 4,
            fontWeight: 600, position: "relative", zIndex: 1,
          }}>
            Looking for learning solutions? → Visit Institute Division
          </Link>
        </FadeIn>
      </section>
    </main>
  );
}