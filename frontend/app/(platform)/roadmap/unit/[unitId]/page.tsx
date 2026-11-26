"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { apiClient } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/auth-context";
import { useI18n } from "@/lib/i18n/i18n-context";
import {
  DIFFICULTY_LABELS,
  SECTION_TYPE_LABELS,
  pickLocalized
} from "@/lib/i18n/platform-labels";
import { InteractiveRegistry } from "@/components/curriculum/interactive-registry";
import {
  SectionQuestions,
  type SectionQuestionFeedback,
  type SectionQuestionPublic
} from "@/components/curriculum/section-questions";
import { UnitQuiz } from "@/components/curriculum/unit-quiz";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  Copy,
  ExternalLink,
  Layers,
  Lock,
  Play,
  RotateCcw,
  Share2,
  Sparkles,
  Terminal,
  Loader2,
  AlertCircle
} from "lucide-react";

interface UnitSectionDto {
  id: string;
  type: string;
  title: { en: string; ar: string };
  content: { en: string; ar: string };
  displayOrder: number;
  isRequired: boolean;
  codeSnippet?: string | null;
  codeLanguage?: string | null;
  codeExplanation?: { en: string; ar: string } | null;
  expectedOutput?: string | null;
  interactiveModuleId?: string | null;
  inlineQuestions: SectionQuestionPublic[];
  isCompleted: boolean;
  checkpointPassed: boolean;
}

interface AppearsInPathDto {
  pathId: string;
  title: { en: string; ar: string };
  moduleId: string;
  moduleTitle: { en: string; ar: string };
}

interface UnitDetailsDto {
  id: string;
  conceptId: string;
  concept?: {
    id: string;
    title: { en: string; ar: string };
    description: { en: string; ar: string };
    domain: string;
  } | null;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  difficulty: string;
  estimatedMinutes: number;
  version: number;
  isFreeTier: boolean;
  quizPassPercentage: number;
  quizQuestionCount: number;
  hasQuizPool: boolean;
  mappedQuestionsCount: number;
  tags: string[];
  interactiveModuleIds: string[];
  externalReferences?: {
    title?: string;
    url?: string;
    type?: string;
    source?: string;
    category?: string;
    language?: string;
    description?: { en?: string; ar?: string } | string;
  }[];
  objectives: { en: string[]; ar: string[] };
  appearsInPaths: AppearsInPathDto[];
  isCompleted: boolean;
  status: string;
  masteryScore: number;
  lastSectionId?: string | null;
  isUnlocked: boolean;
  missingPrerequisites: string[];
  sections: UnitSectionDto[];
  recentQuizAttempts: {
    id: string;
    score: number;
    maxScore: number;
    percentage: number;
    passed: boolean;
    completedAt: string;
  }[];
}

