"use client";

import React from "react";
import { Gauge } from "lucide-react";
import { cn } from "@/lib/utils/utils";

export type VisualizerSpeed = 0.5 | 1 | 2;

interface VisualizerSpeedSelectorProps {
  speed: VisualizerSpeed;
  onChange: (speed: VisualizerSpeed) => void;
  isAr?: boolean;
  className?: string;
}

const SPEEDS: { value: VisualizerSpeed; labelEn: string; labelAr: string }[] = [
  { value: 0.5, labelEn: "0.5x", labelAr: "0.5x" },
  { value: 1, labelEn: "1x", labelAr: "1x" },
  { value: 2, labelEn: "2x", labelAr: "2x" }
];

/**
 * Shared speed multiplier selector for interactive curriculum visualizers.
 */
export function VisualizerSpeedSelector({
  speed,
  onChange,
  isAr = false,
  className
}: VisualizerSpeedSelectorProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/40 px-2.5 py-1",
        className
      )}
    >
      <Gauge className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
      <span className="text-[11px] font-medium text-neutral-400">
        {isAr ? "السرعة:" : "Speed:"}
      </span>
      <div className="flex items-center gap-1" dir="ltr">
        {SPEEDS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "px-2 py-0.5 rounded-lg text-[11px] font-mono font-semibold transition-colors",
              speed === opt.value
                ? "bg-indigo-600 text-white"
                : "text-neutral-400 hover:text-white hover:bg-white/10"
            )}
          >
            {isAr ? opt.labelAr : opt.labelEn}
          </button>
        ))}
      </div>
    </div>
  );
}
