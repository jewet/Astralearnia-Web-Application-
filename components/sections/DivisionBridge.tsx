import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function DivisionBridge() {
  return (
    <section className="relative bg-[#070B14] section-padding">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-18">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <SectionLabel align="center" className="mb-4 sm:mb-5">Two Powerful Divisions</SectionLabel>
          <h2 className="font-display text-[clamp(24px,5vw,56px)] font-black tracking-[-0.04em] text-white mb-3 sm:mb-5">
            Choose Your Direction
          </h2>
          <p className="text-[rgba(255,255,255,0.45)] text-sm sm:text-lg font-light max-w-[340px] sm:max-w-[420px] mx-auto leading-relaxed">
            One unified brand. Two specialized ecosystems. Built for tomorrow&apos;s organizations.
          </p>
        </div>

        {/* Cards — side by side on mobile */}
        <div className="grid grid-cols-2 gap-2 sm:gap-px lg:gap-px bg-transparent sm:bg-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden">

          {/* Technologies */}
          <Link
            href="/technologies"
            className="group relative bg-[#0F1827] p-4 sm:p-8 lg:p-14 overflow-hidden rounded-2xl sm:rounded-none block
                       border border-[rgba(37,99,235,0.15)] sm:border-0
                       hover:border-[rgba(37,99,235,0.4)] transition-all duration-300"
          >
            {/* Corner glow */}
            <div className="absolute top-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.1),transparent_60%)] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100" />
            {/* Gradient border top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-azure via-transparent to-transparent" />

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[rgba(37,99,235,0.12)] border border-[rgba(37,99,235,0.25)] flex items-center justify-center mb-4 sm:mb-8 group-hover:border-[rgba(37,99,235,0.5)] transition-all duration-300">
                <div className="w-2.5 h-2.5 sm:w-5 sm:h-5 rounded-full bg-azure opacity-80" />
              </div>

              <p className="text-[9px] sm:text-[11px] font-black tracking-[0.15em] uppercase text-azure mb-1.5 sm:mb-3">Division 01</p>

              <h3 className="font-display text-sm sm:text-[28px] font-black tracking-[-0.03em] text-white mb-2 sm:mb-4 leading-tight group-hover:text-gradient-azure transition-all">
                Astralearnia<br className="sm:hidden" /> Technologies
              </h3>

              <p className="text-[rgba(255,255,255,0.45)] text-[11px] sm:text-base font-light leading-relaxed max-w-[380px] mb-4 sm:mb-8 hidden sm:block">
                Enterprise AI systems, secure cloud infrastructure, cybersecurity, blockchain, IoT, and robotics — built for organizations ready to scale without limits.
              </p>
              <p className="text-[rgba(255,255,255,0.4)] text-[10px] leading-relaxed mb-3 sm:hidden">
                Enterprise AI, cloud, security & robotics at scale.
              </p>

              {/* Tags — compact on mobile */}
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-10">
                {["AI", "Cloud", "Security", "Blockchain", "IoT", "Robotics"].map((tag) => (
                  <span key={tag} className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] rounded sm:rounded-md bg-[rgba(37,99,235,0.08)] text-[rgba(255,255,255,0.5)] border border-[rgba(37,99,235,0.15)]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 text-azure-light text-[10px] sm:text-sm font-black group-hover:gap-3 sm:group-hover:gap-4 transition-all duration-300">
                <span className="hidden sm:inline">Explore Enterprise Solutions</span>
                <span className="sm:hidden">Explore →</span>
                <span className="hidden sm:inline">→</span>
              </div>
            </div>
          </Link>

          {/* Institute */}
          <Link
            href="/institute"
            className="group relative bg-[#0F1827] p-4 sm:p-8 lg:p-14 overflow-hidden rounded-2xl sm:rounded-none block
                       border border-[rgba(124,58,237,0.15)] sm:border-0
                       hover:border-[rgba(124,58,237,0.4)] transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.1),transparent_60%)] translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet to-transparent" />

            <div className="relative z-10">
              <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[rgba(124,58,237,0.12)] border border-[rgba(124,58,237,0.25)] flex items-center justify-center mb-4 sm:mb-8 group-hover:border-[rgba(124,58,237,0.5)] transition-all duration-300">
                <div className="w-2.5 h-2.5 sm:w-5 sm:h-5 rounded-full bg-violet opacity-80" />
              </div>

              <p className="text-[9px] sm:text-[11px] font-black tracking-[0.15em] uppercase text-violet-light mb-1.5 sm:mb-3">Division 02</p>

              <h3 className="font-display text-sm sm:text-[28px] font-black tracking-[-0.03em] text-white mb-2 sm:mb-4 leading-tight group-hover:text-gradient-violet transition-all">
                Astralearnia<br className="sm:hidden" /> Institute
              </h3>

              <p className="text-[rgba(255,255,255,0.45)] text-[11px] sm:text-base font-light leading-relaxed max-w-[380px] mb-4 sm:mb-8 hidden sm:block">
                Smart School AI, adaptive learning platforms, educator tools, and intelligent student systems — powering the future of education worldwide.
              </p>
              <p className="text-[rgba(255,255,255,0.4)] text-[10px] leading-relaxed mb-3 sm:hidden">
                Smart school AI, adaptive learning & educator tools.
              </p>

              <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-10">
                {["School AI", "EdTech", "Learning", "Educators", "Student AI"].map((tag) => (
                  <span key={tag} className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] rounded sm:rounded-md bg-[rgba(124,58,237,0.08)] text-[rgba(255,255,255,0.5)] border border-[rgba(124,58,237,0.15)]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 text-violet-light text-[10px] sm:text-sm font-black group-hover:gap-3 sm:group-hover:gap-4 transition-all duration-300">
                <span className="hidden sm:inline">Explore Education Systems</span>
                <span className="sm:hidden">Explore →</span>
                <span className="hidden sm:inline">→</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}