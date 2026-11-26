"use client";

import React, { useState, useEffect } from "react";
import { PublicQuestion, AssessmentResult, SubmittedAnswer } from "@/lib/assessment/schema";
import { getDiagnosticAssessment, submitAssessmentResult } from "@/app/actions/assessment";
import { AssessmentIntro } from "./components/assessment-intro";
import { AssessmentTest } from "./components/assessment-test";
import { AssessmentResultDisplay } from "./components/assessment-result";
import { ParticleBackground } from "@/components/ui/particle-background";
import { Button } from "@/components/ui/button";
import { Globe, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/utils";
import { useI18n } from "@/lib/i18n/i18n-context";
import { useAuth } from "@/lib/auth/auth-context";
import { apiClient } from "@/lib/api/client";

type AssessmentState = "intro" | "loading" | "test" | "result";

export default function AssessmentPage() {
  const { language: lang, setLanguage } = useI18n();
  const { isAuthenticated: isLoggedIn } = useAuth();
  const [currentState, setCurrentState] = useState<AssessmentState>("intro");

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<PublicQuestion[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleToggleLang = () => {
    setLanguage(lang === "en" ? "ar" : "en");
  };

  const handleStart = async (questionCount: number) => {
    setCurrentState("loading");
    setError(null);
    try {
      const data = await getDiagnosticAssessment(questionCount);
      setSessionId(data.sessionId);
      setQuestions(data.questions);
      setCurrentState("test");
    } catch (err) {
      console.error(err);
      setError(lang === "en" ? "Failed to load assessment. Please try again." : "فشل تحميل التقييم. حاول مرة أخرى.");
      setCurrentState("intro");
    }
  };

  const handleSubmit = async (answers: SubmittedAnswer[]) => {
    if (!sessionId) return;
    
    try {
      const finalResult = await submitAssessmentResult(sessionId, answers);
      if (isLoggedIn) {
        apiClient.post("/api/progress/diagnostic", {
          sessionId: finalResult.sessionId,
          overallScore: finalResult.overallScore,
          maxScore: finalResult.maxScore,
          percentage: finalResult.percentage,
          recommendedLevel: finalResult.recommendedLevel ?? "beginner",
          resultJson: JSON.stringify(finalResult),
        }).catch(() => {});
      }
      setResult(finalResult);
      setCurrentState("result");
    } catch (err) {
      console.error(err);
      alert(lang === "en" ? "Failed to submit assessment." : "فشل إرسال التقييم.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col relative">
      {/* Background Atmosphere */}
      <ParticleBackground />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-neutral-950/80 to-neutral-950 pointer-events-none z-0" />

      {/* Global Assessment Header */}
      <header className="relative z-20 w-full p-4 flex items-center justify-between border-b border-white/5 bg-neutral-950/50 backdrop-blur-md">
        {/* Only show 'Back to Home' if in intro */}
        {currentState === "intro" ? (
          <Button asChild variant="ghost" className="text-neutral-400 hover:text-white">
            <Link href={isLoggedIn ? "/dashboard" : "/"}>
              <ArrowLeft className={cn("w-4 h-4", lang === "en" ? "mr-2" : "ms-2", lang === "ar" && "rotate-180")} />
              {lang === "ar" 
                ? (isLoggedIn ? "العودة للوحة التحكم" : "العودة للرئيسية") 
                : (isLoggedIn ? "Return to Dashboard" : "Back to Home") 
              }
            </Link>
          </Button>
        ) : (
          <div className="text-emerald-400 font-bold tracking-tight px-4 flex items-center">
            LearnCS Assessment
          </div>
        )}

        <Button variant="ghost" size="sm" onClick={handleToggleLang} className="text-neutral-400 hover:text-white z-50 relative">
          <Globe className="w-4 h-4 me-2" />
          {lang === "en" ? "العربية" : "English"}
        </Button>
      </header>

      {/* Main Orchestrator Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative w-full z-10">
        
        {currentState === "intro" && (
          <>
            {error && <div className="text-red-400 absolute top-10">{error}</div>}
            <AssessmentIntro onStart={handleStart} lang={lang} />
          </>
        )}

        {currentState === "loading" && (
          <div className="flex flex-col items-center justify-center text-indigo-400 gap-4">
            <Loader2 className="w-12 h-12 animate-spin" />
            <p className="text-lg animate-pulse">{lang === "en" ? "Generating Assessment..." : "جاري إنشاء التقييم..."}</p>
          </div>
        )}

        {currentState === "test" && questions.length > 0 && (
          <AssessmentTest 
            questions={questions} 
            lang={lang} 
            onSubmit={handleSubmit} 
          />
        )}

        {currentState === "result" && result && (
          <AssessmentResultDisplay 
            result={result} 
            lang={lang} 
          />
        )}

      </div>
    </div>
  );
}
