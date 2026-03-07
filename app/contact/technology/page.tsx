"use client";
import Link from "next/link";
import { ContactFormFull } from "@/app/contact/ContactForm";

const stats = [
  { val: "< 48h", label: "Average First Response" },
  { val: "500+", label: "Enterprise Deployments" },
  { val: "99.9%", label: "Platform Uptime SLA" },
  { val: "3.2×", label: "Average Client ROI" },
];

const services = [
  { icon: "⚡", title: "AI Model Development", desc: "Custom LLMs, decision models, and inference pipelines." },
  { icon: "◈", title: "Decision Intelligence", desc: "Real-time data analytics wired into your workflows." },
  { icon: "</>" , title: "API & SDK Platform", desc: "REST, GraphQL, webhooks. Deploy in under 48 hours." },
  { icon: "⬡", title: "Enterprise Integration", desc: "Connects to Salesforce, SAP, HubSpot, and more." },
  { icon: "🔒", title: "Security & Compliance", desc: "SOC 2, GDPR, ISO 27001 aligned architecture." },
  { icon: "∞", title: "Data Automation", desc: "ETL pipelines, intelligent ingestion, zero-maintenance." },
];

export default function ContactTechnologyPage() {
  return (
    <div className="bg-[#050810] min-h-screen text-white font-sans antialiased overflow-x-hidden">

      {/* ── Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,rgba(0,200,255,0.09),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_70%,rgba(124,92,255,0.07),transparent)]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle,rgba(0,220,255,1) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
      </div>

      {/* ── Hero ── */}
      <section className="relative z-10 pt-36 pb-20 px-6 lg:px-12 max-w-screen-xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 mb-10">
          <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/contact" className="hover:text-white/60 transition-colors">Contact</Link>
          <span>/</span>
          <span className="text-cyan-400">Technology</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/8 text-cyan-300 text-xs font-black uppercase tracking-[0.18em]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            ⚡ Technology Division
          </span>
          <span className="inline-flex px-3 py-1.5 rounded-full border border-white/10 bg-white/4 text-white/50 text-xs font-bold uppercase tracking-[0.15em]">
            Enterprise AI Systems
          </span>
        </div>

        <h1 className="font-black leading-[1.0] tracking-[-0.04em] text-5xl sm:text-6xl lg:text-7xl max-w-4xl mb-8">
          <span className="block text-white">Let's Build Your</span>
          <span className="block" style={{ background: "linear-gradient(135deg,#00c8ff,#3b6bff,#7c5cff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 40px rgba(0,200,255,0.4))" }}>
            AI Infrastructure
          </span>
        </h1>
        <p className="text-xl sm:text-2xl text-slate-300 max-w-2xl leading-relaxed font-light">
          Talk to a solutions engineer about your use case. We'll map your data to a deployment plan — no fluff, no vague roadmaps. Just results.
        </p>
      </section>

      {/* ── Stats bar ── */}
      <div className="relative z-10 border-y border-white/6 bg-[#080c14]/80 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black text-white tracking-tight" style={{ filter: "drop-shadow(0 0 12px rgba(0,200,255,0.5))" }}>{s.val}</div>
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
              style={{ background: "linear-gradient(145deg,rgba(0,200,255,0.06),rgba(124,92,255,0.03))", border: "1px solid rgba(0,200,255,0.2)", backdropFilter: "blur(12px)", boxShadow: "0 0 60px rgba(0,200,255,0.08)" }}>
              <div className="mb-8">
                <h2 className="text-2xl font-black text-white mb-2">Start a Conversation</h2>
                <p className="text-sm text-white/45 leading-relaxed">
                  Fill in your details and a technology specialist will respond within 24 hours with a tailored approach.
                </p>
              </div>
              <ContactFormFull
                division="technology"
                accentColor="#00c8ff"
                secondaryColor="#7c5cff"
                source="/contact/technology"
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col gap-8">

            {/* Services */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.22em] text-cyan-400 mb-5">What We Can Build For You</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map(s => (
                  <div key={s.title}
                    className="flex items-start gap-3 p-4 rounded-xl transition-all duration-200 hover:bg-white/4"
                    style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                    <span className="text-2xl text-cyan-400/70 shrink-0 mt-0.5">{s.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-white">{s.title}</div>
                      <div className="text-xs text-white/40 mt-0.5 leading-relaxed">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct contact */}
            <div className="rounded-2xl p-7" style={{ background: "#0d1622", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="font-black text-white text-base mb-5">Direct Lines</h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Enterprise Sales", value: "enterprise@astralearnia.com" },
                  { label: "Technical Enquiries", value: "engineers@astralearnia.com" },
                  { label: "API & Developer", value: "developers@astralearnia.com" },
                  { label: "Security & Compliance", value: "security@astralearnia.com" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <span className="text-white/35 font-medium text-xs">{item.label}</span>
                    <a href={`mailto:${item.value}`}
                      className="text-cyan-400/80 hover:text-cyan-300 transition-colors font-bold text-xs">
                      {item.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Compare */}
            <div className="flex flex-wrap gap-3">
              <Link href="/contact/institute"
                className="flex-1 text-center py-3 px-5 rounded-xl text-sm font-bold text-white/60 hover:text-white transition-all duration-200 hover:bg-violet-400/8"
                style={{ border: "1px solid rgba(168,85,247,0.2)" }}>
                🎓 View Institute Contact
              </Link>
              <Link href="/book-demo"
                className="flex-1 text-center py-3 px-5 rounded-xl text-sm font-black text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 6px 24px rgba(0,200,255,0.35)" }}>
                Book Live Demo →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}