"use client";

import React, { useRef } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useMotion } from "@/components/providers/motion-provider";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion/gsap-config";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/i18n-context";

export function FinalCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { isReducedMotion } = useMotion();
  const { t, isRtl } = useI18n();

  useGSAP(
    () => {
      if (isReducedMotion) {
        gsap.set(contentRef.current, { autoAlpha: 1 });
        return;
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive) window.dispatchEvent(new CustomEvent("update-wayfinding", { detail: "start-journey" }));
        }
      });

      gsap.fromTo(contentRef.current,
        { autoAlpha: 0, y: 50, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="start-journey" className="py-32 md:py-48 relative bg-neutral-950 overflow-hidden flex items-center justify-center min-h-[70vh]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <Container className="relative z-10 w-full max-w-4xl mx-auto">
        <div ref={contentRef} className="flex flex-col items-center justify-center text-center space-y-10 invisible">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
              {t.finalCta.heading}
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              {t.finalCta.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 w-full max-w-md mx-auto">
            <Button asChild size="lg" className="w-full h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] transition-all hover:shadow-[0_0_60px_-15px_rgba(99,102,241,0.7)] hover:scale-105 group border-none">
              <Link href="/assessment">
                {t.finalCta.ctaPrimary}
                <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${isRtl ? "mr-3 rotate-180" : "ml-3"}`} />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="w-full h-14 px-8 text-lg border-neutral-700 hover:bg-neutral-800 hover:text-white transition-all text-neutral-400 bg-transparent">
              <Link href="/discovery">
                {t.finalCta.ctaSecondary}
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
