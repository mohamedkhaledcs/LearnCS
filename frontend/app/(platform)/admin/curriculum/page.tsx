"use client";

import React, { useCallback, useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client";
import { useI18n } from "@/lib/i18n/i18n-context";
import { pickLocalized } from "@/lib/i18n/platform-labels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  BookOpen,
  HelpCircle,
  BarChart3,
  Edit3,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

interface AdminSectionDto {
  id: string;
  unitId: string;
  type: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  displayOrder: number;
  isRequired: boolean;
}

interface AdminUnitDto {
  id: string;
  conceptId: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  difficulty: string;
  estimatedMinutes: number;
  isFreeTier: boolean;
  quizPassPercentage: number;
  quizQuestionCount: number;
  sections: AdminSectionDto[];
}

interface AdminCurriculumPayload {
  paths: { id: string; titleEn: string; titleAr: string; category: string; unitIds?: string[] }[];
  concepts: { id: string; titleEn: string; titleAr: string; domain: string }[];
  units: AdminUnitDto[];
}

interface AdminQuestionDto {
  id: string;
  domain: string;
  topic: string;
  subtopic: string;
  difficulty: string;
  questionEn: string;
  questionAr: string;
}

interface DomainCoverageItem {
  domain: string;
  total: number;
  easy: number;
  medium: number;
  hard: number;
  subtopicsCount: number;
}

interface UnitNeedQuestionItem {
  id: string;
  titleEn: string;
  sectionsCount: number;
  mappedQuestionsCount: number;
}

interface CoverageReportDto {
  totalQuestions?: number;
  totalDomains?: number;
  totalUnits?: number;
  unitsWithQuestions?: number;
  domains?: DomainCoverageItem[];
  unitsNeedingQuestions?: UnitNeedQuestionItem[];
}

export default function AdminCurriculumPage() {
  const { language: lang } = useI18n();
  const isAr = lang === "ar";

  const [tab, setTab] = useState<"units" | "questions" | "coverage">("units");
  const [curriculum, setCurriculum] = useState<AdminCurriculumPayload | null>(null);
  const [questions, setQuestions] = useState<AdminQuestionDto[]>([]);
  const [coverage, setCoverage] = useState<CoverageReportDto | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Unit editor modal
  const [editUnit, setEditUnit] = useState<AdminUnitDto | null>(null);
  const [uTitleEn, setUTitleEn] = useState("");
  const [uTitleAr, setUTitleAr] = useState("");
  const [uDifficulty, setUDifficulty] = useState("beginner");
  const [uMinutes, setUMinutes] = useState("30");
  const [uFreeTier, setUFreeTier] = useState(true);
  const [uPassPct, setUPassPct] = useState("60");
  const [saving, setSaving] = useState(false);

  // Create Question modal
  const [newQOpen, setNewQOpen] = useState(false);
  const [qDomain, setQDomain] = useState("Algorithms");
  const [qTopic, setQTopic] = useState("Searching");
  const [qSubtopic, setQSubtopic] = useState("Binary Search");
  const [qDifficulty, setQDifficulty] = useState("medium");
  const [qEn, setQEn] = useState("");
  const [qAr, setQAr] = useState("");
  const [qOptA, setQOptA] = useState("");
  const [qOptB, setQOptB] = useState("");
  const [qExpEn, setQExpEn] = useState("");
  const [qUnitId, setQUnitId] = useState("unit-binary-search-foundations");

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [cRes, qRes, covRes] = await Promise.all([
        apiClient.get<AdminCurriculumPayload>("/api/admin/curriculum"),
        apiClient.get<AdminQuestionDto[] | { items?: AdminQuestionDto[] }>("/api/admin/questions"),
        apiClient.get<CoverageReportDto>("/api/admin/coverage")
      ]);
      setCurriculum(cRes.data);
      const qRaw = qRes.data;
      setQuestions(Array.isArray(qRaw) ? qRaw : qRaw?.items || []);
      setCoverage(covRes.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not load curriculum admin portal.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const openUnitEditor = (u: AdminUnitDto) => {
    setEditUnit(u);
    setUTitleEn(u.titleEn);
    setUTitleAr(u.titleAr);
    setUDifficulty(u.difficulty);
    setUMinutes(String(u.estimatedMinutes));
    setUFreeTier(u.isFreeTier);
    setUPassPct(String(u.quizPassPercentage));
  };

  const handleSaveUnit = async () => {
    if (!editUnit) return;
    setSaving(true);
    setError(null);
    setFeedback(null);
    try {
      await apiClient.put(`/api/admin/curriculum/units/${editUnit.id}`, {
        titleEn: uTitleEn,
        titleAr: uTitleAr,
        descriptionEn: editUnit.descriptionEn,
        descriptionAr: editUnit.descriptionAr,
        difficulty: uDifficulty,
        estimatedMinutes: Number(uMinutes) || 30,
        isFreeTier: uFreeTier,
        quizPassPercentage: Number(uPassPct) || 60,
        quizQuestionCount: editUnit.quizQuestionCount
      });
      setEditUnit(null);
      setFeedback("Unit metadata updated in database.");
      await loadAll();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update unit.");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setFeedback(null);
    try {
      await apiClient.post("/api/admin/questions", {
        domain: qDomain,
        topic: qTopic,
        subtopic: qSubtopic,
        difficulty: qDifficulty,
        questionType: "concept",
        questionEn: qEn,
        questionAr: qAr || qEn,
        explanationEn: qExpEn,
        explanationAr: qExpEn,
        unitIds: qUnitId ? [qUnitId] : [],
        options: [
          { key: "a", textEn: qOptA, textAr: qOptA, isCorrect: true },
          { key: "b", textEn: qOptB, textAr: qOptB, isCorrect: false }
        ]
      });
      setNewQOpen(false);
      setQEn("");
      setQAr("");
      setQOptA("");
      setQOptB("");
      setQExpEn("");
      setFeedback("New assessment question added and mapped to unit.");
      await loadAll();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not create question.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    setError(null);
    setFeedback(null);
    try {
      await apiClient.delete(`/api/admin/questions/${id}`);
      setFeedback(`Deleted question ${id}.`);
      await loadAll();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not delete question.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-9 w-9 animate-spin text-indigo-500" />
      </div>
    );
  }

  const unitsList = (curriculum?.units || []).filter((u) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return u.id.toLowerCase().includes(q) || u.titleEn.toLowerCase().includes(q) || u.titleAr.toLowerCase().includes(q);
  });

  const qFiltered = questions.filter((q) => {
    const s = search.trim().toLowerCase();
    if (!s) return true;
    return (
      q.id.toLowerCase().includes(s) ||
      q.domain.toLowerCase().includes(s) ||
      q.topic.toLowerCase().includes(s) ||
      q.questionEn.toLowerCase().includes(s)
    );
  });

  return (
    <div className="space-y-6" dir={isAr ? "rtl" : "ltr"}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isAr ? "نظام إدارة المناهج وبنك الأسئلة" : "Curriculum & Question Bank CMS"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {curriculum?.paths.length ?? 0} Paths • {curriculum?.concepts.length ?? 0} Canonical Concepts • {curriculum?.units.length ?? 0} Units • {questions.length} Questions
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant={tab === "units" ? "default" : "outline"} size="sm" onClick={() => setTab("units")}>
            <BookOpen className="h-4 w-4 me-1.5" />
            {isAr ? "الوحدات والدروس" : "Units"}
          </Button>
          <Button variant={tab === "questions" ? "default" : "outline"} size="sm" onClick={() => setTab("questions")}>
            <HelpCircle className="h-4 w-4 me-1.5" />
            {isAr ? "بنك الأسئلة" : "Questions"}
          </Button>
          <Button variant={tab === "coverage" ? "default" : "outline"} size="sm" onClick={() => setTab("coverage")}>
            <BarChart3 className="h-4 w-4 me-1.5" />
            {isAr ? "تقرير التغطية" : "Coverage Report"}
          </Button>
        </div>
      </div>

      {feedback && (
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/20 p-3.5 text-sm text-emerald-200">
          {feedback}
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3.5 text-sm text-destructive">
          {error}
        </div>
      )}

      {tab !== "coverage" && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isAr ? "بحث..." : "Filter by ID, domain, or title..."}
            className="max-w-sm"
          />
          {tab === "questions" && (
            <Button onClick={() => setNewQOpen(true)} className="bg-indigo-600 text-white" size="sm">
              <Plus className="h-4 w-4 me-1.5" />
              {isAr ? "إضافة سؤال" : "Add Question"}
            </Button>
          )}
        </div>
      )}

      {tab === "units" && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {unitsList.map((u) => (
            <Card key={u.id} className="border-white/10 bg-card/60">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="text-[10px] font-mono">{u.id}</Badge>
                  <div className="flex items-center gap-1.5">
                    <Badge variant={u.isFreeTier ? "success" : "secondary"} className="text-[10px]">
                      {u.isFreeTier ? "Free" : "Paid"}
                    </Badge>
                    <Badge variant="outline" className="text-[10px]">{u.difficulty}</Badge>
                  </div>
                </div>
                <CardTitle className="text-base mt-2">
                  {pickLocalized({ en: u.titleEn, ar: u.titleAr }, lang)}
                </CardTitle>
                <CardDescription className="text-xs">
                  {u.sections?.length ?? 0} sections • {u.estimatedMinutes} min • Quiz pass {u.quizPassPercentage}%
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end">
                <Button size="sm" variant="outline" onClick={() => openUnitEditor(u)}>
                  <Edit3 className="h-3.5 w-3.5 me-1.5" />
                  {isAr ? "تعديل الوحدة" : "Edit Unit"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "questions" && (
        <Card className="border-white/10 bg-card/60">
          <CardContent className="p-4 space-y-2.5 max-h-[600px] overflow-y-auto">
            {qFiltered.map((q) => (
              <div
                key={q.id}
                className="flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-background/40 p-3"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-[10px] font-mono">{q.id}</Badge>
                    <Badge variant="secondary" className="text-[10px]">{q.domain}</Badge>
                    <span className="text-xs text-muted-foreground">{q.topic} → {q.subtopic}</span>
                  </div>
                  <p className="text-sm">{isAr ? q.questionAr : q.questionEn}</p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="text-destructive hover:bg-destructive/10 shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {tab === "coverage" && coverage && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="border-white/10 bg-card/60">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Total Domains</p>
                <p className="text-xl font-bold mt-1">{coverage.totalDomains ?? 0}</p>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-card/60">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Units Covered by Quizzes</p>
                <p className="text-xl font-bold text-emerald-400 mt-1">
                  {coverage.unitsWithQuestions ?? 0} / {coverage.totalUnits ?? 0}
                </p>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-card/60">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Question Bank Size</p>
                <p className="text-xl font-bold mt-1">{coverage.totalQuestions ?? 0}</p>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-card/60">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Units Needing Questions</p>
                <p className="text-xl font-bold mt-1">
                  {coverage.unitsNeedingQuestions?.length ?? 0}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-white/10 bg-card/60">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                {(coverage.unitsNeedingQuestions?.length || 0) === 0 ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                )}
                Domain & Curriculum Integrity Coverage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {(coverage.domains || []).map((d) => (
                  <div key={d.domain} className="flex items-center justify-between rounded-lg border border-white/10 bg-background/40 px-3 py-2">
                    <div>
                      <span className="font-semibold">{d.domain}</span>
                      <span className="text-muted-foreground ms-2">({d.subtopicsCount} subtopics)</span>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {d.total} Q ({d.easy}E / {d.medium}M / {d.hard}H)
                    </Badge>
                  </div>
                ))}
              </div>
              {coverage.unitsNeedingQuestions && coverage.unitsNeedingQuestions.length > 0 && (
                <p className="text-sm text-amber-300">
                  Units missing questions: {coverage.unitsNeedingQuestions.map((u) => u.id).join(", ")}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Unit Modal */}
      <Modal isOpen={Boolean(editUnit)} onClose={() => setEditUnit(null)} title={`Edit Unit: ${editUnit?.id || ""}`}>
        <div className="space-y-3 pt-2">
          <Input value={uTitleEn} onChange={(e) => setUTitleEn(e.target.value)} placeholder="Title (EN)" />
          <Input value={uTitleAr} onChange={(e) => setUTitleAr(e.target.value)} placeholder="Title (AR)" />
          <div className="grid grid-cols-3 gap-2">
            <select
              value={uDifficulty}
              onChange={(e) => setUDifficulty(e.target.value)}
              className="rounded-md border border-input bg-slate-950 px-2.5 py-2 text-sm"
            >
              <option value="beginner">beginner</option>
              <option value="intermediate">intermediate</option>
              <option value="advanced">advanced</option>
            </select>
            <Input type="number" value={uMinutes} onChange={(e) => setUMinutes(e.target.value)} placeholder="Minutes" />
            <Input type="number" value={uPassPct} onChange={(e) => setUPassPct(e.target.value)} placeholder="Pass %" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={uFreeTier} onChange={(e) => setUFreeTier(e.target.checked)} />
            Available on Free Tier
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setEditUnit(null)}>Cancel</Button>
            <Button disabled={saving} onClick={handleSaveUnit} className="bg-indigo-600 text-white">Save Unit</Button>
          </div>
        </div>
      </Modal>

      {/* Add Question Modal */}
      <Modal isOpen={newQOpen} onClose={() => setNewQOpen(false)} title="Add Assessment Question">
        <form onSubmit={handleCreateQuestion} className="space-y-3 pt-2">
          <div className="grid grid-cols-2 gap-2">
            <Input value={qDomain} onChange={(e) => setQDomain(e.target.value)} placeholder="Domain" required />
            <Input value={qTopic} onChange={(e) => setQTopic(e.target.value)} placeholder="Topic" required />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input value={qSubtopic} onChange={(e) => setQSubtopic(e.target.value)} placeholder="Subtopic" required />
            <select
              value={qDifficulty}
              onChange={(e) => setQDifficulty(e.target.value)}
              className="rounded-md border border-input bg-slate-950 px-3 py-2 text-sm"
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          <Input value={qEn} onChange={(e) => setQEn(e.target.value)} placeholder="Question Prompt (EN)" required />
          <Input value={qAr} onChange={(e) => setQAr(e.target.value)} placeholder="Question Prompt (AR)" />
          <Input value={qOptA} onChange={(e) => setQOptA(e.target.value)} placeholder="Correct Option (A)" required />
          <Input value={qOptB} onChange={(e) => setQOptB(e.target.value)} placeholder="Distractor Option (B)" required />
          <Input value={qExpEn} onChange={(e) => setQExpEn(e.target.value)} placeholder="Explanation" required />
          <Input value={qUnitId} onChange={(e) => setQUnitId(e.target.value)} placeholder="Target Unit ID (optional)" />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setNewQOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={saving} className="bg-indigo-600 text-white">Create Question</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
