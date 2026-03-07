"use client";
// ═══════════════════════════════════════
// SAVE THIS AS: app/partners/page.tsx
// ═══════════════════════════════════════
import Link from "next/link";

const tiers = [
  {
    name: "Referral Partner",
    icon: "◇",
    color: "#00ffb2",
    price: "Free",
    desc: "Refer organisations who need AI systems or training. Earn commission on every closed deal.",
    perks: ["15% recurring commission", "Partner portal access", "Co-branded collateral", "Dedicated partner manager"],
    cta: "Join for Free",
  },
  {
    name: "Reseller Partner",
    icon: "◈",
    color: "#00c8ff",
    price: "Vetted",
    featured: true,
    desc: "Resell Astralearnia products under your brand. Full training, support, and margin included.",
    perks: ["25% margin on products", "White-label option", "Dedicated sales support", "Priority technical training", "Co-marketing budget"],
    cta: "Apply to Resell",
  },
  {
    name: "Technology Partner",
    icon: "⚡",
    color: "#a855f7",
    price: "Invite Only",
    desc: "Deep technical integration between your product and Astralearnia. Build joint solutions.",
    perks: ["API integration support", "Joint go-to-market", "Listed in integration marketplace", "Revenue share model", "Co-development access"],
    cta: "Request Invite",
  },
];

export default function PartnersPage() {
  return (
    <main className="bg-[#050810] min-h-screen text-white font-sans antialiased">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(0,255,178,0.07),transparent)]" />
      </div>

      <section className="relative z-10 pt-36 pb-20 px-6 lg:px-12 max-w-screen-xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/6 text-emerald-300 text-xs font-black uppercase tracking-[0.18em] mb-8">
          Partner Programme
        </div>
        <h1 className="font-black leading-[1.0] tracking-[-0.04em] text-5xl sm:text-6xl lg:text-7xl max-w-5xl mx-auto mb-8">
          <span className="block text-white">Grow With</span>
          <span className="block" style={{ background: "linear-gradient(135deg,#00ffb2,#00c8ff,#7c5cff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Astralearnia</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light mb-14">
          Join 80+ partners across Africa and globally who resell, integrate, and refer Astralearnia to enterprises and institutions.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map(t => (
            <div key={t.name} className="rounded-2xl flex flex-col overflow-hidden transition-all duration-400 hover:-translate-y-1"
              style={{ background: "#0d1622", border: `1px solid ${t.color}25` }}>
              {t.featured && <div className="py-2 text-[10px] font-black uppercase tracking-[0.22em] text-center"
                style={{ background: `${t.color}15`, borderBottom: `1px solid ${t.color}25`, color: t.color }}>★ Most Popular</div>}
              <div className="p-8 flex flex-col flex-1">
                <div className="text-3xl mb-4">{t.icon}</div>
                <h3 className="text-2xl font-black text-white mb-1">{t.name}</h3>
                <div className="text-xs font-bold text-white/35 mb-4">{t.price}</div>
                <p className="text-sm text-white/55 leading-relaxed mb-6 flex-1">{t.desc}</p>
                <ul className="flex flex-col gap-2 mb-7">
                  {t.perks.map(p => (
                    <li key={p} className="flex items-center gap-2 text-xs text-white/65">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.color }} />{p}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="w-full text-center py-3 rounded-xl font-black text-sm transition-all hover:-translate-y-0.5"
                  style={{ background: t.featured ? `linear-gradient(135deg,${t.color},#7c5cff)` : `${t.color}18`, border: t.featured ? "none" : `1px solid ${t.color}35`, color: t.featured ? "#050810" : t.color, boxShadow: t.featured ? `0 6px 24px ${t.color}40` : "none" }}>
                  {t.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 border-t border-white/6 bg-[#080c14] py-20 text-center px-6">
        <h2 className="text-3xl font-black text-white mb-4">Have Questions?</h2>
        <p className="text-white/45 mb-8">Our partner team is available to walk you through the programme.</p>
        <Link href="mailto:partners@astralearnia.com" className="px-8 py-4 rounded-xl font-black text-[#050810] inline-flex transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg,#00ffb2,#00c8ff)", boxShadow: "0 8px 30px rgba(0,255,178,0.4)" }}>
          partners@astralearnia.com →
        </Link>
      </section>
    </main>
  );
}