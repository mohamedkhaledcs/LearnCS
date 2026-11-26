"use client";

import React, { useEffect, useState } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ui/particle-background";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Map, Code2, Network, Database } from "lucide-react";
import Link from "next/link";
import { AssessmentResult } from "@/lib/assessment/schema";
import { useI18n } from "@/lib/i18n/i18n-context";
import { useAuth } from "@/lib/auth/auth-context";

export default function RoadmapPreviewPage() {
  const { t, isRtl } = useI18n();
  const { isAuthenticated } = useAuth();
  const [loadingStep, setLoadingStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [resultData, setResultData] = useState<AssessmentResult | null>(null);

  const loadingMessages = t.roadmapPreview.loadingMessages;

  useEffect(() => {
    try {
      const stored = localStorage.getItem("learncs_assessment_result");
      if (stored) {
        setResultData(JSON.parse(stored));
      }
    } catch {
      // ignore local parse errors
    }

    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingMessages.length - 1) return prev + 1;
        clearInterval(interval);
        setTimeout(() => setIsGenerating(false), 600);
        return prev;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [loadingMessages.length]);

  const phase1 = t.roadmapPreview.phases[0] as { tag: string; title: string; highScoreDesc: string; lowScoreDesc: string; items: readonly string[] };
  const phase2 = t.roadmapPreview.phases[1] as { tag: string; title: string; desc: string; items: readonly string[] };
  const phase3 = t.roadmapPreview.phases[2] as { tag: string; title: string; desc: string; items: readonly string[] };

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="relative min-h-screen bg-neutral-950 flex flex-col justify-center overflow-hidden pt-20 pb-24">
      <ParticleBackground />

      <Container className="relative z-10 w-full max-w-5xl">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-8" />
            <div className="h-8 overflow-hidden relative w-full max-w-md text-center">
              {loadingMessages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: loadingStep === idx ? 1 : 0,
                    y: loadingStep === idx ? 0 : (loadingStep > idx ? -20 : 20)
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center text-xl text-neutral-300 font-medium"
                >
                  {msg}
                </motion.div>
              ))}
            </div>
            <div className="w-64 h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
              <motion.div
                className="h-full bg-indigo-500"
                initial={{ width: "0%" }}
                animate={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col w-full"
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300 mb-6">
                {t.roadmapPreview.badge}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
                {t.roadmapPreview.title}
              </h1>
              <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                {t.roadmapPreview.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                <div className="absolute top-0 end-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Code2 className="w-32 h-32" />
                </div>
                <div className="text-indigo-400 font-bold mb-2">{phase1.tag}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{phase1.title}</h3>
                <p className="text-neutral-400 text-sm mb-6">
                  {resultData?.percentage && resultData.percentage > 70
                    ? phase1.highScoreDesc
                    : phase1.lowScoreDesc}
                </p>
                <ul className="space-y-3 text-sm text-neutral-300">
                  {phase1.items.map((item) => (
                    <li key={item} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                <div className="absolute top-0 end-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Network className="w-32 h-32" />
                </div>
                <div className="text-purple-400 font-bold mb-2">{phase2.tag}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{phase2.title}</h3>
                <p className="text-neutral-400 text-sm mb-6">{phase2.desc}</p>
                <ul className="space-y-3 text-sm text-neutral-300">
                  {phase2.items.map((item) => (
                    <li key={item} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                <div className="absolute top-0 end-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Database className="w-32 h-32" />
                </div>
                <div className="text-emerald-400 font-bold mb-2">{phase3.tag}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{phase3.title}</h3>
                <p className="text-neutral-400 text-sm mb-6">{phase3.desc}</p>
                <ul className="space-y-3 text-sm text-neutral-300">
                  {phase3.items.map((item) => (
                    <li key={item} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-center bg-gradient-to-b from-indigo-900/20 to-transparent border border-indigo-500/20 rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
              <Map className="w-12 h-12 text-indigo-400 mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">{t.roadmapPreview.saveTitle}</h2>
              <p className="text-neutral-400 max-w-xl mx-auto mb-8">
                {t.roadmapPreview.saveDesc}
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg" className="h-14 px-10 text-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                  <Link href={isAuthenticated ? "/roadmap" : "/signup?redirect=/roadmap"}>
                    {isAuthenticated ? t.roadmapPreview.openRoadmap : t.roadmapPreview.createAccount}
                    <ArrowRight className={`w-5 h-5 ${isRtl ? "mr-2 rotate-180" : "ml-2"}`} />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </Container>
    </main>
  );
}
