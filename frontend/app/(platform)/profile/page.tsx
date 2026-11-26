"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api/client";
import { useI18n } from "@/lib/i18n/i18n-context";
import { pickLocalized } from "@/lib/i18n/platform-labels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  User as UserIcon,
  Calendar,
  Award,
  Flame,
  Sparkles,
  Crown,
  BookOpen,
  Settings,
  Loader2
} from "lucide-react";

interface UserProfileResponse {
  id: string;
  email: string;
  username: string;
  fullName?: string | null;
  bio?: string | null;
  preferredLanguage?: string;
  createdAt: string;
  roles: string[];
  subscription?: { planId: string; planName: string; status: string } | null;
}

interface DashboardPathSummary {
  id: string;
  title: { en: string; ar: string };
  completedUnits: number;
  totalUnits: number;
  progressPercent: number;
}

interface DashboardResponse {
  totalXp: number;
  level: string;
  currentStreak: number;
  longestStreak: number;
  completedUnitsCount: number;
  totalUnitsCount: number;
  pathSummaries: DashboardPathSummary[];
}

interface AchievementItem {
  id: string;
  name: string;
  titleAr: string;
  category: string;
  xpReward: number;
  unlocked: boolean;
  earnedAt?: string | null;
}

export default function ProfilePage() {
  const { language: lang } = useI18n();
  const isAr = lang === "ar";

  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [dash, setDash] = useState<DashboardResponse | null>(null);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [profRes, dashRes, achRes] = await Promise.all([
          apiClient.get<UserProfileResponse>("/api/users/me/profile"),
          apiClient.get<DashboardResponse>("/api/progress/dashboard"),
          apiClient.get<{ achievements: AchievementItem[] }>("/api/achievements/my")
        ]);
        if (!active) return;
        setProfile(profRes.data);
        setDash(dashRes.data);
        setAchievements((achRes.data?.achievements || []).filter((a) => a.unlocked));
      } catch (err: any) {
        if (active) setError(err?.response?.data?.message || (isAr ? "تعذر تحميل الملف الشخصي." : "Could not load user profile."));
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [isAr]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-9 w-9 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 md:p-8 max-w-6xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Profile Identity Header */}
      <Card className="border-white/10 bg-card/60">
        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0">
              <UserIcon className="h-8 w-8" />
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold">
                  {profile?.fullName || profile?.username || "Learner"}
                </h1>
                {(profile?.roles || []).map((r) => (
                  <Badge key={r} variant="secondary" className="text-xs">{r}</Badge>
                ))}
                {profile?.subscription && (
                  <Badge variant="outline" className="gap-1 text-xs border-amber-500/40 text-amber-300">
                    <Crown className="h-3 w-3" />
                    {profile.subscription.planName}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                @{profile?.username} • {profile?.email}
              </p>
              {profile?.bio && (
                <p className="text-sm text-slate-300 max-w-2xl pt-1">{profile.bio}</p>
              )}
              {profile?.createdAt && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {isAr ? "عضو منذ " : "Joined "}
                    {new Date(profile.createdAt).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>

          <Button asChild variant="outline">
            <Link href="/settings">
              <Settings className="h-4 w-4 me-2" />
              {isAr ? "تعديل الملف الشخصي" : "Edit Profile & Settings"}
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-white/10 bg-card/60">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{isAr ? "نقاط الخبرة والمستوى" : "XP & Rank"}</p>
              <p className="text-2xl font-bold mt-1">{(dash?.totalXp ?? 0).toLocaleString()} XP</p>
              <p className="text-xs text-indigo-400">{dash?.level || "Beginner"}</p>
            </div>
            <Sparkles className="h-7 w-7 text-indigo-400" />
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/60">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{isAr ? "الوحدات المنجزة" : "Completed Units"}</p>
              <p className="text-2xl font-bold mt-1">
                {dash?.completedUnitsCount ?? 0} / {dash?.totalUnitsCount ?? 0}
              </p>
            </div>
            <BookOpen className="h-7 w-7 text-emerald-400" />
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/60">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{isAr ? "سلسلة التعلّم" : "Study Streak"}</p>
              <p className="text-2xl font-bold mt-1">
                {dash?.currentStreak ?? 0} {isAr ? "يوم" : "days"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isAr ? `الأطول: ${dash?.longestStreak ?? 0}` : `Best: ${dash?.longestStreak ?? 0}`}
              </p>
            </div>
            <Flame className="h-7 w-7 text-orange-400" />
          </CardContent>
        </Card>
      </div>

      {/* Real Track Proficiency Bars & Earned Badges */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-white/10 bg-card/60">
          <CardHeader>
            <CardTitle className="text-lg">
              {isAr ? "التقدم الفعلي عبر المسارات" : "Curriculum Path Proficiency"}
            </CardTitle>
            <CardDescription>
              {isAr ? "نسب الإتقان المحسوبة مباشرة من الوحدات المكتملة." : "Live mastery percentages computed from persisted unit completions."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(dash?.pathSummaries || []).map((p) => (
              <div key={p.id} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{pickLocalized(p.title, lang)}</span>
                  <span className="text-muted-foreground">
                    {p.completedUnits}/{p.totalUnits} ({Math.round(p.progressPercent)}%)
                  </span>
                </div>
                <Progress value={p.progressPercent} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/60">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-400" />
                {isAr ? "الأوسمة المكتسبة" : "Unlocked Achievements"}
              </CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link href="/achievements">{isAr ? "عرض الكل" : "View All"}</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {achievements.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {isAr ? "لم تكتسب أوسمة بعد: أكمل وحداتك الأولى لفتح الإنجازات!" : "No badges earned yet. Complete your first learning unit to earn your first badge!"}
              </p>
            ) : (
              <div className="space-y-3">
                {achievements.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-lg border border-amber-500/20 bg-amber-950/10 p-3"
                  >
                    <div>
                      <p className="text-sm font-semibold">{isAr ? a.titleAr : a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.category}</p>
                    </div>
                    <Badge variant="secondary" className="bg-amber-500/15 text-amber-300">
                      +{a.xpReward} XP
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
