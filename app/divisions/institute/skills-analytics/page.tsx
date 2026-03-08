"use client";
// ─────────────────────────────────────────────────────────────────
// FILE: app/divisions/institute/skills-analytics/page.tsx
// Enhanced with interactive SVG/CSS charts in compact 3-panel grid
// ─────────────────────────────────────────────────────────────────
import Link from "next/link";
import { useState } from "react";

const SKILL_DIST = [
  { label:"Technical",   pct:38, col:"#00c8ff" },
  { label:"Leadership",  pct:22, col:"#7c5cff" },
  { label:"Data & AI",   pct:19, col:"#a855f7" },
  { label:"Soft Skills", pct:13, col:"#22d3a5" },
  { label:"Compliance",  pct:8,  col:"#f59e0b" },
];

const TEAM_SCORES = [
  { team:"Engineering",  score:82, prev:68, col:"#00c8ff" },
  { team:"Data Science", score:76, prev:59, col:"#7c5cff" },
  { team:"Product",      score:64, prev:52, col:"#a855f7" },
  { team:"Operations",   score:55, prev:47, col:"#22d3a5" },
  { team:"HR & Talent",  score:41, prev:38, col:"#f59e0b" },
];

const GROWTH_TREND = [
  { month:"Aug", val:42 },{ month:"Sep", val:47 },{ month:"Oct", val:51 },
  { month:"Nov", val:58 },{ month:"Dec", val:63 },{ month:"Jan", val:71 },
  { month:"Feb", val:76 },{ month:"Mar", val:84 },
];

const GAP_DATA = [
  { skill:"ML Ops",         gap:58, col:"#ef4444" },
  { skill:"AI Ethics",      gap:72, col:"#f59e0b" },
  { skill:"Cloud Security", gap:44, col:"#f59e0b" },
  { skill:"Data Governance",gap:31, col:"#22d3a5" },
  { skill:"Prompt Eng.",    gap:19, col:"#00c8ff" },
];

const FEATURES = [
  { icon:"🗺", title:"Org-Wide Skills Map",     accent:"#00c8ff", body:"Live heatmap of every team, department and individual. Know gaps before they become liabilities." },
  { icon:"📉", title:"Gap Analysis Engine",      accent:"#7c5cff", body:"Compare skills against role requirements and benchmarks. Target training where ROI is highest." },
  { icon:"📈", title:"Growth Tracking",          accent:"#22d3a5", body:"Measure skill velocity over time. Set targets, get alerts when teams fall behind growth curves." },
  { icon:"🔮", title:"Predictive Insights",      accent:"#a855f7", body:"AI flags skills critical in 12 months from industry signals. Upskill proactively, not reactively." },
  { icon:"🔗", title:"HRIS & ATS Integration",   accent:"#f59e0b", body:"Skills data flows into Workday, BambooHR, Greenhouse. Inform hiring with real capability data." },
  { icon:"📋", title:"Custom Skill Taxonomies",  accent:"#00c8ff", body:"Build frameworks for your industry, roles, or competency model — not generic skills lists." },
];

const USE_CASES = [
  { role:"CHRO",          pain:"I don't know what skills we're missing to execute our 3-year strategy.", outcome:"Live skills inventory vs strategy-critical capabilities, updated daily." },
  { role:"L&D Director",  pain:"We spend training budget where learners want — not where the business needs.", outcome:"Data-driven training prioritisation with projected business impact." },
  { role:"Engineering VP",pain:"I can't measure if my team's AI skills are growing fast enough.", outcome:"Per-engineer skill velocity tracking with benchmark comparison." },
  { role:"Recruiter",     pain:"I fill roles without knowing which internal candidates are close to ready.", outcome:"Internal candidates ranked by skill gap to any open role." },
];

