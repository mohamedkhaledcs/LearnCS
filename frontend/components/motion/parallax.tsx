"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap-config";
import { useMotion } from "@/components/providers/motion-provider";
import { cn } from "@/lib/utils/utils";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // 1 = normal scroll, < 1 = slower (parallax), > 1 = faster
  className?: string;
}

export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (isReducedMotion) return; // No parallax for reduced motion

      // We want the element to move at a different rate than the scroll
      // Calculate how much y distance to move based on speed
      // 100 * (1 - speed) gives us the parallax offset percentage
      const yOffset = (1 - speed) * 100;

      gsap.fromTo(
        targetRef.current,
        { y: -yOffset },
        {
          y: yOffset,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom", // when top of container hits bottom of viewport
            end: "bottom top", // when bottom of container hits top of viewport
            scrub: true, // link directly to scrollbar
          },
        }
      );
    },
    { scope: containerRef, dependencies: [isReducedMotion, speed] }
  );

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <div ref={targetRef} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
