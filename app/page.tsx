"use client";
import { useState, useEffect, useRef, useCallback, CSSProperties } from "react";
import Link from "next/link";
import { DivisionModal } from "@/components/DivisionModal";
import { BLOG_POSTS, PILLARS } from "@/lib/constants";

// ─── Types ───────────────────────────────────────────────────────
type RobotPhase = "enter" | "walk" | "holeOpen" | "fall" | "close" | "fadeOut";
type AnimType = "gravity" | "extrude" | "glitch" | "kinetic" | "masked";
type SlideColor = "cyan" | "blue" | "emerald" | "red" | "violet" | "fuchsia";

interface AnimMessage {
  anim: AnimType;
  eyebrow: string;
  text: string;
  highlight: string;
  sub: string;
  tag: string;
  accent: string;
  mediaLabel: string;
  mediaEmoji: string;
  mediaBg: string;
  mediaAccent: string;
  detail: string;
}

interface StarData {
  w: string;
  h: string;
  left: string;
  top: string;
  dur: string;
  delay: string;
}

// ─── Shared style tokens ────────────────────────────────────────
const pill = `inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full
  border border-white/20 bg-white/5
  text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.18em]`;

const btnCyan = `inline-flex items-center justify-center gap-2
  px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-black text-sm sm:text-base tracking-wide text-white
  bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600
  hover:from-cyan-300 hover:via-blue-400 hover:to-violet-500
  shadow-[0_0_30px_rgba(0,200,255,0.4)]
  hover:shadow-[0_0_55px_rgba(0,200,255,0.65)]
  transition-all duration-300 hover:-translate-y-0.5 active:scale-95`;

const btnGhost = `inline-flex items-center justify-center gap-2
  px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-black text-sm sm:text-base tracking-wide
  border-2 border-white/25 hover:border-white/60 text-white
  hover:bg-white/8 transition-all duration-300 hover:-translate-y-0.5 active:scale-95`;

const btnViolet = `inline-flex items-center justify-center gap-2
  px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-black text-sm sm:text-base tracking-wide text-white
  bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500
  hover:from-violet-400 hover:via-fuchsia-400 hover:to-pink-400
  shadow-[0_0_30px_rgba(160,80,255,0.4)]
  hover:shadow-[0_0_55px_rgba(160,80,255,0.65)]
  transition-all duration-300 hover:-translate-y-0.5 active:scale-95`;

// ─── Animation label map ─────────────────────────────────────────
const ANIM_LABEL: Record<AnimType, string> = {
  gravity: "Gravity & Physics",
  extrude: "3D Extrusion",
  glitch:  "Chaos & Glitch",
  kinetic: "Kinetic Typography",
  masked:  "Masked Reveal",
};

// ─── 5-Slide Story Messages ──────────────────────────────────────
const ANIM_MESSAGES: AnimMessage[] = [
  {
    anim: "gravity",
    eyebrow: "Who We Are",
    text: "Engineering Intelligence.",
    highlight: "Intelligence.",
    sub: "Astralearnia is the intelligence layer modern organisations need — purpose-built to turn raw data into decisive action.",
    tag: "Our Mission",
    accent: "#22d3ee",
    mediaLabel: "What is Astralearnia?",
    mediaEmoji: "🧠",
    mediaBg: "from-cyan-950/60 to-blue-950/40",
    mediaAccent: "#22d3ee",
    detail: "We exist at the intersection of enterprise technology and human learning — two divisions, one unified intelligence platform trusted by 500+ organisations.",
  },
  {
    anim: "extrude",
    eyebrow: "Our Purpose",
    text: "Empowering Minds.",
    highlight: "Minds.",
    sub: "We don't just build AI systems — we build the people who use them. Transforming human potential so your teams grow as fast as your technology does.",
    tag: "Our Vision",
    accent: "#a78bfa",
    mediaLabel: "Empowering Human Potential",
    mediaEmoji: "🎓",
    mediaBg: "from-violet-950/60 to-fuchsia-950/40",
    mediaAccent: "#a78bfa",
    detail: "Through our Institute Division, 12,000+ learners across Africa and beyond have earned AI-certified skills that translate directly to career and business growth.",
  },
  {
    anim: "glitch",
    eyebrow: "The Technology Division",
    text: "AI Systems. Built to Scale.",
    highlight: "Built to Scale.",
    sub: "Delivering enterprise AI — custom models, decision intelligence, automation pipelines, and developer APIs — deployed in under 48 hours.",
    tag: "Technology Division",
    accent: "#22d3ee",
    mediaLabel: "Technology Division — Live",
    mediaEmoji: "⚡",
    mediaBg: "from-blue-950/60 to-cyan-950/40",
    mediaAccent: "#22d3ee",
    detail: "From Robotics and Embedded Systems to Blockchain and Cybersecurity — our engineers design, build, and ship production-grade intelligent systems your competitors don't have yet.",
  },
  {
    anim: "kinetic",
    eyebrow: "The Institute Division",
    text: "Learn. Adapt. Evolve.",
    highlight: "Evolve.",
    sub: "Adaptive AI learning paths, real-time skills analytics, and certifications that matter — personalised for every team member, measurable from day one.",
    tag: "Institute Division",
    accent: "#e879f9",
    mediaLabel: "Institute Division — Adaptive Learning",
    mediaEmoji: "📡",
    mediaBg: "from-fuchsia-950/60 to-violet-950/40",
    mediaAccent: "#e879f9",
    detail: "Corporate training programmes, AI certification tracks, instructor dashboards, and skills gap analysis — one platform replacing five legacy tools at 40% lower cost.",
  },
  {
    anim: "masked",
    eyebrow: "One Unified Platform",
    text: "One Company. Infinite Impact.",
    highlight: "Infinite Impact.",
    sub: "Two powerful divisions. One coherent intelligence platform. Whether you need enterprise AI or transformative learning — Astralearnia has a dedicated path for it.",
    tag: "Why Astralearnia",
    accent: "#34d399",
    mediaLabel: "The Astralearnia Platform",
    mediaEmoji: "✦",
    mediaBg: "from-emerald-950/60 to-cyan-950/40",
    mediaAccent: "#34d399",
    detail: "Clients report 3.2× average ROI, decisions made 3× faster, and AI deployments live in under 48 hours. This is what the intelligence layer looks like in practice.",
  },
];

// ─── Solutions Slides Data ────────────────────────────────────────
const SOLUTIONS_SLIDES: Array<{
  id: number; category: string; icon: string; color: SlideColor;
  borderColor: string; glowColor: string; gradientFrom: string; gradientTo: string;
  badgeClass: string; title: string; subtitle: string; description: string; features: string[];
}> = [
  {
    id: 1, category: "Robotics", icon: "🤖", color: "cyan" as SlideColor,
    borderColor: "#22d3ee", glowColor: "rgba(0,200,255,0.3)",
    gradientFrom: "#0e2a35", gradientTo: "#091522",
    badgeClass: "bg-cyan-400/10 border border-cyan-400/20 text-cyan-300",
    title: "Robotics Systems",
    subtitle: "ROS2 · Physics Simulation · Manufacturing",
    description: "End-to-end robotics solutions from concept to deployment. We build ROS2-based autonomous systems, physics simulation environments (Gazebo, Isaac Sim), and integrate smart robotics into full manufacturing pipelines with AI-powered control loops.",
    features: ["ROS2 / ROS1 Integration", "Physics Simulation (Gazebo, Isaac)", "Industrial Robot Programming", "SLAM & Autonomous Navigation", "Computer Vision & Perception", "Manufacturing Line Automation"],
  },
  {
    id: 2, category: "Embedded C", icon: "💾", color: "blue" as SlideColor,
    borderColor: "#60a5fa", glowColor: "rgba(60,120,255,0.3)",
    gradientFrom: "#0c1a30", gradientTo: "#060d1a",
    badgeClass: "bg-blue-400/10 border border-blue-400/20 text-blue-300",
    title: "Embedded Systems",
    subtitle: "Firmware · Microcontrollers · RTOS",
    description: "Bare-metal and RTOS-based firmware development for mission-critical applications. From IoT edge devices to industrial controllers — we write optimised Embedded C/C++ that performs at the edge where milliseconds matter.",
    features: ["ARM Cortex / STM32 / ESP32", "FreeRTOS / Zephyr RTOS", "CAN, SPI, I2C, UART Protocols", "Low-Power Optimisation", "OTA Firmware Updates", "Hardware Abstraction Layers"],
  },
  {
    id: 3, category: "Automation", icon: "⚙️", color: "emerald" as SlideColor,
    borderColor: "#34d399", glowColor: "rgba(52,211,153,0.3)",
    gradientFrom: "#081e12", gradientTo: "#040e09",
    badgeClass: "bg-emerald-400/10 border border-emerald-400/20 text-emerald-300",
    title: "Process Automation",
    subtitle: "Industrial · Workflow · AI-Driven",
    description: "Transform repetitive, manual processes into intelligent automated pipelines. From PLC-level industrial automation to enterprise workflow orchestration powered by our proprietary AI decision engine — we eliminate bottlenecks permanently.",
    features: ["PLC & SCADA Systems", "RPA (Robotic Process Automation)", "AI-Powered Workflow Engines", "Industrial IoT Integration", "Digital Twin Modelling", "Predictive Maintenance AI"],
  },
  {
    id: 4, category: "Cybersecurity", icon: "🔐", color: "red" as SlideColor,
    borderColor: "#f87171", glowColor: "rgba(248,113,113,0.3)",
    gradientFrom: "#200a0a", gradientTo: "#100404",
    badgeClass: "bg-red-400/10 border border-red-400/20 text-red-300",
    title: "Cybersecurity",
    subtitle: "Zero-Trust · Threat Intel · Pen Testing",
    description: "Enterprise-grade security architecture, real-time threat detection, and full incident response. We secure AI systems, embedded devices, and cloud infrastructure against modern and emerging attack vectors with zero-trust principles.",
    features: ["Penetration Testing & Red Team", "Zero-Trust Architecture", "AI-Powered Threat Detection", "Embedded System Security", "SOC-as-a-Service", "ISO 27001 Compliance & Audit"],
  },
  {
    id: 5, category: "Blockchain", icon: "⛓️", color: "violet" as SlideColor,
    borderColor: "#a78bfa", glowColor: "rgba(167,139,250,0.3)",
    gradientFrom: "#130a20", gradientTo: "#08040f",
    badgeClass: "bg-violet-400/10 border border-violet-400/20 text-violet-300",
    title: "Blockchain Solutions",
    subtitle: "Smart Contracts · DeFi · Supply Chain",
    description: "Build trust at scale with distributed ledger technology. Smart contract development, DeFi protocols, tokenisation infrastructure, and blockchain-based supply chain traceability systems that bring real-world transparency.",
    features: ["Solidity / Rust Smart Contracts", "Ethereum / Solana / Polkadot", "DeFi Protocol Design", "Supply Chain Traceability", "NFT & Token Platforms", "Web3 API & SDK Integration"],
  },
  {
    id: 6, category: "MVP & Idea Implementation", icon: "🚀", color: "fuchsia" as SlideColor,
    borderColor: "#e879f9", glowColor: "rgba(232,121,249,0.3)",
    gradientFrom: "#1a0820", gradientTo: "#0c040f",
    badgeClass: "bg-fuchsia-400/10 border border-fuchsia-400/20 text-fuchsia-300",
    title: "MVP & Rapid Build",
    subtitle: "Idea → Product → Market in 4–8 Weeks",
    description: "Got an idea? We take you from raw concept to a working, investor-ready MVP in 4–8 weeks. Product strategy workshops, technical architecture, prototype development, AI feature integration, and full launch-ready delivery — with complete IP ownership.",
    features: ["Product Discovery Workshops", "Technical Architecture Design", "Full-Stack MVP Development", "AI Feature Integration", "Investor-Ready Demos", "Post-Launch Iteration Support"],
  },
];

