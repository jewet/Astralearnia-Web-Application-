"use client";
// ─── components/AstraBot.tsx ──────────────────────────────────────────────────
// AstraLearnia Intelligent Chatbot
//
// Architecture:
//  • Rule-based engine NOW  — deterministic, zero-latency, no API key required
//  • OpenAI-ready LATER     — swap runLocalEngine() for runOpenAIEngine()
//    by setting NEXT_PUBLIC_OPENAI_KEY and flipping USE_OPENAI = true
//
// To upgrade to OpenAI:
//   1. Set NEXT_PUBLIC_OPENAI_KEY in .env.local
//   2. Flip USE_OPENAI to true below
//   3. The OpenAI engine stub already handles history + system prompt injection
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

// ── Feature flag ─────────────────────────────────────────────────────────────
const USE_OPENAI = false; // flip to true when OpenAI key is ready

// ── Types ─────────────────────────────────────────────────────────────────────
type Role = "user" | "assistant" | "system";
interface Message { id: string; role: Role; text: string; ts: number; }
interface SuggestedChip { label: string; value: string; }

// ── Suggested chips by context ────────────────────────────────────────────────
const DEFAULT_CHIPS: SuggestedChip[] = [
  { label: "What does AstraLearnia do?", value: "What does AstraLearnia do?" },
  { label: "Technology Division",         value: "Tell me about the Technology Division" },
  { label: "Institute Division",           value: "Tell me about the Institute Division" },
  { label: "Book a demo",                  value: "How do I book a demo?" },
  { label: "Pricing",                      value: "What's the pricing?" },
  { label: "30-day process",               value: "Explain the 30-day process" },
];

