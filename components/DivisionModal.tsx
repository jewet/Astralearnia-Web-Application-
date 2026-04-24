"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const tech = {
  color: "#00c8ff",
  gradient: "linear-gradient(135deg,#00c8ff,#3b82f6)",
  shadow: "0 0 50px rgba(0,200,255,0.22)",
  label: "Division 01",
  name: "Technology",
  icon: "⚡",
  tag: "For Businesses",
  headline: "AI systems that go from discovery to live in 30 days.",
  desc: "We design, build, and deploy custom AI infrastructure — intelligent APIs, data pipelines, model fine-tuning, and automation engines for enterprises ready to move beyond demos.",
  features: ["Custom AI & LLM Development","Decision Intelligence Suite","Intelligence API Platform","Data Pipeline Automation","Enterprise Integrations","AI Governance & Security","Robotics & Automation","Cybersecurity AI","Embedded AI Systems","Blockchain Intelligence"],
  stats: [["<48h","Deployment"],["99.9%","API Uptime"],["200+","Clients"]],
  cta: "Explore Technology",
  href: "/technologies",
};

const institute = {
  color: "#a855f7",
  gradient: "linear-gradient(135deg,#a855f7,#ec4899)",
  shadow: "0 0 50px rgba(168,85,247,0.22)",
  label: "Division 02",
  name: "Institute",
  icon: "🎓",
  tag: "For People",
  headline: "Adaptive AI learning that closes skill gaps faster.",
  desc: "We build personalised learning systems for individuals, enterprises, and institutions — AI-powered pathways, skills analytics, and certifications that matter in today's market.",
  features: ["Adaptive Learning Paths","Corporate Training Programmes","AI Skill Certifications","Skills Gap Analytics","Instructor & Admin Tools","LMS & HRIS Integration","Progress Dashboards","White-label Platform"],
  stats: [["12K+","Learners"],["94%","Pass Rate"],["300+","Clients"]],
  cta: "Explore Institute",
  href: "/institute",
};

export function DivisionModal({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(4,7,16,0.85)", backdropFilter: "blur(12px)" }}
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Modal shell */}
      <div
        className="relative w-full flex flex-col"
        style={{ maxWidth: 960, maxHeight: "90vh", background: "#080d1c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden" }}
      >
        {/* ── Fixed header ── */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#080d1c" }}>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/30 mb-0.5">Astralearnia</p>
            <h2 className="text-lg font-black text-white leading-none">Which division fits your needs?</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white/35 hover:text-white hover:bg-white/8 transition-all text-xl"
            aria-label="Close">×</button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain" style={{ scrollbarWidth: "none" }}>
          <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[tech, institute].map((d) => (
              <div
                key={d.name}
                className="flex flex-col rounded-2xl overflow-hidden"
                style={{ background: "#0d1220", border: `1px solid ${d.color}22` }}
              >
                {/* Card top band */}
                <div className="px-5 pt-5 pb-4" style={{ borderBottom: `1px solid ${d.color}14` }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg mb-2"
                        style={{ background: `${d.color}12`, color: d.color }}>{d.label} · {d.tag}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{d.icon}</span>
                        <h3 className="text-xl font-black text-white">Astralearnia {d.name}</h3>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-white/60 leading-relaxed mb-3">{d.headline}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{d.desc}</p>
                </div>

                {/* Features */}
                <div className="px-5 py-4" style={{ borderBottom: `1px solid ${d.color}10` }}>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-3">Includes</p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {d.features.map(f => (
                      <div key={f} className="flex items-center gap-1.5 text-xs text-white/50">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: d.color }} />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="px-5 py-3 flex gap-5" style={{ borderBottom: `1px solid ${d.color}10` }}>
                  {d.stats.map(([val, label]) => (
                    <div key={label}>
                      <div className="text-lg font-black" style={{ color: d.color }}>{val}</div>
                      <div className="text-[10px] text-white/30 uppercase tracking-wider">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Card CTA */}
                <div className="px-5 py-4 mt-auto">
                  <Link
                    href={d.href}
                    onClick={onClose}
                    className="w-full flex items-center justify-center py-3 rounded-xl font-black text-white text-sm transition-all hover:-translate-y-0.5"
                    style={{ background: d.gradient, boxShadow: `0 4px 18px ${d.color}28` }}
                  >
                    {d.cta} →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison hint */}
          <div className="px-5 sm:px-6 pb-5">
            <div className="rounded-2xl p-4 text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs text-white/35 mb-3">Not sure? Many clients use <strong className="text-white/60">both divisions</strong> — Technology for AI infrastructure, Institute for upskilling their teams.</p>
              <Link href="/contact" onClick={onClose} className="inline-flex items-center gap-1.5 text-xs font-black text-white/45 hover:text-white transition-colors">
                Talk to a solutions advisor →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Fixed footer ── */}
        <div className="shrink-0 flex items-center justify-between px-6 py-3.5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#080d1c" }}>
          <p className="text-xs text-white/25">Press <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>Esc</kbd> to close</p>
          <div className="flex items-center gap-2">
            <Link href="/book-demo" onClick={onClose}
              className="px-4 py-2 rounded-xl font-black text-white text-xs transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", boxShadow: "0 4px 14px rgba(0,200,255,0.25)" }}>
              Book a Demo →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}