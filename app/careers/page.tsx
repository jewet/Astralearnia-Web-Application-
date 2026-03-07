"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const roles = [
  { title: "Senior ML Engineer",       team: "Technology", location: "Lagos / Remote", type: "Full-time", level: "Senior", tags: ["Python", "PyTorch", "MLOps"] },
  { title: "AI Curriculum Designer",   team: "Institute",  location: "Lagos / Remote", type: "Full-time", level: "Mid",    tags: ["Instructional Design", "AI/ML"] },
  { title: "Backend Engineer (API)",   team: "Technology", location: "Remote",         type: "Full-time", level: "Senior", tags: ["Go", "Node.js", "Kubernetes"] },
  { title: "Enterprise Account Exec",  team: "Sales",      location: "Lagos, Nairobi", type: "Full-time", level: "Senior", tags: ["B2B SaaS", "Enterprise Sales"] },
  { title: "Data Engineer",            team: "Technology", location: "Lagos / Remote", type: "Full-time", level: "Mid",    tags: ["dbt", "Spark", "Airflow"] },
  { title: "Learning Experience Lead", team: "Institute",  location: "Lagos",          type: "Full-time", level: "Senior", tags: ["L&D", "EdTech", "Video Production"] },
  { title: "Product Designer",         team: "Product",    location: "Remote",         type: "Full-time", level: "Mid",    tags: ["Figma", "Motion Design", "B2B UX"] },
  { title: "DevRel Engineer",          team: "Technology", location: "Remote",         type: "Full-time", level: "Mid",    tags: ["APIs", "Technical Writing", "Community"] },
];

const perks = [
  { icon: "🌍", title: "Remote-First",      desc: "Work from anywhere in Africa or globally. We care about your output, not your postcode.", color: "#00c8ff" },
  { icon: "📚", title: "Free Institute Access", desc: "Full access to all AstraLearn courses and certifications from day one.", color: "#a855f7" },
  { icon: "⚡", title: "Fast Growth",       desc: "Early-stage startup with real traction. Your work ships to 500+ enterprises immediately.", color: "#00ffb2" },
  { icon: "💰", title: "Competitive Pay",   desc: "Market-rate salaries benchmarked globally, plus meaningful equity as we scale.", color: "#fbbf24" },
  { icon: "🔒", title: "Health Cover",      desc: "Comprehensive medical, dental, and optical for you and your dependants.", color: "#ff6ec7" },
  { icon: "✈️",  title: "Annual Retreat",    desc: "All-team gatherings twice a year. Last one was in Cape Town. Next is Kigali.", color: "#7c5cff" },
];

const teamColors: Record<string, { bg: string; color: string }> = {
  Technology: { bg: "rgba(0,200,255,0.12)", color: "#00c8ff" },
  Institute:  { bg: "rgba(168,85,247,0.12)", color: "#a855f7" },
  Sales:      { bg: "rgba(0,255,178,0.12)", color: "#00ffb2" },
  Product:    { bg: "rgba(255,110,199,0.12)", color: "#ff6ec7" },
};

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

export default function CareersPage() {
  const [filter, setFilter] = useState("All");
  const teams = ["All", "Technology", "Institute", "Sales", "Product"];
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

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(0,200,255,0.08), transparent)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 40% at 90% 70%, rgba(168,85,247,0.06), transparent)" }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, rgba(0,200,255,0.9) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-14 px-6 lg:px-14 max-w-screen-xl mx-auto">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.18em] mb-7" style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)" }}>
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

      {/* Culture Video + Image Grid */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 pb-16">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ height: 340 }}>
            {/* Main video */}
            <div className="md:col-span-2 relative rounded-2xl overflow-hidden cursor-pointer group" style={{ border: "1px solid rgba(0,200,255,0.2)", background: "#060d1a" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-transparent" />
              <img src="/culture-video-thumb.jpg" alt="Astralearnia culture" className="w-full h-full object-cover opacity-35 group-hover:opacity-45 transition-opacity duration-500" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
                <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: "rgba(0,200,255,0.15)", border: "2px solid rgba(0,200,255,0.5)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#00c8ff"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <p className="text-white font-black text-base">Life at Astralearnia</p>
                <p className="text-white/35 text-xs">2 min · Team culture video</p>
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider" style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(0,200,255,0.3)", color: "#00c8ff" }}>▶ Culture Video</div>
            </div>
            {/* Image grid */}
            <div className="flex flex-col gap-4">
              <div className="flex-1 relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(168,85,247,0.2)", background: "#0d0a1a" }}>
                <img src="/office-1.jpg" alt="Lagos office" className="w-full h-full object-cover opacity-40" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div className="absolute inset-0 flex items-center justify-center"><span className="text-2xl float-icon">🏙️</span></div>
                <div className="absolute bottom-2 left-3 text-[10px] text-white/40 font-bold">Lagos HQ</div>
              </div>
              <div className="flex-1 relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,255,178,0.2)", background: "#0a1a12" }}>
                <img src="/team-retreat.jpg" alt="Team retreat" className="w-full h-full object-cover opacity-40" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div className="absolute inset-0 flex items-center justify-center"><span className="text-2xl float-icon" style={{ animationDelay: "1s" }}>✈️</span></div>
                <div className="absolute bottom-2 left-3 text-[10px] text-white/40 font-bold">Cape Town Retreat</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Perks */}
      <section className="relative z-10 border-y py-14 px-6 lg:px-14" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#070b16" }}>
        <div className="max-w-screen-xl mx-auto">
          <FadeIn><h2 className="text-2xl font-black text-white text-center mb-9">Why Astralearnia?</h2></FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {perks.map((p, i) => (
              <FadeIn key={p.title} delay={i * 55}>
                <div className="flex gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group"
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

      {/* Roles */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 py-16">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">
            <h2 className="text-3xl font-black text-white">Open Positions</h2>
            <div className="flex flex-wrap gap-2">
              {teams.map(t => (
                <button key={t} onClick={() => setFilter(t)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-black transition-all duration-200"
                  style={{ background: filter === t ? "linear-gradient(135deg,#00c8ff,#7c5cff)" : "rgba(255,255,255,0.05)", color: filter === t ? "white" : "rgba(255,255,255,0.4)", border: filter === t ? "none" : "1px solid rgba(255,255,255,0.1)" }}>
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
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.035] cursor-pointer group"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="text-base font-black text-white">{r.title}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider" style={{ background: tc.bg, color: tc.color }}>{r.team}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white/30 border border-white/10">{r.level}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-white/35">
                      <span>📍 {r.location}</span>
                      <span>· {r.type}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {r.tags.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white/40" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>{t}</span>
                    ))}
                  </div>
                  <Link href={`/contact?role=${encodeURIComponent(r.title)}`}
                    className="shrink-0 px-5 py-2 rounded-xl text-xs font-black text-white transition-all hover:-translate-y-0.5 group-hover:shadow-lg"
                    style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 4px 14px rgba(0,200,255,0.25)" }}>
                    Apply →
                  </Link>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t py-18 text-center px-6" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#070b16", paddingTop: 72, paddingBottom: 72 }}>
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Don't See a Fit? Build Your Own.</h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto mb-7">We hire exceptional people regardless of role. Send a speculative application — we read every one.</p>
          <Link href="mailto:careers@astralearnia.com" className="px-8 py-4 rounded-xl font-black text-white inline-flex transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 8px 28px rgba(0,200,255,0.3)" }}>
            Send Open Application →
          </Link>
        </FadeIn>
      </section>
    </main>
  );
}