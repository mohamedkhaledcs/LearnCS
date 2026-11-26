"use client";

import React, { useRef } from "react";
import { Container } from "@/components/layout/container";
import { useMotion } from "@/components/providers/motion-provider";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion/gsap-config";
import { AssessmentIcon, AdaptiveEngineIcon, PracticeIcon, KnowledgeGraphIcon } from "@/components/ui/learncs-icons";
import { useI18n } from "@/lib/i18n/i18n-context";

const STEP_META = [
  {
    id: "assess",
    icon: <AssessmentIcon className="w-6 h-6" />,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    glowColor: "rgba(99,102,241,0.6)",
    activeGradient: "from-indigo-500/20 to-transparent",
  },
  {
    id: "understand",
    icon: <KnowledgeGraphIcon className="w-6 h-6" />,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    glowColor: "rgba(6,182,212,0.6)",
    activeGradient: "from-cyan-500/20 to-transparent",
  },
  {
    id: "recommend",
    icon: <AdaptiveEngineIcon className="w-6 h-6" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glowColor: "rgba(16,185,129,0.6)",
    activeGradient: "from-emerald-500/20 to-transparent",
  },
  {
    id: "adapt",
    icon: <PracticeIcon className="w-6 h-6" />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glowColor: "rgba(245,158,11,0.6)",
    activeGradient: "from-amber-500/20 to-transparent",
  },
];

