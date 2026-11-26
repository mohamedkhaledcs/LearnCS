"use client";

import React from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { AssessmentResult } from "@/lib/assessment/schema";
import { ArrowRight, BarChart, CheckCircle2, Compass, AlertTriangle, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils/utils";
import { useAuth } from "@/lib/auth/auth-context";

interface AssessmentResultProps {
  result: AssessmentResult;
  lang: "en" | "ar";
}

const translations = {
  en: {
    title: "Assessment Complete",
    subtitle: "Your current Computer Science baseline.",
    overall: "Overall Score",
    breakdown: "Knowledge Area Breakdown",
    strengths: "Strongest Domains",
    gaps: "Focus & Prerequisite Gaps",
    noGaps: "No critical domain gaps detected across tested areas.",
    noStrengths: "Keep building core fundamentals to unlock strong domain mastery.",
    recPathsTitle: "Recommended Learning Paths",
    recStartUnit: "Start Recommended Unit",
    prereqWarn: "Suggested prerequisite first:",
    levelLabel: "Suggested Track Level",
    level_beginner: "Beginner Foundations",
    level_intermediate: "Intermediate Track",
    level_advanced: "Advanced Mastery",
    cta: "Open Dashboard & Start Learning",
    ctaAuth: "Create Account to Save & Start",
    ctaDesc: "Your diagnostic snapshot and tailored recommendations are synced with your account.",
    ctaAuthDesc: "Create an account or log in to save this diagnostic profile and begin your tailored roadmap.",
    level_insufficient_data: "Not Enough Data",
    level_emerging: "Emerging",
    level_developing: "Developing",
    level_strong: "Strong",
  },
  ar: {
    title: "اكتمل التقييم التشخيصي",
    subtitle: "قياسك الحالي في مجالات علوم الحاسوب.",
    overall: "النتيجة الإجمالية",
    breakdown: "تفصيل مجالات المعرفة",
    strengths: "أقوى المجالات لديك",
    gaps: "نقاط تحتاج لتقوية ومتطلبات سابقة",
    noGaps: "لا توجد فجوات حرجة في المجالات التي تم اختبارها.",
    noStrengths: "استمر في تثبيت الأساسيات للوصول إلى مستوى الإتقان القوي.",
    recPathsTitle: "المسارات التعليمية الموصى بها لك",
    recStartUnit: "ابدأ الوحدة المقترحة",
    prereqWarn: "يفضل إتمام المتطلب أولاً:",
    levelLabel: "المستوى المقترح",
    level_beginner: "تأسيسي",
    level_intermediate: "متوسط",
    level_advanced: "متقدم",
    cta: "افتح لوحة المتابعة وابدأ التعلم",
    ctaAuth: "أنشئ حساباً لحفظ النتائج والبدء",
    ctaDesc: "تمت مزامنة نتيجتك وتوصيات المسارات مع حسابك بنجاح.",
    ctaAuthDesc: "أنشئ حساباً أو سجل الدخول لحفظ ملفك التشخيصي والبدء بخطتك المخصصة.",
    level_insufficient_data: "بيانات غير كافية",
    level_emerging: "مبتدئ",
    level_developing: "قيد التطوير",
    level_strong: "قوي",
  }
};

const getLevelColor = (level: string) => {
  switch (level) {
    case "strong": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    case "developing": return "text-amber-400 bg-amber-500/10 border-amber-500/30";
    case "emerging": return "text-rose-400 bg-rose-500/10 border-rose-500/30";
    default: return "text-neutral-400 bg-neutral-500/10 border-neutral-500/30";
  }
};

export function AssessmentResultDisplay({ result, lang }: AssessmentResultProps) {
  const t = translations[lang];
  const { isAuthenticated } = useAuth();

  const overallColor = result.percentage >= 80 ? "text-emerald-400" : result.percentage >= 50 ? "text-amber-400" : "text-rose-400";

  // Persist the assessment result so it survives the auth transition
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("learncs_assessment_result", JSON.stringify(result));
      localStorage.setItem("learncs_assessment_completed", "true");
    }
  }, [result]);

  // Determine the CTA destination
  const ctaHref = isAuthenticated ? "/dashboard" : "/signup?redirect=/dashboard";
  const ctaText = isAuthenticated ? t.cta : t.ctaAuth;
  const ctaDescText = isAuthenticated ? t.ctaDesc : t.ctaAuthDesc;

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center py-12 px-4 relative z-10" dir={lang === "ar" ? "rtl" : "ltr"}>
      <Container className="max-w-4xl w-full flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2 text-center"
        >
          {t.title}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-400 mb-12 text-center"
        >
          {t.subtitle}
        </motion.h2>

        {/* Overall Score */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-8 flex flex-col items-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <BarChart className="w-48 h-48" />
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-sm font-semibold tracking-widest text-neutral-500 uppercase mb-4">{t.overall}</span>
            <div className="flex items-baseline gap-2">
              <span className={cn("text-7xl md:text-8xl font-black tracking-tighter drop-shadow-xl", overallColor)}>
                {result.overallScore}
              </span>
              <span className="text-3xl md:text-4xl font-bold text-neutral-600">
                / {result.maxScore}
              </span>
            </div>
            <div className="mt-4 w-64 h-2 bg-neutral-900 rounded-full overflow-hidden">
              <div 
                className={cn("h-full transition-all duration-1000", result.percentage >= 80 ? "bg-emerald-500" : result.percentage >= 50 ? "bg-amber-500" : "bg-rose-500")}
                style={{ width: `${result.percentage}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Strong vs Weak Domains Diagnostic Summary */}
        {(result.strongDomains || result.weakDomains || result.recommendedLevel) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="w-full grid gap-4 md:grid-cols-2 mb-8"
          >
            <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-emerald-300 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {t.strengths}
                </h4>
                {result.recommendedLevel && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {t.levelLabel}: {t[`level_${result.recommendedLevel}` as keyof typeof t] || result.recommendedLevel}
                  </span>
                )}
              </div>
              {result.strongDomains && result.strongDomains.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.strongDomains.map((dom) => (
                    <span key={dom} className="px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-xs font-medium text-emerald-200" dir="ltr">
                      {dom}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-400">{t.noStrengths}</p>
              )}
            </div>

            <div className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-6">
              <h4 className="font-bold text-amber-300 flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4" />
                {t.gaps}
              </h4>
              {result.weakDomains && result.weakDomains.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.weakDomains.map((dom) => (
                    <span key={dom} className="px-3 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-xs font-medium text-rose-200" dir="ltr">
                      {dom}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-400">{t.noGaps}</p>
              )}
            </div>
          </motion.div>
        )}

        {/* Personalized Recommended Learning Paths */}
        {result.recommendedPaths && result.recommendedPaths.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="w-full mb-10"
          >
            <h3 className="text-2xl font-bold text-white mb-5 flex items-center gap-2 border-b border-white/10 pb-3">
              <Compass className="w-6 h-6 text-indigo-400" />
              {t.recPathsTitle}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {result.recommendedPaths.map((rec) => {
                const startHref = isAuthenticated
                  ? `/roadmap/unit/${rec.startUnitId}?path=${rec.pathId}`
                  : `/signup?redirect=${encodeURIComponent(`/roadmap/unit/${rec.startUnitId}?path=${rec.pathId}`)}`;
                return (
                  <div key={rec.pathId} className="bg-white/5 border border-indigo-500/20 rounded-2xl p-5 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          #{rec.priority}
                        </span>
                        <span className="text-xs font-mono text-neutral-400" dir="ltr">
                          {rec.pathId}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-1.5">
                        {lang === "ar" ? rec.title.ar : rec.title.en}
                      </h4>
                      <p className="text-sm text-neutral-300 leading-relaxed">
                        {lang === "ar" ? rec.reason.ar : rec.reason.en}
                      </p>
                      {rec.missingPrerequisites && rec.missingPrerequisites.length > 0 && (
                        <div className="mt-3 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
                          {t.prereqWarn}{" "}
                          {rec.missingPrerequisites.map((m) => (lang === "ar" ? m.ar : m.en)).join(", ")}
                        </div>
                      )}
                    </div>
                    <Button asChild size="sm" variant="outline" className="w-full justify-between border-indigo-500/30 hover:bg-indigo-600/20 text-indigo-200">
                      <Link href={startHref}>
                        <span>{t.recStartUnit}</span>
                        <ArrowRight className={cn("w-4 h-4", lang === "ar" && "rotate-180")} />
                      </Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Breakdown */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full flex flex-col mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
            {t.breakdown}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {result.domains.map(domain => (
              <div key={domain.domain} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-white" dir="ltr">{domain.domain}</span>
                  <span className="text-2xl font-black text-indigo-400">{domain.percentage}%</span>
                </div>
                <div className="space-y-3 mt-4">
                  {domain.topics.map(topic => (
                    <div key={topic.topic} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/5 pt-3">
                      <span className="text-sm text-neutral-300" dir="ltr">{topic.topic}</span>
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-md border whitespace-nowrap", 
                        getLevelColor(topic.level)
                      )}>
                        {t[`level_${topic.level}` as keyof typeof t] || topic.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <p className="text-neutral-400 max-w-md">{ctaDescText}</p>
          <Button asChild size="lg" className="h-16 px-10 text-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all hover:scale-105 border-none group rounded-2xl">
            <Link href={ctaHref}>
              {ctaText}
              <ArrowRight className={cn("w-6 h-6 transition-transform", lang === "en" ? "ml-3 group-hover:translate-x-1" : "mr-3 group-hover:-translate-x-1", lang === "ar" && "rotate-180")} />
            </Link>
          </Button>
        </motion.div>

      </Container>
    </div>
  );
}
