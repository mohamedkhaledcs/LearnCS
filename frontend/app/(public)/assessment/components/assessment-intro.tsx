"use client";

import React from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Target, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { ASSESSMENT_CONFIG } from "@/lib/assessment/config";
import { cn } from "@/lib/utils/utils";

interface AssessmentIntroProps {
  onStart: (count: number) => void;
  lang: "en" | "ar";
}

const translations = {
  en: {
    badge: "Baseline Test",
    title: "Diagnostic Assessment",
    subtitle: "Let us see what you already know.",
    desc1: "This assessment covers multiple Computer Science areas including Algorithms, Data Structures, Networking, and Operating Systems.",
    desc2: "Questions vary in difficulty from beginner concepts to advanced code tracing.",
    desc3: "This is not a school exam. It is a baseline diagnostic test to help us build a personalized learning roadmap.",
    startBtn: "Start Assessment",
    selectLength: "Select length",
    questions: "Questions",
    recommended: "Recommended"
  },
  ar: {
    badge: "اختبار تحديد المستوى",
    title: "التقييم التشخيصي",
    subtitle: "دعنا نرى ما تعرفه بالفعل.",
    desc1: "يغطي هذا التقييم مجالات متعددة في علوم الحاسوب بما في ذلك الخوارزميات، هياكل البيانات، الشبكات، وأنظمة التشغيل.",
    desc2: "تتفاوت صعوبة الأسئلة من المفاهيم الأساسية إلى التتبع المتقدم للكود.",
    desc3: "هذا ليس امتحاناً مدرسياً. إنه اختبار تشخيصي أولي لمساعدتنا في بناء مسار تعليمي مخصص لك.",
    startBtn: "ابدأ التقييم",
    selectLength: "اختر طول التقييم",
    questions: "سؤال",
    recommended: "موصى به"
  }
};

export function AssessmentIntro({ onStart, lang }: AssessmentIntroProps) {
  const t = translations[lang];

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center py-12 px-4 relative z-10" dir={lang === "ar" ? "rtl" : "ltr"}>
      <Container className="max-w-3xl w-full flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300 mb-8"
        >
          {t.badge}
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6"
        >
          {t.title}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl text-neutral-300 mb-12 font-medium"
        >
          {t.subtitle}
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid gap-6 md:grid-cols-3 max-w-4xl mb-16 text-left"
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-neutral-300">
            <Brain className={cn("w-8 h-8 text-indigo-400 mb-4", lang === "ar" && "scale-x-[-1]")} />
            <p>{t.desc1}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-neutral-300">
            <Target className="w-8 h-8 text-emerald-400 mb-4" />
            <p>{t.desc2}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-neutral-300">
            <ShieldAlert className="w-8 h-8 text-amber-400 mb-4" />
            <p>{t.desc3}</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex flex-wrap justify-center gap-3">
            <Button 
              variant="outline" 
              className="border-neutral-700 bg-transparent text-neutral-400 hover:text-white"
              onClick={() => onStart(ASSESSMENT_CONFIG.minQuestions)}
            >
              {ASSESSMENT_CONFIG.minQuestions} {t.questions}
            </Button>
            <Button 
              variant="default"
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
              onClick={() => onStart(ASSESSMENT_CONFIG.defaultQuestions)}
            >
              {ASSESSMENT_CONFIG.defaultQuestions} {t.questions} ({t.recommended})
            </Button>
            <Button 
              variant="outline" 
              className="border-neutral-700 bg-transparent text-neutral-400 hover:text-white"
              onClick={() => onStart(ASSESSMENT_CONFIG.maxQuestions)}
            >
              {ASSESSMENT_CONFIG.maxQuestions} {t.questions}
            </Button>
          </div>
        </motion.div>

      </Container>
    </div>
  );
}
