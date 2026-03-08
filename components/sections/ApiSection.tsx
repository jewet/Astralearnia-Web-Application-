import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { API_CODE_EXAMPLE } from "@/lib/constants";

export function ApiSection() {
  const lines = API_CODE_EXAMPLE.split("\n");

  return (
    <section className="relative bg-[#050810] border-y border-[rgba(255,255,255,0.06)] section-padding">
      {/* Background accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-18 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">

        {/* ── Left: Copy ── */}
        <div>
          <SectionLabel className="mb-4 sm:mb-6">Developer First</SectionLabel>

          <h2 className="font-display text-[clamp(26px,5vw,56px)] font-black tracking-[-0.04em] text-white mb-4 sm:mb-6">
            Powerful APIs.<br />
            <span className="text-gradient-azure">Built to Integrate.</span>
          </h2>

          <p className="text-[rgba(255,255,255,0.45)] text-sm sm:text-lg font-light leading-relaxed max-w-[420px] mb-6 sm:mb-8">
            Connect Astralearnia&apos;s intelligence layer directly into your products. REST, GraphQL, WebSocket — production-ready from day one with comprehensive docs.
          </p>

          {/* Feature pills — compact on mobile */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-10">
            {["REST API", "GraphQL", "WebSocket", "SDKs", "Webhooks", "Rate Limiting"].map((f) => (
              <span key={f} className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.5)] font-semibold">
                {f}
              </span>
            ))}
          </div>

          {/* Buttons — 2-col on mobile */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
            <Button variant="primary" size="md" href="/api-docs#access">
              Get API Access →
            </Button>
            <Button variant="outline" size="md" href="/api-docs">
              View Docs
            </Button>
          </div>
        </div>

        {/* ── Right: Code block ── */}
        <div className="relative">
          {/* Glow behind */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse,rgba(37,99,235,0.08),transparent_70%)] pointer-events-none" />

          <div className="relative rounded-xl sm:rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#080C18] overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.4)] sm:shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3.5 border-b border-[rgba(255,255,255,0.06)] bg-[#0a0f1d]">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#28C840]" />
              </div>
              <span className="text-[9px] sm:text-[11px] text-[rgba(255,255,255,0.25)] font-mono">
                astra-sdk · example.ts
              </span>
              <div className="w-10 sm:w-16" />
            </div>

            {/* Line numbers + code — scrollable */}
            <div className="p-3 sm:p-6 overflow-x-auto max-h-[240px] sm:max-h-none">
              <table className="w-full border-collapse">
                <tbody>
                  {lines.map((line, i) => (
                    <tr key={i} className="group">
                      <td className="pr-3 sm:pr-5 text-[rgba(255,255,255,0.15)] text-[10px] sm:text-xs font-mono select-none w-5 sm:w-6 text-right align-top pt-0.5">
                        {i + 1}
                      </td>
                      <td className="code-block text-[11px] sm:text-sm leading-5 sm:leading-7 whitespace-pre">
                        <CodeLine line={line} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Cursor blink */}
              <div className="mt-1 ml-16 sm:ml-24 inline-block w-0.5 h-3 sm:h-4 bg-ice animate-pulse" />
            </div>

            {/* Scan line effect */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ice/30 to-transparent animate-scan pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Simple syntax highlighter
function CodeLine({ line }: { line: string }) {
  if (line.trim().startsWith("//")) {
    return <span className="code-comment">{line}</span>;
  }
  const highlighted = line
    .replace(/(import|const|await|from|new|true|false)/g, '<span class="code-keyword">$1</span>')
    .replace(/('[^']*'|`[^`]*`)/g, '<span class="code-string">$1</span>')
    .replace(/(\.\w+)\(/g, '<span class="code-method">$1</span>(')
    .replace(/process|console/g, '<span class="code-variable">$&</span>');

  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
}