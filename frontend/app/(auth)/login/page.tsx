"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { useI18n } from "@/lib/i18n/i18n-context";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated } = useAuth();
  const { t, isRtl } = useI18n();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get("redirect") || "/dashboard";
      router.replace(redirect);
    }
  }, [isAuthenticated, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      localStorage.setItem("learncs_auth", "true");
      const redirect = searchParams.get("redirect") || "/dashboard";
      router.push(redirect);
    } catch (err: any) {
      setError(err?.message || t.auth.loginError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      dir={isRtl ? "rtl" : "ltr"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-white mb-2">{t.auth.loginTitle}</h1>
        <p className="text-neutral-400">{t.auth.loginSubtitle}</p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">{t.auth.emailLabel}</label>
          <input
            type="text"
            required
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-left"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-neutral-300">{t.auth.passwordLabel}</label>
            <Link href="/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300">
              {t.auth.forgotLink}
            </Link>
          </div>
          <input
            type="password"
            required
            dir="ltr"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-left"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] mt-6"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t.auth.loginBtn}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-neutral-400">
        {t.auth.noAccount}{" "}
        <Link
          href={`/signup${searchParams.get("redirect") ? `?redirect=${searchParams.get("redirect")}` : ""}`}
          className="text-indigo-400 hover:text-indigo-300 font-medium"
        >
          {t.auth.signupBtn}
        </Link>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={<div className="flex justify-center items-center h-[50vh]"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>}>
      <LoginContent />
    </React.Suspense>
  );
}
