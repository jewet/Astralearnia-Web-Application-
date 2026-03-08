"use client";
// ─────────────────────────────────────────────────────────────────
// FILE: app/divisions/institute/certifications/page.tsx
// Each cert has an Enrol modal that collects full info
// ─────────────────────────────────────────────────────────────────
import Link from "next/link";
import { useState, useRef } from "react";

const CERTS = [
  { code:"ASL-AI-F",  name:"AI Foundations",         level:"Foundational", duration:"4 weeks", hours:"40h",  accent:"#00c8ff", icon:"🤖", desc:"Core AI concepts, ML fundamentals, and practical prompt engineering. Ideal for non-technical professionals." },
  { code:"ASL-DS-A",  name:"Data Science Associate",  level:"Associate",    duration:"8 weeks", hours:"80h",  accent:"#7c5cff", icon:"📊", desc:"Python, pandas, SQL, statistical modelling, and building predictive models from real datasets." },
  { code:"ASL-ML-P",  name:"ML Engineering Pro",      level:"Professional", duration:"12 wks", hours:"120h", accent:"#a855f7", icon:"⚡", desc:"Deep learning, MLOps, model deployment and monitoring. PyTorch, MLflow, Kubernetes." },
  { code:"ASL-PO-B",  name:"AI Product Owner",        level:"Professional", duration:"6 weeks", hours:"60h",  accent:"#22d3a5", icon:"🎯", desc:"Building and launching AI-powered products. Roadmapping, stakeholder management, and measuring AI ROI." },
  { code:"ASL-SE-A",  name:"AI Security Analyst",     level:"Associate",    duration:"8 weeks", hours:"80h",  accent:"#f59e0b", icon:"🔐", desc:"Adversarial ML, prompt injection defence, data privacy in AI systems, and red-teaming." },
  { code:"ASL-LD-E",  name:"L&D AI Strategist",       level:"Executive",    duration:"4 weeks", hours:"40h",  accent:"#00c8ff", icon:"🌱", desc:"Designing AI-augmented learning programmes, skills strategy, and building the business case for AI in L&D." },
];

const PROCESS = [
  { n:"01", title:"Enrol",    body:"Choose your certification. Self-paced or cohort-based." },
  { n:"02", title:"Learn",    body:"AI-curated modules, live labs, real projects with expert guidance." },
  { n:"03", title:"Assess",   body:"Proctored exam + real-world capstone reviewed by industry pros." },
  { n:"04", title:"Certify",  body:"Digital badge, verifiable credential, visibility with hiring partners." },
];

// ── Types ─────────────────────────────────────────────────────────
type Cert = typeof CERTS[number];
type FormData = {
  firstName: string; lastName: string; email: string;
  phone: string; company: string; role: string;
  experience: string; pace: string; cohort: string; why: string;
};

