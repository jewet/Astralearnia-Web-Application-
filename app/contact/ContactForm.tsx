"use client";
import { useState, type FormEvent } from "react";

export type Division = "technology" | "institute" | "general";
type FormState = "idle" | "sending" | "success" | "error";

interface Props {
  division: Division;
  accentColor?: string;        // hex
  secondaryColor?: string;
  source?: string;             // page identifier sent to API
}

const REASONS: Record<Division, string[]> = {
  technology: [
    "Custom AI Model Development",
    "Decision Intelligence Suite",
    "API & SDK Integration",
    "Data Automation Pipeline",
    "Enterprise Deployment",
    "Security & Compliance Audit",
    "Technical Partnership",
    "General Technology Enquiry",
  ],
  institute: [
    "Corporate Training Programme",
    "AI Certification for Staff",
    "School / University Partnership",
    "Adaptive Learning Platform Demo",
    "Custom Curriculum Development",
    "Skills Gap Analysis",
    "LMS Integration",
    "General Institute Enquiry",
  ],
  general: [
    "Enterprise Demo",
    "School Demo",
    "API Access",
    "Partnership",
    "Press & Media",
    "General Enquiry",
  ],
};

const BUDGETS = [
  "Under $5,000",
  "$5,000 – $20,000",
  "$20,000 – $50,000",
  "$50,000 – $150,000",
  "$150,000+",
  "Not sure yet",
];

const TEAM_SIZES = ["1 – 10", "11 – 50", "51 – 200", "201 – 1,000", "1,000+"];

export function ContactFormFull({ division, accentColor = "#00c8ff", secondaryColor = "#7c5cff", source }: Props) {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", organization: "",
    phone: "", reason: "", budget: "", teamSize: "", message: "",
  });

  const isInstitute = division === "institute";

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, division, source }),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  };

  const inputCls = `w-full px-4 py-3 rounded-xl text-sm text-white 
    bg-white/[0.04] border border-white/[0.09] placeholder:text-white/20
    focus:outline-none focus:border-[${accentColor}]/50 focus:bg-white/[0.06]
    transition-all duration-200`;

  const labelCls = "block text-[11px] font-bold uppercase tracking-[0.16em] text-white/40 mb-2";

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[520px] text-center gap-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
          style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}50`, boxShadow: `0 0 40px ${accentColor}30` }}>
          ✓
        </div>
        <div>
          <h3 className="text-3xl font-black text-white mb-3">Message Sent!</h3>
          <p className="text-white/50 max-w-sm leading-relaxed">
            We've received your enquiry. A specialist will reach out within <strong className="text-white/80">24 business hours</strong>.
            Check your inbox for a confirmation.
          </p>
        </div>
        <button onClick={() => { setState("idle"); setForm({ firstName:"",lastName:"",email:"",organization:"",phone:"",reason:"",budget:"",teamSize:"",message:"" }); }}
          className="text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors mt-2">
          Send Another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>First Name *</label>
          <input required type="text" value={form.firstName} onChange={set("firstName")} placeholder="Ada" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Last Name *</label>
          <input required type="text" value={form.lastName} onChange={set("lastName")} placeholder="Okafor" className={inputCls} />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Work Email *</label>
          <input required type="email" value={form.email} onChange={set("email")} placeholder="ada@company.com" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Phone</label>
          <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+234 800 000 0000" className={inputCls} />
        </div>
      </div>

      {/* Organisation */}
      <div>
        <label className={labelCls}>{isInstitute ? "School / Organisation" : "Organisation"}</label>
        <input type="text" value={form.organization} onChange={set("organization")} placeholder={isInstitute ? "University of Lagos" : "Acme Corp"} className={inputCls} />
      </div>

      {/* Reason + Budget */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>How Can We Help? *</label>
          <select required value={form.reason} onChange={set("reason")} className={inputCls + " appearance-none cursor-pointer"}>
            <option value="" disabled>Select a reason</option>
            {REASONS[division].map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>{isInstitute ? "Learner Count" : "Budget Range"}</label>
          {isInstitute ? (
            <select value={form.budget} onChange={set("budget")} className={inputCls + " appearance-none cursor-pointer"}>
              <option value="">Select range</option>
              {["Under 50", "50 – 200", "200 – 1,000", "1,000 – 5,000", "5,000+"].map(t => <option key={t} value={t}>{t} learners</option>)}
            </select>
          ) : (
            <select value={form.budget} onChange={set("budget")} className={inputCls + " appearance-none cursor-pointer"}>
              <option value="">Select range</option>
              {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          )}
        </div>
      </div>

      {/* Team Size */}
      <div>
        <label className={labelCls}>Team / Organisation Size</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {TEAM_SIZES.map(s => (
            <button key={s} type="button"
              onClick={() => setForm(p => ({ ...p, teamSize: s }))}
              className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200"
              style={{
                border: `1px solid ${form.teamSize === s ? accentColor + "80" : "rgba(255,255,255,0.09)"}`,
                background: form.teamSize === s ? `${accentColor}18` : "rgba(255,255,255,0.03)",
                color: form.teamSize === s ? "#fff" : "rgba(255,255,255,0.4)",
                boxShadow: form.teamSize === s ? `0 0 14px ${accentColor}30` : "none",
              }}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className={labelCls}>Tell Us More *</label>
        <textarea required rows={5} value={form.message} onChange={set("message")}
          placeholder={isInstitute
            ? "Describe your training goals, current challenges, or the skills you want your team to develop…"
            : "Describe your project, data sources, current stack, or the problem you need to solve…"}
          className={inputCls + " resize-none"} />
      </div>

      {state === "error" && (
        <div className="px-4 py-3 rounded-xl text-xs text-red-300 bg-red-400/10 border border-red-400/20 font-medium">
          ⚠ Something went wrong. Please try again or email us directly.
        </div>
      )}

      <button type="submit" disabled={state === "sending"}
        className="relative w-full py-4 rounded-xl font-black text-white text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60"
        style={{ background: `linear-gradient(135deg, ${accentColor}, ${secondaryColor})`, boxShadow: `0 8px 28px ${accentColor}45` }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 14px 40px ${accentColor}65`; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 28px ${accentColor}45`; }}
      >
        {state === "sending" ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Sending…
          </span>
        ) : (
          <span className="relative z-10">Send Message →</span>
        )}
      </button>

      <p className="text-center text-[11px] text-white/25 font-medium">
        No spam. We reply within 24 hours. Your data is never sold.
      </p>
    </form>
  );
}