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
  AlertTriangle,
  Layers,
  GitBranch
} from "lucide-react";

interface AdminSectionDto {
  id: string;
  type: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  displayOrder: number;
  isRequired: boolean;
  codeSnippet?: string | null;
  codeLanguage?: string | null;
  codeExplanationEn?: string | null;
  codeExplanationAr?: string | null;
  expectedOutput?: string | null;
  interactiveModuleId?: string | null;
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
  publishStatus?: string;
  mappedQuestionsCount?: number;
  tags?: string[];
  interactiveModuleIds?: string[];
  externalReferences?: { title?: string; url?: string; source?: string; type?: string }[];
  objectivesEn?: string[];
  objectivesAr?: string[];
  sections: AdminSectionDto[];
}

interface AdminModuleDto {
  id: string;
  pathId?: string;
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  displayOrder: number;
  units: AdminUnitDto[];
}

interface AdminPathDto {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  category: string;
  displayOrder: number;
  publishStatus?: string;
  modulesCount?: number;
  unitsCount?: number;
  modules?: AdminModuleDto[];
}

interface AdminCurriculumPayload {
  paths: AdminPathDto[];
  concepts: { id: string; titleEn: string; titleAr: string; domain: string }[];
  units: AdminUnitDto[];
}

interface AdminQuestionDto {
  id: string;
  domain: string;
  topic: string;
  subtopic: string;
  difficulty: string;
  questionType?: string;
  questionEn: string;
  questionAr: string;
  explanationEn?: string | null;
  explanationAr?: string | null;
  codeSnippet?: string | null;
  codeLanguage?: string | null;
  options?: { optionKey: string; textEn: string; textAr: string; isCorrect: boolean }[];
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

  const [tab, setTab] = useState<"paths" | "units" | "questions" | "coverage">("units");
  const [curriculum, setCurriculum] = useState<AdminCurriculumPayload | null>(null);
  const [questions, setQuestions] = useState<AdminQuestionDto[]>([]);
  const [coverage, setCoverage] = useState<CoverageReportDto | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Path editor modal
  const [editPath, setEditPath] = useState<AdminPathDto | null>(null);
  const [pTitleEn, setPTitleEn] = useState("");
  const [pTitleAr, setPTitleAr] = useState("");
  const [pCategory, setPCategory] = useState("");
  const [pDescEn, setPDescEn] = useState("");
  const [pDescAr, setPDescAr] = useState("");
  const [pOrder, setPOrder] = useState("1");

  // Unit editor modal
  const [editUnit, setEditUnit] = useState<AdminUnitDto | null>(null);
  const [uTitleEn, setUTitleEn] = useState("");
  const [uTitleAr, setUTitleAr] = useState("");
  const [uDescEn, setUDescEn] = useState("");
  const [uDescAr, setUDescAr] = useState("");
  const [uDifficulty, setUDifficulty] = useState("beginner");
  const [uMinutes, setUMinutes] = useState("30");
  const [uFreeTier, setUFreeTier] = useState(true);
  const [uPassPct, setUPassPct] = useState("60");
  const [uQuizCount, setUQuizCount] = useState("5");
  const [uPublishStatus, setUPublishStatus] = useState("Published");
  const [uInteractiveMods, setUInteractiveMods] = useState("");

  // Sections manager modal
  const [secUnit, setSecUnit] = useState<AdminUnitDto | null>(null);
  const [editingSec, setEditingSec] = useState<AdminSectionDto | null>(null);
  const [sType, setSType] = useState("theory");
  const [sTitleEn, setSTitleEn] = useState("");
  const [sTitleAr, setSTitleAr] = useState("");
  const [sContentEn, setSContentEn] = useState("");
  const [sContentAr, setSContentAr] = useState("");
  const [sOrder, setSOrder] = useState("1");
  const [sCode, setSCode] = useState("");
  const [sCodeLang, setSCodeLang] = useState("javascript");
  const [sOutput, setSOutput] = useState("");
  const [sInteractiveId, setSInteractiveId] = useState("");
  const [sRequired, setSRequired] = useState(true);

