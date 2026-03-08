"use client";
// ─────────────────────────────────────────────────────────────────
// FILE: app/partners/page.tsx
// Partnership enquiry page with form
// ─────────────────────────────────────────────────────────────────
import { useState } from "react";
import Link from "next/link";

const PARTNER_TYPES = [
  { id:"reseller",    icon:"🏪", title:"Reseller / Distributor",  body:"Sell Astralearnia products to your clients. Earn competitive margins with full onboarding and sales support." },
  { id:"integration", icon:"🔗", title:"Technology Integration",   body:"Build native connectors to your platform. Access our APIs, dev sandbox, and co-marketing opportunities." },
  { id:"content",     icon:"📚", title:"Content Partner",          body:"License your expert content for the Astralearnia Institute catalogue. Reach 12,000+ active learners." },
  { id:"consulting",  icon:"💼", title:"Implementation Consultant", body:"Get certified to deploy and optimise Astralearnia for enterprise clients. Join our partner directory." },
  { id:"academic",    icon:"🎓", title:"Academic Institution",      body:"Integrate Astralearnia certifications into your programmes. Co-issue credentials with your brand." },
  { id:"other",       icon:"✦",  title:"Something Else",           body:"Have a different idea? We're open to creative partnerships that create mutual value." },
];

const PERKS = [
  { icon:"💰", label:"Revenue sharing",      body:"Competitive margins on every deal you source or close." },
  { icon:"🎓", label:"Partner certification",body:"Your team gets free access to all Astralearnia certifications." },
  { icon:"📣", label:"Co-marketing",         body:"Joint campaigns, case studies, and shared press coverage." },
  { icon:"🛠", label:"Technical support",    body:"Dedicated partner engineering and priority developer access." },
  { icon:"🌍", label:"Partner directory",    body:"Listed on our global partner page, seen by 500+ enterprise buyers." },
  { icon:"📊", label:"Partner dashboard",    body:"Track referrals, commissions, and deal pipeline in real time." },
];

type FormState = { name:string; email:string; company:string; type:string; message:string; };

export default function PartnersPage() {
  const [form, setForm]     = useState<FormState>({ name:"", email:"", company:"", type:"", message:"" });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);

  function set(k: keyof FormState, v: string) { setForm(f => ({ ...f, [k]: v })); }

  async function submit() {
    if (!form.name || !form.email || !form.type) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  }

  return (
    <main className="bg-[#050810] min-h-screen text-white font-sans antialiased">
      <style>{`
        .par-card {
          background: rgba(13,22,34,0.65);
          backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          transition: border-color 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .par-card:hover, .par-card.selected { border-color:rgba(0,200,255,0.35); transform:translateY(-1px); }
        .par-card.selected { background: rgba(0,200,255,0.06); }
        .par-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 16px;
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
          outline: none;
          transition: border-color 0.2s;
          font-family: inherit;
        }
        .par-input:focus { border-color: rgba(0,200,255,0.4); }
        .par-input::placeholder { color: rgba(255,255,255,0.25); }
        .par-label { font-size:0.7rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.35); margin-bottom:6px; display:block; }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(0,200,255,0.06),transparent)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HERO */}
        <div className="pt-32 pb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/25 bg-cyan-400/8 text-cyan-300 text-[10px] font-black uppercase tracking-[0.18em] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Partner With Us
          </div>
          <h1 className="font-black text-4xl sm:text-5xl lg:text-7xl tracking-[-0.04em] leading-[1.02] mb-6 max-w-5xl mx-auto">
            Grow Together With{" "}
            <span style={{ background:"linear-gradient(135deg,#00c8ff,#7c5cff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Astralearnia
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-semibold">
            Join a growing ecosystem of resellers, integrators, content creators, and educators building the future of AI-powered work and learning.
          </p>
        </div>

        {/* PERKS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-20">
          {PERKS.map(p => (
            <div key={p.label} className="par-card p-5" style={{ cursor:"default" }}>
              <div className="text-2xl mb-2">{p.icon}</div>
              <div className="font-black text-white text-sm mb-1">{p.label}</div>
              <div className="text-xs text-slate-400 font-medium leading-relaxed">{p.body}</div>
            </div>
          ))}
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24 items-start">

          {/* Left — partner type selector */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-[0.18em] mb-6">Partnership Type</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PARTNER_TYPES.map(pt => (
                <div key={pt.id}
                  className={`par-card p-4 ${form.type === pt.id ? "selected" : ""}`}
                  onClick={() => set("type", pt.id)}>
                  <div className="text-xl mb-2">{pt.icon}</div>
                  <div className="font-black text-white text-xs mb-1.5">{pt.title}</div>
                  <div className="text-[11px] text-slate-400 font-medium leading-relaxed">{pt.body}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — enquiry form */}
          <div className="par-card p-7 lg:sticky lg:top-8" style={{ cursor:"default" }}>
            {sent ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-black text-white text-xl mb-3">Application Received!</h3>
                <p className="text-slate-400 font-medium leading-relaxed mb-6">
                  Our partnerships team will review your application and reach out within 2 business days.
                </p>
                <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm border border-white/20 text-white hover:border-white/40 transition-all">
                  Back to Home
                </Link>
              </div>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-[0.18em] mb-6">Partnership Enquiry</div>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="par-label">Full Name *</label>
                    <input className="par-input" placeholder="Jane Okonkwo" value={form.name} onChange={e => set("name", e.target.value)} />
                  </div>
                  <div>
                    <label className="par-label">Work Email *</label>
                    <input className="par-input" type="email" placeholder="jane@company.com" value={form.email} onChange={e => set("email", e.target.value)} />
                  </div>
                  <div>
                    <label className="par-label">Company / Organisation</label>
                    <input className="par-input" placeholder="Acme Corp" value={form.company} onChange={e => set("company", e.target.value)} />
                  </div>
                  <div>
                    <label className="par-label">Partnership type *</label>
                    <div className="par-input" style={{ padding:"10px 14px", fontSize:"0.8rem", color: form.type ? "white" : "rgba(255,255,255,0.25)" }}>
                      {form.type ? PARTNER_TYPES.find(p => p.id === form.type)?.title : "Select a partnership type above ↑"}
                    </div>
                  </div>
                  <div>
                    <label className="par-label">Tell us more</label>
                    <textarea className="par-input" rows={4} placeholder="Describe your company, your audience, and what kind of partnership you're interested in..." value={form.message} onChange={e => set("message", e.target.value)} style={{ resize:"vertical" }} />
                  </div>
                  <button
                    onClick={submit}
                    disabled={loading || !form.name || !form.email || !form.type}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-black text-sm text-white transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background:"linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow:"0 0 24px rgba(0,200,255,0.3)" }}>
                    {loading ? "Submitting…" : "Submit Partnership Enquiry →"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}