export function AdaptiveEngineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useMotion();
  const { t } = useI18n();
  const steps = STEP_META.map((meta, idx) => ({
    ...meta,
    title: t.adaptiveEngine.steps[idx].title,
    desc: t.adaptiveEngine.steps[idx].desc,
  }));

  useGSAP(
    () => {
      if (!sectionRef.current || !pinRef.current) return;

      const q = gsap.utils.selector(pinRef);
      const cards = q(".step-card") as HTMLElement[];
      const dots = q(".progress-dot") as HTMLElement[];

      if (isReducedMotion) {
        gsap.set(q(".engine-title"), { autoAlpha: 1 });
        cards.forEach((card) => gsap.set(card, { autoAlpha: 1 }));
        dots.forEach((dot) => gsap.set(dot, { autoAlpha: 1, scale: 1, backgroundColor: "#6366f1" }));
        gsap.set(q(".moving-dot"), { display: 'none' });
        return;
      }

      // --- INITIAL STATES ---
      gsap.set(q(".engine-title"), { autoAlpha: 0, y: -30 });

      cards.forEach((card) => {
        gsap.set(card, { autoAlpha: 0.25, filter: "grayscale(80%) brightness(0.6)" });
      });

      dots.forEach((dot) => {
        gsap.set(dot, {
          scale: 0.6,
          backgroundColor: "#404040",
        });
      });

      gsap.set(q(".moving-dot"), { left: "0%", autoAlpha: 0 });

      // --- SINGLE MASTER TIMELINE WITH PIN ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          pin: pinRef.current,
          pinSpacing: false,     // sectionRef already provides the scroll distance via height
          anticipatePin: 1,
          onToggle: (self) => {
            if (self.isActive) {
              window.dispatchEvent(new CustomEvent("update-wayfinding", { detail: "adaptive-engine" }));
            }
          },
        },
      });

      // Title entrance
      tl.to(q(".engine-title"), { autoAlpha: 1, y: 0, duration: 1.5, ease: "power3.out" }, 0);

      // Fade in the moving dot
      tl.to(q(".moving-dot"), { autoAlpha: 1, duration: 0.5 }, 0);

      // Activate first dot and card immediately
      tl.to(dots[0], { scale: 1, backgroundColor: steps[0].glowColor, duration: 0.5 }, 0.5);
      tl.to(cards[0], {
        autoAlpha: 1, filter: "grayscale(0%) brightness(1)", duration: 1, ease: "power2.out",
      }, 0.5);

      // Each subsequent step: move the dot, activate the station dot, activate the card, deactivate previous
      const stageStart = 2;
      const stageDuration = 4; // scroll units per stage transition

      for (let i = 1; i < steps.length; i++) {
        const t = stageStart + (i - 1) * stageDuration;
        const pct = (i / (steps.length - 1)) * 100;

        // Move the single dot to the next position
        tl.to(q(".moving-dot"), {
          left: `${pct}%`, duration: stageDuration * 0.6, ease: "power1.inOut",
        }, t);

        // Activate the arriving station dot
        tl.to(dots[i], {
          scale: 1, backgroundColor: steps[i].glowColor, duration: stageDuration * 0.3, ease: "back.out(1.4)",
        }, t + stageDuration * 0.5);

        // Activate the new card
        tl.to(cards[i], {
          autoAlpha: 1, filter: "grayscale(0%) brightness(1)", duration: stageDuration * 0.4, ease: "power2.out",
        }, t + stageDuration * 0.4);

        // Subdue the previous card
        tl.to(cards[i - 1], {
          autoAlpha: 0.35, filter: "grayscale(60%) brightness(0.7)", duration: stageDuration * 0.3, ease: "power2.out",
        }, t + stageDuration * 0.4);
      }

      // Final hold: keep everything visible at the end
      const finalT = stageStart + (steps.length - 1) * stageDuration;
      tl.to({}, { duration: 3 }, finalT);
    },
    { scope: sectionRef }
  );

  return (
    // Outer section: provides the scroll distance. 300vh gives ~200vh of pinned scroll.
    <section
      id="adaptive-engine"
      ref={sectionRef}
      className="relative w-full bg-neutral-950"
      style={{ height: "300vh" }}
    >
      {/* Inner pinned viewport */}
      <div
        ref={pinRef}
        className="w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Atmospheric background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/5 rounded-full blur-[120px]" />
        </div>

        <Container className="relative z-10 w-full">
          {/* Section Title */}
          <div className="engine-title text-center max-w-3xl mx-auto mb-16 md:mb-20 invisible">
            <div className="inline-flex items-center rounded-full border border-indigo-800 bg-indigo-950/50 px-3 py-1 text-xs font-medium text-indigo-300 mb-6">
              {t.adaptiveEngine.badge}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              {t.adaptiveEngine.headingLine1}<br />{t.adaptiveEngine.headingLine2}
            </h2>
            <p className="text-xl text-neutral-400">
              {t.adaptiveEngine.subtitle}
            </p>
          </div>

          {/* Progress Track + Cards */}
          <div className="relative w-full max-w-5xl mx-auto px-4 md:px-0" dir="ltr">
            {/* Desktop progress line */}
            <div className="absolute top-1/2 left-[12.5%] right-[12.5%] h-0.5 -translate-y-1/2 hidden md:flex items-center">
              {/* Background track */}
              <div className="absolute inset-0 bg-neutral-800/40 rounded-full" />

              {/* Progress segments and dots */}
              {steps.map((step, i) => {
                const pct = (i / (steps.length - 1)) * 100;
                return (
                  <React.Fragment key={step.id}>
                    {/* Static Station Dot */}
                    <div
                      className="progress-dot absolute w-2 h-2 rounded-full z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 transition-colors duration-500"
                      style={{ left: `${pct}%`, backgroundColor: '#404040' }}
                    />
                  </React.Fragment>
                );
              })}

              {/* The Single Moving Line/Bar */}
              <div
                className="moving-dot absolute w-3.5 h-3.5 rounded-full bg-white z-20 -translate-x-1/2 -translate-y-1/2 top-1/2
             shadow-[0_0_8px_rgba(255,255,255,1),0_0_18px_rgba(129,110,255,0.95),0_0_35px_rgba(99,102,241,0.55)]"
                style={{ left: "0%" }}
              />
            </div>

            {/* Step Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative z-10">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="step-card flex flex-col items-center text-center relative group"
                >
                  {/* Icon Container */}
                  <div
                    className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center mb-5 mt-3 lg:mt-5 ${step.color} border ${step.border} relative bg-neutral-950/80 backdrop-blur-md transition-shadow duration-500`}
                  >
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 px-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed px-2 max-w-[200px]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
