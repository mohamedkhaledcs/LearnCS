"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/auth-context";
import { useI18n } from "@/lib/i18n/i18n-context";
import { pickLocalized, CATEGORY_LABELS } from "@/lib/i18n/platform-labels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Flame,
  Trophy,
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Compass,
  Award,
  Layers,
  Target,
  Crown,
  Loader2
} from "lucide-react";

interface PathSummaryItem {
  id: string;
  title: { en: string; ar: string };
  category: string;
  totalUnits: number;
  completedUnits: number;
  progressPercent: number;
  nextUnitId?: string | null;
}

interface RecentActivityItem {
  id: string;
  type: string;
  note?: string | null;
  xpAmount: number;
  createdAt: string;
}

interface DiagnosticSnapshot {
  sessionId?: string;
  overallScore?: number;
  maxScore?: number;
  percentage?: number;
  recommendedLevel?: string;
  strongDomains?: string[];
  weakDomains?: string[];
  recommendedPaths?: Array<{
    pathId: string;
    title: { en: string; ar: string };
    reason: { en: string; ar: string };
    startUnitId: string;
    priority: number;
  }>;
}

interface DashboardResponse {
  totalXp: number;
  level: string;
  currentStreak: number;
  longestStreak: number;
  completedUnitsCount: number;
  totalUnitsCount: number;
  completedUnitIds: string[];
  totalStudySeconds: number;
  assessmentsCompleted: number;
  averageAssessmentScore: number;
  unlockedAchievementsCount: number;
  totalAchievementsCount: number;
  recentActivity: RecentActivityItem[];
  pathSummaries: PathSummaryItem[];
  latestDiagnostic?: DiagnosticSnapshot | null;
  diagnosticEvaluatedAt?: string | null;
}

interface MySubscriptionSummary {
  planId: string;
  planName: string;
  status: string;
  billingInterval: string;
  paymentStatus: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { language: lang } = useI18n();
  const isAr = lang === "ar";