// ─── Robot Intro Animation ─────────────────────────────────────────
function RobotIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<RobotPhase>("enter");
  // ✅ Stars generated client-side only to prevent hydration mismatch
  const [starData, setStarData] = useState<StarData[]>([]);

  useEffect(() => {
    setStarData(
      Array.from({ length: 60 }, () => ({
        w:     (Math.random() * 2 + 1).toFixed(4) + "px",
        h:     (Math.random() * 2 + 1).toFixed(4) + "px",
        left:  (Math.random() * 100).toFixed(4) + "%",
        top:   (Math.random() * 100).toFixed(4) + "%",
        dur:   (1.5 + Math.random() * 2).toFixed(4) + "s",
        delay: (Math.random() * 2).toFixed(4) + "s",
      }))
    );
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("walk"),     1400);
    const t2 = setTimeout(() => setPhase("holeOpen"), 2800);
    const t3 = setTimeout(() => setPhase("fall"),     3500);
    const t4 = setTimeout(() => setPhase("close"),    4600);
    const t5 = setTimeout(() => setPhase("fadeOut"),  5200);
    const t6 = setTimeout(() => onComplete(),         6000);
    return () => [t1,t2,t3,t4,t5,t6].forEach(clearTimeout);
  }, [onComplete]);

  const robotStyle: Record<RobotPhase, CSSProperties> = {
    enter:    { transform: "translateX(110vw) scale(1)",     opacity: 1, transition: "transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94)" },
    walk:     { transform: "translateX(0vw) scale(1)",       opacity: 1, transition: "transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94)" },
    holeOpen: { transform: "translateX(-5vw) scale(1)",      opacity: 1, transition: "transform 0.4s ease" },
    fall:     { transform: "translateX(-50vw) translateY(40vh) scale(0.05) rotate(720deg)", opacity: 0, transition: "transform 1s cubic-bezier(0.55,0,1,0.45), opacity 0.8s ease 0.3s" },
    close:    { transform: "translateX(-50vw) translateY(40vh) scale(0)",  opacity: 0, transition: "none" },
    fadeOut:  { transform: "translateX(-50vw) translateY(40vh) scale(0)",  opacity: 0, transition: "none" },
  };

  const holeStyle: Record<RobotPhase, CSSProperties> = {
    enter:    { transform: "scale(0)",   opacity: 0, transition: "none" },
    walk:     { transform: "scale(0)",   opacity: 0, transition: "none" },
    holeOpen: { transform: "scale(1)",   opacity: 1, transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease" },
    fall:     { transform: "scale(1.2)", opacity: 1, transition: "transform 1s ease" },
    close:    { transform: "scale(0)",   opacity: 0, transition: "transform 0.5s cubic-bezier(0.55,0,1,0.45), opacity 0.4s ease" },
    fadeOut:  { transform: "scale(0)",   opacity: 0, transition: "none" },
  };

  const overlayStyle: CSSProperties = {
    opacity: 0, transition: "opacity 0.8s ease", pointerEvents: "none" as const,
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "#020509",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        ...(phase === "fadeOut" ? overlayStyle : { opacity: 1 }),
      } as CSSProperties}
    >
      {/* Starfield bg — client-only, no hydration mismatch */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {starData.map((s, i) => (
          <div key={i} style={{
            position: "absolute",
            width: s.w,
            height: s.h,
            borderRadius: "50%",
            background: "rgba(0,200,255,0.6)",
            left: s.left,
            top: s.top,
            // ✅ delay baked into shorthand — no separate animationDelay prop
            animation: `twinkle ${s.dur} ${s.delay} ease-in-out infinite`,
          }} />
        ))}
      </div>

      {/* Scanline overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
      }} />

      {/* Ground / floor line */}
      <div style={{
        position: "absolute", bottom: "28%", left: 0, right: 0,
        height: "2px",
        background: "linear-gradient(90deg, transparent, rgba(0,200,255,0.3), rgba(0,200,255,0.7), rgba(0,200,255,0.3), transparent)",
        boxShadow: "0 0 12px rgba(0,200,255,0.5)",
      }} />

      {/* Logo / brand text */}
      <div style={{
        position: "absolute", top: "12%", left: "50%", transform: "translateX(-50%)",
        textAlign: "center", zIndex: 10,
        animation: "fadeInDown 0.8s ease forwards",
      }}>
        <div style={{ fontSize: "clamp(1rem,3vw,1.6rem)", fontWeight: 900, letterSpacing: "0.3em",
          color: "rgba(0,200,255,0.8)", textTransform: "uppercase", fontFamily: "monospace" }}>
          ASTRALEARNIA
        </div>
        <div style={{ fontSize: "clamp(0.5rem,1.5vw,0.75rem)", color: "rgba(0,200,255,0.4)",
          letterSpacing: "0.5em", marginTop: 6, fontFamily: "monospace" }}>
          INITIALISING SYSTEM...
        </div>
        <div style={{ marginTop: 12, width: 200, height: 3, background: "rgba(255,255,255,0.1)",
          borderRadius: 2, overflow: "hidden", margin: "12px auto 0" }}>
          <div style={{
            height: "100%", borderRadius: 2,
            background: "linear-gradient(90deg,#00c8ff,#8040ff)",
            animation: "loadBar 4.5s ease forwards",
          }} />
        </div>
      </div>

      {/* Snooker hole */}
      <div style={{
        position: "absolute", bottom: "27%", left: "50%", transform: "translateX(-50%)",
        zIndex: 8,
        ...holeStyle[phase],
      }}>
        <div style={{
          width: 120, height: 60, borderRadius: "50%",
          background: "radial-gradient(ellipse, #000 40%, rgba(0,200,255,0.15) 70%, transparent 100%)",
          boxShadow: "0 0 40px rgba(0,200,255,0.6), 0 0 80px rgba(0,200,255,0.3), inset 0 0 30px rgba(0,0,0,1)",
          border: "2px solid rgba(0,200,255,0.5)",
          position: "relative",
          animation: phase === "fall" ? "holePulse 0.4s ease-in-out infinite" : "none",
        }}>
          <div style={{
            position: "absolute", inset: 8, borderRadius: "50%",
            background: "radial-gradient(ellipse, #000 60%, rgba(0,50,80,0.5) 100%)",
            boxShadow: "inset 0 0 20px rgba(0,200,255,0.4)",
          }} />
          {phase === "fall" && [0,60,120,180,240,300].map((deg, i) => (
            <div key={i} style={{
              position: "absolute", top: "50%", left: "50%",
              width: 40, height: 1,
              background: "rgba(0,200,255,0.4)",
              transformOrigin: "0 50%",
              transform: `rotate(${deg}deg)`,
              animation: `swirlLine 0.5s ${i * 0.08}s linear infinite`,
            }} />
          ))}
        </div>
      </div>

      {/* Robot character */}
      <div style={{
        position: "absolute", bottom: "28%",
        zIndex: 9,
        width: "clamp(60px,10vw,120px)",
        ...robotStyle[phase],
      }}>
        <svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", filter: "drop-shadow(0 0 12px rgba(0,200,255,0.6))" }}>
          <line x1="50" y1="12" x2="50" y2="2" stroke="#00c8ff" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="50" cy="0" r="5" fill="#ff00ff">
            <animate attributeName="fill" values="#ff00ff;#00ffff;#ff00ff" dur="0.8s" repeatCount="indefinite"/>
          </circle>
          <rect x="22" y="12" width="56" height="44" rx="10" fill="#0d2a3a" stroke="#00c8ff" strokeWidth="2"/>
          <rect x="24" y="14" width="52" height="40" rx="9" fill="url(#headGrad)"/>
          <rect x="28" y="18" width="44" height="32" rx="5" fill="#041018" stroke="rgba(0,200,255,0.3)" strokeWidth="1"/>
          <circle cx="40" cy="32" r="7" fill="#000918" stroke="#00c8ff" strokeWidth="1.5"/>
          <circle cx="60" cy="32" r="7" fill="#000918" stroke="#00c8ff" strokeWidth="1.5"/>
          <circle cx="40" cy="32" r="4" fill="#00c8ff">
            <animate attributeName="r" values="4;5;4" dur="1.2s" repeatCount="indefinite"/>
            <animate attributeName="fill" values="#00c8ff;#ffffff;#00c8ff" dur="1.2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="60" cy="32" r="4" fill="#00c8ff">
            <animate attributeName="r" values="4;5;4" dur="1.2s" begin="0.6s" repeatCount="indefinite"/>
            <animate attributeName="fill" values="#00c8ff;#ffffff;#00c8ff" dur="1.2s" begin="0.6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="41" cy="31" r="1.5" fill="#001a2e"/>
          <circle cx="61" cy="31" r="1.5" fill="#001a2e"/>
          <rect x="35" y="42" width="30" height="5" rx="2.5" fill="#041018" stroke="rgba(0,200,255,0.4)" strokeWidth="1"/>
          {[0,6,12,18,24].map(x => (
            <line key={x} x1={37+x} y1="43" x2={37+x} y2="46" stroke="rgba(0,200,255,0.5)" strokeWidth="1"/>
          ))}
          <rect x="40" y="56" width="20" height="8" rx="3" fill="#0a1f2e"/>
          <rect x="15" y="64" width="70" height="48" rx="8" fill="#0d2a3a" stroke="#00c8ff" strokeWidth="1.5"/>
          <rect x="17" y="66" width="66" height="44" rx="7" fill="url(#bodyGrad)"/>
          <rect x="28" y="72" width="44" height="28" rx="5" fill="#041018" stroke="rgba(0,200,255,0.25)" strokeWidth="1"/>
          <circle cx="38" cy="82" r="5" fill="#00ff88">
            <animate attributeName="fill" values="#00ff88;#00ffcc;#00ff88" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="r" values="5;6;5" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="50" cy="82" r="5" fill="#ffaa00">
            <animate attributeName="fill" values="#ffaa00;#ffdd00;#ffaa00" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="62" cy="82" r="5" fill="#ff4444">
            <animate attributeName="fill" values="#ff4444;#ff8888;#ff4444" dur="1s" begin="0.6s" repeatCount="indefinite"/>
          </circle>
          <rect x="30" y="93" width="40" height="4" rx="2" fill="#020c14"/>
          <rect x="30" y="93" rx="2" height="4" fill="url(#progressGrad)">
            <animate attributeName="width" values="0;40;20;40" dur="2s" repeatCount="indefinite"/>
          </rect>
          <rect x="2" y="66" width="12" height="36" rx="6" fill="#0a1f2e" stroke="#00c8ff" strokeWidth="1"/>
          <rect x="3" y="67" width="10" height="34" rx="5" fill="url(#armGrad)"/>
          <circle cx="8" cy="66" r="5" fill="#0d2a3a" stroke="#00c8ff" strokeWidth="1"/>
          <rect x="3" y="100" width="10" height="8" rx="3" fill="#0a1f2e" stroke="#00c8ff" strokeWidth="1">
            <animateTransform attributeName="transform" type="rotate" values="0 8 104;-15 8 104;0 8 104" dur="0.6s" repeatCount="indefinite"/>
          </rect>
          <rect x="86" y="66" width="12" height="36" rx="6" fill="#0a1f2e" stroke="#00c8ff" strokeWidth="1"/>
          <rect x="87" y="67" width="10" height="34" rx="5" fill="url(#armGrad)"/>
          <circle cx="92" cy="66" r="5" fill="#0d2a3a" stroke="#00c8ff" strokeWidth="1"/>
          <rect x="87" y="100" width="10" height="8" rx="3" fill="#0a1f2e" stroke="#00c8ff" strokeWidth="1">
            <animateTransform attributeName="transform" type="rotate" values="0 92 104;15 92 104;0 92 104" dur="0.6s" repeatCount="indefinite"/>
          </rect>
          <rect x="24" y="112" width="18" height="18" rx="5" fill="#0a1f2e" stroke="#00c8ff" strokeWidth="1">
            <animateTransform attributeName="transform" type="rotate" values="0 33 112;5 33 112;-5 33 112;0 33 112" dur="0.5s" repeatCount="indefinite"/>
          </rect>
          <rect x="58" y="112" width="18" height="18" rx="5" fill="#0a1f2e" stroke="#00c8ff" strokeWidth="1">
            <animateTransform attributeName="transform" type="rotate" values="0 67 112;-5 67 112;5 67 112;0 67 112" dur="0.5s" repeatCount="indefinite"/>
          </rect>
          <rect x="20" y="127" width="24" height="6" rx="3" fill="#05121e" stroke="#00c8ff" strokeWidth="1">
            <animateTransform attributeName="transform" type="rotate" values="0 33 112;5 33 112;-5 33 112;0 33 112" dur="0.5s" repeatCount="indefinite"/>
          </rect>
          <rect x="56" y="127" width="24" height="6" rx="3" fill="#05121e" stroke="#00c8ff" strokeWidth="1">
            <animateTransform attributeName="transform" type="rotate" values="0 67 112;-5 67 112;5 67 112;0 67 112" dur="0.5s" repeatCount="indefinite"/>
          </rect>
          <defs>
            <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a4a6a"/>
              <stop offset="100%" stopColor="#0d2a3a"/>
            </linearGradient>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a3a50"/>
              <stop offset="100%" stopColor="#0a1f2e"/>
            </linearGradient>
            <linearGradient id="armGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1a3a50"/>
              <stop offset="100%" stopColor="#0a1f2e"/>
            </linearGradient>
            <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00c8ff"/>
              <stop offset="100%" stopColor="#8040ff"/>
            </linearGradient>
          </defs>
        </svg>
        {(phase === "walk" || phase === "holeOpen") && (
          <div style={{
            position: "absolute", top: -50, left: "50%", transform: "translateX(-50%)",
            background: "rgba(0,20,40,0.9)", border: "1px solid rgba(0,200,255,0.5)",
            borderRadius: 8, padding: "6px 12px", whiteSpace: "nowrap",
            fontSize: 11, fontFamily: "monospace", color: "#00c8ff",
            boxShadow: "0 0 15px rgba(0,200,255,0.3)",
            animation: "fadeInUp 0.3s ease",
          }}>
            {phase === "holeOpen" ? "Oh no... a void!" : "Booting Astralearnia..."}
            <div style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", width: 10, height: 6, overflow: "hidden" }}>
              <div style={{ width: 10, height: 10, background: "rgba(0,20,40,0.9)", border: "1px solid rgba(0,200,255,0.5)", transform: "rotate(45deg)", marginTop: -5, marginLeft: 0 }} />
            </div>
          </div>
        )}
      </div>

      {phase === "fall" && Array.from({ length: 12 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute", bottom: "28%", left: "50%",
          width: 4, height: 4, borderRadius: "50%",
          background: i % 2 === 0 ? "#00c8ff" : "#8040ff",
          transform: `rotate(${i * 30}deg)`,
          animation: `particleBurst ${i * 0.03}s ease forwards`,
          zIndex: 10,
        }} />
      ))}

      <style>{`
        @keyframes twinkle { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes fadeInDown { from{opacity:0;transform:translate(-50%,-20px)} to{opacity:1;transform:translate(-50%,0)} }
        @keyframes loadBar { from{width:0%} to{width:100%} }
        @keyframes holePulse { 0%,100%{box-shadow:0 0 40px rgba(0,200,255,0.6),0 0 80px rgba(0,200,255,0.3)} 50%{box-shadow:0 0 70px rgba(0,200,255,0.9),0 0 120px rgba(0,200,255,0.5)} }
        @keyframes particleBurst { from{transform:rotate(var(--r)) translateX(0) scale(1);opacity:1} to{transform:rotate(var(--r)) translateX(80px) scale(0);opacity:0} }
        @keyframes fadeInUp { from{opacity:0;transform:translate(-50%,10px)} to{opacity:1;transform:translate(-50%,0)} }
      `}</style>
    </div>
  );
}