// ══════════════════════════════════════════════════════════════════════════════
// KNOWLEDGE BASE — AstraLearnia data model
// Add facts here; the engine uses them for response injection
// ══════════════════════════════════════════════════════════════════════════════
const KB = {
  company: {
    name:      "AstraLearnia",
    tagline:   "Enterprise AI that actually ships.",
    divisions: ["Technology", "Institute"],
    clients:   "200+",
    uptime:    "99.9%",
    apiCalls:  "50M+ daily",
    email:     "hello@astralearnia.com",
    compliance: "hello@astralearnia.com",
    website:   "https://astralearnia.com",
  },

  technology: {
    tagline:  "Custom AI systems, APIs, and data pipelines for enterprises.",
    services: [
      { name: "Custom AI Model Development",  color: "#00c8ff", desc: "Fine-tuned LLMs, vision systems, and recommendation engines trained on your data." },
      { name: "Intelligence API Platform",     color: "#00ffb2", desc: "REST & GraphQL endpoints with sub-100ms latency and enterprise-grade auth." },
      { name: "Data Pipeline Automation",      color: "#7c5cff", desc: "End-to-end ETL, real-time enrichment, and zero-maintenance automation." },
      { name: "Decision Intelligence Suite",   color: "#3b82f6", desc: "AI dashboards and alert systems that surface insights at the moment of decision." },
      { name: "Enterprise Integrations",       color: "#a855f7", desc: "Native connectors for Salesforce, SAP, Microsoft 365, Slack, and 400+ platforms." },
      { name: "AI Governance & Security",      color: "#fbbf24", desc: "Model auditing, bias detection, and compliance frameworks for regulated industries." },
      { name: "Robotics & Automation",         color: "#00e5ff", desc: "AI-driven robotics and autonomous process control for industrial environments." },
      { name: "Cybersecurity AI",              color: "#ff4d6d", desc: "Threat intelligence, anomaly detection, and automated incident response." },
      { name: "Embedded AI Systems",           color: "#06d6a0", desc: "Edge AI deployment and microcontroller ML inference for constrained hardware." },
      { name: "Blockchain Intelligence",       color: "#f9c74f", desc: "Smart contract analytics, on-chain ML models, and Web3 data pipelines." },
    ],
    stats: {
      deployment: "< 48h average deployment",
      uptime:     "99.9% API uptime",
      clients:    "200+ enterprise clients",
      api:        "50M+ daily API calls",
    },
    link: "/divisions/technology",
  },

  institute: {
    tagline:  "AI-powered adaptive learning for individuals, enterprises, and institutions.",
    services: [
      { name: "Adaptive Learning Platform", desc: "AI builds personalised learning paths based on role, skills, goals, and pace." },
      { name: "Corporate AI Training",       desc: "Upskill 10 to 10,000 employees in AI literacy, data analysis, and domain skills." },
      { name: "AI Certification Programmes", desc: "6 core certification tracks — blockchain-verified, proctored, quarterly-updated." },
    ],
    audiences: ["Individuals upskilling", "Enterprise L&D teams", "Academic institutions"],
    stats: {
      learners:    "12K+ active learners",
      completion:  "94% certification rate",
      timeSaved:   "60% average training time reduction",
      clients:     "300+ corporate clients",
    },
    link: "/institute",
  },

  process: [
    { step: "01", name: "Discovery Call",      days: "Day 1",      desc: "We map your data, pain points, and success metrics in a focused 1-hour session." },
    { step: "02", name: "Architecture Design", days: "Days 2–5",   desc: "Custom AI system scoped to your exact requirements — no templates." },
    { step: "03", name: "Build & Integrate",   days: "Days 6–25",  desc: "Build, test, and connect to production infrastructure with zero disruption." },
    { step: "04", name: "Go Live & Monitor",   days: "Day 30",     desc: "Ships with full monitoring, alerting, and ongoing optimisation included." },
  ],

  results: [
    { metric: "3.4×",  label: "Faster decisions",         industry: "Financial Services" },
    { metric: "91%",   label: "Reduction in manual processing", industry: "Logistics" },
    { metric: "$2.1M", label: "Average annual cost saving",  industry: "Healthcare Tech" },
    { metric: "3.2×",  label: "Average ROI in 6 months",   industry: "General" },
    { metric: "40%",   label: "Training cost reduction",   industry: "L&D" },
  ],

  api: {
    docs:    "/api-docs",
    latency: "Sub-200ms inference",
    uptime:  "99.95% endpoint availability",
    sdks:    "Python, Node.js, Go, Java",
    base:    "https://api.astralearnia.com",
    endpoints: [
      "POST /v1/inference — Run model predictions",
      "GET  /v1/models    — List deployed models",
      "POST /v1/train     — Trigger fine-tuning",
      "POST /v1/embed     — Generate vector embeddings",
    ],
  },

  blog: {
    posts: [
      { title: "Why Decision Intelligence Beats Dashboards",     slug: "why-decision-intelligence-beats-dashboards" },
      { title: "Africa's AI Skills Gap in 2026",                 slug: "africa-ai-skills-gap-2026" },
      { title: "Fine-Tuning LLMs on Proprietary Data",           slug: "fine-tuning-llms-on-proprietary-data" },
      { title: "ROI of Adaptive Learning in Corporate Settings",  slug: "roi-of-adaptive-learning-corporate" },
      { title: "API-First AI Architecture",                       slug: "api-first-ai-architecture" },
      { title: "Prompt Engineering Is a Skill",                  slug: "prompt-engineering-enterprise" },
      { title: "Complete Guide to AI Agents in 2026",            slug: "complete-guide-ai-agents-2026" },
    ],
    link: "/blog",
  },

  compliance: {
    frameworks: ["GDPR", "NDPR (Nigeria)", "SOC 2 Type II", "ISO 27001 (in progress)", "POPIA (South Africa)", "HIPAA Ready"],
    security:   ["AES-256 encryption at rest", "TLS 1.3 in transit", "Audit logs", "Data residency (Nigeria, EU, US)", "Right to erasure"],
    link: "/compliance",
  },

  contact: {
    demo:    "/book-demo",
    contact: "/contact",
    careers: "/careers",
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// RESPONSE ENGINE — rule-based with intent scoring
// ══════════════════════════════════════════════════════════════════════════════

interface Intent {
  name:     string;
  keywords: string[];
  weight:   number;
}

const INTENTS: Intent[] = [
  { name: "greeting",       keywords: ["hello","hi","hey","good morning","good afternoon","howdy","greetings","yo","sup"],                  weight: 10 },
  { name: "about",          keywords: ["what is","who are","about","astralearnia","company","explain","overview","tell me"],               weight: 5  },
  { name: "technology",     keywords: ["technology","tech","custom ai","model","api","pipeline","decision","data","inference","build"],     weight: 6  },
  { name: "services",       keywords: ["service","offer","provide","capability","product","solution","what can","what do you"],             weight: 5  },
  { name: "institute",      keywords: ["institute","learn","course","training","certification","upskill","employee","l&d","adaptive","certif"], weight: 6 },
  { name: "process",        keywords: ["process","how long","timeline","steps","30 day","discovery","build","deploy","start"],             weight: 7  },
  { name: "pricing",        keywords: ["price","pricing","cost","how much","fee","rate","plan","charge","budget","afford"],                weight: 8  },
  { name: "demo",           keywords: ["demo","book","schedule","meeting","trial","see it","show me","try","sign up","free"],              weight: 8  },
  { name: "contact",        keywords: ["contact","email","reach","phone","speak","talk to","human","person","sales"],                       weight: 7  },
  { name: "api",            keywords: ["api","sdk","endpoint","rest","graphql","developer","code","integration","latency","key"],          weight: 7  },
  { name: "blog",           keywords: ["blog","article","read","post","guide","content","write","publish"],                                weight: 6  },
  { name: "compliance",     keywords: ["compliance","gdpr","ndpr","soc 2","hipaa","security","privacy","regulation","audit","encrypt"],    weight: 7  },
  { name: "robotics",       keywords: ["robot","robotics","autonomous","industrial","automation","sensor","hardware","iot"],               weight: 6  },
  { name: "cybersecurity",  keywords: ["cyber","cybersecurity","threat","hack","malware","breach","anomaly","incident","zero-day"],        weight: 6  },
  { name: "blockchain",     keywords: ["blockchain","web3","smart contract","defi","crypto","on-chain","nft","oracle"],                    weight: 6  },
  { name: "embedded",       keywords: ["embedded","edge ai","microcontroller","rtos","c++","constrained","device","firmware"],            weight: 6  },
  { name: "results",        keywords: ["result","roi","outcome","impact","success","case study","client story","proof","metric"],          weight: 6  },
  { name: "careers",        keywords: ["career","job","hire","work at","join","engineer","vacancy","role","position"],                     weight: 6  },
  { name: "integrations",   keywords: ["integrate","salesforce","sap","slack","moodle","workday","hubspot","connector","400"],             weight: 6  },
  { name: "africa",         keywords: ["africa","nigeria","lagos","kenya","south africa","continent","african"],                           weight: 5  },
  { name: "partners",       keywords: ["partner","reseller","affiliate","distributor","white label","academic partner"],                   weight: 5  },
];

function detectIntents(input: string): string[] {
  const lower = input.toLowerCase();
  const scored: { name: string; score: number }[] = [];

  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (lower.includes(kw)) score += intent.weight;
    }
    if (score > 0) scored.push({ name: intent.name, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3).map(s => s.name);
}

// ── Response generators ────────────────────────────────────────────────────────

function respondGreeting(): string {
  const greets = [
    "Hey! 👋 I'm Astra, AstraLearnia's AI guide. I can tell you everything about our Technology and Institute divisions, services, process, and more. What would you like to know?",
    "Hi there! I'm Astra — here to help you understand what AstraLearnia builds and how we can work together. What's on your mind?",
    "Hello! Welcome to AstraLearnia. I'm Astra, your intelligent guide. Ask me anything about our AI services, learning programmes, pricing, or how to get started.",
  ];
  return greets[Math.floor(Math.random() * greets.length)];
}

function respondAbout(): string {
  return `**AstraLearnia** is an enterprise AI company operating across two divisions:

**⚡ Technology Division** — We build, integrate, and operate custom AI systems that go into production in under 30 days. From fine-tuned models to data pipelines and intelligence APIs.

**🎓 Institute Division** — We deliver adaptive AI-powered learning for individuals, enterprise L&D teams, and academic institutions across Africa and globally.

**Our numbers:**
• ${KB.company.clients} enterprise clients
• ${KB.technology.stats.uptime}
• 50M+ daily API calls
• 12K+ active learners
• 94% certification pass rate

Ready to explore a specific area? Ask about our Technology services, Institute programmes, 30-day process, or book a demo.`;
}

function respondTechnology(): string {
  return `**⚡ Technology Division** — Enterprise AI that actually ships.

We build custom AI systems across 10 capability areas:

${KB.technology.services.slice(0, 6).map(s => `• **${s.name}** — ${s.desc}`).join("\n")}
...and 4 more including Robotics, Cybersecurity AI, Embedded AI, and Blockchain Intelligence.

**Key stats:**
• Avg deployment: < 48 hours
• API uptime: 99.9% SLA
• 400+ enterprise integrations
• Clients in Financial Services, Logistics, Healthcare, and more

Want to dive deeper? Ask about a specific service, our API, or the 30-day deployment process. Or [book a technical demo](/book-demo).`;
}

function respondInstitute(): string {
  return `**🎓 Institute Division** — Learning that adapts to you.

Three core programmes:

• **Adaptive Learning Platform** — AI builds personalised learning paths based on each learner's role, gaps, and pace. Skills gap analytics for managers.
• **Corporate AI Training** — Upskill teams of 10 to 10,000 in AI literacy, data analysis, and prompt engineering. Fully customised.
• **AI Certification Programmes** — 6 certification tracks, blockchain-verified credentials, updated quarterly.

**Results across 300+ corporate clients:**
• 94% certification pass rate (vs 67% industry avg)
• 60% reduction in training time
• 40% lower L&D costs
• 12,000+ active learners globally

We serve **individuals, enterprises, and academic institutions**. Which fits you best?`;
}

function respondProcess(): string {
  return `**Discovery to Live in 30 Days 🚀**

${KB.process.map(p => `**${p.step}. ${p.name}** (${p.days})\n   ${p.desc}`).join("\n\n")}

That's it. No 6-month implementations. No technical debt handoffs. Your system ships production-ready with full monitoring and ongoing optimisation included.

Ready to start? [Book a discovery call](/book-demo) — it's free and takes 30 minutes.`;
}

function respondPricing(): string {
  return `Pricing at AstraLearnia is **custom to each engagement** — because every AI system we build is unique to your data and requirements.

**What influences Technology pricing:**
• Scope of AI capabilities required
• Data volume and pipeline complexity
• Number of API endpoints and integrations
• SLA tier (standard 99.9% vs enterprise 99.95%+)
• Ongoing model monitoring and retraining needs

**Institute pricing** is typically per-learner per-month for the platform, plus setup for custom curricula.

**Indicative outcomes** (not prices — what clients report):
• Average $2.1M annual cost saving post-integration
• 3.2× ROI within 6 months
• 40% reduction in L&D costs

The best way to get a number is a **30-minute discovery call** where we scope exactly what you need. [Book one here](/book-demo) — no commitment.`;
}

function respondDemo(): string {
  return `**Book a Demo** 📅

Two paths:

**Technology Demo** — A 30-minute technical walkthrough with our engineers. We'll show you a live system built on data similar to yours, and tell you exactly what we can build and what it costs.
→ [Book Technical Demo](/book-demo)

**Institute Demo** — A personalised 30-minute walkthrough of the learning platform, tailored to your L&D goals. We'll show you how the adaptive engine works with your content.
→ [Book Learning Demo](/book-demo)

Both are free, no-pressure, and you leave with a clear picture of the build and cost. Our team typically responds within 2 business hours.`;
}

function respondContact(): string {
  return `**Get in Touch 📬**

• **Book a demo:** [astralearnia.com/book-demo](/book-demo) — fastest path to talking to our team
• **General enquiries:** [Contact page](/contact)
• **Technology partnerships:** [/contact/technology](/contact)
• **Compliance & data questions:** compliance@astralearnia.com
• **Careers & hiring:** [/careers](/careers)

Want me to help you with anything specific before you reach out? I can answer detailed questions about our services, process, or help you figure out which division is the right fit.`;
}

function respondAPI(): string {
  return `**Intelligence API Platform ⚡**

Production-grade REST & GraphQL endpoints:

${KB.api.endpoints.map(e => `• \`${e}\``).join("\n")}

**Specs:**
• Latency: Sub-200ms (P99)
• Uptime: 99.95% SLA
• SDKs: Python, Node.js, Go, Java
• Auth: Bearer token, role-scoped API keys
• Both streaming and batch endpoints

**Quick start:**
\`\`\`python
import astralearnia as astra
client = astra.Client(api_key="al_live_...")
result = client.inference.run(model="decision-v3", inputs={...})
\`\`\`

Full documentation and SDK install guides: [/api-docs](/api-docs). Need an API key? [Request access](/contact/technology).`;
}