  const [data, setData] = useState<DashboardResponse | null>(null);
  const [subscription, setSubscription] = useState<MySubscriptionSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [dashRes, subRes] = await Promise.all([
          apiClient.get<DashboardResponse>("/api/progress/dashboard"),
          apiClient.get<MySubscriptionSummary>("/api/subscriptions/my").catch(() => null)
        ]);
        if (!active) return;
        setData(dashRes.data);
        if (subRes?.data) setSubscription(subRes.data);
      } catch (err: any) {
        if (active) setError(err?.response?.data?.message || (isAr ? "تعذر تحميل بيانات لوحة المتابعة." : "Could not load dashboard metrics."));
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [isAr]);

  const nextRecommendation = data?.pathSummaries?.find((p) => p.nextUnitId) || null;
  const overallProgress = data && data.totalUnitsCount > 0
    ? Math.round((data.completedUnitsCount / data.totalUnitsCount) * 100)
    : 0;
  const studyMinutes = Math.round((data?.totalStudySeconds || 0) / 60);

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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
              {data?.level || "Beginner"}
            </Badge>
            {subscription && (
              <Badge variant={subscription.status === "PendingApproval" ? "warning" : "outline"} className="gap-1">
                <Crown className="h-3 w-3" />
                {subscription.planName}
                {subscription.status === "PendingApproval" ? (isAr ? " (بانتظار التفعيل)" : " (Pending Approval)") : ""}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isAr ? `مرحباً بعودتك، ${user?.username || "متعلم"}` : `Welcome back, ${user?.username || "Learner"}`}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isAr
              ? "تابع رحلتك في علوم الحاسوب خطوة بخطوة مع تتبع فوري للتقدم والإنجازات."
              : "Track your mastery across canonical CS tracks, interactive labs, and verified assessments."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/assessment">
              <Target className="h-4 w-4 me-2" />
              {isAr ? "التقييم التشخيصي" : "Skill Assessment"}
            </Link>
          </Button>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Link href={nextRecommendation?.nextUnitId ? `/roadmap/unit/${nextRecommendation.nextUnitId}` : "/roadmap"}>
              <Sparkles className="h-4 w-4 me-2" />
              {isAr ? "أكمل التعلم الآن" : "Continue Learning"}
            </Link>
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-white/10 bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {isAr ? "مجموع نقاط الخبرة XP" : "Total Experience (XP)"}
            </CardTitle>
            <Sparkles className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(data?.totalXp ?? 0).toLocaleString()} XP</div>
            <p className="text-xs text-muted-foreground mt-1">
              {isAr ? `المستوى: ${data?.level || "Beginner"}` : `Current Rank: ${data?.level || "Beginner"}`}
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {isAr ? "سلسلة التعلّم اليومية" : "Study Streak"}
            </CardTitle>
            <Flame className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.currentStreak ?? 0} {isAr ? "يوم" : "days"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {isAr ? `أطول سلسلة: ${data?.longestStreak ?? 0} يوم` : `Longest streak: ${data?.longestStreak ?? 0} days`}
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {isAr ? "الوحدات المكتملة" : "Completed Units"}
            </CardTitle>
            <BookOpen className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.completedUnitsCount ?? 0} / {data?.totalUnitsCount ?? 0}
            </div>
            <Progress value={overallProgress} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {isAr ? "الإنجازات والتقييمات" : "Achievements & Quizzes"}
            </CardTitle>
            <Trophy className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.unlockedAchievementsCount ?? 0} / {data?.totalAchievementsCount ?? 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {isAr
                ? `متوسط الدرجات: ${Math.round(data?.averageAssessmentScore ?? 0)}% • ${studyMinutes} د`
                : `Avg score: ${Math.round(data?.averageAssessmentScore ?? 0)}% • ${studyMinutes} min`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Latest Diagnostic Baseline Card */}
      {data?.latestDiagnostic && (
        <Card className="border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-slate-900/60 to-indigo-950/30">
          <CardContent className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                  {isAr ? "ملف التقييم التشخيصي المحفوظ" : "Saved Diagnostic Baseline"}
                </Badge>
                <span className="text-sm font-bold text-white">
                  {data.latestDiagnostic.overallScore ?? 0} / {data.latestDiagnostic.maxScore ?? 0} ({data.latestDiagnostic.percentage ?? 0}%)
                </span>
              </div>
              {data.latestDiagnostic.recommendedPaths && data.latestDiagnostic.recommendedPaths.length > 0 ? (
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {isAr ? "المسار الموصى به بناءً على تقييمك: " : "Diagnostic Top Recommendation: "}
                    {pickLocalized(data.latestDiagnostic.recommendedPaths[0].title, lang)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {pickLocalized(data.latestDiagnostic.recommendedPaths[0].reason, lang)}
                  </p>
                </div>
              ) : null}
              <div className="flex flex-wrap gap-2 pt-1">
                {(data.latestDiagnostic.strongDomains || []).slice(0, 3).map((d) => (
                  <Badge key={`s-${d}`} variant="outline" className="border-emerald-500/30 text-emerald-300 text-[11px]" dir="ltr">
                    + {d}
                  </Badge>
                ))}
                {(data.latestDiagnostic.weakDomains || []).slice(0, 3).map((d) => (
                  <Badge key={`w-${d}`} variant="outline" className="border-rose-500/30 text-rose-300 text-[11px]" dir="ltr">
                    Focus: {d}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <Button asChild variant="outline" size="sm">
                <Link href="/assessment">{isAr ? "إعادة التقييم" : "Retake Diagnostic"}</Link>
              </Button>
              {data.latestDiagnostic.recommendedPaths && data.latestDiagnostic.recommendedPaths[0] && (
                <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Link href={`/roadmap/unit/${data.latestDiagnostic.recommendedPaths[0].startUnitId}?path=${data.latestDiagnostic.recommendedPaths[0].pathId}`}>
                    {isAr ? "ابدأ المسار الموصى به" : "Start Recommended Unit"}
                    <ArrowRight className="h-4 w-4 ms-1.5 rtl:rotate-180" />
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Recommended Unit Banner */}
      {nextRecommendation && (
        <Card className="border-indigo-500/30 bg-gradient-to-r from-indigo-950/50 via-slate-900/60 to-purple-950/40">
          <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                <Compass className="h-4 w-4" />
                {isAr ? "الوحدة الموصى بها تالياً" : "Recommended Next Step"}
              </div>
              <h2 className="text-xl font-bold">
                {pickLocalized(nextRecommendation.title, lang)}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isAr
                  ? `أنجزت ${nextRecommendation.completedUnits} من ${nextRecommendation.totalUnits} وحدة في هذا المسار (${Math.round(nextRecommendation.progressPercent)}%).`
                  : `${nextRecommendation.completedUnits} of ${nextRecommendation.totalUnits} units mastered (${Math.round(nextRecommendation.progressPercent)}%).`}
              </p>
            </div>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0">
              <Link href={`/roadmap/unit/${nextRecommendation.nextUnitId}`}>
                {isAr ? "ابدأ الوحدة" : "Open Next Unit"}
                <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Main Split: Curriculum Progress & Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Layers className="h-5 w-5 text-indigo-400" />
              {isAr ? "تقدّمك في المسارات التعليمية" : "Learning Paths Progress"}
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/roadmap">{isAr ? "عرض كل المسارات" : "View Full Roadmap"}</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {(data?.pathSummaries || []).map((p) => {
              const cat = CATEGORY_LABELS[p.category] || { en: p.category, ar: p.category };
              return (
                <Card key={p.id} className="border-white/10 bg-card/50 hover:border-indigo-500/30 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline" className="text-[11px]">
                        {isAr ? cat.ar : cat.en}
                      </Badge>
                      <span className="text-xs font-semibold text-indigo-400">
                        {Math.round(p.progressPercent)}%
                      </span>
                    </div>
                    <CardTitle className="text-base mt-2">
                      {pickLocalized(p.title, lang)}
                    </CardTitle>
                    <CardDescription>
                      {p.completedUnits} / {p.totalUnits} {isAr ? "وحدة مكتملة" : "units completed"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Progress value={p.progressPercent} className="h-2" />
                    <div className="flex justify-between items-center pt-1">
                      <Button asChild variant="ghost" size="sm" className="px-0 text-indigo-400 hover:text-indigo-300">
                        <Link href={p.nextUnitId ? `/roadmap/unit/${p.nextUnitId}` : `/roadmap`}>
                          {p.nextUnitId
                            ? (isAr ? "استكمال المسار" : "Resume Unit")
                            : (isAr ? "استعراض المسار" : "Browse Path")}
                          <ArrowRight className="h-3.5 w-3.5 ms-1 rtl:rotate-180" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="space-y-6">
          <Card className="border-white/10 bg-card/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-400" />
                {isAr ? "النشاط التعليمي الأخير" : "Recent Activity"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(!data?.recentActivity || data.recentActivity.length === 0) ? (
                <p className="text-sm text-muted-foreground">
                  {isAr ? "لم تسجّل نشاطاً بعد: ابدأ أول وحدة لك من خريطة التعلم!" : "No study activity yet. Open your first learning unit to begin!"}
                </p>
              ) : (
                data.recentActivity.map((act) => (
                  <div key={act.id} className="flex items-start justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium leading-snug">
                          {act.note || act.type}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(act.createdAt).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
                            month: "short",
                            day: "numeric"
                          })}
                        </p>
                      </div>
                    </div>
                    {act.xpAmount > 0 && (
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 shrink-0">
                        +{act.xpAmount} XP
                      </Badge>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-400" />
                {isAr ? "اختصارات المنصة" : "Quick Links"}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
              <Button asChild variant="outline" className="justify-start">
                <Link href="/achievements">{isAr ? "لوحة الإنجازات والأوسمة" : "Achievements & Badges"}</Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link href="/career">{isAr ? "مستكشف المسارات المهنية" : "Career Track Explorer"}</Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link href="/plans">{isAr ? "إدارة الخطة والاشتراك" : "Subscription Plans"}</Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link href="/ai">{isAr ? "مساعد LearnCS الذكي" : "AI Learning Mentor"}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
