"use client";
// ─────────────────────────────────────────────────────────────────
// FILE: app/privacy/page.tsx
// Redesigned with compact glassmorphism section cards
// ─────────────────────────────────────────────────────────────────

import Link from "next/link";

const SECTIONS = [
  {
    icon: "📥",
    heading: "Information We Collect",
    accent: "#00c8ff",
    items: [
      "Name, email, organisation & usage data you provide directly",
      "Log data, device info & cookies collected automatically",
      "Data from third-party services you connect to our platform",
    ],
  },
  {
    icon: "⚙️",
    heading: "How We Use Your Information",
    accent: "#7c5cff",
    items: [
      "Provide, maintain & improve our services",
      "Process transactions & detect fraud",
      "Comply with legal obligations",
      "Send marketing comms with your explicit consent",
    ],
  },
  {
    icon: "🔁",
    heading: "Data Sharing",
    accent: "#00c8ff",
    items: [
      "We never sell your personal data",
      "Service providers process on our behalf under GDPR contracts",
      "Disclosed only with your consent or where required by law",
    ],
  },
  {
    icon: "🗓",
    heading: "Data Retention",
    accent: "#a855f7",
    items: [
      "Retained only as long as needed to provide services",
      "Enterprise data per contract terms",
      "Request deletion any time: privacy@astralearnia.com",
    ],
  },
  {
    icon: "⚖️",
    heading: "Your Rights (GDPR)",
    accent: "#00c8ff",
    items: [
      "Access, correct, delete or restrict your data",
      "Port your data to another provider",
      "Withdraw consent at any time",
      "We respond within 30 days of any request",
    ],
  },
  {
    icon: "🔐",
    heading: "Data Security",
    accent: "#22d3a5",
    items: [
      "AES-256 encryption at rest · TLS 1.3 in transit",
      "Regular penetration testing & SOC 2 Type II compliance",
      "Role-based access controls & incident response plan",
      "Breach notification within 72 hours",
    ],
  },
  {
    icon: "🍪",
    heading: "Cookies",
    accent: "#f59e0b",
    items: [
      "Essential cookies for authentication & security",
      "Optional analytics cookies with consent only",
      "Full details & opt-out in our Cookie Policy",
    ],
  },
  {
    icon: "✉️",
    heading: "Contact",
    accent: "#00c8ff",
    items: [
      "Astralearnia Technologies Ltd · Lagos, Nigeria",
      "privacy@astralearnia.com",
      "Data Protection Officer: dpo@astralearnia.com",
    ],
  },
];

const QUICK_LINKS = [
  { label: "Terms of Service", href: "/terms"   },
  { label: "Cookie Policy",    href: "/cookies" },
  { label: "Security",         href: "/security"},
  { label: "Data Processing",  href: "/dpa"     },
];

export default function PrivacyPage() {
  return (
    <main className="bg-[#050810] min-h-screen text-white font-sans antialiased">

      <style>{`
        @keyframes _prv_pulse { 0%,100%{opacity:.4} 50%{opacity:1} }
        .prv-card {
          background: rgba(13,22,34,0.65);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 22px 20px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .prv-card:hover {
          border-color: rgba(255,255,255,0.14);
          box-shadow: 0 0 28px rgba(0,200,255,0.06);
        }
        .prv-dot {
          width: 5px; height: 5px; border-radius: 50%;
          flex-shrink: 0; margin-top: 7px;
        }
      `}</style>

      {/* ── background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_30%_at_50%_0%,rgba(0,200,255,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_80%_80%,rgba(124,92,255,0.05),transparent)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HERO ── */}
        <div className="pt-32 pb-10 sm:pb-14">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors mb-8">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
            </svg>
            Back to home
          </Link>

          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-[0.18em] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Legal
              </div>
              <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.04em] leading-[1.02] mb-3">
                <span style={{ background:"linear-gradient(135deg,#00c8ff 0%,#7c5cff 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                  Privacy Policy
                </span>
              </h1>
              <p className="text-sm text-white/35 font-medium">Last updated: March 1, 2026</p>
            </div>

            {/* Quick jump links */}
            <div className="flex flex-wrap gap-2">
              {QUICK_LINKS.map(l => (
                <Link key={l.href} href={l.href}
                  className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/40 hover:text-white/70 hover:border-white/20 transition-all">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Summary strip */}
          <div className="mt-8 p-4 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 text-sm text-slate-300 leading-relaxed font-semibold">
            <span className="text-cyan-300 font-black">TL;DR: </span>
            We collect only what we need, never sell your data, give you full control under GDPR, and protect everything with enterprise-grade security.
          </div>
        </div>

        {/* ── SECTION CARDS GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-24">
          {SECTIONS.map((s, i) => (
            <div key={i} className="prv-card" style={{ borderTopColor: `${s.accent}22` }}>

              {/* Card header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
                  style={{ background:`${s.accent}15`, border:`1px solid ${s.accent}25` }}>
                  {s.icon}
                </div>
                <h2 className="font-black text-sm text-white leading-tight">{s.heading}</h2>
              </div>

              {/* Bullet items */}
              <ul className="flex flex-col gap-2">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span className="prv-dot" style={{ background: s.accent, boxShadow:`0 0 5px ${s.accent}60` }} />
                    <span className="text-[12px] text-white/55 leading-[1.6] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── CTA strip ── */}
        <div className="mb-20 p-5 rounded-2xl border border-white/8 bg-white/3 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-black text-sm text-white mb-0.5">Questions about your data?</p>
            <p className="text-xs text-white/40">Our DPO responds within 30 days.</p>
          </div>
          <a href="mailto:privacy@astralearnia.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm text-white
              bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600
              shadow-[0_0_20px_rgba(0,200,255,0.3)] hover:shadow-[0_0_35px_rgba(0,200,255,0.5)]
              transition-all hover:-translate-y-0.5 active:scale-95 whitespace-nowrap">
            Contact DPO →
          </a>
        </div>
      </div>
    </main>
  );
}