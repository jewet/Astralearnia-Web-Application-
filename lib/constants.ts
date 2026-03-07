// ============================================================
// ASTRALEARNIA — Site Constants & Data
// ============================================================

import type { NavItem, Solution, Product, Service, BlogPost, Stat } from "@/types";

// ─── NAVIGATION ─────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Divisions",
    href: "#",
    children: [
      { label: "Technologies", href: "/technologies" },
      { label: "Institute", href: "/institute" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "AI Integration", href: "/solutions/ai-integration" },
      { label: "Cloud Infrastructure", href: "/solutions/cloud" },
      { label: "Cybersecurity", href: "/solutions/cybersecurity" },
      { label: "API Systems", href: "/solutions/api-systems" },
      { label: "Blockchain", href: "/solutions/blockchain" },
      { label: "Smart School AI", href: "/solutions/smart-school-ai" },
    ],
  },
  { label: "Products", href: "/products" },
  { label: "API", href: "/api-docs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// ─── SOLUTIONS ──────────────────────────────────────────────
export const SOLUTIONS: Solution[] = [
  {
    id: "ai-integration",
    icon: "⬡",
    name: "AI Integration",
    description: "Deploy intelligent automation and ML pipelines into enterprise infrastructure at scale.",
    division: "technologies",
    href: "/solutions/ai-integration",
    color: "azure",
  },
  {
    id: "api-systems",
    icon: "◈",
    name: "API Systems",
    description: "Scalable, secure API architecture that connects your entire ecosystem with developer precision.",
    division: "technologies",
    href: "/solutions/api-systems",
    color: "ice",
  },
  {
    id: "cloud",
    icon: "◯",
    name: "Cloud Infrastructure",
    description: "Multi-cloud deployment with DevOps automation, load balancing, and 99.9% uptime SLA.",
    division: "technologies",
    href: "/solutions/cloud",
    color: "azure",
  },
  {
    id: "cybersecurity",
    icon: "⬠",
    name: "Cybersecurity",
    description: "Zero-trust architecture, end-to-end encryption, and compliance-ready security frameworks.",
    division: "technologies",
    href: "/solutions/cybersecurity",
    color: "violet",
  },
  {
    id: "smart-school",
    icon: "◇",
    name: "Smart School AI",
    description: "Adaptive learning management systems tuned to each student's performance trajectory.",
    division: "institute",
    href: "/solutions/smart-school-ai",
    color: "violet",
  },
  {
    id: "blockchain",
    icon: "◆",
    name: "Blockchain & Contracts",
    description: "Decentralized solutions for secure transactions, identity, and transparent audit trails.",
    division: "technologies",
    href: "/solutions/blockchain",
    color: "ice",
  },
];

// ─── SERVICES ───────────────────────────────────────────────
export const SERVICES: Service[] = [
  { id: "1", number: "01", name: "Software Development & Engineering", description: "Custom enterprise software built for scale and performance.", division: "technologies", href: "/solutions/software-dev" },
  { id: "2", number: "02", name: "Cybersecurity Solutions", description: "Protect your entire digital perimeter with zero-trust.", division: "technologies", href: "/solutions/cybersecurity" },
  { id: "3", number: "03", name: "Blockchain & Smart Contracts", description: "Immutable, auditable systems for modern enterprise.", division: "technologies", href: "/solutions/blockchain" },
  { id: "4", number: "04", name: "AI Integration", description: "Embed intelligence into every workflow and system.", division: "technologies", href: "/solutions/ai-integration" },
  { id: "5", number: "05", name: "Cloud Infrastructure & DevOps", description: "Scalable infrastructure with automated CI/CD pipelines.", division: "technologies", href: "/solutions/cloud" },
  { id: "6", number: "06", name: "IoT Solutions", description: "Connect physical and digital systems in real-time.", division: "technologies", href: "/solutions/iot" },
  { id: "7", number: "07", name: "Robotics & Automation", description: "Industrial automation for next-generation operations.", division: "technologies", href: "/solutions/robotics" },
  { id: "8", number: "08", name: "Digital Transformation", description: "End-to-end consulting to modernize legacy organizations.", division: "technologies", href: "/solutions/digital-transformation" },
  { id: "9", number: "09", name: "System Architecture & Integration", description: "Design systems that scale from day one.", division: "technologies", href: "/solutions/architecture" },
  { id: "10", number: "10", name: "IT Support & Maintenance", description: "24/7 enterprise-grade support and infrastructure care.", division: "technologies", href: "/solutions/support" },
  { id: "11", number: "11", name: "Data Analytics & ML", description: "Turn raw data into actionable enterprise intelligence.", division: "technologies", href: "/solutions/analytics" },
  { id: "12", number: "12", name: "Enterprise Software Solutions", description: "ERP, CRM, and custom platforms for enterprise operations.", division: "technologies", href: "/solutions/enterprise" },
];

// ─── PRODUCTS ───────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  {
    id: "educreator",
    tag: "Education AI",
    name: "EduCreator AI",
    tagline: "Personalized learning at machine speed.",
    problem: "Educators waste hours creating static content that fails to adapt.",
    outcome: "AI generates personalized curricula, assessments, and materials in minutes — tuned to each student's actual level.",
    href: "/products/educreator",
    accent: "#7C3AED",
  },
  {
    id: "erp-spark",
    tag: "Enterprise",
    name: "ERP Spark",
    tagline: "Modular ERP that adapts to you.",
    problem: "Legacy ERP systems are bloated, expensive, and impossible to customize without consultants.",
    outcome: "AI-enhanced modular ERP that adapts to your real workflows — deployed in weeks, not years.",
    href: "/products/erp-spark",
    accent: "#2563EB",
  },
  {
    id: "soociall",
    tag: "Social Intelligence",
    name: "Soociall AI",
    tagline: "Community intelligence, automated.",
    problem: "Brands lose control of community narratives as they scale beyond what humans can monitor.",
    outcome: "AI-powered social intelligence that monitors, responds, and grows your digital presence 24/7.",
    href: "/products/soociall",
    accent: "#06B6D4",
  },
  {
    id: "decarf",
    tag: "Compliance AI",
    name: "Decarf AI",
    tagline: "Always audit-ready.",
    problem: "Regulatory compliance is manual, error-prone, and costs enterprises millions annually.",
    outcome: "Automated compliance monitoring, risk scoring, and reporting — always audit-ready without the team overhead.",
    href: "/products/decarf",
    accent: "#7C3AED",
  },
  {
    id: "astrapro",
    tag: "Productivity",
    name: "AstraPro",
    tagline: "One intelligent workspace.",
    problem: "Teams lose 30%+ of productive time to fragmented tools and constant context-switching.",
    outcome: "Unified AI workspace connecting every team's workflow in one adaptive, intelligent environment.",
    href: "/products/astrapro",
    accent: "#2563EB",
  },
];