function respondBlog(): string {
  return `**Astralearnia Blog 📖**

Our engineers and educators write in-depth guides on AI development, enterprise adoption, and learning science. Latest posts:

${KB.blog.posts.map(p => `• [${p.title}](/blog/${p.slug})`).join("\n")}

Everything from fine-tuning LLMs on proprietary data to calculating training ROI to the complete 2026 guide on AI agents.

Browse all articles at [/blog](/blog).`;
}

function respondCompliance(): string {
  return `**Compliance & Security 🛡️**

AstraLearnia is built to meet regulatory requirements across every jurisdiction we operate in:

${KB.compliance.frameworks.map(f => `• ${f}`).join("\n")}

**Security standards:**
${KB.compliance.security.map(s => `• ${s}`).join("\n")}

Enterprise clients receive a dedicated compliance liaison, DPA agreements, custom data residency configuration (Nigeria, EU, or US regions), and full documentation packages for internal audits.

Full details: [/compliance](/compliance) or email compliance@astralearnia.com.`;
}

function respondRobotics(): string {
  return `**Robotics & Automation 🤖**

We build AI-driven robotics systems for industrial and enterprise environments:

• Autonomous process control with ML-guided decision making
• Intelligent sensor fusion for real-time environment awareness
• Computer vision integration for quality control and inspection
• RTOS-compatible AI pipelines for industrial hardware
• Predictive maintenance models connected to physical systems

This is part of our Technology Division's embedded and physical-world AI capabilities, alongside **Embedded AI Systems** (edge inference on microcontrollers) and **Cybersecurity AI** (threat detection and automated response).

Interested in a specific application? [Talk to our engineering team](/contact/technology).`;
}