// ─── SVG Donut Chart ─────────────────────────────────────────────
function DonutChart() {
  const [hov, setHov] = useState<number | null>(null);
  const R = 48; const C = 2 * Math.PI * R;
  let offset = C * 0.25;
  const segs = SKILL_DIST.map(d => {
    const dash = (d.pct / 100) * C;
    const seg = { ...d, dash, off: C - offset };
    offset += dash;
    return seg;
  });
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
      <svg width="120" height="120" viewBox="0 0 120 120" style={{ flexShrink:0 }}>
        <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="16" />
        {segs.map((s, i) => (
          <circle key={i} cx="60" cy="60" r={R} fill="none" stroke={s.col}
            strokeWidth={hov === i ? 20 : 16}
            strokeDasharray={`${s.dash - 2} ${C - s.dash + 2}`}
            strokeDashoffset={s.off}
            style={{ cursor:"pointer", opacity: hov !== null && hov !== i ? 0.35 : 1, transition:"stroke-width 0.18s, opacity 0.18s" }}
            onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} />
        ))}
        <text x="60" y="56" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">
          {hov !== null ? `${SKILL_DIST[hov].pct}%` : "5"}
        </text>
        <text x="60" y="68" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6" fontWeight="700" letterSpacing="0.5">
          {hov !== null ? SKILL_DIST[hov].label.toUpperCase().slice(0,8) : "CATEGORIES"}
        </text>
      </svg>
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:6, minWidth:80 }}>
        {SKILL_DIST.map((d, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:6, cursor:"pointer", opacity: hov !== null && hov !== i ? 0.35 : 1, transition:"opacity 0.18s" }}
            onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:d.col, flexShrink:0, boxShadow:`0 0 5px ${d.col}80` }} />
            <span style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.5)", fontWeight:600, flex:1 }}>{d.label}</span>
            <span style={{ fontSize:"0.7rem", color:"white", fontWeight:900 }}>{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Team Bar Chart ───────────────────────────────────────────────
function TeamBars() {
  const [hov, setHov] = useState<number | null>(null);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      {TEAM_SCORES.map((t, i) => (
        <div key={i} style={{ cursor:"pointer" }} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:3 }}>
            <span style={{ fontSize:"0.65rem", fontWeight:700, color:"rgba(255,255,255,0.65)" }}>{t.team}</span>
            <div style={{ display:"flex", alignItems:"center", gap:5 }}>
              <span style={{ fontSize:"0.58rem", color:"rgba(255,255,255,0.2)", fontWeight:600 }}>{t.prev}%</span>
              <span style={{ fontSize:"0.7rem", fontWeight:900, color:"white" }}>{t.score}%</span>
              <span style={{ fontSize:"0.58rem", fontWeight:800, color:"#22d3a5" }}>+{t.score - t.prev}</span>
            </div>
          </div>
          <div style={{ height:5, background:"rgba(255,255,255,0.05)", borderRadius:3, overflow:"hidden", position:"relative" }}>
            <div style={{ position:"absolute", height:"100%", width:`${t.prev}%`, background:"rgba(255,255,255,0.08)", borderRadius:3 }} />
            <div style={{ position:"absolute", height:"100%", width:`${t.score}%`, background:`linear-gradient(90deg,${t.col},${t.col}70)`, borderRadius:3,
              opacity: hov !== null && hov !== i ? 0.35 : 1, boxShadow: hov === i ? `0 0 6px ${t.col}50` : "none", transition:"opacity 0.18s, box-shadow 0.18s" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Area / Line Chart ────────────────────────────────────────────
function GrowthLine() {
  const W=260; const H=88; const PAD=12;
  const max = 100;
  const pts = GROWTH_TREND.map((d, i) => ({
    x: PAD + (i / (GROWTH_TREND.length-1)) * (W - PAD*2),
    y: H - PAD - (d.val / max) * (H - PAD*2 - 4),
    ...d,
  }));
  const line = pts.map((p,i) => `${i===0?"M":"L"}${p.x},${p.y}`).join(" ");
  const area = `${line} L${pts[pts.length-1].x},${H-PAD} L${pts[0].x},${H-PAD} Z`;
  const [hov, setHov] = useState<number | null>(null);
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow:"visible" }}>
      <defs>
        <linearGradient id="gl_fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00c8ff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#00c8ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[25,50,75].map(v => {
        const y = H - PAD - (v/max)*(H-PAD*2-4);
        return <line key={v} x1={PAD} y1={y} x2={W-PAD} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3,3" />;
      })}
      <path d={area} fill="url(#gl_fill)" />
      <path d={line} fill="none" stroke="#00c8ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <g key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{ cursor:"pointer" }}>
          <circle cx={p.x} cy={p.y} r={hov===i ? 4.5 : 2.5}
            fill={hov===i ? "#00c8ff" : "#050810"} stroke="#00c8ff" strokeWidth="1.5"
            style={{ transition:"r 0.15s" }} />
          {hov===i && (
            <g>
              <rect x={p.x-14} y={p.y-18} width="28" height="13" rx="3" fill="rgba(6,16,30,0.97)" stroke="rgba(0,200,255,0.35)" strokeWidth="1" />
              <text x={p.x} y={p.y-8} textAnchor="middle" fill="white" fontSize="7" fontWeight="900">{p.val}%</text>
            </g>
          )}
        </g>
      ))}
      {pts.map((p,i) => (
        <text key={i} x={p.x} y={H+2} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6" fontWeight="600">{p.month}</text>
      ))}
    </svg>
  );
}

