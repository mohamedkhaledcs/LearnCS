"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { useI18n } from "@/lib/i18n/i18n-context";

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup, isAuthenticated } = useAuth();
  const { t, isRtl } = useI18n();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
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
      await signup(name, email, password);
      localStorage.setItem("learncs_auth", "true");
      const redirect = searchParams.get("redirect") || "/dashboard";
      router.push(redirect);
    } catch (err: any) {
      setError(err?.message || t.auth.signupError);
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
        <h1 className="text-3xl font-black text-white mb-2">{t.auth.signupTitle}</h1>
        <p className="text-neutral-400">{t.auth.signupSubtitle}</p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">{t.auth.nameLabel}</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ahmed_dev"
            className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">{t.auth.emailOnlyLabel}</label>
          <input
            type="email"
            required
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-left"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">{t.auth.passwordLabel}</label>
          <input
            type="password"
            required
            dir="ltr"
            minLength={6}
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
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t.auth.signupBtn}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-neutral-400">
        {t.auth.hasAccount}{" "}
        <Link
          href={`/login${searchParams.get("redirect") ? `?redirect=${searchParams.get("redirect")}` : ""}`}
          className="text-indigo-400 hover:text-indigo-300 font-medium"
        >
          {t.auth.loginBtn}
        </Link>
      </div>
    </motion.div>
  );
}

export default function SignupPage() {
  return (
    <React.Suspense fallback={<div className="flex justify-center items-center h-[50vh]"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>}>
      <SignupContent />
    </React.Suspense>
  );
}
