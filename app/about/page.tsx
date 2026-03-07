"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const values = [
  { icon: "⚡", title: "Intelligence First", desc: "We don't bolt AI onto existing tools. We redesign systems from the ground up around intelligence — so the outcome is smarter, not just faster.", color: "#00c8ff" },
  { icon: "🌍", title: "Built for Africa & Beyond", desc: "Proudly Africa-rooted. Our products work at low latency, varying bandwidths, and complex regulatory environments across the continent and globally.", color: "#00ffb2" },
  { icon: "🔒", title: "Trustworthy by Design", desc: "Explainability, data sovereignty, and audit trails are engineered in — not bolted on. Every system we build is accountable by default.", color: "#a855f7" },
  { icon: "◇", title: "Outcomes, Not Outputs", desc: "We measure success by your results — ROI, skills growth, decision accuracy — not hours billed or dashboards created.", color: "#ff6ec7" },
];

const milestones = [
  { year: "2022", title: "Founded as SmartSkillUp", desc: "Started by engineers and educators in Lagos who saw the gap between enterprise AI capability and African market access. Began as SmartSkillUp — a focused upskilling platform.", color: "#00c8ff" },
  { year: "2023", title: "First Enterprise Client", desc: "Deployed our first Decision Intelligence system for a pan-African financial services firm. Expanded to AI training cohorts across 3 countries.", color: "#7c5cff" },
  { year: "2024", title: "Rebranded & Incorporated", desc: "Rebranded from SmartSkillUp to Astralearnia — reflecting our expanded mission across AI infrastructure and learning. Officially registered on November 19, 2024.", color: "#a855f7" },
  { year: "2024", title: "Technology Division Launched", desc: "Launched AstraCore and AstraAPI. Reached 500+ enterprise deployments and 12,000 certified learners across 30+ countries.", color: "#00ffb2" },
  { year: "2025", title: "Fundraise in Progress", desc: "Currently in active fundraising to scale infrastructure and double the engineering and education teams. Investor conversations underway.", color: "#ff6ec7" },
];

