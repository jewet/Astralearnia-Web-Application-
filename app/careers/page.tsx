// ─── app/careers/page.tsx ─────────────────────────────────────────────────────
// All original code preserved. Additions:
//  • 3 new roles: Seasonal Marketer, DevOps Engineer, Fullstack AI Developer
//  • Apply button opens a full modal application form
//  • Modal POSTs to /api/contact (your existing Resend route)
// ─────────────────────────────────────────────────────────────────────────────
"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const roles = [
  // ── original roles ─────────────────────────────────────────────────────────
  { title: "Senior ML Engineer",       team: "Technology", location: "Lagos / Remote", type: "Full-time", level: "Senior", tags: ["Python", "PyTorch", "MLOps"] },
  { title: "AI Curriculum Designer",   team: "Institute",  location: "Lagos / Remote", type: "Full-time", level: "Mid",    tags: ["Instructional Design", "AI/ML"] },
  { title: "Backend Engineer (API)",   team: "Technology", location: "Remote",         type: "Full-time", level: "Senior", tags: ["Go", "Node.js", "Kubernetes"] },
  { title: "Enterprise Account Exec",  team: "Sales",      location: "Lagos, Nairobi", type: "Full-time", level: "Senior", tags: ["B2B SaaS", "Enterprise Sales"] },
  { title: "Data Engineer",            team: "Technology", location: "Lagos / Remote", type: "Full-time", level: "Mid",    tags: ["dbt", "Spark", "Airflow"] },
  { title: "Learning Experience Lead", team: "Institute",  location: "Lagos",          type: "Full-time", level: "Senior", tags: ["L&D", "EdTech", "Video Production"] },
  { title: "Product Designer",         team: "Product",    location: "Remote",         type: "Full-time", level: "Mid",    tags: ["Figma", "Motion Design", "B2B UX"] },
  { title: "DevRel Engineer",          team: "Technology", location: "Remote",         type: "Full-time", level: "Mid",    tags: ["APIs", "Technical Writing", "Community"] },
  // ── new roles ──────────────────────────────────────────────────────────────
  {
    title: "Seasonal Marketer",
    team: "Sales", location: "Lagos / Remote", type: "Contract", level: "Mid",
    tags: ["Content Marketing", "SEO", "Paid Social", "Email Campaigns"],
  },
  {
    title: "DevOps Engineer",
    team: "Technology", location: "Remote", type: "Full-time", level: "Senior",
    tags: ["Jenkins", "Terraform", "Docker", "Kubernetes", "Kafka", "Grafana", "Prometheus", "CI/CD", "Microservices"],
  },
  {
    title: "Fullstack AI Developer",
    team: "Technology", location: "Lagos / Remote", type: "Full-time", level: "Senior",
    tags: ["Python", "TypeScript", "Next.js", "FastAPI", "LLMs", "Vector DBs", "AI Agents"],
  },
];

const perks = [
  { icon: "🌍", title: "Remote-First",         desc: "Work from anywhere in Africa or globally. We care about your output, not your postcode.",               color: "#00c8ff" },
  { icon: "📚", title: "Free Institute Access", desc: "Full access to all AstraLearn courses and certifications from day one.",                                 color: "#a855f7" },
  { icon: "⚡", title: "Fast Growth",           desc: "Early-stage startup with real traction. Your work ships to 500+ enterprises immediately.",                color: "#00ffb2" },
  { icon: "💰", title: "Competitive Pay",       desc: "Market-rate salaries benchmarked globally, plus meaningful equity as we scale.",                         color: "#fbbf24" },
  { icon: "🔒", title: "Health Cover",          desc: "Comprehensive medical, dental, and optical for you and your dependants.",                                 color: "#ff6ec7" },
  { icon: "✈️",  title: "Annual Retreat",        desc: "All-team gatherings twice a year. Last one was in Cape Town. Next is Kigali.",                            color: "#7c5cff" },
];

const teamColors: Record<string, { bg: string; color: string }> = {
  Technology: { bg: "rgba(0,200,255,0.12)",   color: "#00c8ff"  },
  Institute:  { bg: "rgba(168,85,247,0.12)",  color: "#a855f7"  },
  Sales:      { bg: "rgba(0,255,178,0.12)",   color: "#00ffb2"  },
  Product:    { bg: "rgba(255,110,199,0.12)", color: "#ff6ec7"  },
};

// ─── Division mapper (team → API division) ───────────────────────────────────
function toDivision(team: string): "technology" | "institute" | "general" {
  if (team === "Technology" || team === "Product") return "technology";
  if (team === "Institute") return "institute";
  return "general";
}

