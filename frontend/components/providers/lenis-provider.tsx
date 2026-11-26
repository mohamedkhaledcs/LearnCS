"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotion } from "./motion-provider";

export function LenisProvider({ children }: { children: ReactNode }) {
  const { isReducedMotion } = useMotion();

  useEffect(() => {
    // If reduced motion is preferred, don't initialize Lenis smooth scrolling
    if (isReducedMotion) {
      // Still let GSAP know about scroll changes natively
      gsap.ticker.add(ScrollTrigger.update);
      return () => {
        gsap.ticker.remove(ScrollTrigger.update);
      };
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Synchronize GSAP ScrollTrigger with Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Ensure GSAP ticker drives Lenis for perfect synchronization
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Cleanup
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [isReducedMotion]);

  return <>{children}</>;
}
