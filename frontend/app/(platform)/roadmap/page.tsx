"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/auth-context";
import { useI18n } from "@/lib/i18n/i18n-context";
import { CATEGORY_LABELS, DIFFICULTY_LABELS, pickLocalized } from "@/lib/i18n/platform-labels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  Lock,
  PlayCircle,
  Clock,
  Sparkles,
  Layers,
  Search,
  ShieldCheck,
  Share2,
  Loader2,
  ChevronDown,
  ChevronUp,
  GitBranch,
  X,
  ArrowRight
} from "lucide-react";

interface PrereqRuleDto {
  targetType: string;
  operator: string;
  requiredIds: string[];
  enforcement: string;
}

interface RoadmapUnitDto {
  id: string;
  conceptId: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  difficulty: string;
  estimatedMinutes: number;
  isFreeTier: boolean;
  tags: string[];
  interactiveModuleIds: string[];
  prerequisites?: PrereqRuleDto[];
  sectionsCount: number;
  status: "completed" | "in_progress" | "not_started";
  isUnlocked: boolean;
  isOptional: boolean;
}

interface RoadmapModuleDto {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  displayOrder: number;
  units: RoadmapUnitDto[];
}

interface RoadmapPathDto {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  targetAudience?: { en: string; ar: string } | null;
  category: string;
  displayOrder: number;
  prerequisites?: PrereqRuleDto[];
  recommendedNextPaths: string[];
  totalUnits: number;
  completedUnits: number;
  progressPercent: number;
  isUnlocked: boolean;
  modules: RoadmapModuleDto[];
}

interface TrackAreaGroup {
  id: string;
  label: { en: string; ar: string };
  pathIds: string[];
}

const TRACK_AREAS: TrackAreaGroup[] = [
  {
    id: "all",
    label: { en: "All 5 Track Areas (9 Paths)", ar: "جميع المجالات الخمسة (9 مسارات)" },
    pathIds: []
  },
  {
    id: "foundations",
    label: { en: "1. Foundations", ar: "1. التأسيس البرمجي" },
    pathIds: ["pre-programming", "programming-fundamentals"]
  },
  {
    id: "cs-core",
    label: { en: "2. CS Core", ar: "2. جوهر علوم الحاسوب" },
    pathIds: ["object-oriented-programming", "discrete-mathematics", "data-structures"]
  },
  {
    id: "problem-solving",
    label: { en: "3. Problem Solving & CP", ar: "3. حل المشكلات والتنافسية" },
    pathIds: ["algorithms", "competitive-programming"]
  },
  {
    id: "systems-se",
    label: { en: "4. Systems & SE", ar: "4. النظم وهندسة البرمجيات" },
    pathIds: ["systems-and-engineering"]
  },
  {
    id: "data-db",
    label: { en: "5. Data & Databases", ar: "5. البيانات وقواعد البيانات" },
    pathIds: ["databases"]
  }
];

function getAreaForPath(pathId: string): TrackAreaGroup {
  return (
    TRACK_AREAS.slice(1).find((g) => g.pathIds.includes(pathId)) ||
    TRACK_AREAS[2]
  );
}