// ─── AnimatedHeading ──────────────────────────────────────────────
// Renders the big headline with per-animation-type effects.
// ALL delays are baked into the animation shorthand string —
// no separate animationDelay prop — eliminating the console warning.
function AnimatedHeading({
  message,
  visible,
}: {
  message: AnimMessage;
  visible: boolean;
}) {
  const { text, anim, highlight, accent } = message;
  const words = text.split(" ");

  const isHighlightWord = (word: string, wi: number): boolean => {
    if (!highlight) return false;
    const hw = highlight.trim().split(" ");
    const tw = text.trim().split(" ");
    return hw.includes(word) && wi >= tw.length - hw.length;
  };

  // ── gravity: every letter tumbles down ──────────────────────────
  if (anim === "gravity") {
    const letters = text.split("").map((char, i) => ({ char, i }));
    const highlightStart = highlight ? text.indexOf(highlight) : -1;
    return (
      <span style={{ display: "inline-block" }} aria-label={text}>
        {letters.map(({ char, i }) => (
          <span key={i} style={{
            display: "inline-block",
            animation: visible
              ? `gravityFall 0.7s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.038}s both`
              : "none",
            whiteSpace: char === " " ? "pre" : "normal",
            color: char !== " " && highlightStart >= 0 && i >= highlightStart ? accent : undefined,
          }}>{char}</span>
        ))}
      </span>
    );
  }

  // ── extrude: word-level 3D Y-rotation ───────────────────────────
  if (anim === "extrude") {
    return (
      <span style={{ display: "inline-block", perspective: "600px" }} aria-label={text}>
        {words.map((word, wi) => (
          <span key={wi} style={{
            display: "inline-block",
            marginRight: "0.28em",
            animation: visible
              ? `extrudeReveal 0.85s cubic-bezier(0.23,1,0.32,1) ${wi * 0.12}s both`
              : "none",
            transformStyle: "preserve-3d",
            color: isHighlightWord(word, wi) ? accent : undefined,
          }}>{word}</span>
        ))}
      </span>
    );
  }

  // ── glitch: chaos shake + red/cyan ghost splits ──────────────────
  if (anim === "glitch") {
    return (
      <span style={{ display: "inline-block" }} aria-label={text}>
        {words.map((word, wi) => (
          <span key={wi} style={{ display: "inline-block", marginRight: "0.28em", position: "relative" }}>
            <span aria-hidden style={{
              position: "absolute", top: 0, left: 0, color: "#ff4444",
              animation: visible ? `glitchR 0.55s ease ${wi * 0.09}s both` : "none",
              opacity: 0.75,
              clipPath: "polygon(0 0,100% 0,100% 45%,0 45%)",
              pointerEvents: "none",
            }}>{word}</span>
            <span aria-hidden style={{
              position: "absolute", top: 0, left: 0, color: "#00ffff",
              animation: visible ? `glitchC 0.55s ease ${wi * 0.09}s both` : "none",
              opacity: 0.75,
              clipPath: "polygon(0 55%,100% 55%,100% 100%,0 100%)",
              pointerEvents: "none",
            }}>{word}</span>
            <span style={{
              display: "inline-block",
              animation: visible ? `glitchShake 0.55s ease ${wi * 0.09}s both` : "none",
              color: isHighlightWord(word, wi) ? accent : undefined,
            }}>{word}</span>
          </span>
        ))}
      </span>
    );
  }

  // ── kinetic: lightning-fast zoom + spin per word ─────────────────
  if (anim === "kinetic") {
    return (
      <span style={{ display: "inline-block" }} aria-label={text}>
        {words.map((word, wi) => (
          <span key={wi} style={{
            display: "inline-block",
            marginRight: "0.28em",
            animation: visible
              ? `kineticZoom 0.45s cubic-bezier(0.175,0.885,0.32,1.275) ${wi * 0.07}s both`
              : "none",
            color: isHighlightWord(word, wi) ? accent : wi % 3 === 1 ? "rgba(255,255,255,0.75)" : undefined,
          }}>{word}</span>
        ))}
      </span>
    );
  }

  // ── masked: circle-expand reveal ────────────────────────────────
  if (anim === "masked") {
    return (
      <span style={{
        display: "inline-block",
        animation: visible ? "maskedReveal 1.1s cubic-bezier(0.25,0.46,0.45,0.94) both" : "none",
      }} aria-label={text}>
        {words.map((word, wi) => (
          <span key={wi} style={{
            display: "inline-block",
            marginRight: "0.28em",
            color: isHighlightWord(word, wi) ? accent : undefined,
          }}>{word}</span>
        ))}
      </span>
    );
  }

  return <span>{text}</span>;
}

