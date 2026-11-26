"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/i18n-context";
import {
  HelpCircle,
  Keyboard,
  Search,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";

interface HelpSectionItem {
  id: string;
  category: "overview" | "curriculum" | "quizzes" | "navigation" | "interactive" | "account";
  title: { en: string; ar: string };
  content: { en: string; ar: string };
  badge?: { en: string; ar: string };
}

const HELP_ARTICLES: HelpSectionItem[] = [
  {
    id: "what-is-learncs",
    category: "overview",
    title: {
      en: "What is LearnCS?",
      ar: "ما هي منصة LearnCS؟"
    },
    content: {
      en: "LearnCS is a structured, canonical Computer Science learning platform built to take learners from zero coding background to deep algorithmic, systems, and software engineering mastery. It spans 9 learning paths, 28 modules, 40 canonical concepts, 48 reusable learning units, 266 guided sections, 480 question-bank items, and 19 interactive visual labs.",
      ar: "منصة LearnCS هي بيئة تعليمية متكاملة لعلوم الحاسوب تنقلك من الصفر حتى الإتقان العميق للخوارزميات والنظم وهندسة البرمجيات. يغطي المنهج 9 مسارات تعليمية و28 وحدة تنظيمية و40 مفهوماً موحداً و48 وحدة تعلم قابلة لإعادة الاستخدام موزعة على 266 قسماً تعليمياً و480 سؤالاً متوازناً و19 مختبراً بصرياً تفاعلياً."
    },
    badge: { en: "Core Architecture", ar: "المعمارية الأساسية" }
  },
  {
    id: "canonical-shared-units",
    category: "curriculum",
    title: {
      en: "How does the Canonical Graph & 7 Shared Units model work?",
      ar: "كيف يعمل الرسم البياني المعرفي والوحدات السبع المشتركة؟"
    },
    content: {
      en: "LearnCS avoids duplicated lessons. Foundational units such as Arrays, Binary Search Foundations, Complexity Foundations, Graph Traversal, and Recursion belong to canonical concepts referenced across multiple tracks (7 shared units in total). Completing Binary Search Foundations in Algorithms automatically grants full completion and mastery credit inside Competitive Programming.",
      ar: "ترفض المنصة تكرار الدروس نفسها عبر المسارات. الوحدات التأسيسية مثل المصفوفات وأساسيات البحث الثنائي وتحليل التعقيد والعبور في الرسوم والعودية (إجمالاً 7 وحدات مشتركة) تحتفظ بهوية موحدة. عند إتقان وحدة البحث الثنائي في مسار الخوارزميات، يُحتسب إنجازها فوراً في مسار البرمجة التنافسية تلقائياً."
    },
    badge: { en: "Unified Progress", ar: "تقدم موحد" }
  },
  {
    id: "five-track-areas",
    category: "curriculum",
    title: {
      en: "How are the 9 Learning Paths organized on the Roadmap?",
      ar: "كيف تُنظم المسارات التسعة في خريطة التعلم؟"
    },
    content: {
      en: "To keep navigation clear, the Roadmap groups all 9 canonical paths across 5 thematic track areas: (1) Foundations (Pre-Programming & Programming Fundamentals), (2) Computer Science Core (OOP & SOLID, Discrete Mathematics, Data Structures), (3) Problem Solving & Competitive Programming (Algorithms & Competitive Programming), (4) Systems & Software Engineering (OS, Networking, SE), and (5) Data & Databases.",
      ar: "لسهولة التصفح، تُجمع المسارات التسعة في 5 مجموعات واضحة: (1) التأسيس (ما قبل البرمجة وأساسيات البرمجة)، (2) جوهر علوم الحاسوب (البرمجة الكائنية، الرياضيات المتقطعة، هياكل البيانات)، (3) حل المشكلات والبرمجة التنافسية (الخوارزميات والبرمجة التنافسية)، (4) النظم وهندسة البرمجيات، و(5) البيانات وقواعد البيانات."
    },
    badge: { en: "9 Paths / 5 Groups", ar: "9 مسارات / 5 مجموعات" }
  },
  {
    id: "prerequisites-and-locks",
    category: "curriculum",
    title: {
      en: "How do prerequisite locks work for paths and units?",
      ar: "كيف تعمل المتطلبات السابقة وأقفال المسارات والوحدات؟"
    },
    content: {
      en: "Curriculum dependencies follow declarative prerequisite rules rather than hardcoded frontend checks. Units or tracks marked with a prerequisite lock clearly display which foundational units or paths must be mastered first. SuperAdmin, Admin, and ContentManager accounts automatically unlock all units in Preview Mode for curriculum inspection.",
      ar: "تُفرض الاعتماديات عبر قواعد متطلبات مخزنة في الخادم وليس قيوداً شكلية في الواجهة. تظهر الشارات بوضوح اسم المتطلب الواجب إتقانه قبل فتح المسار أو الوحدة التالية. كما يمتلك المشرفون وضع معاينة تلقائياً لفتح كافة الوحدات لغرض المراجعة."
    },
    badge: { en: "Dependency Rules", ar: "محرك المتطلبات" }
  },
  {
    id: "unit-playlist-and-resume",
    category: "navigation",
    title: {
      en: "How are multi-chapter lessons structured and saved?",
      ar: "كيف تُبنى الدروس متعددة الفصول وكيف يُحفظ موضع القراءة؟"
    },
    content: {
      en: "Each of the 48 units follows an interactive playlist of structured sections (Core Theory, Mechanics, Code Walkthrough with expected trace, Interactive Lab, Common Pitfalls, Summary Takeaways, and Verified Study Links). Whenever you navigate between sections, LearnCS persists your LastSectionId in PostgreSQL so reopening any unit resumes right where you left off.",
      ar: "يتبع كل درس من الوحدات الـ 48 نظام قائمة فصول تفاعلية منظمة تشمل الشرح النظري، آلية التنفيذ، كوداً تطبيقياً، مختبراً بصرياً، الأخطاء الشائعة، الخلاصة، ومراجع دراسة موثقة. وعند تنقلك بين الفصول، يحفظ الخادم موضع آخر فصل (LastSectionId) في PostgreSQL لتعود إليه تلقائياً عند الرجوع للوحدة."
    },
    badge: { en: "Auto Resume", ar: "استئناف تلقائي" }
  },
  {
    id: "code-trace-console",
    category: "navigation",
    title: {
      en: "How do the [Copy] and [Run Trace] code console controls work?",
      ar: "كيف يعمل مشغل الأثر البرمجي [Run Trace] وزر النسخ؟"
    },
    content: {
      en: "Inside code sections, click [Copy] to grab clean formatted source code, or press [Run Trace] to reveal the step-by-step expected execution output inside a crisp LTR trace terminal panel alongside inline algorithmic explanations.",
      ar: "داخل أقسام الكود، يمكنك الضغط على زر النسخ لنسخ الشيفرة منسقة بالكامل، أو الضغط على زر التشغيل [Run Trace] لاستعراض ناتج التنفيذ المتوقع خطوة بخطوة داخل طرفية إخراج منسقة بوضوح بجانب الشرح التعليمي."
    },
    badge: { en: "Code Walkthrough", ar: "تتبع الكود" }
  },
  {
    id: "section-checkpoints",
    category: "quizzes",
    title: {
      en: "Why must I pass section checkpoints before the final unit quiz?",
      ar: "لماذا يتوجب اجتياز أسئلة التحقق داخل الفصول قبل الاختبار النهائي؟"
    },
    content: {
      en: "Required lesson chapters include inline comprehension checkpoints checked directly on the ASP.NET Core backend. Submitting answers returns instant localized feedback without skipping comprehension checks. Completing every required section unlocks the Final Unit Mastery Quiz.",
      ar: "تحتوي الفصول الإلزامية على أسئلة تحقق سريعة يصححها الخادم الخلفي مباشرة ويعرض تفسيراً فورياً لكل إجابة. يضمن إنهاء جميع الفصول الإلزامية فهمك التسلسلي قبل فتح اختبار إتقان الوحدة النهائي."
    },
    badge: { en: "Checkpoint Gate", ar: "بوابة التحقق" }
  },
  {
    id: "quiz-validation-completion",
    category: "quizzes",
    title: {
      en: "How do Mastery Quizzes determine completion, XP, and streaks?",
      ar: "كيف يحدد اختبار الإتقان إنهاء الوحدة ومنح نقاط XP؟"
    },
    content: {
      en: "Clicking 'Complete' alone never bypasses mastery checks. Once you finish all required sections and score at least the passing threshold (typically 60%) on the Final Unit Quiz, PostgreSQL records unit completion and mastery percentage, awards +50 XP for newly completed units plus quiz XP bonuses, updates your daily Study Streak, and re-evaluates achievement badges.",
      ar: "لا يُحتسب أي درس مكتمل بمجرد النقر دون تقييم. بعد إنهاء الفصول المطلوبة وتحقيق نسبة النجاح المحددة (60% فأكثر) في الاختبار النهائي، يثبت النظام إتقانك للوحدة في قاعدة البيانات، ويمنحك نقاط XP، ويحدّث سلسلة الدراسة اليومية والأوسمة فوراً."
    },
    badge: { en: "Mastery Gate", ar: "بوابة الإتقان" }
  },
  {
    id: "question-bank-randomization",
    category: "quizzes",
    title: {
      en: "How are retry quizzes varied from our 480-question bank?",
      ar: "كيف يتجنب محرك الاختبارات تكرار الأسئلة عند إعادة المحاولة؟"
    },
    content: {
      en: "LearnCS stores 480 balanced bilingual questions with balanced option lengths and zero answer-key leaks before submission. When retrying a unit quiz, the backend inspects up to your last 3 attempts on that unit, excludes recently seen questions while pool variety allows, stratifies difficulties (easy/medium/hard), and shuffles option display order on every attempt.",
      ar: "يضم بنك الأسئلة 480 سؤالاً متوازناً باللغتين دون كشف الإجابات قبل التسليم وبخيارات متكافئة الطول. وعند إعادة اختبار أي وحدة، يستبعد الخادم أسئلة آخر 3 محاولات قدر الإمكان، ويوازن بين مستويات الصعوبة، كما يعيد ترتيب الخيارات عشوائياً في كل محاولة."
    },
    badge: { en: "480 Questions", ar: "480 سؤالاً" }
  },
  {
    id: "diagnostic-assessment-flow",
    category: "quizzes",
    title: {
      en: "How does the Diagnostic Assessment recommend learning paths?",
      ar: "كيف يحلل التقييم التشخيصي مستواك ويوصي بالمسارات؟"
    },
    content: {
      en: "The Diagnostic Assessment samples across all 10 Computer Science domains to identify your strong domains, weak topic gaps, and recommended difficulty tier. If you test as a guest and then sign up or log in, your diagnostic snapshot is automatically saved to your learner profile in PostgreSQL and surfaced on your Dashboard with direct unit launch buttons.",
      ar: "يقيس التقييم التشخيصي مستواك عبر مجالات علوم الحاسوب العشرة لتحديد نقاط القوة والفجوات المعرفية والمستوى الأنسب. وإذا أجريت الاختبار كزائر ثم سجلت حسابك، تُنقل نتيجتك وتوصيات المسارات تلقائياً إلى ملفك في PostgreSQL وتظهر مباشرة في لوحة المتابعة."
    },
    badge: { en: "Adaptive Baseline", ar: "تشخيص المستوى" }
  },
  {
    id: "interactive-simulations",
    category: "interactive",
    title: {
      en: "What interactive visualizers are included in LearnCS?",
      ar: "ما المختبرات التفاعلية المتاحة للتجربة البصرية؟"
    },
    content: {
      en: "All 19 interactive labs are localized in English and Arabic with interactive step, Play/Pause, Reset, and speed controls (0.5x / 1x / 2x) where animated. Visualizers cover Binary Search, Two Pointers, Sorting algorithms, Stacks, Queues, Variables, Loops, Binary Converter, CPU Cycle, Dynamic Programming tables, OS Scheduler, Graph BFS/DFS traversal, Hashing, Recursion, SQL Queries, and more.",
      ar: "توفر المنصة 19 مختبراً تفاعلياً معرباً بالكامل مع أزرار التشغيل التلقائي والإيقاف المؤقت والخطوة وإعادة الضبط والتحكم بالسرعة (0.5x / 1x / 2x) في المختبرات المتحركة. وتشمل البحث الثنائي، المؤشرين، الفرز، المكدس، الطابور، المحول الثنائي، دورة المعالج، البرمجة الديناميكية، المجدول، واجتياز الرسوم وغيرها."
    },
    badge: { en: "19 Visual Labs", ar: "19 مختبراً تفاعلياً" }
  },
  {
    id: "external-references",
    category: "curriculum",
    title: {
      en: "What external study resources accompany units?",
      ar: "ما المصادر الخارجية الموثقة المرفقة مع الوحدات؟"
    },
    content: {
      en: "Every unit surfaces curated links to respected engineering references matched to the unit's topic, such as roadmap.sh tracks, MDN Web Docs, cppreference, Python Official Docs, PostgreSQL Documentation, Microsoft Learn, OSTEP OS chapters, Pro Git, and CP-Algorithms.",
      ar: "ترفق كل وحدة روابط دراسة منتقاة من أرفع المراجع الهندسية مثل خارطة roadmap.sh، توثيق MDN، مرجع cppreference، وثائق Python وPostgreSQL الرسمية، توثيق Microsoft Learn، كتاب OSTEP لنظم التشغيل، Pro Git، وموسوعة CP-Algorithms."
    },
    badge: { en: "Curated Docs", ar: "مراجع موثقة" }
  },
  {
    id: "language-and-l-shortcut",
    category: "account",
    title: {
      en: "How do I switch between English and Arabic or use the 'L' shortcut?",
      ar: "كيف أبدل اللغة بين الإنجليزية والعربية وأستخدم اختصار 'L'؟"
    },
    content: {
      en: "On public pages you can switch between EN and AR directly from the top navigation bar (guest sessions default cleanly to English). Anywhere in the platform, pressing the physical 'L' key switches full content language and LTR/RTL layout simultaneously. Pressing 'L' automatically pauses while typing inside inputs, textareas, or editable code fields.",
      ar: "في الصفحات العامة يمكنك التبديل بين EN وAR من الشريط العلوي (تبدأ الجلسة للزوار بالإنجليزية افتراضياً). وفي أي مكان بالمنصة، يبدّل مفتاح 'L' الفيزيائي لغة المحتوى واتجاه الشاشة بالكامل. ويتعطل الاختصار تلقائياً أثناء الكتابة داخل حقول الإدخال أو الأكواد."
    },
    badge: { en: "Shortcut: [ L ]", ar: "اختصار: [ L ]" }
  },
  {
    id: "arabic-technical-style",
    category: "account",
    title: {
      en: "Why are technical terms kept recognizable in Arabic explanations?",
      ar: "لماذا تبقى المصطلحات التقنية واضحة باللاتينية داخل الشرح العربي؟"
    },
    content: {
      en: "Arabic computer science material reads most naturally when core industry terms such as Hardware, Software, CPU, Array, Stack, Queue, Binary Search, HTTP, API, SQL, and Big-O keep their universal names rather than awkward word-for-word translations, while explanations use clear educational Arabic.",
      ar: "يُكتب المحتوى العربي بأسلوب تعليمي طبيعي يحافظ على شهرة المصطلحات التقنية العالمية مثل CPU وHardware وBinary Search وArray وStack وQueue وAPI وSQL، لأن التعريب الحرفي يشتت الطالب أثناء المذاكرة العملية وقراءة التوثيق الأصلي."
    },
    badge: { en: "Bilingual UX", ar: "تعريب طبيعي" }
  },
  {
    id: "subscriptions-and-tiers",
    category: "account",
    title: {
      en: "How do Subscriptions (Free, Mini, Ready, High) and plan changes work?",
      ar: "كيف تعمل خطط الاشتراك (Free, Mini, Ready, High) وطلبات التغيير؟"
    },
    content: {
      en: "LearnCS offers Free, Mini, Ready, and High tiers. Submitting a paid upgrade creates an approval request while leaving your current active plan completely intact until reviewed by an administrator. At most one active pending plan-change request can exist per account: switching to a different plan cleanly supersedes the earlier pending request while keeping an audit trail, and if an admin rejects a request your active paid or free subscription continues uninterrupted.",
      ar: "توفر المنصة باقات Free وMini وReady وHigh. عند إرسال طلب ترقية مدفوع، تبقى خطتك الحالية نشطة دون تعطيل حتى مراجعة المشرف. ويُسمح بوجود طلب معلق واحد فقط في الوقت نفسه: عند اختيار خطة جديدة يُلغى الطلب المعلق السابق لصالح الأحدث مع حفظ السجل، وإذا رُفض الطلب يستمر اشتراكك النشط دون انقطاع."
    },
    badge: { en: "Single Pending Rule", ar: "طلب معلق وحيد" }
  },
  {
    id: "career-exploration-guide",
    category: "overview",
    title: {
      en: "How does Career Exploration map my interests to curriculum tracks?",
      ar: "كيف يربط استكشاف المسارات المهنية اهتماماتي بمناهج المنصة؟"
    },
    content: {
      en: "The Career Explorer evaluates your technical preferences across systems, web backends, algorithms, and data engineering, then recommends ranked software engineering tracks paired directly with matching LearnCS curriculum paths.",
      ar: "يقيم مستكشف المسارات المهنية تفضيلاتك التقنية بين الأنظمة والواجهات والخوارزميات والبيانات، ليقترح عليك أنسب التخصصات الهندسية ومرتبطاً مباشرة بمسارات التعلم المقابلة داخل المنصة."
    },
    badge: { en: "Career Mapping", ar: "توجيه مهني" }
  },
  {
    id: "support-and-reporting",
    category: "overview",
    title: {
      en: "How can learners report issues or get technical assistance?",
      ar: "كيف يمكن للمتعلمين الإبلاغ عن الأعطال أو طلب المساعدة؟"
    },
    content: {
      en: "You can inspect your active learning state on the Dashboard, ask conceptual questions inside AI Mentor (/ai), or contact administrators with your session timestamp if you notice unexpected behavior in any lesson, visualizer, or subscription request.",
      ar: "يمكنك متابعة حالة تقدمك في لوحة المتابعة، واستشارة المساعد الذكي (/ai) في المفاهيم، أو التواصل مع الإدارة مع ذكر وقت المحاولة إذا لاحظت أي سلوك غير متوقع في الدروس أو المختبرات أو طلبات الاشتراك."
    },
    badge: { en: "Support", ar: "الدعم" }
  }
];

export default function HelpPage() {
  const { language, t } = useI18n();
  const isAr = language === "ar";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>("what-is-learncs");

  const categories = [
    { id: "all", label: isAr ? "جميع المواضيع" : "All Topics" },
    { id: "overview", label: isAr ? "نظرة عامة" : "Platform Overview" },
    { id: "curriculum", label: isAr ? "المنهج والمسارات" : "Curriculum & Paths" },
    { id: "navigation", label: isAr ? "فصول الدرس والاستئناف" : "Playlists & Resume" },
    { id: "quizzes", label: isAr ? "الاختبارات والتشخيص" : "Quizzes & Diagnostics" },
    { id: "interactive", label: isAr ? "المختبرات التفاعلية" : "Interactive Labs" },
    { id: "account", label: isAr ? "اللغة والاشتراكات" : "Language & Billing" }
  ];

  const filteredArticles = HELP_ARTICLES.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const term = searchTerm.toLowerCase().trim();
    if (!term) return matchesCategory;

    const matchesSearch =
      item.title.en.toLowerCase().includes(term) ||
      item.title.ar.toLowerCase().includes(term) ||
      item.content.en.toLowerCase().includes(term) ||
      item.content.ar.toLowerCase().includes(term) ||
      (item.badge && (item.badge.en.toLowerCase().includes(term) || item.badge.ar.toLowerCase().includes(term)));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-20 animate-in fade-in duration-500 max-w-5xl mx-auto px-4" dir={isAr ? "rtl" : "ltr"}>
      {/* Hero Header */}
      <div className="text-center mb-12 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <HelpCircle className="w-4 h-4" />
          <span>{isAr ? "دليل وتوثيق المنصة" : "Platform Documentation"}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          {t.help.title}
        </h1>
        <p className="text-neutral-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {t.help.subtitle}
        </p>

        {/* Global Keyboard Shortcut Pill */}
        <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs text-neutral-300">
          <Keyboard className="w-4 h-4 text-indigo-400" />
          <span>{t.help.shortcutHint}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-xl mx-auto relative">
        <Search className="w-5 h-5 absolute start-4 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={
            isAr
              ? "ابحث في المسارات، الاختبارات، المتطلبات، الاشتراكات، أو الاختصارات..."
              : "Search paths, quizzes, prerequisites, billing rules, or shortcuts..."
          }
          className="w-full ps-12 pe-4 py-3.5 bg-neutral-900/80 border border-white/10 rounded-2xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 shadow-xl transition-all"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2 pb-4 mb-10">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border",
                isActive
                  ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30"
                  : "bg-white/5 text-neutral-400 hover:text-white border-white/5 hover:bg-white/10"
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Articles Accordion */}
      <div className="space-y-4">
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-neutral-900/40 border border-white/5 text-neutral-400 text-sm">
            {isAr
              ? "لم يتم العثور على مقالات تطابق بحثك. جرب كلمات بحث أخرى أو اختر 'جميع المواضيع'."
              : "No help articles matched your search. Try different keywords or select 'All Topics'."}
          </div>
        ) : (
          filteredArticles.map((article) => {
            const isExpanded = expandedArticleId === article.id;
            const title = isAr ? article.title.ar : article.title.en;
            const content = isAr ? article.content.ar : article.content.en;
            const badgeText = article.badge ? (isAr ? article.badge.ar : article.badge.en) : null;

            return (
              <div
                key={article.id}
                className={cn(
                  "rounded-3xl border transition-all overflow-hidden",
                  isExpanded
                    ? "bg-neutral-900/80 border-indigo-500/30 shadow-2xl shadow-indigo-950/20"
                    : "bg-neutral-900/50 border-white/10 hover:border-white/20"
                )}
              >
                <button
                  onClick={() => setExpandedArticleId(isExpanded ? null : article.id)}
                  className="w-full p-6 text-start flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border",
                        isExpanded
                          ? "bg-indigo-600 text-white border-indigo-400"
                          : "bg-white/5 text-neutral-400 border-white/10"
                      )}
                    >
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-snug">{title}</h3>
                      {badgeText && (
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mt-1 inline-block">
                          {badgeText}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-neutral-400 shrink-0">
                    {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5 rtl:rotate-180" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/5 text-neutral-300 text-sm md:text-base leading-relaxed animate-in fade-in duration-200">
                    <p className="leading-relaxed">{content}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Quick Help Card */}
      <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-indigo-950/40 to-neutral-900/80 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            {isAr ? "مستعد لبدء مسارك في علوم الحاسوب؟" : "Ready to begin your Computer Science journey?"}
          </h3>
          <p className="text-neutral-400 text-sm max-w-xl">
            {isAr
              ? "استكشف المسارات التسعة و48 وحدة تعلم و480 سؤالاً متوازناً و19 مختبراً تفاعلياً مع تتبع دائم لتقدمك."
              : "Explore all 9 learning paths, 48 reusable learning units, 480 question bank items, and 19 visual labs with persistent mastery tracking."}
          </p>
        </div>

        <Link
          href="/roadmap"
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-indigo-600/30"
        >
          <span>{isAr ? "فتح خريطة التعلم" : "Open Learning Roadmap"}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}
