"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useFade() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.08 });
    o.observe(el); return () => o.disconnect();
  }, []);
  return { ref, v };
}
function FadeIn({ children, d = 0, cls = "" }: { children: React.ReactNode; d?: number; cls?: string }) {
  const { ref, v } = useFade();
  return <div ref={ref} className={cls} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(18px)", transition: `opacity .55s ease ${d}ms,transform .55s ease ${d}ms` }}>{children}</div>;
}

const SECTIONS = [
  { icon: "🚀", title: "Quick Start", desc: "Get from zero to your first API call in 10 minutes.", links: ["Authentication","Your first inference","SDK setup","Sample projects"], color: "#00ffb2", href: "#quickstart" },
  { icon: "</>", title: "API Reference", desc: "Full REST and GraphQL endpoint documentation.", links: ["/v1/inference","/v1/models","/v1/train","/v1/pipelines"], color: "#00c8ff", href: "/api-docs" },
  { icon: "◈", title: "Platform Guides", desc: "Deep-dive guides for every Astralearnia product.", links: ["AstraCore setup","Pipeline builder","Model fine-tuning","Webhooks & events"], color: "#7c5cff", href: "#guides" },
  { icon: "🎓", title: "Institute SDK", desc: "Embed adaptive learning into your LMS or application.", links: ["LMS Integration","xAPI & SCORM","Skills analytics API","Certification webhooks"], color: "#a855f7", href: "#institute" },
  { icon: "⬡", title: "Integrations", desc: "Connect Astralearnia to your existing tools.", links: ["Salesforce","HubSpot","SAP","Moodle"], color: "#ff6ec7", href: "/integrations" },
  { icon: "🔒", title: "Security & Compliance", desc: "SOC 2, GDPR, ISO 27001, and data handling.", links: ["Data residency","Encryption at rest","Audit logs","GDPR guide"], color: "#fbbf24", href: "/security" },
];

const POPULAR = [
  { label: "Authentication guide", path: "/docs/auth", color: "#00c8ff" },
  { label: "Run your first inference", path: "/docs/quickstart", color: "#00ffb2" },
  { label: "Fine-tuning walkthrough", path: "/docs/fine-tuning", color: "#7c5cff" },
  { label: "Webhook setup", path: "/docs/webhooks", color: "#a855f7" },
];

export default function DocsPage() {
  const [query, setQuery] = useState("");

  return (
    <main className="bg-[#040710] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <style>{`
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes gpulse{0%,100%{opacity:.35}50%{opacity:1}}
        .st{background-size:200% auto;animation:shimmer 5s linear infinite;}
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(0,255,178,0.07),transparent)" }} />
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: "radial-gradient(circle,rgba(0,200,255,.8) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-12 px-6 lg:px-14 max-w-screen-xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1">
            <FadeIn>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.18em] mb-7" style={{ border: "1px solid rgba(0,255,178,0.25)", background: "rgba(0,255,178,0.06)", color: "#00ffb2" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: "gpulse 2.5s ease-in-out infinite" }} />Documentation
              </span>
            </FadeIn>
            <FadeIn d={60}>
              <h1 className="font-black leading-[0.93] tracking-[-0.045em] text-[clamp(2.8rem,7vw,6rem)] max-w-3xl mb-5">
                <span className="block text-white">Everything You</span>
                <span className="block st" style={{ background: "linear-gradient(90deg,#00ffb2,#00c8ff,#00ffb2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Need to Build</span>
              </h1>
            </FadeIn>
            <FadeIn d={120}>
              <p className="text-base text-white/50 max-w-md leading-relaxed">Guides, references, and examples for the full Astralearnia platform.</p>
            </FadeIn>
          </div>

          {/* Search */}
          <FadeIn d={140} cls="lg:w-80 w-full shrink-0">
            <div className="rounded-2xl p-1" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search docs…" className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none" />
                <span className="text-[10px] text-white/18 font-bold border border-white/10 px-1.5 py-0.5 rounded">⌘K</span>
              </div>
              {/* Popular */}
              <div className="px-4 pt-3 pb-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/25 mb-2">Popular</p>
                <div className="flex flex-col gap-1">
                  {POPULAR.map(p=>(
                    <Link key={p.label} href={p.path} className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors py-1">
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ background: p.color }} />{p.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Cards */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.map((s,i)=>(
            <FadeIn key={s.title} d={i*50}>
              <Link href={s.href}
                className="flex flex-col p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 h-full"
                style={{ background: "#0d1622", border: `1px solid ${s.color}18` }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=s.color+"40";(e.currentTarget as HTMLElement).style.boxShadow=`0 0 36px ${s.color}10`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=s.color+"18";(e.currentTarget as HTMLElement).style.boxShadow="none";}}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4" style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}>
                  {s.icon}
                </div>
                <h2 className="text-base font-black text-white mb-1.5">{s.title}</h2>
                <p className="text-xs text-white/45 mb-5 leading-relaxed flex-1">{s.desc}</p>
                <div className="flex flex-col gap-1.5 pt-4" style={{ borderTop: `1px solid ${s.color}12` }}>
                  {s.links.map(l=>(
                    <div key={l} className="flex items-center gap-2 text-[11px] text-white/40 hover:text-white/65 transition-colors">
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ background: s.color }} />
                      <code className="font-mono">{l}</code>
                    </div>
                  ))}
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Bottom banner */}
        <FadeIn d={300} cls="mt-8">
          <div className="p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-5" style={{ background: "rgba(0,255,178,0.04)", border: "1px solid rgba(0,255,178,0.15)" }}>
            <div className="flex-1">
              <h3 className="text-base font-black text-white mb-1">Need help getting started?</h3>
              <p className="text-xs text-white/45">Join our developer Discord or book a technical onboarding call.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link href="/contact/technology" className="px-5 py-2.5 rounded-xl font-black text-[#040710] text-xs transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#00ffb2,#00c8ff)" }}>Get API Key →</Link>
              <Link href="/discord" className="px-5 py-2.5 rounded-xl font-bold text-white/55 text-xs border border-white/12 hover:border-white/25 hover:text-white transition-all">Join Discord</Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}