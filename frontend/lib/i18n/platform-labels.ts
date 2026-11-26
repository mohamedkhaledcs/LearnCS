export type LocalizedText = { en?: string | null; ar?: string | null } | string | null | undefined;

export function pickLocalized(val: LocalizedText, lang: "en" | "ar", fallback = ""): string {
  if (!val) return fallback;
  if (typeof val === "string") return val;
  if (lang === "ar") return val.ar || val.en || fallback;
  return val.en || val.ar || fallback;
}

export const CATEGORY_LABELS: Record<string, { en: string; ar: string }> = {
  All: { en: "All Tracks", ar: "جميع المسارات" },
  Foundations: { en: "Foundations", ar: "المسارات التأسيسية" },
  "Core Computer Science": { en: "Core Computer Science", ar: "علوم الحاسوب الأساسية" },
  "Applied Specializations": { en: "Applied Specializations", ar: "التخصصات التطبيقية" },
  "Problem Solving & Mastery": { en: "Problem Solving & Mastery", ar: "حل المشكلات والإتقان" }
};

export const DIFFICULTY_LABELS: Record<string, { en: string; ar: string }> = {
  beginner: { en: "Beginner", ar: "مبتدئ" },
  intermediate: { en: "Intermediate", ar: "متوسط" },
  advanced: { en: "Advanced", ar: "متقدم" }
};

export const SECTION_TYPE_LABELS: Record<string, { en: string; ar: string }> = {
  theory: { en: "Concept Explanation", ar: "شرح المفهوم" },
  code: { en: "Code Walkthrough", ar: "مثال تطبيقي بالكود" },
  interactive: { en: "Interactive Lab", ar: "المختبر التفاعلي" },
  example: { en: "Worked Example", ar: "مثال محلول" },
  pitfalls: { en: "Common Pitfalls", ar: "أخطاء شائعة وتنبيهات" },
  summary: { en: "Key Takeaways", ar: "ملخص وأفكار رئيسية" }
};
