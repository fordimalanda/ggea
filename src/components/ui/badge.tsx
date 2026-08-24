import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & {
  variant?: "default" | "emerald" | "amber" | "outline";
}) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variant === "default" && "bg-slate-700 text-slate-200",
        variant === "emerald" && "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
        variant === "amber" && "bg-amber-400/20 text-amber-300 border border-amber-400/30",
        variant === "outline" && "border border-slate-600 text-slate-300",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
