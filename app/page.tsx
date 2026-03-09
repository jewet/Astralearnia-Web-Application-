"use client";
import { useState, useEffect, useRef, useCallback, CSSProperties } from "react";
import Link from "next/link";
import { DivisionModal } from "@/components/DivisionModal";
import { BLOG_POSTS, PILLARS } from "@/lib/constants";

// ─── Types ────────────────────────────────────────────────────────────────────
type RobotPhase =
  | "enter" | "center" | "reachRight" | "cardRight"
  | "reachLeft" | "cardLeft" | "showcase" | "crystallize" | "fadeOut";
type AnimType = "gravity" | "extrude" | "glitch" | "kinetic" | "masked";
type SlideColor = "cyan" | "blue" | "emerald" | "red" | "violet" | "fuchsia";
type FormStatus = "idle" | "submitting" | "success" | "error";
type DivisionChoice = "technology" | "institute" | "both" | "";

interface AnimMessage {
  anim: AnimType; eyebrow: string; text: string; highlight: string;
  sub: string; tag: string; accent: string;
  mediaLabel: string; mediaEmoji: string; mediaBg: string; mediaAccent: string; detail: string;
}
interface StarData { w: string; h: string; left: string; top: string; dur: string; delay: string; }
interface HeroRotation {
  anim: AnimType; line1: string; line2: string; highlight: string; sub: string; accent: string;
}
interface DivisionRotation { line: string; anim: AnimType; accent: string; }
interface CrystalShard { tx: number; ty: number; r: number; color: string; clip: string; size: number; }
interface ContactForm { name: string; email: string; company: string; division: DivisionChoice; subject: string; message: string; }

// ─── Shared style tokens ──────────────────────────────────────────────────────
const pill = `inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full
  border border-white/20 bg-white/5
  text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.18em]`;

const btnCyan = `inline-flex items-center justify-center gap-2
  px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-black text-sm sm:text-base tracking-wide text-white
  bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600
  hover:from-cyan-300 hover:via-blue-400 hover:to-violet-500
  shadow-[0_0_30px_rgba(0,200,255,0.4)] hover:shadow-[0_0_55px_rgba(0,200,255,0.65)]
  transition-all duration-300 hover:-translate-y-0.5 active:scale-95`;

const btnGhost = `inline-flex items-center justify-center gap-2
  px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-black text-sm sm:text-base tracking-wide
  border-2 border-white/25 hover:border-white/60 text-white
  hover:bg-white/8 transition-all duration-300 hover:-translate-y-0.5 active:scale-95`;

const btnViolet = `inline-flex items-center justify-center gap-2
  px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-black text-sm sm:text-base tracking-wide text-white
  bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500
  hover:from-violet-400 hover:via-fuchsia-400 hover:to-pink-400
  shadow-[0_0_30px_rgba(160,80,255,0.4)] hover:shadow-[0_0_55px_rgba(160,80,255,0.65)]
  transition-all duration-300 hover:-translate-y-0.5 active:scale-95`;

const ANIM_LABEL: Record<AnimType, string> = {
  gravity: "Gravity & Physics", extrude: "3D Extrusion",
  glitch: "Chaos & Glitch", kinetic: "Kinetic Typography", masked: "Masked Reveal",
};

