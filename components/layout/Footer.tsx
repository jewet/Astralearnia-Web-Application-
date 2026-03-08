"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
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
      { label: "Privacy Policy",    href: "/privacy"  },
      { label: "Terms of Service",  href: "/terms"    },
      { label: "Cookie Policy",     href: "/cookies"  },
      { label: "Data Processing",   href: "/dpa"      },
      { label: "Security",          href: "/security" },
    ],
  },
};

const SOCIAL = [
  {
    label: "X / Twitter",
    href: "https://twitter.com/astralearnia",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.849L1.253 2.25h6.938l4.259 5.631 5.794-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/astralearnia",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/astralearnia",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@astralearnia",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function Footer() {
  const [year, setYear] = useState(2025);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      style={{
        background: "linear-gradient(180deg,#040710 0%,#020408 100%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes _ft_shimmer { 0%{background-position:-500px 0} 100%{background-position:500px 0} }
        @keyframes _ft_pulse   { 0%,100%{opacity:.45} 50%{opacity:1} }
        .ft-link { color: rgba(255,255,255,0.45); font-size: 0.8125rem; font-weight: 500; letter-spacing: 0.01em; transition: color 0.18s ease; text-decoration: none; display: block; line-height: 1; }
        .ft-link:hover { color: rgba(255,255,255,0.9); }
        .ft-col-head { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: rgba(255,255,255,0.22); margin-bottom: 18px; }
      `}</style>

      {/* Subtle ambient top beam */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg,transparent 0%,rgba(0,200,255,0.25) 30%,rgba(124,92,255,0.3) 60%,transparent 100%)",
      }} />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 35% at 50% 0%,rgba(0,200,255,0.04),transparent)",
      }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }} className="sm:px-6 lg:px-18">

        {/* ── MAIN GRID ── */}
        <div style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-6">

            {/* ── BRAND COLUMN — spans 2 on lg ── */}
            <div className="col-span-2 lg:col-span-2" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Logo — using Next.js Image to fix StaticImageData type error */}
              <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", width: "fit-content" }}>
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
                    background: logoError
                      ? "linear-gradient(135deg,#00c8ff 0%,#3b6bff 45%,#7c5cff 100%)"
                      : "#ffffff",
                    border: logoError ? "none" : "2px solid rgba(255,255,255,0.9)",
                    boxShadow: logoError
                      ? "0 4px 16px rgba(0,200,255,0.4),inset 0 -1px 4px rgba(0,0,0,0.3)"
                      : "0 4px 20px rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.1)",
                    padding: 3,
                  }}
                >
                  {!logoError ? (
                    <Image
                      src={logoImage}
                      alt="Astralearnia"
                      width={34}
                      height={34}
                      style={{ objectFit: "contain", borderRadius: 8 }}
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <span style={{ fontWeight: 900, color: "#fff", fontSize: "1.1rem", position: "relative", zIndex: 1 }}>A</span>
                  )}
                </div>

                <span
                  style={{
                    fontWeight: 900,
                    fontSize: "1.05rem",
                    letterSpacing: "-0.02em",
                    background: "linear-gradient(90deg,rgba(0,200,255,.85) 0%,#fff 38%,rgba(124,92,255,.85) 68%,rgba(0,200,255,.85) 100%)",
                    backgroundSize: "400px 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "_ft_shimmer 5s linear infinite",
                  }}
                >
                  Astralearnia
                </span>
              </Link>

              {/* Tagline */}
              <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, fontWeight: 400, maxWidth: 240 }}>
                Engineering Intelligence. Empowering Minds. The AI platform modern organisations trust to scale.
              </p>

              {/* Division pills */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Link
                  href="/divisions/technology"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.04em",
                    padding: "6px 12px", borderRadius: 8, width: "fit-content",
                    background: "rgba(0,200,255,0.06)",
                    border: "1px solid rgba(0,200,255,0.18)",
                    color: "rgba(0,200,255,0.8)",
                    textDecoration: "none",
                    transition: "border-color 0.18s, color 0.18s",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.borderColor = "rgba(0,200,255,0.42)";
                    e.currentTarget.style.color = "#00c8ff";
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.borderColor = "rgba(0,200,255,0.18)";
                    e.currentTarget.style.color = "rgba(0,200,255,0.8)";
                  }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00c8ff", boxShadow: "0 0 6px rgba(0,200,255,0.9)", flexShrink: 0, animation: "_ft_pulse 2.5s ease-in-out infinite" }} />
                  Division 01 — Technology
                </Link>
                <Link
                  href="/divisions/institute"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.04em",
                    padding: "6px 12px", borderRadius: 8, width: "fit-content",
                    background: "rgba(168,85,247,0.06)",
                    border: "1px solid rgba(168,85,247,0.18)",
                    color: "rgba(168,85,247,0.8)",
                    textDecoration: "none",
                    transition: "border-color 0.18s, color 0.18s",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.borderColor = "rgba(168,85,247,0.42)";
                    e.currentTarget.style.color = "#a855f7";
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.borderColor = "rgba(168,85,247,0.18)";
                    e.currentTarget.style.color = "rgba(168,85,247,0.8)";
                  }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#a855f7", boxShadow: "0 0 6px rgba(168,85,247,0.9)", flexShrink: 0, animation: "_ft_pulse 2.5s ease-in-out infinite", animationDelay: "1s" }} />
                  Division 02 — Institute
                </Link>
              </div>

              {/* Social icons */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {SOCIAL.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.35)",
                      textDecoration: "none",
                      transition: "background 0.18s, border-color 0.18s, color 0.18s, transform 0.18s",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      const el = e.currentTarget;
                      el.style.background = "rgba(0,200,255,0.1)";
                      el.style.borderColor = "rgba(0,200,255,0.3)";
                      el.style.color = "#00c8ff";
                      el.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      const el = e.currentTarget;
                      el.style.background = "rgba(255,255,255,0.04)";
                      el.style.borderColor = "rgba(255,255,255,0.08)";
                      el.style.color = "rgba(255,255,255,0.35)";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* ── LINK COLUMNS ── */}
            {Object.values(FOOTER_LINKS).map(col => (
              <div key={col.label} style={{ display: "flex", flexDirection: "column" }}>
                <div className="ft-col-head">{col.label}</div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 13 }}>
                  {col.links.map(link => (
                    <li key={link.href}>
                      <Link href={link.href} className="ft-link">
                        {link.label}
                      </Link>
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
        <div
          style={{ padding: "18px 0", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}
        >
          {/* Left */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 16px" }}>
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.22)", fontWeight: 500 }}>
              © {year} Astralearnia Technologies Ltd. All rights reserved.
            </span>
            <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} className="hidden sm:block" />
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.15)", fontWeight: 400 }}>
              Built with AI. Secured with intent.
            </span>
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms",   href: "/terms"   },
              { label: "Cookies", href: "/cookies" },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
                style={{ fontSize: "0.75rem", fontWeight: 500, color: "rgba(255,255,255,0.28)", textDecoration: "none", transition: "color 0.18s" }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = "rgba(0,200,255,0.8)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.28)";
                }}
              >
                {l.label}
              </Link>
            ))}

            {/* Status pill */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "4px 10px", borderRadius: 20,
              background: "rgba(0,255,100,0.05)",
              border: "1px solid rgba(0,255,100,0.14)",
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "#00ff64", boxShadow: "0 0 6px rgba(0,255,100,0.85)",
                flexShrink: 0, animation: "_ft_pulse 2s ease-in-out infinite",
              }} />
              <span style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.06em", color: "rgba(0,255,100,0.75)" }}>
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;