import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Global motion tokens
export const motionTokens = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
    verySlow: 2.0,
  },
  ease: {
    standard: "power2.out",
    entrance: "power3.out",
    exit: "power2.in",
    smooth: "expo.out",
  },
};

export { gsap, ScrollTrigger, useGSAP };
