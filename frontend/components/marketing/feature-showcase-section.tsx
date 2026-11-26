"use client";

import React, { useRef } from "react";
import { Container } from "@/components/layout/container";
import { useMotion } from "@/components/providers/motion-provider";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion/gsap-config";
import { Bot, Code2, LineChart, Network } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";

export function FeatureShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scenesContainerRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useMotion();
  const { t, isRtl } = useI18n();

  const features = [
    {
      id: "ai-mentor",
      icon: <Bot className="w-8 h-8 md:w-12 md:h-12" />,
      title: t.featureShowcase.items[0].title,
      desc: t.featureShowcase.items[0].desc,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center p-6">
          <div className="w-full max-w-sm bg-neutral-900 border border-neutral-700 rounded-xl p-4 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-800 flex-shrink-0" />
              <div className="flex-1 bg-neutral-800 rounded-lg rounded-tl-none p-3 text-xs text-neutral-300 leading-relaxed">
                {t.featureShowcase.aiPrompt}
              </div>
            </div>
            <div className="flex items-start gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="flex-1 bg-emerald-950/30 border border-emerald-900/50 rounded-lg rounded-tr-none p-3 text-xs text-emerald-200 leading-relaxed">
                {t.featureShowcase.aiReply}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "interactive-practice",
      icon: <Code2 className="w-8 h-8 md:w-12 md:h-12" />,
      title: t.featureShowcase.items[1].title,
      desc: t.featureShowcase.items[1].desc,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
      visual: (
        <div className="relative w-full h-full flex flex-col pt-8 px-8 gap-2" dir="ltr">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="flex-1 w-full bg-neutral-900 rounded-t-xl border-x border-t border-neutral-700 p-4 font-mono text-[0.8rem] md:text-sm shadow-2xl flex flex-col text-left">
            <div className="text-purple-400">#include <span className="text-amber-300">&lt;bits/stdc++.h&gt;</span></div>
            <div className="text-purple-400 mb-2">using namespace <span className="text-neutral-300">std</span>;</div>
            <div className="text-purple-400">int <span className="text-blue-400">solve</span>(vector&lt;<span className="text-purple-400">int</span>&gt;&amp; <span className="text-neutral-300">a</span>) {'{'}</div>
            <div className="pl-4 text-purple-400">int <span className="text-neutral-300">result = </span><span className="text-amber-300">0</span>;</div>
            <div className="pl-4 mt-2 text-purple-400">for (<span className="text-purple-400">int</span> <span className="text-neutral-300">x : a</span>) {'{'}</div>
            <div className="pl-8 text-neutral-300">result += x;</div>
            <div className="pl-4 text-purple-400">{'}'}</div>
            <div className="pl-4 mt-2 text-purple-400">return <span className="text-neutral-300">result</span>;</div>
            <div className="text-purple-400">{'}'}</div>
            <div className="mt-auto pt-4 border-t border-neutral-800">
              <div className="text-emerald-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {t.featureShowcase.testsPassed}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "progress-analytics",
      icon: <LineChart className="w-8 h-8 md:w-12 md:h-12" />,
      title: t.featureShowcase.items[2].title,
      desc: t.featureShowcase.items[2].desc,
      color: "text-orange-400",
      bg: "bg-orange-500/10 border-orange-500/20",
      visual: (
        <div className="relative w-full h-full flex items-end justify-center p-8 gap-4" dir="ltr">
           <div className="w-12 bg-orange-950 border border-orange-800/50 rounded-t-md h-[30%] relative">
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-orange-400">30%</div>
           </div>
           <div className="w-12 bg-orange-900 border border-orange-700/50 rounded-t-md h-[45%] relative">
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-orange-400">45%</div>
           </div>
           <div className="w-12 bg-orange-800 border border-orange-600/50 rounded-t-md h-[65%] relative">
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-orange-400">65%</div>
           </div>
           <div className="w-12 bg-orange-600 border border-orange-400/50 rounded-t-md h-[92%] relative shadow-[0_0_20px_rgba(234,88,12,0.4)]">
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-orange-300 font-bold">92%</div>
           </div>
        </div>
      )
    },
    {
      id: "adaptive-roadmaps",
      icon: <Network className="w-8 h-8 md:w-12 md:h-12" />,
      title: t.featureShowcase.items[3].title,
      desc: t.featureShowcase.items[3].desc,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center" dir="ltr">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 0 50 Q 25 20, 50 50 T 100 50" fill="none" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 0 50 Q 25 80, 50 50 T 100 50" fill="none" stroke="rgba(96, 165, 250, 0.6)" strokeWidth="2" />
          </svg>
          <div className="absolute w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}></div>
          <div className="absolute w-3 h-3 rounded-full bg-blue-900 border border-blue-500" style={{ left: '25%', top: '65%', transform: 'translate(-50%, -50%)' }}></div>
          <div className="absolute w-3 h-3 rounded-full bg-blue-900 border border-blue-500" style={{ left: '75%', top: '35%', transform: 'translate(-50%, -50%)' }}></div>
        </div>
      )
    },
  ];

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);

      if (isReducedMotion) {
        gsap.set([titleRef.current, q('.feature-scene')], { autoAlpha: 1 });
        gsap.set(q('.feature-scene'), { position: "relative", marginBottom: "2rem" });
        return;
      }

      gsap.set(q('.feature-scene'), { autoAlpha: 0, scale: 0.95, y: 30 });
      gsap.set(q('.feature-scene')[0], { autoAlpha: 1, scale: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onToggle: (self) => {
            if (self.isActive) window.dispatchEvent(new CustomEvent("update-wayfinding", { detail: "feature-showcase" }));
          }
        },
      });

      tl.fromTo(titleRef.current, 
        { autoAlpha: 0, y: -20 }, 
        { autoAlpha: 1, y: 0, duration: 0.5 }, 
        0
      );

      features.forEach((_, index) => {
        if (index === 0) return;

        const prevScene = q(`.feature-scene`)[index - 1];
        const currentScene = q(`.feature-scene`)[index];

        tl.to(prevScene, {
          autoAlpha: 0,
          scale: 1.05,
          y: -30,
          duration: 1,
          ease: "power2.inOut",
        });

        tl.to(currentScene, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power2.inOut",
        }, "<0.5");
      });

      tl.to({}, { duration: 1 });

    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="feature-showcase" className="relative bg-neutral-950 h-[400vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.02)_0,rgba(0,0,0,0)_100%)] pointer-events-none" />

      {/* Floating Title Layer */}
      <div ref={titleRef} className="absolute top-[10vh] left-0 w-full text-center invisible z-20 pointer-events-none px-4">
        <div className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs font-medium text-neutral-400 mb-4">
          {t.featureShowcase.badge}
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight drop-shadow-lg">
          {t.featureShowcase.heading}
        </h2>
      </div>

      {/* Central Fixed Stage */}
      <div ref={scenesContainerRef} className="absolute inset-0 top-[20vh] w-full flex items-center justify-center">
        <Container className="relative w-full h-[65vh] flex items-center justify-center">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="feature-scene absolute inset-0 w-full h-full flex flex-col md:flex-row-reverse items-center justify-center gap-8 md:gap-16 invisible"
            >
              {/* Text Content */}
              <div className={`flex-1 max-w-xl text-center flex flex-col items-center ${isRtl ? "md:text-right md:items-start" : "md:text-left md:items-start"}`}>
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-6 border ${feature.bg} ${feature.color} shadow-lg backdrop-blur-sm`}>
                  {feature.icon}
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              {/* Visual Presentation Area */}
              <div className="flex-1 w-full max-w-lg h-64 md:h-96 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-md overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                {feature.visual}
              </div>
            </div>
          ))}
        </Container>
      </div>
      </div>
    </section>
  );
}
