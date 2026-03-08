"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
// If `@/assets/logo.png` still errors, add this to your next-env.d.ts or a custom global.d.ts:
//   declare module "*.png" { const src: string; export default { src: string }; }
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import logoImage from "@/assets/logo.png";

const navLinks = [
  { label: "Technology", href: "/technologies" },
  { label: "Institute",  href: "/institute"    },
  { label: "Solutions",  href: "/solutions"    },
  { label: "Products",   href: "/products"     },
  { label: "API",        href: "/api-docs"     },
  { label: "Blog",       href: "/blog"         },
];

/* ── Properly typed event helpers ── */
type AEl = React.MouseEvent<HTMLAnchorElement>;
type DEl = React.MouseEvent<HTMLElement>;

function styleEl(el: HTMLElement, styles: Partial<CSSStyleDeclaration>) {
  Object.assign(el.style, styles);
}

export function Navbar() {
  const pathname                        = usePathname();
  const [scrolled,    setScrolled]      = useState(false);
  const [mobileOpen,  setMobileOpen]    = useState(false);
  const [logoError,   setLogoError]     = useState(false);

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

  /* ── Typed mouse handlers ── */
  const hContactEnter  = (e: AEl) => styleEl(e.currentTarget, { color: "#fff", borderColor: "rgba(0,200,255,0.3)", background: "rgba(0,200,255,0.05)" });
  const hContactLeave  = (e: AEl) => styleEl(e.currentTarget, { color: "rgba(255,255,255,0.55)", borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" });
  const hCtaEnter      = (e: AEl) => styleEl(e.currentTarget, { transform: "translateY(-1px)", boxShadow: "0 10px 32px rgba(0,200,255,0.55)" });
  const hCtaLeave      = (e: AEl) => styleEl(e.currentTarget, { transform: "translateY(0)", boxShadow: "0 4px 18px rgba(0,200,255,0.35)" });
  const hMLinkEnter    = (e: DEl) => styleEl(e.currentTarget, { background: "rgba(255,255,255,0.04)", color: "#fff" });
  const hMLinkLeave    = (e: DEl) => styleEl(e.currentTarget, { background: "transparent", color: "rgba(255,255,255,0.7)" });
  const hMContactEnter = (e: AEl) => styleEl(e.currentTarget, { color: "#fff", borderColor: "rgba(0,200,255,0.28)" });
  const hMContactLeave = (e: AEl) => styleEl(e.currentTarget, { color: "rgba(255,255,255,0.62)", borderColor: "rgba(255,255,255,0.1)" });

  const logoSrc = typeof logoImage === "object" && logoImage?.src
    ? (logoImage as { src: string }).src
    : (logoImage as string);

  return (
    <>
      <style>{`
        @keyframes nb-fadeDown   { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes nb-shimmer    { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
        @keyframes nb-pulse      { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes nb-beam       { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes nb-slideRight { from{opacity:0;transform:translateX(100%)} to{opacity:1;transform:translateX(0)} }
        @keyframes nb-glow       { 0%,100%{box-shadow:0 4px 18px rgba(0,200,255,.35)} 50%{box-shadow:0 4px 26px rgba(0,200,255,.55)} }

        .nb-link { position:relative; display:block; text-decoration:none; }
        .nb-link::after {
          content:""; position:absolute;
          bottom:4px; left:50%; transform:translateX(-50%);
          width:0; height:2px; border-radius:2px;
          background:linear-gradient(90deg,#00c8ff,#7c5cff);
          box-shadow:0 0 8px rgba(0,200,255,.65);
          transition:width .22s ease;
        }
        .nb-link:hover::after, .nb-link.active::after { width:55%; }
        .nb-link:hover  { color:#fff !important; }
        .nb-link.active { color:#00c8ff !important; }

        @media (min-width:1024px) {
          .nb-desk-ul      { display:flex !important; }
          .nb-desk-actions { display:flex !important; }
          .nb-mob-ctrl     { display:none  !important; }
        }
      `}</style>

      {/* ════════════════ HEADER ════════════════ */}
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:60,
        animation:"nb-fadeDown .45s ease both",
        background: scrolled ? "rgba(6,10,20,0.72)" : "rgba(6,10,20,0.48)",
        backdropFilter:"blur(20px) saturate(180%)",
        WebkitBackdropFilter:"blur(20px) saturate(180%)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled ? "0 1px 0 rgba(0,200,255,0.05),0 8px 32px rgba(0,0,0,0.4)" : "none",
        transition:"background .4s ease,border-color .4s ease,box-shadow .4s ease",
      }}>
        {scrolled && (
          <div style={{
            position:"absolute", bottom:0, left:0, right:0, height:1,
            background:"linear-gradient(90deg,transparent,rgba(0,200,255,0.38) 30%,rgba(124,92,255,0.38) 70%,transparent)",
            animation:"nb-pulse 3s ease-in-out infinite",
          }} />
        )}

        <nav style={{ maxWidth:1280, margin:"0 auto", padding:"0 20px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:62, gap:12 }}>

            {/* LOGO */}
            <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", flexShrink:0, zIndex:20 }}>
              <div style={{
                width:36, height:36, borderRadius:10, flexShrink:0,
                display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
                background: logoError ? "linear-gradient(135deg,#00c8ff,#7c5cff)" : "rgba(255,255,255,0.92)",
                border: logoError ? "1px solid rgba(0,200,255,0.3)" : "1.5px solid rgba(255,255,255,0.85)",
                boxShadow:"0 2px 12px rgba(0,0,0,0.3)", padding:3,
              }}>
                {!logoError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoSrc} alt="Astralearnia"
                    style={{ width:"100%", height:"100%", objectFit:"contain", borderRadius:7 }}
                    onError={() => setLogoError(true)} />
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

            {/* DESKTOP LINKS */}
            <ul style={{ display:"none", listStyle:"none", margin:0, padding:0, gap:2, alignItems:"center" }}
              className="nb-desk-ul">
              {navLinks.map(link => {
                const active = pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link href={link.href} className={`nb-link${active ? " active" : ""}`}
                      style={{
                        padding:"6px 14px", borderRadius:8,
                        fontSize:"0.875rem", fontWeight:600,
                        color: active ? "#00c8ff" : "rgba(255,255,255,0.6)",
                        background: active ? "rgba(0,200,255,0.07)" : "transparent",
                        transition:"color .2s,background .2s",
                      }}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* DESKTOP ACTIONS */}
            <div style={{ display:"none", alignItems:"center", gap:8 }} className="nb-desk-actions">
              <Link href="/contact"
                style={{
                  padding:"7px 16px", borderRadius:8,
                  fontSize:"0.875rem", fontWeight:600,
                  color:"rgba(255,255,255,0.55)", textDecoration:"none",
                  border:"1px solid rgba(255,255,255,0.1)",
                  background:"rgba(255,255,255,0.03)",
                  backdropFilter:"blur(8px)", transition:"all .2s",
                }}
                onMouseEnter={hContactEnter}
                onMouseLeave={hContactLeave}
              >Contact</Link>

              <Link href="/book-demo"
                style={{
                  position:"relative", overflow:"hidden",
                  padding:"8px 18px", borderRadius:8,
                  fontSize:"0.875rem", fontWeight:700, color:"#fff",
                  textDecoration:"none",
                  background:"linear-gradient(135deg,#00c8ff 0%,#3b6bff 55%,#7c5cff 100%)",
                  animation:"nb-glow 3.5s ease-in-out infinite",
                  transition:"transform .2s,box-shadow .2s",
                }}
                onMouseEnter={hCtaEnter}
                onMouseLeave={hCtaLeave}
              >
                <span style={{ position:"absolute", inset:0, background:"linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.18) 50%,transparent 70%)", animation:"nb-beam 2.8s linear infinite" }} />
                <span style={{ position:"relative", zIndex:1 }}>Book Demo →</span>
              </Link>
            </div>

            {/* MOBILE CONTROLS */}
            <div style={{ display:"flex", alignItems:"center", gap:8 }} className="nb-mob-ctrl">
              <Link href="/book-demo" style={{
                padding:"7px 14px", borderRadius:8,
                fontSize:"0.8rem", fontWeight:700, color:"#fff",
                textDecoration:"none",
                background:"linear-gradient(135deg,#00c8ff,#3b6bff,#7c5cff)",
                boxShadow:"0 3px 12px rgba(0,200,255,0.35)",
                whiteSpace:"nowrap", zIndex:62,
              }}>Book Demo</Link>

              <button aria-label="Toggle menu" onClick={() => setMobileOpen(p => !p)}
                style={{
                  width:38, height:38, borderRadius:9, flexShrink:0,
                  display:"flex", flexDirection:"column",
                  alignItems:"center", justifyContent:"center", gap:5,
                  background: mobileOpen ? "rgba(0,200,255,0.1)" : "rgba(255,255,255,0.06)",
                  border:`1px solid ${mobileOpen ? "rgba(0,200,255,0.4)" : "rgba(255,255,255,0.12)"}`,
                  cursor:"pointer", zIndex:200,
                  backdropFilter:"blur(8px)", transition:"all .25s",
                }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{
                    display:"block", width:17, height:2, borderRadius:2,
                    background: mobileOpen ? "#00c8ff" : "rgba(255,255,255,0.8)",
                    transition:"all .3s",
                    transform: mobileOpen
                      ? i===0 ? "rotate(45deg) translate(5px,5px)"
                      : i===2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)"
                      : "none",
                    opacity: mobileOpen && i===1 ? 0 : 1,
                  }} />
                ))}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ════════════════ MOBILE OVERLAY ════════════════ */}
      {mobileOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:150 }}>
          <div style={{ position:"absolute", inset:0, background:"rgba(4,7,16,0.72)", backdropFilter:"blur(8px)" }}
            onClick={() => setMobileOpen(false)} />

          <div style={{
            position:"absolute", top:0, right:0, bottom:0, width:"min(320px,100%)",
            display:"flex", flexDirection:"column",
            background:"rgba(8,13,26,0.94)",
            backdropFilter:"blur(28px) saturate(180%)",
            WebkitBackdropFilter:"blur(28px) saturate(180%)",
            borderLeft:"1px solid rgba(255,255,255,0.07)",
            boxShadow:"-12px 0 48px rgba(0,0,0,0.55)",
            animation:"nb-slideRight .3s cubic-bezier(.22,1,.36,1) both",
          }}>
            <div style={{ height:1, background:"linear-gradient(90deg,transparent,#00c8ff 40%,#7c5cff 70%,transparent)", flexShrink:0 }} />

            {/* Panel header */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)", flexShrink:0 }}>
              <div>
                <p style={{ margin:0, fontWeight:800, fontSize:"0.95rem", color:"#fff" }}>Navigation</p>
                <p style={{ margin:"2px 0 0", fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.18em", color:"rgba(0,200,255,0.6)", textTransform:"uppercase" }}>Astralearnia</p>
              </div>
              <button onClick={() => setMobileOpen(false)}
                style={{ width:32, height:32, borderRadius:8, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.5)", cursor:"pointer", fontSize:"0.875rem", fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center" }}>
                ✕
              </button>
            </div>

            {/* Links */}
            <div style={{ flex:1, overflowY:"auto", padding:"10px 14px", display:"flex", flexDirection:"column", gap:3 }}>
              {navLinks.map((link, i) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link key={link.href} href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      padding:"12px 14px", borderRadius:10,
                      fontSize:"0.925rem", fontWeight:600,
                      color: active ? "#00c8ff" : "rgba(255,255,255,0.7)",
                      textDecoration:"none",
                      background: active ? "rgba(0,200,255,0.07)" : "transparent",
                      border:`1px solid ${active ? "rgba(0,200,255,0.2)" : "transparent"}`,
                      transition:"all .18s", animationDelay:`${i*35}ms`,
                    }}
                    onMouseEnter={!active ? hMLinkEnter : undefined}
                    onMouseLeave={!active ? hMLinkLeave : undefined}
                  >
                    <span style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{ width:5, height:5, borderRadius:"50%", flexShrink:0, background: active ? "#00c8ff" : "rgba(255,255,255,0.18)", boxShadow: active ? "0 0 6px rgba(0,200,255,0.8)" : "none" }} />
                      {link.label}
                    </span>
                    {active && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00c8ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Bottom CTAs */}
            <div style={{ padding:"14px", flexShrink:0, borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", flexDirection:"column", gap:9 }}>
              <Link href="/contact" onClick={() => setMobileOpen(false)}
                style={{ display:"block", textAlign:"center", padding:"11px", borderRadius:10, fontSize:"0.875rem", fontWeight:600, color:"rgba(255,255,255,0.62)", textDecoration:"none", border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.03)", backdropFilter:"blur(8px)", transition:"all .2s" }}
                onMouseEnter={hMContactEnter}
                onMouseLeave={hMContactLeave}
              >Contact Us</Link>

              <Link href="/book-demo" onClick={() => setMobileOpen(false)}
                style={{ position:"relative", overflow:"hidden", display:"block", textAlign:"center", padding:"12px", borderRadius:10, fontSize:"0.875rem", fontWeight:700, color:"#fff", textDecoration:"none", background:"linear-gradient(135deg,#00c8ff 0%,#3b6bff 50%,#7c5cff 100%)", boxShadow:"0 5px 22px rgba(0,200,255,0.38)" }}>
                <span style={{ position:"absolute", inset:0, background:"linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.15) 50%,transparent 65%)", animation:"nb-beam 2.8s linear infinite" }} />
                <span style={{ position:"relative", zIndex:1 }}>Book Demo →</span>
              </Link>
            </div>

            <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(124,92,255,0.55) 50%,transparent)", flexShrink:0 }} />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;