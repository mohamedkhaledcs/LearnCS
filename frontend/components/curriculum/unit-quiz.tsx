"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api/client";
import { pickLocalized } from "@/lib/i18n/platform-labels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Award,
  CheckCircle2,
  XCircle,
  Loader2,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Flame,
  AlertTriangle
} from "lucide-react";

interface PublicQuizOption {
  key: string;
  text: { en: string; ar: string };
}

interface PublicQuizQuestion {
  id: string;
  domain: string;
  topic: string;
  subtopic: string;
  difficulty: string;
  questionType: string;
  codeSnippet?: string | null;
  codeLanguage?: string | null;
  question: { en: string; ar: string };
  options: PublicQuizOption[];
}

interface StartQuizResponse {
  attemptId: string;
  unitId: string;
  passThreshold: number;
  isPreview: boolean;
  questions: PublicQuizQuestion[];
}

interface QuizFeedbackItem {
  questionId: string;
  selectedOptionKey?: string | null;
  correctOptionKey: string;
  isCorrect: boolean;
  explanation?: { en?: string; ar?: string } | null;
}

interface SubmitQuizResponse {
  attemptId: string;
  unitId: string;
  score: number;
  maxScore: number;
  percentage: number;
  passThreshold: number;
  passed: boolean;
  newlyCompleted: boolean;
  xpAwarded: number;
  streakDays: number;
  unlockedAchievementsCount: number;
  feedback: QuizFeedbackItem[];
}

interface UnitQuizProps {
  unitId: string;
  pathId?: string;
  lang: "en" | "ar";
  passPercentage: number;
  questionCount: number;
  canPreview?: boolean;
  sectionsComplete?: boolean;
  onQuizCompleted?: (result: SubmitQuizResponse) => void;
}

