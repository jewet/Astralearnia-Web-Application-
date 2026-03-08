"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import logoImage from "@/assets/logo.png";

const FOOTER_LINKS = {
  company: {
    label: "Company",
    links: [
      { label: "About Us",  href: "/about"   },
      { label: "Careers",   href: "/careers" },
      { label: "Blog",      href: "/blog"    },
      { label: "Press",     href: "/press"   },
      { label: "Contact",   href: "/contact" },
    ],
  },
  technology: {
    label: "Technology",
    links: [
      { label: "AI Models",      href: "/divisions/technology"          },
      { label: "API Platform",   href: "/api-docs"                      },
      { label: "Integrations",   href: "/solutions"                     },
      { label: "Data Pipelines", href: "/divisions/technology#services" },
      { label: "AI Security",    href: "/divisions/technology#security" },
    ],
  },
  institute: {
    label: "Institute",
    links: [
      { label: "Individuals",      href: "/divisions/institute"                },
      { label: "Enterprise",       href: "/divisions/institute#enterprise"     },
      { label: "Certifications",   href: "/divisions/institute#certifications" },
      { label: "Skills Analytics", href: "/divisions/institute#analytics"      },
      { label: "Partner With Us",  href: "/contact"                            },
    ],
  },
  legal: {
    label: "Legal",
    links: [
      { label: "Privacy Policy",   href: "/privacy"  },
      { label: "Terms of Service", href: "/terms"    },
      { label: "Cookie Policy",    href: "/cookies"  },
      { label: "Data Processing",  href: "/dpa"      },
      { label: "Security",         href: "/security" },
    ],
  },
};

