// ============================================================
// ASTRALEARNIA — Global Types
// ============================================================

export type Division = "technologies" | "institute";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Solution {
  id: string;
  icon: string;
  name: string;
  description: string;
  division: Division;
  href: string;
  color: "azure" | "violet" | "ice";
}

export interface Product {
  id: string;
  tag: string;
  name: string;
  tagline: string;
  problem: string;
  outcome: string;
  href: string;
  accent: string;
}

export interface Service {
  id: string;
  number: string;
  name: string;
  description: string;
  division: Division;
  href: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  emoji: string;
  gradient: string;
}

export interface Stat {
  value: string;
  label: string;
  description?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}
