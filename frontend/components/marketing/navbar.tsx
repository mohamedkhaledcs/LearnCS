"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils/utils";
import { useI18n } from "@/lib/i18n/i18n-context";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t, language, setLanguage, isRtl } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      dir={isRtl ? "rtl" : "ltr"}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-neutral-950/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      )}
    >
      <Container>
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
              LearnCS
            </span>
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Compact EN / AR Language Switcher */}
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
                  "px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer",
                  language === "en"
                    ? "bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.45)]"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("ar")}
                aria-pressed={language === "ar"}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer",
                  language === "ar"
                    ? "bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.45)]"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                AR
              </button>
            </div>

            <Button asChild variant="ghost" className="hidden sm:flex text-neutral-300 hover:text-white">
              <Link href="/login">{t.nav.login}</Link>
            </Button>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-500 text-white border-none shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <Link href="/signup">{t.nav.signup}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
