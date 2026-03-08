"use client";
// ─────────────────────────────────────────────────────────────────
// FILE: app/divisions/technology/data-pipelines/page.tsx
// ─────────────────────────────────────────────────────────────────
import Link from "next/link";

const FEATURES = [
  { icon:"⚡", title:"Real-Time Ingestion",     accent:"#00c8ff", body:"Stream data from any source — Kafka, Kinesis, webhooks, or direct DB connectors — with sub-second latency into your AI models." },
  { icon:"🔄", title:"Zero-Copy Transformation", accent:"#7c5cff", body:"SQL-native transformations, schema inference, and data quality checks run in-pipeline. No separate ETL tooling required." },
  { icon:"🛡", title:"Data Lineage & Auditing",  accent:"#22d3a5", body:"Full provenance tracking for every record. Know exactly where data came from, what transformed it, and where it went." },
  { icon:"🔗", title:"50+ Native Connectors",    accent:"#f59e0b", body:"Snowflake, BigQuery, Redshift, Postgres, Salesforce, HubSpot, SAP, and more. All pre-built and maintained by us." },
  { icon:"📊", title:"Pipeline Observability",   accent:"#a855f7", body:"Real-time throughput metrics, error rates, and SLA dashboards. PagerDuty and Slack alerting built in." },
  { icon:"🔐", title:"End-to-End Encryption",    accent:"#00c8ff", body:"AES-256 at rest and TLS 1.3 in transit across every connector and transformation layer. SOC 2 Type II certified." },
];

const PIPELINE_STEPS = [
  { icon:"📥", label:"Ingest",    detail:"Kafka · Kinesis · Webhooks · Direct DB" },
  { icon:"🔄", label:"Transform", detail:"SQL · Python UDFs · Schema inference" },
  { icon:"✅", label:"Validate",  detail:"Quality checks · PII detection · Lineage" },
  { icon:"🤖", label:"Serve",     detail:"AI models · Dashboards · Downstream apps" },
];

const STATS = [
  { val:"50+",    label:"Native connectors"            },
  { val:"<100ms", label:"P99 pipeline latency"         },
  { val:"99.99%", label:"Uptime SLA"                   },
  { val:"10TB+",  label:"Daily data processed (avg)"   },
];

const INTEGRATIONS = [
  "Snowflake","BigQuery","Redshift","PostgreSQL","MySQL","MongoDB",
  "Salesforce","HubSpot","SAP","Workday","Stripe","Twilio",
  "Kafka","Kinesis","Pub/Sub","RabbitMQ","S3","GCS",
];

export default function DataPipelinesPage() {
  return (
    <main className="bg-[#050810] min-h-screen text-white font-sans antialiased">
      <style>{`
        .dp-card {
          background: rgba(13,22,34,0.65);
          backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .dp-card:hover { border-color:rgba(255,255,255,0.14); transform:translateY(-2px); }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(0,200,255,0.07),transparent)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HERO */}
        <div className="pt-32 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link href="/divisions/technology" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors mb-8">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
                Technology Division
              </Link>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/25 bg-cyan-400/8 text-cyan-300 text-[10px] font-black uppercase tracking-[0.18em] mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Data Pipelines
              </div>
              <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.04em] leading-[1.02] mb-6">
                Data That Flows.{" "}
                <span style={{ background:"linear-gradient(135deg,#00c8ff,#22d3a5)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                  Intelligence That Acts.
                </span>
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8 font-semibold">
                Real-time data pipelines that connect every source in your stack to your AI models — without migrations, without brittle ETL, without data engineering headcount.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book-demo" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 shadow-[0_0_30px_rgba(0,200,255,0.4)] hover:shadow-[0_0_50px_rgba(0,200,255,0.6)] transition-all hover:-translate-y-0.5">
                  Book Architecture Review →
                </Link>
              </div>
            </div>

            {/* Pipeline viz */}
            <div className="dp-card p-6">
              <div className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-5">Pipeline Flow</div>
              <div className="flex flex-col gap-3">
                {PIPELINE_STEPS.map((s, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/3 border border-white/6">
                      <span className="text-xl shrink-0">{s.icon}</span>
                      <div>
                        <div className="font-black text-white text-sm">{s.label}</div>
                        <div className="text-[10px] text-slate-400 font-medium mt-0.5">{s.detail}</div>
                      </div>
                      <span className="ml-auto text-cyan-400/40 text-xs font-black">✓</span>
                    </div>
                    {i < PIPELINE_STEPS.length - 1 && (
                      <div className="flex justify-center my-1">
                        <div className="w-px h-4 bg-gradient-to-b from-cyan-400/30 to-transparent" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-cyan-400/8 border border-cyan-400/20 text-center">
                <span className="text-[10px] font-black text-cyan-300">⚡ Average latency: &lt;100ms end-to-end</span>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {STATS.map(s => (
            <div key={s.val} className="dp-card p-5 text-center">
              <div className="text-2xl font-black text-white mb-1">{s.val}</div>
              <div className="text-[10px] text-slate-400 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-center mb-10">Built for Production</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="dp-card p-6">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl mb-4"
                  style={{ background:`${f.accent}15`, border:`1px solid ${f.accent}25` }}>
                  {f.icon}
                </div>
                <h3 className="font-black text-white text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{f.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* INTEGRATIONS */}
        <div className="mb-24">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-center mb-8">Works With Your Stack</h2>
          <div className="dp-card p-6">
            <div className="flex flex-wrap gap-2">
              {INTEGRATIONS.map(name => (
                <span key={name} className="text-[11px] font-black text-slate-300 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 hover:border-cyan-400/30 hover:text-white transition-all cursor-default">
                  {name}
                </span>
              ))}
              <span className="text-[11px] font-black text-cyan-400 px-3 py-1.5 rounded-lg bg-cyan-400/8 border border-cyan-400/20">
                + 32 more →
              </span>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/book-demo" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 shadow-[0_0_24px_rgba(0,200,255,0.3)] hover:shadow-[0_0_40px_rgba(0,200,255,0.5)] transition-all hover:-translate-y-0.5">
              See Pipeline Demo →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}