  // Create / Edit Question modal
  const [qModalOpen, setQModalOpen] = useState(false);
  const [editingQId, setEditingQId] = useState<string | null>(null);
  const [qDomain, setQDomain] = useState("Algorithms");
  const [qTopic, setQTopic] = useState("Searching");
  const [qSubtopic, setQSubtopic] = useState("Binary Search");
  const [qDifficulty, setQDifficulty] = useState("medium");
  const [qType, setQType] = useState("concept");
  const [qEn, setQEn] = useState("");
  const [qAr, setQAr] = useState("");
  const [qOptA, setQOptA] = useState("");
  const [qOptB, setQOptB] = useState("");
  const [qOptC, setQOptC] = useState("");
  const [qOptD, setQOptD] = useState("");
  const [qCorrectKey, setQCorrectKey] = useState<"a" | "b" | "c" | "d">("a");
  const [qExpEn, setQExpEn] = useState("");
  const [qExpAr, setQExpAr] = useState("");
  const [qUnitId, setQUnitId] = useState("unit-binary-search-foundations");

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [cRes, qRes, covRes] = await Promise.all([
        apiClient.get<AdminCurriculumPayload>("/api/admin/curriculum"),
        apiClient.get<AdminQuestionDto[] | { items?: AdminQuestionDto[] }>("/api/admin/questions?pageSize=100"),
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

  const openPathEditor = (p: AdminPathDto) => {
    setEditPath(p);
    setPTitleEn(p.titleEn);
    setPTitleAr(p.titleAr);
    setPCategory(p.category);
    setPDescEn(p.descriptionEn);
    setPDescAr(p.descriptionAr);
    setPOrder(String(p.displayOrder));
  };

  const handleSavePath = async () => {
    if (!editPath) return;
    setSaving(true);
    setError(null);
    setFeedback(null);
    try {
      await apiClient.put(`/api/admin/curriculum/paths/${editPath.id}`, {
        id: editPath.id,
        titleEn: pTitleEn,
        titleAr: pTitleAr,
        descriptionEn: pDescEn,
        descriptionAr: pDescAr,
        category: pCategory,
        displayOrder: Number(pOrder) || 1,
        publishStatus: editPath.publishStatus || "Published"
      });
      setEditPath(null);
      setFeedback(`Path '${editPath.id}' updated cleanly.`);
      await loadAll();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update learning path.");
    } finally {
      setSaving(false);
    }
  };

  const openUnitEditor = (u: AdminUnitDto) => {
    setEditUnit(u);
    setUTitleEn(u.titleEn);
    setUTitleAr(u.titleAr);
    setUDescEn(u.descriptionEn);
    setUDescAr(u.descriptionAr);
    setUDifficulty(u.difficulty);
    setUMinutes(String(u.estimatedMinutes));
    setUFreeTier(u.isFreeTier);
    setUPassPct(String(u.quizPassPercentage));
    setUQuizCount(String(u.quizQuestionCount));
    setUPublishStatus(u.publishStatus || "Published");
    setUInteractiveMods((u.interactiveModuleIds || []).join(", "));
  };

  const handleSaveUnit = async () => {
    if (!editUnit) return;
    setSaving(true);
    setError(null);
    setFeedback(null);
    try {
      const mods = uInteractiveMods
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      await apiClient.put(`/api/admin/curriculum/units/${editUnit.id}`, {
        titleEn: uTitleEn,
        titleAr: uTitleAr,
        descriptionEn: uDescEn,
        descriptionAr: uDescAr,
        difficulty: uDifficulty,
        estimatedMinutes: Number(uMinutes) || 30,
        isFreeTier: uFreeTier,
        quizPassPercentage: Number(uPassPct) || 60,
        quizQuestionCount: Number(uQuizCount) || 5,
        publishStatus: uPublishStatus,
        interactiveModuleIds: mods
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

  const resetSectionForm = (u: AdminUnitDto) => {
    setEditingSec(null);
    setSType("theory");
    setSTitleEn("");
    setSTitleAr("");
    setSContentEn("");
    setSContentAr("");
    setSOrder(String((u.sections?.length || 0) + 1));
    setSCode("");
    setSCodeLang("javascript");
    setSOutput("");
    setSInteractiveId("");
    setSRequired(true);
  };

  const openSectionEditor = (sec: AdminSectionDto) => {
    setEditingSec(sec);
    setSType(sec.type);
    setSTitleEn(sec.titleEn);
    setSTitleAr(sec.titleAr);
    setSContentEn(sec.contentEn);
    setSContentAr(sec.contentAr);
    setSOrder(String(sec.displayOrder));
    setSCode(sec.codeSnippet || "");
    setSCodeLang(sec.codeLanguage || "javascript");
    setSOutput(sec.expectedOutput || "");
    setSInteractiveId(sec.interactiveModuleId || "");
    setSRequired(sec.isRequired);
  };

  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!secUnit) return;
    setSaving(true);
    setError(null);
    setFeedback(null);
    try {
      const payload = {
        id: editingSec?.id || null,
        unitId: secUnit.id,
        type: sType,
        titleEn: sTitleEn,
        titleAr: sTitleAr || sTitleEn,
        contentEn: sContentEn,
        contentAr: sContentAr || sContentEn,
        displayOrder: Number(sOrder) || 1,
        isRequired: sRequired,
        codeSnippet: sCode.trim() || null,
        codeLanguage: sCode.trim() ? sCodeLang : null,
        expectedOutput: sOutput.trim() || null,
        interactiveModuleId: sInteractiveId.trim() || null
      };
      if (editingSec) {
        await apiClient.put(`/api/admin/curriculum/sections/${editingSec.id}`, payload);
        setFeedback(`Updated section '${editingSec.id}'.`);
      } else {
        await apiClient.post("/api/admin/curriculum/sections", payload);
        setFeedback(`Created new section in '${secUnit.id}'.`);
      }
      resetSectionForm(secUnit);
      setSecUnit(null);
      await loadAll();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save section.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    setError(null);
    setFeedback(null);
    try {
      await apiClient.delete(`/api/admin/curriculum/sections/${sectionId}`);
      setFeedback(`Deleted section '${sectionId}'.`);
      setSecUnit((prev) =>
        prev ? { ...prev, sections: prev.sections.filter((s) => s.id !== sectionId) } : null
      );
      await loadAll();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to delete section.");
    }
  };

  const openCreateQuestion = () => {
    setEditingQId(null);
    setQEn("");
    setQAr("");
    setQOptA("");
    setQOptB("");
    setQOptC("");
    setQOptD("");
    setQCorrectKey("a");
    setQExpEn("");
    setQExpAr("");
    setQModalOpen(true);
  };

  const openEditQuestion = (q: AdminQuestionDto) => {
    setEditingQId(q.id);
    setQDomain(q.domain);
    setQTopic(q.topic);
    setQSubtopic(q.subtopic);
    setQDifficulty(q.difficulty);
    setQType(q.questionType || "concept");
    setQEn(q.questionEn);
    setQAr(q.questionAr);
    setQExpEn(q.explanationEn || "");
    setQExpAr(q.explanationAr || "");
    const opts = q.options || [];
    setQOptA(opts.find((o) => o.optionKey === "a")?.textEn || opts[0]?.textEn || "");
    setQOptB(opts.find((o) => o.optionKey === "b")?.textEn || opts[1]?.textEn || "");
    setQOptC(opts.find((o) => o.optionKey === "c")?.textEn || opts[2]?.textEn || "");
    setQOptD(opts.find((o) => o.optionKey === "d")?.textEn || opts[3]?.textEn || "");
    const corr = opts.find((o) => o.isCorrect)?.optionKey as "a" | "b" | "c" | "d" | undefined;
    setQCorrectKey(corr || "a");
    setQUnitId("");
    setQModalOpen(true);
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setFeedback(null);
    try {
      const options = [
        { key: "a", textEn: qOptA, textAr: qOptA, isCorrect: qCorrectKey === "a" },
        { key: "b", textEn: qOptB, textAr: qOptB, isCorrect: qCorrectKey === "b" },
        ...(qOptC.trim() ? [{ key: "c", textEn: qOptC, textAr: qOptC, isCorrect: qCorrectKey === "c" }] : []),
        ...(qOptD.trim() ? [{ key: "d", textEn: qOptD, textAr: qOptD, isCorrect: qCorrectKey === "d" }] : [])
      ];
      const payload = {
        domain: qDomain,
        topic: qTopic,
        subtopic: qSubtopic,
        difficulty: qDifficulty,
        questionType: qType,
        questionEn: qEn,
        questionAr: qAr || qEn,
        explanationEn: qExpEn,
        explanationAr: qExpAr || qExpEn,
        attachToUnitId: qUnitId.trim() || null,
        options
      };
      if (editingQId) {
        await apiClient.put(`/api/admin/questions/${editingQId}`, payload);
        setFeedback(`Question '${editingQId}' updated cleanly.`);
      } else {
        await apiClient.post("/api/admin/questions", payload);
        setFeedback("New assessment question added and mapped to unit.");
      }
      setQModalOpen(false);
      await loadAll();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not save question.");
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
            {curriculum?.paths.length ?? 0} Paths • {curriculum?.concepts.length ?? 0} Canonical Concepts • {curriculum?.units.length ?? 0} Units • {coverage?.totalQuestions ?? questions.length} Questions
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant={tab === "paths" ? "default" : "outline"} size="sm" onClick={() => setTab("paths")}>
            <GitBranch className="h-4 w-4 me-1.5" />
            {isAr ? "المسارات" : "Paths"}
          </Button>
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

      {(tab === "units" || tab === "questions") && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isAr ? "بحث..." : "Filter by ID, domain, or title..."}
            className="max-w-sm"
          />
          {tab === "questions" && (
            <Button onClick={openCreateQuestion} className="bg-indigo-600 text-white" size="sm">
              <Plus className="h-4 w-4 me-1.5" />
              {isAr ? "إضافة سؤال" : "Add Question"}
            </Button>
          )}
        </div>
      )}

      {tab === "paths" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {(curriculum?.paths || []).map((p) => (
            <Card key={p.id} className="border-white/10 bg-card/60">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="text-[10px] font-mono">{p.id}</Badge>
                  <Badge variant="secondary" className="text-[10px]">{p.category}</Badge>
                </div>
                <CardTitle className="text-base mt-1">{pickLocalized({ en: p.titleEn, ar: p.titleAr }, lang)}</CardTitle>
                <CardDescription className="text-xs">
                  {p.modulesCount ?? p.modules?.length ?? 0} modules • {p.unitsCount ?? 0} units • Order #{p.displayOrder}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end">
                <Button size="sm" variant="outline" onClick={() => openPathEditor(p)}>
                  <Edit3 className="h-3.5 w-3.5 me-1.5" />
                  {isAr ? "تعديل المسار" : "Edit Path"}
                </Button>
              </CardContent>
            </Card>
          ))}
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
                  {u.sections?.length ?? 0} sections • {u.mappedQuestionsCount ?? 0} Qs • {u.estimatedMinutes} min • Pass {u.quizPassPercentage}%
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSecUnit(u);
                    resetSectionForm(u);
                  }}
                >
                  <Layers className="h-3.5 w-3.5 me-1.5" />
                  {isAr ? "الأقسام" : "Sections"}
                </Button>
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
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => openEditQuestion(q)}
                    className="text-indigo-300 hover:bg-indigo-500/10"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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

      {/* Edit Path Modal */}
      <Modal isOpen={Boolean(editPath)} onClose={() => setEditPath(null)} title={`Edit Path: ${editPath?.id || ""}`}>
        <div className="space-y-3 pt-2">
          <Input value={pTitleEn} onChange={(e) => setPTitleEn(e.target.value)} placeholder="Title (EN)" />
          <Input value={pTitleAr} onChange={(e) => setPTitleAr(e.target.value)} placeholder="Title (AR)" />
          <div className="grid grid-cols-2 gap-2">
            <Input value={pCategory} onChange={(e) => setPCategory(e.target.value)} placeholder="Category" />
            <Input type="number" value={pOrder} onChange={(e) => setPOrder(e.target.value)} placeholder="Display Order" />
          </div>
          <Input value={pDescEn} onChange={(e) => setPDescEn(e.target.value)} placeholder="Description (EN)" />
          <Input value={pDescAr} onChange={(e) => setPDescAr(e.target.value)} placeholder="Description (AR)" />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setEditPath(null)}>Cancel</Button>
            <Button disabled={saving} onClick={handleSavePath} className="bg-indigo-600 text-white">Save Path</Button>
          </div>
        </div>
      </Modal>

      {/* Edit Unit Modal */}
      <Modal isOpen={Boolean(editUnit)} onClose={() => setEditUnit(null)} title={`Edit Unit: ${editUnit?.id || ""}`}>
        <div className="space-y-3 pt-2">
          <Input value={uTitleEn} onChange={(e) => setUTitleEn(e.target.value)} placeholder="Title (EN)" />
          <Input value={uTitleAr} onChange={(e) => setUTitleAr(e.target.value)} placeholder="Title (AR)" />
          <Input value={uDescEn} onChange={(e) => setUDescEn(e.target.value)} placeholder="Description (EN)" />
          <Input value={uDescAr} onChange={(e) => setUDescAr(e.target.value)} placeholder="Description (AR)" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
            <Input type="number" value={uQuizCount} onChange={(e) => setUQuizCount(e.target.value)} placeholder="Quiz Qs" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={uInteractiveMods}
              onChange={(e) => setUInteractiveMods(e.target.value)}
              placeholder="Interactive modules (comma-separated)"
            />
            <select
              value={uPublishStatus}
              onChange={(e) => setUPublishStatus(e.target.value)}
              className="rounded-md border border-input bg-slate-950 px-2.5 py-2 text-sm"
            >
              <option value="Published">Published</option>
              <option value="Review">Review</option>
              <option value="Draft">Draft</option>
            </select>
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

      {/* Sections Manager Modal */}
      <Modal
        isOpen={Boolean(secUnit)}
        onClose={() => setSecUnit(null)}
        title={secUnit ? `Sections in ${secUnit.id}` : ""}
      >
        <div className="space-y-4 pt-2 max-h-[75vh] overflow-y-auto">
          <div className="space-y-2">
            {(secUnit?.sections || []).map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs">
                <div>
                  <span className="font-mono text-indigo-300">#{s.displayOrder} [{s.type}]</span>{" "}
                  <span className="font-medium text-white">{s.titleEn}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost" onClick={() => openSectionEditor(s)}>
                    <Edit3 className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDeleteSection(s.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSaveSection} className="space-y-2.5 border-t border-white/10 pt-3">
            <div className="text-xs font-semibold text-indigo-300">
              {editingSec ? `Editing ${editingSec.id}` : "Add New Section"}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={sType}
                onChange={(e) => setSType(e.target.value)}
                className="rounded-md border border-input bg-slate-950 px-2 py-2 text-xs"
              >
                <option value="theory">theory</option>
                <option value="code">code</option>
                <option value="interactive">interactive</option>
                <option value="example">example</option>
                <option value="exercise">exercise</option>
                <option value="summary">summary</option>
              </select>
              <Input type="number" value={sOrder} onChange={(e) => setSOrder(e.target.value)} placeholder="Order" />
              <label className="flex items-center gap-1.5 text-xs">
                <input type="checkbox" checked={sRequired} onChange={(e) => setSRequired(e.target.checked)} />
                Required
              </label>
            </div>
            <Input value={sTitleEn} onChange={(e) => setSTitleEn(e.target.value)} placeholder="Section Title (EN)" required />
            <Input value={sTitleAr} onChange={(e) => setSTitleAr(e.target.value)} placeholder="Section Title (AR)" />
            <textarea
              value={sContentEn}
              onChange={(e) => setSContentEn(e.target.value)}
              placeholder="Markdown Content (EN)"
              rows={3}
              required
              className="w-full rounded-md border border-input bg-slate-950 px-3 py-2 text-xs"
            />
            <textarea
              value={sContentAr}
              onChange={(e) => setSContentAr(e.target.value)}
              placeholder="Markdown Content (AR)"
              rows={2}
              className="w-full rounded-md border border-input bg-slate-950 px-3 py-2 text-xs"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input value={sCodeLang} onChange={(e) => setSCodeLang(e.target.value)} placeholder="Code Lang (e.g. javascript)" />
              <Input value={sInteractiveId} onChange={(e) => setSInteractiveId(e.target.value)} placeholder="Interactive module ID" />
            </div>
            <textarea
              value={sCode}
              onChange={(e) => setSCode(e.target.value)}
              placeholder="Optional code snippet"
              rows={2}
              dir="ltr"
              className="w-full rounded-md border border-input bg-slate-950 px-3 py-2 text-xs font-mono"
            />
            <Input value={sOutput} onChange={(e) => setSOutput(e.target.value)} placeholder="Expected Output (optional)" />
            <div className="flex justify-end gap-2">
              {editingSec && secUnit && (
                <Button type="button" variant="outline" size="sm" onClick={() => resetSectionForm(secUnit)}>
                  New Mode
                </Button>
              )}
              <Button type="submit" size="sm" disabled={saving} className="bg-indigo-600 text-white">
                {editingSec ? "Update Section" : "Add Section"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Create / Edit Question Modal */}
      <Modal
        isOpen={qModalOpen}
        onClose={() => setQModalOpen(false)}
        title={editingQId ? `Edit Question: ${editingQId}` : "Add Assessment Question"}
      >
        <form onSubmit={handleSaveQuestion} className="space-y-3 pt-2">
          <div className="grid grid-cols-2 gap-2">
            <Input value={qDomain} onChange={(e) => setQDomain(e.target.value)} placeholder="Domain" required />
            <Input value={qTopic} onChange={(e) => setQTopic(e.target.value)} placeholder="Topic" required />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Input value={qSubtopic} onChange={(e) => setQSubtopic(e.target.value)} placeholder="Subtopic" required />
            <select
              value={qDifficulty}
              onChange={(e) => setQDifficulty(e.target.value)}
              className="rounded-md border border-input bg-slate-950 px-2.5 py-2 text-sm"
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
            <select
              value={qType}
              onChange={(e) => setQType(e.target.value)}
              className="rounded-md border border-input bg-slate-950 px-2.5 py-2 text-sm"
            >
              <option value="concept">concept</option>
              <option value="code-output">code-output</option>
              <option value="code-trace">code-trace</option>
              <option value="complexity">complexity</option>
              <option value="debugging">debugging</option>
              <option value="scenario">scenario</option>
            </select>
          </div>
          <Input value={qEn} onChange={(e) => setQEn(e.target.value)} placeholder="Question Prompt (EN)" required />
          <Input value={qAr} onChange={(e) => setQAr(e.target.value)} placeholder="Question Prompt (AR)" />
          <div className="grid grid-cols-2 gap-2">
            <Input value={qOptA} onChange={(e) => setQOptA(e.target.value)} placeholder="Option A" required />
            <Input value={qOptB} onChange={(e) => setQOptB(e.target.value)} placeholder="Option B" required />
            <Input value={qOptC} onChange={(e) => setQOptC(e.target.value)} placeholder="Option C" required />
            <Input value={qOptD} onChange={(e) => setQOptD(e.target.value)} placeholder="Option D" required />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <select
              value={qCorrectKey}
              onChange={(e) => setQCorrectKey(e.target.value as "a" | "b" | "c" | "d")}
              className="rounded-md border border-input bg-slate-950 px-2.5 py-2 text-sm"
            >
              <option value="a">Correct: Option A</option>
              <option value="b">Correct: Option B</option>
              <option value="c">Correct: Option C</option>
              <option value="d">Correct: Option D</option>
            </select>
            <Input value={qUnitId} onChange={(e) => setQUnitId(e.target.value)} placeholder="Attach Unit ID (optional)" />
          </div>
          <Input value={qExpEn} onChange={(e) => setQExpEn(e.target.value)} placeholder="Explanation (EN)" required />
          <Input value={qExpAr} onChange={(e) => setQExpAr(e.target.value)} placeholder="Explanation (AR)" />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setQModalOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={saving} className="bg-indigo-600 text-white">
              {editingQId ? "Save Changes" : "Create Question"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
