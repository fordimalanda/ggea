import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
