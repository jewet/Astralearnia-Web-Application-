"use client";

import Link from "next/link";

const cols = [
  {
    heading: "Divisions",
    accent: "#00c8ff",
    links: [
      { label: "Technology Division", href: "/technologies" },
      { label: "Institute Division",  href: "/institute"    },
      { label: "Compare Divisions",   href: "/#divisions"   },
    ],
  },
  {
    heading: "Platform",
    accent: "#7c5cff",
    links: [
      { label: "AI Solutions",  href: "/solutions"    },
      { label: "Products",      href: "/products"     },
      { label: "API & SDK",     href: "/api-docs"     },
      { label: "Integrations",  href: "/integrations" },
      { label: "Documentation", href: "/docs"         },
      { label: "Changelog",     href: "/changelog"    },
    ],
  },
  {
    heading: "Company",
    accent: "#00ffb2",
    links: [
      { label: "About Us", href: "/about"    },
      { label: "Blog",     href: "/blog"     },
      { label: "Careers",  href: "/careers"  },
      { label: "Partners", href: "/partners" },
      { label: "Contact",  href: "/contact"  },
    ],
  },
  {
    heading: "Legal",
    accent: "#ff6ec7",
    links: [
      { label: "Privacy Policy",   href: "/privacy"    },
      { label: "Terms of Service", href: "/terms"      },
      { label: "Security",         href: "/security"   },
      { label: "Compliance",       href: "/compliance" },
      { label: "Cookie Policy",    href: "/cookies"    },
    ],
  },
];

