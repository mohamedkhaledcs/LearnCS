"use client";

import React, { useState, useRef, useEffect } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { DiscoveryCard } from "@/components/onboarding/discovery-card";
import { ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/components/onboarding/discovery-questions";
import { translations } from "@/components/onboarding/discovery-translations";
import { ParticleBackground } from "@/components/ui/particle-background";
import { apiClient } from "@/lib/api/client";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";

export default function DiscoveryPage() {
  const router = useRouter();
  const { language: lang, setLanguage } = useI18n();
  const [history, setHistory] = useState<number[]>([0]);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [direction, setDirection] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const answersRef = useRef(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const t = translations[lang];

  const currentIndex = history[history.length - 1];
  const question = QUESTIONS[currentIndex];

  const handleToggleLang = () => {
    setLanguage(lang === "en" ? "ar" : "en");
  };



  const handleSelect = (optionId: string) => {
    if (isCompleted || !question) return;
    
    const isMultiple = question.type === "multiple";
    const isExclusive = question.options.find(o => o.id === optionId)?.exclusive;
    
    setAnswers(prev => {
      const current = prev[question.id] || [];
      if (isMultiple) {
        if (isExclusive) {
          if (current.includes(optionId)) {
            return { ...prev, [question.id]: [] };
          } else {
            return { ...prev, [question.id]: [optionId] };
          }
        } else {
          const currentWithoutExclusive = current.filter(id => {
            return !question.options.find(o => o.id === id)?.exclusive;
          });
          
          if (currentWithoutExclusive.includes(optionId)) {
            return { ...prev, [question.id]: currentWithoutExclusive.filter(id => id !== optionId) };
          } else {
            return { ...prev, [question.id]: [...currentWithoutExclusive, optionId] };
          }
        }
      } else {
        return { ...prev, [question.id]: [optionId] };
      }
    });



    if (!isMultiple) {
      setTimeout(() => handleNext(), 300);
    }
  };

  const handleNext = React.useCallback(() => {
    setDirection(1);
    
    // Find next valid question based on conditions
    let nextIndex = currentIndex + 1;
    const latestAnswers = answersRef.current;
    
    while (nextIndex < QUESTIONS.length) {
      const q = QUESTIONS[nextIndex];
      if (!q.condition || q.condition(latestAnswers)) {
        break;
      }
      nextIndex++;
    }

    if (nextIndex < QUESTIONS.length) {
      setHistory(prev => [...prev, nextIndex]);
      setFocusedOptionIndex(0);
    } else {
      setIsCompleted(true);
      try {
        if (typeof window !== "undefined" && localStorage.getItem("learncs_auth_state")) {
          const responses = Object.entries(latestAnswers).flatMap(([questionId, optIds]) =>
            (optIds || []).map(optionId => ({ questionId, optionId }))
          );
          if (responses.length > 0) {
            apiClient.post("/api/career/assessment/submit", { responses }).catch(() => {});
          }
        }
      } catch {
        // Silent background persistence when signed in
      }
    }
  }, [currentIndex]);

  const handleBack = React.useCallback(() => {
    if (isCompleted) {
      setDirection(-1);
      setIsCompleted(false);
      return;
    }
    
    if (history.length > 1) {
      setDirection(-1);
      setHistory(prev => prev.slice(0, -1));
      setFocusedOptionIndex(0);
    }
  }, [isCompleted, history.length]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'l' || e.key === 'L' || e.key === 'م') {
        e.preventDefault();
        handleToggleLang();
        return;
      }

      if (isCompleted) return;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          if (question) {
            setFocusedOptionIndex(prev => 
              prev < question.options.length - 1 ? prev + 1 : prev
            );
          }
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
          if (question) {
            const isMultiple = question.type === "multiple";
            const currentAnswers = answersRef.current[question.id] || [];
            // For multiple choice, if we already have answers, enter proceeds.
            // Unless we are trying to toggle the current focused option.
            // Actually in assessment enter just selects. Let's just select.
            const opt = question.options[focusedOptionIndex];
            if (opt) handleSelect(opt.id);
          }
          break;
        case "Backspace":
          e.preventDefault();
          handleBack();
          break;
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [lang, question, handleBack, handleNext, focusedOptionIndex, isCompleted]);

  // --- EXPERIMENTAL FOCUS-FOLLOWING AUTO-SCROLL ---
  useEffect(() => {
    if (!scrollContainerRef.current || !question) return;
    
    // We wait a tiny bit to ensure the DOM is updated if the question just changed
    const timer = setTimeout(() => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      
      const activeOption = question.options[focusedOptionIndex];
      if (!activeOption) return;
      
      const targetElement = document.getElementById(`discovery-opt-${activeOption.id}`);
      if (!targetElement) return;

      const targetRect = targetElement.getBoundingClientRect();
      const padding = 24;

      // Check if target is below the viewport
      if (targetRect.bottom > containerRect.bottom) {
        const scrollDistance = targetRect.bottom - containerRect.bottom + padding;
        container.scrollBy({ top: scrollDistance, behavior: 'smooth' });
      } 
      // Check if target is above the viewport
      else if (targetRect.top < containerRect.top) {
        const scrollDistance = targetRect.top - containerRect.top - padding;
        container.scrollBy({ top: scrollDistance, behavior: 'smooth' });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [focusedOptionIndex, question]);

  // Variants for Framer Motion
  const variants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? (lang === "ar" ? -40 : 40) : (lang === "ar" ? 40 : -40),
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? (lang === "ar" ? 40 : -40) : (lang === "ar" ? -40 : 40),
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    })
  };
  
  // Progress Percent
  const progressPercent = isCompleted ? 100 : ((currentIndex + 1) / QUESTIONS.length) * 100;

  return (
    <div 
      ref={scrollContainerRef}
      dir={lang === "ar" ? "rtl" : "ltr"} 
      className="min-h-screen bg-neutral-950 flex flex-col justify-between relative overflow-hidden overflow-y-auto"
    >
      {/* Background Atmosphere */}
      <ParticleBackground />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-neutral-950/80 to-neutral-950 pointer-events-none z-0" />

      {/* Header */}
      <header className="relative z-10 w-full p-4 md:p-6 flex items-center justify-between">
        <div className="flex items-center">
          {(history.length > 1 || isCompleted) && (
            <Button variant="ghost" onClick={handleBack} className="text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
              <ArrowLeft className={cn("w-5 h-5", lang === "en" ? "mr-2" : "ms-2", lang === "ar" && "rotate-180")} />
              {t.back}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!isCompleted && (
            <div className="text-sm font-medium text-neutral-500 tracking-widest uppercase hidden md:block">
              {currentIndex + 1} / {QUESTIONS.length}
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={handleToggleLang} className="text-neutral-400 hover:text-white">
            <Globe className="w-4 h-4 me-2" />
            {lang === "en" ? "العربية" : "English"}
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center py-12 px-4 min-h-[500px]">
        <Container className="max-w-3xl w-full flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            {!isCompleted ? (
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full flex flex-col items-center"
              >
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-10 tracking-tight drop-shadow-lg max-w-2xl leading-tight">
                  {question.title[lang]}
                </h1>

                <div className="w-full max-w-xl flex flex-col gap-3 group">
                  {question.options.map((opt, idx) => (
                    <div key={opt.id} className="relative w-full" onMouseEnter={() => setFocusedOptionIndex(idx)}>
                      {focusedOptionIndex === idx && (
                        <motion.div 
                          layoutId="focusIndicatorDisc"
                          className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-indigo-500 rounded-full hidden md:block shadow-[0_0_10px_rgba(99,102,241,0.6)]"
                        />
                      )}
                      <DiscoveryCard
                        id={`discovery-opt-${opt.id}`}
                        label={opt[lang]}
                        multiple={question.type === "multiple"}
                        selected={(answers[question.id] || []).includes(opt.id)}
                        onClick={() => handleSelect(opt.id)}
                        className={cn(focusedOptionIndex === idx && "border-indigo-500/50 bg-indigo-500/5")}
                      />
                    </div>
                  ))}
                </div>

                {/* Continue button for multi-select */}
                {question.type === "multiple" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8"
                  >
                    <Button 
                      id="discovery-continue-btn"
                      onClick={handleNext} 
                      disabled={(answers[question.id] || []).length === 0}
                      size="lg" 
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 h-12 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
                    >
                      {t.continue}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="completion"
                custom={1}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full flex flex-col items-center text-center max-w-2xl mx-auto"
              >
                <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 mb-8 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                  {t.discoveryComplete}
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-xl">
                  {t.completeTitle}
                </h1>
                
                <div className="space-y-6 text-lg md:text-xl text-neutral-300 mb-12">
                  <p>{t.completeDesc1}</p>
                  <p>
                    {t.completeDesc2} <span className="text-white font-medium">{t.completeDesc3}</span> {t.completeDesc4} <span className="text-white font-medium">{t.completeDesc5}</span>.
                  </p>
                  <p>
                    {t.completeDesc6} <span className="text-emerald-400 font-medium drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">{t.completeDesc7}</span>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md">
                  <Button asChild size="lg" className="h-14 px-8 text-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all hover:scale-105 border-none group w-full">
                    <Link href="/assessment">
                      {t.takeAssessment}
                      <ArrowRight className={cn("w-5 h-5 transition-transform", lang === "en" ? "ml-3 group-hover:translate-x-1" : "mr-3 group-hover:-translate-x-1", lang === "ar" && "rotate-180")} />
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg border-neutral-700 hover:bg-neutral-800 hover:text-white transition-all text-neutral-400 bg-transparent w-full">
                    <Link href="/dashboard">
                      {t.exploreLearnCS}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
        
        {/* Keyboard Controls Hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-6 text-xs text-neutral-500 font-medium tracking-wide">
          <div className="flex items-center gap-2">
            <span className="flex gap-1">
              <kbd className="px-2 py-1 rounded border border-white/10 bg-white/5 font-sans">&larr;</kbd>
              <kbd className="px-2 py-1 rounded border border-white/10 bg-white/5 font-sans">&rarr;</kbd>
            </span>
            <span>Navigate</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 rounded border border-white/10 bg-white/5 font-sans">Enter</kbd>
            <span>Select</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 rounded border border-white/10 bg-white/5 font-sans">L</kbd>
            <span>Language</span>
          </div>
        </div>
      </main>

      {/* Progress Line */}
      {!isCompleted && (
        <div className="h-1 w-full bg-neutral-900 absolute bottom-0 left-0 right-0 overflow-hidden">
          <motion.div
            className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ 
              transformOrigin: lang === "ar" ? "right" : "left", 
              float: lang === "ar" ? "right" : "left" 
            }}
          />
        </div>
      )}
    </div>
  );
}
