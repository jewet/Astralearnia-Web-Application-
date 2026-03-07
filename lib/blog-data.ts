export type ContentBlock =
  | { type: "p";     text: string }
  | { type: "h2";    text: string }
  | { type: "h3";    text: string }
  | { type: "quote"; text: string }
  | { type: "code";  text: string };

export type BlogPost = {
  slug:           string;
  emoji:          string;
  tag:            string;
  title:          string;
  excerpt:        string;
  date:           string;
  readTime:       string;
  author:         string;
  authorRole:     string;
  authorInitials: string;
  authorColor:    string;
  content:        ContentBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-decision-intelligence-beats-dashboards",
    emoji: "⚡", tag: "Technology",
    title: "Why Decision Intelligence Beats Dashboards Every Time",
    excerpt: "Dashboards tell you what happened. Decision intelligence tells you what to do. Here's the architectural difference and why it matters for your bottom line.",
    date: "Feb 28, 2026", readTime: "8 min read",
    author: "Tunde Okonkwo", authorRole: "Lead Engineer, AstraCore",
    authorInitials: "TO", authorColor: "#00c8ff",
    content: [
      { type: "p",    text: "Every BI dashboard is a rear-view mirror. It tells you where you've been — revenue last quarter, churn rate last month, support tickets last week. Useful, yes. But insufficient for organisations competing with AI-native businesses." },
      { type: "h2",  text: "The Problem With Dashboards" },
      { type: "p",    text: "Dashboards were designed for a world where humans had time to observe, deliberate, and act. Markets move in hours. Customer behaviour shifts in minutes. Competitors iterate in days. A dashboard that refreshes daily is nearly useless in this environment." },
      { type: "p",    text: "The deeper problem is that dashboards require humans to close the loop. A human must notice a metric, interpret its cause, formulate a hypothesis, decide on an action, and execute it. Each step introduces latency, bias, and error." },
      { type: "h2",  text: "What Decision Intelligence Actually Does" },
      { type: "p",    text: "Decision Intelligence replaces the observe-deliberate-act loop with a continuous automated inference cycle. Instead of showing you that churn increased 12% last month, a DI system identifies which customers will churn in the next 14 days, surfaces the driving factors for each customer, and triggers personalised retention actions — all without a human in the loop." },
      { type: "quote", text: "Clients using AstraCore's DI suite report 3× faster decision cycles and a 40% reduction in analyst overhead within 6 months of deployment." },
      { type: "h2",  text: "The Architecture Difference" },
      { type: "p",    text: "A dashboard is a read layer on top of a data warehouse — no model, no inference engine, no action pathway. A DI system is an inference layer between your data and your operations: reads from your warehouse, runs continuous model inference, writes decisions back into your CRM, ERP, and support systems." },
      { type: "h3",  text: "Key Architectural Components" },
      { type: "p",    text: "A production DI system requires: a real-time data ingestion layer, model serving capable of sub-200ms inference, a decision routing engine mapping model outputs to business actions, and an explainability layer giving operators oversight without requiring manual intervention." },
      { type: "h2",  text: "Getting Started" },
      { type: "p",    text: "Most organisations already have the data they need. The gap is the intelligence layer. AstraCore deploys on top of your existing Snowflake, BigQuery, or Redshift warehouse in under 48 hours — no data migration required. Book a demo to see it working on your own data." },
    ],
  },
  {
    slug: "africa-ai-skills-gap-2026",
    emoji: "🌍", tag: "Institute",
    title: "Africa's AI Skills Gap in 2026: The Numbers and What We're Doing About It",
    excerpt: "72% of African enterprises report AI as a strategic priority. Only 18% have staff trained to deploy it. We break down the gap and chart the path to closing it.",
    date: "Feb 20, 2026", readTime: "12 min read",
    author: "Amara Osei", authorRole: "Head of Education, Institute Division",
    authorInitials: "AO", authorColor: "#a855f7",
    content: [
      { type: "p",    text: "In 2026, AI is no longer a future technology for African enterprises — it is an urgent present priority. Our annual survey of 1,200 organisations across 14 African markets found 72% list AI adoption as a top-three strategic priority. Yet only 18% say they have staff who can actually deploy it." },
      { type: "h2",  text: "The Scale of the Gap" },
      { type: "p",    text: "That 54-percentage-point gap between ambition and capability is the defining workforce challenge for African enterprises this decade. It manifests in three ways: failed AI projects abandoned due to lack of internal expertise, expensive dependency on foreign consultants, and AI paralysis — where leadership understands the opportunity but cannot mobilise." },
      { type: "h2",  text: "Why Traditional Training Fails" },
      { type: "p",    text: "Standard corporate training — a two-day workshop or a generic online course — addresses none of the structural causes. It doesn't account for varying baseline knowledge, doesn't connect learning to the learner's specific role, and provides no ongoing reinforcement as AI evolves." },
      { type: "quote", text: "Generic AI training achieves 23% knowledge retention at 90 days. Adaptive, role-specific programmes retain 71%." },
      { type: "h2",  text: "The Astralearnia Institute Approach" },
      { type: "p",    text: "Every learner begins with a diagnostic assessment mapped against a competency framework specific to their role. The AI engine builds a personalised path that closes their specific gaps. A data analyst gets different content to a product manager or C-suite executive." },
      { type: "h3",  text: "Results From the Field" },
      { type: "p",    text: "Across 150 corporate deployments in 2025: 94% course completion rate, 40% lower training costs versus classroom delivery, and 3× increase in successful internal AI project initiations within 12 months of programme completion." },
      { type: "h2",  text: "The Road Ahead" },
      { type: "p",    text: "Closing Africa's AI skills gap is a decade-long project. Organisations that invest in adaptive outcome-focused learning now will compound that advantage every year. The enterprises building internal AI capability today will define their industries by 2030." },
    ],
  },
  {
    slug: "fine-tuning-llms-on-proprietary-data",
    emoji: "◈", tag: "Technology",
    title: "Fine-Tuning LLMs on Proprietary Data: A Practical Guide",
    excerpt: "A step-by-step guide to fine-tuning language models on your own dataset — from data prep to evaluation to safe deployment in production.",
    date: "Feb 14, 2026", readTime: "15 min read",
    author: "Chisom Eze", authorRole: "ML Engineer, AstraCore",
    authorInitials: "CE", authorColor: "#00ffb2",
    content: [
      { type: "p",    text: "General-purpose LLMs don't know your products, customers, terminology, or business context. Fine-tuning changes that — it adapts a foundation model's weights specifically to your data, dramatically improving performance on your tasks." },
      { type: "h2",  text: "Step 1: Data Preparation" },
      { type: "p",    text: "Fine-tuning quality is 80% data quality. You need 500–1,000 high-quality examples in the instruction-response format your task requires. For most enterprise use cases — document classification, internal Q&A, decision support — this means curating real examples from your historical data." },
      { type: "code", text: "{\n  \"instruction\": \"Classify this support ticket by urgency.\",\n  \"input\": \"System down, cannot process payments\",\n  \"output\": \"CRITICAL\"\n}" },
      { type: "h2",  text: "Step 2: Choosing Your Base Model" },
      { type: "p",    text: "For most enterprise tasks, a 7B parameter model fine-tuned on your data will outperform a 70B general model on your specific use case — at a fraction of the inference cost. Start with a proven open-source base (Mistral, Llama 3, Gemma) and fine-tune using LoRA adapters." },
      { type: "h2",  text: "Step 3: Training Configuration" },
      { type: "p",    text: "Use QLoRA for most enterprise fine-tuning — it reduces GPU memory requirements by 4× while maintaining 95%+ of full fine-tuning quality. A standard run on a single A100 for a 7B model takes 4–8 hours. AstraCore's fine-tuning API abstracts this into a single call." },
      { type: "quote", text: "QLoRA fine-tuning on a 7B model costs approximately $15–40 for a 1,000-example dataset on cloud GPU infrastructure." },
      { type: "h2",  text: "Step 4: Evaluation & Safe Deployment" },
      { type: "p",    text: "Split your data 80/10/10 (train/validation/test) before fine-tuning. Evaluate on task-specific metrics and run human evaluation on 100+ examples. Before production, run red-teaming evaluations and check for PII leakage. AstraCore handles monitoring and automatic rollback." },
    ],
  },
  {
    slug: "roi-of-adaptive-learning-corporate",
    emoji: "📊", tag: "Institute",
    title: "Calculating the Real ROI of Adaptive Learning in Corporate Environments",
    excerpt: "Beyond completion rates: how to measure the true business value of intelligent training programmes using a framework we've refined across 150+ deployments.",
    date: "Feb 7, 2026", readTime: "10 min read",
    author: "Yemi Adeyemi", authorRole: "Chief People Officer, FinCorp Africa",
    authorInitials: "YA", authorColor: "#ff6ec7",
    content: [
      { type: "p",    text: "Most L&D teams measure training ROI by completion rates and satisfaction scores. Both are vanity metrics. Completion tells you a video was watched. Satisfaction tells you the content was enjoyable. Neither tells you whether your organisation can do anything it couldn't do before." },
      { type: "h2",  text: "The ROI Framework We Use" },
      { type: "p",    text: "Real training ROI measures four dimensions: knowledge retention at 30, 60, and 90 days; skill application rate (are learners using new skills?); business outcome linkage (did AI projects succeed that required trained skills?); and cost comparison versus alternative delivery." },
      { type: "h2",  text: "Retention: Where Most Training Fails" },
      { type: "p",    text: "Without reinforcement, learners forget 50% of new information within 24 hours and 70% within a week. Adaptive learning counters this with spaced repetition — surfacing concepts at the optimal interval for each individual learner based on their retention patterns." },
      { type: "quote", text: "Astralearnia Institute programmes achieve 71% knowledge retention at 90 days, versus 23% for standard e-learning and 18% for classroom training." },
      { type: "h2",  text: "The Cost Calculation" },
      { type: "p",    text: "Against our previous classroom training provider: $340 per learner per day with 18% retention at 90 days. Astralearnia Institute: $12 per learner per month with 71% retention. For a 500-person upskilling programme, that's a $1.2M saving with dramatically better outcomes." },
    ],
  },
  {
    slug: "api-first-ai-architecture",
    emoji: "</>", tag: "Technology",
    title: "API-First AI Architecture: Why It's the Only Architecture That Scales",
    excerpt: "Embedding AI models directly into monoliths creates technical debt. Here's the API-first pattern we use for every enterprise deployment — and why it matters.",
    date: "Jan 30, 2026", readTime: "11 min read",
    author: "Tunde Okonkwo", authorRole: "Lead Engineer, AstraCore",
    authorInitials: "TO", authorColor: "#00c8ff",
    content: [
      { type: "p",    text: "When organisations first adopt AI, the instinct is to embed it directly into existing applications. A model gets imported into the monolith. Inference runs in-process. It works — until it doesn't. Model updates require full application deploys. Scaling inference requires scaling the entire application." },
      { type: "h2",  text: "The API-First Alternative" },
      { type: "p",    text: "API-first AI architecture separates model serving from application logic. Your AI models run behind a versioned API. Your applications call that API. The model can be updated, scaled, and replaced independently of the applications that consume it." },
      { type: "h2",  text: "Why It Scales" },
      { type: "p",    text: "When inference is behind an API, you scale it horizontally without touching your application layer. You run A/B tests between model versions by routing traffic to each endpoint. You add new consumers without model changes. And you monitor inference quality, latency, and usage in one place." },
      { type: "quote", text: "Every enterprise AI deployment Astralearnia has built in the last 3 years uses API-first architecture. Zero monolith-embedded pilots survived past 18 months." },
      { type: "h2",  text: "The Astralearnia Pattern" },
      { type: "p",    text: "AstraAPI exposes versioned REST and GraphQL endpoints for all deployed models, handling auth, rate limiting, observability, and caching. Your team integrates via SDK and never touches model infrastructure — typically reducing time-to-integration from 6–8 weeks to under 48 hours." },
    ],
  },
  {
    slug: "prompt-engineering-enterprise",
    emoji: "✦", tag: "Institute",
    title: "Prompt Engineering Is a Skill. Here's How Enterprises Are Teaching It.",
    excerpt: "From zero-shot to chain-of-thought: how leading African enterprises are building prompt engineering into their L&D programmes and seeing immediate productivity gains.",
    date: "Jan 22, 2026", readTime: "9 min read",
    author: "Amara Osei", authorRole: "Head of Education, Institute Division",
    authorInitials: "AO", authorColor: "#a855f7",
    content: [
      { type: "p",    text: "Two years ago, prompt engineering was the exclusive domain of AI researchers. Today it's a baseline productivity skill for knowledge workers — the equivalent of knowing how to use a search engine effectively. Enterprises that train their teams on it see immediate, measurable gains." },
      { type: "h2",  text: "What Prompt Engineering Means for Business" },
      { type: "p",    text: "It's the difference between a generic paragraph and a first draft of a client proposal in your company's voice. Between a vague summary and an actionable meeting debrief with assigned owners. The skill is about reliably getting useful outputs from AI systems for specific business tasks." },
      { type: "h2",  text: "The Curriculum We Use" },
      { type: "p",    text: "The Astralearnia Institute prompt engineering track covers six areas: basic instruction design, context and role framing, chain-of-thought prompts, output formatting and structure, multi-turn conversation management, and prompt security (preventing injection and data leakage)." },
      { type: "quote", text: "Employees completing the prompt engineering track save an average of 2.3 hours per week on writing, research, and summarisation tasks." },
      { type: "h2",  text: "Measuring the Impact" },
      { type: "p",    text: "We measure impact through: task completion time (typically 40–60% reduction), output quality scores from managers, and AI tool adoption rates. Teams that complete structured prompt engineering training have 3× higher ongoing AI tool usage than those who receive tools without training." },
    ],
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find((p) => p.slug === slug);