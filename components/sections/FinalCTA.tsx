import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="relative bg-void overflow-hidden section-padding">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[radial-gradient(ellipse,rgba(37,99,235,0.12),transparent_70%)]" />
        <div className="absolute top-1/2 left-[15%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(124,58,237,0.06),transparent_70%)]" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 grid-pattern opacity-40 mask-radial pointer-events-none" />

      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(37,99,235,0.3)] bg-[rgba(37,99,235,0.06)] text-xs font-semibold text-azure-light tracking-wider uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-azure animate-pulse" />
          Ready to Scale Globally
        </div>

        <h2 className="font-display text-[clamp(42px,6vw,80px)] font-bold tracking-[-0.045em] leading-[0.95] mb-7">
          Build the Future<br />
          <span className="text-gradient-full">With Astralearnia.</span>
        </h2>

        <p className="text-lg text-[rgba(255,255,255,0.45)] font-light max-w-[420px] mx-auto leading-relaxed mb-12">
          Join forward-thinking organizations worldwide that trust Astralearnia to power their enterprise and education systems.
        </p>

        <div className="flex gap-4 justify-center flex-wrap mb-14">
          <Button variant="primary" size="lg" href="/contact#demo">
            Request a Demo →
          </Button>
          <Button variant="outline" size="lg" href="/solutions">
            Start a Solution
          </Button>
        </div>

        {/* Social proof row */}
        <div className="flex items-center justify-center gap-8 flex-wrap text-center">
          {[
            { val: "50+", label: "Clients Monthly" },
            { val: "12+", label: "Enterprise Solutions" },
            { val: "2", label: "Powerful Divisions" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span className="font-display text-2xl font-bold text-white">{item.val}</span>
              <span className="text-xs text-[rgba(255,255,255,0.3)] mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
