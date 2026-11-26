"use client";

import React, { useEffect, useMemo, useState } from "react";
import { apiClient } from "@/lib/api/client";
import { useI18n } from "@/lib/i18n/i18n-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  CheckCircle2,
  Flame,
  Lock,
  Sparkles,
  Trophy,
  Loader2
} from "lucide-react";

interface AchievementItemDto {
  id: string;
  code: string;
  name: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  threshold: number;
  currentProgress: number;
  xpReward: number;
  unlocked: boolean;
  earnedAt?: string | null;
}

interface AchievementsSummaryDto {
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  unlockedCount: number;
  totalCount: number;
  achievements: AchievementItemDto[];
}

export default function AchievementsPage() {
  const { language: lang } = useI18n();
  const isAr = lang === "ar";

  const [data, setData] = useState<AchievementsSummaryDto | null>(null);
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await apiClient.get<AchievementsSummaryDto>("/api/achievements/my");
        if (active) setData(res.data);
      } catch (err: any) {
        if (active) setError(err?.response?.data?.message || (isAr ? "تعذر تحميل الإنجازات." : "Failed to load achievements."));
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [isAr]);

  const filtered = useMemo(() => {
    const items = data?.achievements || [];
    if (filter === "unlocked") return items.filter((a) => a.unlocked);
    if (filter === "locked") return items.filter((a) => !a.unlocked);
    return items;
  }, [data, filter]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-9 w-9 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 md:p-8 max-w-7xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
      <div>
        <Badge variant="secondary" className="mb-2 bg-amber-500/10 text-amber-400">
          <Trophy className="h-3.5 w-3.5 me-1.5" />
          {isAr ? "سجل الإنجازات والأوسمة" : "Gamification & Achievements"}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">
          {isAr ? "إنجازاتك ونقاط الخبرة" : "Your Achievements & Streaks"}
        </h1>
        <p className="text-muted-foreground mt-1">
          {isAr
            ? "تُحتسب الأوسمة تلقائياً بناءً على إتقان الوحدات، نتائج الاختبارات، وسلسلة التعلّم اليومية."
            : "Badges unlock automatically from verified unit completions, mastery quizzes, and active study streaks."}
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Top Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-white/10 bg-card/60">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{isAr ? "الأوسمة المفتوحة" : "Unlocked Badges"}</p>
              <p className="text-2xl font-bold mt-1">
                {data?.unlockedCount ?? 0} / {data?.totalCount ?? 0}
              </p>
            </div>
            <Award className="h-8 w-8 text-amber-400" />
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/60">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{isAr ? "مجموع XP" : "Total XP"}</p>
              <p className="text-2xl font-bold mt-1">{(data?.totalXp ?? 0).toLocaleString()} XP</p>
            </div>
            <Sparkles className="h-8 w-8 text-indigo-400" />
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/60">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{isAr ? "السلسلة الحالية / الأطول" : "Current / Longest Streak"}</p>
              <p className="text-2xl font-bold mt-1">
                {data?.currentStreak ?? 0} / {data?.longestStreak ?? 0} {isAr ? "يوم" : "days"}
              </p>
            </div>
            <Flame className="h-8 w-8 text-orange-400" />
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["all", isAr ? "الكل" : "All"],
            ["unlocked", isAr ? "المكتسبة" : "Unlocked"],
            ["locked", isAr ? "قيد التقدم" : "In Progress"]
          ] as const
        ).map(([key, label]) => (
          <Button
            key={key}
            size="sm"
            variant={filter === key ? "default" : "outline"}
            onClick={() => setFilter(key)}
            className={filter === key ? "bg-indigo-600 text-white" : ""}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ach) => {
          const pct = ach.threshold > 0 ? Math.min(100, Math.round((ach.currentProgress / ach.threshold) * 100)) : 0;
          return (
            <Card
              key={ach.id}
              className={`border transition-colors ${
                ach.unlocked
                  ? "border-amber-500/40 bg-amber-950/10"
                  : "border-white/10 bg-card/50"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={ach.unlocked ? "success" : "outline"} className="gap-1">
                    {ach.unlocked ? <CheckCircle2 className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                    {ach.category}
                  </Badge>
                  <Badge variant="secondary" className="bg-indigo-500/15 text-indigo-300">
                    +{ach.xpReward} XP
                  </Badge>
                </div>
                <CardTitle className="text-lg mt-2">
                  {isAr ? ach.titleAr : ach.name}
                </CardTitle>
                <CardDescription>
                  {isAr ? ach.descriptionAr : ach.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{isAr ? "التقدم" : "Progress"}</span>
                  <span>
                    {Math.min(ach.currentProgress, ach.threshold)} / {ach.threshold}
                  </span>
                </div>
                <Progress value={pct} className="h-2" />
                {ach.unlocked && ach.earnedAt && (
                  <p className="text-[11px] text-emerald-400 pt-1">
                    {isAr ? "اكتُسب في: " : "Earned on "}
                    {new Date(ach.earnedAt).toLocaleDateString()}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
