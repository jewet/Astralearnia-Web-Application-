"use client";
// ─────────────────────────────────────────────────────────────────
// FILE: components/layout/Footer.tsx
// Footer redesigned to match brand screenshot:
//   • Centred large brand name + tagline + division pills
//   • Horizontal-scrollable section cards (snap scroll on mobile,
//     4-col grid on md+)
//   • Bottom bar: copyright left · social icons right
// ─────────────────────────────────────────────────────────────────

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";


// ─── Section data ─────────────────────────────────────────────────
const SECTIONS = [
  {
    id: "divisions",
    label: "Divisions",
    accent: "rgba(0,200,255,0.6)",
    links: [
      { label: "Technology Division", href: "/technologies" },
      { label: "Institute Division",  href: "/institute"  },
      { label: "Compare Divisions",   href: "/"           },
      { label: "AI Models",           href: "/technologies/ai-models"      },
      { label: "Data Pipelines",      href: "/technologies/data-pipelines" },
      { label: "AI Security",         href: "/technologies/ai-security"    },
    ],
  },
  {
    id: "platform",
    label: "Platform",
    accent: "rgba(124,92,255,0.6)",
    links: [
      { label: "AI Solutions",   href: "/solutions"                              },
      { label: "API & SDK",      href: "/api-docs"                               },
      { label: "Integrations",   href: "/solutions"                              },
      { label: "Individuals",    href: "/institute/individuals"        },
      { label: "Enterprise",     href: "/institute/enterprise"         },
      { label: "Certifications", href: "/institute/certifications"     },
      { label: "Skills Analytics",href: "/institute/skills-analytics"  },
    ],
  },
  {
    id: "company",
    label: "Company",
    accent: "rgba(0,255,160,0.5)",
    links: [
      { label: "About Us",      href: "/about"    },
      { label: "Blog",          href: "/blog"     },
      { label: "Careers",       href: "/careers"  },
      { label: "Partners",      href: "/partners" },
      { label: "Press",         href: "/press"    },
      { label: "Contact",       href: "/contact"  },
    ],
  },
  {
    id: "legal",
    label: "Legal",
    accent: "rgba(255,160,50,0.5)",
    links: [
      { label: "Privacy Policy",     href: "/privacy"     },
      { label: "Terms of Service",   href: "/terms"       },
      { label: "Cookie Policy",      href: "/cookies"     },
      { label: "Compliance",         href: "/compliance"  },
      { label: "Data Processing",    href: "/dpa"         },
      { label: "Security",           href: "/security"    },
    ],
  },
];

