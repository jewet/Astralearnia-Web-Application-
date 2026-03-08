"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const solutions = [
  { tag:"Technology Division", tagColor:"#00c8ff", icon:"⚡", title:"Adaptive AI Decision Engine",
    desc:"Turn raw organisational data into real-time decisions. Our decision intelligence layer ingests structured and unstructured data, applies custom ML models, and surfaces actionable insight directly where your teams work.",
    bullets:["Real-time inference pipelines","Custom model fine-tuning","CRM, ERP & warehouse integrations","Explainable AI outputs","99.9% uptime SLA"],
    cta:{label:"Request a Demo",href:"/book-demo"}, color:"#00c8ff", bg:"#080e1c", border:"rgba(0,200,255,0.2)", featured:true },
  { tag:"Technology Division", tagColor:"#00c8ff", icon:"</>", title:"Intelligence API & SDK",
    desc:"REST and GraphQL endpoints, pre-built model connectors, and webhook automation. Ship AI features in under 48 hours. Built for engineers who want power without the plumbing.",
    bullets:["Sub-200ms inference latency","Python, Node.js, Go SDKs","Batch + streaming endpoints","99.95% endpoint availability","Role-based API key management"],
    cta:{label:"View API Docs",href:"/api-docs"}, color:"#00c8ff", bg:"#080e1c", border:"rgba(0,200,255,0.12)", featured:false },
  { tag:"Technology Division", tagColor:"#00c8ff", icon:"⬡", title:"Enterprise Data Automation",
    desc:"End-to-end ETL pipelines, intelligent data ingestion, and zero-maintenance automation workflows. We connect your silos and keep data flowing — so your analysts spend time on insight, not wrangling.",
    bullets:["400+ data source connectors","Real-time + batch processing","Auto-schema detection","GDPR-compliant data handling","Visual pipeline editor"],
    cta:{label:"Explore Technology",href:"/technologies"}, color:"#00c8ff", bg:"#080e1c", border:"rgba(0,200,255,0.12)", featured:false },
  { tag:"Institute Division", tagColor:"#a855f7", icon:"🎓", title:"Adaptive Learning Platform",
    desc:"Not every learner is the same. Our AI engine builds personalised learning paths based on role, existing skills, goals, and pace. Learners progress faster. Managers see exactly where gaps remain.",
    bullets:["AI-personalised content delivery","Skills gap analytics dashboard","Progress tracking & certificates","SCORM & xAPI compliant","Mobile-first experience"],
    cta:{label:"Request Platform Demo",href:"/book-demo"}, color:"#a855f7", bg:"#0d0a1c", border:"rgba(168,85,247,0.2)", featured:true },
  { tag:"Institute Division", tagColor:"#a855f7", icon:"◇", title:"Corporate AI Training",
    desc:"Upskill 10 to 10,000 employees in AI literacy, data analysis, prompt engineering, and domain-specific skills. Programmes designed with your L&D team and delivered with measurable outcomes.",
    bullets:["Bespoke curriculum design","Live + async delivery","Cohort-based learning","Manager reporting suite","Completion guarantees"],
    cta:{label:"Contact Institute",href:"/contact"}, color:"#a855f7", bg:"#0d0a1c", border:"rgba(168,85,247,0.12)", featured:false },
  { tag:"Institute Division", tagColor:"#a855f7", icon:"◈", title:"AI Certification Programmes",
    desc:"Industry-recognised certifications across AI, data engineering, product management, and cybersecurity. Our exams are proctored, credentials blockchain-verified, and curriculum updated quarterly.",
    bullets:["6 core certification tracks","Blockchain-verified credentials","Exam prep + practice lab","LinkedIn-shareable badges","Annual recertification pathway"],
    cta:{label:"See All Certifications",href:"/institute"}, color:"#a855f7", bg:"#0d0a1c", border:"rgba(168,85,247,0.12)", featured:false },
];

