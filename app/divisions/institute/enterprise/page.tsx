"use client";
// ─────────────────────────────────────────────────────────────────
// FILE: app/divisions/institute/enterprise/page.tsx
// Pricing replaced with AI org-calculator modal
// ─────────────────────────────────────────────────────────────────
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// ── Calculator flow ───────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "size",
    q: "How many employees will use the platform?",
    type: "choice",
    opts: [
      { label: "👥 Under 50 employees",      val: "micro" },
      { label: "🏢 50–250 employees",         val: "small" },
      { label: "🏬 250–1,000 employees",      val: "mid" },
      { label: "🏭 1,000+ employees",         val: "large" },
    ],
  },
  {
    id: "goal",
    q: "What's your primary training objective?",
    type: "choice",
    opts: [
      { label: "🤖 AI & tech upskilling",          val: "ai" },
      { label: "📋 Compliance & mandatory training", val: "compliance" },
      { label: "🧭 Leadership development",          val: "leadership" },
      { label: "🔄 Full workforce reskilling",       val: "reskill" },
    ],
  },
  {
    id: "lms",
    q: "Do you currently have an LMS or L&D platform?",
    type: "choice",
    opts: [
      { label: "❌ No — starting from scratch",         val: "none" },
      { label: "🔀 Yes — we want to replace it",        val: "replace" },
      { label: "➕ Yes — we want to integrate alongside", val: "integrate" },
      { label: "🤷 Not sure / complex situation",         val: "unsure" },
    ],
  },
  {
    id: "feature",
    q: "Which feature matters most to your L&D team?",
    type: "choice",
    opts: [
      { label: "📊 Skills analytics & gap reporting", val: "analytics" },
      { label: "🎨 White-label branded portal",       val: "whitelabel" },
      { label: "🔌 HRIS / SSO integrations",          val: "integrations" },
      { label: "🤖 AI-generated custom content",      val: "content" },
    ],
  },
  {
    id: "timeline",
    q: "When do you need to go live?",
    type: "choice",
    opts: [
      { label: "⚡ ASAP — within 2 weeks",  val: "asap" },
      { label: "📅 1–3 months",             val: "soon" },
      { label: "🗓 3–6 months",             val: "planned" },
      { label: "🔭 Still exploring options", val: "exploring" },
    ],
  },
  {
    id: "contact",
    q: "Who should we send the full proposal to?",
    type: "multi",
    fields: [
      { id:"name",    placeholder:"Your name",          type:"text" },
      { id:"email",   placeholder:"Work email",         type:"email" },
      { id:"company", placeholder:"Company name",       type:"text" },
    ],
  },
];

function calcResult(ans: Record<string, string>) {
  const size = ans.size;
  const feat = ans.feature;
  const goal = ans.goal;

  if (size === "micro") {
    return {
      tier: "Team",
      seats: "Up to 50 seats",
      accent: "#00c8ff",
      summary: "For your team size, the Team plan gives you a white-label portal, SSO, 5 custom learning paths, and full onboarding support — with room to grow.",
      highlights: ["White-label learning portal","SSO (Okta, Google, Azure)","Up to 5 custom learning paths","Skills dashboard","Email & chat support","Onboarding within 48 hours"],
    };
  }
  if (size === "small" || size === "mid") {
    return {
      tier: "Business",
      seats: `${size === "small" ? "50–250" : "250–1,000"} seats`,
      accent: "#7c5cff",
      summary: `For ${size === "small" ? "50–250" : "250–1,000"} employees with a focus on ${goal}, the Business plan is the right foundation — full analytics, HRIS integrations, and unlimited custom paths.`,
      highlights: ["Everything in Team","SCIM auto-provisioning","Advanced skills analytics","Dedicated Customer Success Manager","Unlimited custom learning paths","HRIS integrations (Workday, SAP, BambooHR)","AI content generation (unlimited)","Full API access"],
    };
  }
  return {
    tier: "Enterprise",
    seats: "1,000+ seats",
    accent: "#a855f7",
    summary: "For organisations at your scale, we tailor a full Enterprise deployment — including on-premise options, legal review, custom AI model fine-tuning, and dedicated engineering support.",
    highlights: ["Everything in Business","On-premise or private cloud option","Custom AI model fine-tuning","Executive reporting & board-level dashboards","SLA with 99.99% uptime guarantee","24/7 dedicated support","Custom legal, security & DPA review","Bespoke contract terms"],
  };
}

