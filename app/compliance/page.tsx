"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const frameworks = [
  { name: "GDPR",         region: "European Union", status: "Compliant",    color: "#00c8ff", icon: "🇪🇺", desc: "Full compliance including DPA templates, data residency options, and DPO designation for EU clients." },
  { name: "NDPR",         region: "Nigeria",         status: "Compliant",    color: "#00ffb2", icon: "🇳🇬", desc: "Nigeria Data Protection Regulation compliance. In-country data storage available on enterprise plans." },
  { name: "SOC 2 Type II",region: "Global",          status: "Certified",    color: "#a855f7", icon: "🛡️", desc: "Annual SOC 2 audit across Security, Availability, and Confidentiality trust service criteria." },
  { name: "ISO 27001",    region: "Global",          status: "In Progress",  color: "#fbbf24", icon: "📋", desc: "ISMS fully aligned to ISO 27001 standard. Full certification targeted Q3 2026." },
  { name: "POPIA",        region: "South Africa",    status: "Compliant",    color: "#ff6ec7", icon: "🇿🇦", desc: "Protection of Personal Information Act compliance for South African data subjects." },
  { name: "HIPAA Ready",  region: "Healthcare",      status: "On Request",   color: "#7c5cff", icon: "⚕️", desc: "HIPAA-aligned data handling available for healthcare sector enterprise agreements." },
];

const principles = [
  { icon: "🔐", title: "Encryption Everywhere",  desc: "AES-256 at rest, TLS 1.3 in transit. No exceptions.",                         color: "#00c8ff" },
  { icon: "🗂️", title: "Data Residency",          desc: "Choose where your data lives — Nigeria, EU, or US regions.",                   color: "#00ffb2" },
  { icon: "👁️", title: "Audit Logs",              desc: "Every API call, model run, and data access is logged and searchable.",         color: "#a855f7" },
  { icon: "🗑️", title: "Right to Erasure",        desc: "Data deletion executed within 30 days. Verifiable confirmation provided.",      color: "#ff6ec7" },
];

function useFade(thr = 0.1) {
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
    <div ref={ref} className={cls} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: `opacity .62s ease ${d}ms,transform .62s ease ${d}ms` }}>
      {children}
    </div>
  );
}

export default function CompliancePage() {
  return (
    <main className="bg-[#040710] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <style>{`
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes gpulse{0%,100%{opacity:.35}50%{opacity:1}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        .st{background-size:200% auto;animation:shimmer 4s linear infinite}
        .gp{animation:gpulse 2.5s ease-in-out infinite}
        .fl{animation:float 4s ease-in-out infinite}
      `}</style>

      {/* Fixed background — no hard section lines */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 75% 45% at 50% -5%,rgba(0,200,255,0.09),transparent)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 35% at 85% 75%,rgba(124,92,255,0.06),transparent)" }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle,rgba(0,200,255,0.9) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 pt-32 pb-12 px-6 lg:px-14 max-w-screen-xl mx-auto">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-7"
            style={{ border: "1px solid rgba(0,200,255,0.25)", background: "rgba(0,200,255,0.06)", color: "#00c8ff" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 gp" />Compliance & Security
          </div>
        </FadeIn>
        <FadeIn d={60}>
          <h1 className="font-black leading-[0.95] tracking-[-0.045em] text-[clamp(2.8rem,7vw,6rem)] max-w-4xl mb-5">
            <span className="block text-white">Built to Meet Your</span>
            <span className="block st" style={{ background: "linear-gradient(90deg,#00c8ff,#7c5cff,#00ffb2,#00c8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Regulatory Requirements
            </span>
          </h1>
        </FadeIn>
        <FadeIn d={120}>
          <p className="text-lg text-white/50 max-w-xl leading-relaxed font-light mb-9">
            Whether you operate in Lagos, London, or Johannesburg — Astralearnia's compliance posture is built to travel with you across every jurisdiction.
          </p>
        </FadeIn>
        {/* Trust badges */}
        <FadeIn d={180}>
          <div className="flex flex-wrap gap-2.5">
            {["SOC 2 Certified","GDPR Ready","NDPR Compliant","End-to-End Encrypted","99.9% Uptime"].map(b => (
              <span key={b} className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white/55"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>{b}</span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── PRINCIPLES BAND — no harsh border-y ── */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 py-6">
        <FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.065)" }}>
            {principles.map((p,i) => (
              <div key={p.title} className="flex items-start gap-3">
                <span className="text-xl fl shrink-0" style={{ animationDelay: `${i*0.5}s` }}>{p.icon}</span>
                <div>
                  <div className="text-xs font-black text-white mb-0.5">{p.title}</div>
                  <div className="text-[11px] text-white/38 leading-relaxed">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── FRAMEWORK GRID ── */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 py-12">
        <FadeIn>
          <h2 className="text-2xl font-black text-white mb-8">Compliance Frameworks</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {frameworks.map((f,i) => (
            <FadeIn key={f.name} d={i*50}>
              <div className="p-6 rounded-2xl h-full transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${f.color}1c` }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=f.color+"45";(e.currentTarget as HTMLElement).style.background=`${f.color}06`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=f.color+"1c";(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.025)";}}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl fl" style={{ animationDelay: `${i*0.4}s` }}>{f.icon}</span>
                    <div>
                      <h3 className="text-lg font-black text-white leading-none">{f.name}</h3>
                      <div className="text-[11px] text-white/35 mt-0.5">{f.region}</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0"
                    style={{ background: `${f.color}14`, border: `1px solid ${f.color}2a`, color: f.color }}>
                    {f.status}
                  </span>
                </div>
                <p className="text-sm text-white/48 leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── ENTERPRISE + REPORTS ── */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 pb-20">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl" style={{ background: "rgba(0,200,255,0.05)", border: "1px solid rgba(0,200,255,0.18)" }}>
              <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-3">Enterprise Compliance</div>
              <h2 className="text-lg font-black text-white mb-3">Dedicated Compliance Support</h2>
              <p className="text-sm text-white/50 leading-relaxed mb-5">
                Enterprise clients receive a dedicated compliance liaison, DPA agreements, custom data residency configuration, and full documentation packages for internal audits.
              </p>
              <a href="mailto:compliance@astralearnia.com" className="inline-flex items-center gap-1.5 text-sm font-black text-cyan-400 hover:text-cyan-300 transition-colors">
                compliance@astralearnia.com →
              </a>
            </div>
            <div className="p-6 rounded-2xl" style={{ background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.18)" }}>
              <div className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-3">Security Reports</div>
              <h2 className="text-lg font-black text-white mb-3">Download Our SOC 2 Report</h2>
              <p className="text-sm text-white/50 leading-relaxed mb-5">
                Qualified enterprise prospects can request our full SOC 2 Type II report, penetration testing summary, and GDPR DPA template under NDA.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-black text-violet-400 hover:text-violet-300 transition-colors">
                Request Access →
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}