"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const endpoints = [
  { method: "POST", path: "/v1/inference", desc: "Run a prediction against any deployed model", latency: "~180ms" },
  { method: "GET",  path: "/v1/models",    desc: "List all available and deployed models",    latency: "~40ms" },
  { method: "POST", path: "/v1/train",     desc: "Trigger fine-tuning job on custom dataset", latency: "async" },
  { method: "POST", path: "/v1/pipelines", desc: "Execute a data automation pipeline",        latency: "async" },
  { method: "GET",  path: "/v1/jobs/{id}", desc: "Poll async job status and retrieve output", latency: "~35ms" },
  { method: "POST", path: "/v1/embed",     desc: "Generate vector embeddings for text/docs",  latency: "~95ms" },
];

const sdks = [
  { lang: "Python",  icon: "🐍", install: "pip install astralearnia",         badge: "v2.4.1", color: "#3b82f6" },
  { lang: "Node.js", icon: "⬡",  install: "npm install @astralearnia/sdk",    badge: "v2.4.1", color: "#00ffb2" },
  { lang: "Go",      icon: "◈",  install: "go get astralearnia.com/sdk/go",   badge: "v2.3.0", color: "#00c8ff" },
  { lang: "Java",    icon: "☕",  install: "com.astralearnia:sdk:2.4.0",       badge: "v2.4.0", color: "#fbbf24" },
];

