"use client";
// ─── components/AdCard.tsx ────────────────────────────────────────────────────
// Global floating ad card — fixed bottom-left, appears on every page.
// Completely self-contained. Import once in app/layout.tsx.
//
// To change the ad: edit the AD_CONFIG object below.
// To add multiple rotating ads: extend ADS array and use the rotation logic.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

// ══════════════════════════════════════════════════════════════════════════════
// AD CONFIGURATION — edit this to update the ad content
// ══════════════════════════════════════════════════════════════════════════════
interface AdConfig {
  id:          string;   // unique id — used to track dismissal in sessionStorage
  badge:       string;   // small eyebrow label
  badgeColor:  string;   // accent color for badge + border
  emoji:       string;   // large icon / emoji
  title:       string;   // main headline (keep short)
  sub:         string;   // supporting line (1 sentence max)
  cta:         string;   // button label
  href:        string;   // button destination
  external?:   boolean;  // open in new tab?
  // visual
  glowColor:   string;   // rgba glow behind card
  gradFrom:    string;   // card gradient start
  gradTo:      string;   // card gradient end
  borderColor: string;   // card border
  ctaGradient: string;   // CTA button gradient
  ctaShadow:   string;   // CTA button shadow
}

// ── Rotating ad slots ──────────────────────────────────────────────────────────
const ADS: AdConfig[] = [
  {
    id:          "ad-institute-2026",
    badge:       "🎓 Institute Division",
    badgeColor:  "#a78bfa",
    emoji:       "📡",
    title:       "AI Certifications — Now Open",
    sub:         "6 tracks. Blockchain-verified. Updated quarterly.",
    cta:         "Enrol Now →",
    href:        "/institute",
    glowColor:   "rgba(167,139,250,0.18)",
    gradFrom:    "rgba(13,8,28,0.97)",
    gradTo:      "rgba(9,5,20,0.97)",
    borderColor: "rgba(167,139,250,0.35)",
    ctaGradient: "linear-gradient(135deg,#a78bfa,#e879f9)",
    ctaShadow:   "0 4px 18px rgba(167,139,250,0.38)",
  },
  {
    id:          "ad-tech-api-2026",
    badge:       "⚡ Technology Division",
    badgeColor:  "#22d3ee",
    emoji:       "🚀",
    title:       "Deploy AI in Under 48h",
    sub:         "Custom models, APIs, pipelines. No templates.",
    cta:         "Book a Demo →",
    href:        "/book-demo",
    glowColor:   "rgba(0,200,255,0.15)",
    gradFrom:    "rgba(5,14,24,0.97)",
    gradTo:      "rgba(3,8,16,0.97)",
    borderColor: "rgba(0,200,255,0.32)",
    ctaGradient: "linear-gradient(135deg,#22d3ee,#3b82f6)",
    ctaShadow:   "0 4px 18px rgba(0,200,255,0.38)",
  },
  {
    id:          "ad-mvp-2026",
    badge:       "🚀 Rapid Build",
    badgeColor:  "#e879f9",
    emoji:       "💡",
    title:       "Idea → MVP in 4–8 Weeks",
    sub:         "Product strategy, build & AI features. Launch-ready.",
    cta:         "Start Your Build →",
    href:        "/contact",
    glowColor:   "rgba(232,121,249,0.15)",
    gradFrom:    "rgba(18,5,22,0.97)",
    gradTo:      "rgba(10,3,14,0.97)",
    borderColor: "rgba(232,121,249,0.32)",
    ctaGradient: "linear-gradient(135deg,#e879f9,#a78bfa)",
    ctaShadow:   "0 4px 18px rgba(232,121,249,0.38)",
  },
];

// Rotate every N seconds when card is open
const ROTATE_INTERVAL_MS = 8000;
// Delay before card slides in on first mount
const ENTRY_DELAY_MS = 3200;

