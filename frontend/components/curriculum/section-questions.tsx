"use client";

import React, { useEffect, useState } from "react";
import { pickLocalized } from "@/lib/i18n/platform-labels";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, HelpCircle, Loader2, RotateCcw } from "lucide-react";

export interface SectionQuestionPublic {
  id: string;
  question: { en: string; ar: string };
  options: { id: string; text: { en: string; ar: string } }[];
}

export interface SectionQuestionFeedback {
  questionId: string;
  selectedOptionId?: string | null;
  correctOptionId?: string | null;
  isCorrect: boolean;
  explanation?: { en?: string; ar?: string } | null;
}

interface SectionQuestionsProps {
  sectionId: string;
  questions: SectionQuestionPublic[];
  lang: "en" | "ar";
  alreadyPassed?: boolean;
  onVerifyAnswers: (
    sectionId: string,
    answers: Record<string, string>
  ) => Promise<{
    completed: boolean;
    checkpointPassed: boolean;
    scorePercentage?: number;
    feedback?: SectionQuestionFeedback[];
    message?: string;
  }>;
}

export function SectionQuestions({
  sectionId,
  questions,
  lang,
  alreadyPassed = false,
  onVerifyAnswers
}: SectionQuestionsProps) {
  const isAr = lang === "ar";
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, SectionQuestionFeedback>>({});
  const [passed, setPassed] = useState(alreadyPassed);
  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSelected({});
    setFeedbackMap({});
    setServerMsg(null);
    setError(null);
    setPassed(alreadyPassed);
  }, [sectionId, alreadyPassed]);

  if (!questions || questions.length === 0) return null;

  const allSelected = questions.every((q) => Boolean(selected[q.id]));

  const handleSubmit = async () => {
    if (!allSelected || submitting) return;
    setSubmitting(true);
    setError(null);
    setServerMsg(null);
    try {
      const res = await onVerifyAnswers(sectionId, selected);
      const map: Record<string, SectionQuestionFeedback> = {};
      for (const f of res.feedback || []) {
        map[f.questionId] = f;
      }
      setFeedbackMap(map);
      setPassed(Boolean(res.checkpointPassed));
      if (res.message) setServerMsg(res.message);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          (isAr ? "حدث خطأ أثناء التحقق من الإجابات." : "Could not verify checkpoint answers.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelected({});
    setFeedbackMap({});
    setServerMsg(null);
    setError(null);
  };

  return (
    <div className="mt-6 rounded-xl border border-indigo-500/20 bg-indigo-950/10 p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-semibold text-sm text-indigo-300">
          <HelpCircle className="h-4 w-4" />
          {isAr ? "سؤال تحقق سريع على هذا القسم" : "Section Understanding Checkpoint"}
        </div>
        {passed && (
          <Badge variant="success" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            {isAr ? "تم اجتياز التحقق" : "Checkpoint Passed"}
          </Badge>
        )}
      </div>

      <div className="space-y-5">
        {questions.map((q, qIdx) => {
          const fb = feedbackMap[q.id];
          return (
            <div key={q.id} className="space-y-3">
              <p className="text-sm font-medium">
                {qIdx + 1}. {pickLocalized(q.question, lang)}
              </p>

              <div className="grid grid-cols-1 gap-2">
                {q.options.map((opt) => {
                  const isChosen = selected[q.id] === opt.id;
                  const isRightOption = fb?.correctOptionId === opt.id;
                  const isWrongChosen = fb && isChosen && !fb.isCorrect;

                  let styleClass = "border-white/10 bg-background/50 hover:border-indigo-500/40";
                  if (fb) {
                    if (isRightOption) {
                      styleClass = "border-emerald-500/60 bg-emerald-950/30 text-emerald-100";
                    } else if (isWrongChosen) {
                      styleClass = "border-destructive/60 bg-destructive/15 text-red-200";
                    }
                  } else if (isChosen) {
                    styleClass = "border-indigo-500 bg-indigo-500/15 text-foreground";
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={submitting}
                      onClick={() => {
                        setSelected((prev) => ({ ...prev, [q.id]: opt.id }));
                        if (fb && !fb.isCorrect) {
                          setFeedbackMap({});
                          setServerMsg(null);
                        }
                      }}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm text-start transition-colors flex items-center justify-between gap-3 ${styleClass}`}
                    >
                      <span>{pickLocalized(opt.text, lang)}</span>
                      {fb && isRightOption && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
                      {fb && isWrongChosen && <XCircle className="h-4 w-4 text-red-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {fb?.explanation && (
                <div
                  className={`rounded-lg border p-3 text-xs ${
                    fb.isCorrect
                      ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-200"
                      : "border-amber-500/30 bg-amber-950/20 text-amber-200"
                  }`}
                >
                  <span className="font-semibold me-1">
                    {fb.isCorrect ? (isAr ? "إجابة صحيحة:" : "Correct:") : (isAr ? "توضيح:" : "Explanation:")}
                  </span>
                  {pickLocalized(fb.explanation, lang)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}
      {serverMsg && !passed && (
        <p className="text-xs text-amber-300">{serverMsg}</p>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button
          size="sm"
          disabled={!allSelected || submitting}
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {submitting && <Loader2 className="h-3.5 w-3.5 me-2 animate-spin" />}
          {isAr ? "تحقق من الإجابة وأكمل القسم" : "Check Answer & Save Progress"}
        </Button>

        {Object.keys(feedbackMap).length > 0 && !passed && (
          <Button size="sm" variant="outline" onClick={handleReset}>
            <RotateCcw className="h-3.5 w-3.5 me-1.5" />
            {isAr ? "إعادة المحاولة" : "Try Again"}
          </Button>
        )}
      </div>
    </div>
  );
}
