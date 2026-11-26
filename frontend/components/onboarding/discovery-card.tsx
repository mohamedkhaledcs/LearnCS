"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils/utils";

interface DiscoveryCardProps {
  id?: string;
  label: string;
  selected: boolean;
  onClick: () => void;
  multiple?: boolean;
  className?: string;
}

export function DiscoveryCard({ id, label, selected, onClick, multiple = false, className }: DiscoveryCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleMouseMove(e);
    setIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleMouseMove(e);
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);
      onClick();
    }
  };

  return (
    <button
      id={id}
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onKeyDown={handleKeyDown}
      type="button"
      role="option"
      aria-selected={selected}
      className={cn(
        "relative w-full text-left p-6 md:p-8 rounded-2xl transition-all duration-300 overflow-hidden border focus:outline-none",
        selected 
          ? "border-emerald-500/40 bg-emerald-500/[0.03] shadow-[0_4px_20px_rgba(16,185,129,0.05)]" 
          : "border-white/5 bg-white/[0.01] hover:border-emerald-500/20",
        isPressed ? "scale-[0.98]" : "scale-100",
        className
      )}
      style={{
        "--x": `${coords.x}%`,
        "--y": `${coords.y}%`,
      } as React.CSSProperties}
    >
      {/* Directional fill layer */}
      <div 
        className={cn(
          "absolute inset-0 z-0 bg-emerald-500 transition-all duration-500 ease-out pointer-events-none",
          selected ? "opacity-20" : isHovered ? "opacity-10" : "opacity-0"
        )}
        style={{
          clipPath: (isHovered || selected)
            ? `circle(150% at var(--x) var(--y))` 
            : `circle(0% at var(--x) var(--y))`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-between">
        <span className={cn(
          "text-lg md:text-xl font-medium transition-colors duration-300",
          selected ? "text-emerald-50" : "text-neutral-300"
        )}>
          {label}
        </span>
        
        {/* Selection indicator */}
        <div className={cn(
          "h-6 w-6 border-2 transition-all duration-300 flex items-center justify-center shrink-0 ms-4",
          multiple ? "rounded-md" : "rounded-full",
          selected ? "border-emerald-400 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "border-neutral-700"
        )}>
          {selected && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3.5 h-3.5 text-white">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}
