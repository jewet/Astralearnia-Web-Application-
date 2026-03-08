"use client";
// ─────────────────────────────────────────────────────────────────
// FILE: app/divisions/technology/ai-models/page.tsx
// ─────────────────────────────────────────────────────────────────
import Link from "next/link";

const MODELS = [
  {
    id:"AST-DECISION-1", name:"DecisionCore",   icon:"⚡",
    accent:"#00c8ff", tag:"Decision Intelligence",
    desc:"Real-time decision support model trained on structured business data. Surfaces prioritised recommendations with explainability scores. Avg latency <120ms.",
    specs:["Context window: 32K tokens","Fine-tunable on your data","REST + GraphQL endpoints","SOC 2 compliant","On-prem deployment available"],
    useCases:["Credit risk scoring","Supply chain optimisation","Dynamic pricing","HR decision support"],
  },
  {
    id:"AST-LEARN-1", name:"LearnCore",      icon:"🧠",
    accent:"#7c5cff", tag:"Adaptive Learning",
    desc:"Personalisation engine powering the Institute platform. Builds real-time learner models, predicts knowledge decay, and sequences content for maximum retention.",
    specs:["Learner model updates every session","95th percentile accuracy on skill prediction","Multi-modal: text, video, code","Privacy-first: no raw data leaves client","Audit trail built in"],
    useCases:["Corporate LMS personalisation","Assessment generation","Skill gap prediction","Content recommendation"],
  },
  {
    id:"AST-EXTRACT-1",name:"DataExtract",    icon:"🔍",
    accent:"#22d3a5", tag:"Document Intelligence",
    desc:"Structured extraction from unstructured documents. PDFs, contracts, forms, email threads — outputs clean JSON your existing systems can consume directly.",
    specs:["100+ document types","99.1% field extraction accuracy","Multi-language (30+ languages)","PII detection & redaction","Webhook on completion"],
    useCases:["Contract analysis","Invoice processing","Compliance document review","Knowledge base ingestion"],
  },
  {
    id:"AST-CONV-1",   name:"ConvCore",       icon:"💬",
    accent:"#a855f7", tag:"Conversational AI",
    desc:"Enterprise conversational model with long memory, tool use, and strict safety guardrails. Deploy as internal chatbot, customer agent, or knowledge assistant.",
    specs:["128K context window","Tool use & function calling","Custom persona & tone control","Retrieval-augmented (RAG ready)","Human escalation hooks"],
    useCases:["Internal knowledge assistant","Customer support automation","HR onboarding bot","Sales enablement"],
  },
];

const HOW = [
  { n:"01", title:"Connect Your Data",  body:"Point to your data warehouse, S3 bucket, or CRM. We never move your data — inference runs in your VPC." },
  { n:"02", title:"Fine-Tune (Optional)",body:"Upload domain examples. Our pipeline handles data prep, training, evaluation, and deployment in 24–48 hours." },
  { n:"03", title:"Integrate via API",   body:"Consistent REST and GraphQL endpoints across all models. SDKs available for Python, Node.js, and Go." },
  { n:"04", title:"Monitor & Iterate",  body:"Built-in dashboards for latency, accuracy drift, usage, and cost. Set alerts and trigger retraining automatically." },
];

export default function AIModelsPage() {
  return (
    <main className="bg-[#050810] min-h-screen text-white font-sans antialiased">
      <style>{`
        .mod-card {
          background: rgba(13,22,34,0.65);
          backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .mod-card:hover { border-color:rgba(255,255,255,0.15); transform:translateY(-2px); }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(0,200,255,0.07),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_90%_70%,rgba(124,92,255,0.05),transparent)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HERO */}
        <div className="pt-32 pb-16 text-center">
          <Link href="/divisions/technology" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors mb-8">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
            Technology Division
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/25 bg-cyan-400/8 text-cyan-300 text-[10px] font-black uppercase tracking-[0.18em] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI Models
          </div>
          <h1 className="font-black text-4xl sm:text-5xl lg:text-7xl tracking-[-0.04em] leading-[1.02] mb-6 max-w-5xl mx-auto">
            Purpose-Built Models.{" "}
            <span style={{ background:"linear-gradient(135deg,#00c8ff,#7c5cff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Production Ready.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-semibold">
            Not generic LLM wrappers. Specialised AI models trained for enterprise decision-making, learning, and automation — fine-tunable on your own data.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/api-docs" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 shadow-[0_0_30px_rgba(0,200,255,0.4)] hover:shadow-[0_0_50px_rgba(0,200,255,0.6)] transition-all hover:-translate-y-0.5">
              View API Docs →
            </Link>
            <Link href="/book-demo" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm border-2 border-white/25 hover:border-white/50 text-white transition-all hover:-translate-y-0.5">
              Book Demo
            </Link>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {HOW.map((h, i) => (
            <div key={i} className="mod-card p-5 text-center">
              <div className="text-[9px] font-black uppercase tracking-widest text-cyan-400 mb-2">{h.n}</div>
              <h3 className="font-black text-white text-sm mb-2">{h.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">{h.body}</p>
            </div>
          ))}
        </div>

        {/* MODEL CARDS */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">Model Catalogue</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {MODELS.map(m => (
              <div key={m.id} className="mod-card p-7 flex flex-col"
                style={{ borderTopColor:`${m.accent}25` }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-[8px] font-black uppercase tracking-widest mb-1" style={{ color:m.accent }}>{m.id}</div>
                    <div className="font-black text-white text-xl">{m.icon} {m.name}</div>
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full"
                    style={{ background:`${m.accent}15`, color:m.accent, border:`1px solid ${m.accent}25` }}>
                    {m.tag}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-5 font-semibold flex-1">{m.desc}</p>

                <div className="grid grid-cols-2 gap-6 mb-5">
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">Specs</div>
                    <ul className="flex flex-col gap-1.5">
                      {m.specs.map(s => (
                        <li key={s} className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ background:m.accent }} />{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">Use Cases</div>
                    <ul className="flex flex-col gap-1.5">
                      {m.useCases.map(u => (
                        <li key={u} className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ background:m.accent }} />{u}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Link href="/api-docs"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-black text-xs text-white transition-all hover:-translate-y-0.5"
                    style={{ background:`linear-gradient(135deg,${m.accent},${m.accent}80)`, boxShadow:`0 0 14px ${m.accent}30` }}>
                    API Reference →
                  </Link>
                  <Link href="/book-demo"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-black text-xs border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all">
                    Request Demo
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}