const socials = [
  { label: "X",        href: "https://twitter.com/astralearnia",          symbol: "𝕏",   color: "#00c8ff" },
  { label: "LinkedIn", href: "https://linkedin.com/company/astralearnia", symbol: "in",  color: "#0a85ff" },
  { label: "GitHub",   href: "https://github.com/astralearnia",           symbol: "</>", color: "#7c5cff" },
  { label: "YouTube",  href: "https://youtube.com/@astralearnia",         symbol: "▶",   color: "#ff3b3b" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#030508] overflow-hidden">
      <style>{`
        @keyframes _fp2_grid   { 0%,100%{opacity:.02} 50%{opacity:.05} }
        @keyframes _fp2_orb1   { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,-28px) scale(1.12)} }
        @keyframes _fp2_orb2   { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-45px,22px) scale(1.08)} }
        @keyframes _fp2_scan   { 0%{top:-1px;opacity:0} 5%{opacity:.4} 95%{opacity:.4} 100%{top:100%;opacity:0} }
        @keyframes _fp2_shim   { 0%{background-position:-700px 0} 100%{background-position:700px 0} }
        @keyframes _fp2_float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes _fp2_flick  { 0%,85%,100%{opacity:1} 87%{opacity:.6} 91%{opacity:.95} 93%{opacity:.55} 96%{opacity:1} }
        @keyframes _fp2_card   { 0%,100%{border-color:rgba(255,255,255,.05)} 50%{border-color:rgba(0,200,255,.14)} }
        @keyframes _fp2_beam   { 0%,100%{opacity:.75} 50%{opacity:1} }
        .fp2-lk .fp2-arr { transition:transform .2s; display:inline-block; }
        .fp2-lk:hover .fp2-arr { transform:translateX(4px); }
        .fp2-lk:hover  { color:#fff !important; }
      `}</style>

      {/* ── dot grid ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:"radial-gradient(circle,rgba(0,200,255,.25) 1px,transparent 1px)", backgroundSize:"44px 44px", animation:"_fp2_grid 8s ease-in-out infinite" }}
      />

      {/* ── orbs ── */}
      <div className="absolute -top-48 -left-48 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(circle,rgba(0,200,255,.11) 0%,transparent 65%)", filter:"blur(55px)", animation:"_fp2_orb1 14s ease-in-out infinite" }}
      />
      <div className="absolute -bottom-52 -right-52 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(circle,rgba(124,92,255,.09) 0%,transparent 65%)", filter:"blur(60px)", animation:"_fp2_orb2 18s ease-in-out infinite" }}
      />

      {/* ── scanline ── */}
      <div className="absolute left-0 right-0 h-[1px] pointer-events-none z-[2]"
        style={{ background:"linear-gradient(90deg,transparent,rgba(0,200,255,.45) 50%,transparent)", animation:"_fp2_scan 14s linear infinite" }}
      />

      {/* ── top beam ── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none z-[3]"
        style={{ background:"linear-gradient(90deg,transparent 0%,#00c8ff 20%,#7c5cff 50%,#00ffb2 80%,transparent 100%)", boxShadow:"0 0 18px rgba(0,200,255,.65),0 0 55px rgba(0,200,255,.22),0 0 90px rgba(124,92,255,.16)", animation:"_fp2_beam 4s ease-in-out infinite" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-6 lg:px-12">

        {/* ── WORDMARK ── */}
        <div className="pt-12 pb-8 text-center">
          <div style={{ animation:"_fp2_float 7s ease-in-out infinite" }}>
            <h2
              className="font-black leading-none tracking-[-0.05em] select-none"
              style={{
                fontSize:"clamp(2.8rem,8vw,6.5rem)",
                background:"linear-gradient(135deg,#00c8ff 0%,#fff 25%,#7c5cff 52%,#fff 70%,#00ffb2 100%)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                filter:"drop-shadow(0 0 30px rgba(0,200,255,.4)) drop-shadow(0 0 65px rgba(124,92,255,.22))",
                animation:"_fp2_flick 10s ease-in-out infinite",
              }}
            >
              ASTRALEARNIA
            </h2>
          </div>

          {/* tagline */}
          <p
            className="mt-4 font-bold uppercase"
            style={{
              fontSize:"clamp(.7rem,1.8vw,1.1rem)", letterSpacing:"0.22em",
              background:"linear-gradient(90deg,rgba(0,200,255,.5) 0%,rgba(255,255,255,.95) 40%,rgba(124,92,255,.5) 70%,rgba(0,200,255,.5) 100%)",
              backgroundSize:"700px 100%",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              animation:"_fp2_shim 5s linear infinite",
            }}
          >
            Engineering Intelligence · Empowering Minds
          </p>

          {/* division pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {[
              { label:"⚡ Technology Division", href:"/technologies", c:"#00c8ff" },
              { label:"🎓 Institute Division",  href:"/institute",    c:"#a855f7" },
            ].map(d=>(
              <Link key={d.href} href={d.href}
                className="font-bold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                style={{ fontSize:".72rem", padding:"8px 18px", borderRadius:10, border:`1px solid ${d.c}40`, background:`linear-gradient(135deg,${d.c}14,${d.c}07)` }}
                onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.boxShadow=`0 0 26px ${d.c}60,inset 0 0 16px ${d.c}22`; el.style.borderColor=`${d.c}85`; }}
                onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.boxShadow=""; el.style.borderColor=`${d.c}40`; }}
              >{d.label}</Link>
            ))}
          </div>
        </div>

        {/* ── separator ── */}
        <div className="h-[1px] mb-8"
          style={{ background:"linear-gradient(90deg,transparent,rgba(0,200,255,.45) 25%,rgba(124,92,255,.65) 50%,rgba(0,200,255,.45) 75%,transparent)", boxShadow:"0 0 14px rgba(0,200,255,.28),0 0 40px rgba(124,92,255,.15)" }}
        />

        {/* ── COLUMNS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {cols.map(col=>(
            <div key={col.heading} className="rounded-xl p-4 lg:p-5"
              style={{ background:"linear-gradient(145deg,rgba(255,255,255,.03),rgba(255,255,255,.01))", border:"1px solid rgba(255,255,255,.06)", backdropFilter:"blur(10px)", animation:"_fp2_card 7s ease-in-out infinite" }}
            >
              <h4 className="font-extrabold uppercase mb-4"
                style={{ fontSize:".65rem", letterSpacing:"0.28em", color:col.accent, textShadow:`0 0 14px ${col.accent}90` }}
              >{col.heading}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map(lk=>(
                  <li key={lk.href}>
                    <Link href={lk.href} className="fp2-lk flex items-center gap-1.5 font-medium transition-colors duration-200"
                      style={{ fontSize:".82rem", color:"rgba(255,255,255,.42)" }}
                    >
                      <span className="fp2-arr" style={{ fontSize:8, color:col.accent, opacity:.65 }}>▶</span>
                      {lk.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop:"1px solid rgba(255,255,255,.06)" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-center sm:text-left">
            <p className="font-semibold tracking-wide" style={{ fontSize:".78rem", color:"rgba(255,255,255,.28)" }}>
              © {year} Astralearnia Technologies Ltd. All rights reserved.
            </p>
            <div className="flex gap-3">
              {[{label:"Privacy",href:"/privacy"},{label:"Terms",href:"/terms"},{label:"Security",href:"/security"},{label:"Cookies",href:"/cookies"}].map(l=>(
                <Link key={l.href} href={l.href} className="transition-colors hover:text-white/60"
                  style={{ fontSize:".72rem", color:"rgba(255,255,255,.2)" }}>{l.label}</Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {socials.map(s=>(
              <Link key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="flex items-center justify-center rounded-xl font-bold transition-all duration-300 hover:-translate-y-1"
                style={{ width:36, height:36, fontSize:".78rem", color:"rgba(255,255,255,.4)", background:"linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.02))", border:"1px solid rgba(255,255,255,.08)" }}
                onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.boxShadow=`0 0 20px ${s.color}65,inset 0 0 10px ${s.color}22`; el.style.borderColor=`${s.color}60`; el.style.color="#fff"; }}
                onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.boxShadow=""; el.style.borderColor="rgba(255,255,255,.08)"; el.style.color="rgba(255,255,255,.4)"; }}
              >{s.symbol}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── bottom edge ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{ background:"linear-gradient(90deg,transparent,rgba(124,92,255,.7) 50%,transparent)", boxShadow:"0 0 12px rgba(124,92,255,.4)" }}
      />
    </footer>
  );
}

export default Footer;