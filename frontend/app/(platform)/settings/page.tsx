"use client";

import React, { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client";
import { useI18n } from "@/lib/i18n/i18n-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Globe,
  Shield
} from "lucide-react";

export default function SettingsPage() {
  const { language: lang, setLanguage: setLang } = useI18n();
  const isAr = lang === "ar";

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState<"en" | "ar">(lang);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [savingPass, setSavingPass] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [profRes, settRes] = await Promise.all([
          apiClient.get<{ fullName?: string; bio?: string; preferredLanguage?: string }>("/api/users/me/profile"),
          apiClient.get<{ preferredLanguage?: string }>("/api/users/me/settings").catch(() => null)
        ]);
        if (!active) return;
        setFullName(profRes.data.fullName || "");
        setBio(profRes.data.bio || "");
        const serverLang = settRes?.data?.preferredLanguage || profRes.data.preferredLanguage;
        if (serverLang === "ar" || serverLang === "en") {
          setPreferredLanguage(serverLang);
        }
      } catch (err: any) {
        if (active) {
          setStatusMsg({
            type: "error",
            text: err?.response?.data?.message || (isAr ? "تعذر تحميل الإعدادات." : "Could not load account settings.")
          });
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [isAr]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setStatusMsg(null);
    try {
      await apiClient.put("/api/users/me/profile", { fullName, bio });
      setStatusMsg({
        type: "success",
        text: isAr ? "تم حفظ بيانات الملف الشخصي بنجاح." : "Profile details updated in database."
      });
    } catch (err: any) {
      setStatusMsg({
        type: "error",
        text: err?.response?.data?.message || (isAr ? "تعذر حفظ الملف الشخصي." : "Failed to save profile.")
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSavePreferences = async () => {
    setSavingPrefs(true);
    setStatusMsg(null);
    try {
      await apiClient.put("/api/users/me/settings", { preferredLanguage });
      setLang(preferredLanguage);
      setStatusMsg({
        type: "success",
        text: preferredLanguage === "ar" ? "تم حفظ اللغة وتفضيلات الواجهة." : "Language preference saved successfully."
      });
    } catch (err: any) {
      setStatusMsg({
        type: "error",
        text: err?.response?.data?.message || (isAr ? "تعذر حفظ التفضيلات." : "Failed to save preferences.")
      });
    } finally {
      setSavingPrefs(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    setSavingPass(true);
    setStatusMsg(null);
    try {
      await apiClient.put("/api/users/me/password", { currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setStatusMsg({
        type: "success",
        text: isAr ? "تم تحديث كلمة المرور بنجاح." : "Password updated successfully."
      });
    } catch (err: any) {
      setStatusMsg({
        type: "error",
        text: err?.response?.data?.message || (isAr ? "تأكد من كلمة المرور الحالية." : "Failed to update password. Check your current password.")
      });
    } finally {
      setSavingPass(false);
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
    <div className="space-y-8 p-6 md:p-8 max-w-4xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {isAr ? "إعدادات الحساب واللغة" : "Account & Platform Settings"}
        </h1>
        <p className="text-muted-foreground mt-1">
          {isAr ? "حدّث بياناتك الشخصية ولغة المنصة والأمان." : "Manage your personal details, language preference, and password."}
        </p>
      </div>

      {statusMsg && (
        <div
          className={`flex items-center gap-2.5 rounded-xl border p-4 text-sm ${
            statusMsg.type === "success"
              ? "border-emerald-500/40 bg-emerald-950/20 text-emerald-200"
              : "border-destructive/40 bg-destructive/10 text-destructive"
          }`}
        >
          {statusMsg.type === "success" ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Profile Form */}
      <Card className="border-white/10 bg-card/60">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-indigo-400" />
            {isAr ? "المعلومات الشخصية" : "Profile Information"}
          </CardTitle>
          <CardDescription>
            {isAr ? "الاسم الكامل والنبذة التعريفية." : "Public display name and short bio."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{isAr ? "الاسم الكامل" : "Full Name"}</label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={isAr ? "أدخل اسمك الكامل" : "Your full name"}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">{isAr ? "نبذة تعريفية" : "Bio"}</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder={isAr ? "اهتماماتك البرمجية..." : "Your learning goals and interests..."}
              />
            </div>

            <Button type="submit" disabled={savingProfile} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              {savingProfile && <Loader2 className="h-4 w-4 me-2 animate-spin" />}
              {isAr ? "حفظ المعلومات الشخصية" : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Language Preferences */}
      <Card className="border-white/10 bg-card/60">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-400" />
            {isAr ? "اللغة وتفضيلات العرض" : "Language & Localization"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant={preferredLanguage === "en" ? "default" : "outline"}
              className={preferredLanguage === "en" ? "bg-indigo-600 text-white" : ""}
              onClick={() => setPreferredLanguage("en")}
            >
              English (LTR)
            </Button>
            <Button
              type="button"
              variant={preferredLanguage === "ar" ? "default" : "outline"}
              className={preferredLanguage === "ar" ? "bg-indigo-600 text-white" : ""}
              onClick={() => setPreferredLanguage("ar")}
            >
              العربية (RTL)
            </Button>
          </div>

          <Button onClick={handleSavePreferences} disabled={savingPrefs} variant="outline">
            {savingPrefs && <Loader2 className="h-4 w-4 me-2 animate-spin" />}
            {isAr ? "حفظ تفضيل اللغة" : "Save Language Preference"}
          </Button>
        </CardContent>
      </Card>

      {/* Password Update */}
      <Card className="border-white/10 bg-card/60">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-400" />
            {isAr ? "تغيير كلمة المرور" : "Security & Password"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{isAr ? "كلمة المرور الحالية" : "Current Password"}</label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">{isAr ? "كلمة المرور الجديدة" : "New Password"}</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>

            <Button type="submit" disabled={savingPass} variant="outline">
              {savingPass && <Loader2 className="h-4 w-4 me-2 animate-spin" />}
              {isAr ? "تحديث كلمة المرور" : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