const outcomes = [
  {metric:"3.2×",label:"Avg ROI in 6 months",color:"#00c8ff"},
  {metric:"40%",label:"Training cost reduction",color:"#a855f7"},
  {metric:"< 48h",label:"Contract to first API call",color:"#00ffb2"},
  {metric:"94%",label:"Learner completion rate",color:"#fbbf24"},
  {metric:"500+",label:"Enterprises served",color:"#ff6ec7"},
  {metric:"99.9%",label:"Platform uptime SLA",color:"#7c5cff"},
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
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

function SolutionCard({ sol }: { sol: typeof solutions[0] }) {
  const [hov, setHov] = useState(false);
  const c = sol.color;
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden"
      style={{ background: sol.bg, border: `1px solid ${hov ? c+"50" : sol.border}`, boxShadow: hov ? `0 0 48px ${c}14` : "none", transform: hov ? "translateY(-4px)" : "translateY(0)", transition: "all 0.3s ease" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {sol.featured && (
        <div className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-center" style={{ background: `${c}14`, borderBottom: `1px solid ${c}22`, color: c }}>★ Most Popular</div>
      )}
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="text-3xl mb-4">{sol.icon}</div>
        <div className="text-[10px] font-black uppercase tracking-[0.18em] mb-2.5" style={{ color: c }}>{sol.tag.replace(" Division","")} Solution</div>
        <h3 className="text-xl font-black text-white mb-3 leading-tight">{sol.title}</h3>
        <p className="text-sm text-white/50 leading-relaxed mb-5 flex-1">{sol.desc}</p>
        <ul className="flex flex-col gap-1.5 mb-6">
          {sol.bullets.map(b => (
            <li key={b} className="flex items-center gap-2 text-xs text-white/60">
              <span className="w-1 h-1 rounded-full shrink-0" style={{ background: c }} />{b}
            </li>
          ))}
        </ul>
        <Link href={sol.cta.href}
          className="w-full text-center py-2.5 rounded-xl font-black text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: sol.featured ? `linear-gradient(135deg,${c},${sol.tag.includes("Technology")?"#7c5cff":"#ec4899"})` : `${c}14`, border: sol.featured ? "none" : `1px solid ${c}35`, boxShadow: sol.featured ? `0 6px 20px ${c}30` : "none" }}>
          {sol.cta.label} →
        </Link>
      </div>
    </div>
  );
}

export default function SolutionsPage() {
  return (
    <main className="bg-[#040710] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <style>{`
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        .shimmer-text{background-size:200% auto;animation:shimmer 4s linear infinite;}
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% -5%,rgba(0,200,255,0.08),transparent)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 80% 70%,rgba(168,85,247,0.05),transparent)" }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle,rgba(0,220,255,1) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
      </div>

      {/* Hero — responsive pt for mobile navbar clearance */}
      <section className="relative z-10 pt-20 sm:pt-24 lg:pt-32 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-14 max-w-screen-xl mx-auto">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.18em] mb-6 sm:mb-7"
            style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.45)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />6 Flagship Solutions
          </div>
        </FadeIn>
        <FadeIn delay={70}>
          <h1 className="font-black leading-[0.95] tracking-[-0.045em] text-[clamp(2.2rem,7vw,6.5rem)] max-w-5xl mb-5 sm:mb-7">
            <span className="block text-white">Solutions Built for</span>
            <span className="block shimmer-text" style={{ background: "linear-gradient(90deg,#00c8ff,#7c5cff,#00ffb2,#00c8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Real Business Impact
            </span>
          </h1>
        </FadeIn>
        <FadeIn delay={140}>
          <p className="text-base sm:text-lg text-white/55 max-w-2xl leading-relaxed font-light mb-7 sm:mb-9">
            Two divisions. Six flagship solutions. One outcome: your organisation runs faster, smarter, and leaner.
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-row flex-wrap gap-3">
            <Link href="/book-demo" className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-xl font-black text-white text-sm hover:-translate-y-0.5 transition-all"
              style={{ background: "linear-gradient(135deg,#00c8ff,#3b6bff,#7c5cff)", boxShadow: "0 8px 28px rgba(0,200,255,0.35)" }}>
              Book a Free Demo →
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-xl font-bold text-white/60 text-sm border border-white/15 hover:border-white/30 hover:text-white transition-all">
              Talk to Sales
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Demo video */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-14 pb-10 sm:pb-14">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden cursor-pointer group" style={{ border: "1px solid rgba(0,200,255,0.2)", background: "#060d1a", minHeight: 200 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/15 to-violet-900/10" />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "rgba(0,200,255,0.15)", border: "2px solid rgba(0,200,255,0.5)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#00c8ff"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <div className="text-center">
                  <p className="text-white font-black text-sm sm:text-base">Platform Overview</p>
                  <p className="text-white/35 text-xs sm:text-sm">4 min · See all 6 solutions in action</p>
                </div>
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black" style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(0,200,255,0.3)", color: "#00c8ff" }}>▶ DEMO VIDEO</div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="p-5 rounded-2xl flex flex-col justify-between" style={{ background: "rgba(0,200,255,0.05)", border: "1px solid rgba(0,200,255,0.2)" }}>
                <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2">Technology</div>
                <div className="text-3xl font-black text-white">3</div>
                <p className="text-sm text-white/45">AI, API & data automation solutions</p>
                <Link href="#technology" className="text-xs font-black text-cyan-400 hover:text-cyan-300 transition-colors mt-2">View all →</Link>
              </div>
              <div className="p-5 rounded-2xl flex flex-col justify-between" style={{ background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.2)" }}>
                <div className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-2">Institute</div>
                <div className="text-3xl font-black text-white">3</div>
                <p className="text-sm text-white/45">Learning, training & certification solutions</p>
                <Link href="#institute" className="text-xs font-black text-violet-400 hover:text-violet-300 transition-colors mt-2">View all →</Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Outcomes bar */}
      <div className="relative z-10 border-y" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#070b16" }}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-14 py-6 sm:py-7 grid grid-cols-3 md:grid-cols-6 gap-4 sm:gap-5">
          {outcomes.map((o, i) => (
            <FadeIn key={o.metric} delay={i * 40}>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-black mb-1" style={{ color: o.color, filter: `drop-shadow(0 0 8px ${o.color}40)` }}>{o.metric}</div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-white/30 leading-tight">{o.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Solutions */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-14 py-16 sm:py-20">
        {/* Technology */}
        <div id="technology" style={{ marginBottom: 72 }}>
          <FadeIn>
            <div className="flex items-center gap-4 mb-8 sm:mb-9">
              <div className="h-px flex-1 bg-white/6" />
              <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.18em]"
                style={{ border: "1px solid rgba(0,200,255,0.28)", background: "rgba(0,200,255,0.07)", color: "#00c8ff" }}>
                ⚡ Technology Division
              </span>
              <div className="h-px flex-1 bg-white/6" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.filter(s => s.tag === "Technology Division").map((sol, i) => (
              <FadeIn key={sol.title} delay={i * 80}><SolutionCard sol={sol} /></FadeIn>
            ))}
          </div>
        </div>
        {/* Institute */}
        <div id="institute">
          <FadeIn>
            <div className="flex items-center gap-4 mb-8 sm:mb-9">
              <div className="h-px flex-1 bg-white/6" />
              <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.18em]"
                style={{ border: "1px solid rgba(168,85,247,0.28)", background: "rgba(168,85,247,0.07)", color: "#a855f7" }}>
                🎓 Institute Division
              </span>
              <div className="h-px flex-1 bg-white/6" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.filter(s => s.tag === "Institute Division").map((sol, i) => (
              <FadeIn key={sol.title} delay={i * 80}><SolutionCard sol={sol} /></FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t py-16 sm:py-20 text-center px-4 sm:px-6" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#070b16" }}>
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Not Sure Which Solution Fits?</h2>
          <p className="text-white/45 text-base max-w-lg mx-auto mb-7">Our solutions specialists will map your needs to the right product in a 30-minute no-obligation call.</p>
          <div className="flex flex-row flex-wrap gap-4 justify-center">
            <Link href="/book-demo" className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-black text-white text-sm transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 8px 28px rgba(0,200,255,0.35)" }}>
              Book a Demo →
            </Link>
            <Link href="/contact" className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-white/55 text-sm border border-white/15 hover:border-white/30 hover:text-white transition-all">
              Contact Sales
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}