// ── Enrolment Modal ───────────────────────────────────────────────
function EnrolModal({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  const [form, setForm] = useState<FormData>({
    firstName:"", lastName:"", email:"", phone:"",
    company:"", role:"", experience:"", pace:"", cohort:"", why:""
  });
  const [step, setStep]     = useState(0);
  const [sent, setSent]     = useState(false);
  const [sending, setSending] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  function set(k: keyof FormData, v: string) { setForm(f => ({ ...f, [k]: v })); }

  const steps = [
    {
      title: "About You",
      subtitle: "Basic contact information",
      fields: (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            <div>
              <label style={lbl}>First name *</label>
              <input style={inp} placeholder="Jane" value={form.firstName} onChange={e => set("firstName", e.target.value)} />
            </div>
            <div>
              <label style={lbl}>Last name *</label>
              <input style={inp} placeholder="Okonkwo" value={form.lastName} onChange={e => set("lastName", e.target.value)} />
            </div>
          </div>
          <div>
            <label style={lbl}>Email address *</label>
            <input style={inp} type="email" placeholder="jane@example.com" value={form.email} onChange={e => set("email", e.target.value)} />
          </div>
          <div>
            <label style={lbl}>Phone number</label>
            <input style={inp} type="tel" placeholder="+234 800 000 0000" value={form.phone} onChange={e => set("phone", e.target.value)} />
          </div>
        </div>
      ),
      valid: () => form.firstName && form.lastName && form.email.includes("@"),
    },
    {
      title: "Your Background",
      subtitle: "Helps us personalise your experience",
      fields: (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <div>
            <label style={lbl}>Company / Organisation</label>
            <input style={inp} placeholder="Acme Corp (or leave blank if studying personally)" value={form.company} onChange={e => set("company", e.target.value)} />
          </div>
          <div>
            <label style={lbl}>Current role / job title</label>
            <input style={inp} placeholder="Data Analyst, Product Manager, etc." value={form.role} onChange={e => set("role", e.target.value)} />
          </div>
          <div>
            <label style={lbl}>Experience level *</label>
            {["No technical background","Some coding / data basics","Intermediate (can code)","Advanced (ML background)"].map(o => (
              <button key={o} onClick={() => set("experience", o)}
                style={{ ...optBtn, ...(form.experience === o ? { ...optBtnSel, borderColor:`${cert.accent}50`, background:`${cert.accent}12` } : {}) }}>
                {o}
              </button>
            ))}
          </div>
        </div>
      ),
      valid: () => !!form.experience,
    },
    {
      title: "Study Preferences",
      subtitle: "We'll tailor your schedule",
      fields: (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <div>
            <label style={lbl}>Preferred pace *</label>
            {["Self-paced (flexible schedule)","Cohort-based (structured, with peers)","Accelerated (intensive, fastest completion)"].map(o => (
              <button key={o} onClick={() => set("pace", o)}
                style={{ ...optBtn, ...(form.pace === o ? { ...optBtnSel, borderColor:`${cert.accent}50`, background:`${cert.accent}12` } : {}) }}>
                {o}
              </button>
            ))}
          </div>
          <div>
            <label style={lbl}>Preferred start</label>
            {["As soon as possible","Next cohort (in ~2 weeks)","Next month","I'm flexible"].map(o => (
              <button key={o} onClick={() => set("cohort", o)}
                style={{ ...optBtn, ...(form.cohort === o ? { ...optBtnSel, borderColor:`${cert.accent}50`, background:`${cert.accent}12` } : {}) }}>
                {o}
              </button>
            ))}
          </div>
        </div>
      ),
      valid: () => !!form.pace,
    },
    {
      title: "One Last Thing",
      subtitle: "Optional — helps us serve you better",
      fields: (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <div>
            <label style={lbl}>Why are you taking this certification?</label>
            <textarea style={{ ...inp, minHeight:90, resize:"vertical" as const, paddingTop:10 }}
              placeholder="e.g. I want to transition into data science roles, or my company asked me to upskill the team…"
              value={form.why} onChange={e => set("why", e.target.value)} />
          </div>
          <div style={{ background:`${cert.accent}08`, border:`1px solid ${cert.accent}20`,
            borderRadius:12, padding:"12px 14px" }}>
            <div style={{ fontSize:"0.65rem", fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:cert.accent, marginBottom:6 }}>
              Enrolling in
            </div>
            <div style={{ fontSize:"0.8rem", fontWeight:900, color:"white", marginBottom:2 }}>{cert.icon} {cert.name}</div>
            <div style={{ display:"flex", gap:12, fontSize:"0.65rem", color:"rgba(255,255,255,0.4)", fontWeight:600 }}>
              <span>⏱ {cert.duration}</span>
              <span>📚 {cert.hours}</span>
              <span style={{ color:cert.accent }}>{cert.level}</span>
            </div>
          </div>
        </div>
      ),
      valid: () => true,
    },
  ];

  const current = steps[step];

  async function submit() {
    setSending(true);
    // POST { form, certCode: cert.code } to your API in production
    await new Promise(r => setTimeout(r, 1400));
    setSending(false);
    setSent(true);
  }

  return (
    <div ref={overlayRef} onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      style={{ position:"fixed", inset:0, zIndex:999, background:"rgba(0,0,0,0.78)", backdropFilter:"blur(10px)",
        display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}>

      <div style={{ width:"100%", maxWidth:480, background:"rgba(6,12,24,0.97)",
        border:"1px solid rgba(255,255,255,0.1)", borderRadius:24,
        boxShadow:`0 0 60px ${cert.accent}18`, overflow:"hidden", maxHeight:"94vh", display:"flex", flexDirection:"column" }}>

        {/* Header */}
        <div style={{ padding:"16px 18px 14px", borderBottom:"1px solid rgba(255,255,255,0.06)",
          display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:"0.65rem", fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:cert.accent, marginBottom:2 }}>
              Enrolment · {cert.code}
            </div>
            <div style={{ fontSize:"0.78rem", fontWeight:900, color:"white" }}>{cert.name}</div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer",
            color:"rgba(255,255,255,0.4)", fontSize:20, lineHeight:1, padding:"2px 6px", borderRadius:8 }}>×</button>
        </div>

        {/* Progress dots */}
        {!sent && (
          <div style={{ padding:"10px 18px 0", display:"flex", gap:6 }}>
            {steps.map((_, i) => (
              <div key={i} style={{ height:3, flex:1, borderRadius:2,
                background: i <= step ? cert.accent : "rgba(255,255,255,0.08)",
                transition:"background 0.3s" }} />
            ))}
          </div>
        )}

        {/* Body */}
        <div style={{ flex:1, overflowY:"auto", padding:"16px 18px" }}>
          {sent ? (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", padding:"20px 0 10px" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>🎉</div>
              <h3 style={{ fontSize:"1.1rem", fontWeight:900, color:"white", marginBottom:6 }}>Enrolment Received!</h3>
              <p style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.5)", lineHeight:1.7, fontWeight:500, maxWidth:320, marginBottom:16 }}>
                Thank you, {form.firstName}! We&apos;ve received your enrolment for <strong style={{ color:"white" }}>{cert.name}</strong>. Check your inbox at <span style={{ color:cert.accent }}>{form.email}</span> — we&apos;ll send your onboarding details within 24 hours.
              </p>
              <button onClick={onClose}
                style={{ padding:"11px 28px", borderRadius:13, fontWeight:900, fontSize:"0.8rem", color:"white",
                  cursor:"pointer", border:"none", background:`linear-gradient(135deg,${cert.accent},${cert.accent}80)` }}>
                Continue Exploring →
              </button>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ marginBottom:2 }}>
                <div style={{ fontSize:"0.75rem", fontWeight:900, color:"white", marginBottom:1 }}>{current.title}</div>
                <div style={{ fontSize:"0.65rem", fontWeight:600, color:"rgba(255,255,255,0.3)" }}>
                  Step {step + 1} of {steps.length} · {current.subtitle}
                </div>
              </div>

              {current.fields}

              <div style={{ display:"flex", gap:8, marginTop:4 }}>
                {step > 0 && (
                  <button onClick={() => setStep(s => s - 1)}
                    style={{ flex:1, padding:"11px", borderRadius:12, fontWeight:800, fontSize:"0.75rem",
                      cursor:"pointer", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.6)" }}>
                    ← Back
                  </button>
                )}
                {step < steps.length - 1 ? (
                  <button onClick={() => setStep(s => s + 1)} disabled={!current.valid()}
                    style={{ flex:2, padding:"11px", borderRadius:12, fontWeight:900, fontSize:"0.8rem",
                      cursor:"pointer", border:"none", color:"white",
                      background:`linear-gradient(135deg,${cert.accent},${cert.accent}80)`,
                      opacity: current.valid() ? 1 : 0.4 }}>
                    Continue →
                  </button>
                ) : (
                  <button onClick={submit} disabled={sending}
                    style={{ flex:2, padding:"11px", borderRadius:12, fontWeight:900, fontSize:"0.8rem",
                      cursor:"pointer", border:"none", color:"white",
                      background:`linear-gradient(135deg,${cert.accent},${cert.accent}80)`,
                      opacity: sending ? 0.5 : 1 }}>
                    {sending ? "Submitting…" : "Complete Enrolment →"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div style={{ padding:"8px 18px 12px", borderTop:"1px solid rgba(255,255,255,0.05)", textAlign:"center" }}>
          <p style={{ fontSize:"0.58rem", color:"rgba(255,255,255,0.18)", fontWeight:500 }}>
            Your data is handled under our Privacy Policy · GDPR & NDPR compliant
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Shared input styles ───────────────────────────────────────────
const lbl: React.CSSProperties = {
  display:"block", fontSize:"0.62rem", fontWeight:700, letterSpacing:"0.07em",
  textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:5,
};
const inp: React.CSSProperties = {
  width:"100%", padding:"9px 12px", borderRadius:10, background:"rgba(255,255,255,0.04)",
  border:"1px solid rgba(255,255,255,0.1)", color:"white", fontSize:"0.78rem", fontWeight:600,
  outline:"none", fontFamily:"inherit", boxSizing:"border-box",
};
const optBtn: React.CSSProperties = {
  display:"block", width:"100%", textAlign:"left", padding:"8px 12px", borderRadius:10,
  marginBottom:5, cursor:"pointer", fontSize:"0.72rem", fontWeight:700,
  background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
  color:"rgba(255,255,255,0.7)", transition:"background 0.15s, border-color 0.15s",
};
const optBtnSel: React.CSSProperties = {
  color:"white",
};

// ── Page ─────────────────────────────────────────────────────────
export default function CertificationsPage() {
  const [enrolCert, setEnrolCert] = useState<Cert | null>(null);

  return (
    <main className="bg-[#050810] min-h-screen text-white font-sans antialiased">
      <style>{`
        .cert-card {
          background: rgba(13,22,34,0.65);
          backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .cert-card:hover { border-color:rgba(255,255,255,0.15); transform:translateY(-2px); }
      `}</style>

      {enrolCert && <EnrolModal cert={enrolCert} onClose={() => setEnrolCert(null)} />}

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(168,85,247,0.07),transparent)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HERO */}
        <div className="pt-32 pb-14 text-center">
          <Link href="/divisions/institute" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors mb-7">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
            Institute Division
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-400/25 bg-violet-400/8 text-violet-300 text-[10px] font-black uppercase tracking-[0.18em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Certifications
          </div>
          <h1 className="font-black text-4xl sm:text-5xl lg:text-7xl tracking-[-0.04em] leading-[1.02] mb-5 max-w-5xl mx-auto">
            Credentials That{" "}
            <span style={{ background:"linear-gradient(135deg,#a855f7,#00c8ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Actually Matter
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 font-semibold">
            Industry-recognised AI certifications built with practitioners, validated by employers, earned through real work — not just multiple choice tests.
          </p>
        </div>

        {/* PROCESS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {PROCESS.map((p, i) => (
            <div key={i} className="cert-card p-4 text-center">
              <div className="text-[9px] font-black uppercase tracking-widest text-violet-400 mb-1.5">{p.n}</div>
              <h3 className="font-black text-white text-sm mb-1.5">{p.title}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{p.body}</p>
            </div>
          ))}
        </div>

        {/* CATALOGUE */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-7">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">Available Certifications</h2>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/25">{CERTS.length} programmes</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTS.map(c => (
              <div key={c.code} className="cert-card p-5 flex flex-col"
                style={{ borderTopColor:`${c.accent}25` }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded"
                      style={{ background:`${c.accent}15`, color:c.accent }}>{c.code}</span>
                    <div className="mt-1.5 text-[8px] font-black uppercase tracking-widest text-white/25">{c.level}</div>
                  </div>
                  <span className="text-2xl">{c.icon}</span>
                </div>
                <h3 className="font-black text-white text-sm mb-2 leading-tight">{c.name}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed flex-1 mb-3 font-medium">{c.desc}</p>
                <div className="flex items-center justify-between text-[9px] font-semibold text-slate-500 border-t border-white/6 pt-3 mb-3">
                  <span>⏱ {c.duration}</span>
                  <span>📚 {c.hours}</span>
                </div>
                <button onClick={() => setEnrolCert(c)}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-black text-xs text-white transition-all hover:-translate-y-0.5 border-none cursor-pointer"
                  style={{ background:`linear-gradient(135deg,${c.accent}90,${c.accent}50)`, border:`1px solid ${c.accent}40` }}>
                  Enrol Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}