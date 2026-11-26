"use client";

import React, { useRef } from "react";
import { Container } from "@/components/layout/container";
import { useMotion } from "@/components/providers/motion-provider";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion/gsap-config";
import { AlertTriangle, GitFork, Route, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";

export function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scenesContainerRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useMotion();
  const { t, isRtl } = useI18n();

  const problems = [
    {
      id: "rigid-path",
      icon: <Route className="w-8 h-8 md:w-12 md:h-12" />,
      title: t.problem.items[0].title,
      desc: t.problem.items[0].desc,
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/20",
      visual: (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-4 w-full px-12 relative">
            <div className="h-1 bg-red-900/50 flex-1 rounded-full relative overflow-hidden">
               <div className="absolute inset-0 bg-red-500/20 w-1/3"></div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-950 border border-red-800 flex items-center justify-center flex-shrink-0 z-10 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <Users className="w-6 h-6 text-red-500" />
            </div>
            <div className="h-1 bg-red-900/50 flex-1 rounded-full relative overflow-hidden"></div>
          </div>
          <p className="mt-8 text-neutral-500 text-sm font-mono tracking-widest uppercase">{t.problem.visuals.rigidPath}</p>
        </div>
      )
    },
    {
      id: "gap-detection",
      icon: <AlertTriangle className="w-8 h-8 md:w-12 md:h-12" />,
      title: t.problem.items[1].title,
      desc: t.problem.items[1].desc,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-neutral-700 bg-neutral-900"></div>
            <div className="w-16 h-0.5 bg-neutral-700"></div>
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-700/50 bg-amber-950/20 flex items-center justify-center relative">
              <AlertTriangle className="w-6 h-6 text-amber-600/50 absolute" />
            </div>
            <div className="w-16 h-0.5 bg-neutral-700"></div>
            <div className="w-16 h-16 rounded-full border-2 border-neutral-700 bg-neutral-900"></div>
          </div>
        </div>
      )
    },
    {
      id: "prereq-awareness",
      icon: <GitFork className="w-8 h-8 md:w-12 md:h-12" />,
      title: t.problem.items[2].title,
      desc: t.problem.items[2].desc,
      color: "text-orange-400",
      bg: "bg-orange-500/10 border-orange-500/20",
      visual: (
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-8">
          <div className="w-32 h-16 rounded-xl border-2 border-orange-700/50 bg-orange-950/30 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.1)]">
             <span className="text-orange-200/50 font-mono text-sm">{t.problem.visuals.advanced}</span>
          </div>
          <div className="w-px h-16 bg-gradient-to-b from-orange-700/50 to-transparent"></div>
          <div className="flex gap-12 opacity-30">
            <div className="w-24 h-12 rounded-lg border border-neutral-700 flex items-center justify-center">
               <span className="text-neutral-500 text-xs">{t.problem.visuals.prereqA}</span>
            </div>
            <div className="w-24 h-12 rounded-lg border border-neutral-700 flex items-center justify-center">
               <span className="text-neutral-500 text-xs">{t.problem.visuals.prereqB}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "no-adaptation",
      icon: <Users className="w-8 h-8 md:w-12 md:h-12" />,
      title: t.problem.items[3].title,
      desc: t.problem.items[3].desc,
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/20",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="flex flex-col gap-4 w-full max-w-sm px-8" dir="ltr">
            <div className="flex items-center justify-between w-full p-4 rounded-xl border border-neutral-800 bg-neutral-900/50">
              <span className="text-neutral-400">{t.problem.visuals.scoreLow}</span>
              <span className="text-rose-500">{t.problem.visuals.nextModule}</span>
            </div>
            <div className="flex items-center justify-between w-full p-4 rounded-xl border border-neutral-800 bg-neutral-900/50">
              <span className="text-neutral-400">{t.problem.visuals.scoreHigh}</span>
              <span className="text-rose-500">{t.problem.visuals.nextModule}</span>
            </div>
          </div>
        </div>
      )
    },
  ];

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);

      if (isReducedMotion) {
        gsap.set([titleRef.current, q('.scene-card')], { autoAlpha: 1 });
        gsap.set(q('.scene-card'), { position: "relative", marginBottom: "2rem" });
        return;
      }

      // Initial state
      gsap.set(q('.scene-card'), { autoAlpha: 0, scale: 0.95, y: 30 });
      gsap.set(q('.scene-card')[0], { autoAlpha: 1, scale: 1, y: 0 }); // First scene visible

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onToggle: (self) => {
            if (self.isActive) window.dispatchEvent(new CustomEvent("update-wayfinding", { detail: "problem" }));
          }
        },
      });

      // Title fade in
      tl.fromTo(titleRef.current, 
        { autoAlpha: 0, y: -20 }, 
        { autoAlpha: 1, y: 0, duration: 0.5 }, 
        0
      );

      // Scene transitions
      problems.forEach((_, index) => {
        if (index === 0) return;

        const prevScene = q(`.scene-card`)[index - 1];
        const currentScene = q(`.scene-card`)[index];

        // Animate out previous
        tl.to(prevScene, {
          autoAlpha: 0,
          scale: 1.05,
          y: -30,
          duration: 1,
          ease: "power2.inOut",
        });

        // Animate in current
        tl.to(currentScene, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power2.inOut",
        }, "<0.5"); // Start 0.5s after previous starts fading out
      });

      // Hold last scene
      tl.to({}, { duration: 1 });

    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="problem" className="relative bg-neutral-950 h-[400vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0,rgba(0,0,0,0)_100%)] pointer-events-none" />

      {/* Floating Title Layer */}
      <div ref={titleRef} className="absolute top-[10vh] left-0 w-full text-center invisible z-20 pointer-events-none px-4">
        <div className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs font-medium text-neutral-400 mb-4">
          {t.problem.badge}
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight drop-shadow-lg">
          {t.problem.heading}
        </h2>
      </div>

      {/* Central Fixed Stage */}
      <div ref={scenesContainerRef} className="absolute inset-0 top-[20vh] w-full flex items-center justify-center">
        <Container className="relative w-full h-[65vh] flex items-center justify-center">
          {problems.map((problem) => (
            <div
              key={problem.id}
              className="scene-card absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 invisible"
            >
              {/* Text Content */}
              <div className={`flex-1 max-w-xl text-center flex flex-col items-center ${isRtl ? "md:text-right md:items-start" : "md:text-left md:items-start"}`}>
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-6 border ${problem.bg} ${problem.color} shadow-lg backdrop-blur-sm`}>
                  {problem.icon}
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {problem.title}
                </h3>
                <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
                  {problem.desc}
                </p>
              </div>

              {/* Visual Presentation Area */}
              <div className="flex-1 w-full max-w-lg h-64 md:h-96 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-md overflow-hidden relative shadow-2xl">
                {/* Subtle grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                {problem.visual}
              </div>
            </div>
          ))}
        </Container>
      </div>
      </div>
    </section>
  );
}
