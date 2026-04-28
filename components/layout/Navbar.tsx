"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { label: "Technology", href: "/technologies", icon: "⚡", color: "#00c8ff" },
  { label: "Institute",  href: "/institute",    icon: "🎓", color: "#a78bfa" },
  { label: "Solutions",  href: "/solutions",    icon: "◈",  color: "#34d399" },
  { label: "Products",   href: "/products",     icon: "✦",  color: "#f97316" },
  { label: "API",        href: "/api-docs",     icon: "⟨/⟩", color: "#60a5fa" },
  { label: "Blog",       href: "/blog",         icon: "◉",  color: "#e879f9" },
];

interface Particle { id: number; x: number; y: number; vx: number; vy: number; life: number; color: string; }

export function Navbar() {
  const pathname   = usePathname();
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [logoError, setLogoError]     = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [particles, setParticles]     = useState<Particle[]>([]);
  const [logoHovered, setLogoHovered] = useState(false);
  const [scanLine, setScanLine]       = useState(0);
  const particleId = useRef(0);
  const rafRef     = useRef<number>(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Scan line animation
  useEffect(() => {
    let frame = 0;
    const tick = () => { frame = (frame + 1) % 120; setScanLine(frame / 120); rafRef.current = requestAnimationFrame(tick); };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const spawnParticles = (x: number, y: number, color: string) => {
    const newP: Particle[] = Array.from({ length: 8 }, () => ({
      id: particleId.current++,
      x, y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4 - 2,
      life: 1,
      color,
    }));
    setParticles(p => [...p.slice(-40), ...newP]);
  };

  useEffect(() => {
    if (particles.length === 0) return;
    const t = requestAnimationFrame(() => {
      setParticles(p => p.map(pt => ({ ...pt, x: pt.x + pt.vx, y: pt.y + pt.vy, vy: pt.vy + 0.15, life: pt.life - 0.04 })).filter(pt => pt.life > 0));
    });
    return () => cancelAnimationFrame(t);
  }, [particles]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Exo+2:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        @keyframes nb-fadeDown      { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes nb-shimmer       { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
        @keyframes nb-pulse         { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes nb-beam          { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes nb-slideRight    { from{opacity:0;transform:translateX(100%)} to{opacity:1;transform:translateX(0)} }
        @keyframes nb-glow          { 0%,100%{box-shadow:0 5px 20px rgba(0,200,255,.3)} 50%{box-shadow:0 5px 32px rgba(0,200,255,.65),0 0 60px rgba(0,200,255,.2)} }
        @keyframes nb-hologram      { 0%,100%{opacity:1;transform:skewX(0deg)} 92%{opacity:1;transform:skewX(0deg)} 93%{opacity:0.8;transform:skewX(-2deg)} 94%{opacity:1;transform:skewX(1deg)} 95%{opacity:0.9;transform:skewX(0deg)} }
        @keyframes nb-scanline      { 0%{top:-10%} 100%{top:110%} }
        @keyframes nb-logoSpin      { 0%{transform:rotateY(0deg)} 100%{transform:rotateY(360deg)} }
        @keyframes nb-logoGlow      { 0%,100%{filter:drop-shadow(0 0 8px rgba(0,200,255,0.5))} 50%{filter:drop-shadow(0 0 20px rgba(0,200,255,0.9)) drop-shadow(0 0 40px rgba(124,92,255,0.5))} }
        @keyframes nb-glitch1       { 0%,100%{clip-path:inset(0 0 95% 0)} 20%{clip-path:inset(30% 0 50% 0)} 40%{clip-path:inset(60% 0 20% 0)} 60%{clip-path:inset(10% 0 80% 0)} 80%{clip-path:inset(70% 0 10% 0)} }
        @keyframes nb-glitch2       { 0%,100%{clip-path:inset(0 0 95% 0);transform:translateX(0)} 25%{clip-path:inset(20% 0 60% 0);transform:translateX(-3px)} 50%{clip-path:inset(50% 0 30% 0);transform:translateX(3px)} 75%{clip-path:inset(80% 0 5% 0);transform:translateX(-2px)} }
        @keyframes nb-ripple        { 0%{transform:scale(0);opacity:0.8} 100%{transform:scale(3);opacity:0} }
        @keyframes nb-borderFlow    { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes nb-holoBg        { 0%{opacity:0.03} 50%{opacity:0.08} 100%{opacity:0.03} }
        @keyframes nb-float         { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        @keyframes nb-linkReveal    { from{opacity:0;transform:translateY(6px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes nb-cornerPulse   { 0%,100%{opacity:0.4} 50%{opacity:1} }

        .nb-link { position:relative; overflow:hidden; }
        .nb-link::before {
          content:""; position:absolute; inset:0; border-radius:8px;
          background:linear-gradient(135deg,rgba(0,200,255,0.1),rgba(124,92,255,0.1));
          opacity:0; transition:opacity 0.25s ease;
        }
        .nb-link:hover::before { opacity:1; }
        .nb-link::after {
          content:""; position:absolute; bottom:3px; left:50%; transform:translateX(-50%);
          width:0; height:2px; border-radius:2px;
          background:linear-gradient(90deg,#00c8ff,#7c5cff);
          box-shadow:0 0 12px rgba(0,200,255,.9),0 0 24px rgba(124,92,255,.5);
          transition:width .28s cubic-bezier(0.34,1.56,0.64,1);
        }
        .nb-link:hover::after, .nb-link.active::after { width:65%; }
        .nb-link:hover  { color:#fff !important; }
        .nb-link.active { color:#00c8ff !important; }

        .nb-link-icon {
          display:inline-block; margin-right:5px; font-size:0.7em;
          opacity:0; transform:scale(0) rotate(-180deg);
          transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .nb-link:hover .nb-link-icon, .nb-link.active .nb-link-icon {
          opacity:1; transform:scale(1) rotate(0deg);
        }

        .nb-holo-panel {
          position:absolute; inset:0; pointer-events:none; overflow:hidden; border-radius:8px;
        }
        .nb-holo-panel::before {
          content:""; position:absolute; inset:0;
          background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,200,255,0.03) 2px,rgba(0,200,255,0.03) 4px);
          animation:nb-holoBg 3s ease-in-out infinite;
        }

        .nb-desktop-ul      { display:none; }
        .nb-desktop-actions { display:none; }
        .nb-mobile-controls { display:flex; }
        @media (min-width:1024px) {
          .nb-desktop-ul      { display:flex !important; }
          .nb-desktop-actions { display:flex !important; }
          .nb-mobile-controls { display:none  !important; }
        }

        .nb-logo-wrap {
          position:relative;
          transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .nb-logo-wrap:hover { transform:scale(1.08); }

        .nb-logo-ring {
          position:absolute; inset:-4px; border-radius:14px;
          background:linear-gradient(135deg,#00c8ff,#7c5cff,#e879f9,#00c8ff);
          background-size:300% 300%;
          animation:nb-borderFlow 3s linear infinite;
          opacity:0; transition:opacity 0.3s ease;
          mask:linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite:exclude;
          padding:2px;
        }
        .nb-logo-wrap:hover .nb-logo-ring { opacity:1; }

        .nb-logo-scan {
          position:absolute; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,rgba(0,200,255,0.8),transparent);
          animation:nb-scanline 2s linear infinite;
          opacity:0; pointer-events:none;
          transition:opacity 0.3s ease;
        }
        .nb-logo-wrap:hover .nb-logo-scan { opacity:1; }

        .nb-demo-btn {
          position:relative; overflow:hidden;
          padding:8px 18px; border-radius:8px;
          font-size:0.875rem; font-weight:700; color:#fff;
          text-decoration:none;
          background:linear-gradient(135deg,#00c8ff 0%,#3b6bff 55%,#7c5cff 100%);
          box-shadow:0 4px 18px rgba(0,200,255,0.35);
          animation:nb-glow 3.5s ease-in-out infinite;
          transition:transform .2s, box-shadow .2s;
          display:inline-flex; align-items:center; gap:6px;
        }
        .nb-demo-btn:hover {
          transform:translateY(-2px) scale(1.02);
          box-shadow:0 8px 32px rgba(0,200,255,0.6),0 0 60px rgba(124,92,255,0.3);
        }
        .nb-demo-btn::before {
          content:""; position:absolute; inset:0;
          background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.25) 50%,transparent 70%);
          animation:nb-beam 2.2s linear infinite;
        }
        .nb-demo-btn-corner {
          position:absolute; width:6px; height:6px; border-color:rgba(255,255,255,0.8);
          border-style:solid;
        }
        .nb-demo-btn-corner.tl { top:3px; left:3px; border-width:1px 0 0 1px; }
        .nb-demo-btn-corner.tr { top:3px; right:3px; border-width:1px 1px 0 0; }
        .nb-demo-btn-corner.bl { bottom:3px; left:3px; border-width:0 0 1px 1px; }
        .nb-demo-btn-corner.br { bottom:3px; right:3px; border-width:0 1px 1px 0; }

        .nb-mobile-item {
          position:relative;
          transition:all 0.2s ease;
        }
        .nb-mobile-item:hover {
          background:rgba(0,200,255,0.06) !important;
          border-color:rgba(0,200,255,0.3) !important;
          transform:translateX(4px);
        }
        .nb-mobile-item.active-mobile {
          background:rgba(0,200,255,0.07) !important;
          border-color:rgba(0,200,255,0.25) !important;
        }

        .nb-holo-tag {
          position:absolute; top:-20px; left:50%; transform:translateX(-50%);
          background:rgba(0,10,20,0.95); border:1px solid rgba(0,200,255,0.5);
          border-radius:5px; padding:3px 8px; white-space:nowrap;
          font-size:9px; font-family:'Space Mono', monospace; font-weight:400; letter-spacing:0.15em;
          color:#00c8ff; pointer-events:none;
          opacity:0; transition:opacity 0.15s ease;
          box-shadow:0 0 10px rgba(0,200,255,0.3);
        }
        .nb-link:hover .nb-holo-tag { opacity:1; }
        .nb-rajdhani { font-family:'Exo 2', sans-serif !important; }
      `}</style>

      {/* Particle canvas overlay */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:9999, overflow:"hidden" }}>
        {particles.map(p => (
          <div key={p.id} style={{
            position:"absolute", left:p.x, top:p.y,
            width:4, height:4, borderRadius:"50%",
            background:p.color, opacity:p.life,
            boxShadow:`0 0 6px ${p.color}`,
            transform:"translate(-50%,-50%)",
            transition:"none",
          }} />
        ))}
      </div>

      {/* ═══════════ HEADER ═══════════ */}
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:60,
        animation:"nb-fadeDown .45s ease both",
        background: scrolled
          ? "rgba(4,7,16,0.88)"
          : "rgba(4,7,16,0.65)",
        backdropFilter:"blur(24px) saturate(200%)",
        WebkitBackdropFilter:"blur(24px) saturate(200%)",
        borderBottom: scrolled
          ? "1px solid rgba(0,200,255,0.12)"
          : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled
          ? "0 1px 0 rgba(0,200,255,0.08),0 8px 40px rgba(0,0,0,0.5),inset 0 1px 0 rgba(0,200,255,0.05)"
          : "none",
        transition:"all .4s ease",
        overflow:"hidden",
      }}>

        {/* Holographic scan line across entire header */}
        <div style={{
          position:"absolute", left:0, right:0, height:"1px",
          top:`${scanLine * 100}%`,
          background:"linear-gradient(90deg,transparent,rgba(0,200,255,0.15) 30%,rgba(0,200,255,0.4) 50%,rgba(0,200,255,0.15) 70%,transparent)",
          pointerEvents:"none", zIndex:1,
          opacity: scrolled ? 0.5 : 0.3,
        }} />

        {/* CRT scanlines texture */}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,200,255,0.012) 3px,rgba(0,200,255,0.012) 4px)",
          zIndex:0,
        }} />

        {/* Bottom gradient bar */}
        {scrolled && (
          <div style={{
            position:"absolute", bottom:0, left:0, right:0, height:1,
            background:"linear-gradient(90deg,transparent,rgba(0,200,255,0.5) 20%,rgba(124,92,255,0.5) 50%,rgba(0,200,255,0.5) 80%,transparent)",
            animation:"nb-borderFlow 4s linear infinite",
            backgroundSize:"200% 100%",
          }} />
        )}

        <nav style={{ maxWidth:1280, margin:"0 auto", padding:"0 20px", position:"relative", zIndex:2 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:62, gap:12 }}>

            {/* ── LOGO ── */}
            <Link
              href="/"
              className="nb-logo-wrap"
              style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", flexShrink:0, zIndex:20 }}
              onMouseEnter={e => { setLogoHovered(true); spawnParticles(e.clientX, e.clientY, "#00c8ff"); }}
              onMouseLeave={() => setLogoHovered(false)}
            >
              {/* Animated ring */}
              <div className="nb-logo-ring" />

              <div style={{
                width:38, height:38, borderRadius:10, flexShrink:0,
                display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
                background: logoError ? "linear-gradient(135deg,#00c8ff,#7c5cff)" : "rgba(255,255,255,0.95)",
                border: logoError ? "1px solid rgba(0,200,255,0.4)" : "1.5px solid rgba(255,255,255,0.9)",
                boxShadow: logoHovered
                  ? "0 0 20px rgba(0,200,255,0.6),0 0 40px rgba(124,92,255,0.3),0 2px 12px rgba(0,0,0,0.3)"
                  : "0 2px 12px rgba(0,0,0,0.3)",
                padding:3,
                transition:"box-shadow 0.3s ease",
                position:"relative",
              }}>
                <div className="nb-logo-scan" />
                {!logoError ? (
                  <Image
                    src="/favicon.png"
                    alt="Astralearnia"
                    width={30}
                    height={30}
                    style={{
                      objectFit:"contain", borderRadius:7,
                      filter: logoHovered ? "drop-shadow(0 0 6px rgba(0,200,255,0.8))" : "none",
                      transition:"filter 0.3s ease",
                      animation: logoHovered ? "nb-logoGlow 1s ease-in-out infinite" : "none",
                    }}
                    unoptimized
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span style={{ fontWeight:900, color:"#fff", fontSize:"1rem" }}>A</span>
                )}
              </div>

              {/* Wordmark with glitch effect */}
              <div style={{ position:"relative" }}>
                <span style={{
                  fontFamily:"'Syncopate', sans-serif",
                  fontWeight:700, fontSize:"0.78rem", letterSpacing:"0.18em",
                  textTransform:"uppercase",
                  background:"linear-gradient(90deg,rgba(0,200,255,.9) 0%,#fff 40%,rgba(124,92,255,.9) 75%,rgba(0,200,255,.9) 100%)",
                  backgroundSize:"500px 100%",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                  animation:"nb-shimmer 6s linear infinite",
                  display:"block",
                }}>Astralearnia</span>
                {/* Glitch layers */}
                {logoHovered && (<>
                  <span aria-hidden style={{
                    position:"absolute", top:0, left:0,
                    fontFamily:"'Syncopate', sans-serif", fontWeight:700, fontSize:"0.78rem", letterSpacing:"0.18em", textTransform:"uppercase",
                    color:"#00c8ff", opacity:0.5,
                    animation:"nb-glitch1 0.4s steps(1) infinite",
                    transform:"translateX(-2px)",
                    display:"block", whiteSpace:"nowrap",
                  }}>Astralearnia</span>
                  <span aria-hidden style={{
                    position:"absolute", top:0, left:0,
                    fontFamily:"'Syncopate', sans-serif", fontWeight:700, fontSize:"0.78rem", letterSpacing:"0.18em", textTransform:"uppercase",
                    color:"#e879f9", opacity:0.4,
                    animation:"nb-glitch2 0.4s steps(1) infinite",
                    transform:"translateX(2px)",
                    display:"block", whiteSpace:"nowrap",
                  }}>Astralearnia</span>
                </>)}
                {/* AR tag */}
                <div style={{
                  position:"absolute", top:-14, right:-2,
                  fontSize:"7px", fontFamily:"monospace", fontWeight:900,
                  letterSpacing:"0.1em", color:"rgba(0,200,255,0.7)",
                  opacity: logoHovered ? 1 : 0, transition:"opacity 0.2s ease",
                }}>◈ AR</div>
              </div>
            </Link>

            {/* ── DESKTOP LINKS ── */}
            <ul className="nb-desktop-ul" style={{ listStyle:"none", margin:0, padding:0, gap:2, alignItems:"center" }}>
              {navLinks.map((link, li) => {
                const active = pathname.startsWith(link.href);
                return (
                  <li key={link.href} style={{ animation:`nb-linkReveal 0.4s ease ${li * 0.05}s both` }}>
                    <Link
                      href={link.href}
                      className={`nb-link${active ? " active" : ""}`}
                      style={{
                        display:"flex", alignItems:"center",
                        padding:"7px 14px", borderRadius:8,
                        fontFamily:"'Exo 2', sans-serif",
                        fontSize:"0.95rem", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase",
                        color: active ? "#00c8ff" : "rgba(255,255,255,0.62)",
                        textDecoration:"none",
                        background: active ? "rgba(0,200,255,0.07)" : "transparent",
                        transition:"color .2s, background .2s",
                        position:"relative",
                      }}
                      onMouseEnter={e => {
                        setHoveredLink(link.href);
                        spawnParticles(e.clientX, e.clientY, link.color);
                      }}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <div className="nb-holo-panel" />
                      <span className="nb-link-icon" style={{ color: link.color }}>{link.icon}</span>
                      {link.label}
                      {/* Holographic tooltip */}
                      <div className="nb-holo-tag" style={{ borderColor:`${link.color}60`, color:link.color, boxShadow:`0 0 10px ${link.color}40` }}>
                        {link.icon} {link.label.toUpperCase()}
                      </div>
                      {/* Active indicator dot */}
                      {active && (
                        <span style={{
                          position:"absolute", top:4, right:4,
                          width:4, height:4, borderRadius:"50%",
                          background:link.color, boxShadow:`0 0 6px ${link.color}`,
                          animation:"nb-pulse 1.5s ease-in-out infinite",
                        }} />
                      )}
                      {/* Hover corner brackets */}
                      {hoveredLink === link.href && (<>
                        <span style={{ position:"absolute", top:4, left:4, width:6, height:6, borderTop:`1px solid ${link.color}`, borderLeft:`1px solid ${link.color}`, opacity:0.7 }} />
                        <span style={{ position:"absolute", top:4, right:4, width:6, height:6, borderTop:`1px solid ${link.color}`, borderRight:`1px solid ${link.color}`, opacity:0.7 }} />
                        <span style={{ position:"absolute", bottom:4, left:4, width:6, height:6, borderBottom:`1px solid ${link.color}`, borderLeft:`1px solid ${link.color}`, opacity:0.7 }} />
                        <span style={{ position:"absolute", bottom:4, right:4, width:6, height:6, borderBottom:`1px solid ${link.color}`, borderRight:`1px solid ${link.color}`, opacity:0.7 }} />
                      </>)}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* ── DESKTOP ACTIONS ── */}
            <div className="nb-desktop-actions" style={{ alignItems:"center", gap:8 }}>
              <Link href="/contact"
                style={{
                  padding:"7px 16px", borderRadius:8,
                  fontFamily:"'Exo 2', sans-serif",
                  fontSize:"0.95rem", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase",
                  color:"rgba(255,255,255,0.55)",
                  textDecoration:"none",
                  border:"1px solid rgba(255,255,255,0.1)",
                  background:"rgba(255,255,255,0.03)",
                  backdropFilter:"blur(8px)",
                  transition:"all .25s",
                  position:"relative", overflow:"hidden",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.color="#fff";
                  el.style.borderColor="rgba(0,200,255,0.4)";
                  el.style.background="rgba(0,200,255,0.07)";
                  el.style.boxShadow="0 0 20px rgba(0,200,255,0.2)";
                  spawnParticles(e.clientX, e.clientY, "#00c8ff");
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.color="rgba(255,255,255,0.55)";
                  el.style.borderColor="rgba(255,255,255,0.1)";
                  el.style.background="rgba(255,255,255,0.03)";
                  el.style.boxShadow="none";
                }}
              >Contact</Link>

              <Link href="/book-demo" className="nb-demo-btn"
                onMouseEnter={e => spawnParticles(e.clientX, e.clientY, "#00c8ff")}
              >
                <span className="nb-demo-btn-corner tl" />
                <span className="nb-demo-btn-corner tr" />
                <span className="nb-demo-btn-corner bl" />
                <span className="nb-demo-btn-corner br" />
                <span style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:6, fontFamily:"'Exo 2', sans-serif", fontWeight:700, fontSize:"0.95rem", letterSpacing:"0.1em", textTransform:"uppercase" }}>
                  <span style={{ fontSize:"0.7em", animation:"nb-pulse 2s ease-in-out infinite" }}>◈</span>
                  Book Demo
                  <span style={{ fontSize:"0.8em" }}>→</span>
                </span>
              </Link>
            </div>

            {/* ── MOBILE CONTROLS ── */}
            <div className="nb-mobile-controls" style={{ alignItems:"center", gap:8 }}>
              <Link href="/book-demo" style={{
                padding:"7px 14px", borderRadius:8,
                fontFamily:"'Exo 2', sans-serif",
                fontSize:"0.9rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase",
                color:"#fff", textDecoration:"none",
                background:"linear-gradient(135deg,#00c8ff,#3b6bff,#7c5cff)",
                boxShadow:"0 3px 12px rgba(0,200,255,0.35)",
                whiteSpace:"nowrap", zIndex:62, position:"relative", overflow:"hidden",
              }}>
                <span style={{ position:"absolute", inset:0, background:"linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.2) 50%,transparent 65%)", animation:"nb-beam 2.8s linear infinite" }} />
                <span style={{ position:"relative" }}>Book Demo</span>
              </Link>

              <button
                aria-label="Toggle menu"
                onClick={() => setMobileOpen(p => !p)}
                style={{
                  width:40, height:40, borderRadius:9, flexShrink:0,
                  display:"flex", flexDirection:"column",
                  alignItems:"center", justifyContent:"center", gap:5,
                  background: mobileOpen ? "rgba(0,200,255,0.12)" : "rgba(255,255,255,0.06)",
                  border:`1.5px solid ${mobileOpen ? "rgba(0,200,255,0.5)" : "rgba(255,255,255,0.12)"}`,
                  cursor:"pointer", zIndex:200,
                  backdropFilter:"blur(8px)",
                  transition:"all .25s",
                  boxShadow: mobileOpen ? "0 0 20px rgba(0,200,255,0.3)" : "none",
                }}
              >
                {[0,1,2].map(i => (
                  <span key={i} style={{
                    display:"block", width:17, height:2, borderRadius:2,
                    background: mobileOpen ? "#00c8ff" : "rgba(255,255,255,0.8)",
                    transition:"all .3s cubic-bezier(0.34,1.56,0.64,1)",
                    transform: mobileOpen
                      ? i===0 ? "rotate(45deg) translate(5px,5px)"
                        : i===2 ? "rotate(-45deg) translate(5px,-5px)"
                          : "scaleX(0)"
                      : "none",
                    opacity: mobileOpen && i===1 ? 0 : 1,
                    boxShadow: mobileOpen ? "0 0 4px #00c8ff" : "none",
                  }} />
                ))}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ═══════════ MOBILE OVERLAY ═══════════ */}
      {mobileOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:150 }}>
          <div
            style={{ position:"absolute", inset:0, background:"rgba(2,5,14,0.8)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)" }}
            onClick={() => setMobileOpen(false)}
          />
          <div style={{
            position:"absolute", top:0, right:0, bottom:0,
            width:"min(340px,100%)",
            display:"flex", flexDirection:"column",
            background:"rgba(5,9,20,0.97)",
            backdropFilter:"blur(28px) saturate(180%)",
            WebkitBackdropFilter:"blur(28px) saturate(180%)",
            borderLeft:"1px solid rgba(0,200,255,0.15)",
            boxShadow:"-16px 0 60px rgba(0,0,0,0.6), -2px 0 0 rgba(0,200,255,0.1)",
            animation:"nb-slideRight .35s cubic-bezier(.22,1,.36,1) both",
            overflow:"hidden",
          }}>
            {/* CRT lines */}
            <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,200,255,0.015) 3px,rgba(0,200,255,0.015) 4px)", zIndex:0 }} />
            {/* Top beam */}
            <div style={{ height:2, flexShrink:0, background:"linear-gradient(90deg,transparent,#00c8ff 40%,#7c5cff 70%,transparent)", boxShadow:"0 0 10px rgba(0,200,255,0.5)", position:"relative", zIndex:1 }} />

            {/* Panel header */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)", flexShrink:0, position:"relative", zIndex:1 }}>
              <div>
                <p style={{ margin:0, fontWeight:800, fontSize:"0.95rem", color:"#fff", letterSpacing:"0.02em" }}>Navigation</p>
                <p style={{ margin:"3px 0 0", fontSize:"0.6rem", fontWeight:900, letterSpacing:"0.25em", color:"rgba(0,200,255,0.6)", textTransform:"uppercase", fontFamily:"monospace" }}>◈ ASTRALEARNIA · AR/VR MODE</p>
              </div>
              <button onClick={() => setMobileOpen(false)} style={{ width:34, height:34, borderRadius:8, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.5)", cursor:"pointer", fontSize:"0.9rem", fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(0,200,255,0.4)"; e.currentTarget.style.color="#00c8ff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.color="rgba(255,255,255,0.5)"; }}
              >✕</button>
            </div>

            {/* Nav links */}
            <div style={{ flex:1, overflowY:"auto", padding:"10px 14px", display:"flex", flexDirection:"column", gap:3, position:"relative", zIndex:1 }}>
              {navLinks.map((link, i) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nb-mobile-item${active ? " active-mobile" : ""}`}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      padding:"12px 16px", borderRadius:10,
                      fontSize:"0.95rem", fontWeight:600,
                      color: active ? link.color : "rgba(255,255,255,0.7)",
                      textDecoration:"none",
                      background: active ? `${link.color}10` : "transparent",
                      border:`1px solid ${active ? `${link.color}30` : "transparent"}`,
                      transition:"all .2s ease",
                      animationDelay:`${i * 40}ms`,
                      animation:"nb-linkReveal 0.4s ease both",
                    }}
                  >
                    <span style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <span style={{
                        width:28, height:28, borderRadius:7, flexShrink:0,
                        background:`${link.color}14`, border:`1px solid ${link.color}35`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:"0.85em", color:link.color,
                      }}>{link.icon}</span>
                      {link.label}
                    </span>
                    <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                      {active && <span style={{ width:5, height:5, borderRadius:"50%", background:link.color, boxShadow:`0 0 8px ${link.color}`, animation:"nb-pulse 1.5s infinite" }} />}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={active ? link.color : "rgba(255,255,255,0.3)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Bottom CTAs */}
            <div style={{ padding:"14px", flexShrink:0, borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", flexDirection:"column", gap:10, position:"relative", zIndex:1 }}>
              <Link href="/contact" onClick={() => setMobileOpen(false)} style={{
                display:"block", textAlign:"center", padding:"11px", borderRadius:10,
                fontSize:"0.9rem", fontWeight:600, color:"rgba(255,255,255,0.65)", textDecoration:"none",
                border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.03)", transition:"all .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="rgba(0,200,255,0.4)"; e.currentTarget.style.background="rgba(0,200,255,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.color="rgba(255,255,255,0.65)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.background="rgba(255,255,255,0.03)"; }}
              >Contact Us</Link>

              <Link href="/book-demo" onClick={() => setMobileOpen(false)} style={{
                position:"relative", overflow:"hidden", display:"block", textAlign:"center",
                padding:"12px", borderRadius:10, fontSize:"0.9rem", fontWeight:700, color:"#fff",
                textDecoration:"none", background:"linear-gradient(135deg,#00c8ff 0%,#3b6bff 50%,#7c5cff 100%)",
                boxShadow:"0 6px 28px rgba(0,200,255,0.4)", transition:"all .2s",
              }}>
                <span style={{ position:"absolute", inset:0, background:"linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.18) 50%,transparent 65%)", animation:"nb-beam 2.5s linear infinite" }} />
                <span style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                  <span style={{ animation:"nb-pulse 2s ease-in-out infinite", fontSize:"0.8em" }}>◈</span>
                  Book Demo →
                </span>
              </Link>

              {/* Status bar */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, paddingTop:4 }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:"#00ff64", boxShadow:"0 0 6px rgba(0,255,100,0.8)", animation:"nb-pulse 2s infinite" }} />
                <span style={{ fontSize:"0.6rem", fontWeight:700, color:"rgba(0,255,100,0.6)", fontFamily:"monospace", letterSpacing:"0.1em" }}>ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>

            {/* Bottom beam */}
            <div style={{ height:2, flexShrink:0, background:"linear-gradient(90deg,transparent,rgba(124,92,255,0.7) 50%,transparent)", boxShadow:"0 0 10px rgba(124,92,255,0.4)", position:"relative", zIndex:1 }} />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;