// ─── Crystal shards ───────────────────────────────────────────────────────────
const CRYSTAL_SHARDS: CrystalShard[] = [
  { tx: -190, ty: -130, r: 135,  color: "#a5f3fc", clip: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",             size: 52 },
  { tx:  170, ty: -100, r: -60,  color: "#93c5fd", clip: "polygon(0 0,100% 15%,85% 100%,15% 100%)",              size: 44 },
  { tx: -230, ty:   90, r:  90,  color: "#e0f2fe", clip: "polygon(0 0,70% 0,100% 100%,30% 100%)",                size: 48 },
  { tx:  210, ty:  110, r: -120, color: "#bae6fd", clip: "polygon(50% 0%,100% 100%,0% 100%)",                    size: 40 },
  { tx:    0, ty: -210, r:   45, color: "#7dd3fc", clip: "polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)", size: 38 },
  { tx: -110, ty:  190, r: -180, color: "#a5f3fc", clip: "polygon(0 25%,50% 0%,100% 25%,100% 75%,50% 100%,0% 75%)", size: 46 },
  { tx:  150, ty: -170, r:   75, color: "#e0f2fe", clip: "polygon(0 0,100% 0,60% 100%)",                         size: 36 },
  { tx: -160, ty:  -65, r:  -90, color: "#93c5fd", clip: "polygon(40% 0%,100% 0,100% 100%,0% 80%)",              size: 42 },
  { tx:   85, ty:  165, r:  200, color: "#bae6fd", clip: "polygon(50% 0%,90% 20%,100% 60%,75% 100%,25% 100%,0% 60%,10% 20%)", size: 50 },
  { tx:  -75, ty:  210, r: -150, color: "#7dd3fc", clip: "polygon(0 0,100% 30%,70% 100%)",                       size: 34 },
  { tx:  240, ty:   40, r:   60, color: "#a5f3fc", clip: "polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%)",   size: 40 },
  { tx: -200, ty:  -20, r: -240, color: "#bae6fd", clip: "polygon(0 0,80% 0,100% 50%,80% 100%,0% 100%)",        size: 44 },
];

// ─── Hero cycling headlines ───────────────────────────────────────────────────
const HERO_ROTATIONS: HeroRotation[] = [
  {
    anim: "gravity", accent: "#22d3ee",
    line1: "Two Divisions.",
    line2: "One Unified Intelligence Platform.",
    highlight: "Intelligence Platform.",
    sub: "Astralearnia is the intelligence layer modern organisations need — delivering enterprise AI systems through our Technology Division and transforming human potential through our Institute Division.",
  },
  {
    anim: "extrude", accent: "#a78bfa",
    line1: "Engineering Intelligence.",
    line2: "Empowering Minds.",
    highlight: "Empowering Minds.",
    sub: "We engineer AI systems that think and build platforms that teach — two specialised divisions, one coherent intelligence company trusted by 500+ organisations.",
  },
  {
    anim: "kinetic", accent: "#34d399",
    line1: "AI That Builds.",
    line2: "Learning That Transforms.",
    highlight: "That Transforms.",
    sub: "Technology Division deploys production-grade AI in under 48 hours. Institute Division transforms how your teams learn, adapt, and grow with measurable results from day one.",
  },
  {
    anim: "glitch", accent: "#f97316",
    line1: "Where Technology",
    line2: "Meets Human Potential.",
    highlight: "Human Potential.",
    sub: "Enterprise AI systems and adaptive human learning — not separate products, but one coherent intelligence platform built for the way modern organisations actually work.",
  },
  {
    anim: "masked", accent: "#e879f9",
    line1: "The Intelligence Layer",
    line2: "Your Organisation Needs.",
    highlight: "Organisation Needs.",
    sub: "500+ organisations trust Astralearnia to deploy AI that works and build teams that grow. One company. Two divisions. Measurable impact from day one.",
  },
  {
    anim: "gravity", accent: "#22d3ee",
    line1: "Deploy Today.",
    line2: "Master Tomorrow.",
    highlight: "Master Tomorrow.",
    sub: "Ship production AI within 48 hours through Technology Division, while Institute Division simultaneously upskills your teams to own, operate, and evolve it.",
  },
];

// ─── Division section cycling headlines ──────────────────────────────────────
const DIVISION_ROTATIONS: DivisionRotation[] = [
  { line: "One Company. Two Powerful Paths to Impact.", anim: "gravity",  accent: "#22d3ee" },
  { line: "Technology Builds. Institute Grows.",        anim: "kinetic",  accent: "#34d399" },
  { line: "Deploy AI Today. Master It Tomorrow.",       anim: "extrude",  accent: "#a78bfa" },
  { line: "Enterprise Systems. Human-Centred Learning.",anim: "glitch",   accent: "#f97316" },
  { line: "Intelligence at Scale. Heart at Centre.",    anim: "masked",   accent: "#e879f9" },
];

// ─── TextAnimSlider messages ──────────────────────────────────────────────────
const ANIM_MESSAGES: AnimMessage[] = [
  {
    anim: "gravity",   eyebrow: "Who We Are",              tag: "Our Mission",          accent: "#22d3ee",
    text: "Engineering Intelligence.",                      highlight: "Intelligence.",
    sub: "Astralearnia is the intelligence layer modern organisations need — purpose-built to turn raw data into decisive action.",
    mediaLabel: "What is Astralearnia?",   mediaEmoji: "🧠", mediaBg: "from-cyan-950/60 to-blue-950/40",   mediaAccent: "#22d3ee",
    detail: "We exist at the intersection of enterprise technology and human learning — two divisions, one unified intelligence platform trusted by 500+ organisations.",
  },
  {
    anim: "extrude",   eyebrow: "Our Purpose",             tag: "Our Vision",           accent: "#a78bfa",
    text: "Empowering Minds.",                              highlight: "Minds.",
    sub: "We don't just build AI systems — we build the people who use them. Transforming human potential so your teams grow as fast as your technology does.",
    mediaLabel: "Empowering Human Potential", mediaEmoji: "🎓", mediaBg: "from-violet-950/60 to-fuchsia-950/40", mediaAccent: "#a78bfa",
    detail: "Through our Institute Division, 12,000+ learners across Africa and beyond have earned AI-certified skills that translate directly to career and business growth.",
  },
  {
    anim: "glitch",    eyebrow: "The Technology Division", tag: "Technology Division",  accent: "#22d3ee",
    text: "AI Systems. Built to Scale.",                    highlight: "Built to Scale.",
    sub: "Delivering enterprise AI — custom models, decision intelligence, automation pipelines, and developer APIs — deployed in under 48 hours.",
    mediaLabel: "Technology Division — Live", mediaEmoji: "⚡", mediaBg: "from-blue-950/60 to-cyan-950/40", mediaAccent: "#22d3ee",
    detail: "From Robotics and Embedded Systems to Blockchain and Cybersecurity — our engineers design, build, and ship production-grade intelligent systems your competitors don't have yet.",
  },
  {
    anim: "kinetic",   eyebrow: "The Institute Division",  tag: "Institute Division",   accent: "#e879f9",
    text: "Learn. Adapt. Evolve.",                          highlight: "Evolve.",
    sub: "Adaptive AI learning paths, real-time skills analytics, and certifications that matter — personalised for every team member, measurable from day one.",
    mediaLabel: "Institute Division — Adaptive Learning", mediaEmoji: "📡", mediaBg: "from-fuchsia-950/60 to-violet-950/40", mediaAccent: "#e879f9",
    detail: "Corporate training programmes, AI certification tracks, instructor dashboards, and skills gap analysis — one platform replacing five legacy tools at 40% lower cost.",
  },
  {
    anim: "masked",    eyebrow: "One Unified Platform",    tag: "Why Astralearnia",     accent: "#34d399",
    text: "One Company. Infinite Impact.",                  highlight: "Infinite Impact.",
    sub: "Two powerful divisions. One coherent intelligence platform. Whether you need enterprise AI or transformative learning — Astralearnia has a dedicated path for it.",
    mediaLabel: "The Astralearnia Platform", mediaEmoji: "✦", mediaBg: "from-emerald-950/60 to-cyan-950/40", mediaAccent: "#34d399",
    detail: "Clients report 3.2× average ROI, decisions made 3× faster, and AI deployments live in under 48 hours. This is what the intelligence layer looks like in practice.",
  },
];

// ─── Solutions slides ─────────────────────────────────────────────────────────
const SOLUTIONS_SLIDES: Array<{
  id: number; category: string; icon: string; color: SlideColor;
  borderColor: string; glowColor: string; gradientFrom: string; gradientTo: string;
  title: string; subtitle: string; description: string; features: string[];
}> = [
  {
    id: 1, category: "Robotics", icon: "🤖", color: "cyan",
    borderColor: "#22d3ee", glowColor: "rgba(0,200,255,0.3)", gradientFrom: "#0e2a35", gradientTo: "#091522",
    title: "Robotics Systems", subtitle: "ROS2 · Physics Simulation · Manufacturing",
    description: "End-to-end robotics solutions from concept to deployment. We build ROS2-based autonomous systems, physics simulation environments, and integrate smart robotics into manufacturing pipelines with AI-powered control loops.",
    features: ["ROS2 / ROS1 Integration","Physics Simulation (Gazebo, Isaac)","Industrial Robot Programming","SLAM & Autonomous Navigation","Computer Vision & Perception","Manufacturing Line Automation"],
  },
  {
    id: 2, category: "Embedded C", icon: "💾", color: "blue",
    borderColor: "#60a5fa", glowColor: "rgba(60,120,255,0.3)", gradientFrom: "#0c1a30", gradientTo: "#060d1a",
    title: "Embedded Systems", subtitle: "Firmware · Microcontrollers · RTOS",
    description: "Bare-metal and RTOS-based firmware development for mission-critical applications. From IoT edge devices to industrial controllers — we write optimised Embedded C/C++ that performs at the edge where milliseconds matter.",
    features: ["ARM Cortex / STM32 / ESP32","FreeRTOS / Zephyr RTOS","CAN, SPI, I2C, UART Protocols","Low-Power Optimisation","OTA Firmware Updates","Hardware Abstraction Layers"],
  },
  {
    id: 3, category: "Automation", icon: "⚙️", color: "emerald",
    borderColor: "#34d399", glowColor: "rgba(52,211,153,0.3)", gradientFrom: "#081e12", gradientTo: "#040e09",
    title: "Process Automation", subtitle: "Industrial · Workflow · AI-Driven",
    description: "Transform repetitive, manual processes into intelligent automated pipelines. From PLC-level industrial automation to enterprise workflow orchestration powered by our AI decision engine — we eliminate bottlenecks permanently.",
    features: ["PLC & SCADA Systems","RPA (Robotic Process Automation)","AI-Powered Workflow Engines","Industrial IoT Integration","Digital Twin Modelling","Predictive Maintenance AI"],
  },
  {
    id: 4, category: "Cybersecurity", icon: "🔐", color: "red",
    borderColor: "#f87171", glowColor: "rgba(248,113,113,0.3)", gradientFrom: "#200a0a", gradientTo: "#100404",
    title: "Cybersecurity", subtitle: "Zero-Trust · Threat Intel · Pen Testing",
    description: "Enterprise-grade security architecture, real-time threat detection, and full incident response. We secure AI systems, embedded devices, and cloud infrastructure against modern attack vectors with zero-trust principles.",
    features: ["Penetration Testing & Red Team","Zero-Trust Architecture","AI-Powered Threat Detection","Embedded System Security","SOC-as-a-Service","ISO 27001 Compliance & Audit"],
  },
  {
    id: 5, category: "Blockchain", icon: "⛓️", color: "violet",
    borderColor: "#a78bfa", glowColor: "rgba(167,139,250,0.3)", gradientFrom: "#130a20", gradientTo: "#08040f",
    title: "Blockchain Solutions", subtitle: "Smart Contracts · DeFi · Supply Chain",
    description: "Build trust at scale with distributed ledger technology. Smart contract development, DeFi protocols, tokenisation infrastructure, and blockchain-based supply chain traceability systems that bring real-world transparency.",
    features: ["Solidity / Rust Smart Contracts","Ethereum / Solana / Polkadot","DeFi Protocol Design","Supply Chain Traceability","NFT & Token Platforms","Web3 API & SDK Integration"],
  },
  {
    id: 6, category: "MVP & Rapid Build", icon: "🚀", color: "fuchsia",
    borderColor: "#e879f9", glowColor: "rgba(232,121,249,0.3)", gradientFrom: "#1a0820", gradientTo: "#0c040f",
    title: "MVP & Rapid Build", subtitle: "Idea → Product → Market in 4–8 Weeks",
    description: "Got an idea? We take you from raw concept to a working, investor-ready MVP in 4–8 weeks. Product strategy workshops, technical architecture, prototype development, AI feature integration, and launch-ready delivery.",
    features: ["Product Discovery Workshops","Technical Architecture Design","Full-Stack MVP Development","AI Feature Integration","Investor-Ready Demos","Post-Launch Iteration Support"],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ✅ FIX: useSectionVisible — callback ref so observer attaches when section
//    actually mounts in DOM (after intro completes), not during the early-return
//    intro phase when ref.current is null and the effect is a no-op.
// ═══════════════════════════════════════════════════════════════════════════════
function useSectionVisible(threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  const obsRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: Element | null) => {
      // Disconnect any previous observer on this hook instance
      obsRef.current?.disconnect();
      if (!node) return;
      obsRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obsRef.current?.disconnect();
          }
        },
        { threshold }
      );
      obsRef.current.observe(node);
    },
    [threshold]
  );

  return { ref, visible };
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROBOT INTRO
// ═══════════════════════════════════════════════════════════════════════════════
function RobotIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<RobotPhase>("enter");
  const [starData, setStarData] = useState<StarData[]>([]);
  const [showShards, setShowShards] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setStarData(Array.from({ length: 55 }, () => ({
      w: (Math.random() * 2 + 1).toFixed(4) + "px",
      h: (Math.random() * 2 + 1).toFixed(4) + "px",
      left: (Math.random() * 100).toFixed(4) + "%",
      top: (Math.random() * 100).toFixed(4) + "%",
      dur: (1.5 + Math.random() * 2).toFixed(4) + "s",
      delay: (Math.random() * 2).toFixed(4) + "s",
    })));
  }, []);

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [
      setTimeout(() => setPhase("center"),      200),
      setTimeout(() => setPhase("reachRight"),  1300),
      setTimeout(() => setPhase("cardRight"),   1700),
      setTimeout(() => setPhase("reachLeft"),   2500),
      setTimeout(() => setPhase("cardLeft"),    2900),
      setTimeout(() => setPhase("showcase"),    3700),
      setTimeout(() => setPhase("crystallize"), 4600),
      setTimeout(() => setShowShards(true),     4850),
      setTimeout(() => setPhase("fadeOut"),     5400),
      setTimeout(() => onComplete(),            6200),
    ];
    return () => t.forEach(clearTimeout);
  }, [onComplete]);

  const robotX: Record<RobotPhase, string> = {
    enter:      "translateX(115vw)",
    center:     "translateX(0)",
    reachRight: "translateX(0) rotate(5deg)",
    cardRight:  "translateX(0) rotate(5deg)",
    reachLeft:  "translateX(0) rotate(-5deg)",
    cardLeft:   "translateX(0) rotate(-5deg)",
    showcase:   "translateX(0) rotate(0deg)",
    crystallize:"translateX(0) rotate(0deg)",
    fadeOut:    "translateX(0) scale(0.8)",
  };
  const robotTransition: Record<RobotPhase, string> = {
    enter:      "none",
    center:     "transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94)",
    reachRight: "transform 0.4s ease",
    cardRight:  "transform 0.3s ease",
    reachLeft:  "transform 0.4s ease",
    cardLeft:   "transform 0.3s ease",
    showcase:   "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
    crystallize:"transform 0.3s ease",
    fadeOut:    "transform 0.6s ease, opacity 0.5s ease",
  };

  const isCrystal = phase === "crystallize" || phase === "fadeOut";
  const techCardVisible = ["cardRight","reachLeft","cardLeft","showcase","crystallize","fadeOut"].includes(phase);
  const instCardVisible = ["cardLeft","showcase","crystallize","fadeOut"].includes(phase);
  const overlayFading = phase === "fadeOut";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "#020509",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      opacity: overlayFading ? 0 : 1,
      transition: overlayFading ? "opacity 0.7s ease 0.1s" : "none",
    }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {starData.map((s, i) => (
          <div key={i} style={{
            position: "absolute", borderRadius: "50%",
            width: s.w, height: s.h,
            background: "rgba(0,200,255,0.6)",
            left: s.left, top: s.top,
            animation: `twinkle ${s.dur} ${s.delay} ease-in-out infinite`,
          }} />
        ))}
      </div>

      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.18) 2px,rgba(0,0,0,0.18) 4px)",
      }} />

      <div style={{
        position: "absolute", bottom: "24%", left: 0, right: 0, height: "2px",
        background: "linear-gradient(90deg,transparent,rgba(0,200,255,0.3),rgba(0,200,255,0.7),rgba(0,200,255,0.3),transparent)",
        boxShadow: "0 0 12px rgba(0,200,255,0.5)",
      }} />

      <div style={{
        position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
        textAlign: "center", zIndex: 10, animation: "ri_fadeInDown 0.8s ease forwards",
      }}>
        <div style={{ fontSize: "clamp(1rem,3vw,1.8rem)", fontWeight: 900, letterSpacing: "0.3em", color: "rgba(0,200,255,0.85)", textTransform: "uppercase", fontFamily: "monospace" }}>
          ASTRALEARNIA
        </div>
        <div style={{ fontSize: "clamp(0.5rem,1.5vw,0.75rem)", color: "rgba(0,200,255,0.4)", letterSpacing: "0.5em", marginTop: 6, fontFamily: "monospace" }}>
          INITIALISING INTELLIGENCE PLATFORM...
        </div>
        <div style={{ marginTop: 12, width: 200, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden", margin: "12px auto 0" }}>
          <div style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg,#00c8ff,#8040ff)", animation: "ri_loadBar 5s ease forwards" }} />
        </div>
      </div>

      {/* Technology Division Card */}
      <div style={{
        position: "absolute",
        bottom: isMobile ? (techCardVisible ? "3%" : "-200px") : "24%",
        right: isMobile
          ? (techCardVisible ? "calc(50% + 6px)" : "100vw")
          : (techCardVisible ? "clamp(24px,12vw,180px)" : "-340px"),
        transitionProperty: "right, bottom, opacity, filter",
        transitionDuration: "0.7s, 0.7s, 0.5s, 0.3s",
        transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1), cubic-bezier(0.34,1.56,0.64,1), ease, ease",
        opacity: (phase === "crystallize" || phase === "fadeOut") ? 0 : (techCardVisible ? 1 : 0),
        zIndex: 11,
        filter: isCrystal ? "brightness(1.5) saturate(3) hue-rotate(180deg)" : "none",
      }}>
        <div style={{
          width: isMobile ? "calc(46vw - 8px)" : "clamp(160px,22vw,260px)",
          background: "rgba(0,20,40,0.95)",
          border: "1.5px solid rgba(0,200,255,0.55)",
          borderRadius: 16,
          padding: "clamp(10px,2vw,18px)",
          boxShadow: "0 0 40px rgba(0,200,255,0.35), inset 0 0 30px rgba(0,200,255,0.05)",
          backdropFilter: "blur(12px)",
          animation: techCardVisible ? "ri_cardFloat 3s ease-in-out infinite" : "none",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(0,200,255,0.15)", border: "1px solid rgba(0,200,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
            <div>
              <div style={{ fontSize: "clamp(6px,0.9vw,9px)", color: "rgba(0,200,255,0.6)", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace" }}>Division 01</div>
              <div style={{ fontSize: "clamp(9px,1.4vw,13px)", color: "#fff", fontWeight: 900, lineHeight: 1.2 }}>Astralearnia Technology</div>
            </div>
          </div>
          <p style={{ fontSize: "clamp(8px,1.1vw,11px)", color: "rgba(0,200,255,0.7)", fontWeight: 700, marginBottom: 8, fontFamily: "monospace", letterSpacing: "0.04em" }}>AI Systems. Built to Scale.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {["AI Models","Automation","APIs","Robotics"].map(f => (
              <span key={f} style={{ padding: "2px 7px", borderRadius: 10, fontSize: "clamp(6px,0.8vw,9px)", fontWeight: 800, background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.25)", color: "rgba(0,200,255,0.8)" }}>{f}</span>
            ))}
          </div>
          <div style={{ marginTop: 8, height: 2, borderRadius: 1, background: "linear-gradient(90deg,#00c8ff,transparent)", opacity: 0.6 }} />
        </div>
        <div style={{
          position: "absolute", top: "50%", right: "100%",
          height: 2, background: "linear-gradient(90deg,transparent,rgba(0,200,255,0.5))",
          animation: techCardVisible ? "ri_armExtend 0.5s ease forwards" : "none",
          transformOrigin: "right center",
          width: "clamp(20px,5vw,60px)",
        }} />
      </div>

      {/* Institute Division Card */}
      <div style={{
        position: "absolute",
        bottom: isMobile ? (instCardVisible ? "3%" : "-200px") : "24%",
        left: isMobile
          ? (instCardVisible ? "4px" : "-100vw")
          : (instCardVisible ? "clamp(24px,12vw,180px)" : "-340px"),
        transitionProperty: "left, bottom, opacity, filter",
        transitionDuration: "0.7s, 0.7s, 0.5s, 0.3s",
        transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1), cubic-bezier(0.34,1.56,0.64,1), ease, ease",
        opacity: (phase === "crystallize" || phase === "fadeOut") ? 0 : (instCardVisible ? 1 : 0),
        zIndex: 11,
        filter: isCrystal ? "brightness(1.5) saturate(3) hue-rotate(240deg)" : "none",
      }}>
        <div style={{
          width: isMobile ? "calc(46vw - 8px)" : "clamp(160px,22vw,260px)",
          background: "rgba(15,8,30,0.95)",
          border: "1.5px solid rgba(160,100,255,0.55)",
          borderRadius: 16,
          padding: "clamp(10px,2vw,18px)",
          boxShadow: "0 0 40px rgba(160,100,255,0.35), inset 0 0 30px rgba(160,100,255,0.05)",
          backdropFilter: "blur(12px)",
          animation: instCardVisible ? "ri_cardFloat 3.2s ease-in-out 0.4s infinite" : "none",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(160,100,255,0.15)", border: "1px solid rgba(160,100,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🎓</div>
            <div>
              <div style={{ fontSize: "clamp(6px,0.9vw,9px)", color: "rgba(160,100,255,0.6)", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace" }}>Division 02</div>
              <div style={{ fontSize: "clamp(9px,1.4vw,13px)", color: "#fff", fontWeight: 900, lineHeight: 1.2 }}>Astralearnia Institute</div>
            </div>
          </div>
          <p style={{ fontSize: "clamp(8px,1.1vw,11px)", color: "rgba(160,100,255,0.7)", fontWeight: 700, marginBottom: 8, fontFamily: "monospace", letterSpacing: "0.04em" }}>Learn. Adapt. Evolve.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {["AI Certs","Adaptive","Corporate","Analytics"].map(f => (
              <span key={f} style={{ padding: "2px 7px", borderRadius: 10, fontSize: "clamp(6px,0.8vw,9px)", fontWeight: 800, background: "rgba(160,100,255,0.1)", border: "1px solid rgba(160,100,255,0.25)", color: "rgba(160,100,255,0.8)" }}>{f}</span>
            ))}
          </div>
          <div style={{ marginTop: 8, height: 2, borderRadius: 1, background: "linear-gradient(90deg,transparent,rgba(160,100,255,0.5))", opacity: 0.6 }} />
        </div>
        <div style={{
          position: "absolute", top: "50%", left: "100%",
          height: 2, background: "linear-gradient(90deg,rgba(160,100,255,0.5),transparent)",
          animation: instCardVisible ? "ri_armExtend 0.5s ease forwards" : "none",
          transformOrigin: "left center",
          width: "clamp(20px,5vw,60px)",
        }} />
      </div>

      {/* Robot */}
      <div style={{
        position: "absolute",
        bottom: "24%",
        width: "clamp(70px,11vw,130px)",
        zIndex: 12,
        transform: robotX[phase],
        transition: robotTransition[phase],
        opacity: phase === "fadeOut" ? 0 : 1,
        filter: isCrystal
          ? "hue-rotate(200deg) saturate(4) brightness(1.8) drop-shadow(0 0 20px rgba(100,200,255,0.9))"
          : "drop-shadow(0 0 12px rgba(0,200,255,0.6))",
      }}>
        {phase === "showcase" && (
          <div style={{
            position: "absolute", inset: -20, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,200,255,0.2) 0%, transparent 70%)",
            animation: "ri_showcaseGlow 1.5s ease-in-out infinite",
          }} />
        )}
        <svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
          <line x1="50" y1="12" x2="50" y2="2" stroke="#00c8ff" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="50" cy="0" r="5" fill="#ff00ff"><animate attributeName="fill" values="#ff00ff;#00ffff;#ff00ff" dur="0.8s" repeatCount="indefinite"/></circle>
          <rect x="22" y="12" width="56" height="44" rx="10" fill="#0d2a3a" stroke="#00c8ff" strokeWidth="2"/>
          <rect x="24" y="14" width="52" height="40" rx="9" fill="url(#ri_hg)"/>
          <rect x="28" y="18" width="44" height="32" rx="5" fill="#041018" stroke="rgba(0,200,255,0.3)" strokeWidth="1"/>
          <circle cx="40" cy="32" r="7" fill="#000918" stroke="#00c8ff" strokeWidth="1.5"/>
          <circle cx="60" cy="32" r="7" fill="#000918" stroke="#00c8ff" strokeWidth="1.5"/>
          <circle cx="40" cy="32" r="4" fill="#00c8ff"><animate attributeName="r" values="4;5;4" dur="1.2s" repeatCount="indefinite"/><animate attributeName="fill" values="#00c8ff;#ffffff;#00c8ff" dur="1.2s" repeatCount="indefinite"/></circle>
          <circle cx="60" cy="32" r="4" fill="#00c8ff"><animate attributeName="r" values="4;5;4" dur="1.2s" begin="0.6s" repeatCount="indefinite"/><animate attributeName="fill" values="#00c8ff;#ffffff;#00c8ff" dur="1.2s" begin="0.6s" repeatCount="indefinite"/></circle>
          <circle cx="41" cy="31" r="1.5" fill="#001a2e"/><circle cx="61" cy="31" r="1.5" fill="#001a2e"/>
          <rect x="35" y="42" width="30" height="5" rx="2.5" fill="#041018" stroke="rgba(0,200,255,0.4)" strokeWidth="1"/>
          {[0,6,12,18,24].map(x => <line key={x} x1={37+x} y1="43" x2={37+x} y2="46" stroke="rgba(0,200,255,0.5)" strokeWidth="1"/>)}
          <rect x="40" y="56" width="20" height="8" rx="3" fill="#0a1f2e"/>
          <rect x="15" y="64" width="70" height="48" rx="8" fill="#0d2a3a" stroke="#00c8ff" strokeWidth="1.5"/>
          <rect x="17" y="66" width="66" height="44" rx="7" fill="url(#ri_bg)"/>
          <rect x="28" y="72" width="44" height="28" rx="5" fill="#041018" stroke="rgba(0,200,255,0.25)" strokeWidth="1"/>
          <circle cx="38" cy="82" r="5" fill="#00ff88"><animate attributeName="fill" values="#00ff88;#00ffcc;#00ff88" dur="2s" repeatCount="indefinite"/></circle>
          <circle cx="50" cy="82" r="5" fill="#ffaa00"><animate attributeName="fill" values="#ffaa00;#ffdd00;#ffaa00" dur="1.5s" begin="0.3s" repeatCount="indefinite"/></circle>
          <circle cx="62" cy="82" r="5" fill="#ff4444"><animate attributeName="fill" values="#ff4444;#ff8888;#ff4444" dur="1s" begin="0.6s" repeatCount="indefinite"/></circle>
          <rect x="30" y="93" width="40" height="4" rx="2" fill="#020c14"/>
          <rect x="30" y="93" rx="2" height="4" fill="url(#ri_pg)"><animate attributeName="width" values="0;40;20;40" dur="2s" repeatCount="indefinite"/></rect>
          <rect x="2" y="66" width="12" height="36" rx="6" fill="#0a1f2e" stroke="#00c8ff" strokeWidth="1">
            {(phase === "reachLeft" || phase === "cardLeft" || phase === "showcase") && (
              <animateTransform attributeName="transform" type="rotate" values="0 8 66;-40 8 66;-40 8 66" dur="0.4s" fill="freeze"/>
            )}
          </rect>
          <rect x="86" y="66" width="12" height="36" rx="6" fill="#0a1f2e" stroke="#00c8ff" strokeWidth="1">
            {(phase === "reachRight" || phase === "cardRight" || phase === "reachLeft" || phase === "cardLeft" || phase === "showcase") && (
              <animateTransform attributeName="transform" type="rotate" values="0 92 66;40 92 66;40 92 66" dur="0.4s" fill="freeze"/>
            )}
          </rect>
          <rect x="24" y="112" width="18" height="18" rx="5" fill="#0a1f2e" stroke="#00c8ff" strokeWidth="1">
            <animateTransform attributeName="transform" type="rotate" values="0 33 112;5 33 112;-5 33 112;0 33 112" dur="0.5s" repeatCount="indefinite"/>
          </rect>
          <rect x="58" y="112" width="18" height="18" rx="5" fill="#0a1f2e" stroke="#00c8ff" strokeWidth="1">
            <animateTransform attributeName="transform" type="rotate" values="0 67 112;-5 67 112;5 67 112;0 67 112" dur="0.5s" repeatCount="indefinite"/>
          </rect>
          <defs>
            <linearGradient id="ri_hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a4a6a"/><stop offset="100%" stopColor="#0d2a3a"/></linearGradient>
            <linearGradient id="ri_bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a3a50"/><stop offset="100%" stopColor="#0a1f2e"/></linearGradient>
            <linearGradient id="ri_pg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#00c8ff"/><stop offset="100%" stopColor="#8040ff"/></linearGradient>
          </defs>
        </svg>

        {(phase === "center" || phase === "reachRight") && (
          <div style={{
            position: "absolute", top: -50, left: "50%", transform: "translateX(-50%)",
            background: "rgba(0,20,40,0.95)", border: "1px solid rgba(0,200,255,0.5)",
            borderRadius: 8, padding: "6px 12px", whiteSpace: "nowrap",
            fontSize: 10, fontFamily: "monospace", color: "#00c8ff",
            animation: "ri_fadeInUp 0.3s ease",
          }}>
            {phase === "center" ? "Loading both divisions..." : "Pulling Technology →"}
          </div>
        )}
        {phase === "reachLeft" && (
          <div style={{
            position: "absolute", top: -50, left: "50%", transform: "translateX(-50%)",
            background: "rgba(0,20,40,0.95)", border: "1px solid rgba(160,100,255,0.5)",
            borderRadius: 8, padding: "6px 12px", whiteSpace: "nowrap",
            fontSize: 10, fontFamily: "monospace", color: "#a08aff",
            animation: "ri_fadeInUp 0.3s ease",
          }}>
            ← Pulling Institute
          </div>
        )}
        {phase === "showcase" && (
          <div style={{
            position: "absolute", top: -55, left: "50%", transform: "translateX(-50%)",
            background: "rgba(0,20,40,0.95)", border: "1px solid rgba(0,255,180,0.5)",
            borderRadius: 8, padding: "6px 14px", whiteSpace: "nowrap",
            fontSize: 10, fontFamily: "monospace", color: "#00ffb8",
            animation: "ri_fadeInUp 0.3s ease",
          }}>
            ✦ Astralearnia is ready!
          </div>
        )}
      </div>

      {/* Crystal shards */}
      {showShards && CRYSTAL_SHARDS.map((s, i) => (
        <div key={i} style={{
          position: "absolute",
          bottom: "calc(24% + 60px)",
          left: "50%",
          width: s.size,
          height: s.size,
          background: s.color,
          clipPath: s.clip,
          opacity: 0,
          zIndex: 13,
          animation: `ri_shardBurst ${0.3 + i * 0.03}s cubic-bezier(0.25,0.46,0.45,0.94) both`,
          ["--tx" as string]: `${s.tx}px`,
          ["--ty" as string]: `${s.ty}px`,
          ["--r" as string]: `${s.r}deg`,
          boxShadow: `0 0 8px ${s.color}`,
        } as CSSProperties} />
      ))}

      <button onClick={onComplete} style={{
        position: "absolute", bottom: 24, right: 24, zIndex: 20,
        background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)",
        color: "rgba(255,255,255,0.5)", padding: "6px 14px", borderRadius: 6,
        fontSize: 11, fontFamily: "monospace", fontWeight: 700, cursor: "pointer",
        letterSpacing: "0.12em",
      }}>SKIP ›</button>

      <style>{`
        @keyframes twinkle { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes ri_fadeInDown { from{opacity:0;transform:translate(-50%,-20px)} to{opacity:1;transform:translate(-50%,0)} }
        @keyframes ri_fadeInUp { from{opacity:0;transform:translate(-50%,10px)} to{opacity:1;transform:translate(-50%,0)} }
        @keyframes ri_loadBar { from{width:0%} to{width:100%} }
        @keyframes ri_cardFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes ri_showcaseGlow { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
        @keyframes ri_armExtend { from{width:0;opacity:0} to{opacity:1} }
        @keyframes ri_shardBurst {
          0%   { opacity:0.9; transform:translateX(-50%) translateY(0) rotate(0deg) scale(1); }
          100% { opacity:0; transform:translateX(calc(-50% + var(--tx))) translateY(var(--ty)) rotate(var(--r)) scale(0.1); }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED LINE
// ═══════════════════════════════════════════════════════════════════════════════
function AnimatedLine({
  text, anim, highlight = "", accent = "#22d3ee", visible,
}: {
  text: string; anim: AnimType; highlight?: string; accent?: string; visible: boolean;
}) {
  const words = text.split(" ");
  const isHL = (word: string, wi: number): boolean => {
    if (!highlight) return false;
    const hw = highlight.trim().split(" ");
    const tw = text.trim().split(" ");
    return hw.includes(word) && wi >= tw.length - hw.length;
  };

  if (anim === "gravity") {
    const letters = text.split("");
    const hlStart = highlight ? text.indexOf(highlight) : -1;
    return (
      <span style={{ display: "inline-block" }} aria-label={text}>
        {letters.map((c, i) => (
          <span key={i} style={{
            display: "inline-block", whiteSpace: c === " " ? "pre" : "normal",
            animation: visible ? `gravityFall 0.7s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.038}s both` : "none",
            color: c !== " " && hlStart >= 0 && i >= hlStart ? accent : undefined,
          }}>{c}</span>
        ))}
      </span>
    );
  }
  if (anim === "extrude") {
    return (
      <span style={{ display: "inline-block", perspective: "600px" }} aria-label={text}>
        {words.map((w, wi) => (
          <span key={wi} style={{
            display: "inline-block", marginRight: "0.28em",
            animation: visible ? `extrudeReveal 0.85s cubic-bezier(0.23,1,0.32,1) ${wi * 0.12}s both` : "none",
            transformStyle: "preserve-3d",
            color: isHL(w, wi) ? accent : undefined,
          }}>{w}</span>
        ))}
      </span>
    );
  }
  if (anim === "glitch") {
    return (
      <span style={{ display: "inline-block" }} aria-label={text}>
        {words.map((w, wi) => (
          <span key={wi} style={{ display: "inline-block", marginRight: "0.28em", position: "relative" }}>
            <span aria-hidden style={{ position: "absolute", top: 0, left: 0, color: "#ff4444", animation: visible ? `glitchR 0.55s ease ${wi * 0.09}s both` : "none", opacity: 0.75, clipPath: "polygon(0 0,100% 0,100% 45%,0 45%)", pointerEvents: "none" }}>{w}</span>
            <span aria-hidden style={{ position: "absolute", top: 0, left: 0, color: "#00ffff", animation: visible ? `glitchC 0.55s ease ${wi * 0.09}s both` : "none", opacity: 0.75, clipPath: "polygon(0 55%,100% 55%,100% 100%,0 100%)", pointerEvents: "none" }}>{w}</span>
            <span style={{ display: "inline-block", animation: visible ? `glitchShake 0.55s ease ${wi * 0.09}s both` : "none", color: isHL(w, wi) ? accent : undefined }}>{w}</span>
          </span>
        ))}
      </span>
    );
  }
  if (anim === "kinetic") {
    return (
      <span style={{ display: "inline-block" }} aria-label={text}>
        {words.map((w, wi) => (
          <span key={wi} style={{
            display: "inline-block", marginRight: "0.28em",
            animation: visible ? `kineticZoom 0.45s cubic-bezier(0.175,0.885,0.32,1.275) ${wi * 0.07}s both` : "none",
            color: isHL(w, wi) ? accent : wi % 3 === 1 ? "rgba(255,255,255,0.75)" : undefined,
          }}>{w}</span>
        ))}
      </span>
    );
  }
  return (
    <span style={{
      display: "inline-block",
      animation: visible ? "maskedReveal 1.1s cubic-bezier(0.25,0.46,0.45,0.94) both" : "none",
    }} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} style={{ display: "inline-block", marginRight: "0.28em", color: isHL(w, wi) ? accent : undefined }}>{w}</span>
      ))}
    </span>
  );
}

function AnimatedHeading({ message, visible }: { message: AnimMessage; visible: boolean }) {
  return <AnimatedLine text={message.text} anim={message.anim} highlight={message.highlight} accent={message.accent} visible={visible} />;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLING HERO HEADLINE
// ═══════════════════════════════════════════════════════════════════════════════
function CyclingHeroHeadline() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const rotation = HERO_ROTATIONS[idx];

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(p => (p + 1) % HERO_ROTATIONS.length); setVisible(true); }, 600);
    }, 5800);
    return () => clearInterval(t);
  }, []);

  return (
    <h1 style={{
      fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.04em",
      fontSize: "clamp(2rem,7.5vw,5.8rem)", marginBottom: "clamp(14px,2vw,24px)",
      minHeight: "clamp(100px,18vw,240px)",
      display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      <span style={{
        display: "block", color: "#fff",
        opacity: visible ? 1 : 0, transition: "opacity 0.4s ease",
        animation: visible ? "heroLine1 0.55s ease both" : "none",
      }}>
        {rotation.line1}
      </span>
      <span style={{
        display: "block",
        backgroundImage: `linear-gradient(135deg,${rotation.accent},#a78bfa,${rotation.accent})`,
        backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        filter: `drop-shadow(0 0 40px ${rotation.accent}60)`,
        transition: "filter 0.5s ease",
      }}>
        <AnimatedLine
          text={rotation.line2}
          anim={rotation.anim}
          highlight={rotation.highlight}
          accent={rotation.accent}
          visible={visible}
        />
      </span>
    </h1>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLING SECTION HEADING
// ═══════════════════════════════════════════════════════════════════════════════
function CyclingSectionHeading({ className }: { className?: string }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const r = DIVISION_ROTATIONS[idx];

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(p => (p + 1) % DIVISION_ROTATIONS.length); setVisible(true); }, 500);
    }, 5200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={className} style={{
      fontSize: "clamp(1.6rem,5vw,4.5rem)",
      fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em",
      minHeight: "clamp(60px,12vw,140px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{
        backgroundImage: `linear-gradient(135deg,${r.accent},#a78bfa)`,
        backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        opacity: visible ? 1 : 0, transition: "opacity 0.35s ease",
      }}>
        <AnimatedLine text={r.line} anim={r.anim} accent={r.accent} visible={visible} />
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEXT + MEDIA SLIDER SECTION
// ═══════════════════════════════════════════════════════════════════════════════
function TextAnimSliderSection() {
  const [idx, setIdx] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const waveBars = Array.from({ length: 18 }, (_, wi) => 30 + Math.sin(wi * 0.8) * 55 + 15);
  const total = ANIM_MESSAGES.length;
  const { ref, visible: sectionVisible } = useSectionVisible();

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(p => (p + 1) % total); setVisible(true); }, 500);
    }, 5000);
    return () => clearInterval(t);
  }, [total]);

  const goTo = (i: number) => {
    setVisible(false);
    setTimeout(() => { setIdx(i); setVisible(true); }, 300);
  };

  const msg = ANIM_MESSAGES[idx];
  const mediaStyles: Record<string, { ring: string; glow: string }> = {
    "#22d3ee": { ring: "rgba(0,200,255,0.35)",   glow: "rgba(0,200,255,0.12)" },
    "#a78bfa": { ring: "rgba(167,139,250,0.35)", glow: "rgba(167,139,250,0.12)" },
    "#e879f9": { ring: "rgba(232,121,249,0.35)", glow: "rgba(232,121,249,0.12)" },
    "#34d399": { ring: "rgba(52,211,153,0.35)",  glow: "rgba(52,211,153,0.12)" },
  };
  const ms = mediaStyles[msg.mediaAccent] ?? mediaStyles["#22d3ee"];

  return (
    <section ref={ref as React.RefCallback<HTMLElement>} style={{
      position: "relative", background: "#030609",
      padding: "clamp(32px,5vw,72px) 0", overflow: "hidden",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${ms.glow}, transparent)`,
        transition: "background 0.8s ease",
      }} />
      <div style={{ margin: "0 auto", width: "100%", maxWidth: 1280, padding: "0 clamp(16px,4vw,48px)", position: "relative", zIndex: 1 }}>

        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: "clamp(24px,4vw,48px)" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 99,
            border: `1px solid ${msg.accent}40`, background: `${msg.accent}08`,
            fontSize: "clamp(9px,1.1vw,11px)", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#fff",
            opacity: sectionVisible ? 1 : 0,
            animation: sectionVisible ? "sectionHeaderReveal 0.6s ease both" : "none",
            transition: "border-color 0.5s ease, background 0.5s ease",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: msg.accent, boxShadow: `0 0 10px ${msg.accent}`, animation: "dotPulse 1.4s ease-in-out infinite", flexShrink: 0 }} />
            ◈ {msg.eyebrow}
          </div>
          <div style={{
            padding: "4px 10px", borderRadius: 6, border: `1px solid ${msg.accent}35`, background: `${msg.accent}10`,
            fontSize: "clamp(8px,1vw,10px)", fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase" as const,
            color: msg.accent, fontFamily: "monospace", transition: "all 0.4s ease",
            opacity: sectionVisible ? 1 : 0,
            animation: sectionVisible ? "sectionHeaderReveal 0.6s ease 0.1s both" : "none",
          }}>
            ◈ {ANIM_LABEL[msg.anim]}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(28px,5vw,64px)", alignItems: "center" }}
          className="[grid-template-columns:1fr] lg:![grid-template-columns:1fr_1fr]">
          <div>
            <div key={`tag-${idx}`} style={{
              display: "inline-block", marginBottom: 14, padding: "3px 10px", borderRadius: 5,
              fontSize: "clamp(8px,1vw,10px)", fontWeight: 900, letterSpacing: "0.22em", textTransform: "uppercase" as const,
              background: `${msg.accent}15`, border: `1px solid ${msg.accent}30`, color: msg.accent, fontFamily: "monospace",
              animation: visible ? "fadeSlideIn 0.4s ease both" : "none",
            }}>{msg.tag}</div>

            <h2 style={{
              fontSize: "clamp(2rem,6.5vw,5.5rem)", fontWeight: 900, lineHeight: 1.03, letterSpacing: "-0.04em",
              color: "#fff", margin: "0 0 clamp(14px,2vw,22px) 0",
              minHeight: "clamp(70px,10vw,130px)", display: "flex", alignItems: "center",
              opacity: visible ? 1 : 0, transition: "opacity 0.3s ease",
            }}>
              <AnimatedHeading message={msg} visible={visible} />
            </h2>

            <p key={`sub-${idx}`} style={{
              fontSize: "clamp(0.88rem,1.6vw,1.2rem)", color: "rgba(203,213,225,0.92)", fontWeight: 600, lineHeight: 1.7, maxWidth: "36rem",
              margin: "0 0 clamp(12px,2vw,20px) 0",
              animation: visible ? "fadeSlideIn 0.5s ease 0.2s both" : "none",
              opacity: visible ? 1 : 0, transition: "opacity 0.4s ease 0.25s",
            }}>{msg.sub}</p>

            <p key={`det-${idx}`} style={{
              fontSize: "clamp(0.75rem,1.2vw,0.92rem)", color: "rgba(100,116,139,0.9)", fontWeight: 600, lineHeight: 1.65, maxWidth: "32rem",
              margin: "0 0 clamp(24px,3vw,36px) 0",
              borderLeft: `2px solid ${msg.accent}50`, paddingLeft: 14,
              animation: visible ? "fadeSlideIn 0.55s ease 0.38s both" : "none",
              opacity: visible ? 1 : 0, transition: "opacity 0.4s ease 0.38s",
            }}>{msg.detail}</p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/book-demo" className={btnCyan}>Experience It Live →</Link>
              <Link href="/solutions" className={btnGhost}>Explore Solutions</Link>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "clamp(24px,3vw,36px)", flexWrap: "wrap" }}>
              {ANIM_MESSAGES.map((m, i) => (
                <button key={i} onClick={() => goTo(i)} title={m.eyebrow} style={{
                  width: i === idx ? 32 : 9, height: 9, borderRadius: 5, border: "none", cursor: "pointer", padding: 0,
                  background: i === idx ? `linear-gradient(90deg,${msg.accent},#a78bfa)` : "rgba(255,255,255,0.14)",
                  transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  boxShadow: i === idx ? `0 0 12px ${msg.accent}80` : "none",
                }} />
              ))}
              <span style={{ marginLeft: 4, fontSize: 11, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(100,116,139,0.7)" }}>
                {String(idx + 1).padStart(2,"0")}&nbsp;/&nbsp;{String(total).padStart(2,"0")}
              </span>
            </div>
          </div>

          <div key={`media-${idx}`} style={{
            position: "relative", borderRadius: 22, border: `1px solid ${ms.ring}`,
            background: "linear-gradient(145deg,#0d1622,#080c14)", overflow: "hidden", aspectRatio: "16/10",
            boxShadow: `0 0 70px ${ms.glow}, 0 0 140px ${ms.glow.replace("0.12","0.05")}`,
            transition: "border-color 0.6s ease, box-shadow 0.6s ease",
            animation: "mediaFadeIn 0.6s cubic-bezier(0.25,0.46,0.45,0.94) both",
          }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${msg.mediaAccent}10 1px,transparent 1px),linear-gradient(90deg,${msg.mediaAccent}10 1px,transparent 1px)`, backgroundSize: "44px 44px" }} />
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 65% 65% at 50% 50%, ${ms.glow}, transparent)` }} />
            {([{t:0,l:0,w:28,h:2},{t:0,l:0,w:2,h:28},{t:0,r:0,w:28,h:2},{t:0,r:0,w:2,h:28},{b:0,l:0,w:28,h:2},{b:0,l:0,w:2,h:28},{b:0,r:0,w:28,h:2},{b:0,r:0,w:2,h:28}] as Array<Record<string,number>>).map((c, ci) => (
              <div key={ci} style={{ position: "absolute", background: msg.mediaAccent, opacity: 0.65, top: c.t, left: c.l, right: c.r, bottom: c.b, width: c.w, height: c.h }} />
            ))}
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "clamp(10px,2vw,18px)", padding: 28, textAlign: "center" }}>
              <div style={{ width: "clamp(56px,7vw,80px)", height: "clamp(56px,7vw,80px)", borderRadius: "50%", background: `${msg.mediaAccent}14`, border: `2px solid ${msg.mediaAccent}60`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 30px ${msg.mediaAccent}35`, fontSize: "clamp(22px,3.5vw,36px)", animation: "iconPulse 2.2s ease-in-out infinite" }}>{msg.mediaEmoji}</div>
              <div>
                <div style={{ fontSize: "clamp(0.72rem,1.4vw,1rem)", fontWeight: 900, color: "#fff", letterSpacing: "0.04em", marginBottom: 5 }}>{msg.mediaLabel}</div>
                <div style={{ fontSize: "clamp(0.58rem,0.9vw,0.75rem)", fontWeight: 700, color: "rgba(148,163,184,0.55)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace" }}>Video · Image Placeholder</div>
              </div>
              <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 28 }}>
                {waveBars.map((h, wi) => (
                  <div key={wi} style={{
                    width: "clamp(3px,0.4vw,4px)", borderRadius: 2, background: msg.mediaAccent, opacity: 0.45, height: `${h}%`,
                    animation: `waveBar ${0.4 + (wi % 5) * 0.12}s ${wi * 0.06}s ease-in-out infinite alternate`,
                  }} />
                ))}
              </div>
            </div>
            <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)", border: `1px solid ${msg.mediaAccent}40`, borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 900, color: msg.mediaAccent, fontFamily: "monospace", letterSpacing: "0.12em" }}>◉ LIVE DEMO</div>
            <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 900, color: "rgba(255,255,255,0.5)", fontFamily: "monospace", letterSpacing: "0.1em" }}>{String(idx+1).padStart(2,"0")} · {msg.tag}</div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.06)" }}>
              <div style={{ height: "100%", background: `linear-gradient(90deg,${msg.mediaAccent},#a78bfa)`, animation: "progressSweep 5s linear infinite", transformOrigin: "left center" }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gravityFall { 0%{transform:translateY(-90px) rotate(-25deg) scale(0.6);opacity:0} 55%{transform:translateY(10px) rotate(6deg) scale(1.05);opacity:1} 75%{transform:translateY(-5px) rotate(-3deg) scale(0.98)} 90%{transform:translateY(3px) rotate(1deg)} 100%{transform:translateY(0) rotate(0deg) scale(1);opacity:1} }
        @keyframes extrudeReveal { 0%{transform:perspective(500px) rotateY(-90deg) translateZ(40px);opacity:0} 65%{transform:perspective(500px) rotateY(8deg) translateZ(4px);opacity:1} 100%{transform:perspective(500px) rotateY(0deg) translateZ(0);opacity:1} }
        @keyframes glitchShake { 0%{transform:translateX(-8px) skewX(-5deg);opacity:0} 18%{transform:translateX(6px) skewX(5deg);opacity:1} 36%{transform:translateX(-4px) skewX(-3deg)} 54%{transform:translateX(4px) skewX(2deg)} 72%{transform:translateX(-2px) skewX(-1deg)} 100%{transform:translateX(0) skewX(0deg);opacity:1} }
        @keyframes glitchR { 0%{transform:translate(-5px,-3px);opacity:0.8} 25%{transform:translate(4px,2px);opacity:0} 50%{transform:translate(-3px,-1px);opacity:0.6} 75%{transform:translate(2px,1px);opacity:0} 100%{transform:translate(0,0);opacity:0} }
        @keyframes glitchC { 0%{transform:translate(5px,3px);opacity:0.8} 25%{transform:translate(-4px,-2px);opacity:0} 50%{transform:translate(3px,1px);opacity:0.6} 75%{transform:translate(-2px,-1px);opacity:0} 100%{transform:translate(0,0);opacity:0} }
        @keyframes kineticZoom { 0%{transform:scale(0) rotate(-200deg);opacity:0} 55%{transform:scale(1.18) rotate(6deg);opacity:1} 78%{transform:scale(0.94) rotate(-2deg)} 100%{transform:scale(1) rotate(0deg);opacity:1} }
        @keyframes maskedReveal { 0%{clip-path:circle(0% at 50% 50%);opacity:0} 20%{opacity:1} 100%{clip-path:circle(160% at 50% 50%);opacity:1} }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mediaFadeIn { from{opacity:0;transform:scale(0.96) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes dotPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:0.7} }
        @keyframes iconPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.07)} }
        @keyframes waveBar { from{transform:scaleY(0.25)} to{transform:scaleY(1)} }
        @keyframes progressSweep { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes heroLine1 { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sectionHeaderReveal { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SOLUTIONS CAROUSEL
// ═══════════════════════════════════════════════════════════════════════════════
function SolutionsCarousel() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const total = SOLUTIONS_SLIDES.length;
  const touchStart = useRef<number | null>(null);
  const { ref, visible } = useSectionVisible();

  const go = useCallback((idx: number) => { setAnimKey(k => k + 1); setCurrent(idx); }, []);
  const prev = () => go((current - 1 + total) % total);
  const next = () => go((current + 1) % total);
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart.current === null) return;
    const d = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(d) > 50) d > 0 ? next() : prev();
    touchStart.current = null;
  };

  const slide = SOLUTIONS_SLIDES[current];
  const colorCfg: Record<SlideColor, { primary: string; glow: string; border: string; bg1: string; bg2: string }> = {
    cyan:    { primary: "#22d3ee", glow: "rgba(0,200,255,0.35)",   border: "rgba(0,200,255,0.35)",   bg1: "#0e2a35", bg2: "#091522" },
    blue:    { primary: "#60a5fa", glow: "rgba(60,120,255,0.35)",  border: "rgba(60,120,255,0.35)",  bg1: "#0c1a30", bg2: "#060d1a" },
    emerald: { primary: "#34d399", glow: "rgba(52,211,153,0.35)",  border: "rgba(52,211,153,0.35)",  bg1: "#081e12", bg2: "#040e09" },
    red:     { primary: "#f87171", glow: "rgba(248,113,113,0.35)", border: "rgba(248,113,113,0.35)", bg1: "#200a0a", bg2: "#100404" },
    violet:  { primary: "#a78bfa", glow: "rgba(167,139,250,0.35)", border: "rgba(167,139,250,0.35)", bg1: "#130a20", bg2: "#08040f" },
    fuchsia: { primary: "#e879f9", glow: "rgba(232,121,249,0.35)", border: "rgba(232,121,249,0.35)", bg1: "#1a0820", bg2: "#0c040f" },
  };
  const cc = colorCfg[slide.color];

  return (
    <section ref={ref as React.RefCallback<HTMLElement>} className="relative bg-[#050810] py-8 sm:py-14 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${cc.glow.replace("0.35","0.07")}, transparent)`, transition: "background 0.8s ease" }} />
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 sm:mb-10">
          <div>
            <div className={`${pill} mb-3 sm:mb-5`} style={{ opacity: visible ? 1 : 0, animation: visible ? "sectionHeaderReveal 0.6s ease both" : "none" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: cc.primary }} />
              Technology Division — Solutions
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight" style={{ opacity: visible ? 1 : 0, animation: visible ? "sectionHeaderReveal 0.7s ease 0.1s both" : "none" }}>
              What We{" "}
              <span style={{ background: `linear-gradient(135deg,${cc.primary},#a78bfa)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", transition: "all 0.5s ease" }}>
                Build & Deploy
              </span>
            </h2>
          </div>
          <Link href="/solutions" className={`${btnGhost} w-full sm:w-auto shrink-0`}>All Solutions →</Link>
        </div>

        <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{ borderRadius: 24, border: `1px solid ${cc.border}`, background: `linear-gradient(135deg,${cc.bg1},${cc.bg2})`, boxShadow: `0 0 80px ${cc.glow},0 0 160px ${cc.glow.replace("0.35","0.1")}`, overflow: "hidden", transition: "border-color 0.6s ease,box-shadow 0.6s ease,background 0.6s ease" }}>
          <div style={{ height: 3, background: `linear-gradient(90deg,transparent 0%,${cc.primary} 30%,${cc.primary} 70%,transparent 100%)`, opacity: 0.8 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }} className="lg:![grid-template-columns:1fr_1fr]">
            <div style={{ padding: "clamp(20px,4vw,56px)" }}>
              <div key={`c-${animKey}`} style={{ animation: "slideInContent 0.5s cubic-bezier(0.25,0.46,0.45,0.94) both" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 8, marginBottom: 16, fontSize: "clamp(9px,1.2vw,12px)", fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase" as const, border: `1px solid ${cc.primary}30`, background: `${cc.primary}10`, color: cc.primary }}>
                  <span style={{ fontSize: "1.2em" }}>{slide.icon}</span>{slide.category}
                </div>
                <h3 style={{ fontSize: "clamp(1.4rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff", marginBottom: 6 }}>{slide.title}</h3>
                <p style={{ fontSize: "clamp(0.65rem,1.2vw,0.88rem)", fontWeight: 700, color: cc.primary, letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 16, fontFamily: "monospace" }}>{slide.subtitle}</p>
                <p style={{ fontSize: "clamp(0.78rem,1.4vw,1.05rem)", color: "rgba(203,213,225,0.9)", lineHeight: 1.7, fontWeight: 600, marginBottom: 24, maxWidth: "36rem" }}>{slide.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 28 }}>
                  {slide.features.map(f => (
                    <span key={f} style={{ padding: "4px 11px", borderRadius: 20, fontSize: "clamp(8px,1vw,11px)", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" as const, border: `1px solid ${cc.primary}25`, background: `${cc.primary}08`, color: "rgba(203,213,225,0.85)", display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cc.primary, display: "inline-block", flexShrink: 0 }} />{f}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Link href="/book-demo" className={btnCyan}>Get a Demo →</Link>
                  <Link href="/contact" className={btnGhost}>Get a Quote</Link>
                </div>
              </div>
            </div>
            <div style={{ position: "relative", overflow: "hidden", minHeight: "clamp(180px,32vw,480px)", borderLeft: `1px solid ${cc.primary}15` }}>
              <div key={`m-${animKey}`} style={{ position: "absolute", inset: 0, animation: "slideInMedia 0.6s cubic-bezier(0.25,0.46,0.45,0.94) both" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${cc.primary}12 1px,transparent 1px),linear-gradient(90deg,${cc.primary}12 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 70% at 50% 50%,${cc.glow.replace("0.35","0.12")},transparent)` }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                  <div style={{ fontSize: "clamp(3rem,8vw,7rem)", filter: `drop-shadow(0 0 30px ${cc.primary})`, animation: "iconFloat 3s ease-in-out infinite" }}>{slide.icon}</div>
                  <div style={{ fontSize: "clamp(0.6rem,1.2vw,0.85rem)", fontWeight: 900, color: "rgba(255,255,255,0.25)", letterSpacing: "0.25em", textTransform: "uppercase" as const, fontFamily: "monospace", textAlign: "center", padding: "0 24px" }}>
                    Image / Video Placeholder<br /><span style={{ color: cc.primary, opacity: 0.6 }}>{slide.category}</span>
                  </div>
                  <div style={{ position: "absolute", width: "60%", paddingBottom: "60%", borderRadius: "50%", border: `1px solid ${cc.primary}20`, animation: "orbitSpin 8s linear infinite" }}>
                    <div style={{ position: "absolute", top: -5, left: "50%", width: 10, height: 10, borderRadius: "50%", background: cc.primary, boxShadow: `0 0 15px ${cc.primary}`, transform: "translateX(-50%)" }} />
                  </div>
                </div>
                <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: `1px solid ${cc.primary}30`, borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 900, color: cc.primary, fontFamily: "monospace", letterSpacing: "0.1em" }}>◈ {slide.category.toUpperCase()}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <button onClick={prev} style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}>‹</button>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {SOLUTIONS_SLIDES.map((_, i) => (
              <button key={i} onClick={() => go(i)} style={{ width: i === current ? 28 : 9, height: 9, borderRadius: 5, border: "none", cursor: "pointer", background: i === current ? `linear-gradient(90deg,${cc.primary},#a78bfa)` : "rgba(255,255,255,0.15)", transition: "all 0.3s ease", padding: 0 }} />
            ))}
          </div>
          <button onClick={next} style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}>›</button>
        </div>
        <div style={{ textAlign: "center", marginTop: 14, fontFamily: "monospace", fontSize: 11, color: "rgba(100,120,140,0.7)", fontWeight: 700, letterSpacing: "0.2em" }}>
          {String(current+1).padStart(2,"0")} / {String(total).padStart(2,"0")} — {slide.category}
        </div>
      </div>
      <style>{`
        @keyframes slideInContent { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInMedia   { from{opacity:0;transform:scale(0.95)}       to{opacity:1;transform:scale(1)} }
        @keyframes iconFloat      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes orbitSpin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT SECTION
// ═══════════════════════════════════════════════════════════════════════════════
function ContactSection() {
  const { ref, visible } = useSectionVisible();
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", company: "", division: "", subject: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const validate = (): boolean => {
    const e: Partial<ContactForm> = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 2200);
  };

  const update = (k: keyof ContactForm, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }));
  };

  const inputStyle = (field: keyof ContactForm): CSSProperties => ({
    width: "100%", background: "rgba(13,22,34,0.8)", border: `1px solid ${errors[field] ? "#f87171" : "rgba(255,255,255,0.12)"}`,
    borderRadius: 10, padding: "clamp(8px,1.5vw,13px) clamp(10px,2vw,16px)",
    fontSize: "clamp(0.8rem,1.4vw,0.95rem)", color: "#fff", fontWeight: 600, outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box" as const,
  });

  const CONTACT_INFO = [
    { icon: "✉", label: "Email Us", value: "hello@astralearnia.com", href: "mailto:hello@astralearnia.com", accent: "#22d3ee" },
    { icon: "💬", label: "WhatsApp", value: "Chat with our team", href: "#", accent: "#34d399" },
    { icon: "🔗", label: "LinkedIn", value: "Connect with us", href: "#", accent: "#a78bfa" },
  ];

  return (
    <section ref={ref as React.RefCallback<HTMLElement>} id="contact" style={{ background: "#080c14", padding: "clamp(32px,5vw,72px) 0", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,200,255,0.06), transparent)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 40% at 80% 80%, rgba(130,50,255,0.05), transparent)", pointerEvents: "none" }} />

      <div style={{ margin: "0 auto", width: "100%", maxWidth: 1280, padding: "0 clamp(16px,4vw,48px)", position: "relative", zIndex: 1 }}>

        <div style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,64px)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", borderRadius: 99, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.04)", fontSize: "clamp(9px,1.1vw,11px)", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#fff", marginBottom: "clamp(16px,2.5vw,28px)", opacity: visible ? 1 : 0, animation: visible ? "sectionHeaderReveal 0.6s ease both" : "none" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22d3ee", boxShadow: "0 0 8px #22d3ee", animation: "dotPulse 1.4s ease-in-out infinite" }} />
            Get in Touch
          </div>
          <h2 style={{ fontSize: "clamp(2rem,6vw,5rem)", fontWeight: 900, lineHeight: 1.04, letterSpacing: "-0.04em", color: "#fff", marginBottom: "clamp(12px,2vw,20px)", opacity: visible ? 1 : 0, animation: visible ? "sectionHeaderReveal 0.7s ease 0.1s both" : "none" }}>
            Ready to Build{" "}
            <span style={{ background: "linear-gradient(135deg,#22d3ee,#a78bfa,#e879f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 30px rgba(0,200,255,0.4))" }}>
              With Us?
            </span>
          </h2>
          <p style={{ fontSize: "clamp(0.88rem,1.6vw,1.15rem)", color: "rgba(148,163,184,0.85)", maxWidth: "36rem", margin: "0 auto", fontWeight: 600, lineHeight: 1.65, opacity: visible ? 1 : 0, animation: visible ? "sectionHeaderReveal 0.7s ease 0.2s both" : "none" }}>
            Whether you need enterprise AI or transformative learning — our team responds within 2 hours.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(20px,4vw,48px)" }}
          className="lg:![grid-template-columns:5fr_7fr]">

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px,2vw,20px)" }}>
            <div style={{ background: "rgba(0,200,255,0.07)", border: "1px solid rgba(0,200,255,0.2)", borderRadius: 14, padding: "clamp(14px,2.5vw,22px)", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(0,200,255,0.12)", border: "1px solid rgba(0,200,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>⚡</div>
              <div>
                <div style={{ fontSize: "clamp(0.82rem,1.4vw,1rem)", fontWeight: 900, color: "#22d3ee", marginBottom: 3 }}>Typically replies in &lt; 2 hours</div>
                <div style={{ fontSize: "clamp(0.7rem,1.1vw,0.83rem)", color: "rgba(148,163,184,0.7)", fontWeight: 600 }}>Mon–Fri · 8am–8pm WAT</div>
              </div>
            </div>

            {CONTACT_INFO.map(c => (
              <a key={c.label} href={c.href} style={{ textDecoration: "none", display: "block" }}>
                <div style={{ background: "rgba(13,22,34,0.7)", border: `1px solid ${c.accent}22`, borderRadius: 14, padding: "clamp(12px,2vw,18px)", display: "flex", alignItems: "center", gap: 12, transition: "all 0.3s ease", cursor: "pointer" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${c.accent}55`; (e.currentTarget as HTMLDivElement).style.background = `${c.accent}08`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${c.accent}22`; (e.currentTarget as HTMLDivElement).style.background = "rgba(13,22,34,0.7)"; }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${c.accent}15`, border: `1px solid ${c.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: "clamp(0.7rem,1.1vw,0.8rem)", fontWeight: 900, color: "rgba(148,163,184,0.55)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "monospace" }}>{c.label}</div>
                    <div style={{ fontSize: "clamp(0.78rem,1.3vw,0.95rem)", fontWeight: 700, color: c.accent }}>{c.value}</div>
                  </div>
                </div>
              </a>
            ))}

            <div style={{ background: "rgba(13,22,34,0.5)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "clamp(14px,2.5vw,20px)" }}>
              <div style={{ fontSize: "clamp(0.7rem,1vw,0.8rem)", fontWeight: 900, color: "rgba(148,163,184,0.55)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12, fontFamily: "monospace" }}>Explore Divisions</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Link href="/divisions/technology" style={{ textDecoration: "none", display: "block", background: "rgba(0,200,255,0.06)", border: "1px solid rgba(0,200,255,0.2)", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>⚡</div>
                  <div style={{ fontSize: "clamp(0.65rem,1vw,0.78rem)", fontWeight: 900, color: "#22d3ee" }}>Technology</div>
                </Link>
                <Link href="/divisions/institute" style={{ textDecoration: "none", display: "block", background: "rgba(160,100,255,0.06)", border: "1px solid rgba(160,100,255,0.2)", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>🎓</div>
                  <div style={{ fontSize: "clamp(0.65rem,1vw,0.78rem)", fontWeight: 900, color: "#a78bfa" }}>Institute</div>
                </Link>
              </div>
            </div>
          </div>

          <div style={{ background: "rgba(13,22,34,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 22, padding: "clamp(18px,3vw,40px)", backdropFilter: "blur(12px)" }}>
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "clamp(24px,5vw,60px) 20px" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(52,211,153,0.12)", border: "2px solid rgba(52,211,153,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 32, animation: "successPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}>✓</div>
                <h3 style={{ fontSize: "clamp(1.2rem,3vw,2rem)", fontWeight: 900, color: "#fff", marginBottom: 10 }}>Message Sent!</h3>
                <p style={{ fontSize: "clamp(0.82rem,1.4vw,1rem)", color: "rgba(148,163,184,0.8)", lineHeight: 1.65, fontWeight: 600, maxWidth: "28rem", margin: "0 auto 24px" }}>
                  Thank you for reaching out. A member of our team will respond to you within 2 hours.
                </p>
                <button onClick={() => { setStatus("idle"); setForm({ name:"",email:"",company:"",division:"",subject:"",message:"" }); }} style={{ padding: "10px 24px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontWeight: 900, fontSize: "0.9rem", cursor: "pointer", letterSpacing: "0.05em" }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: "clamp(1rem,2.2vw,1.5rem)", fontWeight: 900, color: "#fff", marginBottom: "clamp(16px,3vw,28px)" }}>Tell us what you need</h3>

                <div style={{ marginBottom: "clamp(14px,2.5vw,22px)" }}>
                  <label style={{ display: "block", fontSize: "clamp(0.7rem,1.1vw,0.8rem)", fontWeight: 900, color: "rgba(148,163,184,0.7)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8, fontFamily: "monospace" }}>Which division interests you?</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                    {(["technology","institute","both"] as DivisionChoice[]).map(d => (
                      <button key={d} onClick={() => update("division", d)} style={{
                        padding: "clamp(7px,1.5vw,11px) 6px", borderRadius: 10, border: `1.5px solid ${form.division === d ? (d === "technology" ? "#22d3ee" : d === "institute" ? "#a78bfa" : "#34d399") : "rgba(255,255,255,0.1)"}`,
                        background: form.division === d ? `${d === "technology" ? "rgba(0,200,255,0.1)" : d === "institute" ? "rgba(167,139,250,0.1)" : "rgba(52,211,153,0.1)"}` : "rgba(13,22,34,0.5)",
                        color: form.division === d ? (d === "technology" ? "#22d3ee" : d === "institute" ? "#a78bfa" : "#34d399") : "rgba(148,163,184,0.6)",
                        fontWeight: 900, fontSize: "clamp(0.68rem,1.1vw,0.82rem)", cursor: "pointer", transition: "all 0.2s ease",
                        textTransform: "capitalize" as const, letterSpacing: "0.04em",
                      }}>
                        {d === "technology" ? "⚡ Tech" : d === "institute" ? "🎓 Institute" : "✦ Both"}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(8px,1.5vw,14px)", marginBottom: "clamp(10px,1.5vw,14px)" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "clamp(0.68rem,1vw,0.78rem)", fontWeight: 900, color: "rgba(148,163,184,0.6)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, fontFamily: "monospace" }}>Full Name *</label>
                    <input style={inputStyle("name")} value={form.name} onChange={e => update("name", e.target.value)} placeholder="Amara Osei"
                      onFocus={e => { e.currentTarget.style.borderColor = "#22d3ee50"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,200,255,0.08)"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = errors.name ? "#f87171" : "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }} />
                    {errors.name && <p style={{ fontSize: "0.72rem", color: "#f87171", fontWeight: 700, marginTop: 4 }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "clamp(0.68rem,1vw,0.78rem)", fontWeight: 900, color: "rgba(148,163,184,0.6)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, fontFamily: "monospace" }}>Email *</label>
                    <input style={inputStyle("email")} value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@company.com" type="email"
                      onFocus={e => { e.currentTarget.style.borderColor = "#22d3ee50"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,200,255,0.08)"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = errors.email ? "#f87171" : "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }} />
                    {errors.email && <p style={{ fontSize: "0.72rem", color: "#f87171", fontWeight: 700, marginTop: 4 }}>{errors.email}</p>}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(8px,1.5vw,14px)", marginBottom: "clamp(10px,1.5vw,14px)" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "clamp(0.68rem,1vw,0.78rem)", fontWeight: 900, color: "rgba(148,163,184,0.6)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, fontFamily: "monospace" }}>Company</label>
                    <input style={inputStyle("company")} value={form.company} onChange={e => update("company", e.target.value)} placeholder="Your Organisation"
                      onFocus={e => { e.currentTarget.style.borderColor = "#22d3ee50"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,200,255,0.08)"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "clamp(0.68rem,1vw,0.78rem)", fontWeight: 900, color: "rgba(148,163,184,0.6)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, fontFamily: "monospace" }}>Subject</label>
                    <input style={inputStyle("subject")} value={form.subject} onChange={e => update("subject", e.target.value)} placeholder="How can we help?"
                      onFocus={e => { e.currentTarget.style.borderColor = "#22d3ee50"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,200,255,0.08)"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                </div>

                <div style={{ marginBottom: "clamp(16px,2.5vw,24px)" }}>
                  <label style={{ display: "block", fontSize: "clamp(0.68rem,1vw,0.78rem)", fontWeight: 900, color: "rgba(148,163,184,0.6)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, fontFamily: "monospace" }}>Message *</label>
                  <textarea
                    style={{ ...inputStyle("message"), minHeight: "clamp(90px,14vw,140px)", resize: "vertical", lineHeight: 1.65 }}
                    value={form.message}
                    onChange={e => update("message", e.target.value)}
                    placeholder="Tell us about your project, goals, or questions..."
                    onFocus={e => { e.currentTarget.style.borderColor = "#22d3ee50"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,200,255,0.08)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = errors.message ? "#f87171" : "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                  {errors.message && <p style={{ fontSize: "0.72rem", color: "#f87171", fontWeight: 700, marginTop: 4 }}>{errors.message}</p>}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={status === "submitting"}
                  style={{
                    width: "100%", padding: "clamp(12px,2vw,16px)", borderRadius: 12, border: "none", cursor: status === "submitting" ? "not-allowed" : "pointer",
                    background: status === "submitting" ? "rgba(0,200,255,0.3)" : "linear-gradient(135deg,#22d3ee,#3b82f6,#8b5cf6)",
                    color: "#fff", fontWeight: 900, fontSize: "clamp(0.88rem,1.5vw,1rem)", letterSpacing: "0.05em",
                    boxShadow: status !== "submitting" ? "0 0 30px rgba(0,200,255,0.3)" : "none",
                    transition: "all 0.3s ease",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  }}
                >
                  {status === "submitting" ? (
                    <><span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "contactSpin 0.7s linear infinite", display: "inline-block" }} />Sending...</>
                  ) : <>Send Message →</>}
                </button>

                <p style={{ textAlign: "center", marginTop: 12, fontSize: "clamp(0.68rem,1vw,0.78rem)", color: "rgba(100,116,139,0.6)", fontWeight: 600 }}>
                  🔒 Your information is secure and never shared.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes successPop { 0%{transform:scale(0) rotate(-20deg);opacity:0} 60%{transform:scale(1.15) rotate(5deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes contactSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes dotPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:0.7} }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN HOME PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // ✅ All useSectionVisible hooks at top level (Rules of Hooks)
  // ✅ With callback refs these now properly attach when sections mount
  //    (after intro completes) instead of silently failing during the
  //    early-return intro phase when DOM nodes don't exist yet.
  const divisionSection     = useSectionVisible();
  const problemSection      = useSectionVisible();
  const pillarsSection      = useSectionVisible();
  const solutionsSection    = useSectionVisible();
  const testimonialsSection = useSectionVisible();
  const blogSection         = useSectionVisible();
  const ctaSection          = useSectionVisible();

  const heroSub = HERO_ROTATIONS[0].sub;

  if (!introComplete) return <RobotIntro onComplete={() => setIntroComplete(true)} />;

  return (
    <>
      <DivisionModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <style>{`
        .hp-root { overflow-x:hidden; animation:pageReveal 0.8s ease both; }
        @keyframes pageReveal { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

        /* ✅ Global keyframes used by all sections — defined here so they're
           available the moment any section becomes visible, regardless of
           which sub-component's style block has loaded. */
        @keyframes sectionHeaderReveal { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes dotPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:0.7} }
        @keyframes heroLine1 { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        .hp-div-grid { display:grid; grid-template-columns:1fr; gap:clamp(12px,2vw,24px); }
        @media(min-width:640px){ .hp-div-grid { grid-template-columns:1fr 1fr; } }
        .hp-div-card { display:flex; flex-direction:column; padding:clamp(18px,3vw,36px); position:relative; overflow:hidden; }
        .hp-div-h3 { font-size:clamp(1.9rem,4.5vw,3.4rem); font-weight:900; line-height:1.0; letter-spacing:-0.03em; margin-bottom:clamp(6px,1vw,10px); }
        .hp-div-tagline { font-size:clamp(0.62rem,1.1vw,0.8rem); font-weight:900; letter-spacing:0.1em; text-transform:uppercase; font-family:monospace; margin-bottom:clamp(10px,1.8vw,18px); }
        .hp-div-p { font-size:clamp(0.78rem,1.3vw,0.98rem); line-height:1.65; font-weight:600; margin-bottom:clamp(14px,2vw,22px); flex:1; }
        .hp-div-feats { display:grid; grid-template-columns:1fr 1fr; gap:clamp(5px,0.8vw,11px); margin-bottom:clamp(14px,2.5vw,24px); }
        .hp-div-feat { font-size:clamp(0.62rem,1vw,0.84rem); font-weight:700; display:flex; align-items:center; gap:5px; color:rgba(203,213,225,0.85); }

        .hp-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
        @media(min-width:500px){ .hp-stats { grid-template-columns:repeat(5,1fr); gap:14px; } }
        @media(min-width:1024px){ .hp-stats { display:flex; flex-wrap:wrap; gap:28px; } }

        .hp-hero-btns { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        @media(min-width:640px){ .hp-hero-btns { display:flex; flex-wrap:wrap; gap:14px; } }

        .hp-problem-grid { display:grid; grid-template-columns:1fr; }
        @media(min-width:640px){ .hp-problem-grid { grid-template-columns:repeat(3,1fr); } }

        .hp-pillars-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:clamp(6px,1.5vw,18px); }
        @media(min-width:1024px){ .hp-pillars-grid { grid-template-columns:repeat(4,1fr); } }

        .hp-sol-sub { display:grid; grid-template-columns:1fr 1fr; gap:clamp(8px,1.5vw,16px); }
        .hp-sol-sub-img { height:clamp(64px,12vw,160px); }

        .hp-testi-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(6px,1.5vw,20px); }
        @media(min-width:768px){ .hp-testi-grid { grid-template-columns:repeat(3,1fr); } }

        .hp-blog-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(6px,1.5vw,20px); }
        @media(min-width:1024px){ .hp-blog-grid { grid-template-columns:repeat(3,1fr); } }

        .hp-cta-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(8px,1.5vw,20px); max-width:900px; margin:0 auto; }
        @media(min-width:768px){ .hp-cta-grid { grid-template-columns:repeat(3,1fr); } }

        .hp-hero-vid { aspect-ratio:16/9; max-height:clamp(120px,30vw,400px); }
      `}</style>

      <main className="hp-root bg-[#050810] text-white font-sans antialiased">

        {/* ═══════════════════════════════════════════════════════
            1. HERO — Cycling animated headlines
        ═══════════════════════════════════════════════════════ */}
        <section className="relative min-h-[100dvh] flex flex-col justify-start overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-5%,rgba(0,180,255,0.22),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_80%,rgba(130,50,255,0.15),transparent)]" />
            <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `linear-gradient(rgba(0,220,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,255,1) 1px,transparent 1px)`, backgroundSize: "80px 80px" }} />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 pt-14 sm:pt-18 lg:pt-24 pb-8 sm:pb-10">
            <div className={`${pill} mb-5 sm:mb-8`}>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span className="hidden sm:inline">Two Divisions. One Unified Intelligence Platform.</span>
              <span className="sm:hidden">Two Divisions. One Platform.</span>
            </div>

            <CyclingHeroHeadline />

            <p className="text-sm sm:text-xl lg:text-2xl text-slate-300 max-w-3xl leading-relaxed mb-6 sm:mb-10 font-semibold" style={{ transition: "opacity 0.4s ease" }}>
              {heroSub}
            </p>

            <div className="hp-hero-btns mb-5 sm:mb-10">
              <Link href="/book-demo" className={`${btnCyan} text-center`}>Book a Free Demo →</Link>
              <button onClick={() => setModalOpen(true)} className={`${btnGhost} text-center`}>Explore Divisions ↓</button>
            </div>

            <div className="hp-stats border-t border-white/10 pt-4 sm:pt-7">
              {[
                { val: "500+",  label: "Enterprises" },
                { val: "99.9%", label: "Uptime" },
                { val: "3.2×",  label: "Avg. ROI" },
                { val: "<48h",  label: "Deploy Time" },
                { val: "12K+",  label: "Learners" },
              ].map(s => (
                <div key={s.label} className="text-center sm:text-left">
                  <span className="block text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">{s.val}</span>
                  <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-slate-500">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 pb-8 sm:pb-12">
            <div className="hp-hero-vid w-full rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d1622] to-[#080c14] flex items-center justify-center overflow-hidden relative shadow-[0_0_80px_rgba(0,200,255,0.12)]">
              <div className="text-center space-y-3 text-slate-600 pointer-events-none select-none">
                <svg className="mx-auto w-10 h-10 sm:w-16 sm:h-16 text-cyan-400/30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        {/* ★ Animated text slider */}
        <TextAnimSliderSection />

        {/* ═══════════════════════════════════════════════════════
            2. DIVISION BRIDGE — Cycling section headline
        ═══════════════════════════════════════════════════════ */}
        <section id="divisions" ref={divisionSection.ref as React.RefCallback<HTMLElement>} className="relative bg-[#080c14] py-8 sm:py-14 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(0,200,255,0.06),transparent)] pointer-events-none" />
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="text-center mb-6 sm:mb-10 lg:mb-14">
              <div className={`${pill} mb-4 sm:mb-6 mx-auto`} style={{ opacity: divisionSection.visible ? 1 : 0, animation: divisionSection.visible ? "sectionHeaderReveal 0.6s ease both" : "none" }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#22d3ee", boxShadow:"0 0 8px #22d3ee", animation:"dotPulse 1.4s ease-in-out infinite", flexShrink:0, display:"inline-block" }} />
                ◈ Our Two Divisions
              </div>
              <CyclingSectionHeading />
              <p className="text-xs sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-semibold mt-4" style={{ opacity: divisionSection.visible ? 1 : 0, animation: divisionSection.visible ? "sectionHeaderReveal 0.7s ease 0.3s both" : "none" }}>
                Whether you need AI systems for your business or transformative learning for your people — Astralearnia has a dedicated division built specifically for it.
              </p>
            </div>

            <div className="hp-div-grid mb-8 sm:mb-8">
              {/* Technology */}
              <div className="group relative rounded-2xl border border-cyan-400/25 hover:border-cyan-400/55 bg-[#060e1a] transition-all duration-500 hover:shadow-[0_0_70px_rgba(0,200,255,0.22)]" style={{ opacity: divisionSection.visible ? 1 : 0, animation: divisionSection.visible ? "sectionHeaderReveal 0.7s ease 0.15s both" : "none" }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background:"radial-gradient(ellipse 80% 60% at 10% 10%,rgba(0,200,255,0.05),transparent)" }} />
                <div className="hp-div-card">
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"clamp(16px,2.5vw,28px)" }}>
                    <div className="inline-flex px-3 py-1 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-[10px] font-black uppercase tracking-widest">Division 01</div>
                    <div style={{ width:"clamp(48px,5.5vw,68px)", height:"clamp(48px,5.5vw,68px)", borderRadius:"50%", background:"rgba(0,200,255,0.1)", border:"2px solid rgba(0,200,255,0.35)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"clamp(22px,3vw,32px)", boxShadow:"0 0 30px rgba(0,200,255,0.25)", flexShrink:0, transition:"box-shadow 0.3s ease" }}>⚡</div>
                  </div>
                  <h3 className="hp-div-h3 text-white">
                    Astralearnia<br />
                    <span style={{ background:"linear-gradient(135deg,#22d3ee,#60a5fa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Technology</span>
                  </h3>
                  <p className="hp-div-tagline" style={{ color:"rgba(0,200,255,0.8)" }}>AI Systems. Built to Scale.</p>
                  <p className="hp-div-p text-slate-300">
                    Custom AI models, intelligent automation, and enterprise APIs that turn data into decisions — deployed in under 48 hours.
                  </p>
                  <div className="hp-div-feats">
                    {["AI Model Dev","Decision Intel","API Platform","Automation","Robotics","Real-time AI"].map(f => (
                      <div key={f} className="hp-div-feat">
                        <span style={{ width:5, height:5, borderRadius:"50%", background:"#22d3ee", flexShrink:0, display:"inline-block" }} />{f}
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"clamp(7px,1vw,10px)" }}>
                    <Link href="/divisions/technology" className={`${btnCyan} w-full`}>Explore Technology →</Link>
                    <button onClick={() => setModalOpen(true)} className={`${btnGhost} w-full`}>Compare Divisions</button>
                  </div>
                </div>
              </div>

              {/* Institute */}
              <div className="group relative rounded-2xl border border-violet-400/25 hover:border-violet-400/55 bg-[#090614] transition-all duration-500 hover:shadow-[0_0_70px_rgba(160,80,255,0.22)]" style={{ opacity: divisionSection.visible ? 1 : 0, animation: divisionSection.visible ? "sectionHeaderReveal 0.7s ease 0.25s both" : "none" }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background:"radial-gradient(ellipse 80% 60% at 10% 10%,rgba(160,80,255,0.06),transparent)" }} />
                <div className="hp-div-card">
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"clamp(16px,2.5vw,28px)" }}>
                    <div className="inline-flex px-3 py-1 rounded-lg bg-violet-400/10 border border-violet-400/20 text-violet-300 text-[10px] font-black uppercase tracking-widest">Division 02</div>
                    <div style={{ width:"clamp(48px,5.5vw,68px)", height:"clamp(48px,5.5vw,68px)", borderRadius:"50%", background:"rgba(160,80,255,0.1)", border:"2px solid rgba(160,80,255,0.35)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"clamp(22px,3vw,32px)", boxShadow:"0 0 30px rgba(160,80,255,0.25)", flexShrink:0, transition:"box-shadow 0.3s ease" }}>🎓</div>
                  </div>
                  <h3 className="hp-div-h3 text-white">
                    Astralearnia<br />
                    <span style={{ background:"linear-gradient(135deg,#a78bfa,#e879f9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Institute</span>
                  </h3>
                  <p className="hp-div-tagline" style={{ color:"rgba(167,139,250,0.8)" }}>Learn. Adapt. Evolve.</p>
                  <p className="hp-div-p text-slate-300">
                    Adaptive AI learning paths, real-time skills analytics, and certifications — personalised for every team member from day one.
                  </p>
                  <div className="hp-div-feats">
                    {["Adaptive Paths","Corp Training","AI Certs","Skills Analytics","Instructor Tools","Dashboards"].map(f => (
                      <div key={f} className="hp-div-feat">
                        <span style={{ width:5, height:5, borderRadius:"50%", background:"#a78bfa", flexShrink:0, display:"inline-block" }} />{f}
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"clamp(7px,1vw,10px)" }}>
                    <Link href="/divisions/institute" className={`${btnViolet} w-full`}>Explore Institute →</Link>
                    <button onClick={() => setModalOpen(true)} className={`${btnGhost} w-full`}>Compare Divisions</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 sm:mt-10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
                <Link href="/book-demo" className={`${btnCyan} w-full sm:w-auto px-8 py-4 text-base`}>
                  ◈ Deploy AI Today →
                </Link>
                <button onClick={() => setModalOpen(true)} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400/10 via-white/5 to-violet-400/10 border-2 border-white/20 hover:border-white/40 text-white font-black text-base tracking-wide hover:bg-white/8 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto">
                  ✦ Help Me Choose My Division
                </button>
              </div>
              <p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Two Divisions. One Platform. Infinite Impact.</p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            3. PROBLEM → SOLUTION
        ═══════════════════════════════════════════════════════ */}
        <section ref={problemSection.ref as React.RefCallback<HTMLElement>} className="relative bg-[#050810] py-8 sm:py-14 lg:py-20 overflow-hidden">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="text-center mb-5 sm:mb-10">
              <div className={`${pill} mb-4 sm:mb-6 mx-auto`} style={{ opacity: problemSection.visible ? 1 : 0, animation: problemSection.visible ? "sectionHeaderReveal 0.6s ease both" : "none" }}>The Problem We Solve</div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4 sm:mb-6" style={{ opacity: problemSection.visible ? 1 : 0, animation: problemSection.visible ? "sectionHeaderReveal 0.7s ease 0.1s both" : "none" }}>
                Most Companies Have Data.<br />
                <span className="text-red-400">Few Have Intelligence.</span>
              </h2>
              <p className="text-xs sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-semibold" style={{ opacity: problemSection.visible ? 1 : 0, animation: problemSection.visible ? "sectionHeaderReveal 0.7s ease 0.2s both" : "none" }}>
                Siloed tools, disconnected training, and AI that doesn&apos;t integrate. We fix all three — with one unified platform, two specialised divisions.
              </p>
            </div>
            <div className="hp-problem-grid relative">
              <div className="hidden sm:block absolute top-1/2 left-1/3 right-1/3 h-px bg-gradient-to-r from-red-500/30 via-cyan-400/50 to-emerald-400/30 -translate-y-1/2" />
              {[
                { n:"01",icon:"⚡",c:"border-red-500/30 hover:border-red-400/60",a:"text-red-400",bg:"bg-[#0e0810]", title:"The Problem", body:"Teams run on 5+ platforms that don't communicate. Insight gets buried. Training is generic. Decisions take too long." },
                { n:"02",icon:"◈",c:"border-cyan-400/30 hover:border-cyan-300/60",a:"text-cyan-300",bg:"bg-[#080c14]", title:"Astralearnia Unifies", body:"One platform ingests your data, trains your team, runs your AI models, and surfaces intelligence exactly where work happens." },
                { n:"03",icon:"✦",c:"border-emerald-500/30 hover:border-emerald-400/60",a:"text-emerald-400",bg:"bg-[#080e10]", title:"Measurable Outcomes", body:"Clients report 3× faster decisions, 40% lower training costs, and AI deployments that go live in under 48 hours." },
              ].map((item, i) => (
                <div key={i} className={`relative ${item.bg} border-2 ${item.c} p-4 sm:p-8 lg:p-10 transition-all duration-300 hover:brightness-110 hover:-translate-y-1 ${i===0?"rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none":i===2?"rounded-b-2xl sm:rounded-r-2xl sm:rounded-bl-none":""}`} style={{ opacity: problemSection.visible ? 1 : 0, animation: problemSection.visible ? `sectionHeaderReveal 0.7s ease ${0.1*i}s both` : "none" }}>
                  <div className={`text-3xl sm:text-5xl mb-3 sm:mb-5 ${item.a}`}>{item.icon}</div>
                  <div className={`text-[10px] sm:text-xs font-black uppercase tracking-widest ${item.a} mb-1.5 sm:mb-3`}>Step {item.n}</div>
                  <h3 className="text-base sm:text-2xl lg:text-3xl font-black text-white mb-2 sm:mb-4 leading-tight">{item.title}</h3>
                  <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-semibold">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            4. FOUR PILLARS
        ═══════════════════════════════════════════════════════ */}
        <section ref={pillarsSection.ref as React.RefCallback<HTMLElement>} className="relative bg-[#080c14] py-8 sm:py-14 lg:py-18">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-5 sm:mb-10">
              <div className={`${pill} mb-4 sm:mb-6 mx-auto`} style={{ opacity: pillarsSection.visible ? 1 : 0, animation: pillarsSection.visible ? "sectionHeaderReveal 0.6s ease both" : "none" }}>Core Architecture</div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight" style={{ opacity: pillarsSection.visible ? 1 : 0, animation: pillarsSection.visible ? "sectionHeaderReveal 0.7s ease 0.1s both" : "none" }}>
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">Four Pillars of Intelligence</span>
              </h2>
            </div>
            <div className="hp-pillars-grid">
              {PILLARS.map((pillar: { name: string; icon: string; description: string }, pi: number) => (
                <div key={pillar.name} className="group relative bg-[#0d1622] rounded-2xl border border-white/10 hover:border-cyan-400/40 p-4 sm:p-7 lg:p-8 transition-all duration-300 hover:bg-[#101c2e] hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(0,200,255,0.15)]" style={{ opacity: pillarsSection.visible ? 1 : 0, animation: pillarsSection.visible ? `sectionHeaderReveal 0.7s ease ${pi*0.08}s both` : "none" }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="text-2xl sm:text-4xl mb-2.5 sm:mb-5 text-cyan-400/60 group-hover:text-cyan-300 transition-colors">{pillar.icon}</div>
                  <h3 className="text-sm sm:text-xl font-black text-white mb-1.5 sm:mb-3 group-hover:text-cyan-100 transition-colors">{pillar.name}</h3>
                  <p className="text-[11px] sm:text-sm text-slate-400 leading-relaxed font-semibold">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            5. SOLUTIONS GRID
        ═══════════════════════════════════════════════════════ */}
        <section ref={solutionsSection.ref as React.RefCallback<HTMLElement>} className="relative bg-[#050810] py-8 sm:py-14 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_20%,rgba(120,40,255,0.08),transparent)] pointer-events-none" />
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-5 sm:mb-10">
              <div>
                <div className={`${pill} mb-3 sm:mb-5`} style={{ opacity: solutionsSection.visible ? 1 : 0, animation: solutionsSection.visible ? "sectionHeaderReveal 0.6s ease both" : "none" }}>What We Deliver</div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight" style={{ opacity: solutionsSection.visible ? 1 : 0, animation: solutionsSection.visible ? "sectionHeaderReveal 0.7s ease 0.1s both" : "none" }}>
                  Solutions Built for{" "}
                  <span className="block"><span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">Real Business Impact</span></span>
                </h2>
              </div>
              <Link href="/solutions" className={`${btnGhost} w-full sm:w-auto`}>Explore All Solutions →</Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4">
              <div className="lg:row-span-2 group relative bg-[#0d1622] rounded-2xl border border-cyan-400/20 hover:border-cyan-400/50 overflow-hidden hover:shadow-[0_0_55px_rgba(0,200,255,0.2)] flex flex-col transition-all duration-400">
                <div className="w-full h-32 sm:h-56 bg-gradient-to-br from-cyan-900/30 to-blue-900/20 border-b border-cyan-400/10 flex items-center justify-center relative overflow-hidden">
                  <div className="text-slate-700 text-center pointer-events-none select-none"><div className="text-4xl sm:text-5xl mb-2 text-cyan-400/20">🖼</div><p className="text-xs font-black uppercase tracking-widest">Image / Video Slot</p></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1622]/80 to-transparent" />
                </div>
                <div className="p-4 sm:p-8 lg:p-10 flex flex-col flex-1">
                  <div className="inline-flex px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-cyan-400/10 border border-cyan-400/15 text-cyan-300 text-[9px] sm:text-xs font-black uppercase tracking-widest mb-2.5 sm:mb-4 self-start">Core Platform</div>
                  <h3 className="text-lg sm:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-4 leading-tight">Adaptive AI Learning Engine</h3>
                  <p className="text-xs sm:text-lg text-slate-300 leading-relaxed mb-4 sm:mb-6 flex-1 font-semibold">Deploy personalised learning paths, knowledge graph management, and real-time skill-gap analysis across your entire organisation. No data science team required.</p>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                    <Link href="/book-demo" className={`${btnCyan} w-full sm:w-auto`}>Book a Demo →</Link>
                    <Link href="/solutions" className={`${btnGhost} w-full sm:w-auto`}>Learn More</Link>
                  </div>
                </div>
              </div>
              <div className="hp-sol-sub">
                <div className="group relative bg-[#0d1622] rounded-2xl border border-violet-400/20 hover:border-violet-400/50 overflow-hidden hover:shadow-[0_0_45px_rgba(120,40,255,0.2)] flex flex-col transition-all duration-400">
                  <div className="hp-sol-sub-img w-full bg-gradient-to-br from-violet-900/30 to-blue-900/20 border-b border-violet-400/10 flex items-center justify-center relative overflow-hidden">
                    <div className="text-slate-700 text-center pointer-events-none"><div className="text-2xl sm:text-3xl text-violet-400/20">🖼</div></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1622]/80 to-transparent" />
                  </div>
                  <div className="p-3 sm:p-7 flex flex-col flex-1">
                    <div className="inline-flex px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-violet-400/10 border border-violet-400/15 text-violet-300 text-[8px] sm:text-xs font-black uppercase tracking-widest mb-2 sm:mb-3 self-start">Enterprise AI</div>
                    <h3 className="text-xs sm:text-2xl font-black text-white mb-1.5 sm:mb-3 leading-tight">Decision Intelligence Suite</h3>
                    <p className="text-[10px] sm:text-base text-slate-300 leading-relaxed mb-3 sm:mb-5 flex-1 font-semibold">AI-assisted decision support connected directly to your existing data warehouse. Real-time pipelines, no migrations needed.</p>
                    <Link href="/contact" className={`${btnViolet} w-full`}>Get a Quote →</Link>
                  </div>
                </div>
                <div className="group relative bg-[#0d1622] rounded-2xl border border-blue-400/20 hover:border-blue-400/50 overflow-hidden hover:shadow-[0_0_45px_rgba(60,120,255,0.2)] flex flex-col transition-all duration-400">
                  <div className="hp-sol-sub-img w-full bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border-b border-blue-400/10 flex items-center justify-center relative overflow-hidden">
                    <div className="text-slate-700 text-center pointer-events-none"><div className="text-2xl sm:text-3xl text-blue-400/20">🖼</div></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1622]/80 to-transparent" />
                  </div>
                  <div className="p-3 sm:p-7 flex flex-col flex-1">
                    <div className="inline-flex px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-blue-400/10 border border-blue-400/15 text-blue-300 text-[8px] sm:text-xs font-black uppercase tracking-widest mb-2 sm:mb-3 self-start">Developer API</div>
                    <h3 className="text-xs sm:text-2xl font-black text-white mb-1.5 sm:mb-3 leading-tight">Intelligence API & SDK</h3>
                    <p className="text-[10px] sm:text-base text-slate-300 leading-relaxed mb-3 sm:mb-5 flex-1 font-semibold">REST & GraphQL endpoints, model fine-tuning, and webhooks ready for production in under 48 hours.</p>
                    <Link href="/docs" className={`${btnGhost} w-full`}>View Docs →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ★ Solutions Carousel */}
        <SolutionsCarousel />

        {/* ═══════════════════════════════════════════════════════
            6. TESTIMONIALS
        ═══════════════════════════════════════════════════════ */}
        <section ref={testimonialsSection.ref as React.RefCallback<HTMLElement>} className="relative bg-[#080c14] py-8 sm:py-12 lg:py-16 border-y border-white/5">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-6 sm:mb-8">
              <div className={`${pill} mb-3 sm:mb-5 mx-auto`} style={{ opacity: testimonialsSection.visible ? 1 : 0, animation: testimonialsSection.visible ? "sectionHeaderReveal 0.6s ease both" : "none" }}>Client Results</div>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white" style={{ opacity: testimonialsSection.visible ? 1 : 0, animation: testimonialsSection.visible ? "sectionHeaderReveal 0.7s ease 0.1s both" : "none" }}>What Our Clients Say</h2>
            </div>
            <div className="hp-testi-grid">
              {[
                { q:"Astralearnia cut our compliance training time by 60% and test scores went up immediately. ROI was clear within 3 months.", n:"Yemi Adeyemi", r:"Chief People Officer, FinCorp Africa", d:"Institute" },
                { q:"Their API is the cleanest I've integrated in 10 years. Docs are real, endpoints stable, support responds in hours.", n:"Tunde Okonkwo", r:"Lead Engineer, DataStack NG", d:"Technology" },
                { q:"We replaced three legacy vendors with Astralearnia. One invoice, one team, three times the output.", n:"Amara Osei", r:"CTO, Scale Ventures", d:"Technology" },
              ].map((t, i) => (
                <div key={i} className={`bg-[#0d1622] rounded-2xl border border-white/10 p-3 sm:p-7 lg:p-8 hover:border-cyan-400/30 transition-all duration-300 ${i===2?"col-span-2 sm:col-span-1":""}`} style={{ opacity: testimonialsSection.visible ? 1 : 0, animation: testimonialsSection.visible ? `sectionHeaderReveal 0.7s ease ${i*0.1}s both` : "none" }}>
                  <div className={`inline-flex px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[9px] sm:text-xs font-black uppercase tracking-widest mb-2.5 sm:mb-4 ${t.d==="Institute"?"text-violet-300 bg-violet-400/10 border border-violet-400/20":"text-cyan-300 bg-cyan-400/10 border border-cyan-400/20"}`}>{t.d}</div>
                  <div className="text-xl sm:text-3xl text-white/20 mb-1.5 sm:mb-2 font-serif leading-none">&ldquo;</div>
                  <p className="text-[11px] sm:text-base text-slate-200 leading-relaxed mb-2.5 sm:mb-6 font-semibold italic">{t.q}</p>
                  <div>
                    <div className="font-black text-white text-[11px] sm:text-sm">{t.n}</div>
                    <div className="text-[9px] sm:text-xs text-slate-500 font-semibold">{t.r}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            7. BLOG
        ═══════════════════════════════════════════════════════ */}
        <section ref={blogSection.ref as React.RefCallback<HTMLElement>} className="relative bg-[#050810] py-8 sm:py-14 lg:py-20">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-5 sm:mb-10">
              <div>
                <div className={`${pill} mb-3 sm:mb-5`} style={{ opacity: blogSection.visible ? 1 : 0, animation: blogSection.visible ? "sectionHeaderReveal 0.6s ease both" : "none" }}>Intelligence Insights</div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ opacity: blogSection.visible ? 1 : 0, animation: blogSection.visible ? "sectionHeaderReveal 0.7s ease 0.1s both" : "none" }}>
                  <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">Signal Intelligence</span>
                </h2>
              </div>
              <Link href="/blog" className="flex items-center gap-2 text-white hover:text-cyan-300 font-black text-sm sm:text-lg transition-colors shrink-0">View All →</Link>
            </div>
            <div className="hp-blog-grid">
              {BLOG_POSTS.map((post: { id: string; slug: string; emoji: string; tag: string; title: string; excerpt: string; date: string; readTime: string }) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-[#0d1622] rounded-2xl border border-white/10 hover:border-cyan-400/40 overflow-hidden flex flex-col transition-all duration-300 hover:bg-[#101c2e] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,200,255,0.12)]">
                  <div className="w-full aspect-video bg-gradient-to-br from-[#101c2e] to-[#0a0f1a] border-b border-white/5 flex items-center justify-center relative overflow-hidden">
                    <span className="text-2xl sm:text-7xl opacity-15 group-hover:opacity-25 transition-opacity select-none">{post.emoji}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1622]/70 to-transparent" />
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                      <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-[#050810]/80 border border-white/15 text-white text-[8px] sm:text-xs font-black uppercase tracking-widest">{post.tag}</span>
                    </div>
                  </div>
                  <div className="p-2.5 sm:p-6 flex flex-col flex-1">
                    <h3 className="text-[11px] sm:text-lg font-black text-white mb-1 sm:mb-3 leading-snug line-clamp-2 group-hover:text-cyan-100 transition-colors">{post.title}</h3>
                    <p className="hidden sm:block text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4 sm:mb-5 flex-1 font-semibold">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-[9px] sm:text-xs text-slate-500 border-t border-white/5 pt-2 sm:pt-4 font-semibold">
                      <span>{post.date}</span><span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ★ Contact Section */}
        <ContactSection />

        {/* ═══════════════════════════════════════════════════════
            8. FINAL CTA
        ═══════════════════════════════════════════════════════ */}
        <section ref={ctaSection.ref as React.RefCallback<HTMLElement>} className="relative bg-[#080c14] py-8 sm:py-14 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,200,255,0.1),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(130,50,255,0.08),transparent)]" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-16">
              <div className={`${pill} mb-4 sm:mb-8 mx-auto`} style={{ opacity: ctaSection.visible ? 1 : 0, animation: ctaSection.visible ? "sectionHeaderReveal 0.6s ease both" : "none" }}>Get Started Today</div>
              <h2 className="text-2xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.04] mb-4 sm:mb-8" style={{ opacity: ctaSection.visible ? 1 : 0, animation: ctaSection.visible ? "sectionHeaderReveal 0.7s ease 0.1s both" : "none" }}>
                Ready to See What AI{" "}
                <span className="block">
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(0,200,255,0.4)]">
                    Can Do for You?
                  </span>
                </span>
              </h2>
              <p className="text-sm sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-semibold" style={{ opacity: ctaSection.visible ? 1 : 0, animation: ctaSection.visible ? "sectionHeaderReveal 0.7s ease 0.2s both" : "none" }}>
                Get a personalised demo, talk to our engineers, or explore our divisions — no fluff, no commitments.
              </p>
            </div>
            <div className="hp-cta-grid">
              {[
                { icon:"📅", title:"Book a Demo", body:"See the platform live with your own data. 30-minute focused sessions tailored to your use case.", cta:"Schedule Now →", href:"/book-demo", btn:btnCyan },
                { icon:"📞", title:"Talk to Sales", body:"Speak directly with a solutions engineer about pricing, integrations, and go-live timelines.", cta:"Contact Us →", href:"/contact", btn:btnViolet },
                { icon:"🚀", title:"Free Trial", body:"Try the core platform free for 14 days. No card required. Full feature access from day one.", cta:"Start Free →", href:"/book-demo", btn:btnGhost },
              ].map((card, i) => (
                <div key={i} className={`bg-[#0d1622] rounded-2xl border-2 border-white/15 hover:border-white/30 p-3 sm:p-8 text-center flex flex-col items-center gap-2.5 sm:gap-5 transition-all duration-300 hover:bg-[#101c2e] hover:-translate-y-1 ${i===2?"col-span-2 sm:col-span-1":""}`} style={{ opacity: ctaSection.visible ? 1 : 0, animation: ctaSection.visible ? `sectionHeaderReveal 0.7s ease ${i*0.1}s both` : "none" }}>
                  <div className="text-2xl sm:text-5xl">{card.icon}</div>
                  <h3 className="text-sm sm:text-2xl font-black text-white">{card.title}</h3>
                  <p className="text-[10px] sm:text-base text-slate-300 leading-relaxed flex-1 font-semibold">{card.body}</p>
                  <Link href={card.href} className={`${card.btn} w-full`}>{card.cta}</Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-8 sm:mt-14">
              <p className="text-slate-500 mb-3 text-xs sm:text-sm font-semibold">Still deciding which division?</p>
              <button onClick={() => setModalOpen(true)} className="inline-flex items-center justify-center gap-3 px-5 sm:px-8 py-3 sm:py-3.5 rounded-xl border border-white/20 hover:border-white/40 text-white font-black text-xs sm:text-base tracking-wide hover:bg-white/5 transition-all duration-300 w-full sm:w-auto">
                ✦ Compare Our Two Divisions
              </button>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}