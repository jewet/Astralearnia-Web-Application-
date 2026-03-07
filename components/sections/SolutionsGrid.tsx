import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SOLUTIONS } from "@/lib/constants";

const accentMap = {
  azure: {
    dot: "bg-azure",
    glow: "rgba(37,99,235,0.08)",
    border: "rgba(37,99,235,0.18)",
    borderHover: "rgba(37,99,235,0.4)",
    text: "text-azure-light",
    tag: "bg-[rgba(37,99,235,0.08)] border-[rgba(37,99,235,0.15)] text-azure-light",
  },
  violet: {
    dot: "bg-violet",
    glow: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.18)",
    borderHover: "rgba(124,58,237,0.4)",
    text: "text-violet-light",
    tag: "bg-[rgba(124,58,237,0.08)] border-[rgba(124,58,237,0.15)] text-violet-light",
  },
  ice: {
    dot: "bg-ice",
    glow: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.18)",
    borderHover: "rgba(6,182,212,0.4)",
    text: "text-ice-light",
    tag: "bg-[rgba(6,182,212,0.08)] border-[rgba(6,182,212,0.15)] text-ice-light",
  },
};

export function SolutionsGrid() {
  return (
    <section className="relative bg-void section-padding">
      <div className="max-w-[1400px] mx-auto">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel className="mb-4">What We Build</SectionLabel>
            <h2 className="font-display text-[clamp(36px,4vw,56px)] font-bold tracking-[-0.04em] text-white">
              Solutions Built<br />for Scale
            </h2>
          </div>
          <p className="text-[rgba(255,255,255,0.4)] text-base font-light max-w-[340px] leading-relaxed lg:text-right">
            Every solution engineered for enterprise-grade performance, security, and global deployment from day one.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden">
          {SOLUTIONS.map((solution) => {
            const accent = accentMap[solution.color];
            return (
              <Link
                key={solution.id}
                href={solution.href}
                className="group relative bg-[#0B1120] p-9 overflow-hidden cursor-none block"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top left, ${accent.glow}, transparent 60%)` }}
                />

                {/* Bottom border reveal */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${accent.borderHover}, transparent)`,
                    opacity: 0,
                  }}
                />
                <div className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${accent.borderHover}, transparent)` }}
                />

                <div className="relative z-10">
                  {/* Symbol */}
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-3xl text-[rgba(255,255,255,0.15)] font-display font-bold group-hover:text-[rgba(255,255,255,0.35)] transition-colors duration-300">
                      {solution.icon}
                    </span>
                    <span className={`text-xs font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${accent.text}`}>
                      {solution.division === "institute" ? "Institute" : "Technology"}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-white mb-3 group-hover:text-white transition-colors">
                    {solution.name}
                  </h3>

                  <p className="text-sm text-[rgba(255,255,255,0.4)] leading-relaxed font-light mb-6">
                    {solution.description}
                  </p>

                  <div className={`inline-flex items-center gap-1.5 text-xs font-semibold ${accent.text} group-hover:gap-3 transition-all duration-300`}>
                    Learn more
                    <span>→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View all */}
        <div className="mt-10 text-center">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.75)] transition-colors cursor-none group"
          >
            View all 12 services
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
