"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
        @keyframes _nb2_fadeDown  { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes _nb2_shimmer   { 0%{background-position:-500px 0} 100%{background-position:500px 0} }
        @keyframes _nb2_logoTilt  { 0%,100%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(3deg) scale(1.04)} }
        @keyframes _nb2_ctaPulse  { 0%,100%{box-shadow:0 5px 20px rgba(0,200,255,.4),inset 0 1px 0 rgba(255,255,255,.2)} 50%{box-shadow:0 5px 28px rgba(0,200,255,.62),inset 0 1px 0 rgba(255,255,255,.25)} }
        @keyframes _nb2_beamSlide { 0%{transform:translateX(-100%);opacity:0} 15%{opacity:1} 85%{opacity:1} 100%{transform:translateX(100%);opacity:0} }
        @keyframes _nb2_slideIn   { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes _nb2_bBeam     { 0%,100%{opacity:.72} 50%{opacity:1} }
        .nb2-lk span.nb2-bar { width:0;opacity:0;transition:width .22s ease,opacity .22s ease; }
        .nb2-lk:hover span.nb2-bar, .nb2-lk.active span.nb2-bar { width:60%;opacity:1; }
        .nb2-lk:hover { color:#fff !important; }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          HEADER — always has visible dark background on mobile
      ══════════════════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          animation: "_nb2_fadeDown .5s ease both",
          /* KEY FIX: always semi-dark (not fully transparent) so it's visible on mobile */
          background: scrolled
            ? "linear-gradient(180deg,rgba(3,5,8,.98) 0%,rgba(3,5,8,.95) 100%)"
            : "linear-gradient(180deg,rgba(3,5,8,.88) 0%,rgba(3,5,8,.65) 100%)",
          backdropFilter: "blur(24px) saturate(180%)",
          borderBottom: scrolled
            ? "1px solid rgba(0,200,255,.14)"
            : "1px solid rgba(0,200,255,.06)",
          boxShadow: scrolled
            ? "0 0 0 1px rgba(0,200,255,.04),0 18px 48px rgba(0,0,0,.65)"
            : "none",
        }}
      >
        {/* scrolled bottom beam */}
        {scrolled && (
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
            style={{
              background: "linear-gradient(90deg,transparent 0%,#00c8ff 25%,#7c5cff 50%,#00c8ff 75%,transparent 100%)",
              boxShadow: "0 0 14px rgba(0,200,255,.32),0 0 45px rgba(124,92,255,.16)",
              animation: "_nb2_bBeam 4s ease-in-out infinite",
            }}
          />
        )}

        {/* ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-14 pointer-events-none"
          style={{ background: "radial-gradient(ellipse,rgba(0,200,255,.06) 0%,transparent 70%)" }}
        />

        <nav className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-12">
          <div className="flex h-14 sm:h-[4.25rem] items-center justify-between gap-3">

            {/* ── LOGO ── */}
            <Link href="/" className="group relative flex items-center gap-2.5 shrink-0 z-20 min-w-0">
              {/* Logo container
                  ▸ Place your logo at /public/logo.png  (or .svg/.webp)
                  ▸ If the file is missing, it automatically shows the gradient "A" fallback
              */}
              <div
                className="relative flex items-center justify-center rounded-xl overflow-hidden shrink-0"
                style={{
                  width: 36,
                  height: 36,
                  background: logoError
                    ? "linear-gradient(135deg,#00c8ff 0%,#3b6bff 45%,#7c5cff 100%)"
                    : "transparent",
                  boxShadow: "0 5px 18px rgba(0,200,255,.5),inset 0 -2px 5px rgba(0,0,0,.4)",
                  animation: "_nb2_logoTilt 5s ease-in-out infinite",
                  transition: "box-shadow .3s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 12px 36px rgba(0,200,255,.78),inset 0 -2px 5px rgba(0,0,0,.4),0 0 50px rgba(0,200,255,.3)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 5px 18px rgba(0,200,255,.5),inset 0 -2px 5px rgba(0,0,0,.4)";
                }}
              >
                {!logoError ? (
                  // Your logo image — change src to "/logo.svg" etc. if needed
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/logo.png"
                    alt="Astralearnia"
                    style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 10 }}
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  /* Gradient "A" fallback when logo.png is not found */
                  <>
                    <div className="absolute inset-0 opacity-35" style={{ background: "linear-gradient(135deg,rgba(255,255,255,.42) 0%,transparent 52%)" }} />
                    <span className="relative z-10 font-black text-white drop-shadow-[0_2px_5px_rgba(0,0,0,.7)]" style={{ fontSize: "1.15rem" }}>A</span>
                  </>
                )}
              </div>

              {/* Brand name — shown on all screen sizes (removed hidden sm:block) */}
              <span
                className="font-black tracking-tight truncate"
                style={{
                  fontSize: "clamp(0.85rem, 3.5vw, 1.15rem)",
                  background: "linear-gradient(90deg,rgba(0,200,255,.85) 0%,#fff 35%,rgba(124,92,255,.85) 65%,rgba(0,200,255,.85) 100%)",
                  backgroundSize: "500px 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "_nb2_shimmer 5s linear infinite",
                  filter: "drop-shadow(0 0 9px rgba(0,200,255,.28))",
                }}
              >
                Astralearnia
              </span>
            </Link>

            {/* ── DESKTOP NAV LINKS ── */}
            <ul className="hidden lg:flex items-center gap-0.5">
              {navLinks.map(link => {
                const active = pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`nb2-lk${active ? " active" : ""} relative flex flex-col items-center px-3.5 xl:px-4 py-2 rounded-xl font-semibold transition-all duration-200`}
                      style={{
                        fontSize: ".85rem",
                        color: active ? "#00c8ff" : "rgba(255,255,255,.55)",
                        background: active ? "linear-gradient(135deg,rgba(0,200,255,.09),rgba(124,92,255,.06))" : "transparent",
                        boxShadow: active ? "0 0 16px rgba(0,200,255,.11)" : "none",
                      }}
                      onMouseEnter={e => {
                        if (!active) {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = "linear-gradient(135deg,rgba(0,200,255,.07),rgba(124,92,255,.04))";
                          el.style.boxShadow = "0 0 14px rgba(0,200,255,.09)";
                        }
                      }}
                      onMouseLeave={e => {
                        if (!active) {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = "transparent";
                          el.style.boxShadow = "none";
                        }
                      }}
                    >
                      <span className="relative z-10">{link.label}</span>
                      <span
                        className="nb2-bar absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
                        style={{
                          background: "linear-gradient(90deg,#00c8ff,#7c5cff)",
                          boxShadow: "0 0 7px rgba(0,200,255,.7)",
                          width: active ? "60%" : "0%",
                          opacity: active ? 1 : 0,
                        }}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* ── DESKTOP ACTIONS ── */}
            <div className="hidden lg:flex items-center gap-2.5">
              <Link
                href="/contact"
                className="font-semibold transition-all duration-200 hover:-translate-y-px"
                style={{ fontSize: ".85rem", color: "rgba(255,255,255,.52)", padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.02)" }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "#fff";
                  el.style.borderColor = "rgba(0,200,255,.38)";
                  el.style.boxShadow = "0 0 18px rgba(0,200,255,.14)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "rgba(255,255,255,.52)";
                  el.style.borderColor = "rgba(255,255,255,.1)";
                  el.style.boxShadow = "";
                }}
              >
                Contact
              </Link>

              <Link
                href="/book-demo"
                className="relative overflow-hidden font-bold text-white transition-all duration-300 hover:-translate-y-px active:scale-95"
                style={{
                  fontSize: ".85rem",
                  padding: "9px 20px",
                  borderRadius: 10,
                  background: "linear-gradient(135deg,#00c8ff 0%,#3b6bff 50%,#7c5cff 100%)",
                  animation: "_nb2_ctaPulse 4s ease-in-out infinite",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 10px 38px rgba(0,200,255,.68),0 0 55px rgba(124,92,255,.32),inset 0 1px 0 rgba(255,255,255,.22)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <span className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,.18) 50%,transparent 65%)", animation: "_nb2_beamSlide 3s linear infinite" }} />
                <span className="relative z-10">Book Demo →</span>
              </Link>
            </div>

            {/* ── MOBILE CONTROLS (Book Demo pill + Hamburger) ── */}
            <div className="lg:hidden flex items-center gap-2 shrink-0">
              {/* Compact Book Demo button — visible on mobile */}
              <Link
                href="/book-demo"
                className="relative overflow-hidden font-bold text-white text-xs rounded-lg active:scale-95 transition-all whitespace-nowrap"
                style={{
                  padding: "8px 12px",
                  background: "linear-gradient(135deg,#00c8ff 0%,#3b6bff 50%,#7c5cff 100%)",
                  boxShadow: "0 4px 14px rgba(0,200,255,.4)",
                }}
              >
                Book Demo
              </Link>

              {/* Hamburger — solid background so it's always visible */}
              <button
                aria-label="Toggle menu"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative z-[60] flex flex-col items-center justify-center gap-[5px] rounded-xl transition-all duration-300"
                style={{
                  width: 42,
                  height: 42,
                  background: mobileOpen
                    ? "rgba(0,200,255,.15)"
                    : "rgba(255,255,255,.1)",
                  border: `1px solid ${mobileOpen ? "rgba(0,200,255,.55)" : "rgba(255,255,255,.25)"}`,
                  boxShadow: mobileOpen ? "0 0 24px rgba(0,200,255,.38)" : "none",
                  flexShrink: 0,
                }}
              >
                <span className={`w-[18px] h-[2px] rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px] bg-cyan-300" : "bg-white"}`} />
                <span className={`w-[18px] h-[2px] rounded-full transition-all duration-200 bg-white ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
                <span className={`w-[18px] h-[2px] rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px] bg-cyan-300" : "bg-white"}`} />
              </button>
            </div>
          </div>
        </nav>

        {/* ══ MOBILE FULL-SCREEN PANEL ══ */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50" style={{ backdropFilter: "blur(24px)" }}>
            <div className="absolute inset-0 bg-[#030508]/96" onClick={() => setMobileOpen(false)} />
            <div className="absolute inset-0 pointer-events-none opacity-[0.033]"
              style={{ backgroundImage: "radial-gradient(circle,rgba(0,200,255,.5) 1px,transparent 1px)", backgroundSize: "34px 34px" }} />
            <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
              style={{ background: "radial-gradient(circle,rgba(124,92,255,.1) 0%,transparent 60%)", filter: "blur(40px)" }} />

            <div
              className="relative ml-auto h-full flex flex-col overflow-y-auto"
              style={{
                width: "min(100%,360px)",
                background: "linear-gradient(180deg,rgba(4,6,10,.99) 0%,rgba(8,12,22,.99) 100%)",
                borderLeft: "1px solid rgba(0,200,255,.14)",
                boxShadow: "-18px 0 70px rgba(0,200,255,.07)",
                animation: "_nb2_slideIn .33s cubic-bezier(.22,1,.36,1) both",
              }}
            >
              <div className="h-[1px] shrink-0" style={{ background: "linear-gradient(90deg,transparent,#00c8ff 35%,#7c5cff 65%,transparent)" }} />

              <div className="flex items-center justify-between px-5 py-4 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                <div>
                  <p className="font-extrabold text-white tracking-tight" style={{ fontSize: "1rem" }}>Navigation</p>
                  <p className="font-bold uppercase tracking-[.2em] mt-0.5" style={{ fontSize: ".65rem", color: "rgba(0,200,255,.68)" }}>Astralearnia</p>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center rounded-xl text-white/48 hover:text-white transition-colors font-bold"
                  style={{ width: 34, height: 34, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", fontSize: ".85rem" }}
                >✕</button>
              </div>

              <div className="flex flex-col gap-1 p-4 flex-1">
                {navLinks.map((link, i) => {
                  const active = pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all duration-200"
                      style={{
                        fontSize: ".95rem",
                        color: active ? "#00c8ff" : "rgba(255,255,255,.7)",
                        background: active ? "linear-gradient(90deg,rgba(0,200,255,.1),rgba(124,92,255,.06))" : "transparent",
                        border: active ? "1px solid rgba(0,200,255,.2)" : "1px solid transparent",
                        boxShadow: active ? "0 0 16px rgba(0,200,255,.1)" : "none",
                        animationDelay: `${i * 38}ms`,
                      }}
                      onMouseEnter={e => {
                        if (!active) {
                          (e.currentTarget as HTMLElement).style.background = "rgba(0,200,255,.055)";
                          (e.currentTarget as HTMLElement).style.color = "#fff";
                        }
                      }}
                      onMouseLeave={e => {
                        if (!active) {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                          (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.7)";
                        }
                      }}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span style={{ fontSize: 8, color: active ? "#00c8ff" : "rgba(0,200,255,.32)" }}>▶</span>
                      {link.label}
                      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 7px rgba(0,200,255,.9)" }} />}
                    </Link>
                  );
                })}
              </div>

              <div className="p-4 flex flex-col gap-2.5 shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,.06)" }}>
                <Link
                  href="/contact"
                  className="w-full text-center font-bold text-white/70 hover:text-white transition-colors"
                  style={{ fontSize: ".9rem", padding: "12px", borderRadius: 10, border: "1px solid rgba(255,255,255,.14)", background: "rgba(255,255,255,.03)" }}
                  onClick={() => setMobileOpen(false)}
                >Contact Us</Link>
                <Link
                  href="/book-demo"
                  className="relative w-full text-center font-bold text-white overflow-hidden active:scale-95 transition-all duration-200"
                  style={{ fontSize: ".9rem", padding: "13px", borderRadius: 10, background: "linear-gradient(135deg,#00c8ff 0%,#3b6bff 50%,#7c5cff 100%)", boxShadow: "0 7px 26px rgba(0,200,255,.48)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,.16) 50%,transparent 65%)", animation: "_nb2_beamSlide 3s linear infinite" }} />
                  <span className="relative z-10">Book Demo →</span>
                </Link>
              </div>

              <div className="h-[1px] shrink-0" style={{ background: "linear-gradient(90deg,transparent,rgba(124,92,255,.75) 50%,transparent)" }} />
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;