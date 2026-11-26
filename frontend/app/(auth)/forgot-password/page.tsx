"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldAlert, Settings, HelpCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";

export default function ForgotPasswordPage() {
  const { t, isRtl } = useI18n();

  return (
    <motion.div
      dir={isRtl ? "rtl" : "ltr"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl"
    >
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-amber-400">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white mb-2">{t.auth.forgotTitle}</h1>
        <p className="text-sm text-neutral-400">{t.auth.forgotSubtitle}</p>
      </div>

      <div className="rounded-2xl border border-amber-500/25 bg-amber-950/20 p-5 text-sm text-amber-100/90 space-y-3 mb-6">
        <p className="font-semibold text-amber-300">{t.auth.forgotNoticeTitle}</p>
        <p className="leading-relaxed text-neutral-300">{t.auth.forgotNoticeBody}</p>
      </div>

      <div className="space-y-3">
        <Button asChild className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white">
          <Link href="/settings">
            <Settings className="w-4 h-4 me-2" />
            {t.auth.forgotGoSettings}
          </Link>
        </Button>

        <Button asChild variant="outline" className="w-full h-11 border-white/10 bg-white/5 hover:bg-white/10 text-white">
          <Link href="/help">
            <HelpCircle className="w-4 h-4 me-2" />
            {t.auth.forgotGoHelp}
          </Link>
        </Button>
      </div>

      <div className="mt-8 text-center text-sm text-neutral-400">
        {t.auth.rememberPassword}{" "}
        <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
          {t.auth.returnToLogin}
        </Link>
      </div>
    </motion.div>
  );
}
