"use client";

import * as React from "react";
import { cn } from "@/lib/utils/utils";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div 
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          role="tooltip"
          className={cn(
            "absolute z-50 px-3 py-1.5 text-xs text-popover-foreground bg-popover border rounded-md shadow-md -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap animate-in fade-in-50 zoom-in-95",
            className
          )}
        >
          {content}
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-border" />
        </div>
      )}
    </div>
  );
}