// ─── Text + Media Slider Section ─────────────────────────────────
function TextAnimSliderSection() {
  const [idx,     setIdx]     = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  // ✅ Waveform heights derived from sin — no Math.random() → no hydration mismatch
  const waveBars = Array.from({ length: 18 }, (_, wi) =>
    30 + Math.sin(wi * 0.8) * 55 + 15
  );

  const total = ANIM_MESSAGES.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % total);
        setVisible(true);
      }, 500);
    }, 5000);
    return () => clearInterval(timer);
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
    <section style={{
      position: "relative",
      background: "#030609",
      padding: "clamp(48px,8vw,112px) 0",
      overflow: "hidden",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}>
      {/* Ambient blob */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${ms.glow}, transparent)`,
        transition: "background 0.8s ease",
      }} />

      <div style={{
        margin: "0 auto", width: "100%", maxWidth: 1280,
        padding: "0 clamp(16px,4vw,48px)",
        position: "relative", zIndex: 1,
      }}>

        {/* ── Top bar ── */}
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: "clamp(24px,4vw,48px)" }}>
          {/* Eyebrow pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px", borderRadius: 99,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.04)",
            fontSize: "clamp(9px,1.1vw,11px)", fontWeight: 900,
            letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#fff",
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: msg.accent, boxShadow: `0 0 8px ${msg.accent}`,
              animation: "dotPulse 1.4s ease-in-out infinite", flexShrink: 0,
            }} />
            {msg.eyebrow}
          </div>
          {/* Animation type badge */}
          <div style={{
            padding: "4px 10px", borderRadius: 6,
            border: `1px solid ${msg.accent}35`,
            background: `${msg.accent}10`,
            fontSize: "clamp(8px,1vw,10px)", fontWeight: 900,
            letterSpacing: "0.18em", textTransform: "uppercase" as const,
            color: msg.accent, fontFamily: "monospace",
            transition: "all 0.4s ease",
          }}>
            ◈ {ANIM_LABEL[msg.anim]}
          </div>
        </div>

        {/* ── Two-column content ── */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(28px,5vw,64px)", alignItems: "center" }}
          className="[grid-template-columns:1fr] lg:![grid-template-columns:1fr_1fr]"
        >
          {/* LEFT: Text */}
          <div>
            {/* Slide tag */}
            <div key={`tag-${idx}`} style={{
              display: "inline-block", marginBottom: 14,
              padding: "3px 10px", borderRadius: 5,
              fontSize: "clamp(8px,1vw,10px)", fontWeight: 900,
              letterSpacing: "0.22em", textTransform: "uppercase" as const,
              background: `${msg.accent}15`, border: `1px solid ${msg.accent}30`,
              color: msg.accent, fontFamily: "monospace",
              animation: visible ? "fadeSlideIn 0.4s ease both" : "none",
            }}>{msg.tag}</div>

            {/* Headline */}
            <h2 style={{
              fontSize: "clamp(2rem,6.5vw,5.5rem)",
              fontWeight: 900, lineHeight: 1.03, letterSpacing: "-0.04em",
              color: "#fff", margin: "0 0 clamp(14px,2vw,22px) 0",
              minHeight: "clamp(70px,10vw,130px)",
              display: "flex", alignItems: "center",
              opacity: visible ? 1 : 0, transition: "opacity 0.3s ease",
            }}>
              <AnimatedHeading message={msg} visible={visible} />
            </h2>

            {/* Sub */}
            <p key={`sub-${idx}`} style={{
              fontSize: "clamp(0.88rem,1.6vw,1.2rem)",
              color: "rgba(203,213,225,0.92)", fontWeight: 600,
              lineHeight: 1.7, maxWidth: "36rem",
              margin: "0 0 clamp(12px,2vw,20px) 0",
              opacity: visible ? 1 : 0, transition: "opacity 0.4s ease 0.25s",
              animation: visible ? "fadeSlideIn 0.5s ease 0.2s both" : "none",
            }}>{msg.sub}</p>

            {/* Detail — left-border proof point */}
            <p key={`det-${idx}`} style={{
              fontSize: "clamp(0.75rem,1.2vw,0.92rem)",
              color: "rgba(100,116,139,0.9)", fontWeight: 600,
              lineHeight: 1.65, maxWidth: "32rem",
              margin: "0 0 clamp(24px,3vw,36px) 0",
              borderLeft: `2px solid ${msg.accent}50`, paddingLeft: 14,
              animation: visible ? "fadeSlideIn 0.55s ease 0.38s both" : "none",
              opacity: visible ? 1 : 0, transition: "opacity 0.4s ease 0.38s",
            }}>{msg.detail}</p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/book-demo" className={btnCyan}>Experience It Live →</Link>
              <Link href="/solutions" className={btnGhost}>Explore Solutions</Link>
            </div>

            {/* Dot nav + counter */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "clamp(24px,3vw,36px)", flexWrap: "wrap" }}>
              {ANIM_MESSAGES.map((m, i) => (
                <button key={i} onClick={() => goTo(i)} title={m.eyebrow} style={{
                  width: i === idx ? 32 : 9, height: 9, borderRadius: 5,
                  border: "none", cursor: "pointer", padding: 0,
                  background: i === idx
                    ? `linear-gradient(90deg, ${msg.accent}, #a78bfa)`
                    : "rgba(255,255,255,0.14)",
                  transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  boxShadow: i === idx ? `0 0 12px ${msg.accent}80` : "none",
                }} />
              ))}
              <span style={{
                marginLeft: 4, fontSize: 11, fontFamily: "monospace",
                fontWeight: 700, letterSpacing: "0.15em", color: "rgba(100,116,139,0.7)",
              }}>
                {String(idx + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(total).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* RIGHT: Media placeholder */}
          <div key={`media-${idx}`} style={{
            position: "relative", borderRadius: 22,
            border: `1px solid ${ms.ring}`,
            background: "linear-gradient(145deg,#0d1622,#080c14)",
            overflow: "hidden", aspectRatio: "16/10",
            boxShadow: `0 0 70px ${ms.glow}, 0 0 140px ${ms.glow.replace("0.12", "0.05")}`,
            transition: "border-color 0.6s ease, box-shadow 0.6s ease",
            animation: "mediaFadeIn 0.6s cubic-bezier(0.25,0.46,0.45,0.94) both",
          }}>
            {/* Grid pattern */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: `linear-gradient(${msg.mediaAccent}10 1px,transparent 1px),linear-gradient(90deg,${msg.mediaAccent}10 1px,transparent 1px)`,
              backgroundSize: "44px 44px",
            }} />
            {/* Radial glow */}
            <div style={{
              position: "absolute", inset: 0,
              background: `radial-gradient(ellipse 65% 65% at 50% 50%, ${ms.glow}, transparent)`,
            }} />
            {/* Scanlines */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.08) 3px,rgba(0,0,0,0.08) 4px)",
            }} />

            {/* Corner accent marks */}
            {([
              { top:0,left:0,width:28,height:2 },  { top:0,left:0,width:2,height:28 },
              { top:0,right:0,width:28,height:2 },  { top:0,right:0,width:2,height:28 },
              { bottom:0,left:0,width:28,height:2 },{ bottom:0,left:0,width:2,height:28 },
              { bottom:0,right:0,width:28,height:2 },{ bottom:0,right:0,width:2,height:28 },
            ] as CSSProperties[]).map((c, ci) => (
              <div key={ci} style={{ position: "absolute", background: msg.mediaAccent, opacity: 0.65, ...c }} />
            ))}

            {/* Centre content */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "clamp(10px,2vw,18px)", padding: 28, textAlign: "center",
            }}>
              <div style={{
                width: "clamp(56px,7vw,80px)", height: "clamp(56px,7vw,80px)",
                borderRadius: "50%", background: `${msg.mediaAccent}14`,
                border: `2px solid ${msg.mediaAccent}60`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 0 30px ${msg.mediaAccent}35`,
                fontSize: "clamp(22px,3.5vw,36px)",
                animation: "iconPulse 2.2s ease-in-out infinite", cursor: "pointer",
              }}>{msg.mediaEmoji}</div>

              <div>
                <div style={{ fontSize: "clamp(0.72rem,1.4vw,1rem)", fontWeight: 900, color: "#fff", letterSpacing: "0.04em", marginBottom: 5 }}>
                  {msg.mediaLabel}
                </div>
                <div style={{ fontSize: "clamp(0.58rem,0.9vw,0.75rem)", fontWeight: 700, color: "rgba(148,163,184,0.55)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace" }}>
                  Video · Image Placeholder
                </div>
              </div>

              {/* ✅ Waveform: sin-based heights, no Math.random() */}
              <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 28 }}>
                {waveBars.map((h, wi) => (
                  <div key={wi} style={{
                    width: "clamp(3px,0.4vw,4px)", borderRadius: 2,
                    background: msg.mediaAccent, opacity: 0.45,
                    height: `${h}%`,
                    // ✅ delay baked into shorthand
                    animation: `waveBar ${0.4 + (wi % 5) * 0.12}s ${wi * 0.06}s ease-in-out infinite alternate`,
                  }} />
                ))}
              </div>
            </div>

            {/* LIVE badge */}
            <div style={{
              position: "absolute", top: 14, left: 14,
              background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)",
              border: `1px solid ${msg.mediaAccent}40`, borderRadius: 6,
              padding: "4px 10px", fontSize: 10, fontWeight: 900,
              color: msg.mediaAccent, fontFamily: "monospace", letterSpacing: "0.12em",
            }}>◉ LIVE DEMO</div>

            {/* Slide tag — top right */}
            <div style={{
              position: "absolute", top: 14, right: 14,
              background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6,
              padding: "4px 10px", fontSize: 10, fontWeight: 900,
              color: "rgba(255,255,255,0.5)", fontFamily: "monospace", letterSpacing: "0.1em",
            }}>{String(idx + 1).padStart(2, "0")} · {msg.tag}</div>

            {/* Progress bar */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.06)" }}>
              <div style={{
                height: "100%",
                background: `linear-gradient(90deg,${msg.mediaAccent},#a78bfa)`,
                animation: "progressSweep 5s linear infinite",
                transformOrigin: "left center",
              }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gravityFall {
          0%  { transform:translateY(-90px) rotate(-25deg) scale(0.6); opacity:0; }
          55% { transform:translateY(10px) rotate(6deg) scale(1.05); opacity:1; }
          75% { transform:translateY(-5px) rotate(-3deg) scale(0.98); }
          90% { transform:translateY(3px) rotate(1deg); }
          100%{ transform:translateY(0) rotate(0deg) scale(1); opacity:1; }
        }
        @keyframes extrudeReveal {
          0%  { transform:perspective(500px) rotateY(-90deg) translateZ(40px); opacity:0; }
          65% { transform:perspective(500px) rotateY(8deg) translateZ(4px); opacity:1; }
          100%{ transform:perspective(500px) rotateY(0deg) translateZ(0); opacity:1; }
        }
        @keyframes glitchShake {
          0%  { transform:translateX(-8px) skewX(-5deg); opacity:0; }
          18% { transform:translateX(6px) skewX(5deg); opacity:1; }
          36% { transform:translateX(-4px) skewX(-3deg); }
          54% { transform:translateX(4px) skewX(2deg); }
          72% { transform:translateX(-2px) skewX(-1deg); }
          100%{ transform:translateX(0) skewX(0deg); opacity:1; }
        }
        @keyframes glitchR {
          0%  { transform:translate(-5px,-3px); opacity:0.8; }
          25% { transform:translate(4px,2px); opacity:0; }
          50% { transform:translate(-3px,-1px); opacity:0.6; }
          75% { transform:translate(2px,1px); opacity:0; }
          100%{ transform:translate(0,0); opacity:0; }
        }
        @keyframes glitchC {
          0%  { transform:translate(5px,3px); opacity:0.8; }
          25% { transform:translate(-4px,-2px); opacity:0; }
          50% { transform:translate(3px,1px); opacity:0.6; }
          75% { transform:translate(-2px,-1px); opacity:0; }
          100%{ transform:translate(0,0); opacity:0; }
        }
        @keyframes kineticZoom {
          0%  { transform:scale(0) rotate(-200deg); opacity:0; }
          55% { transform:scale(1.18) rotate(6deg); opacity:1; }
          78% { transform:scale(0.94) rotate(-2deg); }
          100%{ transform:scale(1) rotate(0deg); opacity:1; }
        }
        @keyframes maskedReveal {
          0%  { clip-path:circle(0% at 50% 50%); opacity:0; }
          20% { opacity:1; }
          100%{ clip-path:circle(160% at 50% 50%); opacity:1; }
        }
        @keyframes fadeSlideIn {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes mediaFadeIn {
          from { opacity:0; transform:scale(0.96) translateY(12px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes dotPulse {
          0%,100%{ transform:scale(1); opacity:1; }
          50%    { transform:scale(1.6); opacity:0.7; }
        }
        @keyframes iconPulse {
          0%,100%{ transform:scale(1); }
          50%    { transform:scale(1.07); }
        }
        @keyframes waveBar {
          from { transform:scaleY(0.25); }
          to   { transform:scaleY(1); }
        }
        @keyframes progressSweep {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
      `}</style>
    </section>
  );
}

// ─── Solutions Carousel ────────────────────────────────────────────
function SolutionsCarousel() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const total = SOLUTIONS_SLIDES.length;
  const touchStart = useRef<number | null>(null);

  const go = useCallback((idx: number) => {
    setAnimKey((k: number) => k + 1);
    setCurrent(idx);
  }, []);

  const prev = () => go((current - 1 + total) % total);
  const next = () => go((current + 1) % total);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    touchStart.current = null;
  };

  const slide = SOLUTIONS_SLIDES[current];

  const colorConfig: Record<SlideColor, { primary: string; glow: string; border: string; bg1: string; bg2: string }> = {
    cyan:    { primary: "#22d3ee", glow: "rgba(0,200,255,0.35)",   border: "rgba(0,200,255,0.35)",   bg1: "#0e2a35", bg2: "#091522" },
    blue:    { primary: "#60a5fa", glow: "rgba(60,120,255,0.35)",  border: "rgba(60,120,255,0.35)",  bg1: "#0c1a30", bg2: "#060d1a" },
    emerald: { primary: "#34d399", glow: "rgba(52,211,153,0.35)",  border: "rgba(52,211,153,0.35)",  bg1: "#081e12", bg2: "#040e09" },
    red:     { primary: "#f87171", glow: "rgba(248,113,113,0.35)", border: "rgba(248,113,113,0.35)", bg1: "#200a0a", bg2: "#100404" },
    violet:  { primary: "#a78bfa", glow: "rgba(167,139,250,0.35)", border: "rgba(167,139,250,0.35)", bg1: "#130a20", bg2: "#08040f" },
    fuchsia: { primary: "#e879f9", glow: "rgba(232,121,249,0.35)", border: "rgba(232,121,249,0.35)", bg1: "#1a0820", bg2: "#0c040f" },
  };
  const cc = colorConfig[slide.color];

  return (
    <section className="relative bg-[#050810] py-14 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${cc.glow.replace("0.35","0.07")}, transparent)`,
        transition: "background 0.8s ease",
      }} />

      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-14">
          <div>
            <div className={`${pill} mb-3 sm:mb-5`}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: cc.primary }} />
              Technology Division — Solutions
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              What We{" "}
              <span style={{
                background: `linear-gradient(135deg, ${cc.primary}, #a78bfa)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", transition: "all 0.5s ease",
              }}>Build & Deploy</span>
            </h2>
          </div>
          <Link href="/solutions" className={`${btnGhost} w-full sm:w-auto shrink-0`}>All Solutions →</Link>
        </div>

        <div
          onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
          style={{
            borderRadius: 24, border: `1px solid ${cc.border}`,
            background: `linear-gradient(135deg, ${cc.bg1}, ${cc.bg2})`,
            boxShadow: `0 0 80px ${cc.glow}, 0 0 160px ${cc.glow.replace("0.35","0.1")}`,
            overflow: "hidden",
            transition: "border-color 0.6s ease, box-shadow 0.6s ease, background 0.6s ease",
          }}
        >
          <div style={{ height: 3, width: "100%", background: `linear-gradient(90deg, transparent 0%, ${cc.primary} 30%, ${cc.primary} 70%, transparent 100%)`, opacity: 0.8 }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}
            className="lg:![grid-template-columns:1fr_1fr]">

            <div style={{ padding: "clamp(24px,4vw,56px)" }}>
              <div key={`content-${animKey}`} style={{ animation: `slideInContent 0.5s cubic-bezier(0.25,0.46,0.45,0.94) both` }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "6px 14px", borderRadius: 8, marginBottom: 20,
                  fontSize: "clamp(9px,1.2vw,12px)", fontWeight: 900,
                  letterSpacing: "0.18em", textTransform: "uppercase" as const,
                  border: `1px solid ${cc.primary}30`, background: `${cc.primary}10`, color: cc.primary,
                }}>
                  <span style={{ fontSize: "1.2em" }}>{slide.icon}</span>
                  {slide.category}
                </div>
                <h3 style={{ fontSize: "clamp(1.5rem,4vw,3.2rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff", marginBottom: 8 }}>
                  {slide.title}
                </h3>
                <p style={{ fontSize: "clamp(0.7rem,1.2vw,0.9rem)", fontWeight: 700, color: cc.primary, letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 20, fontFamily: "monospace" }}>
                  {slide.subtitle}
                </p>
                <p style={{ fontSize: "clamp(0.8rem,1.4vw,1.05rem)", color: "rgba(203,213,225,0.9)", lineHeight: 1.7, fontWeight: 600, marginBottom: 28, maxWidth: "36rem" }}>
                  {slide.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                  {slide.features.map((f, i) => (
                    <span key={i} style={{
                      padding: "5px 12px", borderRadius: 20,
                      fontSize: "clamp(9px,1vw,11px)", fontWeight: 800,
                      letterSpacing: "0.08em", textTransform: "uppercase" as const,
                      border: `1px solid ${cc.primary}25`, background: `${cc.primary}08`,
                      color: "rgba(203,213,225,0.85)",
                      display: "flex", alignItems: "center", gap: 5,
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cc.primary, display: "inline-block", flexShrink: 0 }} />
                      {f}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Link href="/book-demo" className={btnCyan}>Get a Demo →</Link>
                  <Link href="/contact" className={btnGhost}>Get a Quote</Link>
                </div>
              </div>
            </div>

            <div style={{ position: "relative", overflow: "hidden", minHeight: "clamp(220px,35vw,500px)", borderLeft: `1px solid ${cc.primary}15` }}>
              <div key={`media-${animKey}`} style={{ position: "absolute", inset: 0, animation: `slideInMedia 0.6s cubic-bezier(0.25,0.46,0.45,0.94) both` }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${cc.primary}12 1px,transparent 1px),linear-gradient(90deg,${cc.primary}12 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${cc.glow.replace("0.35","0.12")}, transparent)` }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                  <div style={{ fontSize: "clamp(3rem,8vw,7rem)", filter: `drop-shadow(0 0 30px ${cc.primary})`, animation: "iconFloat 3s ease-in-out infinite" }}>
                    {slide.icon}
                  </div>
                  <div style={{ fontSize: "clamp(0.6rem,1.2vw,0.85rem)", fontWeight: 900, color: "rgba(255,255,255,0.25)", letterSpacing: "0.25em", textTransform: "uppercase" as const, fontFamily: "monospace", textAlign: "center", padding: "0 24px" }}>
                    Image / Video Placeholder<br />
                    <span style={{ color: cc.primary, opacity: 0.6 }}>{slide.category}</span>
                  </div>
                  <div style={{ position: "absolute", width: "60%", paddingBottom: "60%", borderRadius: "50%", border: `1px solid ${cc.primary}20`, animation: "orbitSpin 8s linear infinite" }}>
                    <div style={{ position: "absolute", top: -5, left: "50%", width: 10, height: 10, borderRadius: "50%", background: cc.primary, boxShadow: `0 0 15px ${cc.primary}`, transform: "translateX(-50%)" }} />
                  </div>
                  <div style={{ position: "absolute", width: "80%", paddingBottom: "80%", borderRadius: "50%", border: `1px solid ${cc.primary}10`, animation: "orbitSpin 14s linear infinite reverse" }}>
                    <div style={{ position: "absolute", top: -4, left: "50%", width: 8, height: 8, borderRadius: "50%", background: "#a78bfa", boxShadow: "0 0 12px #a78bfa", transform: "translateX(-50%)" }} />
                  </div>
                </div>
                <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: `1px solid ${cc.primary}30`, borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 900, color: cc.primary, fontFamily: "monospace", letterSpacing: "0.1em" }}>
                  ◈ {slide.category.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <button onClick={prev} style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: `1px solid rgba(255,255,255,0.2)`, color: "#fff", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.borderColor = cc.primary)}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
          >‹</button>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {SOLUTIONS_SLIDES.map((s, i) => (
              <button key={i} onClick={() => go(i)} title={s.category} style={{
                width: i === current ? 32 : 10, height: 10, borderRadius: 5,
                border: "none", cursor: "pointer",
                background: i === current ? `linear-gradient(90deg,${cc.primary},#a78bfa)` : "rgba(255,255,255,0.15)",
                transition: "all 0.3s ease", padding: 0,
              }} />
            ))}
          </div>
          <button onClick={next} style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: `1px solid rgba(255,255,255,0.2)`, color: "#fff", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.borderColor = cc.primary)}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
          >›</button>
        </div>
        <div style={{ textAlign: "center", marginTop: 16, fontFamily: "monospace", fontSize: 12, color: "rgba(100,120,140,0.7)", fontWeight: 700, letterSpacing: "0.2em" }}>
          {String(current + 1).padStart(2,"0")} / {String(total).padStart(2,"0")} — {slide.category}
        </div>
      </div>

      <style>{`
        @keyframes slideInContent { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInMedia   { from{opacity:0;transform:scale(0.95)}       to{opacity:1;transform:scale(1)} }
        @keyframes iconFloat      { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-12px)} }
        @keyframes orbitSpin      { from{transform:rotate(0deg)}      to{transform:rotate(360deg)} }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN HOME PAGE
// ═══════════════════════════════════════════════════════════════════
export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  if (!introComplete) {
    return <RobotIntro onComplete={() => setIntroComplete(true)} />;
  }

  return (
    <>
      <DivisionModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <style>{`
        .hp-root { overflow-x:hidden; animation: pageReveal 0.8s ease both; }
        @keyframes pageReveal { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .hp-hero-video { aspect-ratio:16/9; max-height:220px; }
        @media(min-width:640px) { .hp-hero-video { max-height:none; } }
        .hp-division-grid { display:grid; grid-template-columns:1fr; gap:14px; }
        @media(min-width:640px) { .hp-division-grid { grid-template-columns:repeat(2,1fr); gap:20px; } }
        @media(min-width:1024px){ .hp-division-grid { gap:28px; } }
        .hp-div-img { height:100px; }
        @media(min-width:640px){ .hp-div-img { height:208px; } }
        .hp-problem-grid { display:grid; grid-template-columns:1fr; }
        @media(min-width:640px){ .hp-problem-grid { grid-template-columns:repeat(3,1fr); } }
        .hp-pillars-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
        @media(min-width:640px) { .hp-pillars-grid { gap:14px; } }
        @media(min-width:1024px){ .hp-pillars-grid { grid-template-columns:repeat(4,1fr); gap:18px; } }
        .hp-solutions-sub { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
        @media(min-width:1024px){ .hp-solutions-sub { grid-template-columns:1fr; gap:18px; } }
        .hp-solutions-sub-img { height:80px; }
        @media(min-width:640px){ .hp-solutions-sub-img { height:160px; } }
        .hp-testimonials-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
        @media(min-width:768px){ .hp-testimonials-grid { grid-template-columns:repeat(3,1fr); gap:20px; } }
        .hp-blog-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
        @media(min-width:1024px){ .hp-blog-grid { grid-template-columns:repeat(3,1fr); gap:20px; } }
        .hp-cta-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; max-width:900px; margin:0 auto; }
        @media(min-width:768px){ .hp-cta-grid { grid-template-columns:repeat(3,1fr); gap:20px; } }
        .hp-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
        @media(min-width:640px){ .hp-stats { display:flex; flex-wrap:wrap; gap:28px; } }
        .hp-hero-btns { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
        @media(min-width:640px){ .hp-hero-btns { display:flex; flex-wrap:wrap; gap:14px; } }
        .glass-card { background:rgba(13,22,34,0.7); backdrop-filter:blur(12px) saturate(140%); -webkit-backdrop-filter:blur(12px) saturate(140%); }
        .glass-panel { background:rgba(8,12,20,0.8); backdrop-filter:blur(16px) saturate(160%); -webkit-backdrop-filter:blur(16px) saturate(160%); }
      `}</style>

      <main className="hp-root bg-[#050810] text-white font-sans antialiased">

        {/* ═══════════════════════════════════════════════════════
            1. HERO
        ═══════════════════════════════════════════════════════ */}
        <section className="relative min-h-[100dvh] flex flex-col justify-start overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-5%,rgba(0,180,255,0.22),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_80%,rgba(130,50,255,0.15),transparent)]" />
            <div className="absolute inset-0 opacity-[0.035]"
              style={{ backgroundImage: `linear-gradient(rgba(0,220,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,255,1) 1px,transparent 1px)`, backgroundSize: "80px 80px" }}
            />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-32 pb-8 sm:pb-16 lg:pb-20">
            <div className={`${pill} mb-5 sm:mb-8`}>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span className="hidden sm:inline">Two Divisions. One Unified Intelligence Platform.</span>
              <span className="sm:hidden">Two Divisions. One Platform.</span>
            </div>

            <h1 className="font-black leading-[1.02] tracking-[-0.04em] text-[clamp(2rem,8vw,6rem)] max-w-6xl mb-4 sm:mb-8">
              <span className="block text-white">Engineering Intelligence.</span>
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(0,200,255,0.5)]">
                Empowering Minds.
              </span>
            </h1>

            <p className="text-sm sm:text-xl lg:text-2xl text-slate-300 max-w-3xl leading-relaxed mb-6 sm:mb-10 font-semibold">
              Astralearnia is the intelligence layer modern organisations need —
              delivering enterprise AI systems through our{" "}
              <strong className="text-white font-black">Technology Division</strong> and
              transforming human potential through our{" "}
              <strong className="text-white font-black">Institute Division</strong>.
            </p>

            <div className="hp-hero-btns mb-8 sm:mb-16 lg:mb-20">
              <Link href="/book-demo" className={`${btnCyan} text-center`}>Book a Free Demo →</Link>
              <button onClick={() => setModalOpen(true)} className={`${btnGhost} text-center`}>Explore Divisions ↓</button>
            </div>

            <div className="hp-stats border-t border-white/10 pt-5 sm:pt-10">
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

          <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 pb-12 sm:pb-24">
            <div className="hp-hero-video w-full rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d1622] to-[#080c14] flex items-center justify-center overflow-hidden relative shadow-[0_0_80px_rgba(0,200,255,0.12)]">
              <div className="text-center space-y-3 text-slate-600 pointer-events-none select-none">
                <svg className="mx-auto w-10 h-10 sm:w-16 sm:h-16 text-cyan-400/30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            ★ Animated Text + Media Slider (5-slide story)
        ═══════════════════════════════════════════════════════ */}
        <TextAnimSliderSection />

        {/* ═══════════════════════════════════════════════════════
            2. DIVISION BRIDGE
        ═══════════════════════════════════════════════════════ */}
        <section id="divisions" className="relative bg-[#080c14] py-14 sm:py-24 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(0,200,255,0.06),transparent)] pointer-events-none" />
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="text-center mb-8 sm:mb-16 lg:mb-20">
              <div className={`${pill} mb-4 sm:mb-6 mx-auto`}>Our Two Divisions</div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-tight mb-4 sm:mb-6">
                One Company. Two Powerful{" "}
                <span className="block sm:inline">
                  <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">Paths to Impact.</span>
                </span>
              </h2>
              <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-semibold">
                Whether you need AI systems for your business or transformative learning programmes for your people — Astralearnia has a dedicated division for it.
              </p>
            </div>

            <div className="hp-division-grid mb-8 sm:mb-12">
              {/* Technology */}
              <div className="group relative rounded-2xl border border-cyan-400/20 hover:border-cyan-400/50 overflow-hidden bg-[#0a1020] transition-all duration-400 hover:shadow-[0_0_60px_rgba(0,200,255,0.18)]">
                <div className="hp-div-img w-full bg-gradient-to-br from-cyan-900/25 to-blue-900/15 border-b border-cyan-400/15 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center text-slate-700 pointer-events-none select-none">
                    <div className="text-2xl sm:text-5xl mb-1 text-cyan-400/20">🖼</div>
                    <p className="text-[9px] sm:text-xs font-black uppercase tracking-widest">Technology Division</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1020] via-[#0a1020]/20 to-transparent" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4 sm:p-8 lg:p-10">
                  <div className="flex items-start justify-between mb-3 sm:mb-6">
                    <div>
                      <div className="inline-flex px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-[9px] sm:text-xs font-black uppercase tracking-widest mb-2 sm:mb-3">Division 01</div>
                      <h3 className="text-lg sm:text-3xl lg:text-4xl font-black text-white leading-tight">Astralearnia<br />Technology</h3>
                    </div>
                    <span className="text-2xl sm:text-5xl mt-1">⚡</span>
                  </div>
                  <p className="text-xs sm:text-lg text-slate-300 leading-relaxed mb-4 sm:mb-6 font-semibold">
                    We design, build, and deploy custom AI systems that turn your organisation&apos;s data into decisions. From intelligent APIs to full automation pipelines — we are the technical backbone enterprises trust.
                  </p>
                  <div className="grid grid-cols-2 gap-1 sm:gap-3 mb-4 sm:mb-8">
                    {["AI Model Dev","Decision Intel","API Platform","Data Automation","Enterprise Int.","Real-time AI"].map(f => (
                      <div key={f} className="flex items-center gap-1.5 text-[10px] sm:text-sm text-slate-300 font-semibold">
                        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan-400 shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href="/divisions/technology" className={`${btnCyan} w-full`}>Explore Technology →</Link>
                    <button onClick={() => setModalOpen(true)} className={`${btnGhost} w-full`}>Compare Divisions</button>
                  </div>
                </div>
              </div>

              {/* Institute */}
              <div className="group relative rounded-2xl border border-violet-400/20 hover:border-violet-400/50 overflow-hidden bg-[#0e0a1a] transition-all duration-400 hover:shadow-[0_0_60px_rgba(160,80,255,0.18)]">
                <div className="hp-div-img w-full bg-gradient-to-br from-violet-900/25 to-fuchsia-900/15 border-b border-violet-400/15 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center text-slate-700 pointer-events-none select-none">
                    <div className="text-2xl sm:text-5xl mb-1 text-violet-400/20">🖼</div>
                    <p className="text-[9px] sm:text-xs font-black uppercase tracking-widest">Institute Division</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a1a] via-[#0e0a1a]/20 to-transparent" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4 sm:p-8 lg:p-10">
                  <div className="flex items-start justify-between mb-3 sm:mb-6">
                    <div>
                      <div className="inline-flex px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-violet-400/10 border border-violet-400/20 text-violet-300 text-[9px] sm:text-xs font-black uppercase tracking-widest mb-2 sm:mb-3">Division 02</div>
                      <h3 className="text-lg sm:text-3xl lg:text-4xl font-black text-white leading-tight">Astralearnia<br />Institute</h3>
                    </div>
                    <span className="text-2xl sm:text-5xl mt-1">🎓</span>
                  </div>
                  <p className="text-xs sm:text-lg text-slate-300 leading-relaxed mb-4 sm:mb-6 font-semibold">
                    We transform how people learn and grow. Our adaptive AI learning engine builds personalised pathways, measures skills in real time, and delivers certifications that matter in today&apos;s market.
                  </p>
                  <div className="grid grid-cols-2 gap-1 sm:gap-3 mb-4 sm:mb-8">
                    {["Adaptive Paths","Corp Training","AI Certs","Skills Analytics","Instructor Tools","Dashboards"].map(f => (
                      <div key={f} className="flex items-center gap-1.5 text-[10px] sm:text-sm text-slate-300 font-semibold">
                        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-violet-400 shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href="/divisions/institute" className={`${btnViolet} w-full`}>Explore Institute →</Link>
                    <button onClick={() => setModalOpen(true)} className={`${btnGhost} w-full`}>Compare Divisions</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-slate-400 text-sm sm:text-lg mb-3 sm:mb-4 font-semibold">Not sure which division fits your needs?</p>
              <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-3 px-5 sm:px-10 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-400/10 via-white/5 to-violet-400/10 border-2 border-white/20 hover:border-white/40 text-white font-black text-sm sm:text-lg tracking-wide hover:bg-white/8 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto">
                ✦ Help Me Choose My Division
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            3. PROBLEM → SOLUTION
        ═══════════════════════════════════════════════════════ */}
        <section className="relative bg-[#050810] py-14 sm:py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(0,200,255,0.05),transparent)] pointer-events-none" />
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="text-center mb-8 sm:mb-16">
              <div className={`${pill} mb-4 sm:mb-6 mx-auto`}>The Problem We Solve</div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4 sm:mb-6">
                Most Companies Have Data.<br />
                <span className="text-red-400">Few Have Intelligence.</span>
              </h2>
              <p className="text-sm sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-semibold">
                Siloed tools, disconnected training, and AI that doesn&apos;t integrate. We fix all three — with one unified platform, two specialised divisions.
              </p>
            </div>
            <div className="hp-problem-grid relative">
              <div className="hidden sm:block absolute top-1/2 left-1/3 right-1/3 h-px bg-gradient-to-r from-red-500/30 via-cyan-400/50 to-emerald-400/30 -translate-y-1/2" />
              {[
                { n:"01",icon:"⚡",c:"border-red-500/30 hover:border-red-400/60",a:"text-red-400",bg:"bg-[#0e0810]", title:"The Problem",body:"Teams run on 5+ platforms that don't communicate. Insight gets buried. Training is generic. Decisions take too long." },
                { n:"02",icon:"◈",c:"border-cyan-400/30 hover:border-cyan-300/60",a:"text-cyan-300",bg:"bg-[#080c14]", title:"Astralearnia Unifies",body:"One platform ingests your data, trains your team, runs your AI models, and surfaces intelligence exactly where work happens." },
                { n:"03",icon:"✦",c:"border-emerald-500/30 hover:border-emerald-400/60",a:"text-emerald-400",bg:"bg-[#080e10]", title:"Measurable Outcomes",body:"Clients report 3× faster decisions, 40% lower training costs, and AI deployments that go live in under 48 hours." },
              ].map((item, i) => (
                <div key={i} className={`relative ${item.bg} border-2 ${item.c} p-4 sm:p-8 lg:p-10 transition-all duration-300 hover:brightness-110 hover:-translate-y-1 ${i === 0 ? "rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none" : i === 2 ? "rounded-b-2xl sm:rounded-r-2xl sm:rounded-bl-none" : ""}`}>
                  <div className={`text-3xl sm:text-5xl mb-3 sm:mb-5 ${item.a}`}>{item.icon}</div>
                  <div className={`text-[10px] sm:text-xs font-black uppercase tracking-widest ${item.a} mb-1.5 sm:mb-3`}>Step {item.n}</div>
                  <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-white mb-2 sm:mb-4 leading-tight">{item.title}</h3>
                  <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-semibold">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            4. FOUR PILLARS
        ═══════════════════════════════════════════════════════ */}
        <section className="relative bg-[#080c14] py-14 sm:py-24 lg:py-28">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-8 sm:mb-14">
              <div className={`${pill} mb-4 sm:mb-6 mx-auto`}>Core Architecture</div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">Four Pillars of Intelligence</span>
              </h2>
            </div>
            <div className="hp-pillars-grid">
              {PILLARS.map((pillar: { name: string; icon: string; description: string }) => (
                <div key={pillar.name} className="group relative bg-[#0d1622] rounded-2xl border border-white/10 hover:border-cyan-400/40 p-4 sm:p-7 lg:p-8 transition-all duration-300 hover:bg-[#101c2e] hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(0,200,255,0.15)]">
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
        <section className="relative bg-[#050810] py-14 sm:py-24 lg:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_20%,rgba(120,40,255,0.08),transparent)] pointer-events-none" />
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-14">
              <div>
                <div className={`${pill} mb-3 sm:mb-5`}>What We Deliver</div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                  Solutions Built for{" "}
                  <span className="block">
                    <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">Real Business Impact</span>
                  </span>
                </h2>
              </div>
              <Link href="/solutions" className={`${btnGhost} w-full sm:w-auto`}>Explore All Solutions →</Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4">
              <div className="lg:row-span-2 group relative bg-[#0d1622] rounded-2xl border border-cyan-400/20 hover:border-cyan-400/50 overflow-hidden hover:shadow-[0_0_55px_rgba(0,200,255,0.2)] flex flex-col transition-all duration-400">
                <div className="w-full h-36 sm:h-56 bg-gradient-to-br from-cyan-900/30 to-blue-900/20 border-b border-cyan-400/10 flex items-center justify-center relative overflow-hidden">
                  <div className="text-slate-700 text-center pointer-events-none select-none">
                    <div className="text-4xl sm:text-5xl mb-2 text-cyan-400/20">🖼</div>
                    <p className="text-xs font-black uppercase tracking-widest">Image / Video Slot</p>
                  </div>
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

              <div className="hp-solutions-sub">
                <div className="group relative bg-[#0d1622] rounded-2xl border border-violet-400/20 hover:border-violet-400/50 overflow-hidden hover:shadow-[0_0_45px_rgba(120,40,255,0.2)] flex flex-col transition-all duration-400">
                  <div className="hp-solutions-sub-img w-full bg-gradient-to-br from-violet-900/30 to-blue-900/20 border-b border-violet-400/10 flex items-center justify-center relative overflow-hidden">
                    <div className="text-slate-700 text-center pointer-events-none select-none"><div className="text-2xl sm:text-3xl mb-1 text-violet-400/20">🖼</div></div>
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
                  <div className="hp-solutions-sub-img w-full bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border-b border-blue-400/10 flex items-center justify-center relative overflow-hidden">
                    <div className="text-slate-700 text-center pointer-events-none select-none"><div className="text-2xl sm:text-3xl mb-1 text-blue-400/20">🖼</div></div>
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

        {/* ═══════════════════════════════════════════════════════
            ★ Solutions Carousel (Technology Division)
        ═══════════════════════════════════════════════════════ */}
        <SolutionsCarousel />

        {/* ═══════════════════════════════════════════════════════
            6. TESTIMONIALS
        ═══════════════════════════════════════════════════════ */}
        <section className="relative bg-[#080c14] py-14 sm:py-20 lg:py-24 border-y border-white/5">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-6 sm:mb-12">
              <div className={`${pill} mb-3 sm:mb-5 mx-auto`}>Client Results</div>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white">What Our Clients Say</h2>
            </div>
            <div className="hp-testimonials-grid">
              {[
                { quote: "Astralearnia cut our compliance training time by 60% and test scores went up immediately. ROI was clear within 3 months.", name: "Yemi Adeyemi", role: "Chief People Officer, FinCorp Africa", div: "Institute" },
                { quote: "Their API is the cleanest I've integrated in 10 years. Docs are real, endpoints stable, support responds in hours.", name: "Tunde Okonkwo", role: "Lead Engineer, DataStack NG", div: "Technology" },
                { quote: "We replaced three legacy vendors with Astralearnia. One invoice, one team, three times the output.", name: "Amara Osei", role: "CTO, Scale Ventures", div: "Technology" },
              ].map((t, i) => (
                <div key={i} className={`bg-[#0d1622] rounded-2xl border border-white/10 p-3 sm:p-7 lg:p-8 hover:border-cyan-400/30 transition-all duration-300 hover:bg-[#101c2e] ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}>
                  <div className={`inline-flex px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[9px] sm:text-xs font-black uppercase tracking-widest mb-2.5 sm:mb-4 ${t.div === "Institute" ? "text-violet-300 bg-violet-400/10 border border-violet-400/20" : "text-cyan-300 bg-cyan-400/10 border border-cyan-400/20"}`}>{t.div}</div>
                  <div className="text-lg sm:text-3xl text-white/20 mb-1.5 sm:mb-2 font-serif leading-none">&ldquo;</div>
                  <p className="text-[11px] sm:text-base text-slate-200 leading-relaxed mb-2.5 sm:mb-6 font-semibold italic">{t.quote}</p>
                  <div>
                    <div className="font-black text-white text-[11px] sm:text-sm">{t.name}</div>
                    <div className="text-[9px] sm:text-xs text-slate-500 font-semibold">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            7. BLOG
        ═══════════════════════════════════════════════════════ */}
        <section className="relative bg-[#050810] py-14 sm:py-24 lg:py-32">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-14">
              <div>
                <div className={`${pill} mb-3 sm:mb-5`}>Intelligence Insights</div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
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
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            8. FINAL CTA
        ═══════════════════════════════════════════════════════ */}
        <section className="relative bg-[#080c14] py-14 sm:py-24 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,200,255,0.1),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(130,50,255,0.08),transparent)]" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-16">
              <div className={`${pill} mb-4 sm:mb-8 mx-auto`}>Get Started Today</div>
              <h2 className="text-2xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.04] mb-4 sm:mb-8">
                Ready to See What AI{" "}
                <span className="block">
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(0,200,255,0.4)]">
                    Can Do for You?
                  </span>
                </span>
              </h2>
              <p className="text-sm sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-semibold">
                Get a personalised demo, talk to our engineers, or explore our divisions — no fluff, no commitments.
              </p>
            </div>
            <div className="hp-cta-grid">
              {[
                { icon: "📅", title: "Book a Demo", body: "See the platform live with your own data. 30-minute focused sessions tailored to your use case.", cta: "Schedule Now →", href: "/book-demo", btn: btnCyan },
                { icon: "📞", title: "Talk to Sales", body: "Speak directly with a solutions engineer about pricing, integrations, and go-live timelines.", cta: "Contact Us →", href: "/contact", btn: btnViolet },
                { icon: "🚀", title: "Free Trial", body: "Try the core platform free for 14 days. No card required. Full feature access from day one.", cta: "Start Free →", href: "/book-demo", btn: btnGhost },
              ].map((card, i) => (
                <div key={i} className={`bg-[#0d1622] rounded-2xl border-2 border-white/15 hover:border-white/30 p-3 sm:p-8 text-center flex flex-col items-center gap-2.5 sm:gap-5 transition-all duration-300 hover:bg-[#101c2e] hover:-translate-y-1 ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}>
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