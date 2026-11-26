"use client";

import React, { useRef } from "react";
import { Container } from "@/components/layout/container";
import { useMotion } from "@/components/providers/motion-provider";
import { gsap, useGSAP } from "@/lib/motion/gsap-config";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/i18n-context";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useMotion();
  const { t, isRtl } = useI18n();

  useGSAP(
    () => {
      if (isReducedMotion) {
        gsap.set(contentRef.current, { autoAlpha: 1 });
        return;
      }

      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} dir={isRtl ? "rtl" : "ltr"} className="bg-black border-t border-white/5 pt-20 pb-10">
      <Container>
        <div ref={contentRef} className="invisible">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1 space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center border border-indigo-400/30">
                  <span className="text-white font-black text-sm">CS</span>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">LearnCS</span>
              </Link>
              <p className="text-neutral-500 text-sm max-w-xs">
                {t.footer.tagline}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold">{t.footer.colProduct}</h4>
              <ul className="space-y-2 text-sm text-neutral-500">
                <li><Link href="#adaptive-engine" className="hover:text-indigo-400 transition-colors">{t.footer.links.features}</Link></li>
                <li><Link href="/roadmap" className="hover:text-indigo-400 transition-colors">{t.footer.links.roadmap}</Link></li>
                <li><Link href="/assessment" className="hover:text-indigo-400 transition-colors">{t.footer.links.assessment}</Link></li>
                <li><Link href="/plans" className="hover:text-indigo-400 transition-colors">{t.footer.links.plans}</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold">{t.footer.colExplore}</h4>
              <ul className="space-y-2 text-sm text-neutral-500">
                <li><Link href="/career" className="hover:text-indigo-400 transition-colors">{t.footer.links.career}</Link></li>
                <li><Link href="/discovery" className="hover:text-indigo-400 transition-colors">{t.footer.links.discovery}</Link></li>
                <li><Link href="/help" className="hover:text-indigo-400 transition-colors">{t.footer.links.help}</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold">{t.footer.colAccount}</h4>
              <ul className="space-y-2 text-sm text-neutral-500">
                <li><Link href="/login" className="hover:text-indigo-400 transition-colors">{t.footer.links.login}</Link></li>
                <li><Link href="/signup" className="hover:text-indigo-400 transition-colors">{t.footer.links.signup}</Link></li>
                <li><Link href="/dashboard" className="hover:text-indigo-400 transition-colors">{t.footer.links.dashboard}</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
            <p>© {new Date().getFullYear()} LearnCS. {t.footer.rights}</p>
            <div className="flex gap-4">
              <span>{t.footer.status}</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