export function UnitQuiz({
  unitId,
  pathId,
  lang,
  passPercentage,
  questionCount,
  canPreview = false,
  sectionsComplete = false,
  onQuizCompleted
}: UnitQuizProps) {
  const isAr = lang === "ar";
  const [attempt, setAttempt] = useState<StartQuizResponse | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SubmitQuizResponse | null>(null);
  const [startedAt, setStartedAt] = useState<number>(Date.now());
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setAttempt(null);
    setAnswers({});
    setResult(null);
    setError(null);
  }, [unitId]);

  const startQuiz = async (previewMode = false) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setAnswers({});
    try {
      const res = await apiClient.post<StartQuizResponse>(
        `/api/curriculum/units/${unitId}/quiz/start`,
        { pathId: pathId || null, previewMode }
      );
      setAttempt(res.data);
      setStartedAt(Date.now());
    } catch (err: any) {
      const code = err?.response?.data?.code;
      if (code === "SECTIONS_INCOMPLETE") {
        setError(
          isAr
            ? "يرجى إكمال جميع أقسام الدرس المطلوبة واجتياز أسئلة التحقق أولاً قبل بدء الاختبار النهائي."
            : "Please finish all required lesson sections and inline checkpoints before starting the final assessment."
        );
      } else {
        setError(
          err?.response?.data?.message ||
            (isAr ? "تعذر بدء اختبار الوحدة." : "Could not start the unit mastery quiz.")
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const submitQuiz = async () => {
    if (!attempt || submitting) return;
    setSubmitting(true);
    setError(null);
    const elapsedSeconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
    try {
      const payload = {
        attemptId: attempt.attemptId,
        answers: attempt.questions.map((q) => ({
          questionId: q.id,
          selectedOptionKey: answers[q.id] || ""
        })),
        timeSpentSeconds: elapsedSeconds
      };
      const res = await apiClient.post<SubmitQuizResponse>(
        `/api/curriculum/units/${unitId}/quiz/submit`,
        payload
      );
      setResult(res.data);
      onQuizCompleted?.(res.data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          (isAr ? "حدث خطأ أثناء تصحيح الاختبار." : "Could not grade quiz submission.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  const feedbackByQ = new Map((result?.feedback || []).map((f) => [f.questionId, f]));
  const allAnswered =
    Boolean(attempt) && attempt!.questions.every((q) => Boolean(answers[q.id]));

  return (
    <Card className="border-indigo-500/30 bg-card/70">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="bg-indigo-500/15 text-indigo-300">
                <Award className="h-3.5 w-3.5 me-1" />
                {isAr ? "التقييم النهائي للوحدة" : "Unit Mastery Assessment"}
              </Badge>
              <Badge variant="outline">
                {questionCount} {isAr ? "أسئلة عشوائية" : "Randomized Questions"} • {passPercentage}% {isAr ? "للنجاح" : "Pass"}
              </Badge>
            </div>
            <CardTitle className="text-xl mt-2">
              {isAr ? "اختبار إتقان الوحدة" : "Verify Your Mastery"}
            </CardTitle>
            <CardDescription>
              {isAr
                ? "تُسحب الأسئلة عشوائياً من بنك الأسئلة المرتبط بهذه الوحدة ويتم التصحيح على الخادم."
                : "Questions are drawn dynamically from the reusable Question Bank and graded securely on the backend."}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {error && (
          <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/40 bg-amber-950/20 p-3.5 text-sm text-amber-200">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Initial Launch Screen */}
        {!attempt && (
          <div className="flex flex-wrap items-center gap-3">
            <Button
              disabled={loading || (!sectionsComplete && !canPreview)}
              onClick={() => startQuiz(false)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 me-2 animate-spin" />
              ) : (
                <Play className="h-4 w-4 me-2" />
              )}
              {isAr ? "ابدأ الاختبار النهائي" : "Start Final Unit Quiz"}
            </Button>

            {canPreview && (
              <Button
                variant="outline"
                disabled={loading}
                onClick={() => startQuiz(true)}
                className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/30"
              >
                <ShieldCheck className="h-4 w-4 me-2" />
                {isAr ? "معاينة الاختبار (وضع المشرف)" : "Preview Quiz (Admin)"}
              </Button>
            )}

            {!sectionsComplete && !canPreview && (
              <p className="text-xs text-muted-foreground">
                {isAr
                  ? "أكمل كل أقسام الدرس المطلوبة أعلاه لفتح التقييم النهائي."
                  : "Complete every required lesson section above to unlock this quiz."}
              </p>
            )}
          </div>
        )}

        {/* Active Quiz / Results View */}
        {attempt && (
          <div className="space-y-6">
            {result && (
              <div
                className={`rounded-xl border p-5 space-y-3 ${
                  result.passed
                    ? "border-emerald-500/40 bg-emerald-950/20"
                    : "border-destructive/40 bg-destructive/10"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {result.passed ? (
                      <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-400" />
                    )}
                    <div>
                      <h3 className="text-lg font-bold">
                        {result.passed
                          ? (isAr ? "مبارك! اجتزت الوحدة بنجاح" : "Unit Mastered!")
                          : (isAr ? "لم تصل لنسبة النجاح بعد" : "Keep Practicing: Try Again")}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {isAr
                          ? `النتيجة: ${result.score} / ${result.maxScore} (${Math.round(result.percentage)}%) (المطلوب ${result.passThreshold}%)`
                          : `Score: ${result.score} / ${result.maxScore} (${Math.round(result.percentage)}%) | Pass threshold ${result.passThreshold}%`}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {result.xpAwarded > 0 && (
                      <Badge variant="success" className="gap-1">
                        <Sparkles className="h-3.5 w-3.5" />
                        +{result.xpAwarded} XP
                      </Badge>
                    )}
                    {result.streakDays > 0 && (
                      <Badge variant="secondary" className="gap-1 bg-orange-500/15 text-orange-300">
                        <Flame className="h-3.5 w-3.5" />
                        {result.streakDays} {isAr ? "يوم متواصل" : "day streak"}
                      </Badge>
                    )}
                    {result.unlockedAchievementsCount > 0 && (
                      <Button asChild size="sm" variant="outline" className="border-amber-500/40 text-amber-300">
                        <Link href="/achievements">
                          {isAr
                            ? `${result.unlockedAchievementsCount} إنجاز مفتوح`
                            : `${result.unlockedAchievementsCount} Achievements Unlocked`}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {attempt.questions.map((q, idx) => {
              const fb = feedbackByQ.get(q.id);
              return (
                <div key={q.id} className="rounded-xl border border-white/10 bg-background/40 p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-indigo-400">
                      {isAr ? `السؤال ${idx + 1} من ${attempt.questions.length}` : `Question ${idx + 1} of ${attempt.questions.length}`}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Badge variant="outline" className="text-[10px]">
                        {q.topic}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        {q.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-base font-medium leading-relaxed">
                    {pickLocalized(q.question, lang)}
                  </p>

                  {q.codeSnippet && (
                    <pre
                      dir="ltr"
                      className="rounded-lg bg-slate-950 border border-white/10 p-3.5 text-xs text-slate-200 overflow-x-auto font-mono text-left"
                    >
                      <code>{q.codeSnippet}</code>
                    </pre>
                  )}

                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {q.options.map((opt) => {
                      const chosen = answers[q.id] === opt.key;
                      const isCorrectOpt = fb && fb.correctOptionKey === opt.key;
                      const isWrongChosen = fb && chosen && !fb.isCorrect;

                      let cls = "border-white/10 bg-background/60 hover:border-indigo-500/40";
                      if (fb) {
                        if (isCorrectOpt) cls = "border-emerald-500/60 bg-emerald-950/30 text-emerald-100";
                        else if (isWrongChosen) cls = "border-destructive/60 bg-destructive/15 text-red-200";
                      } else if (chosen) {
                        cls = "border-indigo-500 bg-indigo-500/15 text-foreground";
                      }

                      return (
                        <button
                          key={opt.key}
                          type="button"
                          disabled={Boolean(result)}
                          onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.key }))}
                          className={`w-full rounded-lg border px-4 py-2.5 text-sm text-start transition-colors flex items-center justify-between gap-3 ${cls}`}
                        >
                          <span>{pickLocalized(opt.text, lang)}</span>
                          {fb && isCorrectOpt && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
                          {fb && isWrongChosen && <XCircle className="h-4 w-4 text-red-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {fb?.explanation && (
                    <div className="rounded-lg border border-white/10 bg-slate-900/60 p-3 text-xs text-slate-300">
                      <span className="font-semibold text-indigo-300 me-1">
                        {isAr ? "الشرح:" : "Explanation:"}
                      </span>
                      {pickLocalized(fb.explanation, lang)}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              {!result ? (
                <Button
                  disabled={!allAnswered || submitting}
                  onClick={submitQuiz}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {submitting && <Loader2 className="h-4 w-4 me-2 animate-spin" />}
                  {isAr ? "تسليم الاختبار النهائي" : "Submit Final Quiz"}
                </Button>
              ) : (
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" onClick={() => startQuiz(attempt.isPreview)}>
                    <RotateCcw className="h-4 w-4 me-2" />
                    {isAr ? "محاولة جديدة بأسئلة مختلفة" : "New Randomized Attempt"}
                  </Button>
                  <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Link href="/roadmap">{isAr ? "العودة لخريطة التعلم" : "Back to Roadmap"}</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
