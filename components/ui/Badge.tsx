import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "ice" | "azure" | "violet" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  pulse?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  ice: "border-[rgba(6,182,212,0.3)] bg-[rgba(6,182,212,0.08)] text-[#06B6D4]",
  azure: "border-[rgba(37,99,235,0.3)] bg-[rgba(37,99,235,0.08)] text-[#3B82F6]",
  violet: "border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.08)] text-[#8B5CF6]",
  default: "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.6)]",
};

export function Badge({ variant = "ice", children, pulse, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border rounded-full",
        "px-3.5 py-1.5 text-[11px] font-semibold tracking-widest uppercase",
        variantStyles[variant],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
