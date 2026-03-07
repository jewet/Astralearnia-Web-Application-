"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";

type Step = 1 | 2 | 3;
type DemoType = "technology" | "institute" | "both";

const SLOTS = ["9:00 AM","10:00 AM","11:00 AM","1:00 PM","2:00 PM","3:00 PM","4:00 PM"];
const DAYS  = ["Mon 10 Mar","Tue 11 Mar","Wed 12 Mar","Thu 13 Mar","Fri 14 Mar"];

const DEMOS: { key: DemoType; icon: string; title: string; desc: string; color: string; bullets: string[] }[] = [
  { key:"technology", icon:"⚡", title:"AI Technology Demo", color:"#00c8ff", desc:"See our AI infrastructure, APIs, and automation in action with your use case.",
    bullets:["Live platform walkthrough","Custom data integration preview","Pricing & timeline","Q&A with an engineer"] },
  { key:"institute", icon:"🎓", title:"Institute Learning Demo", color:"#a855f7", desc:"Experience our adaptive learning engine and see how we train teams at scale.",
    bullets:["Adaptive pathway demo","Skills analytics dashboard","Certification overview","ROI calculation session"] },
  { key:"both", icon:"✦", title:"Full Platform Demo", color:"#00ffb2", desc:"The complete Astralearnia picture — both divisions, one unified session.",
    bullets:["Technology + Institute demo","Integration possibilities","Enterprise pricing","Custom roadmap"] },
];

function Field({ label, type="text", value, onChange, placeholder, required=false }:
  { label:string; type?:string; value:string; onChange:(v:string)=>void; placeholder:string; required?:boolean }) {
  return (
    <div>
      <label className="block text-[10px] font-black uppercase tracking-[0.16em] text-white/35 mb-1.5">{label}</label>
      <input type={type} required={required} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
        onFocus={e=>(e.target.style.borderColor="rgba(0,200,255,0.45)")}
        onBlur={e=>(e.target.style.borderColor="rgba(255,255,255,0.09)")}
      />
    </div>
  );
}

