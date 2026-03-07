"use client";
import { useEffect, useRef, useState } from "react";

const cookieTypes = [
  {
    type: "Strictly Necessary",
    required: true,
    color: "#00c8ff",
    icon: "🔐",
    desc: "Required for the platform to function. Includes authentication tokens, CSRF protection, and session management. Cannot be disabled.",
    examples: ["__session", "csrf_token", "auth_state"],
  },
  {
    type: "Performance & Analytics",
    required: false,
    color: "#00ffb2",
    icon: "📊",
    desc: "Help us understand how you use the platform so we can improve it. All data is aggregated and anonymised — nothing is sold.",
    examples: ["_ga", "_gid", "plausible_ignore"],
  },
  {
    type: "Functional",
    required: false,
    color: "#a855f7",
    icon: "⚙️",
    desc: "Enable personalisation features such as remembering your dashboard preferences, language, and theme settings across sessions.",
    examples: ["preferences", "sidebar_state", "theme"],
  },
  {
    type: "Marketing",
    required: false,
    color: "#ff6ec7",
    icon: "📣",
    desc: "Used to deliver relevant advertising and measure campaign effectiveness. Only set with your explicit consent via our cookie banner.",
    examples: ["_fbp", "li_gc"],
  },
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

export default function CookiesPage() {
  const [toggled, setToggled] = useState<Record<string, boolean>>({ "Strictly Necessary": true });

  const toggle = (type: string, required: boolean) => {
    if (required) return;
    setToggled(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <main className="bg-[#040710] min-h-screen text-white font-sans antialiased overflow-x-hidden">
      <style>{`
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        .shimmer{background-size:200% auto;animation:shimmer 4s linear infinite}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        .float-icon{animation:float 4s ease-in-out infinite}
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 35% at 50% 0%, rgba(168,85,247,0.07), transparent)" }} />
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.9) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      </div>

      <section className="relative z-10 pt-32 pb-24 px-6 lg:px-14 max-w-2xl mx-auto">
        <Fade>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-7"
            style={{ border: "1px solid rgba(168,85,247,0.25)", background: "rgba(168,85,247,0.06)", color: "#a855f7" }}>
            Legal Document
          </span>
        </Fade>
        <Fade delay={50}>
          <h1 className="font-black leading-[0.93] tracking-[-0.045em] text-[clamp(2.8rem,6vw,5rem)] mb-3">
            <span className="text-white">Cookie </span>
            <span className="shimmer" style={{ background: "linear-gradient(90deg,#a855f7,#ec4899,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Policy</span>
          </h1>
        </Fade>
        <Fade delay={90}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs text-white/30 font-medium">Last updated: March 1, 2026</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-xs text-white/30">Astralearnia Technologies Ltd</span>
          </div>
        </Fade>
        <Fade delay={110}>
          <p className="text-sm text-white/45 leading-relaxed mb-10">
            We use cookies and similar technologies on our website and platform. This policy explains what they are, why we use them, and how you can control them. By using our services, you consent to our use of cookies as described here.
          </p>
        </Fade>

        {/* Cookie type cards with toggles */}
        <div className="flex flex-col gap-3 mb-10">
          {cookieTypes.map((c, i) => {
            const isOn = toggled[c.type] ?? false;
            return (
              <Fade key={c.type} delay={i * 50 + 120}>
                <div className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{ background: isOn ? `${c.color}06` : "rgba(255,255,255,0.025)", border: `1px solid ${isOn ? c.color + "35" : "rgba(255,255,255,0.07)"}` }}>
                  <div className="flex items-start justify-between px-5 pt-5 pb-3 gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl float-icon" style={{ animationDelay: `${i * 0.4}s` }}>{c.icon}</span>
                      <div>
                        <h2 className="text-sm font-black text-white leading-none">{c.type}</h2>
                        <span className="text-[10px] font-bold mt-0.5 block" style={{ color: c.required ? c.color : "rgba(255,255,255,0.3)" }}>
                          {c.required ? "Always On · Cannot be disabled" : "Optional"}
                        </span>
                      </div>
                    </div>
                    {/* Toggle switch */}
                    <button
                      onClick={() => toggle(c.type, c.required)}
                      className="shrink-0 relative w-10 h-5.5 rounded-full transition-all duration-300 mt-0.5"
                      style={{ background: isOn ? c.color : "rgba(255,255,255,0.1)", width: 40, height: 22, opacity: c.required ? 0.6 : 1, cursor: c.required ? "not-allowed" : "pointer" }}
                      aria-label={`Toggle ${c.type}`}>
                      <span className="absolute top-0.5 bottom-0.5 rounded-full bg-white transition-all duration-300"
                        style={{ left: isOn ? "calc(100% - 18px)" : "2px", width: 18 }} />
                    </button>
                  </div>
                  <div className="px-5 pb-4">
                    <p className="text-xs text-white/45 leading-relaxed mb-3">{c.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {c.examples.map(e => (
                        <code key={e} className="px-2 py-1 rounded-lg text-[10px] font-mono text-white/40"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>{e}</code>
                      ))}
                    </div>
                  </div>
                </div>
              </Fade>
            );
          })}
        </div>

        {/* Save prefs */}
        <Fade delay={320}>
          <div className="flex items-center justify-between p-5 rounded-2xl mb-8"
            style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.22)" }}>
            <div>
              <p className="text-sm font-black text-white">Save My Preferences</p>
              <p className="text-xs text-white/35 mt-0.5">Your choices apply to this browser.</p>
            </div>
            <button className="px-5 py-2.5 rounded-xl font-black text-white text-xs transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", boxShadow: "0 4px 16px rgba(168,85,247,0.3)" }}>
              Save →
            </button>
          </div>
        </Fade>

        <Fade delay={360}>
          <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <h3 className="text-sm font-black text-white mb-2">Managing Your Preferences</h3>
            <p className="text-xs text-white/40 leading-relaxed">
              You can also manage cookies via your browser settings. Note that disabling essential cookies may affect platform functionality.
              Questions? Contact{" "}
              <a href="mailto:privacy@astralearnia.com" className="text-violet-400 hover:text-violet-300 transition-colors">privacy@astralearnia.com</a>
            </p>
          </div>
        </Fade>
      </section>
    </main>
  );
}