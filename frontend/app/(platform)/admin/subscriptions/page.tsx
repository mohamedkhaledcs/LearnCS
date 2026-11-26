"use client";

import React, { useCallback, useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/auth-context";
import { useI18n } from "@/lib/i18n/i18n-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  Crown,
  CheckCircle2,
  XCircle,
  Clock,
  Edit3,
  Loader2,
  Users
} from "lucide-react";

interface AdminPlanDto {
  id: string;
  name: string;
  badge?: string | null;
  descriptionEn?: string;
  descriptionAr?: string;
  price: number;
  monthlyPrice?: number;
  originalMonthlyPrice?: number | null;
  annualPrice: number;
  originalAnnualPrice?: number | null;
  features: string[];
  featuresEn?: string[];
  featuresAr: string[];
  isPopular?: boolean;
  isActive?: boolean;
  displayOrder?: number;
  subscribersCount: number;
  pendingRequestsCount: number;
}

interface PendingRequestDto {
  id: string;
  userId: string;
  username?: string;
  email?: string;
  userEmail?: string;
  planId: string;
  planName?: string;
  previousActivePlanId?: string | null;
  billingInterval: string;
  notes?: string | null;
  requestedAt?: string;
  createdAt?: string;
}

interface SubHistoryDto {
  id: string;
  userId?: string;
  username?: string;
  planId: string;
  action: string;
  status: string;
  billingInterval: string;
  notes?: string | null;
  createdAt: string;
}

