"use client";
// ─────────────────────────────────────────────────────────────────
// FILE: app/divisions/institute/individuals/page.tsx
// Pricing replaced with AI bot-calculator modal (sequential Qs)
// ─────────────────────────────────────────────────────────────────
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// ── Calculator questions ─────────────────────────────────────────
const QUESTIONS = [
  {
    id: "goal",
    q: "What's your primary goal right now?",
    type: "choice",
    opts: [
      { label: "🚀 Land a new job in AI/tech", val: "new_job" },
      { label: "📈 Get promoted at my current company", val: "promotion" },
      { label: "🔄 Transition into a new field", val: "transition" },
      { label: "🧠 Upskill for personal growth", val: "personal" },
    ],
  },
  {
    id: "level",
    q: "How would you describe your current technical level?",
    type: "choice",
    opts: [
      { label: "🌱 Complete beginner", val: "beginner" },
      { label: "📗 Some basics (spreadsheets, light coding)", val: "some" },
      { label: "💻 Intermediate (can code, use data tools)", val: "intermediate" },
      { label: "⚡ Advanced (ML/data science background)", val: "advanced" },
    ],
  },
  {
    id: "time",
    q: "How many hours per week can you commit to learning?",
    type: "choice",
    opts: [
      { label: "⏱ 1–3 hrs / week", val: "1-3" },
      { label: "🕐 4–7 hrs / week", val: "4-7" },
      { label: "🕑 8–14 hrs / week", val: "8-14" },
      { label: "🕒 15+ hrs / week", val: "15+" },
    ],
  },
  {
    id: "budget",
    q: "What's your monthly budget for learning?",
    type: "choice",
    opts: [
      { label: "💸 I need free options", val: "free" },
      { label: "💵 Under $30/mo", val: "low" },
      { label: "💳 $30–$80/mo", val: "mid" },
      { label: "🏦 $80+/mo (results matter most)", val: "high" },
    ],
  },
  {
    id: "mentor",
    q: "How important is human mentorship to you?",
    type: "choice",
    opts: [
      { label: "🤖 I prefer self-paced, no mentor", val: "none" },
      { label: "📬 Occasional async feedback is fine", val: "async" },
      { label: "📞 I want live 1-on-1 sessions", val: "live" },
      { label: "🎯 I want a dedicated career coach", val: "coach" },
    ],
  },
  {
    id: "email",
    q: "Last step — where should we send your personalised plan?",
    type: "email",
    placeholder: "your@email.com",
  },
];

// ── Result engine ────────────────────────────────────────────────
function calcResult(answers: Record<string, string>) {
  const budget = answers.budget;
  const mentor = answers.mentor;
  const time   = answers.time;

  if (budget === "free") {
    return {
      plan: "Starter",
      price: "Free forever",
      accent: "#00c8ff",
      reason: "Based on your budget, the Starter plan gives you 5 AI-curated courses/month, a personal dashboard, and community access — no cost, no card.",
      includes: ["5 AI courses/month", "Personalised dashboard", "Community & peer learning", "Basic skill assessments"],
      upgrade: "Unlock mentor sessions and certifications from $29/mo when you're ready.",
    };
  }
  if ((budget === "low" || budget === "mid") && mentor !== "coach") {
    return {
      plan: "Pro",
      price: "$29/mo",
      accent: "#7c5cff",
      reason: `Your goals and ${time} hrs/week commitment suggest you'll thrive on the Pro plan. Adaptive AI paths, certifications, and ${mentor === "live" ? "live 1-on-1 sessions" : "async mentor feedback"} included.`,
      includes: ["Unlimited courses", "Adaptive AI learning path", "Industry certifications", mentor === "live" ? "2× live mentor sessions/mo" : "Async mentor feedback", "Skill gap analysis", "Job placement support"],
      upgrade: "Add a career coach and cohort classes with Elite from $79/mo.",
    };
  }
  return {
    plan: "Elite",
    price: "$79/mo",
    accent: "#a855f7",
    reason: "Your ambition, time commitment, and mentorship preferences call for our most immersive plan — unlimited mentors, live cohorts, and a career coach.",
    includes: ["Everything in Pro", "Unlimited 1-on-1 mentor sessions", "Live cohort classes", "Dedicated career coach", "Priority certification fast-track", "LinkedIn & CV optimisation"],
    upgrade: null,
  };
}

