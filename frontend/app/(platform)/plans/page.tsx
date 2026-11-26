"use client";

import React, { useCallback, useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client";
import { useI18n } from "@/lib/i18n/i18n-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Check,
  Crown,
  Sparkles,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
  History
} from "lucide-react";

interface PlanDto {
  id: string;
  name: string;
  badge?: string | null;
  descriptionEn: string;
  descriptionAr: string;
  monthlyPrice: number;
  originalMonthlyPrice?: number | null;
  annualPrice: number;
  originalAnnualPrice?: number | null;
  featuresEn: string[];
  featuresAr: string[];
  isPopular: boolean;
  displayOrder: number;
}

interface PendingRequestDto {
  id: string;
  requestedPlanId: string;
  requestedPlanName: string;
  billingInterval: string;
  status: string;
  notes?: string | null;
  createdAt: string;
}

interface SubscriptionHistoryDto {
  id: string;
  planId: string;
  previousPlanId?: string | null;
  action: string;
  billingInterval: string;
  status: string;
  notes?: string | null;
  createdAt: string;
}

interface MySubscriptionDto {
  planId: string;
  planName: string;
  status: string;
  billingInterval: string;
  paymentStatus: string;
  startedAt?: string | null;
  expiresAt?: string | null;
  notes?: string | null;
  pendingRequest?: PendingRequestDto | null;
  history: SubscriptionHistoryDto[];
}

