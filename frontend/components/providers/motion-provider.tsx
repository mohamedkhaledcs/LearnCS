"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface MotionContextType {
  isReducedMotion: boolean;
}

const MotionContext = createContext<MotionContextType>({
  isReducedMotion: false,
});

export function useMotion() {
  return useContext(MotionContext);
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Only run on client
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <MotionContext.Provider value={{ isReducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
}
