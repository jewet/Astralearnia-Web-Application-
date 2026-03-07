import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function DivisionBridge() {
  return (
    <section className="relative bg-[#070B14] section-padding">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel align="center" className="mb-5">Two Powerful Divisions</SectionLabel>
          <h2 className="font-display text-[clamp(36px,4vw,56px)] font-bold tracking-[-0.04em] text-white mb-5">
            Choose Your Direction
          </h2>
          <p className="text-[rgba(255,255,255,0.45)] text-lg font-light max-w-[420px] mx-auto leading-relaxed">
            One unified brand. Two specialized ecosystems. Built for tomorrow&apos;s organizations.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden">
          {/* Technologies */}
          <Link href="/technologies" className="group relative bg-[#0F1827] p-14 overflow-hidden cursor-none block">
            {/* Corner glow */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.1),transparent_60%)] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100" />

            {/* Gradient border top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-azure via-transparent to-transparent" />

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[rgba(37,99,235,0.12)] border border-[rgba(37,99,235,0.25)] flex items-center justify-center mb-8 group-hover:border-[rgba(37,99,235,0.5)] transition-all duration-300">
                <div className="w-5 h-5 rounded-full bg-azure opacity-80" />
              </div>

              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-azure mb-3">Division 01</p>

              <h3 className="font-display text-[28px] font-bold tracking-[-0.03em] text-white mb-4 group-hover:text-gradient-azure transition-all">
                Astralearnia Technologies
              </h3>

              <p className="text-[rgba(255,255,255,0.45)] text-base font-light leading-relaxed max-w-[380px] mb-8">
                Enterprise AI systems, secure cloud infrastructure, cybersecurity, blockchain, IoT, and robotics — built for organizations ready to scale without limits.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-10">
                {["AI Integration", "Cloud", "Cybersecurity", "Blockchain", "IoT", "Robotics"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-[11px] rounded-md bg-[rgba(37,99,235,0.08)] text-[rgba(255,255,255,0.5)] border border-[rgba(37,99,235,0.15)]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-azure-light text-sm font-semibold group-hover:gap-4 transition-all duration-300">
                <span>Explore Enterprise Solutions</span>
                <span>→</span>
              </div>
            </div>
          </Link>

          {/* Institute */}
          <Link href="/institute" className="group relative bg-[#0F1827] p-14 overflow-hidden cursor-none block">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.1),transparent_60%)] translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet to-transparent" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[rgba(124,58,237,0.12)] border border-[rgba(124,58,237,0.25)] flex items-center justify-center mb-8 group-hover:border-[rgba(124,58,237,0.5)] transition-all duration-300">
                <div className="w-5 h-5 rounded-full bg-violet opacity-80" />
              </div>

              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-violet-light mb-3">Division 02</p>

              <h3 className="font-display text-[28px] font-bold tracking-[-0.03em] text-white mb-4 group-hover:text-gradient-violet transition-all">
                Astralearnia Institute
              </h3>

              <p className="text-[rgba(255,255,255,0.45)] text-base font-light leading-relaxed max-w-[380px] mb-8">
                Smart School AI, adaptive learning platforms, educator tools, and intelligent student systems — powering the future of education worldwide.
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {["Smart School AI", "EdTech", "Learning Platforms", "Educator Tools", "Student AI"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-[11px] rounded-md bg-[rgba(124,58,237,0.08)] text-[rgba(255,255,255,0.5)] border border-[rgba(124,58,237,0.15)]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-violet-light text-sm font-semibold group-hover:gap-4 transition-all duration-300">
                <span>Explore Education Systems</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
