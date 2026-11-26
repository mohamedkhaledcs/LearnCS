"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";

type Language = "en" | "ar";

interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRtl: boolean;
  t: typeof translations.en;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Check local storage for saved language
    const saved = localStorage.getItem("learncs_lang") as Language;
    if (saved === "en" || saved === "ar") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("learncs_lang", lang);
    }
  };

  const isRtl = language === "ar";
  const t = translations[language];

  useEffect(() => {
    // Automatically apply dir attribute to document root
    if (typeof document !== "undefined") {
      document.documentElement.dir = isRtl ? "rtl" : "ltr";
      document.documentElement.lang = language;
    }
  }, [isRtl, language]);

  // Global Keyboard Shortcut for Language Toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input, textarea, select, editor or contenteditable
      const target = e.target as HTMLElement | null;
      if (
        target instanceof HTMLInputElement || 
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target?.isContentEditable ||
        target?.getAttribute("role") === "textbox" ||
        target?.closest("input, textarea, select, [contenteditable='true'], .monaco-editor")
      ) {
        return;
      }
      
      if (e.key === "L" || e.key === "l" || e.key === "م") {
        setLanguageState((prev) => {
          const newLang = prev === "en" ? "ar" : "en";
          localStorage.setItem("learncs_lang", newLang);
          if (typeof document !== "undefined") {
            document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
            document.documentElement.lang = newLang;
          }
          return newLang;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <I18nContext.Provider value={{ language, setLanguage, isRtl, t }}>
      {children}
    </I18nContext.Provider>
  );
}
