"use client";
import Link from "next/link";
import { ContactFormFull } from "@/app/contact/ContactForm";

const stats = [
  { val: "12K+", label: "Learners Trained" },
  { val: "94%", label: "Course Completion Rate" },
  { val: "40%", label: "Lower Training Cost" },
  { val: "60+", label: "Certified Programmes" },
];

const offerings = [
  { icon: "🎓", title: "AI Certifications", desc: "Industry-recognised credentials built for today's market." },
  { icon: "◇", title: "Adaptive Learning Paths", desc: "AI-personalised curricula that evolve with each learner." },
  { icon: "📊", title: "Skills Analytics", desc: "Real-time dashboards showing gaps, growth, and ROI." },
  { icon: "🏢", title: "Corporate Training", desc: "Programmes scaled from 10 to 10,000 employees." },
  { icon: "🔗", title: "LMS Integration", desc: "Plug into Moodle, Canvas, SAP SuccessFactors, and more." },
  { icon: "🌍", title: "Global Delivery", desc: "Multi-language, async and live options. Africa → World." },
];

export default function ContactInstitutePage() {
  return (
    <div className="bg-[#060508] min-h-screen text-white font-sans antialiased overflow-x-hidden">

      {/* ── Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_85%_15%,rgba(168,85,247,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_15%_70%,rgba(236,72,153,0.06),transparent)]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle,rgba(168,85,247,1) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
      </div>

      {/* ── Hero ── */}
      <section className="relative z-10 pt-36 pb-20 px-6 lg:px-12 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 mb-10">
          <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/contact" className="hover:text-white/60 transition-colors">Contact</Link>
          <span>/</span>
          <span className="text-violet-400">Institute</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-400/30 bg-violet-400/8 text-violet-300 text-xs font-black uppercase tracking-[0.18em]">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            🎓 Institute Division
          </span>
          <span className="inline-flex px-3 py-1.5 rounded-full border border-white/10 bg-white/4 text-white/50 text-xs font-bold uppercase tracking-[0.15em]">
            AI-Powered Learning
          </span>
        </div>

        <h1 className="font-black leading-[1.0] tracking-[-0.04em] text-5xl sm:text-6xl lg:text-7xl max-w-4xl mb-8">
          <span className="block text-white">Transform How Your</span>
          <span className="block" style={{ background: "linear-gradient(135deg,#a855f7,#ec4899,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 40px rgba(168,85,247,0.45))" }}>
            People Learn & Grow
          </span>
        </h1>
        <p className="text-xl sm:text-2xl text-slate-300 max-w-2xl leading-relaxed font-light">
          Tell us about your team or institution. We'll design an adaptive learning programme that closes skill gaps and delivers measurable results — fast.
        </p>
      </section>

      {/* ── Stats bar ── */}
      <div className="relative z-10 border-y border-white/6 bg-[#0e0a1a]/80 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-white tracking-tight" style={{ filter: "drop-shadow(0 0 12px rgba(168,85,247,0.55))" }}>{s.val}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/35 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Form */}
          <div>
            <div className="rounded-2xl p-8 lg:p-10"
              style={{ background: "linear-gradient(145deg,rgba(168,85,247,0.07),rgba(236,72,153,0.03))", border: "1px solid rgba(168,85,247,0.22)", backdropFilter: "blur(12px)", boxShadow: "0 0 60px rgba(168,85,247,0.1)" }}>
              <div className="mb-8">
                <h2 className="text-2xl font-black text-white mb-2">Request a Learning Consultation</h2>
                <p className="text-sm text-white/45 leading-relaxed">
                  Our education specialists will design a programme aligned to your learning goals, team size, and budget.
                </p>
              </div>
              <ContactFormFull
                division="institute"
                accentColor="#a855f7"
                secondaryColor="#ec4899"
                source="/contact/institute"
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col gap-8">

            {/* Offerings */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.22em] text-violet-400 mb-5">Institute Offerings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {offerings.map(o => (
                  <div key={o.title}
                    className="flex items-start gap-3 p-4 rounded-xl transition-all duration-200 hover:bg-white/4"
                    style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                    <span className="text-2xl shrink-0 mt-0.5">{o.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-white">{o.title}</div>
                      <div className="text-xs text-white/40 mt-0.5 leading-relaxed">{o.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct contact */}
            <div className="rounded-2xl p-7" style={{ background: "#0f0a1e", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="font-black text-white text-base mb-5">Direct Lines</h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Corporate Training", value: "corporate@astralearnia.com" },
                  { label: "Schools & Universities", value: "institute@astralearnia.com" },
                  { label: "Certifications", value: "certs@astralearnia.com" },
                  { label: "Curriculum Design", value: "curriculum@astralearnia.com" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <span className="text-white/35 font-medium text-xs">{item.label}</span>
                    <a href={`mailto:${item.value}`}
                      className="text-violet-400/80 hover:text-violet-300 transition-colors font-bold text-xs">
                      {item.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial pull-quote */}
            <div className="rounded-2xl p-7" style={{ background: "linear-gradient(145deg,rgba(168,85,247,0.08),rgba(236,72,153,0.04))", border: "1px solid rgba(168,85,247,0.18)" }}>
              <div className="text-3xl text-white/15 font-serif mb-3">&ldquo;</div>
              <p className="text-base text-white/75 italic leading-relaxed mb-4">
                Astralearnia cut our compliance training time by 60% and test scores went up immediately. ROI was clear within 3 months.
              </p>
              <div className="text-xs font-bold text-white/50">Yemi Adeyemi · Chief People Officer, FinCorp Africa</div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/contact/technology"
                className="flex-1 text-center py-3 px-5 rounded-xl text-sm font-bold text-white/60 hover:text-white transition-all duration-200 hover:bg-cyan-400/8"
                style={{ border: "1px solid rgba(0,200,255,0.2)" }}>
                ⚡ View Technology Contact
              </Link>
              <Link href="/book-demo"
                className="flex-1 text-center py-3 px-5 rounded-xl text-sm font-black text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", boxShadow: "0 6px 24px rgba(168,85,247,0.4)" }}>
                Book Live Demo →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}