// ── Enrol / Pricing Modal ────────────────────────────────────────
function PricingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail]     = useState("");
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [typing, setTyping]   = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);

  const q = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;
  const isDone = sent;

  // Simulate bot typing delay on step change
  useEffect(() => {
    setTyping(true);
    const t = setTimeout(() => setTyping(false), 600);
    return () => clearTimeout(t);
  }, [step]);

  function choose(val: string) {
    const next = { ...answers, [q.id]: val };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) setStep(s => s + 1);
  }

  async function submit() {
    if (!email || !email.includes("@")) return;
    setSending(true);
    // In production: POST to your API with { ...answers, email }
    await new Promise(r => setTimeout(r, 1400));
    setSending(false);
    setSent(true);
  }

  const result = isDone ? calcResult(answers) : null;

  return (
    <div ref={overlayRef} onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      style={{ position:"fixed", inset:0, zIndex:999, background:"rgba(0,0,0,0.75)", backdropFilter:"blur(8px)",
        display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}>

      <div style={{ width:"100%", maxWidth:480, background:"rgba(8,14,26,0.97)",
        border:"1px solid rgba(255,255,255,0.1)", borderRadius:24,
        boxShadow:"0 0 60px rgba(0,200,255,0.12)", overflow:"hidden", maxHeight:"92vh", display:"flex", flexDirection:"column" }}>

        {/* Header */}
        <div style={{ padding:"18px 20px 14px", borderBottom:"1px solid rgba(255,255,255,0.06)",
          display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#00c8ff,#7c5cff)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:900, color:"white" }}>
              AI
            </div>
            <div>
              <div style={{ fontSize:"0.75rem", fontWeight:900, color:"white" }}>Astralearnia Advisor</div>
              <div style={{ fontSize:"0.6rem", fontWeight:600, color:"#22d3a5", display:"flex", alignItems:"center", gap:4 }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:"#22d3a5", display:"inline-block" }} />
                Online · finds your perfect plan
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.4)",
            fontSize:20, lineHeight:1, padding:"2px 6px", borderRadius:8 }}>×</button>
        </div>

        {/* Progress bar */}
        {!isDone && (
          <div style={{ height:2, background:"rgba(255,255,255,0.06)" }}>
            <div style={{ height:"100%", background:"linear-gradient(90deg,#00c8ff,#7c5cff)",
              width:`${((step) / QUESTIONS.length) * 100}%`, transition:"width 0.4s ease" }} />
          </div>
        )}

        {/* Chat body */}
        <div style={{ flex:1, overflowY:"auto", padding:"20px 18px 10px", display:"flex", flexDirection:"column", gap:14 }}>
          {isDone && result ? (
            // ── RESULT ──
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#00c8ff,#7c5cff)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, color:"white", flexShrink:0 }}>AI</div>
                <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:"0 14px 14px 14px",
                  border:"1px solid rgba(255,255,255,0.07)", padding:"12px 14px", flex:1 }}>
                  <p style={{ fontSize:"0.78rem", color:"white", fontWeight:700, marginBottom:4 }}>
                    Here&apos;s your personalised recommendation 🎉
                  </p>
                  <p style={{ fontSize:"0.72rem", color:"rgba(255,255,255,0.6)", lineHeight:1.6, fontWeight:500 }}>
                    {result.reason}
                  </p>
                </div>
              </div>

              {/* Plan card */}
              <div style={{ background:"rgba(13,22,34,0.8)", border:`1px solid ${result.accent}30`,
                borderRadius:16, padding:"16px 16px 14px", boxShadow:`0 0 28px ${result.accent}12` }}>
                <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:10 }}>
                  <div>
                    <div style={{ fontSize:"0.65rem", fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase",
                      color:result.accent, marginBottom:2 }}>Recommended Plan</div>
                    <div style={{ fontSize:"1.4rem", fontWeight:900, color:"white" }}>{result.plan}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:"1.1rem", fontWeight:900, color:"white" }}>{result.price}</div>
                  </div>
                </div>
                <ul style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:10 }}>
                  {result.includes.map(item => (
                    <li key={item} style={{ display:"flex", alignItems:"center", gap:8, fontSize:"0.72rem", color:"rgba(255,255,255,0.7)", fontWeight:600 }}>
                      <span style={{ width:14, height:14, borderRadius:"50%", background:`${result.accent}20`,
                        color:result.accent, display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:"0.55rem", fontWeight:900, flexShrink:0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                {result.upgrade && (
                  <p style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.3)", fontWeight:600, borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:8 }}>
                    💡 {result.upgrade}
                  </p>
                )}
              </div>

              <p style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.35)", fontWeight:500, textAlign:"center" }}>
                Your personalised plan has been sent to <span style={{ color:"rgba(0,200,255,0.7)", fontWeight:700 }}>{answers.email}</span>
              </p>

              <button onClick={onClose}
                style={{ padding:"12px 20px", borderRadius:14, fontWeight:900, fontSize:"0.8rem", color:"white", cursor:"pointer", border:"none",
                  background:`linear-gradient(135deg,${result.accent},#7c5cff)`, boxShadow:`0 0 20px ${result.accent}30` }}>
                Start Learning Now →
              </button>
            </div>
          ) : (
            // ── QUESTION ──
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {/* Step indicator */}
              <div style={{ fontSize:"0.6rem", fontWeight:700, color:"rgba(255,255,255,0.2)", letterSpacing:"0.1em", textTransform:"uppercase" }}>
                Question {step + 1} of {QUESTIONS.length}
              </div>

              {/* Bot message */}
              <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#00c8ff,#7c5cff)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, color:"white", flexShrink:0 }}>AI</div>
                <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:"0 14px 14px 14px",
                  border:"1px solid rgba(255,255,255,0.07)", padding:"12px 14px", maxWidth:"calc(100% - 40px)" }}>
                  {typing ? (
                    <div style={{ display:"flex", gap:4, alignItems:"center", padding:"2px 0" }}>
                      {[0,1,2].map(i => (
                        <span key={i} style={{ width:6, height:6, borderRadius:"50%", background:"rgba(255,255,255,0.3)",
                          animation:`_dot_bounce 1.2s ease-in-out infinite`, animationDelay:`${i*0.2}s`, display:"inline-block" }} />
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize:"0.8rem", color:"white", fontWeight:700, lineHeight:1.5 }}>{q.q}</p>
                  )}
                </div>
              </div>

              {/* Choices or email input */}
              {!typing && (
                q.type === "choice" ? (
                  <div style={{ display:"flex", flexDirection:"column", gap:8, paddingLeft:38 }}>
                    {q.opts!.map(opt => (
                      <button key={opt.val} onClick={() => choose(opt.val)}
                        style={{ padding:"10px 14px", borderRadius:12, textAlign:"left", cursor:"pointer",
                          background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
                          color:"rgba(255,255,255,0.8)", fontSize:"0.75rem", fontWeight:700,
                          transition:"background 0.15s, border-color 0.15s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="rgba(0,200,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.borderColor="rgba(0,200,255,0.35)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.04)"; (e.currentTarget as HTMLButtonElement).style.borderColor="rgba(255,255,255,0.1)"; }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={{ paddingLeft:38 }}>
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setAnswers(a => ({ ...a, email: e.target.value })); }}
                      placeholder={q.placeholder}
                      style={{ width:"100%", padding:"11px 14px", borderRadius:12, background:"rgba(255,255,255,0.05)",
                        border:"1px solid rgba(255,255,255,0.12)", color:"white", fontSize:"0.8rem", fontWeight:600,
                        outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}
                      onKeyDown={e => { if (e.key === "Enter") submit(); }}
                    />
                    <button onClick={submit} disabled={sending || !email.includes("@")}
                      style={{ marginTop:10, width:"100%", padding:"11px 14px", borderRadius:12, fontWeight:900, fontSize:"0.8rem",
                        color:"white", cursor:"pointer", border:"none", opacity: (!email.includes("@") || sending) ? 0.45 : 1,
                        background:"linear-gradient(135deg,#00c8ff,#7c5cff)", transition:"opacity 0.15s" }}>
                      {sending ? "Calculating…" : "Get My Personalised Plan →"}
                    </button>
                  </div>
                )
              )}

              {/* Back */}
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

        {/* Footer note */}
        <div style={{ padding:"10px 18px 14px", borderTop:"1px solid rgba(255,255,255,0.05)", textAlign:"center" }}>
          <p style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.18)", fontWeight:500 }}>
            No commitment required · We respect your inbox · Unsubscribe any time
          </p>
        </div>
      </div>

      <style>{`@keyframes _dot_bounce { 0%,80%,100%{transform:translateY(0);opacity:.3} 40%{transform:translateY(-5px);opacity:1} }`}</style>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  { step:"01", icon:"🧠", title:"Skill Assessment",  body:"Our AI analyses your current knowledge, career goals and learning style to build a precise baseline." },
  { step:"02", icon:"🗺",  title:"Adaptive Path",     body:"A personalised curriculum is generated — updated in real-time as you learn faster or slower than predicted." },
  { step:"03", icon:"📚", title:"Learn & Practice",  body:"Consume courses, complete projects, and get instant AI feedback on every submission." },
  { step:"04", icon:"🏆", title:"Certify & Progress",body:"Earn industry-recognised certificates. Your skill profile is always live and shareable with employers." },
];

const OUTCOMES = [
  { val:"94%", label:"Completion rate vs 12% industry avg" },
  { val:"3.8×", label:"Faster skill acquisition" },
  { val:"67%", label:"Learners land new roles within 6 months" },
  { val:"12K+", label:"Active individual learners" },
];

export default function IndividualsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="bg-[#050810] min-h-screen text-white font-sans antialiased">
      <style>{`
        .pg-card {
          background: rgba(13,22,34,0.65);
          backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .pg-card:hover { border-color:rgba(255,255,255,0.13); transform:translateY(-2px); }
      `}</style>

      {showModal && <PricingModal onClose={() => setShowModal(false)} />}

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(0,200,255,0.07),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_80%_80%,rgba(124,92,255,0.05),transparent)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HERO */}
        <div className="pt-32 pb-14 text-center">
          <Link href="/divisions/institute" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors mb-8">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
            Institute Division
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-400/25 bg-violet-400/8 text-violet-300 text-[10px] font-black uppercase tracking-[0.18em] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            For Individuals
          </div>
          <h1 className="font-black text-4xl sm:text-5xl lg:text-7xl tracking-[-0.04em] leading-[1.02] mb-5 max-w-4xl mx-auto">
            <span className="text-white">Your Career.</span>{" "}
            <span style={{ background:"linear-gradient(135deg,#a855f7,#00c8ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Your AI Tutor.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 font-semibold">
            Stop guessing what to learn next. Astralearnia builds a personalised AI-powered curriculum around your exact goals.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 shadow-[0_0_28px_rgba(160,80,255,0.4)] hover:shadow-[0_0_45px_rgba(160,80,255,0.6)] transition-all hover:-translate-y-0.5 border-none cursor-pointer">
              ✦ Find My Plan (2 min) →
            </button>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm border-2 border-white/25 hover:border-white/50 text-white transition-all hover:-translate-y-0.5">
              Talk to a Human
            </Link>
          </div>
          <p className="text-xs text-white/25 mt-4 font-semibold">6 quick questions · personalised to you · sent to your inbox</p>
        </div>

        {/* OUTCOMES */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {OUTCOMES.map(o => (
            <div key={o.val} className="pg-card p-5 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">{o.val}</div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-semibold leading-snug">{o.label}</div>
            </div>
          ))}
        </div>

        {/* HOW IT WORKS */}
        <div className="mb-14">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-[0.18em] mb-3">How It Works</div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Four Steps to Mastery</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_IT_WORKS.map((s, i) => (
              <div key={i} className="pg-card p-5">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-[9px] font-black uppercase tracking-widest text-violet-400 mb-1.5">Step {s.step}</div>
                <h3 className="font-black text-white text-sm mb-1.5">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Band */}
        <div className="mb-20 pg-card p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="font-black text-white text-lg mb-1">Not sure which plan is right for you?</h3>
            <p className="text-sm text-slate-400 font-semibold">Our AI advisor asks 5 quick questions and builds your personalised learning plan — sent straight to your inbox.</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm text-white whitespace-nowrap bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 shadow-[0_0_28px_rgba(160,80,255,0.3)] hover:shadow-[0_0_45px_rgba(160,80,255,0.5)] transition-all hover:-translate-y-0.5 border-none cursor-pointer">
            Start the AI Quiz →
          </button>
        </div>
      </div>
    </main>
  );
}