function respondBlockchain(): string {
  return `**Blockchain Intelligence ⛓️**

We build AI systems for blockchain-native applications:

• **Smart contract analytics** — ML models that audit, monitor, and flag anomalies in on-chain activity
• **On-chain ML models** — Decentralised inference with verifiable outputs
• **DeFi intelligence** — Pattern detection and risk scoring for DeFi protocols
• **Web3 data pipelines** — Structured ingestion of on-chain data for ML training
• **AI oracles** — Bridge real-world AI predictions to smart contracts with cryptographic proofs

This is one of our 10 Technology Division services. [Book a demo](/book-demo) to discuss your specific blockchain + AI use case.`;
}

function respondResults(): string {
  return `**Proof of Work 📊**

Real results from production deployments:

${KB.results.map(r => `• **${r.metric}** ${r.label} (${r.industry})`).join("\n")}

**Institute results:**
• 94% certification pass rate vs 67% industry average
• 60% reduction in training time
• 40% lower L&D costs after full platform deployment

These aren't case study projections — they're numbers our clients report after 6–12 months. Happy to share more context on any of these. What industry are you in?`;
}

function respondCareers(): string {
  return `**Careers at AstraLearnia ✦**

We're hiring across both divisions — engineers building production AI systems and educators shaping the future of adaptive learning.

Open roles typically include:
• ML/AI Engineers (specialising in LLM fine-tuning, pipelines, deployment)
• Backend Engineers (distributed systems, API infrastructure)
• AI Educators & Curriculum Designers (Institute Division)
• Data Engineers & Architects
• Solutions Engineers (client-facing, enterprise accounts)

We move fast, ship real systems, and work on hard problems in a market that genuinely needs solutions. 

Browse open roles: [/careers](/careers)`;
}

