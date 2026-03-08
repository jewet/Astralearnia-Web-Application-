"use client";
// ─────────────────────────────────────────────────────────────────
// FILE: app/press/page.tsx
// ─────────────────────────────────────────────────────────────────
import Link from "next/link";

const COVERAGE = [
  { outlet:"TechCrunch",    date:"Feb 2026", headline:"Astralearnia raises $12M Series A to bring AI learning infrastructure to African enterprises", tag:"Funding" },
  { outlet:"Wired Africa",  date:"Jan 2026", headline:"How a Lagos startup is replacing five L&D platforms with one AI engine", tag:"Feature" },
  { outlet:"VentureBeat",   date:"Dec 2025", headline:"Astralearnia's Institute division reports 94% course completion — nearly 8× industry average", tag:"Data" },
  { outlet:"The Punch",     date:"Nov 2025", headline:"Astralearnia certifies 5,000th learner, expanding into East Africa", tag:"Milestone" },
  { outlet:"Forbes Africa", date:"Oct 2025", headline:"30 Under 30: The founders rebuilding how African companies develop talent", tag:"Awards" },
];

const STATS = [
  { val:"$12M",  label:"Series A raised (Feb 2026)"     },
  { val:"500+",  label:"Enterprise clients globally"    },
  { val:"12K+",  label:"Active learners"                },
  { val:"94%",   label:"Course completion rate"         },
];

const ASSETS = [
  { icon:"🖼", title:"Brand Assets",    body:"Logos in SVG, PNG, and EPS. Light and dark variants. Colour codes and usage guidelines.", href:"#" },
  { icon:"📄", title:"Press Kit PDF",   body:"Company overview, founding story, product screenshots, executive bios, and key metrics.", href:"#" },
  { icon:"📸", title:"Photography",     body:"High-resolution founder portraits, office, and product screenshots for editorial use.", href:"#" },
  { icon:"📹", title:"B-Roll & Video",  body:"Platform demo footage, office walkthroughs, and investor soundbites for broadcast use.", href:"#" },
];

const EXECS = [
  { name:"Adaeze Okonkwo",   role:"CEO & Co-Founder",  bio:"Former ML engineer at Google DeepMind. Built and scaled AI products to 50M users before founding Astralearnia." },
  { name:"Emeka Eze",        role:"CTO & Co-Founder",  bio:"Ex-Flutterwave principal engineer. Leads all product and platform engineering for the Technology Division." },
  { name:"Sade Adeyemi",     role:"Chief Learning Officer", bio:"PhD in Cognitive Science (UCL). Architect of Astralearnia's adaptive learning engine and Institute curriculum." },
];

export default function PressPage() {
  return (
    <main className="bg-[#050810] min-h-screen text-white font-sans antialiased">
      <style>{`
        .prs-card {
          background: rgba(13,22,34,0.65);
          backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .prs-card:hover { border-color:rgba(255,255,255,0.14); transform:translateY(-2px); }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(0,200,255,0.06),transparent)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HERO */}
        <div className="pt-32 pb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-[0.18em] mb-5">Press & Media</div>
          <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.04em] leading-[1.02] mb-6">
            <span style={{ background:"linear-gradient(135deg,#00c8ff,#7c5cff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Press Room
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-xl leading-relaxed font-semibold mb-6">
            Media enquiries, press kit downloads, and the latest Astralearnia news.
          </p>
          <a href="mailto:press@astralearnia.com" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm text-white border-2 border-white/25 hover:border-white/50 transition-all hover:-translate-y-0.5">
            ✉ press@astralearnia.com
          </a>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {STATS.map(s => (
            <div key={s.val} className="prs-card p-5 text-center">
              <div className="text-2xl font-black text-white mb-1">{s.val}</div>
              <div className="text-[10px] text-slate-400 font-semibold leading-snug">{s.label}</div>
            </div>
          ))}
        </div>

        {/* COVERAGE */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-black mb-6">Recent Coverage</h2>
          <div className="flex flex-col gap-3">
            {COVERAGE.map((c, i) => (
              <div key={i} className="prs-card p-5 flex items-start gap-4">
                <div className="shrink-0 text-right min-w-[80px]">
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">{c.date}</div>
                  <div className="font-black text-white text-xs mt-0.5">{c.outlet}</div>
                </div>
                <div className="w-px h-10 bg-white/8 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/15 mr-2">{c.tag}</span>
                  <span className="text-sm text-slate-200 font-semibold leading-relaxed">{c.headline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ASSETS */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-black mb-6">Press Assets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ASSETS.map(a => (
              <a key={a.title} href={a.href} className="prs-card p-5 flex items-start gap-4 no-underline group">
                <div className="text-2xl shrink-0">{a.icon}</div>
                <div>
                  <div className="font-black text-white text-sm mb-1.5 group-hover:text-cyan-300 transition-colors">{a.title} →</div>
                  <div className="text-xs text-slate-400 font-medium leading-relaxed">{a.body}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* TEAM */}
        <div className="mb-24">
          <h2 className="text-xl sm:text-2xl font-black mb-6">Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {EXECS.map(e => (
              <div key={e.name} className="prs-card p-5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400/30 to-violet-400/30 border border-white/15 flex items-center justify-center font-black text-lg mb-3">
                  {e.name[0]}
                </div>
                <div className="font-black text-white text-sm mb-0.5">{e.name}</div>
                <div className="text-[9px] font-black uppercase tracking-widest text-cyan-400 mb-3">{e.role}</div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">{e.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}