export default function AdminSubscriptionsPage() {
  const { user } = useAuth();
  const { language: lang } = useI18n();
  const isAr = lang === "ar";
  const isSuperAdmin = Boolean(user?.roles?.includes("SuperAdmin"));

  const [plans, setPlans] = useState<AdminPlanDto[]>([]);
  const [pending, setPending] = useState<PendingRequestDto[]>([]);
  const [history, setHistory] = useState<SubHistoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Plan editor (SuperAdmin)
  const [editPlan, setEditPlan] = useState<AdminPlanDto | null>(null);
  const [planName, setPlanName] = useState("");
  const [planDescEn, setPlanDescEn] = useState("");
  const [planDescAr, setPlanDescAr] = useState("");
  const [monthlyPrice, setMonthlyPrice] = useState("0");
  const [annualPrice, setAnnualPrice] = useState("0");
  const [badgeText, setBadgeText] = useState("");
  const [planIsPopular, setPlanIsPopular] = useState(false);
  const [planIsActive, setPlanIsActive] = useState(true);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [pRes, hRes] = await Promise.all([
        apiClient.get<AdminPlanDto[]>("/api/admin/subscriptions"),
        apiClient.get<{ pendingRequests: PendingRequestDto[]; history: SubHistoryDto[] }>(
          "/api/admin/subscriptions/history"
        )
      ]);
      setPlans(pRes.data || []);
      setPending(hRes.data?.pendingRequests || []);
      setHistory(hRes.data?.history || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load subscription management data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const handleDecision = async (req: PendingRequestDto, approve: boolean) => {
    setActing(req.id || req.userId);
    setFeedback(null);
    setError(null);
    try {
      if (req.id) {
        const endpoint = approve
          ? `/api/admin/subscriptions/requests/${req.id}/approve`
          : `/api/admin/subscriptions/requests/${req.id}/reject`;
        await apiClient.post(endpoint, {
          note: approve ? "Approved by Admin" : "Rejected by Admin"
        });
      } else {
        const planLabel = req.planName || req.planId.replace("plan-", "");
        await apiClient.put(`/api/admin/users/${req.userId}/subscription`, {
          plan: approve ? planLabel : "Free",
          status: approve ? "Active" : "Cancelled",
          billingInterval: req.billingInterval || "Monthly",
          note: approve ? "Approved by Admin" : "Rejected by Admin"
        });
      }
      setFeedback(approve ? "Upgrade request approved and activated." : "Upgrade request rejected; active plan preserved.");
      await loadAll();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to process subscription request.");
    } finally {
      setActing(null);
    }
  };

  const handleSavePlan = async () => {
    if (!editPlan) return;
    setActing(editPlan.id);
    setError(null);
    setFeedback(null);
    try {
      await apiClient.put(`/api/admin/subscriptions/plans/${editPlan.id}`, {
        name: planName.trim() || editPlan.name,
        badge: badgeText.trim() || null,
        descriptionEn: planDescEn.trim() || editPlan.descriptionEn || editPlan.name,
        descriptionAr: planDescAr.trim() || editPlan.descriptionAr || editPlan.name,
        monthlyPrice: Number(monthlyPrice),
        originalMonthlyPrice: editPlan.originalMonthlyPrice ?? null,
        annualPrice: Number(annualPrice),
        originalAnnualPrice: editPlan.originalAnnualPrice ?? null,
        featuresEn: editPlan.featuresEn || editPlan.features || [],
        featuresAr: editPlan.featuresAr || [],
        isPopular: planIsPopular,
        isActive: planIsActive,
        displayOrder: editPlan.displayOrder ?? 1
      });
      setEditPlan(null);
      setFeedback("Subscription plan pricing and metadata updated.");
      await loadAll();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not update plan.");
    } finally {
      setActing(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-9 w-9 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8" dir={isAr ? "rtl" : "ltr"}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {isAr ? "إدارة خطط الاشتراك وطلبات الترقية" : "Subscription Plans & Upgrade Approvals"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {isAr
            ? "راجع طلبات الترقية المدفوعة، وفعّل الاشتراكات، وحدّث أسعار الباقات الأربع."
            : "Review pending upgrade requests, track subscription audit events, and configure the 4 tiers."}
        </p>
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

      {/* 4 Plans Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((p) => (
          <Card key={p.id} className="border-white/10 bg-card/60">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-1.5">
                  <Crown className="h-4 w-4 text-amber-400" />
                  {p.name}
                </CardTitle>
                {p.badge && <Badge variant="outline" className="text-[10px]">{p.badge}</Badge>}
              </div>
              <CardDescription>
                ${p.price}/mo • ${p.annualPrice}/yr
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  {isAr ? "المشتركون:" : "Subscribers:"}
                </span>
                <span className="font-semibold">{p.subscribersCount}</span>
              </div>
              {p.pendingRequestsCount > 0 && (
                <Badge variant="warning" className="text-[10px]">
                  {p.pendingRequestsCount} {isAr ? "طلب معلق" : "pending requests"}
                </Badge>
              )}
              {isSuperAdmin && (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setEditPlan(p);
                    setPlanName(p.name);
                    setPlanDescEn(p.descriptionEn || "");
                    setPlanDescAr(p.descriptionAr || "");
                    setMonthlyPrice(String(p.monthlyPrice ?? p.price));
                    setAnnualPrice(String(p.annualPrice));
                    setBadgeText(p.badge || "");
                    setPlanIsPopular(Boolean(p.isPopular));
                    setPlanIsActive(p.isActive ?? true);
                  }}
                >
                  <Edit3 className="h-3.5 w-3.5 me-1.5" />
                  {isAr ? "تعديل السعر والشارة" : "Edit Tier"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Upgrade Requests */}
      <Card className="border-amber-500/30 bg-card/60">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-400" />
            {isAr ? "طلبات الترقية بانتظار الموافقة" : "Pending Upgrade Requests"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pending.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {isAr ? "لا توجد طلبات معلقة حالياً." : "No pending upgrade requests at this time."}
            </p>
          ) : (
            pending.map((req) => (
              <div
                key={req.id || `${req.userId}-${req.planId}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-amber-500/20 bg-amber-950/10 p-4"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{req.username || req.userId}</span>
                    <Badge variant="outline">{req.planName || req.planId}</Badge>
                    <Badge variant="secondary">{req.billingInterval}</Badge>
                    {req.previousActivePlanId && (
                      <span className="text-xs text-muted-foreground">(from {req.previousActivePlanId})</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {req.userEmail || req.email} {req.notes ? `| ${req.notes}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    disabled={acting === (req.id || req.userId)}
                    onClick={() => handleDecision(req, true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 me-1.5" />
                    {isAr ? "موافقة وتفعيل" : "Approve"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={acting === (req.id || req.userId)}
                    onClick={() => handleDecision(req, false)}
                    className="border-destructive/40 text-destructive"
                  >
                    <XCircle className="h-3.5 w-3.5 me-1.5" />
                    {isAr ? "رفض" : "Reject"}
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Subscription Audit History */}
      <Card className="border-white/10 bg-card/60">
        <CardHeader>
          <CardTitle className="text-lg">
            {isAr ? "سجل الاشتراكات الكامل" : "Subscription Event History"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 max-h-[340px] overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground">No subscription events recorded yet.</p>
          ) : (
            history.map((h) => (
              <div
                key={h.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/5 bg-background/40 px-3.5 py-2.5 text-xs"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{h.action}</Badge>
                  <span className="font-medium">{h.username || h.userId}</span>
                  <span className="text-muted-foreground">→ {h.planId} ({h.billingInterval})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={h.status === "Active" ? "success" : "warning"} className="text-[10px]">
                    {h.status}
                  </Badge>
                  <span className="text-muted-foreground">{new Date(h.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* SuperAdmin Edit Plan Modal */}
      <Modal
        isOpen={Boolean(editPlan)}
        onClose={() => setEditPlan(null)}
        title={editPlan ? `Edit Plan: ${editPlan.name}` : ""}
      >
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium">Plan Name</label>
              <Input value={planName} onChange={(e) => setPlanName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium">Marketing Badge</label>
              <Input value={badgeText} onChange={(e) => setBadgeText(e.target.value)} placeholder="e.g. Most Popular" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium">Description (EN)</label>
            <Input value={planDescEn} onChange={(e) => setPlanDescEn(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium">Description (AR)</label>
            <Input value={planDescAr} onChange={(e) => setPlanDescAr(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium">Monthly Price ($)</label>
              <Input type="number" step="0.01" value={monthlyPrice} onChange={(e) => setMonthlyPrice(e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium">Annual Price ($)</label>
              <Input type="number" step="0.01" value={annualPrice} onChange={(e) => setAnnualPrice(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <label className="flex items-center gap-1.5">
              <input type="checkbox" checked={planIsPopular} onChange={(e) => setPlanIsPopular(e.target.checked)} />
              Highlight Popular
            </label>
            <label className="flex items-center gap-1.5">
              <input type="checkbox" checked={planIsActive} onChange={(e) => setPlanIsActive(e.target.checked)} />
              Plan Active
            </label>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setEditPlan(null)}>Cancel</Button>
            <Button onClick={handleSavePlan} className="bg-indigo-600 text-white">Save Tier Pricing</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
