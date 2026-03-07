"use client";
import { useEffect, useRef, useState } from "react";

const changes = [
  {
    version: "v2.5.0", date: "Mar 3, 2026", type: "Major Release",
    updates: [
      { type: "new",     text: "AstraAPI v2: GraphQL endpoint now GA with real-time subscriptions support" },
      { type: "new",     text: "AstraLearn: AI-generated quiz creation from uploaded content (PDF, video)" },
      { type: "improve", text: "Inference latency reduced from 240ms to 180ms P99 via batching optimisation" },
      { type: "fix",     text: "Fixed webhook delivery failures for EU-region clients under high load" },
    ],
  },
  {
    version: "v2.4.2", date: "Feb 14, 2026", type: "Patch",
    updates: [
      { type: "improve", text: "Dashboard load time improved by 38% for workspaces with 500+ learners" },
      { type: "new",     text: "Added Go SDK v2.3.0 with streaming inference support" },
      { type: "fix",     text: "Skills analytics CSV export now correctly handles multi-byte character names" },
    ],
  },
  {
    version: "v2.4.0", date: "Jan 28, 2026", type: "Feature Release",
    updates: [
      { type: "new",      text: "AstraSkills Beta: Competency framework builder with AI-recommended gap closure paths" },
      { type: "new",      text: "AstraAutomate: Visual pipeline editor with drag-and-drop node configuration" },
      { type: "improve",  text: "Fine-tuning jobs now support multi-GPU distributed training" },
      { type: "deprecate",text: "Legacy /v0/predict endpoint deprecated — migrate to /v1/inference by Apr 2026" },
    ],
  },
  {
    version: "v2.3.0", date: "Jan 7, 2026", type: "Feature Release",
    updates: [
      { type: "new",     text: "Blockchain-verified certificate issuance on AstraCert programme completion" },
      { type: "new",     text: "Salesforce and HubSpot native connectors — no code required" },
      { type: "improve", text: "Model explainability outputs now include feature importance scores" },
    ],
  },
  {
    version: "v2.2.0", date: "Dec 2, 2025", type: "Feature Release",
    updates: [
      { type: "new",     text: "AstraLearn mobile app released on iOS and Android — full parity with web" },
      { type: "new",     text: "Batch inference endpoint: process up to 10,000 records per job" },
      { type: "improve", text: "Notification system redesigned — real-time push for job completions" },
    ],
  },
];

const typeStyle: Record<string, { bg: string; color: string; label: string }> = {
  new:       { bg: "rgba(0,200,255,0.12)",  color: "#00c8ff",  label: "New" },
  improve:   { bg: "rgba(0,255,178,0.12)",  color: "#00ffb2",  label: "Improved" },
  fix:       { bg: "rgba(168,85,247,0.12)", color: "#a855f7",  label: "Fix" },
  deprecate: { bg: "rgba(251,191,36,0.12)", color: "#fbbf24",  label: "Deprecated" },
};

const releaseStyle: Record<string, { color: string; dot: string }> = {
  "Major Release":   { color: "#00c8ff", dot: "#00c8ff" },
  "Feature Release": { color: "#a855f7", dot: "#a855f7" },
  "Patch":           { color: "#00ffb2", dot: "#00ffb2" },
};

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function ChangelogPage() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <main className="bg-[#040710] min-h-screen text-white font-sans antialiased">
      <style>{`
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes ping-once { 0%{transform:scale(1);opacity:1} 80%{transform:scale(1.6);opacity:0} 100%{opacity:0} }
        .shimmer-text { background-size: 200% auto; animation: shimmer 4s linear infinite; }
        .version-badge:hover { transform: translateX(3px); }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 45% at 50% -5%, rgba(0,200,255,0.07), transparent)" }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, rgba(0,200,255,0.9) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-12 px-6 lg:px-14 max-w-screen-xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.18em] mb-7" style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.45)" }}>
                Product Updates
              </div>
            </FadeIn>
            <FadeIn delay={70}>
              <h1 className="font-black leading-[0.95] tracking-[-0.045em] text-[clamp(3.5rem,8vw,6rem)] mb-4">
                <span className="block text-white">What's</span>
                <span className="block shimmer-text" style={{ background: "linear-gradient(90deg,#00c8ff,#7c5cff,#00ffb2,#00c8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  New
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={140}>
              <p className="text-base text-white/50 max-w-md leading-relaxed">Every change, improvement, and fix — documented. We ship fast and we tell you everything.</p>
            </FadeIn>
          </div>
          {/* Subscribe */}
          <FadeIn delay={200}>
            <div className="shrink-0 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", minWidth: 280 }}>
              <p className="text-xs font-black uppercase tracking-wider text-white/50 mb-3">Get Notified</p>
              {subscribed ? (
                <p className="text-sm font-bold text-cyan-400">✓ You're subscribed!</p>
              ) : (
                <div className="flex gap-2">
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 px-3 py-2 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:border-cyan-400/50 transition-colors" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }} />
                  <button onClick={() => email && setSubscribed(true)} className="px-4 py-2 rounded-xl text-xs font-black text-white transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)" }}>
                    Subscribe
                  </button>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Latest banner */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 pb-12">
        <FadeIn>
          <div className="p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ background: "rgba(0,200,255,0.06)", border: "1px solid rgba(0,200,255,0.2)" }}>
            <div className="flex items-center gap-3">
              <div className="relative w-3 h-3 shrink-0">
                <span className="absolute inset-0 rounded-full bg-cyan-400" style={{ animation: "ping-once 2s ease-out infinite" }} />
                <span className="relative block w-3 h-3 rounded-full bg-cyan-400" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-cyan-400">Latest</span>
            </div>
            <div className="flex-1">
              <span className="text-sm font-black text-white">v2.5.0 is out — </span>
              <span className="text-sm text-white/60">GraphQL GA + AI quiz generation now live. Check the full notes below.</span>
            </div>
            <span className="text-xs text-white/30">Mar 3, 2026</span>
          </div>
        </FadeIn>
      </section>

      {/* Changelog timeline */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 pb-24">
        <div className="max-w-3xl">
          <div className="relative">
            <div className="absolute left-[7rem] top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, rgba(0,200,255,0.3), rgba(168,85,247,0.2), transparent)" }} />
            <div className="flex flex-col gap-10">
              {changes.map((release, ri) => {
                const rs = releaseStyle[release.type] || { color: "#fff", dot: "#fff" };
                return (
                  <FadeIn key={release.version} delay={ri * 60}>
                    <div className="flex gap-7">
                      <div className="w-24 shrink-0 text-right pt-0.5">
                        <div className="version-badge inline-block text-xs font-black text-white/80 transition-transform duration-200 cursor-default">{release.version}</div>
                        <div className="text-[10px] text-white/25 mt-1">{release.date}</div>
                        <div className="mt-2 inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: rs.dot }} />
                          <span className="text-[10px] font-black uppercase tracking-wide" style={{ color: rs.color }}>{release.type}</span>
                        </div>
                      </div>
                      <div className="flex-1 pt-0.5">
                        <div className="flex flex-col gap-2.5">
                          {release.updates.map((u, i) => {
                            const ts = typeStyle[u.type];
                            return (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-white/[0.025]" style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wide" style={{ background: ts.bg, color: ts.color }}>{ts.label}</span>
                                <p className="text-sm text-white/65 leading-relaxed">{u.text}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}