function respondAfrica(): string {
  return `**AstraLearnia & Africa 🌍**

We were built with Africa in mind — and we're not the only ones noticing the opportunity. Our 2026 research found:

• **72%** of African enterprises list AI as a top-3 strategic priority
• Only **18%** have staff trained to deploy it
• That 54-point gap is the defining workforce challenge of the decade

We address this on both sides:
• **Technology Division** — Building AI infrastructure for African enterprises (financial services, logistics, healthcare, telco)
• **Institute Division** — AI-powered learning with in-country data compliance (NDPR for Nigeria, POPIA for South Africa)

Our data centres support **Nigerian and South African data residency** on enterprise plans. Compliance frameworks include NDPR and POPIA alongside GDPR.

[Read our full Africa AI skills gap report](/blog/africa-ai-skills-gap-2026)`;
}

function respondIntegrations(): string {
  return `**Enterprise Integrations 🔗**

AstraLearnia connects natively to 400+ enterprise platforms across 6 categories:

• **CRM & Sales** — Salesforce, HubSpot, Pipedrive, Microsoft Dynamics
• **Data & Analytics** — Snowflake, BigQuery, Redshift, dbt, Databricks
• **ERP & Finance** — SAP S/4HANA, Oracle ERP, Dynamics 365, NetSuite
• **LMS & HR** — Moodle, Canvas, Workday, SuccessFactors, Cornerstone
• **Cloud** — AWS, GCP, Azure, DigitalOcean, Cloudflare
• **Collaboration** — Slack, Microsoft Teams, Jira, Notion

No data migration required. We connect to your existing warehouse and infrastructure. Custom connectors for tools not on the list are built in ~2 weeks.

Full integrations catalogue: [/integrations](/integrations)`;
}

function respondPartners(): string {
  return `**Partner Programme 🤝**

We work with six types of partners:

• **Resellers / Distributors** — Sell AstraLearnia products, earn competitive margins
• **Technology Integrators** — Build native connectors, access dev sandbox and co-marketing
• **Content Partners** — License your expertise to our 12,000+ learner base
• **Implementation Consultants** — Get certified to deploy AstraLearnia for enterprise clients
• **Academic Institutions** — Co-issue credentials alongside your programmes
• **Creative Partnerships** — Open to ideas that create mutual value

Benefits include revenue sharing, free access to all certifications, joint marketing, dedicated engineering support, and global partner directory listing.

Apply: [/partners](/partners)`;
}

