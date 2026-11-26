"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api/client";
import { useI18n } from "@/lib/i18n/i18n-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  CreditCard,
  Activity,
  Shield,
  ArrowRight,
  Clock,
  Loader2,
  Layers
} from "lucide-react";

interface RecentUserMetric {
  id: string;
  username: string;
  email: string;
  fullName?: string | null;
  roles: string[];
  createdAt: string;
  isActive?: boolean;
}

interface AdminMetricsResponse {
  totalUsers: number;
  activeUsers: number;
  totalAssessments: number;
  recentUsers: RecentUserMetric[];
  curriculumStats?: {
    paths: number;
    units: number;
    sections: number;
    questions: number;
  };
  planDistribution?: {
    free: number;
    mini: number;
    ready: number;
    high: number;
    premium?: number;
    pendingApprovals: number;
  };
}

interface AuditLogEntry {
  id: string;
  action: string;
  entityType: string;
  entityId?: string | null;
  details?: string | null;
  userId?: string | null;
  createdAt: string;
}

export default function AdminOverviewPage() {
  const { language: lang } = useI18n();
  const isAr = lang === "ar";

  const [metrics, setMetrics] = useState<AdminMetricsResponse | null>(null);
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [mRes, lRes] = await Promise.all([
          apiClient.get<AdminMetricsResponse>("/api/admin/metrics"),
          apiClient.get<AuditLogEntry[] | { items?: AuditLogEntry[] }>("/api/admin/audit-logs").catch(() => null)
        ]);
        if (!active) return;
        setMetrics(mRes.data);
        const rawLogs = lRes?.data;
        if (Array.isArray(rawLogs)) setLogs(rawLogs);
        else if (rawLogs && Array.isArray(rawLogs.items)) setLogs(rawLogs.items);
      } catch (err: any) {
        if (active) setError(err?.response?.data?.message || (isAr ? "تعذر تحميل إحصائيات الإدارة." : "Could not load admin telemetry."));
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

  const dist = metrics?.planDistribution;
  const curr = metrics?.curriculumStats;

  return (
    <div className="space-y-8" dir={isAr ? "rtl" : "ltr"}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <Badge variant="secondary" className="mb-2 bg-indigo-500/10 text-indigo-300">
            <Shield className="h-3.5 w-3.5 me-1.5" />
            {isAr ? "لوحة تحكم مالك المنصة والإدارة" : "Platform Command & Telemetry"}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">
            {isAr ? "نظرة عامة على المنصة" : "Admin Overview"}
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/users">{isAr ? "إدارة المستخدمين" : "Manage Users"}</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/curriculum">{isAr ? "إدارة المناهج" : "Curriculum CMS"}</Link>
          </Button>
          <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Link href="/admin/subscriptions">{isAr ? "الخطط والترقيات" : "Subscriptions"}</Link>
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Top KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-white/10 bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {isAr ? "إجمالي المستخدمين" : "Total Users"}
            </CardTitle>
            <Users className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalUsers ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics?.activeUsers ?? 0} {isAr ? "حساب نشط" : "active accounts"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {isAr ? "حجم المنهج الحالي" : "Curriculum Scale"}
            </CardTitle>
            <Layers className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {curr?.paths ?? 0} {isAr ? "مسارات" : "Paths"} / {curr?.units ?? 0} {isAr ? "وحدة" : "Units"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {curr?.sections ?? 0} {isAr ? "قسم" : "sections"} • {curr?.questions ?? 0} {isAr ? "سؤال" : "questions"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {isAr ? "التقييمات المنجزة" : "Skill Assessments"}
            </CardTitle>
            <BookOpen className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalAssessments ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {isAr ? "محاولات التقييم التشخيصي" : "Diagnostic assessment completions"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {isAr ? "طلبات الترقية المعلقة" : "Pending Upgrades"}
            </CardTitle>
            <CreditCard className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dist?.pendingApprovals ?? 0}</div>
            <Button asChild variant="link" size="sm" className="px-0 h-auto text-xs text-amber-400 mt-1">
              <Link href="/admin/subscriptions">
                {isAr ? "مراجعة الطلبات" : "Review Requests"}
                <ArrowRight className="h-3 w-3 ms-1 rtl:rotate-180" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 4-Tier Plan Distribution */}
      {dist && (
        <Card className="border-white/10 bg-card/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{isAr ? "توزيع خطط الاشتراك (4 مستويات)" : "Subscription Plan Distribution"}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Free", val: dist.free, cls: "text-slate-300" },
              { label: "Mini", val: dist.mini, cls: "text-cyan-300" },
              { label: "Ready", val: dist.ready, cls: "text-indigo-300" },
              { label: "High", val: dist.high, cls: "text-amber-300" }
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-white/10 bg-background/40 p-3">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className={`text-xl font-bold mt-1 ${item.cls}`}>{item.val}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Users & Audit Logs */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-white/10 bg-card/60">
          <CardHeader>
            <CardTitle className="text-lg">{isAr ? "أحدث المسجلين" : "Recent Registrations"}</CardTitle>
            <CardDescription>{isAr ? "أحدث الحسابات مع أدوارها الفعلية." : "Latest users joined with assigned roles."}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {(metrics?.recentUsers || []).map((u) => (
              <div key={u.id} className="flex items-center justify-between gap-2 rounded-lg border border-white/5 bg-background/40 p-3">
                <div>
                  <p className="text-sm font-medium">{u.fullName || u.username}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
                <div className="flex flex-wrap gap-1 justify-end">
                  {(Array.isArray(u.roles) ? u.roles : [String(u.roles)]).map((role) => (
                    <Badge key={role} variant="secondary" className="text-[10px]">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/60">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-400" />
              {isAr ? "سجل نشاط النظام (Audit Logs)" : "Recent System Audit Logs"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 max-h-[380px] overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {isAr ? "لا توجد سجلات بعد." : "No audit logs recorded yet."}
              </p>
            ) : (
              logs.slice(0, 20).map((log) => (
                <div key={log.id} className="flex items-start justify-between gap-3 rounded-lg border border-white/5 bg-background/40 p-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">{log.action}</Badge>
                      <span className="font-medium text-indigo-300">{log.entityType}</span>
                    </div>
                    {log.details && <p className="text-muted-foreground">{log.details}</p>}
                  </div>
                  <span className="text-muted-foreground shrink-0 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(log.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