// ─── BLOG POSTS ─────────────────────────────────────────────
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "ai-integration-enterprise-2025",
    tag: "AI Trends",
    title: "How AI Integration Is Reshaping Enterprise Operations in 2025",
    excerpt: "Organizations deploying AI at the infrastructure level are seeing 3× faster decision cycles and dramatic reductions in operational overhead.",
    readTime: "8 min read",
    date: "Jun 2025",
    emoji: "⬡",
    gradient: "from-azure-dim to-deep",
  },
  {
    id: "2",
    slug: "zero-trust-architecture",
    tag: "Cybersecurity",
    title: "Zero-Trust Architecture: The Non-Negotiable Standard for Modern Enterprises",
    excerpt: "Why traditional perimeter security is no longer sufficient and how to implement zero-trust without disrupting daily operations.",
    readTime: "6 min read",
    date: "May 2025",
    emoji: "⬠",
    gradient: "from-violet-dim to-deep",
  },
  {
    id: "3",
    slug: "smart-school-ai-future",
    tag: "EdTech",
    title: "Smart School AI: Transforming How Institutions Deliver Education at Scale",
    excerpt: "The next generation of learning management isn't just digital — it's intelligent, adaptive, and deeply personalized to every learner.",
    readTime: "7 min read",
    date: "Apr 2025",
    emoji: "◇",
    gradient: "from-ice-dim to-deep",
  },
];

// ─── STATS ──────────────────────────────────────────────────
export const HERO_STATS: Stat[] = [
  { value: "12+", label: "Enterprise Solutions" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "AI-First", label: "Architecture" },
  { value: "Global", label: "Infrastructure" },
];

// ─── TRUST PILLARS ──────────────────────────────────────────
export const PILLARS = [
  {
    icon: "⚡",
    name: "Scalable",
    description: "Architecture built to grow from startup to global enterprise without rebuilding from scratch.",
  },
  {
    icon: "⬠",
    name: "Secure",
    description: "Zero-trust security, end-to-end encryption, and compliance-ready frameworks in every layer.",
  },
  {
    icon: "⬡",
    name: "AI-Powered",
    description: "Intelligence embedded at the core — not bolted on. Every system learns, adapts, and improves.",
  },
  {
    icon: "◯",
    name: "Future-Ready",
    description: "Built for the next decade. Modular, interoperable, and designed for technologies not yet invented.",
  },
];

// ─── API EXAMPLE ────────────────────────────────────────────
export const API_CODE_EXAMPLE = `// Initialize Astralearnia Client
import { AstraClient } from '@astralearnia/sdk';

const astra = new AstraClient({
  apiKey: process.env.ASTRA_API_KEY,
  region: 'global',
});

// Analyze with Intelligence Layer
const result = await astra.intelligence.analyze({
  model: 'astra-intelligence-v2',
  input: data,
  options: {
    stream: true,
    confidence: 0.95,
  },
});

console.log(result.insights); // → ActionableIntelligence[]`;
