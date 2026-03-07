"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const controls = [
  { icon: "🔒", title: "Encryption at Rest",    desc: "AES-256 for all stored data. Encryption keys managed via AWS KMS with automatic rotation.", color: "#00c8ff" },
  { icon: "🔐", title: "Encryption in Transit",  desc: "TLS 1.3 enforced on all connections. HSTS enabled. Certificate pinning on mobile clients.", color: "#00ffb2" },
  { icon: "🛡️", title: "SOC 2 Type II",          desc: "Annually audited by an independent third party. Report available to enterprise clients under NDA.", color: "#7c5cff" },
  { icon: "⬡",  title: "ISO 27001 Aligned",      desc: "Our ISMS follows ISO 27001 controls. Full certification in progress for Q3 2026.", color: "#a855f7" },
  { icon: "👤", title: "Access Control",          desc: "Role-based access control (RBAC) with least privilege. MFA enforced for all internal systems.", color: "#ff6ec7" },
  { icon: "📋", title: "Penetration Testing",    desc: "Quarterly automated scans + annual manual pen test by Cobalt.io certified testers.", color: "#fbbf24" },
];

const certBadges = [
  { label: "SOC 2 Type II", status: "Certified",    color: "#7c5cff" },
  { label: "GDPR",          status: "Compliant",     color: "#00c8ff" },
  { label: "NDPR",          status: "Compliant",     color: "#00ffb2" },
  { label: "ISO 27001",     status: "In Progress",   color: "#fbbf24" },
  { label: "POPIA",         status: "Compliant",     color: "#ff6ec7" },
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
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.62s ease ${delay}ms, transform 0.62s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function SecurityPage() {
  return (
    <main className="bg-[#040710] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <style>{`
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .shimmer{background-size:200% auto;animation:shimmer 4s linear infinite}
        .float-icon{animation:float 5s ease-in-out infinite}
        @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(0.85)}}
        .pulse-dot{animation:pulse-dot 2.5s ease-in-out infinite}
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 75% 45% at 50% -5%, rgba(0,200,255,0.08), transparent)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 45% 35% at 85% 70%, rgba(124,92,255,0.06), transparent)" }} />
        <div className="absolute inset-0 opacity-[0.022]" style={{ backgroundImage: "radial-gradient(circle, rgba(0,200,255,0.9) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-12 px-6 lg:px-14 max-w-screen-xl mx-auto">
        <Fade>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-7"
            style={{ border: "1px solid rgba(0,200,255,0.25)", background: "rgba(0,200,255,0.06)", color: "#00c8ff" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-dot" />
            Security
          </div>
        </Fade>
        <Fade delay={60}>
          <h1 className="font-black leading-[0.95] tracking-[-0.045em] text-[clamp(3rem,8vw,6.5rem)] max-w-4xl mb-5">
            <span className="block text-white">Security by</span>
            <span className="block shimmer" style={{ background: "linear-gradient(90deg,#00c8ff,#7c5cff,#00ffb2,#00c8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Design
            </span>
          </h1>
        </Fade>
        <Fade delay={120}>
          <p className="text-base text-white/50 max-w-xl leading-relaxed font-light mb-9">
            We treat security as a foundational engineering requirement — not a compliance checkbox. Here's how we protect your data and our systems.
          </p>
        </Fade>

        {/* Cert badges row */}
        <Fade delay={180}>
          <div className="flex flex-wrap gap-2 mb-2">
            {certBadges.map(b => (
              <span key={b.label} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold"
                style={{ background: `${b.color}10`, border: `1px solid ${b.color}30`, color: b.color }}>
                <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: b.color, animationDelay: `${Math.random() * 2}s` }} />
                {b.label} · {b.status}
              </span>
            ))}
          </div>
        </Fade>
      </section>

      {/* Controls grid */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {controls.map((c, i) => (
            <Fade key={c.title} delay={i * 55}>
              <div className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group"
                style={{ background: "rgba(255,255,255,0.023)", border: `1px solid ${c.color}18` }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = c.color + "45"; (e.currentTarget as HTMLElement).style.background = `${c.color}06`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = c.color + "18"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.023)"; }}>
                <span className="text-2xl float-icon mb-3 block" style={{ animationDelay: `${i * 0.45}s` }}>{c.icon}</span>
                <h3 className="text-base font-black text-white mb-2">{c.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{c.desc}</p>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* Responsible disclosure + SOC request */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 pb-20">
        <Fade>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl" style={{ background: "rgba(0,200,255,0.05)", border: "1px solid rgba(0,200,255,0.2)" }}>
              <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-3">Responsible Disclosure</div>
              <h2 className="text-lg font-black text-white mb-3">Found a Vulnerability?</h2>
              <p className="text-sm text-white/50 leading-relaxed mb-4">
                Report it to{" "}
                <a href="mailto:security@astralearnia.com" className="text-cyan-400 hover:text-cyan-300 transition-colors font-bold">security@astralearnia.com</a>
                {" "}before public disclosure. We acknowledge within 24 hours and resolve critical issues within 14 days. We do not take legal action against good-faith researchers.
              </p>
              <div className="flex gap-4 text-xs text-white/35">
                <span>⏱ 24h acknowledgement</span>
                <span>🔧 14-day critical SLA</span>
              </div>
            </div>
            <div className="p-6 rounded-2xl" style={{ background: "rgba(124,92,255,0.05)", border: "1px solid rgba(124,92,255,0.2)" }}>
              <div className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-3">Security Reports</div>
              <h2 className="text-lg font-black text-white mb-3">Request Our SOC 2 Report</h2>
              <p className="text-sm text-white/50 leading-relaxed mb-5">
                Qualified enterprise prospects can request our full SOC 2 Type II report, penetration testing summary, and GDPR DPA template — available under NDA.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-black text-violet-400 hover:text-violet-300 transition-colors">
                Request Access →
              </Link>
            </div>
          </div>
        </Fade>
      </section>
    </main>
  );
}