"use client";

import React, { useRef } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useMotion } from "@/components/providers/motion-provider";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion/gsap-config";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/i18n-context";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useMotion();
  const { t, language } = useI18n();

  useGSAP(
    () => {
      if (isReducedMotion) {
        // Show everything immediately
        gsap.set([videoWrapRef.current, badgeRef.current, headlineRef.current, subtitleRef.current, ctaRef.current, statsRef.current], {
          autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)",
        });
        return;
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive) window.dispatchEvent(new CustomEvent("update-wayfinding", { detail: "hero" }));
        }
      });

      // --- ENTRANCE TIMELINE (Frame 01-05) ---
      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Frame 01: Dark start, orb hidden
      gsap.set(videoWrapRef.current, { autoAlpha: 0, scale: 1.05 });
      gsap.set(badgeRef.current, { autoAlpha: 0, y: -20 });
      gsap.set(headlineRef.current, { autoAlpha: 0, y: 40, filter: "blur(12px)" });
      gsap.set(subtitleRef.current, { autoAlpha: 0, y: 30, filter: "blur(8px)" });
      gsap.set(ctaRef.current, { autoAlpha: 0, y: 20, scale: 0.95 });
      gsap.set(statsRef.current, { autoAlpha: 0, y: 30 });

      // Frame 02: Orb emerges
      entranceTl.to(videoWrapRef.current, {
        autoAlpha: 1, scale: 1, duration: 2, ease: "power2.out",
      });

      // Frame 03: Headline reveal (overlaps orb emergence)
      entranceTl.to(headlineRef.current, {
        autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.2,
      }, "-=1.0");

      // Badge appears near headline
      entranceTl.to(badgeRef.current, {
        autoAlpha: 1, y: 0, duration: 0.8,
      }, "-=0.8");

      // Frame 04: Subtitle + CTA
      entranceTl.to(subtitleRef.current, {
        autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8,
      }, "-=0.4");

      entranceTl.to(ctaRef.current, {
        autoAlpha: 1, y: 0, scale: 1, duration: 0.8,
      }, "-=0.4");

      // Frame 05: Stats
      entranceTl.to(statsRef.current, {
        autoAlpha: 1, y: 0, duration: 0.8,
      }, "-=0.3");

      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
        },
      });

      exitTl.to(headlineRef.current, { y: -50, autoAlpha: 0, filter: "blur(10px)", duration: 1 }, 0);
      exitTl.to(badgeRef.current, { y: -40, autoAlpha: 0, duration: 1 }, 0);
      exitTl.to(subtitleRef.current, { y: -30, autoAlpha: 0, duration: 1 }, 0.1);
      exitTl.to(ctaRef.current, { y: -20, autoAlpha: 0, duration: 1 }, 0.15);
      exitTl.to(statsRef.current, { y: -10, autoAlpha: 0, duration: 1 }, 0.2);
      exitTl.to(videoWrapRef.current, { y: 30, autoAlpha: 0, duration: 1 }, 0);

    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="hero" className="relative bg-neutral-950 min-h-screen w-full flex items-center justify-center pt-32 pb-24 overflow-hidden">
      {/* Deep Atmospheric Background Gradients */}
      <div className="absolute inset-0 -z-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-neutral-950/80 to-neutral-950" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent -z-10" />

      {/* Video Background Container (Video-Ready Architecture) */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0 w-full h-full -z-10 pointer-events-none invisible"
      >
        {/* Placeholder for future video element */}
        {/* 
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen">
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        */}

        {/* Graceful Premium Fallback */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <Container className="relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 md:space-y-8">
          <div ref={badgeRef} className="invisible">
            <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-sm mb-4">
              {t.heroSection.badge}
            </div>
          </div>

          <h1
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-sm leading-tight invisible"
          >
            {t.hero.title}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              {t.hero.titleHighlight}
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed invisible"
          >
            {t.hero.subtitle}
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8 w-full sm:w-auto invisible">
            <Button asChild size="lg" className="h-14 px-10 text-lg shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] transition-all hover:shadow-[0_0_60px_-15px_rgba(99,102,241,0.7)] group">
              <Link href="/assessment">
                {t.hero.ctaPrimary}
                <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${language === 'en' ? 'ml-3' : 'mr-3 rotate-180'}`} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-10 text-lg bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-colors group text-neutral-300 cursor-pointer">
              <a onClick={(e) => {
                e.preventDefault();
                document.getElementById('adaptive-engine')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                {t.hero.ctaSecondary}
              </a>
            </Button>
          </div>

          {/* Stats Strip (Frame 05) */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 md:pt-12 border-t border-white/5 mt-8 md:mt-12 w-full max-w-3xl mx-auto invisible">
            {t.heroSection.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-neutral-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