const quickstart = `import astralearnia as astra

# Initialize with your API key
client = astra.Client(api_key="al_live_••••••••••••••••")

# Run an inference
result = client.inference.run(
    model="decision-v3",
    inputs={"user_id": "u_123", "context": "churn risk"},
    options={"explain": True}
)

print(result.prediction)   # "HIGH_RISK"
print(result.confidence)   # 0.91
print(result.explanation)  # "Last login 42 days ago..."`;

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
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(22px)", transition: `opacity 0.62s ease ${delay}ms, transform 0.62s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function ApiDocsPage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("python");

  const copy = () => {
    navigator.clipboard.writeText(quickstart).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <main className="bg-[#040710] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <style>{`
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes slide-in { from{transform:translateX(-8px);opacity:0} to{transform:translateX(0);opacity:1} }
        .shimmer-text { background-size: 200% auto; animation: shimmer 4s linear infinite; }
        .cursor-blink::after { content:'|'; animation: blink 1s step-end infinite; color: #00ffb2; }
        .code-line { animation: slide-in 0.3s ease forwards; }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 45% at 50% -5%, rgba(0,255,178,0.07), transparent)" }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, rgba(0,255,178,0.8) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-14 px-6 lg:px-14 max-w-screen-xl mx-auto">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.18em] mb-7" style={{ border: "1px solid rgba(0,255,178,0.25)", background: "rgba(0,255,178,0.06)", color: "#00ffb2" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: "pulse 2s infinite" }} />
            API v2 · Now GA
          </div>
        </FadeIn>
        <FadeIn delay={70}>
          <h1 className="font-black leading-[0.95] tracking-[-0.045em] text-[clamp(3rem,8vw,6.5rem)] max-w-5xl mb-7">
            <span className="block text-white">Build AI-Powered</span>
            <span className="block shimmer-text" style={{ background: "linear-gradient(90deg,#00ffb2,#00c8ff,#7c5cff,#00ffb2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Products Faster
            </span>
          </h1>
        </FadeIn>
        <FadeIn delay={140}>
          <p className="text-lg text-white/55 max-w-xl leading-relaxed font-light mb-9">
            REST & GraphQL APIs. Sub-200ms inference. SDKs for 4 languages. Built for engineers who want to ship — not configure.
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-wrap gap-3">
            <Link href="/docs" className="px-7 py-3 rounded-xl font-black text-[#040710] text-sm transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#00ffb2,#00c8ff)", boxShadow: "0 6px 24px rgba(0,255,178,0.35)" }}>
              Read Full Docs →
            </Link>
            <Link href="/contact/technology" className="px-7 py-3 rounded-xl font-bold text-white/55 text-sm border border-white/15 hover:border-white/30 hover:text-white transition-all">
              Request API Key
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Stats bar */}
      <div className="relative z-10 border-y" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#070b16" }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-14 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: "< 200ms", label: "P99 inference latency", color: "#00ffb2" },
            { val: "99.95%",  label: "Endpoint uptime SLA",  color: "#00c8ff" },
            { val: "50M+",    label: "API calls per month",  color: "#a855f7" },
            { val: "4",       label: "Official SDK languages", color: "#fbbf24" },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 40}>
              <div className="text-2xl font-black mb-1" style={{ color: s.color, filter: `drop-shadow(0 0 8px ${s.color}40)` }}>{s.val}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/30">{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* API Overview Video */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 py-14">
        <FadeIn>
          <div className="relative rounded-2xl overflow-hidden cursor-pointer group" style={{ border: "1px solid rgba(0,255,178,0.2)", background: "#050e0a", height: 220 }}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/15 to-cyan-900/10" />
            <img src="/api-overview.jpg" alt="API overview" className="w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-500" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div className="absolute inset-0 flex items-center justify-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: "rgba(0,255,178,0.15)", border: "2px solid rgba(0,255,178,0.5)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#00ffb2"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <p className="text-white font-black text-sm">API Integration Walkthrough</p>
                <p className="text-white/35 text-xs">5 min · Zero to first API call</p>
              </div>
            </div>
            <div className="absolute top-3 left-4 px-3 py-1 rounded-full text-[10px] font-black" style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(0,255,178,0.3)", color: "#00ffb2" }}>▶ QUICKSTART VIDEO</div>
          </div>
        </FadeIn>
      </section>

      {/* Main content */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Quickstart code */}
          <FadeIn>
            <h2 className="text-2xl font-black text-white mb-5">5-Minute Quickstart</h2>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,255,178,0.2)" }}>
              <div className="flex items-center justify-between px-5 py-3" style={{ background: "rgba(0,255,178,0.06)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/60" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <span className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="ml-2 text-xs font-bold text-white/40">quickstart.py</span>
                </div>
                <button onClick={copy} className="text-xs font-bold transition-colors" style={{ color: copied ? "#00ffb2" : "rgba(255,255,255,0.3)" }}>
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <pre className="p-5 text-xs leading-relaxed overflow-x-auto" style={{ background: "#030a06", fontFamily: "'Fira Code', 'Cascadia Code', monospace", color: "#6be585" }}>
                <code>{quickstart}</code>
              </pre>
            </div>

            {/* SDKs */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              {sdks.map(sdk => (
                <div key={sdk.lang} className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/[0.03]" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="text-lg">{sdk.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white/80 text-xs">{sdk.lang}</div>
                    <div className="text-[10px] text-white/30 font-mono truncate">{sdk.install}</div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0" style={{ background: "rgba(0,255,178,0.12)", color: "#00ffb2" }}>{sdk.badge}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Endpoints */}
          <FadeIn delay={80}>
            <h2 className="text-2xl font-black text-white mb-5">Core Endpoints</h2>
            <div className="flex flex-col gap-2 mb-7">
              {endpoints.map(ep => (
                <div key={ep.path} className="flex items-center gap-3 p-3.5 rounded-xl transition-all hover:bg-white/[0.03] cursor-default" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="font-black text-[10px] px-2 py-1 rounded-lg shrink-0 w-12 text-center" style={{ background: ep.method === "GET" ? "rgba(0,255,178,0.15)" : "rgba(0,200,255,0.15)", color: ep.method === "GET" ? "#00ffb2" : "#00c8ff" }}>
                    {ep.method}
                  </span>
                  <code className="text-xs text-white/70 font-mono flex-1">{ep.path}</code>
                  <span className="text-[10px] text-white/25 shrink-0 font-mono">{ep.latency}</span>
                </div>
              ))}
            </div>

            {/* Auth */}
            <div className="p-5 rounded-2xl" style={{ background: "rgba(0,255,178,0.05)", border: "1px solid rgba(0,255,178,0.18)" }}>
              <h3 className="font-black text-white text-sm mb-2">Authentication</h3>
              <p className="text-xs text-white/50 mb-3 leading-relaxed">All API requests require a Bearer token in the Authorization header. API keys are scoped per environment (live/test) and per workspace.</p>
              <div className="p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.3)" }}>
                <code className="text-xs font-mono" style={{ color: "#6be585" }}>
                  Authorization: Bearer al_live_••••••••••••••••
                </code>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t py-20 text-center px-6" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#070b16" }}>
        <FadeIn>
          <h2 className="text-4xl font-black text-white mb-3">Ready to Build?</h2>
          <p className="text-white/45 text-base max-w-lg mx-auto mb-7">Get your API key and ship in under 48 hours. Enterprise SLAs and dedicated support available.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact/technology" className="px-8 py-4 rounded-xl font-black text-[#040710] text-sm transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#00ffb2,#00c8ff)", boxShadow: "0 8px 28px rgba(0,255,178,0.35)" }}>
              Get API Access →
            </Link>
            <Link href="/docs" className="px-8 py-4 rounded-xl font-bold text-white/55 text-sm border border-white/15 hover:border-white/30 hover:text-white transition-all">
              Full Documentation
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}