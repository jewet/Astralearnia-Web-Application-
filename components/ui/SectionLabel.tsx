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
        "label-line",
        align === "center" && "justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}