export default function RoadmapPage() {
  const { user } = useAuth();
  const { language: lang } = useI18n();
  const isAr = lang === "ar";

  const [paths, setPaths] = useState<RoadmapPathDto[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPaths, setExpandedPaths] = useState<Record<string, boolean>>({});
  const [showTreeModal, setShowTreeModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isElevatedRole = Boolean(
    user?.roles?.some((r) => ["SuperAdmin", "Admin", "ContentManager"].includes(r))
  );

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await apiClient.get<RoadmapPathDto[]>("/api/curriculum/paths");
        if (!active) return;
        const list = res.data || [];
        setPaths(list);

        const urlPathId =
          typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("path")
            : null;

        const initialExpanded: Record<string, boolean> = {};
        list.forEach((p, idx) => {
          initialExpanded[p.id] =
            (urlPathId && p.id === urlPathId) || idx < 3 || p.completedUnits > 0;
        });
        setExpandedPaths(initialExpanded);

        if (urlPathId && list.some((p) => p.id === urlPathId)) {
          const area = getAreaForPath(urlPathId);
          if (area) setSelectedArea(area.id);
        }
      } catch (err: any) {
        if (active) setError(err?.response?.data?.message || (isAr ? "تعذر تحميل خريطة التعلم." : "Could not load curriculum roadmap."));
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [isAr]);

  const pathTitleMap = useMemo(() => {
    const map = new Map<string, { en: string; ar: string }>();
    for (const p of paths) map.set(p.id, p.title);
    return map;
  }, [paths]);

  const unitTitleMap = useMemo(() => {
    const map = new Map<string, { title: { en: string; ar: string }; pathId: string }>();
    for (const p of paths) {
      for (const m of p.modules) {
        for (const u of m.units) {
          if (!map.has(u.id)) map.set(u.id, { title: u.title, pathId: p.id });
        }
      }
    }
    return map;
  }, [paths]);

  const unitPathCountMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of paths) {
      const seenInPath = new Set<string>();
      for (const m of p.modules) {
        for (const u of m.units) {
          if (!seenInPath.has(u.id)) {
            seenInPath.add(u.id);
            map.set(u.id, (map.get(u.id) || 0) + 1);
          }
        }
      }
    }
    return map;
  }, [paths]);

  const uniqueStats = useMemo(() => {
    const seenUnits = new Set<string>();
    const doneUnits = new Set<string>();
    const uniqueConcepts = new Set<string>();
    let totalModules = 0;
    let totalSections = 0;

    for (const p of paths) {
      totalModules += p.modules.length;
      for (const m of p.modules) {
        for (const u of m.units) {
          uniqueConcepts.add(u.conceptId);
          if (!seenUnits.has(u.id)) {
            seenUnits.add(u.id);
            totalSections += u.sectionsCount;
            if (u.status === "completed") doneUnits.add(u.id);
          }
        }
      }
    }
    const sharedUnits = Array.from(unitPathCountMap.values()).filter((c) => c > 1).length;
    return {
      totalUnique: seenUnits.size,
      completedUnique: doneUnits.size,
      totalModules,
      totalConcepts: uniqueConcepts.size,
      totalSections,
      sharedUnits
    };
  }, [paths, unitPathCountMap]);

  const filteredPaths = useMemo(() => {
    const areaObj = TRACK_AREAS.find((a) => a.id === selectedArea);
    const q = searchQuery.trim().toLowerCase();
    return paths.filter((p) => {
      if (selectedArea !== "all" && areaObj && !areaObj.pathIds.includes(p.id)) return false;
      if (!q) return true;
      const inPath =
        p.title.en.toLowerCase().includes(q) ||
        p.title.ar.toLowerCase().includes(q) ||
        p.description.en.toLowerCase().includes(q);
      const inUnits = p.modules.some((m) =>
        m.units.some(
          (u) =>
            u.title.en.toLowerCase().includes(q) ||
            u.title.ar.toLowerCase().includes(q) ||
            u.tags.some((t) => t.toLowerCase().includes(q))
        )
      );
      return inPath || inUnits;
    });
  }, [paths, selectedArea, searchQuery]);

  const resolvePrereqNames = (rules?: PrereqRuleDto[]): string => {
    if (!rules || rules.length === 0) return "";
    const labels: string[] = [];
    for (const r of rules.filter((x) => x.enforcement === "hard_lock")) {
      for (const id of r.requiredIds) {
        if (r.targetType === "path") {
          const pTitle = pathTitleMap.get(id);
          labels.push(pTitle ? pickLocalized(pTitle, lang) : id);
        } else {
          const uEntry = unitTitleMap.get(id);
          labels.push(uEntry ? pickLocalized(uEntry.title, lang) : id);
        }
      }
    }
    return labels.slice(0, 3).join(", ");
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-9 w-9 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 md:p-8 max-w-7xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
              <Layers className="h-3.5 w-3.5 me-1.5" />
              {isAr
                ? `${paths.length} مسارات و ${uniqueStats.totalUnique} وحدة موحدة`
                : `${paths.length} Paths and ${uniqueStats.totalUnique} Canonical Units`}
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowTreeModal(true)}
              className="h-7 text-xs border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10"
            >
              <GitBranch className="h-3.5 w-3.5 me-1.5" />
              {isAr ? "عرض شجرة المنهج" : "Curriculum Tree Overview"}
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isAr ? "خريطة تعلم علوم الحاسوب" : "Computer Science Learning Roadmap"}
          </h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            {isAr
              ? `منهج منظم في 5 مجموعات يضم ${uniqueStats.totalConcepts} مفهوماً و${uniqueStats.totalSections} قسماً تعليمياً و${uniqueStats.sharedUnits} وحدات مشتركة باحتساب تقدم موحد.`
              : `Structured across 5 thematic areas spanning ${uniqueStats.totalConcepts} canonical concepts, ${uniqueStats.totalSections} lesson sections, and ${uniqueStats.sharedUnits} cross-path shared units with unified credit.`}
          </p>
        </div>

        <Card className="border-white/10 bg-card/60 min-w-[260px]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>{isAr ? "الوحدات المتقنة إجمالاً" : "Unique Canonical Mastery"}</span>
              <span className="font-semibold text-foreground">
                {uniqueStats.completedUnique} / {uniqueStats.totalUnique}
              </span>
            </div>
            <Progress
              value={uniqueStats.totalUnique > 0 ? (uniqueStats.completedUnique / uniqueStats.totalUnique) * 100 : 0}
              className="h-2"
            />
          </CardContent>
        </Card>
      </div>

      {isElevatedRole && (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm text-emerald-300">
          <ShieldCheck className="h-5 w-5 shrink-0" />
          <span>
            {isAr
              ? "وضع المعاينة الإداري مفعّل: يمكنك تصفح كل الوحدات والاختبارات عبر جميع المسارات مباشرة."
              : "Admin Preview Mode Active: All learning paths, units, and quizzes are unlocked for inspection."}
          </span>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* 5 Thematic Track Area Filters & Search */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {TRACK_AREAS.map((area) => {
            const active = selectedArea === area.id;
            return (
              <Button
                key={area.id}
                size="sm"
                variant={active ? "default" : "outline"}
                onClick={() => setSelectedArea(area.id)}
                className={active ? "bg-indigo-600 hover:bg-indigo-700 text-white" : ""}
              >
                {isAr ? area.label.ar : area.label.en}
              </Button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="h-4 w-4 absolute top-2.5 start-3 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? "ابحث عن مسار أو وحدة..." : "Search paths, units, tags..."}
            className="ps-9"
          />
        </div>
      </div>

      {/* Paths Accordion List */}
      <div className="space-y-6">
        {filteredPaths.map((p) => {
          const isExpanded = Boolean(expandedPaths[p.id]);
          const catLabel = CATEGORY_LABELS[p.category] || { en: p.category, ar: p.category };
          const areaBadge = getAreaForPath(p.id);
          const prereqNames = resolvePrereqNames(p.prerequisites);
          const firstMissingPathId = p.prerequisites?.find((r) => r.targetType === "path")?.requiredIds?.[0];

          return (
            <Card
              key={p.id}
              id={`path-${p.id}`}
              className={`border-white/10 transition-colors ${
                p.isUnlocked ? "bg-card/60" : "bg-card/30 opacity-90"
              }`}
            >
              <CardHeader
                className="cursor-pointer select-none"
                onClick={() =>
                  setExpandedPaths((prev) => ({ ...prev, [p.id]: !prev[p.id] }))
                }
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-xs border-indigo-500/30 text-indigo-300">
                        {isAr ? areaBadge.label.ar : areaBadge.label.en}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {isAr ? catLabel.ar : catLabel.en}
                      </Badge>
                      {!p.isUnlocked && (
                        <Badge variant="warning" className="gap-1">
                          <Lock className="h-3 w-3" />
                          {prereqNames
                            ? (isAr ? `يتطلب: ${prereqNames}` : `Requires: ${prereqNames}`)
                            : (isAr ? "يتطلب إكمال مسار سابق" : "Prerequisite Track Required")}
                        </Badge>
                      )}
                      {p.progressPercent >= 100 && (
                        <Badge variant="success" className="gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          {isAr ? "مكتمل" : "Completed"}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      {pickLocalized(p.title, lang)}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {pickLocalized(p.description, lang)}
                    </CardDescription>
                    {!p.isUnlocked && firstMissingPathId && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedArea("all");
                          setExpandedPaths((prev) => ({ ...prev, [firstMissingPathId]: true }));
                          setTimeout(() => {
                            document.getElementById(`path-${firstMissingPathId}`)?.scrollIntoView({ behavior: "smooth" });
                          }, 80);
                        }}
                        className="text-xs text-amber-300 hover:text-amber-200 underline inline-flex items-center gap-1"
                      >
                        <span>
                          {isAr
                            ? `انتقل إلى المتطلب: ${pathTitleMap.get(firstMissingPathId)?.ar || firstMissingPathId}`
                            : `Go to prerequisite track: ${pathTitleMap.get(firstMissingPathId)?.en || firstMissingPathId}`}
                        </span>
                        <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-end min-w-[120px]">
                      <div className="text-sm font-semibold">
                        {p.completedUnits} / {p.totalUnits} {isAr ? "وحدة" : "units"}
                      </div>
                      <Progress value={p.progressPercent} className="h-2 mt-1 w-32" />
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="space-y-6 pt-2 border-t border-white/5">
                  {p.modules.map((mod) => (
                    <div key={mod.id} className="space-y-3">
                      <div>
                        <h3 className="text-base font-semibold text-indigo-300">
                          {mod.displayOrder}. {pickLocalized(mod.title, lang)}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {pickLocalized(mod.description, lang)}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {mod.units.map((u) => {
                          const isCompleted = u.status === "completed";
                          const sharedCount = unitPathCountMap.get(u.id) || 1;
                          const diffLabel = DIFFICULTY_LABELS[u.difficulty] || { en: u.difficulty, ar: u.difficulty };
                          const unitPrereqText = resolvePrereqNames(u.prerequisites);

                          return (
                            <div
                              key={`${mod.id}-${u.id}`}
                              className={`flex flex-col justify-between rounded-xl border p-4 transition-all ${
                                isCompleted
                                  ? "border-emerald-500/30 bg-emerald-950/10"
                                  : u.isUnlocked
                                  ? "border-white/10 bg-background/50 hover:border-indigo-500/40"
                                  : "border-white/5 bg-background/20 opacity-80"
                              }`}
                            >
                              <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <Badge
                                    variant={isCompleted ? "success" : u.isUnlocked ? "secondary" : "outline"}
                                    className="text-[10px] gap-1"
                                  >
                                    {isCompleted ? (
                                      <CheckCircle2 className="h-3 w-3" />
                                    ) : u.isUnlocked ? (
                                      <PlayCircle className="h-3 w-3" />
                                    ) : (
                                      <Lock className="h-3 w-3" />
                                    )}
                                    {isAr ? diffLabel.ar : diffLabel.en}
                                  </Badge>

                                  <div className="flex items-center gap-1.5">
                                    {sharedCount > 1 && (
                                      <Badge
                                        variant="outline"
                                        className="text-[10px] border-cyan-500/30 text-cyan-300 gap-1"
                                        title={
                                          isAr
                                            ? `وحدة مشتركة ومحتسبة عبر ${sharedCount} مسارات`
                                            : `Canonical unit shared and credited across ${sharedCount} paths`
                                        }
                                      >
                                        <Share2 className="h-2.5 w-2.5" />
                                        {isAr ? `مشتركة (${sharedCount})` : `Shared (${sharedCount})`}
                                      </Badge>
                                    )}
                                    {!u.isFreeTier && (
                                      <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-300">
                                        Pro
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <h4 className="font-semibold text-sm leading-snug">
                                  {pickLocalized(u.title, lang)}
                                </h4>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {pickLocalized(u.description, lang)}
                                </p>
                                {!u.isUnlocked && unitPrereqText && (
                                  <p className="text-[11px] text-amber-300/90">
                                    {isAr ? `المتطلب: ${unitPrereqText}` : `Prereq: ${unitPrereqText}`}
                                  </p>
                                )}
                              </div>

                              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {u.estimatedMinutes}m
                                  </span>
                                  <span>•</span>
                                  <span>{u.sectionsCount} {isAr ? "أقسام" : "sec"}</span>
                                  {u.interactiveModuleIds.length > 0 && (
                                    <Sparkles className="h-3 w-3 text-indigo-400" />
                                  )}
                                </div>

                                <Button
                                  asChild
                                  size="sm"
                                  variant={isCompleted ? "outline" : "default"}
                                  className={!isCompleted && u.isUnlocked ? "bg-indigo-600 hover:bg-indigo-700 text-white" : ""}
                                >
                                  <Link href={`/roadmap/unit/${u.id}?path=${p.id}`}>
                                    {isCompleted
                                      ? (isAr ? "مراجعة" : "Review")
                                      : u.isUnlocked
                                      ? (isAr ? "ابدأ" : "Start")
                                      : (isAr ? "معاينة" : "Inspect")}
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Curriculum Architecture Tree Overview Modal */}
      {showTreeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowTreeModal(false)}
        >
          <div
            className="w-full max-w-4xl max-h-[85vh] flex flex-col rounded-2xl border border-white/15 bg-neutral-950 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            dir={isAr ? "rtl" : "ltr"}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-neutral-900/70">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-indigo-400" />
                  {isAr ? "شجرة معمارية المنهج الكاملة" : "Canonical Curriculum Tree Overview"}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isAr
                    ? `${paths.length} مسارات | ${uniqueStats.totalModules} وحدة تنظيمية | ${uniqueStats.totalConcepts} مفهوماً | ${uniqueStats.totalUnique} وحدة تعليمية | ${uniqueStats.totalSections} قسماً`
                    : `${paths.length} Paths | ${uniqueStats.totalModules} Modules | ${uniqueStats.totalConcepts} Concepts | ${uniqueStats.totalUnique} Units | ${uniqueStats.totalSections} Sections`}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowTreeModal(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-sm">
              {TRACK_AREAS.slice(1).map((area) => {
                const areaPaths = paths.filter((p) => area.pathIds.includes(p.id));
                if (areaPaths.length === 0) return null;
                return (
                  <div key={area.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                    <div className="font-bold text-indigo-300 text-base">
                      {isAr ? area.label.ar : area.label.en}
                    </div>
                    <div className="space-y-3 ps-3 border-s border-indigo-500/30">
                      {areaPaths.map((p) => (
                        <div key={p.id} className="space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-semibold text-white">
                              {pickLocalized(p.title, lang)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {p.modules.length} {isAr ? "محاور" : "modules"} / {p.totalUnits} {isAr ? "وحدات" : "units"}
                            </span>
                          </div>
                          <div className="grid gap-1.5 sm:grid-cols-2 ps-3">
                            {p.modules.map((m) => (
                              <div key={m.id} className="rounded-lg border border-white/5 bg-black/30 p-2.5 text-xs">
                                <div className="font-medium text-neutral-200 mb-1">
                                  {m.displayOrder}. {pickLocalized(m.title, lang)}
                                </div>
                                <ul className="space-y-1 text-neutral-400">
                                  {m.units.map((u) => {
                                    const shared = (unitPathCountMap.get(u.id) || 1) > 1;
                                    return (
                                      <li key={u.id} className="flex items-center justify-between gap-2">
                                        <Link
                                          href={`/roadmap/unit/${u.id}?path=${p.id}`}
                                          onClick={() => setShowTreeModal(false)}
                                          className="hover:text-indigo-300 truncate"
                                        >
                                          {pickLocalized(u.title, lang)}
                                        </Link>
                                        <span className="shrink-0 text-[10px] text-neutral-500">
                                          {u.sectionsCount}s{shared ? (isAr ? " | مشترك" : " | shared") : ""}
                                        </span>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
