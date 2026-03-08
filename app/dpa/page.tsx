"use client";
// ─────────────────────────────────────────────────────────────────
// FILE: app/dpa/page.tsx   (Data Processing Agreement)
// ─────────────────────────────────────────────────────────────────
import Link from "next/link";

const SECTIONS = [
  {
    icon:"📄", accent:"#00c8ff",
    heading:"Scope & Purpose",
    items:[
      "This DPA governs all processing of personal data carried out by Astralearnia Technologies Ltd ('Processor') on behalf of Client ('Controller').",
      "Processing is carried out solely to deliver the contracted Astralearnia services as described in the Master Service Agreement.",
      "Processor acts only on documented instructions from Controller and does not process data for any independent purpose.",
    ],
  },
  {
    icon:"⚙️", accent:"#7c5cff",
    heading:"Nature of Processing",
    items:[
      "Processing activities include: storage, retrieval, structuring, adaptation, and analysis of learner and organisational data.",
      "Categories of data processed: names, email addresses, job titles, learning progress records, assessment scores, and usage analytics.",
      "Data subjects covered: Controller's employees, contractors, and authorised platform users.",
    ],
  },
  {
    icon:"🔐", accent:"#22d3a5",
    heading:"Security Measures",
    items:[
      "AES-256 encryption at rest for all stored personal data; TLS 1.3 in transit.",
      "Role-based access controls — only authorised personnel with a documented need may access personal data.",
      "Annual third-party penetration testing and continuous vulnerability scanning.",
      "SOC 2 Type II certification maintained on an annual basis.",
      "Incident response plan with mandatory notification within 72 hours of confirmed breach.",
    ],
  },
  {
    icon:"🌍", accent:"#a855f7",
    heading:"International Data Transfers",
    items:[
      "Data is processed primarily in our Lagos, Nigeria primary data centre and AWS eu-west-1 (Ireland) region.",
      "Transfers outside the EEA are protected by EU Standard Contractual Clauses (SCCs) 2021/914.",
      "Adequacy decisions are monitored; Controller will be notified of any changes to transfer mechanisms.",
      "On request, Processor provides a full record of sub-processor locations and transfer safeguards.",
    ],
  },
  {
    icon:"🤝", accent:"#f59e0b",
    heading:"Sub-Processors",
    items:[
      "Astralearnia engages the following categories of sub-processors: cloud infrastructure, email delivery, payment processing, analytics.",
      "A current list of named sub-processors is maintained at astralearnia.com/sub-processors and updated with 30-day notice.",
      "Controller may reasonably object to a new sub-processor; process is detailed in Section 9 of the MSA.",
      "All sub-processors are contractually bound to security standards no less stringent than this DPA.",
    ],
  },
  {
    icon:"⚖️", accent:"#00c8ff",
    heading:"Data Subject Rights",
    items:[
      "Processor assists Controller in fulfilling GDPR Articles 15–22 rights (access, rectification, erasure, portability, objection).",
      "Requests received directly by Processor are forwarded to Controller within 5 business days.",
      "Processor provides technical means to export or delete data within 30 days of request.",
      "Deletion is permanent and confirmed in writing; backup purge occurs within 90 days.",
    ],
  },
  {
    icon:"📋", accent:"#7c5cff",
    heading:"Audit Rights",
    items:[
      "Controller may audit Processor's data processing activities upon 30 days' written notice, no more than once per year.",
      "Processor provides relevant documentation, certifications (SOC 2, ISO 27001) in lieu of on-site audit where sufficient.",
      "On-site audits are available at Controller's cost; scope is agreed in advance to minimise operational disruption.",
    ],
  },
  {
    icon:"🗑", accent:"#22d3a5",
    heading:"Retention & Deletion",
    items:[
      "Personal data is retained only for the duration of the service agreement plus a 30-day grace period.",
      "On termination, Controller may export all data via the platform export tools within the grace period.",
      "After the grace period, all personal data is securely deleted from live systems and scheduled for purge from backups.",
      "A deletion certificate is issued within 14 days of confirmed data destruction.",
    ],
  },
  {
    icon:"✉️", accent:"#f59e0b",
    heading:"Contact",
    items:[
      "Data Protection Officer: dpo@astralearnia.com",
      "Legal & DPA enquiries: legal@astralearnia.com",
      "Astralearnia Technologies Ltd · Lagos, Nigeria",
      "To request a countersigned DPA, contact legal@astralearnia.com with your company details.",
    ],
  },
];

const QUICK_LINKS = [
  { label:"Privacy Policy",   href:"/privacy"    },
  { label:"Cookie Policy",    href:"/cookies"    },
  { label:"Compliance",       href:"/compliance" },
  { label:"Security",         href:"/security"   },
];

export default function DPAPage() {
  return (
    <main className="bg-[#050810] min-h-screen text-white font-sans antialiased">
      <style>{`
        .dpa-card {
          background: rgba(13,22,34,0.65);
          backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 20px 18px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .dpa-card:hover { border-color:rgba(255,255,255,0.13); box-shadow:0 0 24px rgba(0,200,255,0.05); }
        .dpa-dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; margin-top:7px; }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_30%_at_50%_0%,rgba(0,200,255,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_25%_at_80%_85%,rgba(124,92,255,0.05),transparent)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HERO ── */}
        <div className="pt-32 pb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors mb-8">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
            </svg>
            Back to home
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-5 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-[0.18em] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Legal
              </div>
              <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.04em] leading-[1.02] mb-3">
                <span style={{ background:"linear-gradient(135deg,#00c8ff 0%,#7c5cff 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                  Data Processing
                </span>
                <br/>
                <span className="text-white text-3xl sm:text-4xl lg:text-5xl">Agreement</span>
              </h1>
              <p className="text-sm text-white/35 font-medium">Last updated: March 1, 2026 · Version 2.1</p>
            </div>
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
          <div className="p-4 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 text-sm text-slate-300 leading-relaxed font-semibold mb-10">
            <span className="text-cyan-300 font-black">Summary: </span>
            This DPA defines how Astralearnia processes personal data on your behalf — what data, under what instructions, how it is secured, where it is stored, and your rights as a Controller. To request a countersigned copy, email <a href="mailto:legal@astralearnia.com" className="text-cyan-400 hover:underline">legal@astralearnia.com</a>.
          </div>
        </div>

        {/* ── DPA SECTIONS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-24">
          {SECTIONS.map((s, i) => (
            <div key={i} className="dpa-card" style={{ borderTopColor:`${s.accent}20` }}>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
                  style={{ background:`${s.accent}15`, border:`1px solid ${s.accent}22` }}>
                  {s.icon}
                </div>
                <h2 className="font-black text-sm text-white leading-tight">{s.heading}</h2>
              </div>
              <ul className="flex flex-col gap-2">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span className="dpa-dot" style={{ background:s.accent, boxShadow:`0 0 4px ${s.accent}50` }} />
                    <span className="text-[11.5px] text-white/55 leading-[1.65] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="mb-20 p-5 rounded-2xl border border-white/8 bg-white/3 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-black text-sm text-white mb-0.5">Need a countersigned DPA?</p>
            <p className="text-xs text-white/40">Sent within 2 business days. Includes EU SCCs and annexes.</p>
          </div>
          <a href="mailto:legal@astralearnia.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm text-white whitespace-nowrap
              bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600
              shadow-[0_0_20px_rgba(0,200,255,0.3)] hover:shadow-[0_0_35px_rgba(0,200,255,0.5)]
              transition-all hover:-translate-y-0.5">
            Request DPA →
          </a>
        </div>
      </div>
    </main>
  );
}