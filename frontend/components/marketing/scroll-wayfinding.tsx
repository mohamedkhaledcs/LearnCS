"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils/utils";
import { useI18n } from "@/lib/i18n/i18n-context";

const SECTION_KEYS = [
  { id: "hero", key: "hero" },
  { id: "problem", key: "problem" },
  { id: "adaptive-engine", key: "adaptiveEngine" },
  { id: "knowledge-graph", key: "knowledgeGraph" },
  { id: "feature-showcase", key: "featureShowcase" },
  { id: "career", key: "career" },
  { id: "start-journey", key: "startJourney" },
] as const;

export function ScrollWayfinding() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mounted, setMounted] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -79% 0px",
        threshold: 0,
      }
    );

    const handleScrollFallback = () => {
      const middleY = window.innerHeight / 2;
      for (const section of SECTION_KEYS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= middleY && rect.bottom >= middleY) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollFallback, { passive: true });
    handleScrollFallback();

    SECTION_KEYS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollFallback);
    };
  }, []);

  if (!mounted) return null;

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4">
      {SECTION_KEYS.map((section, index) => {
        const label = t.wayfinding[section.key];
        const isActive = activeSection === section.id;
        const num = String(index + 1).padStart(2, '0');
        return (
          <button
            key={section.id}
            onClick={() => handleScroll(section.id)}
            className="group flex items-center justify-end gap-3 transition-all duration-300"
            aria-label={`Scroll to ${label}`}
          >
            <span className={cn(
              "text-[10px] font-mono tracking-widest uppercase transition-all duration-300",
              isActive 
                ? "text-indigo-300 opacity-100 translate-x-0" 
                : "text-neutral-500 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-neutral-300"
            )}>
              {num} {label}
            </span>
            <div className={cn(
              "w-1 transition-all duration-300 rounded-full",
              isActive 
                ? "h-8 bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]" 
                : "h-2 bg-neutral-800 group-hover:h-4 group-hover:bg-neutral-600"
            )} />
          </button>
        );
      })}
    </div>
  );
}