// ══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function AdCard() {
  const [mounted,   setMounted]   = useState(false);
  const [visible,   setVisible]   = useState(false);   // slide-in state
  const [adIdx,     setAdIdx]     = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [changing,  setChanging]  = useState(false);   // fade between ads
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ad = ADS[adIdx];

  // ── Mount + entry delay ────────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    // Check if user dismissed this session
    try {
      const seen = sessionStorage.getItem("astra-ad-dismissed");
      if (seen === "true") { setDismissed(true); return; }
    } catch {}

    const t = setTimeout(() => setVisible(true), ENTRY_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // ── Auto-rotate ads ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!visible || minimised || ADS.length <= 1) return;
    timerRef.current = setInterval(() => {
      setChanging(true);
      setTimeout(() => {
        setAdIdx(i => (i + 1) % ADS.length);
        setChanging(false);
      }, 320);
    }, ROTATE_INTERVAL_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [visible, minimised]);

  // ── Dismiss ────────────────────────────────────────────────────────────────
  const dismiss = () => {
    setVisible(false);
    setTimeout(() => setDismissed(true), 420);
    try { sessionStorage.setItem("astra-ad-dismissed", "true"); } catch {}
  };

  if (!mounted || dismissed) return null;

  return (
    <>
      <style>{`
        @keyframes adSlideIn {
          from { opacity:0; transform:translateY(24px) scale(0.96); }
          to   { opacity:1; transform:translateY(0)    scale(1); }
        }
        @keyframes adSlideOut {
          from { opacity:1; transform:translateY(0)    scale(1); }
          to   { opacity:0; transform:translateY(24px) scale(0.94); }
        }
        @keyframes adPulse {
          0%,100% { opacity:0.5; transform:scale(1); }
          50%     { opacity:1;   transform:scale(1.35); }
        }
        @keyframes adShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes adBeam {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(400%)  skewX(-15deg); }
        }
        @keyframes adOrbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .ad-shimmer {
          background-size: 200% auto;
          animation: adShimmer 3.5s linear infinite;
        }
        .ad-dismiss-btn:hover { opacity: 1 !important; background: rgba(255,255,255,0.14) !important; }
        .ad-min-btn:hover { background: rgba(255,255,255,0.1) !important; }
        .ad-cta-btn:hover { transform: translateY(-1px); filter: brightness(1.1); }
      `}</style>

      {/* ── Floating container ────────────────────────────────────────────────── */}
      <div
        style={{
          position:   "fixed",
          bottom:     24,
          left:       24,
          zIndex:     9997,
          width:      "clamp(260px, 28vw, 310px)",
          animation:  visible
            ? "adSlideIn 0.42s cubic-bezier(0.34,1.56,0.64,1) both"
            : "adSlideOut 0.38s ease both",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        {/* Outer glow */}
        <div style={{
          position:    "absolute",
          inset:       -12,
          borderRadius: 24,
          background:  ad.glowColor,
          filter:      "blur(18px)",
          pointerEvents: "none",
          zIndex:      0,
          transition:  "background 0.6s ease",
        }} />

        {/* Card */}
        <div style={{
          position:    "relative",
          zIndex:      1,
          background:  `linear-gradient(145deg, ${ad.gradFrom}, ${ad.gradTo})`,
          border:      `1px solid ${ad.borderColor}`,
          borderRadius: 18,
          overflow:    "hidden",
          backdropFilter: "blur(20px)",
          boxShadow:   `0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)`,
          transition:  "border-color 0.5s ease",
          opacity:     changing ? 0 : 1,
          transform:   changing ? "translateY(6px) scale(0.98)" : "none",
          transition2: "opacity 0.28s ease, transform 0.28s ease",
        } as React.CSSProperties}>

          {/* Top accent line */}
          <div style={{
            height:     2,
            background: ad.ctaGradient,
            opacity:    0.85,
          }} />

          {/* Beam sweep */}
          <div style={{
            position:    "absolute",
            top:         0,
            left:        0,
            width:       "40%",
            height:      "100%",
            background:  "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
            animation:   "adBeam 4s ease-in-out infinite",
            pointerEvents: "none",
            zIndex:      2,
          }} />

          {/* Grid pattern */}
          <div style={{
            position:    "absolute",
            inset:       0,
            opacity:     0.025,
            backgroundImage: `linear-gradient(${ad.badgeColor} 1px, transparent 1px), linear-gradient(90deg, ${ad.badgeColor} 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            pointerEvents: "none",
            zIndex:      0,
          }} />

          {/* ── Header row ────────────────────────────────────────────────────── */}
          <div style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            padding:        "10px 12px 0",
            position:       "relative",
            zIndex:         3,
          }}>
            {/* Badge */}
            <div style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           5,
              padding:       "3px 9px",
              borderRadius:  20,
              background:    `${ad.badgeColor}14`,
              border:        `1px solid ${ad.badgeColor}35`,
              fontSize:      "0.6rem",
              fontWeight:    800,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color:         ad.badgeColor,
              fontFamily:    "inherit",
            }}>
              <span style={{
                width:        5,
                height:       5,
                borderRadius: "50%",
                background:   ad.badgeColor,
                boxShadow:    `0 0 6px ${ad.badgeColor}`,
                animation:    "adPulse 2s ease-in-out infinite",
                display:      "inline-block",
                flexShrink:   0,
              }} />
              {ad.badge}
            </div>

            {/* Controls */}
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {/* Minimise / expand */}
              <button
                className="ad-min-btn"
                onClick={() => setMinimised(m => !m)}
                title={minimised ? "Expand" : "Minimise"}
                style={{
                  width:        22,
                  height:       22,
                  borderRadius: 6,
                  border:       "none",
                  background:   "rgba(255,255,255,0.06)",
                  color:        "rgba(255,255,255,0.4)",
                  cursor:       "pointer",
                  display:      "flex",
                  alignItems:   "center",
                  justifyContent: "center",
                  fontSize:     10,
                  transition:   "background 0.15s",
                  padding:      0,
                }}
              >
                {minimised ? "+" : "−"}
              </button>
              {/* Dismiss */}
              <button
                className="ad-dismiss-btn"
                onClick={dismiss}
                title="Close"
                style={{
                  width:        22,
                  height:       22,
                  borderRadius: 6,
                  border:       "none",
                  background:   "rgba(255,255,255,0.06)",
                  color:        "rgba(255,255,255,0.35)",
                  cursor:       "pointer",
                  display:      "flex",
                  alignItems:   "center",
                  justifyContent: "center",
                  fontSize:     11,
                  transition:   "background 0.15s, opacity 0.15s",
                  opacity:      0.6,
                  padding:      0,
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* ── Body (collapsible) ───────────────────────────────────────────── */}
          <div style={{
            maxHeight:  minimised ? 0 : 300,
            overflow:   "hidden",
            transition: "max-height 0.38s cubic-bezier(0.4,0,0.2,1)",
          }}>
            <div style={{ padding: "10px 14px 14px", position: "relative", zIndex: 3 }}>

              {/* Emoji + title row */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                {/* Emoji orb */}
                <div style={{
                  width:        40,
                  height:       40,
                  borderRadius: 12,
                  background:   `${ad.badgeColor}14`,
                  border:       `1px solid ${ad.badgeColor}30`,
                  display:      "flex",
                  alignItems:   "center",
                  justifyContent: "center",
                  fontSize:     18,
                  flexShrink:   0,
                  position:     "relative",
                  overflow:     "hidden",
                }}>
                  {/* Orbit ring */}
                  <div style={{
                    position:    "absolute",
                    width:       "90%",
                    paddingBottom: "90%",
                    borderRadius: "50%",
                    border:      `1px solid ${ad.badgeColor}20`,
                    animation:   "adOrbit 6s linear infinite",
                  }}>
                    <div style={{
                      position:    "absolute",
                      top:         -3,
                      left:        "50%",
                      width:       5,
                      height:      5,
                      borderRadius: "50%",
                      background:  ad.badgeColor,
                      transform:   "translateX(-50%)",
                      boxShadow:   `0 0 6px ${ad.badgeColor}`,
                    }} />
                  </div>
                  <span style={{ position: "relative", zIndex: 1 }}>{ad.emoji}</span>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize:      "0.8rem",
                    fontWeight:    900,
                    color:         "#fff",
                    lineHeight:    1.25,
                    letterSpacing: "-0.01em",
                    marginBottom:  3,
                  }}>{ad.title}</div>
                  <div style={{
                    fontSize:   "0.68rem",
                    color:      "rgba(148,163,184,0.75)",
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}>{ad.sub}</div>
                </div>
              </div>

              {/* Progress dots (which ad is showing) */}
              {ADS.length > 1 && (
                <div style={{
                  display:        "flex",
                  justifyContent: "center",
                  gap:            5,
                  marginBottom:   10,
                }}>
                  {ADS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setChanging(true);
                        setTimeout(() => { setAdIdx(i); setChanging(false); }, 280);
                        // reset rotation timer
                        if (timerRef.current) clearInterval(timerRef.current);
                      }}
                      style={{
                        width:        i === adIdx ? 18 : 5,
                        height:       5,
                        borderRadius: 3,
                        border:       "none",
                        padding:      0,
                        cursor:       "pointer",
                        background:   i === adIdx ? ad.badgeColor : "rgba(255,255,255,0.18)",
                        transition:   "all 0.3s ease",
                        boxShadow:    i === adIdx ? `0 0 8px ${ad.badgeColor}80` : "none",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* CTA button */}
              {ad.external ? (
                <a
                  href={ad.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ad-cta-btn"
                  style={{
                    display:        "block",
                    width:          "100%",
                    padding:        "8px 14px",
                    borderRadius:   12,
                    background:     ad.ctaGradient,
                    boxShadow:      ad.ctaShadow,
                    color:          "#fff",
                    fontWeight:     800,
                    fontSize:       "0.75rem",
                    textAlign:      "center" as const,
                    textDecoration: "none",
                    letterSpacing:  "0.02em",
                    transition:     "transform 0.2s, filter 0.2s",
                    position:       "relative",
                    overflow:       "hidden",
                  }}
                >
                  {ad.cta}
                </a>
              ) : (
                <Link
                  href={ad.href}
                  className="ad-cta-btn"
                  style={{
                    display:        "block",
                    width:          "100%",
                    padding:        "8px 14px",
                    borderRadius:   12,
                    background:     ad.ctaGradient,
                    boxShadow:      ad.ctaShadow,
                    color:          "#fff",
                    fontWeight:     800,
                    fontSize:       "0.75rem",
                    textAlign:      "center" as const,
                    textDecoration: "none",
                    letterSpacing:  "0.02em",
                    transition:     "transform 0.2s, filter 0.2s",
                    position:       "relative",
                    overflow:       "hidden",
                  }}
                >
                  {/* Beam on button */}
                  <span style={{
                    position:    "absolute",
                    inset:       0,
                    background:  "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
                    animation:   "adBeam 2.5s linear infinite",
                    pointerEvents: "none",
                  }} />
                  <span style={{ position: "relative", zIndex: 1 }}>{ad.cta}</span>
                </Link>
              )}

              {/* Sponsor label */}
              <p style={{
                textAlign:  "center",
                marginTop:  7,
                fontSize:   "0.55rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color:      "rgba(100,116,139,0.45)",
              }}>
                ASTRALEARNIA · SPONSORED
              </p>
            </div>
          </div>

          {/* Minimised peek bar */}
          {minimised && (
            <div style={{
              padding:        "8px 14px",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              position:       "relative",
              zIndex:         3,
            }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 800, color: ad.badgeColor }}>{ad.emoji} {ad.title}</span>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.3)" }}>tap to expand</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}