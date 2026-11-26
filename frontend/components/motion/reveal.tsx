"use client";

import React, { useRef } from "react";
import { gsap, useGSAP, motionTokens } from "@/lib/motion/gsap-config";
import { useMotion } from "@/components/providers/motion-provider";
import { cn } from "@/lib/utils/utils";

interface RevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnce?: boolean;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = motionTokens.duration.normal,
  className,
  triggerOnce = true,
  blur = false,
  scale = false,
}: RevealProps & { blur?: boolean; scale?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (isReducedMotion) {
        gsap.set(containerRef.current, { autoAlpha: 1, x: 0, y: 0, filter: "blur(0px)", scale: 1 });
        return;
      }

      const getInitialState = () => {
        const state: any = {};
        switch (direction) {
          case "up":
            state.y = 40;
            break;
          case "down":
            state.y = -40;
            break;
          case "left":
            state.x = 40;
            break;
          case "right":
            state.x = -40;
            break;
          case "none":
            break;
        }
        
        if (blur) state.filter = "blur(12px)";
        if (scale) state.scale = 0.96;
        
        return state;
      };

      gsap.fromTo(
        containerRef.current,
        {
          autoAlpha: 0,
          ...getInitialState(),
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration,
          delay,
          ease: motionTokens.ease.entrance,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%", 
            once: triggerOnce,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [isReducedMotion, direction, delay, duration, triggerOnce, blur, scale] }
  );

  return (
    <div ref={containerRef} className={cn("invisible", className)}>
      {children}
    </div>
  );
}