export default function SkillsAnalyticsPage() {
  return (
    <main className="bg-[#050810] min-h-screen text-white font-sans antialiased">
      <style>{`
        .sa-card {
          background: rgba(13,22,34,0.65);
          backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .sa-card:hover { border-color:rgba(255,255,255,0.13); transform:translateY(-2px); }
        .sa-3col { display:grid; grid-template-columns:1fr; gap:12px; }
        @media(min-width:640px){ .sa-3col { grid-template-columns:1fr 1fr; } }
        @media(min-width:1024px){ .sa-3col { grid-template-columns:1fr 1.2fr 0.9fr; } }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(0,200,255,0.07),transparent)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HERO ── */}
        <div className="pt-32 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Link href="/divisions/institute" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors mb-7">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
                Institute Division
              </Link>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/25 bg-cyan-400/8 text-cyan-300 text-[10px] font-black uppercase tracking-[0.18em] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Skills Intelligence
              </div>
              <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.04em] leading-[1.02] mb-5">
                See Every Skill.{" "}
                <span style={{ background:"linear-gradient(135deg,#00c8ff,#7c5cff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                  Close Every Gap.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 font-semibold">
                Real-time skills intelligence across your entire organisation. Know where capability exists, where it&apos;s missing, and exactly how to close it.
              </p>
              <Link href="/book-demo" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 shadow-[0_0_28px_rgba(0,200,255,0.35)] hover:shadow-[0_0_45px_rgba(0,200,255,0.55)] transition-all hover:-translate-y-0.5">
                See Live Demo →
              </Link>
            </div>

            {/* Hero chart widget */}
            <div className="sa-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-black text-white text-xs">Org Growth Trend · 2025–26</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Avg proficiency across all teams</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-cyan-300">Live</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl font-black text-white">84%</span>
                <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">↑ 42% YoY</span>
              </div>
              <GrowthLine />
              <div className="mt-2 flex items-center justify-between text-[9px] text-slate-500 font-semibold">
                <span>47 employees · 12 skills tracked</span>
                <span className="text-cyan-400">Updated 2 min ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── COMPACT 3-CHART GRID ── */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-[0.18em]">Live Dashboard</div>
            <span className="text-[10px] text-slate-500 font-semibold">Hover charts to explore data</span>
          </div>
          <div className="sa-3col">

            {/* Donut — skill distribution */}
            <div className="sa-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-black text-white text-[11px]">Skill Distribution</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">By category · org-wide</div>
                </div>
                <span className="text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/15">5 Categories</span>
              </div>
              <DonutChart />
            </div>

            {/* Bar — team scores */}
            <div className="sa-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-black text-white text-[11px]">Team Proficiency</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">Current vs prior quarter</div>
                </div>
                <span className="text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-violet-400/10 text-violet-300 border border-violet-400/15">Q1 2026</span>
              </div>
              <TeamBars />
            </div>

            {/* Gap analysis */}
            <div className="sa-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-black text-white text-[11px]">Critical Gaps</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">Roles needing attention</div>
                </div>
                <span className="text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-red-400/10 text-red-300 border border-red-400/15">3 Critical</span>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                {GAP_DATA.map(g => (
                  <div key={g.skill}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                      <span style={{ fontSize:"0.65rem", fontWeight:700, color:"rgba(255,255,255,0.6)" }}>{g.skill}</span>
                      <span style={{ fontSize:"0.65rem", fontWeight:900, color:g.col }}>{g.gap}%</span>
                    </div>
                    <div style={{ height:4, background:"rgba(255,255,255,0.05)", borderRadius:2, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${g.gap}%`, background:`linear-gradient(90deg,${g.col},${g.col}60)`, borderRadius:2 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-white/6">
                <Link href="/book-demo" className="text-[9px] font-black text-cyan-400 hover:text-cyan-300 transition-colors">View full report →</Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── FEATURES ── */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-6">Full Intelligence Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FEATURES.map((f, i) => (
              <div key={i} className="sa-card p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0 mt-0.5"
                    style={{ background:`${f.accent}15`, border:`1px solid ${f.accent}20` }}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-white text-xs mb-1">{f.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{f.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── USE CASES ── */}
        <div className="mb-20">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-6">Built for Every Stakeholder</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {USE_CASES.map((u, i) => (
              <div key={i} className="sa-card p-5">
                <div className="text-[8px] font-black uppercase tracking-widest text-cyan-400 mb-2.5 px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20 inline-flex">{u.role}</div>
                <p className="text-xs text-slate-300 italic mb-2.5 font-medium leading-relaxed">&ldquo;{u.pain}&rdquo;</p>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 shrink-0 text-xs">✦</span>
                  <p className="text-[11px] text-emerald-300 font-semibold leading-relaxed">{u.outcome}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/book-demo" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 shadow-[0_0_28px_rgba(0,200,255,0.3)] hover:shadow-[0_0_45px_rgba(0,200,255,0.5)] transition-all hover:-translate-y-0.5">
              Book a Skills Analytics Demo →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}