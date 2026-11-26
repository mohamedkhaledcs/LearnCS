"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { PublicQuestion, SubmittedAnswer } from "@/lib/assessment/schema";
import { DiscoveryCard } from "@/components/onboarding/discovery-card";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, CornerDownLeft, Delete } from "lucide-react";
import { cn } from "@/lib/utils/utils";

interface AssessmentTestProps {
  questions: PublicQuestion[];
  lang: "en" | "ar";
  onSubmit: (answers: SubmittedAnswer[]) => void;
}

const translations = {
  en: {
    back: "Previous",
    next: "Next",
    submit: "Submit Assessment",
    submitting: "Scoring...",
    topic: "Topic:"
  },
  ar: {
    back: "السابق",
    next: "التالي",
    submit: "إنهاء التقييم",
    submitting: "جاري التصحيح...",
    topic: "الموضوع:"
  }
};

export function AssessmentTest({ questions, lang, onSubmit }: AssessmentTestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(0);

  const t = translations[lang];
  const question = questions[currentIndex];
  
  if (!question) return null;

  const isAnswered = !!answers[question.id];

  const handleSelect = useCallback((optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: optionId
    }));
  }, [question.id]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
      setFocusedOptionIndex(0);
    }
  }, [currentIndex, questions.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
      setFocusedOptionIndex(0);
    }
  }, [currentIndex]);

  const handleSubmit = useCallback(() => {
    setIsSubmitting(true);
    const submitted: SubmittedAnswer[] = Object.keys(answers).map(qId => ({
      questionId: qId,
      answer: answers[qId]
    }));
    
    questions.forEach(q => {
      if (!answers[q.id]) {
        submitted.push({ questionId: q.id, answer: "" });
      }
    });

    onSubmit(submitted);
  }, [answers, questions, onSubmit]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSubmitting) return;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          setFocusedOptionIndex(prev => 
            prev < question.options.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          setFocusedOptionIndex(prev => 
            prev > 0 ? prev - 1 : prev
          );
          break;
        case "Enter":
          e.preventDefault();
          const opt = question.options[focusedOptionIndex];
          if (opt) {
            if (answers[question.id] === opt.id) {
              if (currentIndex < questions.length - 1) {
                handleNext();
              } else {
                handleSubmit();
              }
            } else {
              handleSelect(opt.id);
            }
          }
          break;
        case "Backspace":
          e.preventDefault();
          handlePrev();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentIndex, 
    focusedOptionIndex, 
    isAnswered, 
    question.options, 
    questions.length, 
    isSubmitting, 
    handleSelect, 
    handleNext, 
    handlePrev, 
    handleSubmit
  ]);

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  const variants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? (lang === "ar" ? -40 : 40) : (lang === "ar" ? 40 : -40),
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? (lang === "ar" ? 40 : -40) : (lang === "ar" ? -40 : 40),
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    })
  };

  return (
    <div className="w-full flex flex-col flex-1 relative z-10" dir={lang === "ar" ? "rtl" : "ltr"}>
      
      {/* Top Bar */}
      <div className="w-full border-b border-white/5 bg-neutral-950/50 backdrop-blur-md p-4 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="text-sm font-medium text-neutral-400">
            {currentIndex + 1} / {questions.length}
          </div>
          <div className="text-sm text-neutral-500 hidden md:block">
            {t.topic} <span className="text-neutral-300 font-medium ml-2">{question.domain} • {question.topic}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center py-12 px-4 w-full max-w-4xl mx-auto overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={question.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex flex-col items-center"
          >
            {/* Question Text */}
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 tracking-tight drop-shadow-md leading-tight max-w-3xl">
              {question.question[lang]}
            </h2>

            {/* Code Snippet (if any) */}
            {question.codeSnippet && (
              <div className="w-full max-w-2xl mb-8 rounded-xl overflow-hidden border border-white/10 bg-neutral-900 ltr text-left" dir="ltr">
                <div className="bg-neutral-950 px-4 py-2 border-b border-white/10 text-xs font-mono text-neutral-400 uppercase tracking-widest text-left">
                  {question.codeLanguage || "code"}
                </div>
                <div className="p-4 overflow-x-auto text-sm md:text-base font-mono text-emerald-300 whitespace-pre text-left">
                  {question.codeSnippet}
                </div>
              </div>
            )}

            {/* Options */}
            <div className="w-full max-w-2xl flex flex-col gap-3 mb-12 relative group">
              {question.options.map((opt, idx) => (
                <div key={opt.id} className="relative w-full" onMouseEnter={() => setFocusedOptionIndex(idx)}>
                  {/* Subtle focus indicator on the side */}
                  {focusedOptionIndex === idx && (
                    <motion.div 
                      layoutId="focusIndicator"
                      className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-indigo-500 rounded-full hidden md:block shadow-[0_0_10px_rgba(99,102,241,0.6)]"
                    />
                  )}
                  <DiscoveryCard
                    label={opt.text[lang]}
                    multiple={false}
                    selected={answers[question.id] === opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={cn(focusedOptionIndex === idx && "border-indigo-500/50 bg-indigo-500/5")}
                  />
                </div>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav Bar */}
      <div className="w-full bg-neutral-950/80 backdrop-blur-md p-4 sticky bottom-0 z-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <Button 
            variant="ghost" 
            onClick={handlePrev}
            disabled={currentIndex === 0 || isSubmitting}
            className="text-neutral-400 hover:text-white"
          >
            <ArrowLeft className={cn("w-5 h-5", lang === "en" ? "mr-2" : "ms-2", lang === "ar" && "rotate-180")} />
            {t.back}
          </Button>

          {/* Keyboard Hints (Desktop Only) */}
          <div className="hidden md:flex items-center gap-6 text-xs text-neutral-500 font-mono tracking-widest uppercase">
             <div className="flex items-center gap-2">
               <kbd className="px-2 py-1 rounded border border-white/10 bg-white/5">Backspace</kbd> Back
             </div>
             <div className="flex items-center gap-2">
               <kbd className="px-2 py-1 rounded border border-white/10 bg-white/5">L</kbd> Language
             </div>
             <div className="flex items-center gap-2">
               <kbd className="px-2 py-1 rounded border border-white/10 bg-white/5">Enter</kbd> {isAnswered ? "Next" : "Select"}
             </div>
          </div>
          
          {currentIndex < questions.length - 1 ? (
            <Button 
              onClick={handleNext}
              disabled={!isAnswered}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8"
            >
              {t.next}
              <ArrowRight className={cn("w-5 h-5", lang === "en" ? "ml-2" : "mr-2", lang === "ar" && "rotate-180")} />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={!isAnswered || isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
            >
              {isSubmitting ? t.submitting : t.submit}
            </Button>
          )}
        </div>
        
        {/* Progress Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-900">
          <motion.div
            className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
            style={{ 
              transformOrigin: lang === "ar" ? "right" : "left", 
              float: lang === "ar" ? "right" : "left" 
            }}
          />
        </div>
      </div>

    </div>
  );
}