// ─── Intersection observer hook ─────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Input helpers ───────────────────────────────────────────────────────────
const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-white bg-white/[0.04] border border-white/10 placeholder:text-white/25 focus:outline-none focus:border-cyan-400/50 transition-all";
const labelClass = "block text-xs font-black uppercase tracking-wider text-white/40 mb-1.5";

// ─── Apply Modal ─────────────────────────────────────────────────────────────
function ApplyModal({ role, onClose }: { role: typeof roles[0]; onClose: () => void }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    linkedin: "", portfolio: "", experience: "", location: "", coverLetter: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.firstName || !form.email || !form.coverLetter) {
      setErrorMsg("Please fill in First Name, Email, and Cover Letter."); return;
    }
    setErrorMsg("");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName:    form.firstName,
          lastName:     form.lastName,
          email:        form.email,
          phone:        form.phone,
          organization: [form.linkedin, form.portfolio].filter(Boolean).join(" | "),
          division:     toDivision(role.team),
          reason:       `Job Application — ${role.title}`,
          message:      `Experience: ${form.experience || "Not specified"}\nLocation: ${form.location || "Not specified"}\n\nCover Letter:\n${form.coverLetter}`,
          source:       "careers-page",
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email careers@astralearnia.com");
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center px-0 sm:px-4 py-0 sm:py-6"
      style={{ backdropFilter: "blur(12px)", background: "rgba(5,8,16,0.85)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>

      <div className="relative w-full sm:max-w-2xl max-h-[96dvh] sm:max-h-[88vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl flex flex-col"
        style={{ background: "#0d1622", border: "1px solid rgba(0,200,255,0.2)", boxShadow: "0 0 80px rgba(0,200,255,0.12)" }}>

        {/* ── header ── */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-5 sm:px-7 pt-5 sm:pt-7 pb-4 border-b border-white/[0.07]"
          style={{ background: "#0d1622" }}>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Applying for</div>
            <h2 className="text-lg sm:text-xl font-black text-white leading-tight">{role.title}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {(() => { const tc = teamColors[role.team] || { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }; return (
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider" style={{ background: tc.bg, color: tc.color }}>{role.team}</span>
              ); })()}
              <span className="text-xs text-white/35">📍 {role.location}</span>
              <span className="text-xs text-white/35">· {role.type}</span>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close modal"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.07] transition-all shrink-0 mt-0.5"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            ✕
          </button>
        </div>

        {/* ── success state ── */}
        {status === "sent" ? (
          <div className="flex flex-col items-center justify-center gap-5 px-7 py-16 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
              style={{ background: "rgba(0,255,178,0.12)", border: "2px solid rgba(0,255,178,0.35)", color: "#00ffb2" }}>✓</div>
            <div>
              <h3 className="text-xl font-black text-white mb-2">Application Sent!</h3>
              <p className="text-sm text-white/50 max-w-sm leading-relaxed">
                Thank you, {form.firstName}. We review every application and will be in touch within 5 business days if there&apos;s a fit.
              </p>
            </div>
            <button onClick={onClose}
              className="px-7 py-3 rounded-xl text-sm font-black text-white transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 6px 20px rgba(0,200,255,0.3)" }}>
              Close
            </button>
          </div>
        ) : (
          <>
            {/* ── form body ── */}
            <div className="px-5 sm:px-7 py-6 space-y-5 flex-1">

              {/* name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>First Name <span className="text-cyan-400">*</span></label>
                  <input type="text" value={form.firstName} onChange={set("firstName")} placeholder="Ada" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input type="text" value={form.lastName} onChange={set("lastName")} placeholder="Okonkwo" className={inputClass} />
                </div>
              </div>

              {/* email + phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Email <span className="text-cyan-400">*</span></label>
                  <input type="email" value={form.email} onChange={set("email")} placeholder="ada@email.com" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+234 800 000 0000" className={inputClass} />
                </div>
              </div>

              {/* linkedin + portfolio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>LinkedIn URL</label>
                  <input type="url" value={form.linkedin} onChange={set("linkedin")} placeholder="linkedin.com/in/you" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Portfolio / GitHub</label>
                  <input type="url" value={form.portfolio} onChange={set("portfolio")} placeholder="github.com/you" className={inputClass} />
                </div>
              </div>

              {/* experience + location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Years of Experience</label>
                  <select value={form.experience} onChange={set("experience")} className={inputClass + " cursor-pointer"}>
                    <option value="">Select range</option>
                    <option>0–1 years</option>
                    <option>2–3 years</option>
                    <option>4–6 years</option>
                    <option>7–10 years</option>
                    <option>10+ years</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Current Location</label>
                  <input type="text" value={form.location} onChange={set("location")} placeholder="Lagos, Nigeria" className={inputClass} />
                </div>
              </div>

              {/* cover letter */}
              <div>
                <label className={labelClass}>Cover Letter <span className="text-cyan-400">*</span></label>
                <textarea value={form.coverLetter} onChange={set("coverLetter")} rows={6}
                  placeholder={`Tell us why you'd be a great fit for the ${role.title} role, and what specifically excites you about Astralearnia's mission...`}
                  className={inputClass + " resize-none leading-relaxed"} />
                <p className="mt-1.5 text-[11px] text-white/25">Tip: mention a specific project, metric, or result. Generic letters get passed over.</p>
              </div>

              {/* tags reminder */}
              <div className="rounded-xl px-4 py-3 flex flex-wrap gap-2"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/25 w-full mb-1">Skills we&apos;re looking for</span>
                {role.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white/50"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>{t}</span>
                ))}
              </div>

              {/* error */}
              {errorMsg && (
                <p className="text-xs font-bold text-red-400/80 px-1">{errorMsg}</p>
              )}
            </div>

            {/* ── footer / submit ── */}
            <div className="sticky bottom-0 px-5 sm:px-7 py-4 border-t border-white/[0.07] flex flex-col sm:flex-row items-center gap-3"
              style={{ background: "#0d1622" }}>
              <p className="text-[11px] text-white/25 leading-relaxed text-center sm:text-left flex-1">
                By submitting you agree to Astralearnia processing your data for recruitment purposes.
              </p>
              <div className="flex gap-3 w-full sm:w-auto">
                <button onClick={onClose}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-xl text-sm font-black text-white/50 hover:text-white transition-all"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  Cancel
                </button>
                <button onClick={submit} disabled={status === "sending"}
                  className="flex-1 sm:flex-none px-7 py-3 rounded-xl text-sm font-black text-white transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 6px 20px rgba(0,200,255,0.3)" }}>
                  {status === "sending" ? "Sending…" : "Submit Application →"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CareersPage() {
  const [filter,      setFilter]      = useState("All");
  const [applyRole,   setApplyRole]   = useState<typeof roles[0] | null>(null);
  const teams    = ["All", "Technology", "Institute", "Sales", "Product"];
  const filtered = filter === "All" ? roles : roles.filter(r => r.team === filter);

  return (
    <main className="bg-[#040710] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <style>{`
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulse-ring { 0%{transform:scale(0.95);opacity:1} 100%{transform:scale(1.4);opacity:0} }
        .shimmer-text { background-size: 200% auto; animation: shimmer 4s linear infinite; }
        .float-icon { animation: float 5s ease-in-out infinite; }
      `}</style>

      {/* ── apply modal ── */}
      {applyRole && <ApplyModal role={applyRole} onClose={() => setApplyRole(null)} />}

      {/* background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(0,200,255,0.08), transparent)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 90% 70%, rgba(168,85,247,0.06), transparent)" }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, rgba(0,200,255,0.9) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      </div>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative z-10 pt-32 pb-14 px-6 lg:px-14 max-w-screen-xl mx-auto">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.18em] mb-7"
            style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)" }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" style={{ animation: "pulse-ring 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            {roles.length} Open Roles
          </div>
        </FadeIn>
        <FadeIn delay={70}>
          <h1 className="font-black leading-[0.95] tracking-[-0.045em] text-[clamp(3rem,8vw,6.5rem)] max-w-4xl mb-6">
            <span className="block text-white">Build the Future of</span>
            <span className="block shimmer-text" style={{ background: "linear-gradient(90deg,#00c8ff,#7c5cff,#00ffb2,#00c8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              AI & Learning
            </span>
          </h1>
        </FadeIn>
        <FadeIn delay={140}>
          <p className="text-lg text-white/55 max-w-xl leading-relaxed font-light mb-8">
            A team of engineers, educators, and operators who believe AI and human intelligence grow best together. Join us early — and help shape the company.
          </p>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════════
          CULTURE MEDIA GRID
      ══════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 pb-16">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ height: 340 }}>
            {/* main video */}
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{ border: "1px solid rgba(0,200,255,0.2)", background: "#060d1a" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-transparent" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/culture-video-thumb.jpg" alt="Astralearnia culture" className="w-full h-full object-cover opacity-35 group-hover:opacity-45 transition-opacity duration-500"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
                <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "rgba(0,200,255,0.15)", border: "2px solid rgba(0,200,255,0.5)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#00c8ff"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <p className="text-white font-black text-base">Life at Astralearnia</p>
                <p className="text-white/35 text-xs">2 min · Team culture video</p>
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(0,200,255,0.3)", color: "#00c8ff" }}>▶ Culture Video</div>
            </div>
            {/* image grid */}
            <div className="flex flex-col gap-4">
              <div className="flex-1 relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(168,85,247,0.2)", background: "#0d0a1a" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/office-1.jpg" alt="Lagos office" className="w-full h-full object-cover opacity-40"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div className="absolute inset-0 flex items-center justify-center"><span className="text-2xl float-icon">🏙️</span></div>
                <div className="absolute bottom-2 left-3 text-[10px] text-white/40 font-bold">Lagos HQ</div>
              </div>
              <div className="flex-1 relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,255,178,0.2)", background: "#0a1a12" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/team-retreat.jpg" alt="Team retreat" className="w-full h-full object-cover opacity-40"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div className="absolute inset-0 flex items-center justify-center"><span className="text-2xl float-icon" style={{ animationDelay: "1s" }}>✈️</span></div>
                <div className="absolute bottom-2 left-3 text-[10px] text-white/40 font-bold">Cape Town Retreat</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════════
          PERKS
      ══════════════════════════════════════════════════ */}
      <section className="relative z-10 border-y py-14 px-6 lg:px-14"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "#070b16" }}>
        <div className="max-w-screen-xl mx-auto">
          <FadeIn><h2 className="text-2xl font-black text-white text-center mb-9">Why Astralearnia?</h2></FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {perks.map((p, i) => (
              <FadeIn key={p.title} delay={i * 55}>
                <div className="flex gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = p.color + "35")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}>
                  <span className="text-xl shrink-0 float-icon" style={{ animationDelay: `${i * 0.4}s` }}>{p.icon}</span>
                  <div>
                    <h3 className="font-black text-white text-sm mb-1">{p.title}</h3>
                    <p className="text-xs text-white/45 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ROLES
      ══════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 py-16">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">
            <h2 className="text-3xl font-black text-white">Open Positions</h2>
            <div className="flex flex-wrap gap-2">
              {teams.map(t => (
                <button key={t} onClick={() => setFilter(t)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-black transition-all duration-200"
                  style={{
                    background: filter === t ? "linear-gradient(135deg,#00c8ff,#7c5cff)" : "rgba(255,255,255,0.05)",
                    color:      filter === t ? "white"                                    : "rgba(255,255,255,0.4)",
                    border:     filter === t ? "none"                                     : "1px solid rgba(255,255,255,0.1)",
                  }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-3">
          {filtered.map((r, i) => {
            const tc = teamColors[r.team] || { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" };
            return (
              <FadeIn key={r.title} delay={i * 40}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.035]"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="text-base font-black text-white">{r.title}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider" style={{ background: tc.bg, color: tc.color }}>{r.team}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white/30 border border-white/10">{r.level}</span>
                      {r.type === "Contract" && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold border" style={{ color: "#fbbf24", borderColor: "rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.1)" }}>Contract</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-white/35">
                      <span>📍 {r.location}</span>
                      <span>· {r.type}</span>
                    </div>
                  </div>
                  {/* tags — hidden on very small screens to keep row compact */}
                  <div className="hidden md:flex flex-wrap gap-2 max-w-sm">
                    {r.tags.slice(0, 5).map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white/40"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>{t}</span>
                    ))}
                    {r.tags.length > 5 && (
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white/25"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>+{r.tags.length - 5}</span>
                    )}
                  </div>
                  {/* apply button — triggers modal */}
                  <button onClick={() => setApplyRole(r)}
                    className="shrink-0 px-5 py-2 rounded-xl text-xs font-black text-white transition-all hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 4px 14px rgba(0,200,255,0.25)" }}>
                    Apply →
                  </button>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t text-center px-6"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "#070b16", paddingTop: 72, paddingBottom: 72 }}>
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Don&apos;t See a Fit? Build Your Own.</h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto mb-7">We hire exceptional people regardless of role. Send a speculative application — we read every one.</p>
          <Link href="mailto:careers@astralearnia.com"
            className="px-8 py-4 rounded-xl font-black text-white inline-flex transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 8px 28px rgba(0,200,255,0.3)" }}>
            Send Open Application →
          </Link>
        </FadeIn>
      </section>
    </main>
  );
}