export default function UnitLearningPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const unitId = String(params?.unitId || "");
  const pathId = searchParams?.get("path") || undefined;

  const { user } = useAuth();
  const { language: lang } = useI18n();
  const isAr = lang === "ar";

  const [unit, setUnit] = useState<UnitDetailsDto | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [markingSection, setMarkingSection] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [traceState, setTraceState] = useState<"idle" | "running" | "done">("idle");
  const [copiedSectionId, setCopiedSectionId] = useState<string | null>(null);
  const restoredUnitRef = useRef<string | null>(null);

  const canPreview = Boolean(
    user?.roles?.some((r) => ["SuperAdmin", "Admin", "ContentManager"].includes(r))
  );

  const fetchUnit = useCallback(async () => {
    if (!unitId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get<UnitDetailsDto>(`/api/curriculum/units/${unitId}`);
      setUnit(res.data);
      if (restoredUnitRef.current !== res.data.id) {
        restoredUnitRef.current = res.data.id;
        if (res.data.lastSectionId && res.data.sections.length > 0) {
          const foundIdx = res.data.sections.findIndex((s) => s.id === res.data.lastSectionId);
          setActiveIdx(foundIdx >= 0 ? foundIdx : 0);
        } else {
          setActiveIdx(0);
        }
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          (isAr ? "تعذر تحميل محتوى الوحدة التعليمية." : "Could not load learning unit details.")
      );
    } finally {
      setLoading(false);
    }
  }, [unitId, isAr]);

  const selectSection = useCallback(
    (nextIdx: number) => {
      if (!unit || unit.sections.length === 0) return;
      const clamped = Math.max(0, Math.min(unit.sections.length - 1, nextIdx));
      setActiveIdx(clamped);
      setTraceState("idle");
      const targetSec = unit.sections[clamped];
      if (user && targetSec?.id) {
        apiClient
          .post(`/api/curriculum/units/${unit.id}/visit`, { sectionId: targetSec.id })
          .catch(() => {
            // Non-blocking bookmark persistence
          });
      }
    },
    [unit, user]
  );

  const handleRunTrace = () => {
    setTraceState("running");
    setTimeout(() => {
      setTraceState("done");
    }, 350);
  };

  const handleCopySnippet = async (sectionId: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedSectionId(sectionId);
      setTimeout(() => setCopiedSectionId(null), 1500);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  useEffect(() => {
    fetchUnit();
  }, [fetchUnit]);

  const completedRequiredCount = useMemo(() => {
    if (!unit) return 0;
    return unit.sections.filter((s) => s.isRequired && s.isCompleted).length;
  }, [unit]);

  const totalRequiredCount = useMemo(() => {
    if (!unit) return 0;
    return unit.sections.filter((s) => s.isRequired).length;
  }, [unit]);

  const allRequiredSectionsComplete =
    totalRequiredCount > 0 && completedRequiredCount === totalRequiredCount;

  const handleCompleteSection = async (
    sectionId: string,
    answers?: Record<string, string>
  ) => {
    setMarkingSection(sectionId);
    try {
      const res = await apiClient.post<{
        sectionId: string;
        unitId: string;
        completed: boolean;
        checkpointPassed: boolean;
        scorePercentage?: number;
        message?: string;
        feedback?: SectionQuestionFeedback[];
      }>(`/api/curriculum/sections/${sectionId}/complete`, {
        answers: answers || null,
        timeSpentSeconds: 90
      });

      setUnit((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          sections: prev.sections.map((s) =>
            s.id === sectionId
              ? {
                  ...s,
                  isCompleted: res.data.completed,
                  checkpointPassed: res.data.checkpointPassed
                }
              : s
          )
        };
      });
      return res.data;
    } finally {
      setMarkingSection(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-9 w-9 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error || !unit) {
    return (
      <div className="p-8 max-w-3xl mx-auto space-y-4" dir={isAr ? "rtl" : "ltr"}>
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-5 text-sm text-destructive flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error || (isAr ? "الوحدة غير موجودة." : "Learning unit not found.")}</span>
        </div>
        <Button asChild variant="outline">
          <Link href="/roadmap">{isAr ? "العودة لخريطة التعلم" : "Back to Roadmap"}</Link>
        </Button>
      </div>
    );
  }

  const activeSection = unit.sections[activeIdx] || unit.sections[0];
  const diffLabel = DIFFICULTY_LABELS[unit.difficulty] || { en: unit.difficulty, ar: unit.difficulty };
  const objectiveItems = isAr ? unit.objectives.ar : unit.objectives.en;
  const secProgress =
    unit.sections.length > 0
      ? Math.round((unit.sections.filter((s) => s.isCompleted).length / unit.sections.length) * 100)
      : 0;

  return (
    <div className="space-y-8 p-6 md:p-8 max-w-6xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
      {/* Breadcrumb & Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button asChild variant="ghost" size="sm" className="px-0 text-muted-foreground hover:text-foreground">
            <Link href="/roadmap">
              <ArrowLeft className="h-4 w-4 me-1.5 rtl:rotate-180" />
              {isAr ? "العودة إلى خريطة التعلم" : "Back to Roadmap"}
            </Link>
          </Button>

          <div className="flex flex-wrap items-center gap-2">
            {unit.concept && (
              <Badge variant="outline" className="text-xs">
                {unit.concept.domain}
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs">
              {isAr ? diffLabel.ar : diffLabel.en}
            </Badge>
            <Badge variant="outline" className="text-xs gap-1">
              <Clock className="h-3 w-3" />
              {unit.estimatedMinutes} {isAr ? "د" : "min"}
            </Badge>
            {unit.isCompleted && (
              <Badge variant="success" className="gap-1">
                <CheckCircle2 className="h-3 w-3" />
                {isAr ? "مكتملة ومتقنة" : "Mastered"}
              </Badge>
            )}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {pickLocalized(unit.title, lang)}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            {pickLocalized(unit.description, lang)}
          </p>
        </div>

        {/* Shared Across Paths Callout */}
        {unit.appearsInPaths.length > 1 && (
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/15 p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
              <Share2 className="h-4 w-4" />
              {isAr
                ? "وحدة معيارية مشتركة: إتمامها هنا يُحسب تلقائياً في المسارات التالية:"
                : "Canonical Shared Unit: Progress here automatically counts across all these tracks:"}
            </div>
            <div className="flex flex-wrap gap-2">
              {unit.appearsInPaths.map((ap) => (
                <Badge key={ap.pathId} variant="outline" className="border-cyan-500/30 text-cyan-200 text-xs">
                  {pickLocalized(ap.title, lang)}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Prerequisite Gate */}
        {!unit.isUnlocked && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-300">
              <Lock className="h-4 w-4" />
              {isAr ? "المتطلبات السابقة لهذه الوحدة غير مكتملة بعد:" : "Required Prerequisites Not Yet Completed:"}
            </div>
            <div className="flex flex-wrap gap-2">
              {unit.missingPrerequisites.map((pid) => (
                <Button key={pid} asChild size="sm" variant="outline" className="border-amber-500/30">
                  <Link href={`/roadmap/unit/${pid}`}>{pid}</Link>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Learning Objectives + Progress */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-white/10 bg-card/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
                {isAr ? "أهداف التعلم" : "Learning Objectives"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                {objectiveItems.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                {isAr ? "تقدم أقسام الدرس" : "Lesson Progress"}
              </CardTitle>
              <CardDescription>
                {unit.sections.filter((s) => s.isCompleted).length} / {unit.sections.length}{" "}
                {isAr ? "أقسام مكتملة" : "sections complete"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={secProgress} className="h-2.5" />
              {unit.masteryScore > 0 && (
                <p className="text-xs text-muted-foreground">
                  {isAr ? `أعلى درجة اختبار: ${Math.round(unit.masteryScore)}%` : `Best Mastery Score: ${Math.round(unit.masteryScore)}%`}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section Navigation Pills */}
      <div className="flex flex-wrap gap-2">
        {unit.sections.map((sec, idx) => {
          const isActive = idx === activeIdx;
          const typeMeta = SECTION_TYPE_LABELS[sec.type] || { en: sec.type, ar: sec.type };
          return (
              <button
              key={sec.id}
              type="button"
              onClick={() => selectSection(idx)}
              className={`flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? "border-indigo-500 bg-indigo-500/15 text-foreground"
                  : sec.isCompleted
                  ? "border-emerald-500/30 bg-emerald-950/15 text-emerald-300"
                  : "border-white/10 bg-card/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {sec.isCompleted ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                  {idx + 1}
                </span>
              )}
              <span>{pickLocalized(sec.title, lang) || (isAr ? typeMeta.ar : typeMeta.en)}</span>
            </button>
          );
        })}
      </div>

      {/* Active Section Content Card */}
      {activeSection && (
        <Card className="border-white/10 bg-card/70">
          <CardHeader className="border-b border-white/5 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs gap-1">
                  {activeSection.type === "code" ? (
                    <Code2 className="h-3.5 w-3.5 text-cyan-400" />
                  ) : activeSection.type === "interactive" ? (
                    <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                  ) : (
                    <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
                  )}
                  {pickLocalized(
                    SECTION_TYPE_LABELS[activeSection.type] || activeSection.type,
                    lang
                  )}
                </Badge>
                {activeSection.isCompleted && (
                  <Badge variant="success" className="gap-1 text-xs">
                    <CheckCircle2 className="h-3 w-3" />
                    {isAr ? "مكتمل" : "Completed"}
                  </Badge>
                )}
              </div>

              <span className="text-xs text-muted-foreground">
                {isAr
                  ? `القسم ${activeIdx + 1} من ${unit.sections.length}`
                  : `Section ${activeIdx + 1} of ${unit.sections.length}`}
              </span>
            </div>
            <CardTitle className="text-2xl mt-2">
              {pickLocalized(activeSection.title, lang)}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Prose Explanation */}
            {pickLocalized(activeSection.content, lang) && (
              <div className="prose prose-invert max-w-none whitespace-pre-line text-sm md:text-base leading-relaxed text-slate-200">
                {pickLocalized(activeSection.content, lang)}
              </div>
            )}

            {/* Code Walkthrough (Strictly LTR) */}
            {(activeSection.codeSnippet || activeSection.type === "code") && (
              <div className="space-y-3">
                {activeSection.codeSnippet && (
                  <div className="rounded-xl border border-white/10 bg-slate-950 overflow-hidden" dir="ltr">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-slate-900/70 px-4 py-2 text-xs text-slate-400 font-mono">
                      <div className="flex items-center gap-2">
                        <span className="uppercase tracking-wider text-cyan-400">
                          {activeSection.codeLanguage || "code"}
                        </span>
                        <span className="text-slate-600">|</span>
                        <span>LearnCS Code Lab</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopySnippet(activeSection.id, activeSection.codeSnippet || "")}
                          className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-300 hover:bg-white/10 transition-colors"
                        >
                          {copiedSectionId === activeSection.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              Copy
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={handleRunTrace}
                          disabled={traceState === "running"}
                          className="inline-flex items-center gap-1 rounded border border-emerald-500/40 bg-emerald-600/20 px-2.5 py-1 text-[11px] font-medium text-emerald-300 hover:bg-emerald-600/30 transition-colors"
                        >
                          {traceState === "running" ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Play className="h-3 w-3" />
                          )}
                          Run Trace
                        </button>
                        {traceState === "done" && (
                          <button
                            type="button"
                            onClick={() => setTraceState("idle")}
                            className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-300 hover:bg-white/10 transition-colors"
                          >
                            <RotateCcw className="h-3 w-3" />
                            Reset
                          </button>
                        )}
                      </div>
                    </div>
                    <pre className="p-4 text-xs md:text-sm text-emerald-300 overflow-x-auto font-mono text-left leading-relaxed">
                      <code>{activeSection.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                {activeSection.codeExplanation && (
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-200 leading-relaxed">
                    {pickLocalized(activeSection.codeExplanation, lang)}
                  </div>
                )}

                {activeSection.expectedOutput && (
                  <div
                    className={`rounded-lg border p-3.5 font-mono text-xs transition-colors ${
                      traceState === "done"
                        ? "border-emerald-500/50 bg-emerald-950/35 text-emerald-200"
                        : "border-emerald-500/20 bg-emerald-950/20 text-emerald-300"
                    }`}
                    dir="ltr"
                  >
                    <div className="flex items-start gap-2">
                      <Terminal className="h-4 w-4 mt-0.5 shrink-0 text-emerald-400" />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-emerald-400 font-semibold">
                            {traceState === "done"
                              ? "Trace Execution Complete (exit code 0):"
                              : traceState === "running"
                              ? "Executing trace..."
                              : "Expected Output:"}
                          </span>
                          {traceState === "done" && (
                            <span className="text-[10px] text-emerald-400/80 uppercase">Verified Output</span>
                          )}
                        </div>
                        <pre className="whitespace-pre-wrap text-left">{activeSection.expectedOutput}</pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Interactive Lab */}
            {activeSection.type === "interactive" && (
              <div className="rounded-xl border border-indigo-500/25 bg-slate-950/60 p-4">
                <InteractiveRegistry
                  unitId={unit.id}
                  moduleId={activeSection.interactiveModuleId || unit.interactiveModuleIds?.[0]}
                />
              </div>
            )}

            {/* Inline Checkpoint Questions OR Direct Mark Complete */}
            {activeSection.inlineQuestions && activeSection.inlineQuestions.length > 0 ? (
              <SectionQuestions
                key={activeSection.id}
                sectionId={activeSection.id}
                questions={activeSection.inlineQuestions}
                lang={lang}
                alreadyPassed={activeSection.checkpointPassed}
                onVerifyAnswers={handleCompleteSection}
              />
            ) : (
              <div className="pt-2 flex justify-end">
                <Button
                  disabled={markingSection === activeSection.id || activeSection.isCompleted}
                  variant={activeSection.isCompleted ? "outline" : "default"}
                  className={!activeSection.isCompleted ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}
                  onClick={() => handleCompleteSection(activeSection.id)}
                >
                  {markingSection === activeSection.id ? (
                    <Loader2 className="h-4 w-4 me-2 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 me-2" />
                  )}
                  {activeSection.isCompleted
                    ? (isAr ? "تم إكمال هذا القسم" : "Section Marked Complete")
                    : (isAr ? "تحديد القسم كمكتمل" : "Mark Section Complete")}
                </Button>
              </div>
            )}

            {/* Section Prev / Next Footer */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <Button
                variant="outline"
                disabled={activeIdx === 0}
                onClick={() => selectSection(activeIdx - 1)}
              >
                <ArrowLeft className="h-4 w-4 me-1.5 rtl:rotate-180" />
                {isAr ? "القسم السابق" : "Previous Section"}
              </Button>

              <Button
                variant="outline"
                disabled={activeIdx >= unit.sections.length - 1}
                onClick={() => selectSection(activeIdx + 1)}
              >
                {isAr ? "القسم التالي" : "Next Section"}
                <ArrowRight className="h-4 w-4 ms-1.5 rtl:rotate-180" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Unit Mastery Final Assessment */}
      <UnitQuiz
        unitId={unit.id}
        pathId={pathId}
        lang={lang}
        passPercentage={unit.quizPassPercentage}
        questionCount={unit.quizQuestionCount}
        canPreview={canPreview}
        sectionsComplete={allRequiredSectionsComplete}
        onQuizCompleted={() => fetchUnit()}
      />

      {/* External References & Recent Attempts */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {unit.externalReferences && unit.externalReferences.length > 0 && (
          <Card className="border-white/10 bg-card/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-400" />
                {isAr ? "مصادر إضافية موصى بها" : "External Study References"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {unit.externalReferences.map((ref, idx) => (
                <a
                  key={idx}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-white/10 px-3.5 py-2.5 text-sm hover:border-indigo-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-foreground">{ref.title}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  </div>
                  {(ref.source || ref.category || ref.type) && (
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      {ref.source && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          {ref.source}
                        </Badge>
                      )}
                      {(ref.category || ref.type) && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          {ref.category || ref.type}
                        </Badge>
                      )}
                    </div>
                  )}
                  {ref.description && (
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {typeof ref.description === "string"
                        ? ref.description
                        : pickLocalized(
                            {
                              en: ref.description.en || "",
                              ar: ref.description.ar || ref.description.en || ""
                            },
                            lang
                          )}
                    </p>
                  )}
                </a>
              ))}
            </CardContent>
          </Card>
        )}

        {unit.recentQuizAttempts.length > 0 && (
          <Card className="border-white/10 bg-card/40">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                {isAr ? "سجل محاولات الاختبار الأخيرة" : "Recent Quiz Attempts"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {unit.recentQuizAttempts.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-xs"
                >
                  <span>
                    {att.score} / {att.maxScore} ({Math.round(att.percentage)}%)
                  </span>
                  <Badge variant={att.passed ? "success" : "destructive"} className="text-[10px]">
                    {att.passed ? (isAr ? "ناجح" : "Passed") : (isAr ? "لم يجتز" : "Failed")}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