function useInView(threshold = 0.15) {
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
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function AboutPage() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  return (
    <main className="bg-[#040710] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes pulse-glow { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .shimmer-text { background-size: 200% auto; animation: shimmer 4s linear infinite; }
        .float-anim { animation: float 6s ease-in-out infinite; }
        .glow-pulse { animation: pulse-glow 2.5s ease-in-out infinite; }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(0,200,255,0.09), transparent)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 80% 60%, rgba(124,92,255,0.06), transparent)" }} />
        <div className="absolute inset-0 opacity-[0.022]" style={{ backgroundImage: "radial-gradient(circle, rgba(0,200,255,0.9) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-16 px-6 lg:px-14 max-w-screen-xl mx-auto">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.18em] mb-7" style={{ border: "1px solid rgba(0,200,255,0.25)", background: "rgba(0,200,255,0.06)", color: "#00c8ff" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 glow-pulse" />
            Our Story
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <h1 className="font-black leading-[0.95] tracking-[-0.045em] text-[clamp(3rem,8vw,7rem)] max-w-4xl mb-7">
            <span className="block text-white">We Exist to</span>
            <span className="block shimmer-text" style={{ background: "linear-gradient(90deg,#00c8ff,#7c5cff,#00ffb2,#00c8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", backgroundSize: "200% auto" }}>
              Close the Gap
            </span>
          </h1>
        </FadeIn>
        <FadeIn delay={160}>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed font-light mb-10">
            Most companies have data. Few have intelligence. Most people have potential. Few have access to world-class AI education.
            <strong className="text-white/85 font-semibold"> Astralearnia was built to fix both.</strong>
          </p>
        </FadeIn>
        <FadeIn delay={240}>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="px-7 py-3 rounded-xl font-black text-white text-sm transition-all hover:-translate-y-0.5 active:scale-95" style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 6px 28px rgba(0,200,255,0.35)" }}>
              Work With Us →
            </Link>
            <Link href="/careers" className="px-7 py-3 rounded-xl font-bold text-white/60 text-sm border border-white/15 hover:border-white/30 hover:text-white transition-all">
              View Open Roles
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Origin Story Video Section */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-14 pb-16">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
            {/* Video placeholder */}
            <div className="lg:col-span-3 relative rounded-2xl overflow-hidden cursor-pointer group" style={{ border: "1px solid rgba(0,200,255,0.2)", background: "#080d1a", minHeight: 300 }} onClick={() => setVideoPlaying(true)}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-violet-900/20" />
              <img src="/about-hero.jpg" alt="Astralearnia origin story" className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                <div className="w-18 h-18 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: "rgba(0,200,255,0.15)", border: "2px solid rgba(0,200,255,0.5)", width: 72, height: 72 }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#00c8ff"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <div className="text-center">
                  <p className="text-white font-black text-lg">Watch Our Story</p>
                  <p className="text-white/40 text-sm">3 min · How Astralearnia came to be</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider" style={{ background: "rgba(0,200,255,0.15)", border: "1px solid rgba(0,200,255,0.3)", color: "#00c8ff" }}>Origin Story</div>
            </div>
            {/* Stats side */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {[
                { val: "2022", label: "Founded", sub: "Formerly SmartSkillUp", color: "#00c8ff" },
                { val: "Nov '24", label: "Registered", sub: "Astralearnia Inc.", color: "#a855f7" },
                { val: "500+", label: "Enterprises", sub: "Across 30+ countries", color: "#00ffb2" },
                { val: "12K+", label: "Learners", sub: "Certified to date", color: "#ff6ec7" },
              ].map((s, i) => (
                <FadeIn key={s.label} delay={i * 60}>
                  <div className="rounded-2xl p-5 h-full flex flex-col justify-between" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="text-3xl font-black mb-1" style={{ color: s.color, filter: `drop-shadow(0 0 10px ${s.color}50)` }}>{s.val}</div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-white/70">{s.label}</div>
                      <div className="text-[10px] text-white/30 mt-0.5">{s.sub}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Mission */}
      <section className="relative z-10 border-y py-16 px-6 lg:px-14" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#070b16" }}>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-400 mb-5">Our Mission</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
              Engineering Intelligence.<br />
              <span style={{ background: "linear-gradient(135deg,#a855f7,#00c8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Empowering Minds.</span>
            </h2>
            <p className="text-base text-white/55 leading-relaxed mb-4">
              We build AI systems that make organisations smarter — and learning programmes that make people more capable. These aren't separate missions. <strong className="text-white/85">They're the same mission</strong>, delivered through two world-class divisions.
            </p>
            <p className="text-sm text-white/40 leading-relaxed">
              Founded in Lagos in 2022 as SmartSkillUp, we expanded our vision and rebranded to Astralearnia — officially incorporated on <strong className="text-white/60">November 19, 2024</strong>. We serve enterprises, schools, developers, and governments across Africa and internationally.
            </p>
          </FadeIn>
          <FadeIn delay={120}>
            {/* Image placeholder */}
            <div className="relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(124,92,255,0.25)", minHeight: 260, background: "#0d0a1a" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 to-cyan-900/10" />
              <img src="/mission-photo.jpg" alt="Astralearnia team" className="w-full h-full object-cover opacity-50" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 p-6 text-center">
                <div className="text-4xl mb-2">🏙️</div>
                <p className="text-white/70 font-black text-base">Lagos → 30+ Countries</p>
                <p className="text-white/35 text-xs">Team photo · Add yours here</p>
              </div>
              <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#0d0a1a] to-transparent" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="relative z-10 py-20 px-6 lg:px-14 max-w-screen-xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 mb-3">What We Stand For</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white">Core Values</h2>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 70}>
              <div className="flex gap-5 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = v.color + "40")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}>
                <span className="text-2xl shrink-0 float-anim" style={{ animationDelay: `${i * 0.5}s` }}>{v.icon}</span>
                <div>
                  <h3 className="text-base font-black text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="relative z-10 border-t py-20 px-6 lg:px-14" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#070b16" }}>
        <div className="max-w-screen-xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 mb-3">Our Journey</div>
              <h2 className="text-4xl sm:text-5xl font-black text-white">Built Year by Year</h2>
            </div>
          </FadeIn>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-[28px] top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, rgba(0,200,255,0.4), rgba(168,85,247,0.3), transparent)" }} />
            <div className="flex flex-col gap-7">
              {milestones.map((m, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div className="flex gap-6 items-start">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-[10px] font-black z-10 shrink-0"
                      style={{ background: `${m.color}18`, border: `1.5px solid ${m.color}50`, color: m.color }}>
                      {m.year}
                    </div>
                    <div className="flex-1 pt-2 pb-3">
                      <h3 className="text-base font-black text-white mb-1.5">{m.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 text-center px-6">
        <FadeIn>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Join the Mission</h2>
          <p className="text-white/45 text-base max-w-lg mx-auto mb-8">Build with us, learn with us, or partner with us. We're growing fast and looking for the best.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/careers" className="px-8 py-4 rounded-xl font-black text-white text-sm transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 8px 30px rgba(0,200,255,0.35)" }}>
              View Open Roles →
            </Link>
            <Link href="/partners" className="px-8 py-4 rounded-xl font-bold text-white/60 text-sm border border-white/15 hover:border-white/30 hover:text-white transition-all">
              Become a Partner
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}