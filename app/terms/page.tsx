"use client";
import { useEffect, useRef, useState } from "react";

const sections = [
  { heading: "Acceptance of Terms",      body: "By accessing or using Astralearnia's platform, APIs, or services, you agree to be bound by these Terms of Service. If you are accessing on behalf of an organisation, you represent that you have authority to bind that organisation." },
  { heading: "Services",                 body: "Astralearnia provides AI platform services (Technology Division) and digital learning services (Institute Division). Service availability, features, and SLAs are defined in your subscription plan or enterprise agreement." },
  { heading: "Accounts and Access",      body: "You are responsible for maintaining the security of your account credentials. You must not share API keys or access tokens. Notify us immediately of any unauthorised access at security@astralearnia.com." },
  { heading: "Acceptable Use",           body: "You may not use our services to violate applicable laws, infringe intellectual property rights, transmit malicious code, conduct unauthorised penetration testing, or engage in any activity that disrupts our infrastructure or other users." },
  { heading: "Intellectual Property",    body: "Astralearnia retains all rights to its platform, models, and documentation. You retain ownership of your data. By uploading data for model training, you grant Astralearnia a limited licence to use it solely for providing your service." },
  { heading: "Payment and Billing",      body: "Fees are billed in advance on a monthly or annual basis. All fees are non-refundable except where required by law or as specified in your enterprise agreement. We reserve the right to suspend accounts 14 days after failed payment." },
  { heading: "Limitation of Liability",  body: "To the maximum extent permitted by law, Astralearnia's liability for indirect, incidental, or consequential damages is excluded. Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim." },
  { heading: "Termination",              body: "Either party may terminate this agreement with 30 days written notice. We may terminate immediately for material breach. Upon termination, your access will cease and your data will be deleted per our data retention policy." },
  { heading: "Governing Law",            body: "These terms are governed by the laws of the Federal Republic of Nigeria. Disputes shall first be resolved by good faith negotiation, then by binding arbitration in Lagos, Nigeria." },
  { heading: "Contact",                  body: "Legal queries: legal@astralearnia.com · Astralearnia Technologies Ltd · Lagos, Nigeria." },
];

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.07 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, vis };
}
function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, vis } = useFadeIn();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function TermsPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <main className="bg-[#040710] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <style>{`
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        .shimmer{background-size:200% auto;animation:shimmer 4s linear infinite}
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 35% at 50% 0%, rgba(0,200,255,0.07), transparent)" }} />
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: "radial-gradient(circle, rgba(0,200,255,0.9) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      </div>

      <section className="relative z-10 pt-32 pb-24 px-6 lg:px-14 max-w-2xl mx-auto">
        <Fade>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-7"
            style={{ border: "1px solid rgba(0,200,255,0.25)", background: "rgba(0,200,255,0.06)", color: "#00c8ff" }}>
            Legal Document
          </span>
        </Fade>
        <Fade delay={50}>
          <h1 className="font-black leading-[0.93] tracking-[-0.045em] text-[clamp(2.8rem,6vw,5rem)] mb-3">
            <span className="text-white">Terms of </span>
            <span className="shimmer" style={{ background: "linear-gradient(90deg,#00c8ff,#7c5cff,#00c8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Service</span>
          </h1>
        </Fade>
        <Fade delay={90}>
          <div className="flex items-center gap-4 mb-12">
            <span className="text-xs text-white/30 font-medium">Last updated: March 1, 2026</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-xs text-white/30">Astralearnia Technologies Ltd</span>
          </div>
        </Fade>

        {/* Accordion sections */}
        <div className="flex flex-col gap-2.5">
          {sections.map((s, i) => {
            const open = expanded === i;
            return (
              <Fade key={s.heading} delay={i * 35}>
                <div className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{ background: open ? "rgba(0,200,255,0.05)" : "rgba(255,255,255,0.025)", border: `1px solid ${open ? "rgba(0,200,255,0.28)" : "rgba(255,255,255,0.07)"}` }}>
                  <button
                    onClick={() => setExpanded(open ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left group">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-white/20 tabular-nums w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors">{s.heading}</span>
                    </div>
                    <span className="text-white/30 text-lg transition-transform duration-300 shrink-0 ml-4"
                      style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                  </button>
                  <div style={{ maxHeight: open ? "300px" : "0", overflow: "hidden", transition: "max-height 0.35s ease" }}>
                    <p className="px-5 pb-5 text-sm text-white/50 leading-relaxed"
                      style={{ paddingLeft: "calc(1.25rem + 1.25rem + 0.75rem)" }}>
                      {s.body}
                    </p>
                  </div>
                </div>
              </Fade>
            );
          })}
        </div>

        {/* Footer note */}
        <Fade delay={400}>
          <div className="mt-10 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-xs text-white/35 leading-relaxed">
              By using Astralearnia's services, you confirm you have read and agree to these terms. For questions, contact{" "}
              <a href="mailto:legal@astralearnia.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">legal@astralearnia.com</a>
            </p>
          </div>
        </Fade>
      </section>
    </main>
  );
}