export default function BookDemoPage() {
  const [step, setStep] = useState<Step>(1);
  const [demoType, setDemoType] = useState<DemoType|null>(null);
  const [day, setDay]   = useState<string|null>(null);
  const [slot, setSlot] = useState<string|null>(null);
  const [form, setForm] = useState({ name:"", email:"", company:"", role:"", notes:"" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => setForm(p=>({...p,[k]:v}));
  const selected = DEMOS.find(d=>d.key===demoType);

  const submit = async (e: FormEvent) => {
    e.preventDefault(); setBusy(true);
    await fetch("/api/contact",{ method:"POST",headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ firstName:form.name.split(" ")[0], lastName:form.name.split(" ").slice(1).join(" "),
        email:form.email, organization:form.company, division:demoType==="institute"?"institute":"technology",
        reason:`Demo: ${demoType} — ${day} at ${slot}`, message:`Role: ${form.role}\n\n${form.notes}`, source:"/book-demo" })
    }).catch(()=>{});
    setBusy(false); setDone(true);
  };

  if (done) return (
    <main className="bg-[#040710] min-h-screen flex items-center justify-center p-6 text-white font-sans">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-7"
          style={{ background:"rgba(0,200,255,0.08)", border:"1px solid rgba(0,200,255,0.35)", boxShadow:"0 0 50px rgba(0,200,255,0.2)" }}>✓</div>
        <h1 className="text-4xl font-black mb-3">Demo Booked!</h1>
        <p className="text-white/50 text-base leading-relaxed mb-2">Slot reserved for <strong className="text-white">{day} at {slot}</strong>. Calendar invite incoming.</p>
        <p className="text-white/30 text-xs mb-9">Can't make it? Reply to the confirmation email to reschedule.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="px-6 py-3 rounded-xl font-bold text-sm border border-white/12 hover:border-white/25 transition-colors">← Back to Home</Link>
          <Link href="/docs" className="px-6 py-3 rounded-xl font-black text-white text-sm hover:-translate-y-0.5 transition-all" style={{ background:"linear-gradient(135deg,#00c8ff,#7c5cff)" }}>Read the Docs →</Link>
        </div>
      </div>
    </main>
  );

  return (
    <main className="bg-[#040710] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <style>{`
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        .st{background-size:200% auto;animation:shimmer 5s linear infinite;}
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse 80% 50% at 50% -5%,rgba(0,200,255,0.08),transparent)" }} />
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage:"radial-gradient(circle,rgba(0,200,255,.8) 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
      </div>
      {/* top beam */}
      <div className="fixed top-0 inset-x-0 h-[2px] z-50" style={{ background:"linear-gradient(90deg,transparent,#00c8ff 25%,#7c5cff 50%,#00ffb2 75%,transparent)", boxShadow:"0 0 16px rgba(0,200,255,0.5)" }} />

      <section className="relative z-10 pt-32 pb-24 px-6 lg:px-14 max-w-screen-xl mx-auto">

        {/* Step bar */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-0 rounded-full overflow-hidden" style={{ border:"1px solid rgba(255,255,255,0.09)" }}>
            {([1,2,3] as Step[]).map((n,i)=>(
              <div key={n} className="flex items-center">
                <div className="flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wide transition-all duration-300"
                  style={{ background: step===n ? "rgba(0,200,255,0.12)" : "transparent", color: step===n ? "white" : step>n ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.22)" }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all"
                    style={{ background: step>n ? "rgba(0,200,255,0.25)" : step===n ? "#00c8ff" : "rgba(255,255,255,0.07)", color: step===n ? "#040710" : step>n ? "#00c8ff" : "rgba(255,255,255,0.25)" }}>
                    {step>n ? "✓" : n}
                  </span>
                  {n===1?"Choose Demo":n===2?"Pick Slot":"Your Details"}
                </div>
                {i<2 && <div className="w-px h-8 bg-white/8" />}
              </div>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-black text-[clamp(2.5rem,7vw,5rem)] tracking-[-0.04em] mb-3">
            {step===1&&<><span className="text-white">Choose Your </span><span className="st" style={{ background:"linear-gradient(90deg,#00c8ff,#7c5cff,#00c8ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Demo</span></>}
            {step===2&&<><span className="text-white">Pick a </span><span className="st" style={{ background:"linear-gradient(90deg,#00c8ff,#7c5cff,#00c8ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Time Slot</span></>}
            {step===3&&<><span className="text-white">Almost </span><span className="st" style={{ background:"linear-gradient(90deg,#00c8ff,#7c5cff,#00c8ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>There</span></>}
          </h1>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            {step===1&&"Select the type of demo that matches your goals."}
            {step===2&&`${selected?.title} selected. Pick your date and time.`}
            {step===3&&"Tell us a bit about yourself so we can tailor the session."}
          </p>
        </div>

        {/* Step 1 */}
        {step===1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {DEMOS.map(opt=>(
              <button key={opt.key} onClick={()=>{ setDemoType(opt.key); setStep(2); }}
                className="text-left rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group"
                style={{ background:"#0d1622", border:`1px solid rgba(255,255,255,0.08)` }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=opt.color+"45";(e.currentTarget as HTMLElement).style.boxShadow=`0 0 40px ${opt.color}12`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.08)";(e.currentTarget as HTMLElement).style.boxShadow="none";}}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4" style={{ background:`${opt.color}10`, border:`1px solid ${opt.color}22` }}>{opt.icon}</div>
                <h3 className="text-base font-black text-white mb-1.5">{opt.title}</h3>
                <p className="text-xs text-white/45 mb-4 leading-relaxed">{opt.desc}</p>
                <ul className="flex flex-col gap-1.5 mb-5">
                  {opt.bullets.map(b=>(
                    <li key={b} className="flex items-center gap-2 text-xs text-white/50">
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ background:opt.color }} />{b}
                    </li>
                  ))}
                </ul>
                <div className="text-xs font-black group-hover:translate-x-1 transition-transform duration-200" style={{ color:opt.color }}>Select →</div>
              </button>
            ))}
          </div>
        )}

        {/* Step 2 */}
        {step===2 && (
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl p-7" style={{ background:"#0d1622", border:"1px solid rgba(255,255,255,0.09)" }}>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35 mb-3">Select Day</h3>
              <div className="grid grid-cols-5 gap-2 mb-7">
                {DAYS.map(d=>(
                  <button key={d} onClick={()=>setDay(d)}
                    className="py-2.5 px-1 rounded-xl text-[10px] font-bold text-center transition-all duration-200"
                    style={{ background:day===d?"rgba(0,200,255,0.12)":"rgba(255,255,255,0.03)", border:`1px solid ${day===d?"rgba(0,200,255,0.45)":"rgba(255,255,255,0.07)"}`, color:day===d?"#00c8ff":"rgba(255,255,255,0.45)" }}>
                    {d.split(" ").map((p,i)=><span key={i} className="block">{p}</span>)}
                  </button>
                ))}
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35 mb-3">Select Time (WAT)</h3>
              <div className="grid grid-cols-4 gap-2 mb-7">
                {SLOTS.map(s=>(
                  <button key={s} onClick={()=>setSlot(s)}
                    className="py-2.5 rounded-xl text-xs font-bold transition-all duration-200"
                    style={{ background:slot===s?"rgba(0,200,255,0.12)":"rgba(255,255,255,0.03)", border:`1px solid ${slot===s?"rgba(0,200,255,0.45)":"rgba(255,255,255,0.07)"}`, color:slot===s?"#00c8ff":"rgba(255,255,255,0.45)" }}>
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={()=>setStep(1)} className="px-5 py-2.5 rounded-xl font-bold text-xs text-white/40 border border-white/9 hover:border-white/22 transition-colors">← Back</button>
                <button onClick={()=>setStep(3)} disabled={!day||!slot}
                  className="flex-1 py-2.5 rounded-xl font-black text-white text-xs transition-all hover:-translate-y-0.5 disabled:opacity-35"
                  style={{ background:"linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow:"0 6px 22px rgba(0,200,255,0.28)" }}>
                  Continue →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step===3 && (
          <div className="max-w-xl mx-auto">
            <div className="rounded-2xl p-7" style={{ background:"#0d1622", border:"1px solid rgba(0,200,255,0.18)" }}>
              {/* summary */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl mb-7" style={{ background:"rgba(0,200,255,0.06)", border:"1px solid rgba(0,200,255,0.15)" }}>
                <span className="text-xl">{selected?.icon}</span>
                <div className="flex-1 text-sm">
                  <div className="font-black text-white">{selected?.title}</div>
                  <div className="text-white/40 text-xs mt-0.5">{day} · {slot} WAT</div>
                </div>
                <button onClick={()=>setStep(2)} className="text-[10px] text-white/25 hover:text-white/50 transition-colors font-black uppercase tracking-wider">Change</button>
              </div>

              <form onSubmit={submit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name *" value={form.name} onChange={set("name")} placeholder="Amara Osei" required />
                  <Field label="Work Email *" type="email" value={form.email} onChange={set("email")} placeholder="amara@company.com" required />
                  <Field label="Company" value={form.company} onChange={set("company")} placeholder="Acme Corp" />
                  <Field label="Your Role" value={form.role} onChange={set("role")} placeholder="CTO / Head of L&D" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.16em] text-white/35 mb-1.5">Anything to prep? (Optional)</label>
                  <textarea rows={3} value={form.notes} onChange={e=>set("notes")(e.target.value)} placeholder="Tech stack, company size, specific challenges…"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all resize-none"
                    style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)" }}
                    onFocus={e=>(e.target.style.borderColor="rgba(0,200,255,0.4)")}
                    onBlur={e=>(e.target.style.borderColor="rgba(255,255,255,0.09)")}
                  />
                </div>
                <div className="flex gap-3 mt-1">
                  <button type="button" onClick={()=>setStep(2)} className="px-5 py-3 rounded-xl font-bold text-xs text-white/40 border border-white/9 hover:border-white/22 transition-colors">← Back</button>
                  <button type="submit" disabled={busy}
                    className="flex-1 py-3 rounded-xl font-black text-white text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5 disabled:opacity-50"
                    style={{ background:"linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow:"0 8px 26px rgba(0,200,255,0.3)" }}>
                    {busy ? <span className="flex items-center justify-center gap-2"><span className="w-3.5 h-3.5 rounded-full border-2 border-white/25 border-t-white animate-spin" />Booking…</span> : "Confirm Demo →"}
                  </button>
                </div>
                <p className="text-center text-[10px] text-white/20">30 minutes · Video call · No obligation</p>
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}