const SOCIAL = [
  {
    label: "X / Twitter", href: "https://twitter.com/astralearnia",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.849L1.253 2.25h6.938l4.259 5.631 5.794-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
  {
    label: "LinkedIn", href: "https://linkedin.com/company/astralearnia",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  },
  {
    label: "GitHub", href: "https://github.com/astralearnia",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>,
  },
  {
    label: "YouTube", href: "https://youtube.com/@astralearnia",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
  },
];

export function Footer() {
  const [year, setYear]           = useState(2025);
  const [logoError, setLogoError] = useState(false);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  return (
    <footer style={{ position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes ft-shimmer { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
        @keyframes ft-pulse   { 0%,100%{opacity:.45} 50%{opacity:1} }

        /* Glass surface */
        .ft-root {
          background: rgba(6,10,20,0.85);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        /* Link styles */
        .ft-link {
          display: block;
          font-size: 0.8125rem;
          font-weight: 500;
          color: rgba(255,255,255,0.42);
          text-decoration: none;
          transition: color .18s;
          line-height: 1;
        }
        .ft-link:hover { color: rgba(255,255,255,0.85); }

        .ft-col-head {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          margin-bottom: 16px;
        }

        /* Social icon */
        .ft-social {
          width: 30px; height: 30px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.32);
          text-decoration: none;
          transition: all .18s;
          flex-shrink: 0;
        }
        .ft-social:hover {
          background: rgba(0,200,255,0.08);
          border-color: rgba(0,200,255,0.28);
          color: #00c8ff;
          transform: translateY(-2px);
        }
      `}</style>

      {/* Ambient top gradient */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, zIndex: 2,
        background: "linear-gradient(90deg,transparent,rgba(0,200,255,0.3) 30%,rgba(124,92,255,0.3) 70%,transparent)" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 30% at 50% 0%,rgba(0,200,255,0.03),transparent)" }} />

      <div className="ft-root" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>

          {/* ── MAIN GRID ── */}
          <div style={{ padding: "52px 0 44px" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "36px 24px",
            }} className="ft-grid">
              <style>{`
                @media (min-width:640px)  { .ft-grid { grid-template-columns: repeat(3,1fr); } }
                @media (min-width:1024px) { .ft-grid { grid-template-columns: 2fr 1fr 1fr 1fr 1fr; } }
              `}</style>

              {/* ── BRAND col — full width on mobile ── */}
              <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 18 }}
                className="ft-brand">
                <style>{`
                  @media (min-width:640px)  { .ft-brand { grid-column:1/-1; } }
                  @media (min-width:1024px) { .ft-brand { grid-column:auto; } }
                `}</style>

                {/* Logo */}
                <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", width: "fit-content" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
                    background: logoError ? "linear-gradient(135deg,#00c8ff,#7c5cff)" : "rgba(255,255,255,0.9)",
                    border: logoError ? "1px solid rgba(0,200,255,0.3)" : "1.5px solid rgba(255,255,255,0.8)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    padding: 3,
                  }}>
                    {!logoError ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={logoImage.src} alt="Astralearnia"
                        style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 7 }}
                        onError={() => setLogoError(true)} />
                    ) : (
                      <span style={{ fontWeight: 900, color: "#fff", fontSize: "1rem" }}>A</span>
                    )}
                  </div>
                  <span style={{
                    fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.02em",
                    background: "linear-gradient(90deg,rgba(0,200,255,.85) 0%,#fff 38%,rgba(124,92,255,.85) 70%,rgba(0,200,255,.85) 100%)",
                    backgroundSize: "400px 100%",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    animation: "ft-shimmer 6s linear infinite",
                  }}>Astralearnia</span>
                </Link>

                {/* Tagline */}
                <p style={{ margin: 0, fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.65, maxWidth: 230 }}>
                  Engineering Intelligence. Empowering Minds. The AI platform modern organisations trust to scale.
                </p>

                {/* Division pills */}
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {[
                    { href: "/divisions/technology", label: "Division 01 — Technology", color: "#00c8ff" },
                    { href: "/divisions/institute",  label: "Division 02 — Institute",  color: "#a855f7" },
                  ].map(d => (
                    <Link key={d.href} href={d.href} style={{
                      display: "inline-flex", alignItems: "center", gap: 7,
                      fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em",
                      padding: "5px 11px", borderRadius: 7, width: "fit-content",
                      background: `${d.color}0d`,
                      border: `1px solid ${d.color}25`,
                      color: `${d.color}cc`,
                      textDecoration: "none",
                      transition: "border-color .18s, color .18s",
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=`${d.color}55`; (e.currentTarget as HTMLElement).style.color=d.color; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor=`${d.color}25`; (e.currentTarget as HTMLElement).style.color=`${d.color}cc`; }}
                    >
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: d.color, boxShadow: `0 0 5px ${d.color}`, flexShrink: 0, animation: "ft-pulse 2.5s ease-in-out infinite" }} />
                      {d.label}
                    </Link>
                  ))}
                </div>

                {/* Socials */}
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                  {SOCIAL.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      aria-label={s.label} className="ft-social">{s.icon}</a>
                  ))}
                </div>
              </div>

              {/* ── LINK COLUMNS ── */}
              {Object.values(FOOTER_LINKS).map(col => (
                <div key={col.label} style={{ display: "flex", flexDirection: "column" }}>
                  <div className="ft-col-head">{col.label}</div>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                    {col.links.map(link => (
                      <li key={link.href}>
                        <Link href={link.href} className="ft-link">{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

          {/* ── BOTTOM BAR ── */}
          <div style={{
            padding: "16px 0",
            display: "flex", flexWrap: "wrap",
            alignItems: "center", justifyContent: "space-between",
            gap: "10px 16px",
          }}>
            {/* Left */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px" }}>
              <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)", fontWeight: 500 }}>
                © {year} Astralearnia Technologies Ltd. All rights reserved.
              </span>
              <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.13)", fontWeight: 400 }}>
                Built with AI. Secured with intent.
              </span>
            </div>

            {/* Right */}
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px 14px" }}>
              {[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }, { label: "Cookies", href: "/cookies" }].map(l => (
                <Link key={l.href} href={l.href} style={{
                  fontSize: "0.72rem", fontWeight: 500,
                  color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color .18s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color="rgba(0,200,255,0.75)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.25)"; }}
                >{l.label}</Link>
              ))}

              {/* Status pill — glass style */}
              <div style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "4px 10px", borderRadius: 20,
                background: "rgba(0,255,100,0.04)",
                border: "1px solid rgba(0,255,100,0.12)",
                backdropFilter: "blur(8px)",
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
                  background: "#00ff64", boxShadow: "0 0 5px rgba(0,255,100,0.8)",
                  animation: "ft-pulse 2s ease-in-out infinite",
                }} />
                <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", color: "rgba(0,255,100,0.7)" }}>
                  All Systems Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;