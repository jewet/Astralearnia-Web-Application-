"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const products = [
  {
    id: "astra-core", icon: "◈", name: "AstraCore",
    tagline: "The AI decision engine at the heart of everything.",
    division: "Technology", divisionColor: "#00c8ff", status: "GA",
    desc: "AstraCore is our flagship AI platform — a modular decision intelligence system that ingests your data, trains on your domain, and delivers predictions, recommendations, and automation triggers. Deployed as managed cloud or on-premise.",
    highlights: ["Custom model training on proprietary data", "Real-time inference at < 200ms", "Visual pipeline builder", "Audit trail & explainability", "Enterprise SSO & RBAC"],
    price: "From $1,200/mo", cta: "/book-demo",
  },
  {
    id: "astra-api", icon: "</>", name: "AstraAPI",
    tagline: "Production AI endpoints. Zero infrastructure headaches.",
    division: "Technology", divisionColor: "#00c8ff", status: "GA",
    desc: "A managed API gateway wrapping our AI models. REST and GraphQL endpoints, versioned releases, and detailed observability dashboards. Integrate in hours — not weeks.",
    highlights: ["99.95% uptime SLA", "SDKs for Python, Node.js, Go, Java", "Rate limiting & burst handling", "Streaming & batch modes", "Webhook event system"],
    price: "From $299/mo", cta: "/api-docs",
  },
  {
    id: "astra-automate", icon: "∞", name: "AstraAutomate",
    tagline: "Zero-touch data pipelines across your entire stack.",
    division: "Technology", divisionColor: "#00c8ff", status: "GA",
    desc: "Visual ETL builder with 400+ connectors. Design, test, and deploy automated data workflows — from ingestion to enrichment to delivery. No code required for 90% of use cases.",
    highlights: ["400+ native connectors", "Real-time + scheduled pipelines", "Data quality monitoring", "GDPR-compliant transformations", "Git-based version control"],
    price: "From $599/mo", cta: "/contact/technology",
  },
  {
    id: "astra-learn", icon: "◇", name: "AstraLearn",
    tagline: "Adaptive learning pathways powered by AI.",
    division: "Institute", divisionColor: "#a855f7", status: "GA",
    desc: "Our LMS reimagined. AstraLearn builds personalised learning paths per employee based on their role, skill gaps, and goals. Managers see a live dashboard of team competency. HR can prove training ROI on a spreadsheet.",
    highlights: ["AI-personalised curricula", "SCORM 1.2 / 2004 & xAPI compliant", "Live + async delivery modes", "Manager analytics dashboard", "Mobile-first learner experience"],
    price: "From $12/learner/mo", cta: "/book-demo",
  },
  {
    id: "astra-cert", icon: "🏆", name: "AstraCert",
    tagline: "Industry credentials that employers trust.",
    division: "Institute", divisionColor: "#a855f7", status: "GA",
    desc: "Six certification tracks across AI Engineering, Data Analytics, Prompt Engineering, Cybersecurity, Product Management, and Business Intelligence. Proctored exams and blockchain-verified certificates.",
    highlights: ["6 certification tracks", "Blockchain-verified on issuance", "Proctored exam portal", "Practice labs included", "LinkedIn badge integration"],
    price: "From $149/exam", cta: "/institute",
  },
  {
    id: "astra-skills", icon: "📊", name: "AstraSkills",
    tagline: "See exactly where your team's knowledge gaps are.",
    division: "Institute", divisionColor: "#a855f7", status: "Beta",
    desc: "A standalone skills intelligence platform. Run diagnostic assessments across any competency framework, map results to business outcomes, and generate AI-recommended learning interventions in under 2 hours.",
    highlights: ["Custom competency frameworks", "Automated gap analysis", "AI learning recommendations", "Board-level reporting", "Integrates with AstraLearn"],
    price: "From $899/mo", cta: "/contact/institute",
  },
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
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(22px)", transition: `opacity 0.62s ease ${delay}ms, transform 0.62s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function ProductCard({ p }: { p: typeof products[0] }) {
  const [hov, setHov] = useState(false);
  const c = p.divisionColor;
  const isDark = p.division === "Technology";
  return (
    <div className="flex flex-col rounded-2xl transition-all duration-300"
      style={{ background: isDark ? "#080e1c" : "#0d0a1c", border: `1px solid ${hov ? c + "50" : c + "22"}`, boxShadow: hov ? `0 0 48px ${c}14` : "none", transform: hov ? "translateY(-4px)" : "none" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <span className="text-2xl">{p.icon}</span>
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest" style={{ background: p.status === "GA" ? `${c}18` : "rgba(251,191,36,0.12)", border: `1px solid ${p.status === "GA" ? c + "30" : "rgba(251,191,36,0.3)"}`, color: p.status === "GA" ? c : "#fbbf24" }}>
            {p.status}
          </span>
        </div>
        <h3 className="text-xl font-black text-white mb-1">{p.name}</h3>
        <p className="text-xs text-white/35 italic mb-3">{p.tagline}</p>
        <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">{p.desc}</p>
        <ul className="flex flex-col gap-1.5 mb-5">
          {p.highlights.map(h => (
            <li key={h} className="flex items-center gap-2 text-xs text-white/55">
              <span className="w-1 h-1 rounded-full shrink-0" style={{ background: c }} />{h}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-sm font-black text-white/60">{p.price}</div>
          <Link href={p.cta} className="px-4 py-2 rounded-xl text-xs font-black transition-all hover:-translate-y-0.5" style={{ background: `${c}16`, border: `1px solid ${c}30`, color: c }}>
            Get Started →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="bg-[#040710] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <style>{`
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .shimmer-text { background-size: 200% auto; animation: shimmer 4s linear infinite; }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% -5%, rgba(0,200,255,0.08), transparent)" }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, rgba(0,200,255,0.8) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-14 px-6 lg:px-14 max-w-screen-xl mx-auto">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.18em] mb-7" style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.45)" }}>
            6 Core Products
          </div>
        </FadeIn>
        <FadeIn delay={70}>
          <h1 className="font-black leading-[0.95] tracking-[-0.045em] text-[clamp(3rem,8vw,6.5rem)] max-w-5xl mb-7">
            <span className="block text-white">Products That Power</span>
            <span className="block shimmer-text" style={{ background: "linear-gradient(90deg,#00c8ff,#7c5cff,#a855f7,#00c8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Modern Organisations
            </span>
          </h1>
        </FadeIn>
        <FadeIn delay={140}>
          <p className="text-lg text-white/55 max-w-xl leading-relaxed font-light mb-9">
            Modular, enterprise-grade, and designed to go live fast. Every Astralearnia product ships with real support and real SLAs.
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-wrap gap-3">
            <Link href="/book-demo" className="px-7 py-3 rounded-xl font-black text-white text-sm transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 6px 24px rgba(0,200,255,0.3)" }}>
              Book a Demo →
            </Link>
            <Link href="/solutions" className="px-7 py-3 rounded-xl font-bold text-white/55 text-sm border border-white/15 hover:border-white/30 hover:text-white transition-all">
              Compare Solutions
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Product video/image showcase */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 pb-14">
        <FadeIn>
          <div className="relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,200,255,0.18)", background: "#060d1a", minHeight: 240 }}>
            <div className="absolute inset-0 bg-gradient-to-r from-[#060d1a] via-transparent to-[#060d1a] z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060d1a] z-10" />
            <img src="/products-showcase.jpg" alt="Products showcase" className="w-full h-full object-cover opacity-25" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div className="relative z-20 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-400 mb-2">Platform Screenshot</p>
                <h3 className="text-2xl font-black text-white mb-1">One Platform, Six Products</h3>
                <p className="text-white/45 text-sm">All products connect natively — data flows automatically between modules.</p>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                {["AstraCore", "AstraAPI", "AstraLearn", "AstraCert"].map(name => (
                  <span key={name} className="px-3 py-1.5 rounded-lg text-[10px] font-black text-white/60" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>{name}</span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Products by division */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 pb-20">
        {(["Technology", "Institute"] as const).map(div => (
          <div key={div} className="mb-16">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-white/6" />
                <span className="px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.18em]"
                  style={{ border: `1px solid ${div === "Technology" ? "rgba(0,200,255,0.28)" : "rgba(168,85,247,0.28)"}`, background: div === "Technology" ? "rgba(0,200,255,0.07)" : "rgba(168,85,247,0.07)", color: div === "Technology" ? "#00c8ff" : "#a855f7" }}>
                  {div === "Technology" ? "⚡" : "🎓"} {div} Products
                </span>
                <div className="h-px flex-1 bg-white/6" />
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {products.filter(p => p.division === div).map((p, i) => (
                <FadeIn key={p.id} delay={i * 70}><ProductCard p={p} /></FadeIn>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t py-20 text-center px-6" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#070b16" }}>
        <FadeIn>
          <h2 className="text-4xl font-black text-white mb-3">Custom Enterprise Packages</h2>
          <p className="text-white/45 text-base max-w-lg mx-auto mb-7">Volume discounts, SLA upgrades, white-labelling, and on-premise deployment. Let's talk.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 rounded-xl font-black text-white text-sm transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 8px 28px rgba(0,200,255,0.3)" }}>
              Talk to Sales →
            </Link>
            <Link href="/integrations" className="px-8 py-4 rounded-xl font-bold text-white/55 text-sm border border-white/15 hover:border-white/30 hover:text-white transition-all">
              View Integrations
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}