const SOCIAL = [
  {
    label: "X / Twitter",
    href: "https://twitter.com/astralearnia",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.849L1.253 2.25h6.938l4.259 5.631 5.794-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/astralearnia",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/astralearnia",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@astralearnia",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function Footer() {
  const [year, setYear]           = useState(2025);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  return (
    <footer style={{ background: "#020408", borderTop: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>

      {/* ── CSS ── */}
      <style>{`
        @keyframes _ft_shimmer  { 0%{background-position:-700px 0} 100%{background-position:700px 0} }
        @keyframes _ft_pulse    { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes _ft_fadein   { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }

        /* ── scroll-section row ── */
        .ft-scroll-row {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 4px;
        }
        .ft-scroll-row::-webkit-scrollbar { display: none; }

        /* ── each section card ── */
        .ft-sec-card {
          min-width: 168px;
          flex-shrink: 0;
          scroll-snap-align: start;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 18px 16px 20px;
          background: rgba(255,255,255,0.025);
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: border-color 0.2s;
        }
        .ft-sec-card:hover { border-color: rgba(255,255,255,0.14); }

        /* on md+ spread into equal-width grid columns */
        @media(min-width:768px) {
          .ft-scroll-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            overflow-x: visible;
          }
          .ft-sec-card { min-width: unset; }
        }

        /* link styles */
        .ft-link {
          display: flex;
          align-items: center;
          gap: 7px;
          color: rgba(255,255,255,0.42);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          text-decoration: none;
          padding: 5px 0;
          line-height: 1.2;
          transition: color 0.15s;
        }
        .ft-link:hover { color: rgba(255,255,255,0.9); }
        .ft-link-dot {
          width: 4px; height: 4px; border-radius: 50%;
          flex-shrink: 0; opacity: 0.5;
          transition: opacity 0.15s;
        }
        .ft-link:hover .ft-link-dot { opacity: 1; }

        /* col header */
        .ft-col-head {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 12px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        /* scroll hint arrow — mobile only */
        .ft-scroll-hint {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          margin-bottom: 10px;
        }
        @media(min-width:768px) { .ft-scroll-hint { display: none; } }

        /* social button */
        .ft-soc-btn {
          width: 30px; height: 30px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          transition: background 0.15s, border-color 0.15s, color 0.15s, transform 0.15s;
          flex-shrink: 0;
        }
        .ft-soc-btn:hover {
          background: rgba(0,200,255,0.1);
          border-color: rgba(0,200,255,0.3);
          color: #00c8ff;
          transform: translateY(-2px);
        }
      `}</style>

      {/* ── ambient glow ── */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 80% 30% at 50% 0%,rgba(0,200,255,0.04),transparent)" }} />
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1,
        background:"linear-gradient(90deg,transparent 0%,rgba(0,200,255,0.2) 30%,rgba(124,92,255,0.25) 65%,transparent 100%)" }} />

      <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 16px" }} className="sm:px-6 lg:px-12">

        {/* ════════════════════════════════════════════
            TOP — centred brand block
        ════════════════════════════════════════════ */}
        <div style={{ textAlign:"center", paddingTop:52, paddingBottom:36, borderBottom:"1px solid rgba(255,255,255,0.05)" }}>

          {/* Logo + wordmark */}
          <Link href="/" style={{ display:"inline-flex", alignItems:"center", gap:10, textDecoration:"none", marginBottom:16 }}>
            <div style={{
              width:36, height:36, borderRadius:10, flexShrink:0, overflow:"hidden",
              display:"flex", alignItems:"center", justifyContent:"center",
              background: logoError ? "linear-gradient(135deg,#00c8ff,#7c5cff)" : "#fff",
              border: logoError ? "none" : "2px solid rgba(255,255,255,0.9)",
              boxShadow: "0 4px 16px rgba(255,255,255,0.12)", padding:2,
            }}>
              {!logoError ? (
                <Image src="/favicon.png" alt="Astralearnia" width={30} height={30}
                  style={{ objectFit:"contain", borderRadius:6 }}
                  unoptimized
                  onError={() => setLogoError(true)} />
              ) : (
                <span style={{ fontWeight:900, color:"#fff", fontSize:"1rem" }}>A</span>
              )}
            </div>
          </Link>

          {/* Large brand name */}
          <div style={{
            fontWeight: 900,
            fontSize: "clamp(2.2rem, 7vw, 4rem)",
            letterSpacing: "0.08em",
            lineHeight: 1,
            marginBottom: 10,
            background: "linear-gradient(90deg,rgba(0,200,255,.7) 0%,#fff 25%,rgba(60,100,255,.8) 45%,#fff 60%,rgba(124,92,255,.8) 80%,rgba(0,200,255,.7) 100%)",
            backgroundSize: "700px 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "_ft_shimmer 6s linear infinite",
          }}>
            ASTRALEARNIA
          </div>

          {/* Tagline */}
          <div style={{
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: 20,
          }}>
            Engineering Intelligence&nbsp;·&nbsp;Empowering Minds
          </div>

          {/* Division pills */}
          <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/technologies" style={{
              display:"inline-flex", alignItems:"center", gap:6,
              fontSize:"0.6rem", fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase",
              padding:"6px 14px", borderRadius:20,
              background:"rgba(0,200,255,0.07)", border:"1px solid rgba(0,200,255,0.22)",
              color:"rgba(0,200,255,0.85)", textDecoration:"none",
              transition:"border-color 0.15s, background 0.15s",
            }}
              onMouseEnter={(e:React.MouseEvent<HTMLAnchorElement>)=>{e.currentTarget.style.background="rgba(0,200,255,0.14)"; e.currentTarget.style.borderColor="rgba(0,200,255,0.45)";}}
              onMouseLeave={(e:React.MouseEvent<HTMLAnchorElement>)=>{e.currentTarget.style.background="rgba(0,200,255,0.07)"; e.currentTarget.style.borderColor="rgba(0,200,255,0.22)";}}
            >
              <span style={{ width:5, height:5, borderRadius:"50%", background:"#00c8ff", boxShadow:"0 0 5px #00c8ff", flexShrink:0, animation:"_ft_pulse 2s infinite" }} />
              ⚡ Technology Division
            </Link>
            <Link href="/institute" style={{
              display:"inline-flex", alignItems:"center", gap:6,
              fontSize:"0.6rem", fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase",
              padding:"6px 14px", borderRadius:20,
              background:"rgba(168,85,247,0.07)", border:"1px solid rgba(168,85,247,0.22)",
              color:"rgba(168,85,247,0.85)", textDecoration:"none",
              transition:"border-color 0.15s, background 0.15s",
            }}
              onMouseEnter={(e:React.MouseEvent<HTMLAnchorElement>)=>{e.currentTarget.style.background="rgba(168,85,247,0.14)"; e.currentTarget.style.borderColor="rgba(168,85,247,0.45)";}}
              onMouseLeave={(e:React.MouseEvent<HTMLAnchorElement>)=>{e.currentTarget.style.background="rgba(168,85,247,0.07)"; e.currentTarget.style.borderColor="rgba(168,85,247,0.22)";}}
            >
              <span style={{ width:5, height:5, borderRadius:"50%", background:"#a855f7", boxShadow:"0 0 5px #a855f7", flexShrink:0, animation:"_ft_pulse 2s infinite", animationDelay:"0.8s" }} />
              🎓 Institute Division
            </Link>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            MIDDLE — horizontal-scrollable section cards
        ════════════════════════════════════════════ */}
        <div style={{ paddingTop:28, paddingBottom:32 }}>

          {/* Mobile scroll hint */}
          <div className="ft-scroll-hint">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            Scroll to see more sections
          </div>

          <div className="ft-scroll-row">
            {SECTIONS.map(sec => (
              <div key={sec.id} className="ft-sec-card">

                {/* Column header with accent underline */}
                <div className="ft-col-head" style={{ color: sec.accent }}>
                  {sec.label}
                </div>

                {/* Links */}
                <div style={{ display:"flex", flexDirection:"column" }}>
                  {sec.links.map(link => (
                    <Link key={link.href + link.label} href={link.href} className="ft-link">
                      <span className="ft-link-dot" style={{ background: sec.accent }} />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div style={{ height:1, background:"rgba(255,255,255,0.05)" }} />

        {/* ════════════════════════════════════════════
            BOTTOM BAR
        ════════════════════════════════════════════ */}
        <div style={{
          padding:"16px 0",
          display:"flex", flexWrap:"wrap", alignItems:"center",
          justifyContent:"space-between", gap:12,
        }}>

          {/* Left — copyright */}
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"6px 14px" }}>
            <span style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.2)", fontWeight:500 }}>
              © {year} Astralearnia Technologies Ltd. All rights reserved.
            </span>
            <span className="hidden sm:block" style={{ width:1, height:10, background:"rgba(255,255,255,0.1)", flexShrink:0 }} />
            <span style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.12)", fontWeight:400 }}>
              Built with AI. Secured with intent.
            </span>
          </div>

          {/* Right — social + status */}
          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>

            {/* Bottom quick links */}
            <div style={{ display:"flex", gap:14, marginRight:6 }} className="hidden sm:flex">
              {[
                { label:"Privacy", href:"/privacy" },
                { label:"Terms",   href:"/terms"   },
                { label:"Cookies", href:"/cookies" },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{
                  fontSize:"0.7rem", fontWeight:500, color:"rgba(255,255,255,0.25)",
                  textDecoration:"none", transition:"color 0.15s",
                }}
                  onMouseEnter={(e:React.MouseEvent<HTMLAnchorElement>)=>{ e.currentTarget.style.color="rgba(0,200,255,0.8)"; }}
                  onMouseLeave={(e:React.MouseEvent<HTMLAnchorElement>)=>{ e.currentTarget.style.color="rgba(255,255,255,0.25)"; }}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Social icons */}
            {SOCIAL.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                aria-label={s.label} className="ft-soc-btn">
                {s.icon}
              </a>
            ))}

            {/* Status pill */}
            <div style={{
              display:"flex", alignItems:"center", gap:5, padding:"4px 9px",
              borderRadius:20, background:"rgba(0,255,100,0.05)",
              border:"1px solid rgba(0,255,100,0.12)",
            }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:"#00ff64",
                boxShadow:"0 0 5px rgba(0,255,100,0.85)", flexShrink:0,
                animation:"_ft_pulse 2s ease-in-out infinite" }} />
              <span style={{ fontSize:"0.55rem", fontWeight:700, letterSpacing:"0.06em", color:"rgba(0,255,100,0.7)" }}>
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