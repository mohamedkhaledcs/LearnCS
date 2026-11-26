"use client";

import React from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/i18n-context";

export default function OnboardingPage() {
  const { t, isRtl } = useI18n();

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-neutral-950 to-neutral-950 pointer-events-none" />

      <Container className="relative z-10 text-center max-w-2xl py-24">
        <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-sm mb-8">
          {t.onboarding.badge}
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6">
          {t.onboarding.titleLine1}
          <br />
          {t.onboarding.titleLine2}
        </h1>

        <p className="text-xl text-neutral-400 mb-10 max-w-lg mx-auto">
          {t.onboarding.subtitle}
        </p>

        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 max-w-md mx-auto mb-10">
          <p className="text-neutral-400 text-sm leading-relaxed">
            {t.onboarding.cardText}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="h-14 px-8 text-lg shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] hover:shadow-[0_0_60px_-15px_rgba(99,102,241,0.7)] transition-all group">
            <Link href="/discovery">
              {t.onboarding.startDiscovery}
              <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${isRtl ? "mr-3 rotate-180" : "ml-3"}`} />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-colors">
            <Link href="/dashboard">
              {t.onboarding.continueDashboard}
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
