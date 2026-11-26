"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { apiClient } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/auth-context";
import { useI18n } from "@/lib/i18n/i18n-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  Search,
  UserPlus,
  Shield,
  Crown,
  CheckCircle2,
  XCircle,
  Loader2,
  Edit3
} from "lucide-react";

interface AdminUserDto {
  id: string;
  username: string;
  email: string;
  fullName?: string | null;
  roles: string[];
  isActive: boolean;
  planId: string;
  plan: string;
  subscriptionStatus: string;
  completedUnits: number;
  createdAt: string;
}

const PLAN_OPTIONS = [
  { id: "plan-free", name: "Free" },
  { id: "plan-mini", name: "Mini" },
  { id: "plan-ready", name: "Ready" },
  { id: "plan-high", name: "High" }
];

const ROLE_OPTIONS = ["Learner", "ContentManager", "Admin", "SuperAdmin"];

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const { language: lang } = useI18n();
  const isAr = lang === "ar";
  const isSuperAdmin = Boolean(currentUser?.roles?.includes("SuperAdmin"));

  const [users, setUsers] = useState<AdminUserDto[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Create user modal state (SuperAdmin)
  const [createOpen, setCreateOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("Learner");
  const [newPlanId, setNewPlanId] = useState("plan-free");

  // Edit user modal state
  const [editing, setEditing] = useState<AdminUserDto | null>(null);
  const [editRole, setEditRole] = useState("Learner");
  const [editPlan, setEditPlan] = useState("Free");
  const [editStatus, setEditStatus] = useState("Active");
  const [editNote, setEditNote] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get<AdminUserDto[] | { items?: AdminUserDto[] }>("/api/admin/users");
      const raw = res.data;
      setUsers(Array.isArray(raw) ? raw : raw?.items || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || (isAr ? "تعذر تحميل قائمة المستخدمين." : "Failed to load users."));
    } finally {
      setLoading(false);
    }
  }, [isAr]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.fullName || "").toLowerCase().includes(q)
    );
  }, [users, search]);

  const openEditor = (u: AdminUserDto) => {
    setEditing(u);
    setEditRole((u.roles && u.roles[0]) || "Learner");
    setEditPlan(u.plan || "Free");
    setEditStatus(u.subscriptionStatus || "Active");
    setEditNote("");
  };

  const handleToggleActive = async (u: AdminUserDto) => {
    setFeedback(null);
    setError(null);
    try {
      await apiClient.put(`/api/admin/users/${u.id}/status`, { isActive: !u.isActive });
      setFeedback(`${u.username}: ${!u.isActive ? "Activated" : "Suspended"}`);
      await loadUsers();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not update user status.");
    }
  };

  const handleSaveUserEdits = async () => {
    if (!editing) return;
    setSaving(true);
    setError(null);
    setFeedback(null);
    try {
      if (isSuperAdmin && editRole !== (editing.roles?.[0] || "Learner")) {
        await apiClient.put(`/api/admin/users/${editing.id}/role`, { role: editRole });
      }
      await apiClient.put(`/api/admin/users/${editing.id}/subscription`, {
        plan: editPlan,
        status: editStatus,
        billingInterval: "Monthly",
        note: editNote || "Updated by Admin"
      });
      setEditing(null);
      setFeedback(isAr ? "تم تحديث بيانات المستخدم واشتراكه." : "User account and subscription updated.");
      await loadUsers();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not save user changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setFeedback(null);
    try {
      await apiClient.post("/api/admin/users", {
        username: newUsername,
        email: newEmail,
        password: newPassword,
        fullName: newFullName,
        role: newRole,
        planId: newPlanId
      });
      setCreateOpen(false);
      setNewUsername("");
      setNewEmail("");
      setNewFullName("");
      setNewPassword("");
      setFeedback(isAr ? "تم إنشاء الحساب بنجاح." : "New user created successfully.");
      await loadUsers();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create user.");
    } finally {
      setSaving(false);
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
    <div className="space-y-6" dir={isAr ? "rtl" : "ltr"}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isAr ? "إدارة المستخدمين والأدوار" : "User & Access Management"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isAr ? "تحكم في الحسابات، الأدوار، وحالات الاشتراك الفعلية." : "Manage platform accounts, RBAC roles, and subscription states."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative w-64">
            <Search className="h-4 w-4 absolute top-2.5 start-3 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isAr ? "بحث بالاسم أو البريد..." : "Search username or email..."}
              className="ps-9"
            />
          </div>

          {isSuperAdmin && (
            <Button onClick={() => setCreateOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <UserPlus className="h-4 w-4 me-2" />
              {isAr ? "إضافة مستخدم" : "Create User"}
            </Button>
          )}
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

      <Card className="border-white/10 bg-card/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            {filtered.length} {isAr ? "حساب" : "Accounts"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {filtered.map((u) => (
            <div
              key={u.id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-white/10 bg-background/40 p-4"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{u.fullName || u.username}</span>
                  <span className="text-xs text-muted-foreground">@{u.username}</span>
                  {(u.roles || []).map((r) => (
                    <Badge key={r} variant="secondary" className="text-[10px]">
                      <Shield className="h-2.5 w-2.5 me-1" />
                      {r}
                    </Badge>
                  ))}
                  <Badge variant={u.isActive ? "success" : "destructive"} className="text-[10px]">
                    {u.isActive ? (isAr ? "نشط" : "Active") : (isAr ? "معطل" : "Suspended")}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {u.email} • {u.completedUnits} {isAr ? "وحدات مكتملة" : "units completed"}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="gap-1 border-amber-500/30 text-amber-300">
                  <Crown className="h-3 w-3" />
                  {u.plan} ({u.subscriptionStatus})
                </Badge>

                <Button size="sm" variant="outline" onClick={() => openEditor(u)}>
                  <Edit3 className="h-3.5 w-3.5 me-1.5" />
                  {isAr ? "تعديل" : "Edit"}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleActive(u)}
                  className={u.isActive ? "text-amber-300 border-amber-500/30" : "text-emerald-300 border-emerald-500/30"}
                >
                  {u.isActive ? <XCircle className="h-3.5 w-3.5 me-1.5" /> : <CheckCircle2 className="h-3.5 w-3.5 me-1.5" />}
                  {u.isActive ? (isAr ? "تعطيل" : "Suspend") : (isAr ? "تفعيل" : "Activate")}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Edit User & Subscription Modal */}
      <Modal
        isOpen={Boolean(editing)}
        onClose={() => setEditing(null)}
        title={editing ? `${isAr ? "تعديل:" : "Manage:"} ${editing.username}` : ""}
        description={editing?.email}
      >
        <div className="space-y-4 pt-2">
          {isSuperAdmin && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium">{isAr ? "الدور الوظيفي (SuperAdmin فقط)" : "Assigned Role (SuperAdmin Only)"}</label>
              <select
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
                className="w-full rounded-md border border-input bg-slate-950 px-3 py-2 text-sm"
              >
                {ROLE_OPTIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium">{isAr ? "خطة الاشتراك" : "Subscription Tier"}</label>
            <select
              value={editPlan}
              onChange={(e) => setEditPlan(e.target.value)}
              className="w-full rounded-md border border-input bg-slate-950 px-3 py-2 text-sm"
            >
              {PLAN_OPTIONS.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium">{isAr ? "حالة الاشتراك" : "Subscription Status"}</label>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="w-full rounded-md border border-input bg-slate-950 px-3 py-2 text-sm"
            >
              {["Active", "PendingApproval", "Suspended", "Cancelled", "Expired"].map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium">{isAr ? "ملاحظة إدارية" : "Admin Note"}</label>
            <Input value={editNote} onChange={(e) => setEditNote(e.target.value)} placeholder="Optional audit note..." />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setEditing(null)}>{isAr ? "إلغاء" : "Cancel"}</Button>
            <Button disabled={saving} onClick={handleSaveUserEdits} className="bg-indigo-600 text-white">
              {saving && <Loader2 className="h-4 w-4 me-2 animate-spin" />}
              {isAr ? "حفظ التغييرات" : "Save Changes"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* SuperAdmin Create User Modal */}
      <Modal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        title={isAr ? "إنشاء حساب جديد" : "Create Platform Account"}
      >
        <form onSubmit={handleCreateUser} className="space-y-3 pt-2">
          <Input value={newFullName} onChange={(e) => setNewFullName(e.target.value)} placeholder="Full Name" required />
          <Input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="Username" required />
          <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Email" required />
          <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Temporary Password" minLength={6} required />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="rounded-md border border-input bg-slate-950 px-3 py-2 text-sm"
            >
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <select
              value={newPlanId}
              onChange={(e) => setNewPlanId(e.target.value)}
              className="rounded-md border border-input bg-slate-950 px-3 py-2 text-sm"
            >
              {PLAN_OPTIONS.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>{isAr ? "إلغاء" : "Cancel"}</Button>
            <Button type="submit" disabled={saving} className="bg-indigo-600 text-white">
              {saving && <Loader2 className="h-4 w-4 me-2 animate-spin" />}
              {isAr ? "إنشاء الحساب" : "Create User"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
