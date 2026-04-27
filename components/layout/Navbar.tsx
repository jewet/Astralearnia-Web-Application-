"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
//import logoImage from "@/assets/logo.png";

const navLinks = [
  { label: "Technology", href: "/technologies" },
  { label: "Institute",  href: "/institute"    },
  { label: "Solutions",  href: "/solutions"    },
  { label: "Products",   href: "/products"     },
  { label: "API",        href: "/api-docs"     },
  { label: "Blog",       href: "/blog"         },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError]   = useState(false);

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

  return (
    <>
      <style>{`
        @keyframes nb-fadeDown   { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes nb-shimmer    { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
        @keyframes nb-pulse      { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes nb-beam       { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes nb-slideRight { from{opacity:0;transform:translateX(100%)} to{opacity:1;transform:translateX(0)} }
        @keyframes nb-glow       { 0%,100%{box-shadow:0 5px 20px rgba(0,200,255,.3)} 50%{box-shadow:0 5px 32px rgba(0,200,255,.55)} }

        .nb-link { position:relative; }
        .nb-link::after {
          content:""; position:absolute; bottom:4px; left:50%; transform:translateX(-50%);
          width:0; height:2px; border-radius:2px;
          background:linear-gradient(90deg,#00c8ff,#7c5cff);
          box-shadow:0 0 8px rgba(0,200,255,.7); transition:width .22s ease;
        }
        .nb-link:hover::after, .nb-link.active::after { width:55%; }
        .nb-link:hover  { color:#fff !important; }
        .nb-link.active { color:#00c8ff !important; }

        .nb-desktop-ul      { display:none; }
        .nb-desktop-actions { display:none; }
        .nb-mobile-controls { display:flex; }
        @media (min-width:1024px) {
          .nb-desktop-ul      { display:flex !important; }
          .nb-desktop-actions { display:flex !important; }
          .nb-mobile-controls { display:none  !important; }
        }
      `}</style>

      {/* ═══════════ HEADER ═══════════ */}
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:60,
        animation:"nb-fadeDown .45s ease both",
        background: scrolled ? "rgba(6,10,20,0.75)" : "rgba(6,10,20,0.55)",
        backdropFilter:"blur(20px) saturate(180%)",
        WebkitBackdropFilter:"blur(20px) saturate(180%)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled ? "0 1px 0 rgba(0,200,255,0.06),0 8px 32px rgba(0,0,0,0.4)" : "none",
        transition:"all .4s ease",
      }}>
        {scrolled && (
          <div style={{
            position:"absolute", bottom:0, left:0, right:0, height:1,
            background:"linear-gradient(90deg,transparent,rgba(0,200,255,0.4) 30%,rgba(124,92,255,0.4) 70%,transparent)",
            animation:"nb-pulse 3s ease-in-out infinite",
          }} />
        )}

        <nav style={{ maxWidth:1280, margin:"0 auto", padding:"0 20px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:60, gap:12 }}>

            {/* ── LOGO ── */}
            <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", flexShrink:0, zIndex:20 }}>
              <div style={{
                width:36, height:36, borderRadius:10, flexShrink:0,
                display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
                background: logoError ? "linear-gradient(135deg,#00c8ff,#7c5cff)" : "rgba(255,255,255,0.92)",
                border: logoError ? "1px solid rgba(0,200,255,0.3)" : "1.5px solid rgba(255,255,255,0.85)",
                boxShadow:"0 2px 12px rgba(0,0,0,0.3)",
                padding:3,
              }}>
                {!logoError ? (
              <Image
                    src="/favicon.png"
                    alt="Astralearnia"
                    width={30}
                    height={30}
                    style={{ objectFit:"contain", borderRadius:7 }}
                    unoptimized
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span style={{ fontWeight:900, color:"#fff", fontSize:"1rem" }}>A</span>
                )}
              </div>
              <span style={{
                fontWeight:800, fontSize:"1.05rem", letterSpacing:"-0.025em",
                background:"linear-gradient(90deg,rgba(0,200,255,.9) 0%,#fff 40%,rgba(124,92,255,.9) 75%,rgba(0,200,255,.9) 100%)",
                backgroundSize:"500px 100%",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                animation:"nb-shimmer 6s linear infinite",
              }}>Astralearnia</span>
            </Link>

            {/* ── DESKTOP LINKS ── */}
            <ul className="nb-desktop-ul" style={{ listStyle:"none", margin:0, padding:0, gap:2, alignItems:"center" }}>
              {navLinks.map(link => {
                const active = pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`nb-link${active ? " active" : ""}`}
                      style={{
                        display:"block", padding:"6px 14px", borderRadius:8,
                        fontSize:"0.875rem", fontWeight:600,
                        color: active ? "#00c8ff" : "rgba(255,255,255,0.6)",
                        textDecoration:"none",
                        background: active ? "rgba(0,200,255,0.07)" : "transparent",
                        transition:"color .2s,background .2s",
                      }}
                    >{link.label}</Link>
                  </li>
                );
              })}
            </ul>

            {/* ── DESKTOP ACTIONS ── */}
            <div className="nb-desktop-actions" style={{ alignItems:"center", gap:8 }}>
              <Link href="/contact"
                style={{
                  padding:"7px 16px", borderRadius:8,
                  fontSize:"0.875rem", fontWeight:600, color:"rgba(255,255,255,0.55)",
                  textDecoration:"none",
                  border:"1px solid rgba(255,255,255,0.1)",
                  background:"rgba(255,255,255,0.03)",
                  backdropFilter:"blur(8px)",
                  transition:"all .2s",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "rgba(0,200,255,0.3)";
                  e.currentTarget.style.background = "rgba(0,200,255,0.05)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
              >Contact</Link>

              <Link href="/book-demo"
                style={{
                  position:"relative", overflow:"hidden",
                  padding:"8px 18px", borderRadius:8,
                  fontSize:"0.875rem", fontWeight:700, color:"#fff",
                  textDecoration:"none",
                  background:"linear-gradient(135deg,#00c8ff 0%,#3b6bff 55%,#7c5cff 100%)",
                  boxShadow:"0 4px 18px rgba(0,200,255,0.35)",
                  animation:"nb-glow 3.5s ease-in-out infinite",
                  transition:"transform .2s",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{
                  position:"absolute", inset:0,
                  background:"linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.18) 50%,transparent 70%)",
                  animation:"nb-beam 2.8s linear infinite",
                }} />
                <span style={{ position:"relative", zIndex:1 }}>Book Demo →</span>
              </Link>
            </div>

            {/* ── MOBILE CONTROLS ── */}
            <div className="nb-mobile-controls" style={{ alignItems:"center", gap:8 }}>
              <Link href="/book-demo" style={{
                padding:"7px 14px", borderRadius:8,
                fontSize:"0.8rem", fontWeight:700, color:"#fff",
                textDecoration:"none",
                background:"linear-gradient(135deg,#00c8ff,#3b6bff,#7c5cff)",
                boxShadow:"0 3px 12px rgba(0,200,255,0.35)",
                whiteSpace:"nowrap", zIndex:62,
              }}>Book Demo</Link>

              <button
                aria-label="Toggle menu"
                onClick={() => setMobileOpen(p => !p)}
                style={{
                  width:38, height:38, borderRadius:9, flexShrink:0,
                  display:"flex", flexDirection:"column",
                  alignItems:"center", justifyContent:"center", gap:5,
                  background: mobileOpen ? "rgba(0,200,255,0.1)" : "rgba(255,255,255,0.06)",
                  border:`1px solid ${mobileOpen ? "rgba(0,200,255,0.4)" : "rgba(255,255,255,0.12)"}`,
                  cursor:"pointer", zIndex:200,
                  backdropFilter:"blur(8px)",
                  transition:"all .25s",
                }}
              >
                {[0,1,2].map(i => (
                  <span key={i} style={{
                    display:"block", width:17, height:2, borderRadius:2,
                    background: mobileOpen ? "#00c8ff" : "rgba(255,255,255,0.8)",
                    transition:"all .3s",
                    transform: mobileOpen
                      ? i===0 ? "rotate(45deg) translate(5px,5px)"
                        : i===2 ? "rotate(-45deg) translate(5px,-5px)"
                          : "scaleX(0)"
                      : "none",
                    opacity: mobileOpen && i===1 ? 0 : 1,
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
          {/* Backdrop */}
          <div
            style={{
              position:"absolute", inset:0,
              background:"rgba(4,7,16,0.75)",
              backdropFilter:"blur(8px)",
              WebkitBackdropFilter:"blur(8px)",
            }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Slide-in glass panel */}
          <div style={{
            position:"absolute", top:0, right:0, bottom:0,
            width:"min(320px,100%)",
            display:"flex", flexDirection:"column",
            background:"rgba(8,13,26,0.94)",
            backdropFilter:"blur(24px) saturate(180%)",
            WebkitBackdropFilter:"blur(24px) saturate(180%)",
            borderLeft:"1px solid rgba(255,255,255,0.08)",
            boxShadow:"-12px 0 48px rgba(0,0,0,0.5)",
            animation:"nb-slideRight .3s cubic-bezier(.22,1,.36,1) both",
          }}>
            {/* Top accent beam */}
            <div style={{
              height:1, flexShrink:0,
              background:"linear-gradient(90deg,transparent,#00c8ff 40%,#7c5cff 70%,transparent)",
            }} />

            {/* Panel header */}
            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"16px 20px",
              borderBottom:"1px solid rgba(255,255,255,0.06)",
              flexShrink:0,
            }}>
              <div>
                <p style={{ margin:0, fontWeight:800, fontSize:"0.95rem", color:"#fff" }}>Navigation</p>
                <p style={{ margin:"2px 0 0", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.15em", color:"rgba(0,200,255,0.6)", textTransform:"uppercase" }}>Astralearnia</p>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                style={{
                  width:32, height:32, borderRadius:8,
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.08)",
                  color:"rgba(255,255,255,0.5)", cursor:"pointer",
                  fontSize:"0.9rem", fontWeight:600,
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}
              >✕</button>
            </div>

            {/* Nav links */}
            <div style={{
              flex:1, overflowY:"auto",
              padding:"12px 16px",
              display:"flex", flexDirection:"column", gap:4,
            }}>
              {navLinks.map((link, i) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      padding:"12px 16px", borderRadius:10,
                      fontSize:"0.95rem", fontWeight:600,
                      color: active ? "#00c8ff" : "rgba(255,255,255,0.7)",
                      textDecoration:"none",
                      background: active ? "rgba(0,200,255,0.07)" : "transparent",
                      border:`1px solid ${active ? "rgba(0,200,255,0.2)" : "transparent"}`,
                      transition:"all .18s",
                      animationDelay:`${i*35}ms`,
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      if (!active) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                        e.currentTarget.style.color = "#fff";
                      }
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      if (!active) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                      }
                    }}
                  >
                    <span style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{
                        width:5, height:5, borderRadius:"50%", flexShrink:0,
                        background: active ? "#00c8ff" : "rgba(255,255,255,0.2)",
                        boxShadow: active ? "0 0 6px rgba(0,200,255,0.8)" : "none",
                      }} />
                      {link.label}
                    </span>
                    {active && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="#00c8ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Bottom CTAs */}
            <div style={{
              padding:"16px", flexShrink:0,
              borderTop:"1px solid rgba(255,255,255,0.06)",
              display:"flex", flexDirection:"column", gap:10,
            }}>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                style={{
                  display:"block", textAlign:"center",
                  padding:"11px", borderRadius:10,
                  fontSize:"0.9rem", fontWeight:600,
                  color:"rgba(255,255,255,0.65)", textDecoration:"none",
                  border:"1px solid rgba(255,255,255,0.1)",
                  background:"rgba(255,255,255,0.03)",
                  backdropFilter:"blur(8px)",
                  transition:"all .2s",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "rgba(0,200,255,0.3)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >Contact Us</Link>

              <Link
                href="/book-demo"
                onClick={() => setMobileOpen(false)}
                style={{
                  position:"relative", overflow:"hidden",
                  display:"block", textAlign:"center",
                  padding:"12px", borderRadius:10,
                  fontSize:"0.9rem", fontWeight:700, color:"#fff",
                  textDecoration:"none",
                  background:"linear-gradient(135deg,#00c8ff 0%,#3b6bff 50%,#7c5cff 100%)",
                  boxShadow:"0 6px 24px rgba(0,200,255,0.4)",
                }}
              >
                <span style={{
                  position:"absolute", inset:0,
                  background:"linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.15) 50%,transparent 65%)",
                  animation:"nb-beam 2.8s linear infinite",
                }} />
                <span style={{ position:"relative", zIndex:1 }}>Book Demo →</span>
              </Link>
            </div>

            {/* Bottom accent */}
            <div style={{
              height:1, flexShrink:0,
              background:"linear-gradient(90deg,transparent,rgba(124,92,255,0.6) 50%,transparent)",
            }} />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;