// ── Enterprise Calculator Modal ───────────────────────────────────
function EnterpriseModal({ onClose }: { onClose: () => void }) {
  const [step, setStep]     = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [multiData, setMultiData] = useState({ name:"", email:"", company:"" });
  const [sent, setSent]     = useState(false);
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);

  const q = QUESTIONS[step];

  useEffect(() => {
    setTyping(true);
    const t = setTimeout(() => setTyping(false), 550);
    return () => clearTimeout(t);
  }, [step]);

  function choose(val: string) {
    const next = { ...answers, [q.id]: val };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) setStep(s => s + 1);
  }

  async function submitMulti() {
    if (!multiData.email.includes("@") || !multiData.name || !multiData.company) return;
    setSending(true);
    const finalAnswers = { ...answers, ...multiData };
    // POST to API in production
    await new Promise(r => setTimeout(r, 1500));
    setAnswers(finalAnswers);
    setSending(false);
    setSent(true);
  }

  const result = sent ? calcResult(answers) : null;

  return (
    <div ref={overlayRef} onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      style={{ position:"fixed", inset:0, zIndex:999, background:"rgba(0,0,0,0.78)", backdropFilter:"blur(8px)",
        display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}>

      <div style={{ width:"100%", maxWidth:500, background:"rgba(6,12,24,0.97)",
        border:"1px solid rgba(255,255,255,0.1)", borderRadius:24,
        boxShadow:"0 0 60px rgba(124,92,255,0.15)", overflow:"hidden", maxHeight:"92vh", display:"flex", flexDirection:"column" }}>

        {/* Header */}
        <div style={{ padding:"18px 20px 14px", borderBottom:"1px solid rgba(255,255,255,0.06)",
          display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#7c5cff,#a855f7)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:900, color:"white" }}>
              AI
            </div>
            <div>
              <div style={{ fontSize:"0.75rem", fontWeight:900, color:"white" }}>Enterprise Advisor</div>
              <div style={{ fontSize:"0.6rem", fontWeight:600, color:"#22d3a5", display:"flex", alignItems:"center", gap:4 }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:"#22d3a5", display:"inline-block" }} />
                Builds your custom proposal
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer",
            color:"rgba(255,255,255,0.4)", fontSize:20, lineHeight:1, padding:"2px 6px", borderRadius:8 }}>×</button>
        </div>

        {/* Progress */}
        {!sent && (
          <div style={{ height:2, background:"rgba(255,255,255,0.06)" }}>
            <div style={{ height:"100%", background:"linear-gradient(90deg,#7c5cff,#a855f7)",
              width:`${(step / QUESTIONS.length) * 100}%`, transition:"width 0.4s ease" }} />
          </div>
        )}

        {/* Body */}
        <div style={{ flex:1, overflowY:"auto", padding:"20px 18px 10px", display:"flex", flexDirection:"column", gap:14 }}>
          {sent && result ? (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#7c5cff,#a855f7)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, color:"white", flexShrink:0 }}>AI</div>
                <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:"0 14px 14px 14px",
                  border:"1px solid rgba(255,255,255,0.07)", padding:"12px 14px", flex:1 }}>
                  <p style={{ fontSize:"0.78rem", color:"white", fontWeight:700, marginBottom:3 }}>Perfect. Here&apos;s your tailored recommendation 🎯</p>
                  <p style={{ fontSize:"0.72rem", color:"rgba(255,255,255,0.55)", lineHeight:1.6, fontWeight:500 }}>{result.summary}</p>
                </div>
              </div>

              <div style={{ background:"rgba(13,22,34,0.85)", border:`1px solid ${result.accent}30`,
                borderRadius:16, padding:"16px 16px 14px", boxShadow:`0 0 30px ${result.accent}12` }}>
                <div style={{ marginBottom:10 }}>
                  <div style={{ fontSize:"0.6rem", fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase", color:result.accent, marginBottom:2 }}>Recommended Tier</div>
                  <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
                    <span style={{ fontSize:"1.5rem", fontWeight:900, color:"white" }}>{result.tier}</span>
                    <span style={{ fontSize:"0.7rem", fontWeight:600, color:"rgba(255,255,255,0.35)" }}>{result.seats}</span>
                  </div>
                </div>
                <ul style={{ display:"flex", flexDirection:"column", gap:7 }}>
                  {result.highlights.map(h => (
                    <li key={h} style={{ display:"flex", alignItems:"center", gap:8, fontSize:"0.7rem", color:"rgba(255,255,255,0.7)", fontWeight:600 }}>
                      <span style={{ width:14, height:14, borderRadius:"50%", background:`${result.accent}20`,
                        color:result.accent, display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:"0.55rem", fontWeight:900, flexShrink:0 }}>✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <p style={{ fontSize:"0.68rem", color:"rgba(255,255,255,0.3)", fontWeight:500, textAlign:"center" }}>
                Full proposal sent to <span style={{ color:"rgba(124,92,255,0.8)", fontWeight:700 }}>{multiData.email}</span>. Our team will follow up within 1 business day.
              </p>

              <div style={{ display:"flex", gap:8 }}>
                <button onClick={onClose}
                  style={{ flex:1, padding:"12px", borderRadius:13, fontWeight:900, fontSize:"0.78rem", color:"white",
                    cursor:"pointer", border:`1px solid ${result.accent}40`, background:`${result.accent}15` }}>
                  Explore More →
                </button>
                <a href="mailto:enterprise@astralearnia.com"
                  style={{ flex:1, padding:"12px", borderRadius:13, fontWeight:900, fontSize:"0.78rem", color:"white",
                    cursor:"pointer", border:"none", textAlign:"center", textDecoration:"none",
                    background:`linear-gradient(135deg,#7c5cff,#a855f7)`, boxShadow:`0 0 20px rgba(124,92,255,0.3)` }}>
                  Talk to Sales
                </a>
              </div>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ fontSize:"0.6rem", fontWeight:700, color:"rgba(255,255,255,0.2)", letterSpacing:"0.1em", textTransform:"uppercase" }}>
                Question {step + 1} of {QUESTIONS.length}
              </div>
              <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#7c5cff,#a855f7)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, color:"white", flexShrink:0 }}>AI</div>
                <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:"0 14px 14px 14px",
                  border:"1px solid rgba(255,255,255,0.07)", padding:"12px 14px", maxWidth:"calc(100% - 40px)" }}>
                  {typing ? (
                    <div style={{ display:"flex", gap:4, alignItems:"center", padding:"2px 0" }}>
                      {[0,1,2].map(i => (
                        <span key={i} style={{ width:6, height:6, borderRadius:"50%", background:"rgba(255,255,255,0.3)",
                          animation:`_dot_b 1.2s ease-in-out infinite`, animationDelay:`${i*0.2}s`, display:"inline-block" }} />
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize:"0.8rem", color:"white", fontWeight:700, lineHeight:1.5 }}>{q.q}</p>
                  )}
                </div>
              </div>

              {!typing && (
                q.type === "choice" ? (
                  <div style={{ display:"flex", flexDirection:"column", gap:8, paddingLeft:38 }}>
                    {q.opts!.map(opt => (
                      <button key={opt.val} onClick={() => choose(opt.val)}
                        style={{ padding:"10px 14px", borderRadius:12, textAlign:"left", cursor:"pointer",
                          background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
                          color:"rgba(255,255,255,0.8)", fontSize:"0.75rem", fontWeight:700, transition:"background 0.15s, border-color 0.15s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="rgba(124,92,255,0.12)"; (e.currentTarget as HTMLButtonElement).style.borderColor="rgba(124,92,255,0.4)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.04)"; (e.currentTarget as HTMLButtonElement).style.borderColor="rgba(255,255,255,0.1)"; }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={{ paddingLeft:38, display:"flex", flexDirection:"column", gap:8 }}>
                    {q.fields!.map(f => (
                      <input key={f.id} type={f.type} placeholder={f.placeholder}
                        value={multiData[f.id as keyof typeof multiData]}
                        onChange={e => setMultiData(d => ({ ...d, [f.id]: e.target.value }))}
                        style={{ width:"100%", padding:"10px 14px", borderRadius:11, background:"rgba(255,255,255,0.05)",
                          border:"1px solid rgba(255,255,255,0.1)", color:"white", fontSize:"0.78rem", fontWeight:600,
                          outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
                    ))}
                    <button onClick={submitMulti}
                      disabled={sending || !multiData.email.includes("@") || !multiData.name || !multiData.company}
                      style={{ padding:"11px", borderRadius:12, fontWeight:900, fontSize:"0.78rem", color:"white", cursor:"pointer",
                        border:"none", background:"linear-gradient(135deg,#7c5cff,#a855f7)",
                        opacity: (sending || !multiData.email.includes("@") || !multiData.name || !multiData.company) ? 0.4 : 1 }}>
                      {sending ? "Building your proposal…" : "Get My Enterprise Proposal →"}
                    </button>
                  </div>
                )
              )}

              {step > 0 && !typing && (
                <button onClick={() => setStep(s => s - 1)}
                  style={{ alignSelf:"flex-start", marginLeft:38, background:"none", border:"none", cursor:"pointer",
                    fontSize:"0.65rem", color:"rgba(255,255,255,0.25)", fontWeight:700, padding:0 }}>
                  ← Back
                </button>
              )}
            </div>
          )}
        </div>

        <div style={{ padding:"10px 18px 14px", borderTop:"1px solid rgba(255,255,255,0.05)", textAlign:"center" }}>
          <p style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.18)", fontWeight:500 }}>
            No sales pressure · Proposal within 24h · GDPR compliant
          </p>
        </div>
      </div>
      <style>{`@keyframes _dot_b { 0%,80%,100%{transform:translateY(0);opacity:.3} 40%{transform:translateY(-5px);opacity:1} }`}</style>
    </div>
  );
}

// ── Features & page data ──────────────────────────────────────────
const FEATURES = [
  { icon:"🧩", title:"White-Label LMS",       body:"Fully branded portal — your logo, your domain, our AI engine." },
  { icon:"📊", title:"Skills Intelligence",    body:"Real-time knowledge gap heatmaps across every team and role." },
  { icon:"🔐", title:"SSO & SCIM",             body:"One-click with Okta, Azure AD, Google. Auto-provisioning." },
  { icon:"🛤",  title:"Custom Learning Paths",  body:"Role-specific curricula with your own content + AI micro-lessons." },
  { icon:"🤖", title:"AI Content Generation",  body:"Turn SOPs and docs into structured training modules in minutes." },
  { icon:"📈", title:"L&D Analytics",          body:"Completion, engagement, assessments — one executive dashboard." },
  { icon:"🔗", title:"HRIS Integrations",      body:"Workday, BambooHR, SAP SuccessFactors, and 40+ HR systems." },
  { icon:"🌍", title:"Multi-Language",         body:"30+ languages. AI auto-translates all content." },
];

const RESULTS = [
  { val:"60%",  label:"Less compliance training time" },
  { val:"3.2×", label:"Higher knowledge retention" },
  { val:"40%",  label:"Lower L&D cost per employee" },
  { val:"<48h", label:"Average time to deploy" },
];

export default function EnterprisePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="bg-[#050810] min-h-screen text-white font-sans antialiased">
      <style>{`
        .ent-card {
          background: rgba(13,22,34,0.65);
          backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .ent-card:hover { border-color:rgba(255,255,255,0.13); transform:translateY(-2px); }
      `}</style>

      {showModal && <EnterpriseModal onClose={() => setShowModal(false)} />}

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(124,92,255,0.08),transparent)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HERO */}
        <div className="pt-32 pb-14 text-center">
          <Link href="/divisions/institute" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors mb-7">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
            Institute Division
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-400/25 bg-violet-400/8 text-violet-300 text-[10px] font-black uppercase tracking-[0.18em] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Enterprise Learning
          </div>
          <h1 className="font-black text-4xl sm:text-5xl lg:text-7xl tracking-[-0.04em] leading-[1.02] mb-5 max-w-5xl mx-auto">
            Train Your Entire{" "}
            <span style={{ background:"linear-gradient(135deg,#7c5cff,#00c8ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Organisation at Scale
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 font-semibold">
            Replace fragmented L&D tools with one AI-powered platform. Deploy in 48 hours. Measure real skill growth from day one.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 shadow-[0_0_28px_rgba(160,80,255,0.4)] hover:shadow-[0_0_45px_rgba(160,80,255,0.6)] transition-all hover:-translate-y-0.5 border-none cursor-pointer">
              ✦ Get Custom Proposal (5 min) →
            </button>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm border-2 border-white/25 hover:border-white/50 text-white transition-all hover:-translate-y-0.5">
              Talk to Sales
            </Link>
          </div>
          <p className="text-xs text-white/25 mt-4 font-semibold">5 questions · tailored to your org · full proposal to your inbox</p>
        </div>

        {/* RESULTS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {RESULTS.map(r => (
            <div key={r.val} className="ent-card p-5 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">{r.val}</div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-semibold leading-snug">{r.label}</div>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Everything Your L&D Team Needs</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="ent-card p-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl shrink-0">{f.icon}</span>
                  <div>
                    <h3 className="font-black text-white text-xs mb-1">{f.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{f.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Band */}
        <div className="mb-20 ent-card p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="font-black text-white text-lg mb-1">What does it cost for your org?</h3>
            <p className="text-sm text-slate-400 font-semibold">Our AI advisor takes 5 minutes to build a tailored proposal with the right tier, modules, and integrations for your exact situation.</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm text-white whitespace-nowrap bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 shadow-[0_0_28px_rgba(160,80,255,0.3)] hover:shadow-[0_0_45px_rgba(160,80,255,0.5)] transition-all hover:-translate-y-0.5 border-none cursor-pointer">
            Build My Proposal →
          </button>
        </div>
      </div>
    </main>
  );
}