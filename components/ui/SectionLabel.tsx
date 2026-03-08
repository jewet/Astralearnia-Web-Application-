import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionLabel({ children, className, align = "left" }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "label-line text-[10px] sm:text-[11px] tracking-[0.15em] uppercase font-black",
        align === "center" && "justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}