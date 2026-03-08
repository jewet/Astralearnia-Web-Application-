"use client";

import { useRef } from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PRODUCTS } from "@/lib/constants";

export function ProductsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.4;
  };

  const onMouseUp = () => { isDragging.current = false; };

  // Touch support
  const touchStartX = useRef(0);
  const touchScrollLeft = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    touchStartX.current = e.touches[0].pageX;
    touchScrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    const diff = touchStartX.current - e.touches[0].pageX;
    scrollRef.current.scrollLeft = touchScrollLeft.current + diff;
  };

  return (
    <section className="relative bg-[#070B14] section-padding overflow-hidden">
      <div className="max-w-[1400px] mx-auto mb-6 sm:mb-12 px-4 sm:px-6 lg:px-18">
        <SectionLabel className="mb-3 sm:mb-5">Our Products</SectionLabel>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(22px,5vw,56px)] font-black tracking-[-0.04em] text-white">
            Built for the Future
          </h2>
          <p className="text-xs sm:text-sm text-[rgba(255,255,255,0.35)] hidden sm:block font-semibold">
            Drag to explore →
          </p>
          <p className="text-[10px] text-[rgba(255,255,255,0.35)] sm:hidden font-semibold">
            Swipe →
          </p>
        </div>
      </div>

      {/* Horizontal scroll — compact card width on mobile */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-5 px-4 sm:px-6 lg:px-18 pb-4 overflow-x-auto cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        {PRODUCTS.map((product, i) => (
          <div
            key={product.id}
            className="group relative flex-shrink-0 w-[220px] sm:w-[320px] bg-[#0F1827] border border-[rgba(255,255,255,0.07)] rounded-xl sm:rounded-2xl p-5 sm:p-9 overflow-hidden hover:border-[rgba(255,255,255,0.14)] hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-400"
          >
            {/* Accent glow */}
            <div
              className="absolute bottom-0 right-0 w-[140px] sm:w-[200px] h-[140px] sm:h-[200px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${product.accent}22, transparent 70%)` }}
            />

            {/* Number */}
            <div className="font-display text-[48px] sm:text-[72px] font-black leading-none text-[rgba(255,255,255,0.04)] absolute top-2 sm:top-4 right-3 sm:right-6 pointer-events-none select-none">
              {String(i + 1).padStart(2, "0")}
            </div>

            <div className="relative z-10">
              <span
                className="inline-block text-[9px] sm:text-[10px] font-black tracking-[0.15em] uppercase mb-3 sm:mb-4 px-1.5 sm:px-2 py-0.5 rounded"
                style={{ color: product.accent, background: `${product.accent}18` }}
              >
                {product.tag}
              </span>

              <h3 className="font-display text-[16px] sm:text-[26px] font-black tracking-[-0.025em] text-white mb-1 sm:mb-2">
                {product.name}
              </h3>

              <p className="text-[10px] sm:text-xs text-[rgba(255,255,255,0.3)] mb-3 sm:mb-5 font-light italic">
                {product.tagline}
              </p>

              <div className="h-px bg-[rgba(255,255,255,0.06)] mb-3 sm:mb-5" />

              <p className="text-[11px] sm:text-sm text-[rgba(255,255,255,0.4)] mb-3 sm:mb-4 leading-relaxed font-light">
                {product.problem}
              </p>

              <div
                className="pl-2.5 sm:pl-3 border-l-2 mb-5 sm:mb-8"
                style={{ borderColor: product.accent }}
              >
                <p className="text-[11px] sm:text-sm text-[rgba(255,255,255,0.7)] leading-relaxed font-light">
                  {product.outcome}
                </p>
              </div>

              <Link
                href={product.href}
                className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-black group-hover:gap-3 sm:group-hover:gap-4 transition-all duration-300 cursor-none"
                style={{ color: product.accent }}
              >
                Start Now →
              </Link>
            </div>
          </div>
        ))}

        {/* "View All" card */}
        <Link
          href="/products"
          className="group flex-shrink-0 w-[120px] sm:w-[200px] border border-dashed border-[rgba(255,255,255,0.1)] rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-2 sm:gap-3 hover:border-[rgba(37,99,235,0.4)] hover:bg-[rgba(37,99,235,0.04)] transition-all duration-300 cursor-none"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center group-hover:border-azure transition-colors">
            <span className="text-[rgba(255,255,255,0.3)] group-hover:text-azure-light text-base sm:text-xl transition-colors">→</span>
          </div>
          <p className="text-[10px] sm:text-xs text-[rgba(255,255,255,0.3)] text-center group-hover:text-[rgba(255,255,255,0.6)] transition-colors font-semibold px-2">
            View All Products
          </p>
        </Link>
      </div>
    </section>
  );
}