export default function PlansPage() {
  const { language: lang } = useI18n();
  const isAr = lang === "ar";

  const [plans, setPlans] = useState<PlanDto[]>([]);
  const [mySub, setMySub] = useState<MySubscriptionDto | null>(null);
  const [interval, setInterval] = useState<"Monthly" | "Annual">("Monthly");
  const [loading, setLoading] = useState(true);
  const [actingPlanId, setActingPlanId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "info" | "error"; text: string } | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [plansRes, myRes] = await Promise.all([
        apiClient.get<PlanDto[]>("/api/subscriptions/plans"),
        apiClient.get<MySubscriptionDto>("/api/subscriptions/my")
      ]);
      setPlans(plansRes.data || []);
      setMySub(myRes.data || null);
    } catch (err: any) {
      setFeedback({
        type: "error",
        text: err?.response?.data?.message || (isAr ? "تعذر تحميل خطط الاشتراك." : "Could not load subscription plans.")
      });
    } finally {
      setLoading(false);
    }
  }, [isAr]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSelectPlan = async (planId: string) => {
    if (actingPlanId) return; // Prevent double-click submissions
    setActingPlanId(planId);
    setFeedback(null);
    try {
      const res = await apiClient.post<{
        planId: string;
        planName?: string;
        status: string;
        paymentRequired?: boolean;
        duplicatePrevented?: boolean;
        alreadyActive?: boolean;
        message?: string;
      }>("/api/subscriptions/select", {
        planId,
        billingInterval: interval,
        note: `Requested via Plans UI (${interval})`
      });

      if (res.data.alreadyActive) {
        setFeedback({
          type: "info",
          text: isAr ? "هذه الخطة مفعلة على حسابك بالفعل." : (res.data.message || "This plan is already active.")
        });
      } else if (res.data.paymentRequired) {
        setFeedback({
          type: "info",
          text: res.data.duplicatePrevented
            ? (isAr ? "لديك بالفعل طلب ترقية معلق لهذه الخطة قيد المراجعة." : res.data.message || "An identical pending request already exists.")
            : (isAr
                ? `تم تسجيل طلب الترقية الأحدث إلى (${res.data.planName || planId}) بنجاح وإلغاء أي طلب سابق معلق، مع بقاء اشتراكك الحالي سارياً حتى الموافقة.`
                : res.data.message || "Latest upgrade request recorded. Any previous pending request was replaced, and your active subscription stays intact until Admin approval.")
        });
      } else {
        setFeedback({
          type: "success",
          text: isAr ? "تم تفعيل الخطة المجانية بنجاح." : (res.data.message || "Plan activated successfully.")
        });
      }
      await loadData();
    } catch (err: any) {
      setFeedback({
        type: "error",
        text: err?.response?.data?.message || (isAr ? "تعذر تحديث الخطة." : "Failed to select subscription plan.")
      });
    } finally {
      setActingPlanId(null);
    }
  };

  const handleCancelPendingRequest = async () => {
    if (actingPlanId) return;
    setActingPlanId("cancel-req");
    setFeedback(null);
    try {
      await apiClient.post("/api/subscriptions/cancel-request");
      setFeedback({
        type: "success",
        text: isAr ? "تم إلغاء طلب الترقية المعلق مع الإبقاء على اشتراكك الحالي." : "Pending upgrade request cancelled; your current active plan remains untouched."
      });
      await loadData();
    } catch (err: any) {
      setFeedback({
        type: "error",
        text: err?.response?.data?.message || (isAr ? "تعذر إلغاء الطلب المعلق." : "Could not cancel pending request.")
      });
    } finally {
      setActingPlanId(null);
    }
  };

  const handleCancelPaid = async () => {
    if (actingPlanId) return;
    setActingPlanId("cancel");
    setFeedback(null);
    try {
      await apiClient.post("/api/subscriptions/cancel");
      setFeedback({
        type: "success",
        text: isAr ? "تم إلغاء الاشتراك والعودة إلى الخطة المجانية." : "Subscription cancelled and reverted to Free plan."
      });
      await loadData();
    } catch (err: any) {
      setFeedback({
        type: "error",
        text: err?.response?.data?.message || (isAr ? "تعذر إلغاء الاشتراك." : "Could not cancel subscription.")
      });
    } finally {
      setActingPlanId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-9 w-9 animate-spin text-indigo-500" />
      </div>
    );
  }

  const pendingReq = mySub?.pendingRequest;

  return (
    <div className="space-y-8 p-6 md:p-8 max-w-7xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge variant="secondary" className="mb-2 bg-indigo-500/10 text-indigo-400">
            <Crown className="h-3.5 w-3.5 me-1.5" />
            {isAr ? "خطط الاشتراك والتعلم" : "Subscription Plans"}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">
            {isAr ? "اختر الخطة المناسبة لرحلتك" : "Choose Your Learning Plan"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isAr
              ? "ابدأ مجاناً بالأساسيات، أو اطلب الترقية لفتح جميع المسارات المتقدمة والمحاكاة التفاعلية."
              : "Start free on foundational units, or submit a plan upgrade request (one active request at a time)."}
          </p>
        </div>

        {/* Interval Switcher */}
        <div className="inline-flex rounded-lg border border-white/10 bg-card p-1">
          <button
            type="button"
            onClick={() => setInterval("Monthly")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              interval === "Monthly" ? "bg-indigo-600 text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {isAr ? "شهري" : "Monthly"}
          </button>
          <button
            type="button"
            onClick={() => setInterval("Annual")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              interval === "Annual" ? "bg-indigo-600 text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {isAr ? "سنوي (وفر أكثر)" : "Annual (Save More)"}
          </button>
        </div>
      </div>

      {/* Current Subscription + Pending Request Card */}
      {mySub && (
        <Card className="border-indigo-500/30 bg-card/70">
          <CardContent className="p-5 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {isAr ? "خطتك النشطة الحالية:" : "Active Subscription:"}
                  </span>
                  <Badge variant="default" className="bg-indigo-600">{mySub.planName}</Badge>
                  <Badge variant="success">{mySub.status}</Badge>
                  <Badge variant="outline">{mySub.billingInterval}</Badge>
                </div>
                {mySub.notes && <p className="text-xs text-muted-foreground">{mySub.notes}</p>}
              </div>

              {mySub.planId !== "plan-free" && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={Boolean(actingPlanId)}
                  onClick={handleCancelPaid}
                  className="border-destructive/40 text-destructive hover:bg-destructive/10"
                >
                  {actingPlanId === "cancel" ? <Loader2 className="h-3.5 w-3.5 me-2 animate-spin" /> : <XCircle className="h-3.5 w-3.5 me-2" />}
                  {isAr ? "إلغاء الاشتراك والعودة للمجانية" : "Revert to Free Plan"}
                </Button>
              )}
            </div>

            {pendingReq && (
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <span className="text-sm font-semibold text-amber-200">
                      {isAr ? "طلب ترقية معلق حالياً:" : "Active Pending Upgrade Request:"}
                    </span>
                    <Badge variant="warning">{pendingReq.requestedPlanName}</Badge>
                    <Badge variant="outline">{pendingReq.billingInterval}</Badge>
                  </div>
                  <p className="text-xs text-amber-200/80">
                    {isAr
                      ? "اختيار خطة جديدة سيستبدل هذا الطلب المعلق تلقائياً، ولن يؤثر على اشتراكك النشط الحالي حتى يتم الاعتماد."
                      : "Selecting another plan replaces this single pending request automatically. Your current active plan stays active until review."}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={Boolean(actingPlanId)}
                  onClick={handleCancelPendingRequest}
                  className="border-amber-500/40 text-amber-200 hover:bg-amber-900/30 shrink-0"
                >
                  {actingPlanId === "cancel-req" ? <Loader2 className="h-3.5 w-3.5 me-1.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5 me-1.5" />}
                  {isAr ? "إلغاء الطلب المعلق" : "Cancel Pending Request"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {feedback && (
        <div
          className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
            feedback.type === "success"
              ? "border-emerald-500/40 bg-emerald-950/20 text-emerald-200"
              : feedback.type === "info"
              ? "border-amber-500/40 bg-amber-950/20 text-amber-200"
              : "border-destructive/40 bg-destructive/10 text-destructive"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => {
          const isCurrent =
            mySub?.planId === plan.id &&
            mySub?.status === "Active" &&
            (plan.monthlyPrice === 0 || mySub?.billingInterval.toLowerCase() === interval.toLowerCase());
          const isPendingThis =
            pendingReq?.requestedPlanId === plan.id &&
            pendingReq?.billingInterval.toLowerCase() === interval.toLowerCase();
          const price = interval === "Annual" ? plan.annualPrice : plan.monthlyPrice;
          const origPrice = interval === "Annual" ? plan.originalAnnualPrice : plan.originalMonthlyPrice;
          const features = isAr ? plan.featuresAr : plan.featuresEn;

          return (
            <Card
              key={plan.id}
              className={`flex flex-col justify-between border transition-all ${
                plan.isPopular
                  ? "border-indigo-500 bg-indigo-950/15 shadow-lg shadow-indigo-500/10"
                  : isCurrent
                  ? "border-emerald-500/50 bg-emerald-950/10"
                  : isPendingThis
                  ? "border-amber-500/50 bg-amber-950/10"
                  : "border-white/10 bg-card/60"
              }`}
            >
              <div>
                <CardHeader>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    {plan.badge && (
                      <Badge variant={plan.isPopular ? "default" : "outline"} className="text-[11px]">
                        <Sparkles className="h-3 w-3 me-1" />
                        {plan.badge}
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    {isAr ? plan.descriptionAr : plan.descriptionEn}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">
                      {price === 0 ? (isAr ? "مجاني" : "Free") : `$${price}`}
                    </span>
                    {price > 0 && (
                      <span className="text-xs text-muted-foreground">
                        /{interval === "Annual" ? (isAr ? "سنة" : "year") : (isAr ? "شهر" : "mo")}
                      </span>
                    )}
                    {origPrice && origPrice > price && (
                      <span className="text-xs line-through text-muted-foreground">${origPrice}</span>
                    )}
                  </div>

                  <ul className="space-y-2.5 text-sm">
                    {features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>

              <CardFooter className="pt-4">
                <Button
                  className={`w-full ${
                    isCurrent
                      ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/40"
                      : plan.isPopular && !isPendingThis
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : ""
                  }`}
                  variant={isCurrent || isPendingThis ? "outline" : plan.isPopular ? "default" : "outline"}
                  disabled={isCurrent || isPendingThis || Boolean(actingPlanId)}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {actingPlanId === plan.id ? (
                    <Loader2 className="h-4 w-4 me-2 animate-spin" />
                  ) : isCurrent ? (
                    <CheckCircle2 className="h-4 w-4 me-2" />
                  ) : isPendingThis ? (
                    <Clock className="h-4 w-4 me-2" />
                  ) : null}
                  {isCurrent
                    ? (isAr ? "خطتك النشطة الحالية" : "Current Active Plan")
                    : isPendingThis
                    ? (isAr ? "طلب قيد المراجعة" : "Pending Admin Review")
                    : plan.monthlyPrice === 0
                    ? (isAr ? "التفعيل مجاناً" : "Activate Free Plan")
                    : pendingReq
                    ? (isAr ? "استبدال الطلب لهذه الخطة" : "Switch Request to This Plan")
                    : (isAr ? "طلب الترقية لهذه الخطة" : "Request Plan Upgrade")}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Subscription History Table */}
      {mySub && mySub.history.length > 0 && (
        <Card className="border-white/10 bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <History className="h-5 w-5 text-indigo-400" />
              {isAr ? "سجل تغييرات الاشتراك" : "Subscription Activity History"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mySub.history.map((h) => (
              <div
                key={h.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/5 bg-background/40 px-4 py-2.5 text-sm"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{h.action}</Badge>
                  <span className="font-medium">{h.planId}</span>
                  <span className="text-xs text-muted-foreground">({h.billingInterval})</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Badge variant={h.status === "Active" ? "success" : "warning"} className="text-[10px]">
                    {h.status}
                  </Badge>
                  <span>{new Date(h.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