function respondFallback(input: string): string {
  const fallbacks = [
    `That's a great question. I want to make sure I give you an accurate answer about AstraLearnia — could you rephrase or be a bit more specific? I'm well-versed in our Technology and Institute divisions, services, pricing, demos, API, compliance, and more.`,
    `I'm not sure I fully understood that. I can help with questions about AstraLearnia's AI services, learning programmes, the 30-day deployment process, our API, compliance, or how to book a demo. What are you looking to learn?`,
    `I want to give you the best answer possible. Could you try asking that differently? Some things I know really well: what we build, how long it takes, what it costs, and how to get started.`,
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// ── Main local engine ─────────────────────────────────────────────────────────
function runLocalEngine(input: string, _history: Message[]): string {
  const intents = detectIntents(input);
  const primary = intents[0];

  if (!primary) return respondFallback(input);

  switch (primary) {
    case "greeting":      return respondGreeting();
    case "about":         return respondAbout();
    case "technology":    return respondTechnology();
    case "services":      return respondTechnology();
    case "institute":     return respondInstitute();
    case "process":       return respondProcess();
    case "pricing":       return respondPricing();
    case "demo":          return respondDemo();
    case "contact":       return respondContact();
    case "api":           return respondAPI();
    case "blog":          return respondBlog();
    case "compliance":    return respondCompliance();
    case "robotics":      return respondRobotics();
    case "cybersecurity": return respondRobotics();
    case "blockchain":    return respondBlockchain();
    case "embedded":      return respondRobotics();
    case "results":       return respondResults();
    case "careers":       return respondCareers();
    case "africa":        return respondAfrica();
    case "integrations":  return respondIntegrations();
    case "partners":      return respondPartners();
    default:              return respondFallback(input);
  }
}

// ── OpenAI engine stub (ready to activate) ────────────────────────────────────
async function runOpenAIEngine(input: string, history: Message[]): Promise<string> {
  const SYSTEM_PROMPT = `You are Astra, AstraLearnia's intelligent AI assistant. AstraLearnia is an enterprise AI company with two divisions: Technology (custom AI systems, APIs, data pipelines) and Institute (adaptive learning, corporate training, certifications). You know everything about both divisions. Be concise, helpful, and professional. Use markdown formatting. Always guide users toward relevant actions like booking a demo (/book-demo) or exploring specific pages.

Company data: ${JSON.stringify(KB, null, 2)}`;

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.filter(m => m.role !== "system").slice(-10).map(m => ({ role: m.role, content: m.text })),
    { role: "user", content: input },
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
    },
    body: JSON.stringify({ model: "gpt-4o-mini", messages, max_tokens: 600, temperature: 0.7 }),
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "I encountered an issue — please try again.";
}

// ── Generate response (routes to local or OpenAI) ─────────────────────────────
async function generateResponse(input: string, history: Message[]): Promise<string> {
  if (USE_OPENAI) return runOpenAIEngine(input, history);
  // Simulate a slight thinking delay for UX
  await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
  return runLocalEngine(input, history);
}

// ══════════════════════════════════════════════════════════════════════════════
// MARKDOWN RENDERER — converts **bold**, `code`, [link](url), bullet lists
// ══════════════════════════════════════════════════════════════════════════════
function renderMarkdown(text: string) {
  const lines = text.split("\n");

  return lines.map((line, i) => {
    // Empty line
    if (line.trim() === "") return <br key={i} />;

    // Parse inline styles within a line
    const parseInline = (raw: string): React.ReactNode[] => {
      const parts: React.ReactNode[] = [];
      let remaining = raw;
      let key = 0;

      while (remaining.length > 0) {
        // Bold **text**
        // FIX: replaced /s flag with [\s\S] so the regex works below ES2018 targets
        const boldMatch = remaining.match(/^([\s\S]*?)\*\*([\s\S]+?)\*\*([\s\S]*)/);
        if (boldMatch) {
          if (boldMatch[1]) parts.push(<span key={key++}>{parseInline(boldMatch[1])}</span>);
          parts.push(<strong key={key++} style={{ color: "#fff", fontWeight: 800 }}>{boldMatch[2]}</strong>);
          remaining = boldMatch[3];
          continue;
        }

        // Inline code `code`
        // FIX: replaced /s flag with [\s\S]
        const codeMatch = remaining.match(/^([\s\S]*?)`([\s\S]+?)`([\s\S]*)/);
        if (codeMatch) {
          if (codeMatch[1]) parts.push(<span key={key++}>{codeMatch[1]}</span>);
          parts.push(
            <code key={key++} style={{ background: "rgba(0,200,255,0.12)", color: "#00c8ff", padding: "1px 5px", borderRadius: 4, fontSize: "0.8em", fontFamily: "monospace" }}>
              {codeMatch[2]}
            </code>
          );
          remaining = codeMatch[3];
          continue;
        }

        // Link [text](url)
        // FIX: replaced /s flag with [\s\S]
        const linkMatch = remaining.match(/^([\s\S]*?)\[([\s\S]+?)\]\(([\s\S]+?)\)([\s\S]*)/);
        if (linkMatch) {
          if (linkMatch[1]) parts.push(<span key={key++}>{linkMatch[1]}</span>);
          const isExternal = linkMatch[3].startsWith("http");
          parts.push(
            isExternal
              ? <a key={key++} href={linkMatch[3]} target="_blank" rel="noopener noreferrer" style={{ color: "#00c8ff", textDecoration: "underline", textUnderlineOffset: 3 }}>{linkMatch[2]}</a>
              : <Link key={key++} href={linkMatch[3]} style={{ color: "#00c8ff", textDecoration: "underline", textUnderlineOffset: 3 }}>{linkMatch[2]}</Link>
          );
          remaining = linkMatch[4];
          continue;
        }

        parts.push(<span key={key++}>{remaining}</span>);
        break;
      }
      return parts;
    };

    // Code block line
    if (line.startsWith("```") || line.startsWith("    ")) {
      return (
        <code key={i} style={{ display: "block", background: "rgba(0,0,0,0.3)", color: "#00ffb2", padding: "2px 8px", borderRadius: 4, fontSize: "0.75em", fontFamily: "monospace", marginBottom: 2 }}>
          {line.replace(/^```\w*/, "").replace(/^    /, "")}
        </code>
      );
    }

    // Bullet point
    if (line.startsWith("• ")) {
      return (
        <div key={i} style={{ display: "flex", gap: 6, marginBottom: 2 }}>
          <span style={{ color: "#00c8ff", marginTop: 2, flexShrink: 0 }}>•</span>
          <span style={{ color: "rgba(255,255,255,0.72)" }}>{parseInline(line.slice(2))}</span>
        </div>
      );
    }

    return <p key={i} style={{ margin: "0 0 4px", color: "rgba(255,255,255,0.72)", lineHeight: 1.6 }}>{parseInline(line)}</p>;
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function AstraBot() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [chips,    setChips]    = useState<SuggestedChip[]>(DEFAULT_CHIPS);
  const [unread,   setUnread]   = useState(0);
  const [mounted,  setMounted]  = useState(false);

  const endRef  = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      // Welcome message
      const welcome: Message = {
        id:   "welcome",
        role: "assistant",
        text: "Hey! 👋 I'm **Astra** — AstraLearnia's AI guide. I can tell you everything about our enterprise AI services, learning programmes, process, pricing, and more. What would you like to know?",
        ts:   Date.now(),
      };
      setMessages([welcome]);
    }
    if (open) { setUnread(0); inputRef.current?.focus(); }
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = useCallback(async (text?: string) => {
    const value = (text ?? input).trim();
    if (!value || loading) return;

    setInput("");
    setChips([]);

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", text: value, ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const reply = await generateResponse(value, [...messages, userMsg]);
      const botMsg: Message = { id: `a-${Date.now()}`, role: "assistant", text: reply, ts: Date.now() };
      setMessages(prev => [...prev, botMsg]);
      if (!open) setUnread(n => n + 1);
    } catch {
      setMessages(prev => [...prev, { id: `e-${Date.now()}`, role: "assistant", text: "Sorry, I hit a snag. Please try again.", ts: Date.now() }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, open]);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes astra-pulse  { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.12);opacity:.7} }
        @keyframes astra-slide  { from{opacity:0;transform:translateY(18px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes astra-typing { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }
        @keyframes astra-shimmer{ 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes astra-ring   { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(1.8);opacity:0} }

        .astra-btn:hover { transform: scale(1.05) !important; }
        .astra-window { animation: astra-slide .25s ease forwards; }
        .astra-dot { animation: astra-typing 1.4s ease-in-out infinite; }
        .astra-dot:nth-child(2) { animation-delay:.2s; }
        .astra-dot:nth-child(3) { animation-delay:.4s; }
        .astra-chip:hover { border-color: rgba(0,200,255,0.5) !important; background: rgba(0,200,255,0.1) !important; }
        .astra-scroll::-webkit-scrollbar { width: 3px; }
        .astra-scroll::-webkit-scrollbar-track { background: transparent; }
        .astra-scroll::-webkit-scrollbar-thumb { background: rgba(0,200,255,0.2); border-radius: 2px; }
        .astra-input:focus { outline: none; border-color: rgba(0,200,255,0.5) !important; box-shadow: 0 0 0 2px rgba(0,200,255,0.08) !important; }
      `}</style>

      {/* ── Floating button ──────────────────────────────────────────────────── */}
      <div
        style={{
          position:   "fixed",
          bottom:     24,
          right:      24,
          zIndex:     9999,
          display:    "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap:        12,
        }}
      >
        {/* Tooltip */}
        {!open && (
          <div style={{
            background:  "rgba(4,7,16,0.92)",
            border:      "1px solid rgba(0,200,255,0.25)",
            borderRadius: 10,
            padding:     "7px 13px",
            fontSize:    "0.75rem",
            fontWeight:  700,
            color:       "rgba(255,255,255,0.7)",
            backdropFilter: "blur(12px)",
            pointerEvents: "none",
            whiteSpace:  "nowrap",
          }}>
            Chat with Astra ✦
          </div>
        )}

        {/* Pulse ring */}
        {!open && (
          <div style={{
            position:    "absolute",
            bottom:      0,
            right:       0,
            width:       56,
            height:      56,
            borderRadius: "50%",
            border:      "2px solid rgba(0,200,255,0.4)",
            animation:   "astra-ring 2s ease-out infinite",
            pointerEvents: "none",
          }} />
        )}

        <button
          className="astra-btn"
          onClick={() => setOpen(p => !p)}
          aria-label="Open Astra chat"
          style={{
            width:        56,
            height:       56,
            borderRadius: "50%",
            border:       "none",
            cursor:       "pointer",
            display:      "flex",
            alignItems:   "center",
            justifyContent: "center",
            position:     "relative",
            transition:   "transform .2s",
            background:   "linear-gradient(135deg,#00c8ff,#3b82f6,#7c5cff)",
            boxShadow:    "0 8px 28px rgba(0,200,255,0.45), 0 0 0 3px rgba(0,200,255,0.12)",
          }}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 12H7v-2h10v2zm0-3H7V9h10v2zm0-3H7V6h10v2z"/></svg>
          )}

          {/* Unread badge */}
          {!open && unread > 0 && (
            <div style={{
              position:    "absolute",
              top:         -2,
              right:       -2,
              width:       18,
              height:      18,
              borderRadius: "50%",
              background:  "#ff4d6d",
              border:      "2px solid #040710",
              display:     "flex",
              alignItems:  "center",
              justifyContent: "center",
              fontSize:    "0.6rem",
              fontWeight:  800,
              color:       "#fff",
            }}>{unread}</div>
          )}
        </button>
      </div>

      {/* ── Chat window ─────────────────────────────────────────────────────── */}
      {open && (
        <div
          className="astra-window"
          style={{
            position:    "fixed",
            bottom:      96,
            right:       24,
            zIndex:      9998,
            width:       "min(400px, calc(100vw - 32px))",
            height:      "min(580px, calc(100vh - 120px))",
            display:     "flex",
            flexDirection: "column",
            background:  "rgba(4,7,16,0.97)",
            border:      "1px solid rgba(0,200,255,0.2)",
            borderRadius: 20,
            overflow:    "hidden",
            boxShadow:   "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,200,255,0.06), 0 0 60px rgba(0,200,255,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Ambient background */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% 0%,rgba(0,200,255,0.06),transparent)" }} />
            <div style={{ position: "absolute", inset: 0, opacity: 0.015, backgroundImage: "radial-gradient(circle,rgba(0,200,255,0.9) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          </div>

          {/* Header */}
          <div style={{
            position:    "relative",
            zIndex:      1,
            display:     "flex",
            alignItems:  "center",
            gap:         12,
            padding:     "14px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            background:  "rgba(0,200,255,0.04)",
            flexShrink:  0,
          }}>
            {/* Avatar */}
            <div style={{
              width:        38,
              height:       38,
              borderRadius: "50%",
              background:   "linear-gradient(135deg,#00c8ff,#7c5cff)",
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
              fontSize:     "1.1rem",
              flexShrink:   0,
              boxShadow:    "0 0 14px rgba(0,200,255,0.35)",
            }}>✦</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontWeight: 800, fontSize: "0.9rem", color: "#fff" }}>Astra</span>
                <span style={{
                  padding:    "1px 7px",
                  borderRadius: 8,
                  fontSize:   "0.58rem",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: "rgba(0,200,255,0.12)",
                  color:      "#00c8ff",
                  border:     "1px solid rgba(0,200,255,0.25)",
                }}>AI GUIDE</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 1 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ffb2", boxShadow: "0 0 5px #00ffb2", animation: "astra-pulse 2s ease-in-out infinite" }} />
                <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>
                  {USE_OPENAI ? "GPT-4o powered" : "Knowledge base · OpenAI-ready"}
                </span>
              </div>
            </div>

            {/* Clear button */}
            <button
              onClick={() => setMessages([])}
              title="Clear chat"
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.25)", padding: 4 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div
            className="astra-scroll"
            style={{
              flex:       1,
              overflowY:  "auto",
              padding:    "16px",
              display:    "flex",
              flexDirection: "column",
              gap:        12,
              position:   "relative",
              zIndex:     1,
            }}
          >
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display:       "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  gap:           8,
                  alignItems:    "flex-start",
                }}
              >
                {msg.role === "assistant" && (
                  <div style={{
                    width:        26,
                    height:       26,
                    borderRadius: "50%",
                    background:   "linear-gradient(135deg,#00c8ff,#7c5cff)",
                    display:      "flex",
                    alignItems:   "center",
                    justifyContent: "center",
                    fontSize:     "0.7rem",
                    flexShrink:   0,
                    marginTop:    2,
                  }}>✦</div>
                )}
                <div style={{
                  maxWidth:     "82%",
                  padding:      msg.role === "user" ? "9px 13px" : "11px 14px",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
                  background:   msg.role === "user"
                    ? "linear-gradient(135deg,#00c8ff,#3b82f6)"
                    : "rgba(255,255,255,0.05)",
                  border:       msg.role === "user"
                    ? "none"
                    : "1px solid rgba(255,255,255,0.09)",
                  fontSize:     "0.8rem",
                  lineHeight:   1.55,
                  color:        msg.role === "user" ? "#fff" : "rgba(255,255,255,0.72)",
                  boxShadow:    msg.role === "user" ? "0 4px 14px rgba(0,200,255,0.25)" : "none",
                }}>
                  {msg.role === "user"
                    ? <span>{msg.text}</span>
                    : <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>{renderMarkdown(msg.text)}</div>
                  }
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#00c8ff,#7c5cff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", flexShrink: 0, marginTop: 2 }}>✦</div>
                <div style={{
                  padding: "12px 14px",
                  borderRadius: "4px 16px 16px 16px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                }}>
                  {[0,1,2].map(i => (
                    <div key={i} className="astra-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#00c8ff", animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Chip suggestions */}
          {chips.length > 0 && messages.length <= 1 && (
            <div style={{
              padding:   "0 14px 10px",
              display:   "flex",
              flexWrap:  "wrap",
              gap:       6,
              position:  "relative",
              zIndex:    1,
            }}>
              {chips.map(chip => (
                <button
                  key={chip.value}
                  className="astra-chip"
                  onClick={() => send(chip.value)}
                  style={{
                    padding:      "5px 10px",
                    borderRadius: 20,
                    border:       "1px solid rgba(0,200,255,0.22)",
                    background:   "rgba(0,200,255,0.06)",
                    color:        "rgba(255,255,255,0.65)",
                    fontSize:     "0.7rem",
                    fontWeight:   700,
                    cursor:       "pointer",
                    transition:   "all .15s",
                    whiteSpace:   "nowrap",
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding:    "12px 14px",
            borderTop:  "1px solid rgba(255,255,255,0.07)",
            display:    "flex",
            gap:        8,
            background: "rgba(0,0,0,0.2)",
            position:   "relative",
            zIndex:     1,
            flexShrink: 0,
          }}>
            <input
              ref={inputRef}
              className="astra-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Ask Astra anything…"
              disabled={loading}
              style={{
                flex:         1,
                background:   "rgba(255,255,255,0.05)",
                border:       "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding:      "9px 13px",
                color:        "#fff",
                fontSize:     "0.82rem",
                fontWeight:   500,
                transition:   "border-color .2s, box-shadow .2s",
                fontFamily:   "inherit",
              }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              style={{
                width:        38,
                height:       38,
                borderRadius: 10,
                border:       "none",
                background:   input.trim() && !loading ? "linear-gradient(135deg,#00c8ff,#3b82f6)" : "rgba(255,255,255,0.06)",
                cursor:       input.trim() && !loading ? "pointer" : "not-allowed",
                display:      "flex",
                alignItems:   "center",
                justifyContent: "center",
                transition:   "background .2s",
                flexShrink:   0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white" style={{ opacity: input.trim() && !loading ? 1 : 0.3 }}>
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div style={{
            padding:    "6px 14px",
            textAlign:  "center",
            fontSize:   "0.6rem",
            color:      "rgba(255,255,255,0.18)",
            fontWeight: 600,
            borderTop:  "1px solid rgba(255,255,255,0.04)",
            background: "rgba(0,0,0,0.1)",
            flexShrink: 0,
          }}>
            AstraLearnia · Intelligent Guide
          </div>
        </div>
      )}
    </>
  );
}