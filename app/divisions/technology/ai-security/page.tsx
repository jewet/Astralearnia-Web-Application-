"use client";
// ─────────────────────────────────────────────────────────────────
// FILE: app/divisions/technology/ai-security/page.tsx
// ─────────────────────────────────────────────────────────────────
import Link from "next/link";

const PILLARS = [
  {
    icon:"🔐", title:"Infrastructure Security",   accent:"#00c8ff",
    items:["AES-256 encryption at rest","TLS 1.3 for all data in transit","VPC isolation per enterprise client","Zero-trust network architecture","Regular third-party pen testing"],
  },
  {
    icon:"🛡", title:"AI Model Security",          accent:"#7c5cff",
    items:["Prompt injection detection & mitigation","Adversarial input filtering","Model output guardrails & content moderation","Hallucination rate monitoring","Model card transparency"],
  },
  {
    icon:"👁", title:"Data Privacy & Governance",  accent:"#22d3a5",
    items:["GDPR & NDPR compliant","PII auto-detection & redaction","Data residency controls","Purpose limitation enforcement","Right to erasure workflows"],
  },
  {
    icon:"📋", title:"Compliance & Certifications", accent:"#f59e0b",
    items:["SOC 2 Type II (annual audit)","ISO 27001 in progress","NDPR (Nigeria) compliant","GDPR EU representative","Contractual DPA provided"],
  },
];

const THREATS = [
  { icon:"💉", threat:"Prompt Injection",      severity:"Critical", mitigation:"Multi-layer input sanitisation + semantic analysis + output validation pipeline." },
  { icon:"🎭", threat:"Jailbreaking Attempts",  severity:"High",     mitigation:"Constitutional AI guardrails + behavioural pattern detection + human review triggers." },
  { icon:"📡", threat:"Model Exfiltration",     severity:"High",     mitigation:"Differential privacy + rate limiting + anomalous query detection." },
  { icon:"🔀", threat:"Data Poisoning",         severity:"Medium",   mitigation:"Training data provenance tracking + adversarial robustness testing." },
  { icon:"📊", threat:"Inference Attacks",      severity:"Medium",   mitigation:"Output perturbation + membership inference defences + audit logging." },
  { icon:"🔓", threat:"Unauthorised Access",    severity:"Critical", mitigation:"MFA enforcement + RBAC + session expiry + anomalous login alerting." },
];

const PROCESS = [
  { n:"01", title:"Threat Modelling",     body:"We map every data flow and model interaction against OWASP ML Top 10 and your specific threat landscape." },
  { n:"02", title:"Red Team Testing",     body:"Internal and external red teams attempt to exploit every layer of your AI deployment before you go live." },
  { n:"03", title:"Continuous Monitoring",body:"24/7 anomaly detection across model inputs, outputs, and infrastructure. Mean time to detect < 5 minutes." },
  { n:"04", title:"Incident Response",    body:"Pre-defined playbooks. Breach notification within 72 hours. Dedicated security engineer on retainer." },
];

const SEVERITY_COLOR: Record<string, string> = { Critical:"#ef4444", High:"#f59e0b", Medium:"#22d3a5" };

export default function AISecurityPage() {
  return (
    <main className="bg-[#050810] min-h-screen text-white font-sans antialiased">
      <style>{`
        .sec-card {
          background: rgba(13,22,34,0.65);
          backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .sec-card:hover { border-color:rgba(255,255,255,0.14); transform:translateY(-2px); }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(0,200,255,0.05),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_90%_80%,rgba(239,68,68,0.04),transparent)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HERO */}
        <div className="pt-32 pb-16 text-center">
          <Link href="/divisions/technology" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors mb-8">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
            Technology Division
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/25 bg-cyan-400/8 text-cyan-300 text-[10px] font-black uppercase tracking-[0.18em] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI Security
          </div>
          <h1 className="font-black text-4xl sm:text-5xl lg:text-7xl tracking-[-0.04em] leading-[1.02] mb-6 max-w-5xl mx-auto">
            AI That&apos;s Powerful.{" "}
            <span style={{ background:"linear-gradient(135deg,#00c8ff,#22d3a5)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              AI That&apos;s Safe.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-semibold">
            Enterprise AI carries new attack surfaces. We build security in at every layer — from infrastructure through model behaviour through your data governance policies.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/book-demo" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 shadow-[0_0_30px_rgba(0,200,255,0.4)] hover:shadow-[0_0_50px_rgba(0,200,255,0.6)] transition-all hover:-translate-y-0.5">
              Request Security Review →
            </Link>
            <a href="mailto:security@astralearnia.com" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm border-2 border-white/25 hover:border-white/50 text-white transition-all hover:-translate-y-0.5">
              Report Vulnerability
            </a>
          </div>
        </div>

        {/* PROCESS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {PROCESS.map((p, i) => (
            <div key={i} className="sec-card p-5">
              <div className="text-[9px] font-black uppercase tracking-widest text-cyan-400 mb-2">{p.n}</div>
              <h3 className="font-black text-white text-sm mb-2">{p.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">{p.body}</p>
            </div>
          ))}
        </div>

        {/* SECURITY PILLARS */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-center mb-10">Security Architecture</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PILLARS.map((p, i) => (
              <div key={i} className="sec-card p-6" style={{ borderTopColor:`${p.accent}25` }}>
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
                    style={{ background:`${p.accent}15`, border:`1px solid ${p.accent}25` }}>
                    {p.icon}
                  </div>
                  <h3 className="font-black text-white text-sm">{p.title}</h3>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {p.items.map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ background:p.accent }} />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* THREAT MATRIX */}
        <div className="mb-24">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-center mb-8">AI Threat Mitigation Matrix</h2>
          <div className="sec-card overflow-hidden">
            <div className="grid grid-cols-12 gap-0 px-5 py-3 border-b border-white/6">
              <div className="col-span-1 text-[9px] font-black uppercase tracking-widest text-white/25"></div>
              <div className="col-span-3 text-[9px] font-black uppercase tracking-widest text-white/25">Threat</div>
              <div className="col-span-2 text-[9px] font-black uppercase tracking-widest text-white/25">Severity</div>
              <div className="col-span-6 text-[9px] font-black uppercase tracking-widest text-white/25">Mitigation</div>
            </div>
            {THREATS.map((t, i) => (
              <div key={i} className={`grid grid-cols-12 gap-0 px-5 py-4 items-center ${i < THREATS.length-1 ? "border-b border-white/5" : ""} hover:bg-white/2 transition-colors`}>
                <div className="col-span-1 text-lg">{t.icon}</div>
                <div className="col-span-3 font-black text-white text-xs">{t.threat}</div>
                <div className="col-span-2">
                  <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{ background:`${SEVERITY_COLOR[t.severity]}18`, color:SEVERITY_COLOR[t.severity], border:`1px solid ${SEVERITY_COLOR[t.severity]}30` }}>
                    {t.severity}
                  </span>
                </div>
                <div className="col-span-6 text-xs text-slate-400 font-medium leading-relaxed">{t.mitigation}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/book-demo" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 shadow-[0_0_24px_rgba(0,200,255,0.3)] hover:shadow-[0_0_40px_rgba(0,200,255,0.5)] transition-all hover:-translate-y-0.5">
              Book a Security Assessment →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}