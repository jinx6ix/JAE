// components/visually-hidden.tsx
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const VisuallyHidden = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<"span">
>(({ children, className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "sr-only", // or use these styles: "absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip-[rect(0,0,0,0)]"
      className
    )}
    {...props}
  >
    {children}
  </span>
));

VisuallyHidden.displayName = "VisuallyHidden";