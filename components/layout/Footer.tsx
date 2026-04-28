"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

const SECTIONS = [
  {
    id: "divisions",
    label: "Divisions",
    icon: "⚡",
    accent: "rgba(0,200,255,0.7)",
    accentSolid: "#00c8ff",
    links: [
      { label: "Technology Division", href: "/technologies" },
      { label: "Institute Division",  href: "/institute"    },
      { label: "Compare Divisions",   href: "/"             },
      { label: "AI Models",           href: "/divisions/technology/ai-models"      },
      { label: "Data Pipelines",      href: "/divisions/technology/data-pipelines" },
      { label: "AI Security",         href: "/divisions/technology/ai-security"    },
    ],
  },
  {
    id: "platform",
    label: "Platform",
    icon: "◈",
    accent: "rgba(124,92,255,0.7)",
    accentSolid: "#7c5cff",
    links: [
      { label: "AI Solutions",        href: "/solutions"                           },
      { label: "API & SDK",           href: "/api-docs"                            },
      { label: "Integrations",        href: "/solutions"                           },
      { label: "Individuals",         href: "/divisions/institute/individuals"     },
      { label: "Enterprise",          href: "/divisions/institute/enterprise"      },
      { label: "Certifications",      href: "/divisions/institute/certifications"  },
      { label: "Skills Analytics",    href: "/divisions/institute/skills-analytics"},
    ],
  },
  {
    id: "company",
    label: "Company",
    icon: "✦",
    accent: "rgba(0,255,160,0.6)",
    accentSolid: "#00ffa0",
    links: [
      { label: "About Us",  href: "/about"    },
      { label: "Blog",      href: "/blog"     },
      { label: "Careers",   href: "/careers"  },
      { label: "Partners",  href: "/partners" },
      { label: "Press",     href: "/press"    },
      { label: "Contact",   href: "/contact"  },
    ],
  },
  {
    id: "legal",
    label: "Legal",
    icon: "⬡",
    accent: "rgba(255,160,50,0.6)",
    accentSolid: "#ffa032",
    links: [
      { label: "Privacy Policy",   href: "/privacy"    },
      { label: "Terms of Service", href: "/terms"      },
      { label: "Cookie Policy",    href: "/cookies"    },
      { label: "Compliance",       href: "/compliance" },
      { label: "Data Processing",  href: "/dpa"        },
      { label: "Security",         href: "/security"   },
    ],
  },
];

const SOCIAL = [
  {
    label: "X / Twitter",
    href:  "https://twitter.com/astralearnia",
    color: "#1DA1F2",
    icon:  (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:13, height:13 }}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.849L1.253 2.25h6.938l4.259 5.631 5.794-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href:  "https://linkedin.com/company/astralearnia",
    color: "#0A66C2",
    icon:  (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:13, height:13 }}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href:  "https://github.com/astralearnia",
    color: "#e2e8f0",
    icon:  (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:13, height:13 }}>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href:  "https://youtube.com/@astralearnia",
    color: "#FF0000",
    icon:  (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:13, height:13 }}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

interface GridNode { x: number; y: number; pulse: number; delay: number; }

