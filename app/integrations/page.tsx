"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const categories = [
  { name: "CRM & Sales",               color: "#00c8ff", icon: "💼", integrations: ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM", "Microsoft Dynamics"] },
  { name: "Data & Analytics",          color: "#00ffb2", icon: "📊", integrations: ["Snowflake", "BigQuery", "Redshift", "dbt", "Spark", "Databricks"] },
  { name: "ERP & Finance",             color: "#7c5cff", icon: "⚙️", integrations: ["SAP S/4HANA", "Oracle ERP", "Dynamics 365", "Odoo", "NetSuite"] },
  { name: "LMS & HR",                  color: "#a855f7", icon: "🎓", integrations: ["Moodle", "Canvas", "SuccessFactors", "Workday", "Cornerstone"] },
  { name: "Cloud Infrastructure",      color: "#ff6ec7", icon: "☁️", integrations: ["AWS", "Google Cloud", "Azure", "DigitalOcean", "Cloudflare"] },
  { name: "Messaging & Collaboration", color: "#fbbf24", icon: "💬", integrations: ["Slack", "Teams", "Jira", "Confluence", "Notion"] },
];

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, vis };
}
function Fade({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, vis } = useFadeIn();
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function IntegrationsPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <main className="bg-[#040710] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <style>{`
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .shimmer{background-size:200% auto;animation:shimmer 4s linear infinite}
        .float-icon{animation:float 4s ease-in-out infinite}
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 75% 45% at 50% -5%, rgba(0,200,255,0.08), transparent)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 90% 60%, rgba(0,255,178,0.05), transparent)" }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, rgba(0,200,255,0.9) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-12 px-6 lg:px-14 max-w-screen-xl mx-auto text-center">
        <Fade>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-7"
            style={{ border: "1px solid rgba(0,200,255,0.25)", background: "rgba(0,200,255,0.06)", color: "#00c8ff" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 6px #00c8ff" }} />
            400+ Integrations
          </div>
        </Fade>
        <Fade delay={60}>
          <h1 className="font-black leading-[0.95] tracking-[-0.045em] text-[clamp(3rem,8vw,6.5rem)] max-w-4xl mx-auto mb-5">
            <span className="block text-white">Plug Into Your</span>
            <span className="block shimmer" style={{ background: "linear-gradient(90deg,#00c8ff,#00ffb2,#7c5cff,#00c8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Entire Stack
            </span>
          </h1>
        </Fade>
        <Fade delay={120}>
          <p className="text-base text-white/45 max-w-lg mx-auto leading-relaxed font-light mb-10">
            Astralearnia connects natively to the tools your team already uses. No data migration. No disruption. Just intelligence, added.
          </p>
        </Fade>
        {/* Filter pills */}
        <Fade delay={180}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button onClick={() => setActive(null)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-black transition-all duration-200"
              style={{ background: active === null ? "linear-gradient(135deg,#00c8ff,#7c5cff)" : "rgba(255,255,255,0.04)", border: active === null ? "none" : "1px solid rgba(255,255,255,0.1)", color: "white" }}>
              All
            </button>
            {categories.map(c => (
              <button key={c.name} onClick={() => setActive(active === c.name ? null : c.name)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200"
                style={{ background: active === c.name ? `${c.color}16` : "rgba(255,255,255,0.03)", border: `1px solid ${active === c.name ? c.color + "45" : "rgba(255,255,255,0.09)"}`, color: active === c.name ? c.color : "rgba(255,255,255,0.4)" }}>
                {c.icon} {c.name}
              </button>
            ))}
          </div>
        </Fade>
      </section>

      {/* Integration grid */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.filter(c => active === null || c.name === active).map((cat, i) => (
            <Fade key={cat.name} delay={i * 55}>
              <div className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 group"
                style={{ background: "rgba(255,255,255,0.023)", border: `1px solid ${cat.color}18` }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = cat.color + "45"; (e.currentTarget as HTMLElement).style.background = `${cat.color}06`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = cat.color + "18"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.023)"; }}>
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-lg float-icon" style={{ animationDelay: `${i * 0.4}s` }}>{cat.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: cat.color }}>{cat.name}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.integrations.map(integ => (
                    <span key={integ} className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-white/55 hover:text-white/80 transition-colors cursor-default"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {integ}
                    </span>
                  ))}
                  <span className="px-2.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer hover:opacity-70 transition-opacity" style={{ color: cat.color }}>+more →</span>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* Stats strip */}
      <div className="relative z-10 border-y" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#070b16" }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-14 py-6 grid grid-cols-3 gap-5 text-center">
          {[
            { val: "400+", label: "Native connectors", color: "#00c8ff" },
            { val: "2 wks", label: "Custom build time", color: "#00ffb2" },
            { val: "Zero", label: "Data migration",    color: "#a855f7" },
          ].map((s, i) => (
            <Fade key={s.label} delay={i * 50}>
              <div className="text-2xl font-black mb-0.5" style={{ color: s.color, filter: `drop-shadow(0 0 8px ${s.color}40)` }}>{s.val}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/30">{s.label}</div>
            </Fade>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="relative z-10 py-16 text-center px-6">
        <Fade>
          <h2 className="text-3xl font-black text-white mb-3">Don't See Your Tool?</h2>
          <p className="text-white/40 text-sm max-w-sm mx-auto mb-7">We build custom connectors for enterprise clients. Typical turnaround: 2 weeks.</p>
          <Link href="/contact/technology" className="px-7 py-3.5 rounded-xl font-black text-white inline-flex transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 6px 24px rgba(0,200,255,0.3)" }}>
            Request Custom Integration →
          </Link>
        </Fade>
      </section>
    </main>
  );
}