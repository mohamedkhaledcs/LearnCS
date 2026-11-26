"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CAREER_QUESTIONS,
  calculateCareerMatches
} from "@/lib/curriculum/registries/career-registry";
import { CareerTrack } from "@/lib/curriculum/schema/career";
import { CurriculumService } from "@/lib/curriculum/curriculum.service";
import { useI18n } from "@/lib/i18n/i18n-context";
import { pickLocalized } from "@/lib/i18n/platform-labels";
import {
  Compass,
  ArrowRight,
  Sparkles,
  RotateCcw,
  BookOpen,
  ChevronRight,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/utils";

export default function CareerExplorationPage() {
  const router = useRouter();
  const { language: lang } = useI18n();
  const isAr = lang === "ar";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [results, setResults] = useState<{
    recommendedTracks: CareerTrack[];
    topRecommendations: string[];
  } | null>(null);

  const totalQuestions = CAREER_QUESTIONS.length;
  const currentQ = CAREER_QUESTIONS[currentQuestionIdx];

  const handleSelectOption = (questionId: string, optionId: string) => {
    const updated = { ...answers, [questionId]: optionId };
    setAnswers(updated);

    if (currentQuestionIdx < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestionIdx((prev) => prev + 1);
      }, 260);
    } else {
      const calculated = calculateCareerMatches(updated);
      setResults(calculated);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestionIdx(0);
    setResults(null);
  };

  const progressPct = Math.round(((currentQuestionIdx + 1) / totalQuestions) * 100);

  return (
    <div className="max-w-4xl mx-auto pb-24 animate-in fade-in duration-500" dir={isAr ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="text-center mb-10 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
          <Compass className="w-4 h-4" />
          <span>{isAr ? "توجيه ذكي للمسار المهني" : "Intelligent Curriculum Guidance"}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          {isAr ? "استكشاف المسارات المهنية" : "Career Exploration & Pathways"}
        </h1>
        <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {isAr
            ? "اكتشف كيف تتطابق ميولك التقنية مع مسارات هندسة البرمجيات المؤثرة واحصل على خريطة تعلم مناسبة."
            : "Discover how your technical instincts map to high-impact software careers and get a tailored curriculum roadmap."}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!results ? (
          /* Questionnaire Flow */
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-neutral-900/60 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-xl"
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                <span>
                  {isAr
                    ? `السؤال ${currentQuestionIdx + 1} من ${totalQuestions}`
                    : `Question ${currentQuestionIdx + 1} of ${totalQuestions}`}
                </span>
                <span className="font-mono text-indigo-400">
                  {isAr ? `${progressPct}% مكتمل` : `${progressPct}% Completed`}
                </span>
              </div>
              <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Current Question */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white leading-snug">
                {pickLocalized(currentQ.questionText, lang)}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(currentQ.id, opt.id)}
                    className={cn(
                      "w-full text-start p-4 md:p-5 rounded-2xl border transition-all flex items-start gap-4",
                      isSelected
                        ? "bg-indigo-600/20 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                        : "bg-black/30 border-white/5 hover:bg-white/5 hover:border-white/10"
                    )}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                        isSelected
                          ? "border-indigo-400 bg-indigo-500 text-white"
                          : "border-neutral-600 bg-neutral-800"
                      )}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm md:text-base font-semibold text-neutral-200">
                        {pickLocalized(opt.text, lang)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <button
                disabled={currentQuestionIdx === 0}
                onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                {isAr ? "السابق" : "Previous"}
              </button>

              {answers[currentQ.id] && currentQuestionIdx < totalQuestions - 1 && (
                <button
                  onClick={() => setCurrentQuestionIdx((prev) => prev + 1)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
                >
                  <span>{isAr ? "السؤال التالي" : "Next Question"}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          /* Results View */
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-3xl p-6 md:p-8 text-center backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-white mb-1">
                {isAr ? "تقرير التوافق المهني" : "Your Career Match Report"}
              </h2>
              <p className="text-emerald-300 text-sm max-w-md mx-auto">
                {isAr
                  ? "بناءً على اختياراتك الهندسية، إليك أقوى التخصصات المتوافقة مع أهدافك."
                  : "Based on your weighted engineering preferences, here are your strongest alignment tracks."}
              </p>
            </div>

            {/* Recommended Tracks List */}
            <div className="space-y-6">
              {results.recommendedTracks.map((track, idx) => (
                <div
                  key={track.id}
                  className={cn(
                    "bg-neutral-900/70 border rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-xl transition-all",
                    idx === 0
                      ? "border-indigo-500/40 bg-indigo-950/10 shadow-[0_0_30px_rgba(99,102,241,0.1)]"
                      : "border-white/10"
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                          idx === 0
                            ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                            : "bg-white/10 text-neutral-300"
                        )}
                      >
                        {isAr ? `#${idx + 1} أفضل توافق` : `#${idx + 1} Best Match`}
                      </span>
                      <h3 className="text-2xl font-black text-white">{pickLocalized(track.title, lang)}</h3>
                    </div>
                  </div>

                  <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                    {pickLocalized(track.description, lang)}
                  </p>

                  {/* Skills Grid */}
                  <div className="mb-6">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                      {isAr ? "الكفاءات التقنية الرئيسية" : "Key Competencies"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {track.keySkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-300"
                          dir="ltr"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Connected LearnCS Learning Paths */}
                  <div className="pt-6 border-t border-white/5">
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                      <Target className="w-3.5 h-3.5" />
                      {isAr ? "المسارات الموصى بها داخل LearnCS:" : "Recommended LearnCS Learning Paths:"}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {track.recommendedPathIds.map((pathId) => {
                        const pathData = CurriculumService.getLearningPath(pathId);
                        return (
                          <div
                            key={pathId}
                            onClick={() => router.push(`/roadmap?path=${pathId}`)}
                            className="p-3.5 rounded-2xl bg-black/40 border border-white/10 hover:border-indigo-500/40 hover:bg-white/5 cursor-pointer transition-all flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-2.5">
                              <BookOpen className="w-4 h-4 text-indigo-400" />
                              <span className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                                {pickLocalized(pathData?.title, lang) || pathId}
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-indigo-400 transition-colors rtl:rotate-180" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={resetQuiz}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-neutral-300 text-sm font-semibold border border-white/10 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{isAr ? "إعادة الاستكشاف" : "Retake Exploration"}</span>
              </button>
              <button
                onClick={() => router.push("/roadmap")}
                className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-xl shadow-indigo-600/30 transition-all hover:-translate-y-0.5"
              >
                <span>{isAr ? "فتح خريطة التعلم" : "Open Platform Roadmap"}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
