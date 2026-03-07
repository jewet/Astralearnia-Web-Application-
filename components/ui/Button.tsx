import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ComponentPropsWithoutRef<"a"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: ReactNode;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-azure text-white font-semibold
    hover:bg-azure-light hover:-translate-y-0.5
    shadow-[0_0_0_0_rgba(37,99,235,0)] hover:shadow-[0_8px_32px_rgba(37,99,235,0.35)]
    transition-all duration-200
  `,
  secondary: `
    bg-[rgba(124,58,237,0.12)] text-violet-light font-semibold
    border border-[rgba(124,58,237,0.3)]
    hover:bg-[rgba(124,58,237,0.2)] hover:border-violet hover:-translate-y-0.5
    transition-all duration-200
  `,
  ghost: `
    bg-transparent text-[rgba(255,255,255,0.75)] font-medium
    hover:text-white hover:bg-[rgba(255,255,255,0.06)]
    transition-all duration-200
  `,
  outline: `
    bg-transparent text-[rgba(255,255,255,0.8)] font-medium
    border border-[rgba(255,255,255,0.1)]
    hover:border-[rgba(255,255,255,0.22)] hover:text-white hover:-translate-y-0.5
    transition-all duration-200
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  external,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center gap-2 cursor-none select-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
