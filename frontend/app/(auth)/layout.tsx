"use client";

import React from "react";
import { ParticleBackground } from "@/components/ui/particle-background";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils/utils";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { language, setLanguage, isRtl } = useI18n();

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-neutral-950 flex flex-col relative overflow-hidden">
      <ParticleBackground />

      <header className="relative z-20 w-full p-6 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft className={cn("w-4 h-4 me-2", isRtl && "rotate-180")} />
          {language === "ar" ? "العودة للرئيسية" : "Back to Home"}
        </Link>

        <div
          role="group"
          aria-label="Language switcher"
          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 backdrop-blur-md"
          dir="ltr"
        >
          <button
            type="button"
            onClick={() => setLanguage("en")}
            aria-pressed={language === "en"}
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer",
              language === "en" ? "bg-indigo-600 text-white" : "text-neutral-400 hover:text-white"
            )}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage("ar")}
            aria-pressed={language === "ar"}
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer",
              language === "ar" ? "bg-indigo-600 text-white" : "text-neutral-400 hover:text-white"
            )}
          >
            AR
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 p-4">
        {children}
      </main>
    </div>
  );
}
