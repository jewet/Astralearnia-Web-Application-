"use client";
import Link from "next/link";
import { ContactFormFull } from "@/app/contact/ContactForm";

const paths = [
  {
    icon: "⚡",
    division: "Technology",
    color: "#00c8ff",
    bg: "#0a1020",
    border: "rgba(0,200,255,0.2)",
    hoverBorder: "rgba(0,200,255,0.55)",
    glow: "rgba(0,200,255,0.15)",
    href: "/contact/technology",
    desc: "Custom AI systems, APIs, automation pipelines, enterprise deployments.",
    cta: "Talk to an Engineer →",
    tags: ["AI Models", "API & SDK", "Data Automation", "Enterprise"],
  },
  {
    icon: "🎓",
    division: "Institute",
    color: "#a855f7",
    bg: "#0e0a1a",
    border: "rgba(168,85,247,0.2)",
    hoverBorder: "rgba(168,85,247,0.55)",
    glow: "rgba(168,85,247,0.15)",
    href: "/contact/institute",
    desc: "Adaptive learning, certifications, corporate training, and LMS integration.",
    cta: "Talk to an Educator →",
    tags: ["Certifications", "Corporate Training", "LMS", "Analytics"],
  },
];

const directContacts = [
  { label: "Enterprise Sales", value: "enterprise@astralearnia.com", color: "#00c8ff" },
  { label: "Institute Education", value: "institute@astralearnia.com", color: "#a855f7" },
  { label: "Developer API", value: "developers@astralearnia.com", color: "#00ffb2" },
  { label: "Press & Partnerships", value: "press@astralearnia.com", color: "#ff6ec7" },
];

export default function ContactPage() {
  return (
    <main className="bg-[#050810] min-h-screen text-white font-sans antialiased overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,200,255,0.08),transparent)]" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle,rgba(0,220,255,1) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
      </div>

      {/* Top beam */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none"
        style={{ background: "linear-gradient(90deg,transparent,#00c8ff 20%,#7c5cff 50%,#00ffb2 80%,transparent)", boxShadow: "0 0 20px rgba(0,200,255,0.6)" }} />

      {/* Hero */}
      <section className="relative z-10 pt-36 pb-16 px-6 lg:px-12 max-w-screen-xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/4 text-white/60 text-xs font-black uppercase tracking-[0.18em] mb-8">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Response within 24 Hours
        </div>

        <h1 className="font-black leading-[1.0] tracking-[-0.04em] text-5xl sm:text-6xl lg:text-8xl max-w-5xl mx-auto mb-8">
          <span className="block text-white">Build Something</span>
          <span className="block" style={{ background: "linear-gradient(135deg,#00c8ff 0%,#fff 30%,#7c5cff 60%,#00ffb2 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 50px rgba(0,200,255,0.4))" }}>
            Extraordinary.
          </span>
        </h1>
        <p className="text-xl sm:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light mb-14">
          Whether you need enterprise AI systems or transformative learning programmes — we have a specialist ready for you. Choose your path below.
        </p>

        {/* Division selector cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-20">
          {paths.map(p => (
            <Link key={p.href} href={p.href}
              className="group text-left rounded-2xl p-8 transition-all duration-400 hover:-translate-y-1"
              style={{ background: p.bg, border: `1px solid ${p.border}` }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = p.hoverBorder;
                el.style.boxShadow = `0 0 60px ${p.glow}`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = p.border;
                el.style.boxShadow = "none";
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-5xl mb-3">{p.icon}</div>
                  <div className="text-xs font-black uppercase tracking-[0.22em] mb-2" style={{ color: p.color }}>{p.division} Division</div>
                  <h2 className="text-2xl font-black text-white leading-tight">Astralearnia<br />{p.division}</h2>
                </div>
                <span className="text-white/20 group-hover:text-white/60 text-2xl transition-all duration-200 group-hover:translate-x-1">→</span>
              </div>
              <p className="text-sm text-white/55 leading-relaxed mb-5">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-bold"
                    style={{ background: `${p.color}12`, border: `1px solid ${p.color}28`, color: `${p.color}` }}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="font-black text-sm" style={{ color: p.color }}>{p.cta}</div>
            </Link>
          ))}
        </div>

        {/* OR divider */}
        <div className="flex items-center gap-4 max-w-2xl mx-auto mb-16">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-xs font-black uppercase tracking-[0.22em] text-white/25">or send a general message</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>
      </section>

      {/* ── General contact form + direct ── */}
      <section className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start max-w-5xl mx-auto">

          {/* Form */}
          <div className="rounded-2xl p-8 lg:p-10"
            style={{ background: "linear-gradient(145deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
            <h2 className="text-xl font-black text-white mb-2">General Enquiry</h2>
            <p className="text-sm text-white/40 mb-7 leading-relaxed">Not sure which division? Send us a message and we'll route it to the right team.</p>
            <ContactFormFull division="general" accentColor="#00c8ff" secondaryColor="#7c5cff" source="/contact" />
          </div>

          {/* Right info */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl p-7" style={{ background: "#0d1622", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="font-black text-white mb-5">Direct Contact</h3>
              {directContacts.map(c => (
                <div key={c.label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/35">{c.label}</span>
                  <a href={`mailto:${c.value}`} className="text-xs font-bold transition-colors hover:text-white"
                    style={{ color: c.color + "cc" }}>{c.value}</a>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-7"
              style={{ background: "linear-gradient(145deg,rgba(0,200,255,0.06),rgba(124,92,255,0.04))", border: "1px solid rgba(0,200,255,0.15)" }}>
              <div className="text-2xl mb-3">⏱</div>
              <h3 className="font-black text-white mb-2">Response Commitment</h3>
              <p className="text-sm text-white/55 leading-relaxed">
                Every enquiry is read by a human. Enterprise and technical requests are routed to a specialist. <strong className="text-white/80">Typical response: under 4 hours</strong> during business hours.
              </p>
            </div>

            <div className="rounded-2xl p-7" style={{ background: "#0d1622", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h3 className="font-black text-white mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Book a Live Demo", href: "/book-demo" },
                  { label: "Read Documentation", href: "/docs" },
                  { label: "Explore Solutions", href: "/solutions" },
                  { label: "Join as a Partner", href: "/partners" },
                ].map(l => (
                  <Link key={l.href} href={l.href}
                    className="flex items-center justify-between py-2.5 text-sm text-white/50 hover:text-white transition-colors group">
                    <span className="font-semibold">{l.label}</span>
                    <span className="text-white/25 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}