"use client";

import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 560;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const CX = SIZE / 2, CY = SIZE / 2;

    interface Node {
      x: number; y: number;
      bx: number; by: number;
      angle: number; speed: number; orbitR: number;
      size: number; brightness: number;
      hue: number;
    }

    const nodes: Node[] = Array.from({ length: 70 }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 140 * (0.2 + Math.random() * 0.8);
      const bx = CX + r * Math.sin(phi) * Math.cos(theta);
      const by = CY + r * Math.sin(phi) * Math.sin(theta);
      return {
        x: bx, y: by, bx, by,
        angle: Math.random() * Math.PI * 2,
        speed: 0.003 + Math.random() * 0.005,
        orbitR: r * 0.06 + 4,
        size: 1.2 + Math.random() * 1.6,
        brightness: 0.4 + Math.random() * 0.6,
        hue: Math.random() > 0.5 ? 210 : 265,
      };
    });

    let t = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      t += 0.006;

      const grd = ctx.createRadialGradient(CX, CY, 40, CX, CY, 240);
      grd.addColorStop(0, "rgba(37,99,235,0.07)");
      grd.addColorStop(0.5, "rgba(124,58,237,0.04)");
      grd.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(CX, CY, 240, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      nodes.forEach((n) => {
        n.angle += n.speed;
        n.x = n.bx + Math.cos(n.angle) * n.orbitR;
        n.y = n.by + Math.sin(n.angle) * n.orbitR;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const alpha = (1 - dist / 80) * 0.3;
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `hsla(${a.hue},90%,60%,${alpha})`);
            grad.addColorStop(1, `hsla(${b.hue},90%,60%,${alpha * 0.5})`);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 5);
        halo.addColorStop(0, `hsla(${n.hue},90%,70%,${n.brightness * 0.5})`);
        halo.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(185,85%,80%,${n.brightness * 0.9})`;
        ctx.fill();
      });

      for (let i = 0; i < 3; i++) {
        const phase = (t * 0.7 + i * 1.2) % (Math.PI * 2);
        const r = 20 + 60 * ((Math.sin(phase) + 1) / 2);
        const alpha = 0.12 * (1 - r / 80);
        ctx.beginPath();
        ctx.arc(CX, CY, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6,182,212,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-start sm:items-center overflow-hidden bg-void">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-60 mask-radial" />

      {/* Orbs */}
      <div className="absolute top-[-180px] left-[-120px] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.12),transparent_70%)] blur-[80px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-[100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.10),transparent_70%)] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-[40%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.08),transparent_70%)] blur-[60px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-18 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-20 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center w-full">

        {/* ── LEFT: Content ── */}
        <div className="max-w-[680px]">
          <div className="reveal-up mb-5 sm:mb-8">
            <Badge variant="ice" pulse>
              <span className="hidden sm:inline">Global Technology Ecosystem</span>
              <span className="sm:hidden">Global AI Ecosystem</span>
            </Badge>
          </div>

          {/* Headline — large on mobile too */}
          <h1 className="font-display font-extrabold leading-[0.95] tracking-[-0.045em] mb-4 sm:mb-7 reveal-up delay-100">
            <span className="block text-[clamp(44px,10vw,96px)] text-gradient-blue">
              Engineering
            </span>
            <span className="block text-[clamp(44px,10vw,96px)] text-gradient-blue">
              Intelligence.
            </span>
            <span className="block text-[clamp(34px,8vw,80px)] text-[rgba(255,255,255,0.4)] font-light mt-1 sm:mt-2">
              Empowering Minds.
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-[rgba(255,255,255,0.5)] max-w-[520px] leading-relaxed sm:leading-[1.8] font-light mb-6 sm:mb-10 reveal-up delay-200">
            Enterprise AI systems, secure cloud infrastructure, and next-generation education technology — built for organizations ready to scale globally.
          </p>

          {/* Buttons — 2-col on mobile, row on sm+ */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-8 reveal-up delay-300">
            <Button variant="primary" size="lg" href="/technologies">
              Explore Enterprise →
            </Button>
            <Button variant="outline" size="lg" href="/institute">
              Explore Education
            </Button>
          </div>

          <p className="text-[10px] sm:text-xs text-[rgba(255,255,255,0.2)] tracking-wide reveal-up delay-400">
            Enterprise &amp; Education. Built Right.
          </p>

          {/* Stats — 3-col on mobile */}
          <div className="mt-6 sm:mt-12 pt-5 sm:pt-8 border-t border-[rgba(255,255,255,0.07)] grid grid-cols-3 sm:flex sm:flex-row gap-4 sm:gap-10 reveal-up delay-500">
            {[
              { val: "12+",    label: "Solutions"     },
              { val: "99.9%", label: "Uptime SLA"    },
              { val: "AI-First", label: "Architecture" },
            ].map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="font-display text-xl sm:text-2xl font-black text-white">{s.val}</div>
                <div className="text-[9px] sm:text-xs text-[rgba(255,255,255,0.35)] mt-0.5 tracking-wide font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Canvas — shown on lg only ── */}
        <div className="hidden lg:block relative reveal-fade delay-200">
          <div className="relative w-[560px] h-[560px]">
            <div className="absolute inset-[10%] rounded-full border border-[rgba(37,99,235,0.1)] animate-spin-slow pointer-events-none" />
            <div className="absolute inset-[20%] rounded-full border border-[rgba(124,58,237,0.08)] animate-spin-slow pointer-events-none" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-6 sm:h-8 bg-white/30" />
        <p className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/50">Scroll</p>
      </div>
    </section>
  );
}