export function Footer() {
  const [year, setYear]               = useState(2025);
  const [logoError, setLogoError]     = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [gridNodes]                   = useState<GridNode[]>(() =>
    Array.from({ length: 30 }, (_, i) => ({
      x: (i % 6) * 20 + Math.random() * 8,
      y: Math.floor(i / 6) * 22 + Math.random() * 8,
      pulse: Math.random(),
      delay: Math.random() * 3,
    }))
  );
  const [scanPos, setScanPos]         = useState(0);
  const canvasRef                     = useRef<HTMLCanvasElement>(null);
  const rafRef                        = useRef<number>(0);

  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  // Scan line
  useEffect(() => {
    let f = 0;
    const tick = () => { f = (f + 1) % 200; setScanPos(f / 200); rafRef.current = requestAnimationFrame(tick); };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Canvas holographic grid
  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width = canvas.offsetWidth;
    const h = canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, w, h);
    const t = Date.now() / 1000;

    // Grid lines
    ctx.strokeStyle = "rgba(0,200,255,0.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 60) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 60) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Floating nodes
    gridNodes.forEach(node => {
      const nx = (node.x / 100) * w;
      const ny = (node.y / 100) * h;
      const alpha = (Math.sin(t * 1.2 + node.delay * 2) * 0.5 + 0.5) * 0.4;
      ctx.beginPath();
      ctx.arc(nx, ny, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,200,255,${alpha})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(nx, ny, 6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,200,255,${alpha * 0.2})`;
      ctx.fill();
    });

    // Connection lines between nearby nodes
    gridNodes.forEach((a, i) => {
      gridNodes.slice(i + 1).forEach(b => {
        const dx = (a.x - b.x) / 100 * w;
        const dy = (a.y - b.y) / 100 * h;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.06;
          ctx.beginPath();
          ctx.moveTo((a.x / 100) * w, (a.y / 100) * h);
          ctx.lineTo((b.x / 100) * w, (b.y / 100) * h);
          ctx.strokeStyle = `rgba(0,200,255,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(drawGrid);
  }, [gridNodes]);

  useEffect(() => {
    const id = requestAnimationFrame(drawGrid);
    return () => cancelAnimationFrame(id);
  }, [drawGrid]);

  return (
    <footer style={{ background:"#020408", borderTop:"1px solid rgba(255,255,255,0.05)", position:"relative", overflow:"hidden" }}>

      {/* ── CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Exo+2:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        @keyframes _ft_shimmer   { 0%{background-position:-700px 0} 100%{background-position:700px 0} }
        @keyframes _ft_pulse     { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.6)} }
        @keyframes _ft_fadein    { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
        @keyframes _ft_beam      { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes _ft_borderFlow{ 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes _ft_scanline  { 0%{top:-5%} 100%{top:105%} }
        @keyframes _ft_float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes _ft_logoSpin  { from{transform:rotateY(0)} to{transform:rotateY(360deg)} }
        @keyframes _ft_glitch1   { 0%,100%{clip-path:inset(0 0 95% 0)} 20%{clip-path:inset(35% 0 45% 0)} 50%{clip-path:inset(65% 0 15% 0)} 75%{clip-path:inset(10% 0 75% 0)} }
        @keyframes _ft_glitch2   { 0%,100%{clip-path:inset(0 0 98% 0)} 30%{clip-path:inset(25% 0 55% 0);transform:translateX(-3px)} 60%{clip-path:inset(55% 0 25% 0);transform:translateX(3px)} }
        @keyframes _ft_linkHolo  { 0%,100%{opacity:0.7} 50%{opacity:1} }
        @keyframes _ft_ripple    { 0%{transform:scale(0);opacity:0.5} 100%{transform:scale(4);opacity:0} }
        @keyframes _ft_socGlow   { 0%,100%{box-shadow:none} 50%{box-shadow:0 0 20px var(--soc-color,#00c8ff)} }
        @keyframes _ft_cornerAnim{ 0%,100%{opacity:0.3} 50%{opacity:1} }
        @keyframes _ft_statusPulse{ 0%,100%{transform:scale(1);opacity:0.7} 50%{transform:scale(1.4);opacity:1} }

        /* Scroll row */
        .ft-scroll-row {
          display:flex; gap:10px;
          overflow-x:auto; scroll-snap-type:x mandatory;
          -webkit-overflow-scrolling:touch; scrollbar-width:none; padding-bottom:4px;
        }
        .ft-scroll-row::-webkit-scrollbar { display:none; }
        @media(min-width:768px) {
          .ft-scroll-row { display:grid; grid-template-columns:repeat(4,1fr); overflow-x:visible; }
        }

        /* Section card */
        .ft-sec-card {
          min-width:168px; flex-shrink:0; scroll-snap-align:start;
          border:1px solid rgba(255,255,255,0.07); border-radius:16px;
          padding:18px 16px 20px;
          background:rgba(255,255,255,0.025);
          display:flex; flex-direction:column; gap:0;
          transition:border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          position:relative; overflow:hidden;
          cursor:default;
        }
        .ft-sec-card::before {
          content:""; position:absolute; top:0; left:0; right:0; height:2px;
          border-radius:16px 16px 0 0;
          background:var(--card-accent, rgba(0,200,255,0.6));
          opacity:0; transition:opacity 0.3s ease;
        }
        .ft-sec-card:hover::before { opacity:1; }
        .ft-sec-card:hover {
          border-color:var(--card-accent, rgba(0,200,255,0.4));
          background:rgba(0,200,255,0.03);
          box-shadow:0 0 30px var(--card-glow, rgba(0,200,255,0.08)), inset 0 0 20px rgba(0,200,255,0.03);
          transform:translateY(-2px);
        }
        @media(min-width:768px) { .ft-sec-card { min-width:unset; } }

        /* Link */
        .ft-link {
          display:flex; align-items:center; gap:8px;
          color:rgba(255,255,255,0.42);
          font-family:'Exo 2', sans-serif;
          font-size:0.9rem; font-weight:500; letter-spacing:0.04em;
          text-decoration:none; padding:5px 2px; line-height:1.2;
          transition:color 0.18s ease, transform 0.18s ease, letter-spacing 0.18s ease;
          position:relative; border-radius:4px;
        }
        .ft-link:hover {
          color:rgba(255,255,255,0.95);
          transform:translateX(4px);
          letter-spacing:0.07em;
        }
        .ft-link-dot {
          width:4px; height:4px; border-radius:50%; flex-shrink:0; opacity:0.4;
          transition:opacity 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
        }
        .ft-link:hover .ft-link-dot {
          opacity:1; transform:scale(1.8);
          box-shadow:0 0 6px var(--dot-color, #00c8ff);
        }
        .ft-link-arrow {
          margin-left:auto; opacity:0; font-size:0.6em;
          transform:translateX(-4px);
          transition:opacity 0.18s ease, transform 0.18s ease;
        }
        .ft-link:hover .ft-link-arrow { opacity:0.6; transform:translateX(0); }

        /* Column header */
        .ft-col-head {
          font-size:0.58rem; font-weight:700; letter-spacing:0.28em; text-transform:uppercase;
          margin-bottom:14px; padding-bottom:10px;
          border-bottom:1px solid rgba(255,255,255,0.06);
          display:flex; align-items:center; gap:6px;
          font-family:'Space Mono', monospace;
          transition:letter-spacing 0.3s ease;
        }
        .ft-sec-card:hover .ft-col-head { letter-spacing:0.32em; }

        /* Scroll hint */
        .ft-scroll-hint {
          display:flex; align-items:center; gap:5px; font-size:0.6rem; font-weight:700;
          letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:10px;
        }
        @media(min-width:768px) { .ft-scroll-hint { display:none; } }

        /* Social button */
        .ft-soc-btn {
          width:32px; height:32px; border-radius:9px;
          display:flex; align-items:center; justify-content:center;
          background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
          color:rgba(255,255,255,0.35); text-decoration:none; flex-shrink:0;
          transition:all 0.25s cubic-bezier(0.34,1.56,0.64,1);
          position:relative; overflow:hidden;
        }
        .ft-soc-btn:hover {
          transform:translateY(-3px) scale(1.1);
          color:#fff;
        }
        .ft-soc-btn::after {
          content:""; position:absolute; inset:0;
          background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.2) 50%,transparent 70%);
          opacity:0; transition:opacity 0.3s ease;
        }
        .ft-soc-btn:hover::after { opacity:1; animation:_ft_beam 0.5s ease; }

        /* Logo hover */
        .ft-logo-wrap {
          display:inline-flex; align-items:center; gap:10px;
          text-decoration:none; margin-bottom:16px;
          transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ft-logo-wrap:hover { transform:scale(1.05); }

        /* Holographic card corners */
        .ft-holo-corner {
          position:absolute; width:8px; height:8px;
          opacity:0; transition:opacity 0.3s ease;
          animation:_ft_cornerAnim 2s ease-in-out infinite;
        }
        .ft-sec-card:hover .ft-holo-corner { opacity:1; }
        .ft-holo-corner.tl { top:6px; left:6px; border-top:1.5px solid; border-left:1.5px solid; border-radius:1px 0 0 0; }
        .ft-holo-corner.tr { top:6px; right:6px; border-top:1.5px solid; border-right:1.5px solid; border-radius:0 1px 0 0; }
        .ft-holo-corner.bl { bottom:6px; left:6px; border-bottom:1.5px solid; border-left:1.5px solid; border-radius:0 0 0 1px; }
        .ft-holo-corner.br { bottom:6px; right:6px; border-bottom:1.5px solid; border-right:1.5px solid; border-radius:0 0 1px 0; }

        /* Ripple */
        .ft-ripple {
          position:absolute; border-radius:50%;
          pointer-events:none; animation:_ft_ripple 0.6s ease-out forwards;
          transform-origin:center;
        }
      `}</style>

      {/* Canvas background grid */}
      <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", opacity:0.6 }} />

      {/* Ambient glow */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 80% 30% at 50% 0%,rgba(0,200,255,0.05),transparent)" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 60% 40% at 80% 100%,rgba(124,92,255,0.04),transparent)" }} />

      {/* Top gradient bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent 0%,rgba(0,200,255,0.3) 30%,rgba(124,92,255,0.3) 65%,transparent 100%)", backgroundSize:"200% 100%", animation:"_ft_borderFlow 6s linear infinite" }} />

      {/* Scan line */}
      <div style={{ position:"absolute", left:0, right:0, height:1, top:`${scanPos * 100}%`, background:"linear-gradient(90deg,transparent,rgba(0,200,255,0.12) 30%,rgba(0,200,255,0.3) 50%,rgba(0,200,255,0.12) 70%,transparent)", pointerEvents:"none", zIndex:1 }} />

      {/* CRT scanlines */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,200,255,0.008) 3px,rgba(0,200,255,0.008) 4px)", zIndex:0 }} />

      <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 16px", position:"relative", zIndex:2 }} className="sm:px-6 lg:px-12">

        {/* ════ TOP — centred brand block ════ */}
        <div style={{ textAlign:"center", paddingTop:56, paddingBottom:36, borderBottom:"1px solid rgba(255,255,255,0.05)" }}>

          {/* Logo + Brand name — stacked vertically, centered */}
          <div
            style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:16, cursor:"pointer" }}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            {/* Logo icon */}
            <Link href="/" style={{ textDecoration:"none", marginBottom:14, display:"block" }}>
              <div style={{
                width:52, height:52, borderRadius:14, flexShrink:0, overflow:"hidden",
                display:"flex", alignItems:"center", justifyContent:"center",
                background: logoError ? "linear-gradient(135deg,#00c8ff,#7c5cff)" : "#fff",
                border: logoError ? "none" : "2px solid rgba(255,255,255,0.9)",
                boxShadow: logoHovered
                  ? "0 0 28px rgba(0,200,255,0.7),0 0 56px rgba(124,92,255,0.4),0 4px 20px rgba(255,255,255,0.15)"
                  : "0 4px 20px rgba(255,255,255,0.14)",
                padding:4, transition:"box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                transform: logoHovered ? "scale(1.1)" : "scale(1)",
                position:"relative",
              }}>
                {/* Scan line over logo */}
                {logoHovered && (
                  <div style={{ position:"absolute", left:0, right:0, height:1, top:`${scanPos * 100}%`, background:"rgba(0,200,255,0.8)", pointerEvents:"none", zIndex:10 }} />
                )}
                {!logoError ? (
                  <Image src="/favicon.png" alt="Astralearnia" width={40} height={40}
                    style={{
                      objectFit:"contain", borderRadius:10,
                      filter: logoHovered ? "drop-shadow(0 0 8px rgba(0,200,255,0.9))" : "none",
                      transition:"filter 0.3s ease",
                    }}
                    unoptimized onError={() => setLogoError(true)}
                  />
                ) : (
                  <span style={{ fontWeight:900, color:"#fff", fontSize:"1.3rem" }}>A</span>
                )}
              </div>
            </Link>

            {/* Large brand name with glitch */}
            <Link href="/" style={{ textDecoration:"none" }}>
              <div style={{ position:"relative", display:"inline-block" }}>
                <div style={{
                  fontFamily:"'Syncopate', sans-serif",
                  fontWeight:900, fontSize:"clamp(1.4rem,5vw,3rem)",
                  letterSpacing:"0.12em", lineHeight:1, marginBottom:10,
                  textTransform:"uppercase",
                  background:"linear-gradient(90deg,rgba(0,200,255,.7) 0%,#fff 25%,rgba(60,100,255,.8) 45%,#fff 60%,rgba(124,92,255,.8) 80%,rgba(0,200,255,.7) 100%)",
                  backgroundSize:"700px 100%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                  backgroundClip:"text", animation:"_ft_shimmer 6s linear infinite",
                }}>ASTRALEARNIA</div>
                {logoHovered && (<>
                  <div aria-hidden style={{
                    position:"absolute", top:0, left:0, right:0,
                    fontFamily:"'Syncopate', sans-serif",
                    fontWeight:900, fontSize:"clamp(1.4rem,5vw,3rem)", letterSpacing:"0.12em", textTransform:"uppercase",
                    color:"#00c8ff", opacity:0.4, animation:"_ft_glitch1 0.3s steps(1) infinite",
                    transform:"translateX(-3px)", whiteSpace:"nowrap",
                    WebkitTextFillColor:"#00c8ff",
                  }}>ASTRALEARNIA</div>
                  <div aria-hidden style={{
                    position:"absolute", top:0, left:0, right:0,
                    fontFamily:"'Syncopate', sans-serif",
                    fontWeight:900, fontSize:"clamp(1.4rem,5vw,3rem)", letterSpacing:"0.12em", textTransform:"uppercase",
                    color:"#e879f9", opacity:0.3, animation:"_ft_glitch2 0.3s steps(1) infinite",
                    transform:"translateX(3px)", whiteSpace:"nowrap",
                    WebkitTextFillColor:"#e879f9",
                  }}>ASTRALEARNIA</div>
                </>)}
              </div>
            </Link>
          </div>

          {/* Tagline */}
          <div style={{ fontFamily:"'Exo 2', sans-serif", fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.25em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:8 }}>
            Engineering Intelligence&nbsp;·&nbsp;Empowering Minds
          </div>
          <div style={{ fontFamily:"'Space Mono', monospace", fontSize:"0.58rem", fontWeight:400, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(0,200,255,0.35)", marginBottom:22 }}>
            ◈ AR/VR INTELLIGENCE PLATFORM · EST. 2024
          </div>

          {/* Division pills */}
          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
            {[
              { href:"/technologies", label:"⚡ Technology Division", bg:"rgba(0,200,255,0.07)", border:"rgba(0,200,255,0.22)", color:"rgba(0,200,255,0.85)", hBg:"rgba(0,200,255,0.14)", hBorder:"rgba(0,200,255,0.5)", dot:"#00c8ff", glow:"rgba(0,200,255,0.4)" },
              { href:"/institute",    label:"🎓 Institute Division",   bg:"rgba(168,85,247,0.07)", border:"rgba(168,85,247,0.22)", color:"rgba(168,85,247,0.85)", hBg:"rgba(168,85,247,0.14)", hBorder:"rgba(168,85,247,0.5)", dot:"#a855f7", glow:"rgba(168,85,247,0.4)" },
            ].map(pill => (
              <Link key={pill.href} href={pill.href} style={{
                display:"inline-flex", alignItems:"center", gap:6,
                fontSize:"0.6rem", fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase",
                padding:"7px 16px", borderRadius:20,
                background:pill.bg, border:`1px solid ${pill.border}`,
                color:pill.color, textDecoration:"none",
                transition:"all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                position:"relative", overflow:"hidden",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = pill.hBg;
                  e.currentTarget.style.borderColor = pill.hBorder;
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.04)";
                  e.currentTarget.style.boxShadow = `0 6px 24px ${pill.glow}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = pill.bg;
                  e.currentTarget.style.borderColor = pill.border;
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span style={{ width:5, height:5, borderRadius:"50%", background:pill.dot, boxShadow:`0 0 6px ${pill.dot}`, flexShrink:0, animation:"_ft_pulse 2s infinite" }} />
                {pill.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ════ MIDDLE — scrollable section cards ════ */}
        <div style={{ paddingTop:28, paddingBottom:32 }}>
          <div className="ft-scroll-hint">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            Scroll to see more sections
          </div>

          <div className="ft-scroll-row">
            {SECTIONS.map(sec => (
              <div
                key={sec.id}
                className="ft-sec-card"
                style={{ "--card-accent":sec.accent, "--card-glow":sec.accent.replace("0.7","0.12") } as React.CSSProperties}
                onMouseEnter={() => setHoveredSection(sec.id)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {/* Holographic corners */}
                {["tl","tr","bl","br"].map(pos => (
                  <span key={pos} className={`ft-holo-corner ${pos}`} style={{ borderColor: sec.accentSolid, animationDelay:`${pos === "tr" ? "0.5s" : pos === "bl" ? "1s" : pos === "br" ? "1.5s" : "0s"}` }} />
                ))}

                {/* Scan line on hover */}
                {hoveredSection === sec.id && (
                  <div style={{ position:"absolute", left:0, right:0, height:1, top:`${scanPos * 100}%`, background:`linear-gradient(90deg,transparent,${sec.accentSolid}60,transparent)`, pointerEvents:"none", zIndex:5 }} />
                )}

                {/* Header */}
                <div className="ft-col-head" style={{ color: sec.accent }}>
                  <span style={{
                    width:20, height:20, borderRadius:5,
                    background:`${sec.accentSolid}18`, border:`1px solid ${sec.accentSolid}35`,
                    display:"inline-flex", alignItems:"center", justifyContent:"center",
                    fontSize:"0.7em", flexShrink:0,
                    boxShadow: hoveredSection === sec.id ? `0 0 10px ${sec.accentSolid}40` : "none",
                    transition:"box-shadow 0.3s ease",
                  }}>{sec.icon}</span>
                  {sec.label}
                  {hoveredSection === sec.id && (
                    <span style={{ marginLeft:"auto", fontSize:"7px", fontFamily:"monospace", fontWeight:900, color:`${sec.accentSolid}80`, letterSpacing:"0.15em" }}>◈ AR</span>
                  )}
                </div>

                {/* Links */}
                <div style={{ display:"flex", flexDirection:"column" }}>
                  {sec.links.map(link => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className="ft-link"
                      style={{ "--dot-color": sec.accentSolid } as React.CSSProperties}
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <span className="ft-link-dot" style={{ background: sec.accent }} />
                      {link.label}
                      <span className="ft-link-arrow" style={{ color: sec.accentSolid }}>→</span>
                    </Link>
                  ))}
                </div>

                {/* Bottom glow bar on hover */}
                <div style={{
                  position:"absolute", bottom:0, left:0, right:0, height:2, borderRadius:"0 0 16px 16px",
                  background:`linear-gradient(90deg,transparent,${sec.accentSolid},transparent)`,
                  opacity: hoveredSection === sec.id ? 0.6 : 0,
                  transition:"opacity 0.3s ease",
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(0,200,255,0.15) 20%,rgba(124,92,255,0.15) 50%,rgba(0,200,255,0.15) 80%,transparent)" }} />

        {/* ════ BOTTOM BAR ════ */}
        <div style={{ padding:"18px 0", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:12 }}>

          {/* Left — copyright */}
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"6px 14px" }}>
            <span style={{ fontFamily:"'Space Mono', monospace", fontSize:"0.65rem", color:"rgba(255,255,255,0.2)", fontWeight:400, letterSpacing:"0.04em" }}>
              © {year} Astralearnia Technologies Ltd. All rights reserved.
            </span>
            <span className="hidden sm:block" style={{ width:1, height:10, background:"rgba(255,255,255,0.1)", flexShrink:0 }} />
            <span style={{ fontFamily:"'Space Mono', monospace", fontSize:"0.6rem", color:"rgba(255,255,255,0.1)", fontWeight:400, letterSpacing:"0.06em" }}>
              Built with AI · Secured with intent
            </span>
          </div>

          {/* Right */}
          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>

            {/* Quick links */}
            <div style={{ display:"flex", gap:14, marginRight:6 }} className="hidden sm:flex">
              {[
                { label:"Privacy", href:"/privacy" },
                { label:"Terms",   href:"/terms"   },
                { label:"Cookies", href:"/cookies" },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{
                  fontFamily:"'Exo 2', sans-serif",
                  fontSize:"0.8rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase",
                  color:"rgba(255,255,255,0.22)",
                  textDecoration:"none", transition:"color 0.15s ease, letter-spacing 0.15s ease",
                  position:"relative",
                }}
                  onMouseEnter={e => { e.currentTarget.style.color="rgba(0,200,255,0.8)"; e.currentTarget.style.letterSpacing="0.02em"; }}
                  onMouseLeave={e => { e.currentTarget.style.color="rgba(255,255,255,0.22)"; e.currentTarget.style.letterSpacing="0"; }}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Social icons */}
            {SOCIAL.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="ft-soc-btn"
                style={{ "--soc-color": s.color } as React.CSSProperties}
                onMouseEnter={e => {
                  setHoveredSocial(s.label);
                  e.currentTarget.style.background = `${s.color}18`;
                  e.currentTarget.style.borderColor = `${s.color}50`;
                  e.currentTarget.style.color = s.color;
                  e.currentTarget.style.boxShadow = `0 0 16px ${s.color}40, 0 4px 12px rgba(0,0,0,0.3)`;
                }}
                onMouseLeave={e => {
                  setHoveredSocial(null);
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {s.icon}
              </a>
            ))}

            {/* Status pill */}
            <div style={{
              display:"flex", alignItems:"center", gap:5, padding:"5px 10px",
              borderRadius:20, background:"rgba(0,255,100,0.05)",
              border:"1px solid rgba(0,255,100,0.12)",
              transition:"all 0.3s ease",
              cursor:"default",
            }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(0,255,100,0.1)"; e.currentTarget.style.borderColor="rgba(0,255,100,0.3)"; e.currentTarget.style.boxShadow="0 0 16px rgba(0,255,100,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(0,255,100,0.05)"; e.currentTarget.style.borderColor="rgba(0,255,100,0.12)"; e.currentTarget.style.boxShadow="none"; }}
            >
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#00ff64", boxShadow:"0 0 8px rgba(0,255,100,0.9)", flexShrink:0, animation:"_ft_statusPulse 2s ease-in-out infinite" }} />
              <span style={{ fontSize:"0.55rem", fontWeight:700, letterSpacing:"0.08em", color:"rgba(0,255,100,0.75)", fontFamily:"'Space Mono', monospace" }}>All Systems Operational</span>
            </div>
          </div>
        </div>

        {/* AR coordinates bar */}
        <div style={{ paddingBottom:12, display:"flex", justifyContent:"center", gap:20, flexWrap:"wrap" }}>
          {[
            { label:"LAT", val:"6.5244° N" },
            { label:"LON", val:"3.3792° E" },
            { label:"ALT", val:"40m MSL" },
            { label:"NET", val:"CF/PAGES" },
          ].map(c => (
            <div key={c.label} style={{ display:"flex", gap:4, alignItems:"center", fontFamily:"'Space Mono', monospace", fontSize:"0.55rem", color:"rgba(0,200,255,0.25)" }}>
              <span style={{ fontWeight:400, letterSpacing:"0.18em" }}>{c.label}</span>
              <span style={{ color:"rgba(0,200,255,0.5)", fontWeight:400 }}>{c.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient border */}
      <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(0,200,255,0.2) 20%,rgba(124,92,255,0.2) 50%,rgba(0,200,255,0.2) 80%,transparent)", backgroundSize:"200% 100%", animation:"_ft_borderFlow 8s linear infinite" }} />
    </footer>
  );
}

export default Footer;