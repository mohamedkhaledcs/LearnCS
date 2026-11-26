import {
  AssessmentConfig,
  AssessmentQuestion,
  PublicQuestion,
  AssessmentResult,
  DiagnosticPathRecommendation,
  WeakTopicGap,
  TopicScore,
  DomainScore,
  SubmittedAnswer,
  QuestionDifficulty
} from "./schema";
import { QUESTION_BANK } from "./data";

export const ALL_ASSESSMENT_DOMAINS = [
  "Programming Fundamentals",
  "Object-Oriented Programming",
  "Discrete Mathematics",
  "Data Structures",
  "Algorithms",
  "Competitive Programming",
  "Databases",
  "Operating Systems",
  "Networking",
  "Software Engineering"
];

/**
 * Unbiased Fisher-Yates shuffle returning a new shallow copy.
 */
export function shuffleItems<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickStratifiedAcrossDomains(
  pool: AssessmentQuestion[],
  targetCount: number
): AssessmentQuestion[] {
  if (targetCount <= 0 || pool.length === 0) return [];

  // Group by domain and shuffle each domain's questions so sampling is fair and varied
  const byDomain = new Map<string, AssessmentQuestion[]>();
  for (const q of shuffleItems(pool)) {
    const list = byDomain.get(q.domain) ?? [];
    list.push(q);
    byDomain.set(q.domain, list);
  }

  const domainKeys = shuffleItems(Array.from(byDomain.keys()));
  const selected: AssessmentQuestion[] = [];
  let madeProgress = true;

  while (selected.length < targetCount && madeProgress) {
    madeProgress = false;
    for (const d of domainKeys) {
      if (selected.length >= targetCount) break;
      const qList = byDomain.get(d);
      if (qList && qList.length > 0) {
        selected.push(qList.shift()!);
        madeProgress = true;
      }
    }
  }

  return selected;
}

export interface GenerateAssessmentOptions {
  excludeIds?: string[];
  domainFilter?: string[];
}

export function generateAssessment(
  config: AssessmentConfig,
  availableQuestions: AssessmentQuestion[] = QUESTION_BANK,
  options: GenerateAssessmentOptions = {}
): PublicQuestion[] {
  const targetCount = Math.min(
    Math.max(1, Math.min(config.minQuestions, availableQuestions.length), config.defaultQuestions),
    config.maxQuestions,
    availableQuestions.length
  );

  if (targetCount === 0) return [];

  const excludeSet = new Set(options.excludeIds ?? []);
  const filteredByDomain =
    options.domainFilter && options.domainFilter.length > 0
      ? availableQuestions.filter((q) => options.domainFilter!.includes(q.domain))
      : availableQuestions;

  const preferredPool = filteredByDomain.filter((q) => !excludeSet.has(q.id));
  const fallbackPool = filteredByDomain.filter((q) => excludeSet.has(q.id));

  const diffDist = config.difficultyDistribution;
  const pickByDifficulty = (source: AssessmentQuestion[], needTotal: number): AssessmentQuestion[] => {
    if (needTotal <= 0 || source.length === 0) return [];

    let easyNeed = Math.round(needTotal * (diffDist.easy ?? 0.3));
    let hardNeed = Math.round(needTotal * (diffDist.hard ?? 0.25));
    let mediumNeed = Math.max(0, needTotal - easyNeed - hardNeed);

    const easyAll = source.filter((q) => q.difficulty === "easy");
    const medAll = source.filter((q) => q.difficulty === "medium");
    const hardAll = source.filter((q) => q.difficulty === "hard");

    const pickedEasy = pickStratifiedAcrossDomains(easyAll, Math.min(easyNeed, easyAll.length));
    const pickedMed = pickStratifiedAcrossDomains(medAll, Math.min(mediumNeed, medAll.length));
    const pickedHard = pickStratifiedAcrossDomains(hardAll, Math.min(hardNeed, hardAll.length));

    const combined = [...pickedEasy, ...pickedMed, ...pickedHard];
    if (combined.length < needTotal) {
      const used = new Set(combined.map((q) => q.id));
      const remaining = source.filter((q) => !used.has(q.id));
      combined.push(...pickStratifiedAcrossDomains(remaining, needTotal - combined.length));
    }

    return combined;
  };

  let chosen = pickByDifficulty(preferredPool, Math.min(targetCount, preferredPool.length));
  if (chosen.length < targetCount && fallbackPool.length > 0) {
    chosen = [...chosen, ...pickByDifficulty(fallbackPool, targetCount - chosen.length)];
  }

  // Randomize final order and strip answer keys/explanations before sending to client
  return shuffleItems(chosen).map((q) => {
    const { correctAnswer: _ca, explanation: _exp, statistics: _st, ...publicQ } = q;
    return {
      ...publicQ,
      options: shuffleItems(publicQ.options)
    };
  });
}

/**
 * Intelligent stratified question selector for Reusable Learning Units (used as client fallback
 * or offline preview alongside backend `/api/curriculum/units/{unitId}/quiz/start`).
 */
export function selectUnitQuizQuestions(
  params: {
    questionIds?: string[];
    unitTags?: string[];
    count?: number;
    excludeIds?: string[];
  },
  bank: AssessmentQuestion[] = QUESTION_BANK
): AssessmentQuestion[] {
  const { questionIds = [], unitTags = [], count = 5, excludeIds = [] } = params;

  let pool: AssessmentQuestion[] = [];
  if (questionIds.length > 0) {
    const idSet = new Set(questionIds.map((id) => id.trim()));
    pool = bank.filter((q) => idSet.has(q.id));
  }

  if (pool.length < count && unitTags.length > 0) {
    const seenIds = new Set(pool.map((q) => q.id));
    const tagSet = new Set(unitTags.map((t) => t.toLowerCase()));
    const tagMatches = bank.filter(
      (q) =>
        !seenIds.has(q.id) &&
        (q.tags?.some((t) => tagSet.has(t.toLowerCase())) ||
          tagSet.has(q.topic.toLowerCase()) ||
          tagSet.has(q.subtopic.toLowerCase()))
    );
    pool = [...pool, ...shuffleItems(tagMatches)];
  }

  if (pool.length === 0) {
    pool = shuffleItems(bank).slice(0, Math.min(count, bank.length));
  }

  const excludeSet = new Set(excludeIds);
  const fresh = pool.filter((q) => !excludeSet.has(q.id));
  const fallback = pool.filter((q) => excludeSet.has(q.id));

  const targetCount = Math.min(count, pool.length);
  const pickBalanced = (source: AssessmentQuestion[], needed: number): AssessmentQuestion[] => {
    const buckets: Record<QuestionDifficulty, AssessmentQuestion[]> = {
      easy: shuffleItems(source.filter((q) => q.difficulty === "easy")),
      medium: shuffleItems(source.filter((q) => q.difficulty === "medium")),
      hard: shuffleItems(source.filter((q) => q.difficulty === "hard"))
    };
    const out: AssessmentQuestion[] = [];
    let moved = true;
    while (out.length < needed && moved) {
      moved = false;
      for (const d of ["easy", "medium", "hard"] as QuestionDifficulty[]) {
        if (out.length >= needed) break;
        const next = buckets[d].shift();
        if (next) {
          out.push(next);
          moved = true;
        }
      }
    }
    return out;
  };

  let picked = pickBalanced(fresh, targetCount);
  if (picked.length < targetCount) {
    picked = [...picked, ...pickBalanced(fallback, targetCount - picked.length)];
  }

  return shuffleItems(picked).map((q) => ({
    ...q,
    options: shuffleItems(q.options)
  }));
}

export function scoreAssessment(
  sessionId: string,
  answers: SubmittedAnswer[],
  allQuestions: AssessmentQuestion[] = QUESTION_BANK
): AssessmentResult {
  let overallScore = 0;
  let maxScore = 0;

  const domainMap = new Map<
    string,
    {
      score: number;
      max: number;
      topics: Map<string, { score: number; max: number }>;
    }
  >();

  ALL_ASSESSMENT_DOMAINS.forEach((domain) => {
    domainMap.set(domain, { score: 0, max: 0, topics: new Map() });
  });

  for (const answer of answers) {
    const question = allQuestions.find((q) => q.id === answer.questionId);
    if (!question) continue;

    let isCorrect = false;

    if (Array.isArray(question.correctAnswer)) {
      const userAnswers = Array.isArray(answer.answer) ? answer.answer : [answer.answer];
      if (userAnswers.length === question.correctAnswer.length) {
        isCorrect = question.correctAnswer.every((ca) => userAnswers.includes(ca));
      }
    } else {
      isCorrect =
        answer.answer === question.correctAnswer ||
        (Array.isArray(answer.answer) && answer.answer[0] === question.correctAnswer);
    }

    const points = isCorrect ? 1 : 0;

    overallScore += points;
    maxScore += 1;

    if (!domainMap.has(question.domain)) {
      domainMap.set(question.domain, { score: 0, max: 0, topics: new Map() });
    }
    const domainStats = domainMap.get(question.domain)!;
    domainStats.score += points;
    domainStats.max += 1;

    if (!domainStats.topics.has(question.topic)) {
      domainStats.topics.set(question.topic, { score: 0, max: 0 });
    }
    const topicStats = domainStats.topics.get(question.topic)!;
    topicStats.score += points;
    topicStats.max += 1;
  }

  const formatLevel = (
    percentage: number,
    max: number
  ): "insufficient_data" | "emerging" | "developing" | "strong" => {
    if (max === 0) return "insufficient_data";
    if (max === 1) return percentage === 100 ? "developing" : "emerging";
    if (percentage < 50) return "emerging";
    if (percentage < 80) return "developing";
    return "strong";
  };

  const domains: DomainScore[] = Array.from(domainMap.entries())
    .filter(([, domainData]) => domainData.max > 0)
    .map(([domainName, domainData]) => {
      const topics: TopicScore[] = Array.from(domainData.topics.entries()).map(([topicName, topicData]) => {
        const percentage = topicData.max > 0 ? Math.round((topicData.score / topicData.max) * 100) : 0;
        return {
          topic: topicName,
          score: topicData.score,
          max: topicData.max,
          percentage,
          level: formatLevel(percentage, topicData.max)
        };
      });

      return {
        domain: domainName,
        score: domainData.score,
        max: domainData.max,
        percentage: domainData.max > 0 ? Math.round((domainData.score / domainData.max) * 100) : 0,
        topics
      };
    });

  const overallPercentage = maxScore > 0 ? Math.round((overallScore / maxScore) * 100) : 0;
  const recommendedLevel: "beginner" | "intermediate" | "advanced" =
    overallPercentage >= 75 ? "advanced" : overallPercentage >= 50 ? "intermediate" : "beginner";

  const domainPercentMap = new Map(domains.map((d) => [d.domain, d.percentage]));
  const strongDomains = domains
    .filter((d) => d.percentage >= 75)
    .sort((a, b) => b.percentage - a.percentage)
    .map((d) => d.domain);
  const weakDomains = domains
    .filter((d) => d.percentage < 60)
    .sort((a, b) => a.percentage - b.percentage)
    .map((d) => d.domain);

  const weakTopics: WeakTopicGap[] = domains
    .flatMap((d) =>
      d.topics
        .filter((tp) => tp.max > 0 && tp.percentage < 60)
        .map((tp) => ({ domain: d.domain, topic: tp.topic, percentage: tp.percentage }))
    )
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 8);

  const PATH_CATALOG: Array<{
    pathId: string;
    domains: string[];
    title: { en: string; ar: string };
    startUnitId: string;
    prereqDomains?: { domain: string; label: { en: string; ar: string } }[];
    gapReason: { en: string; ar: string };
    nextReason: { en: string; ar: string };
  }> = [
    {
      pathId: "pre-programming",
      domains: ["Programming Fundamentals"],
      title: { en: "Computer & Problem-Solving Foundations", ar: "أساسيات الحاسوب والتفكير البرمجي" },
      startUnitId: "unit-computer-basics-foundations",
      gapReason: {
        en: "Builds essential hardware, binary representation, and web request basics before coding.",
        ar: "يبني مفاهيم العتاد والتمثيل الثنائي وطلبات الويب الأساسية قبل التعمق في البرمجة."
      },
      nextReason: {
        en: "Reinforces core CS intuition at the system layer.",
        ar: "يعزز الحدس الأساسي لعمل الحاسوب من الداخل."
      }
    },
    {
      pathId: "programming-fundamentals",
      domains: ["Programming Fundamentals"],
      title: { en: "Programming Fundamentals", ar: "أساسيات البرمجة" },
      startUnitId: "unit-variables-foundations",
      gapReason: {
        en: "Diagnostic results show room to solidify variables, control flow, loops, functions, and stack memory.",
        ar: "تشير نتيجتك إلى حاجة لتقوية المتغيرات، الجمل الشرطية، الحلقات، الدوال، وذاكرة المكدس."
      },
      nextReason: {
        en: "Essential foundation before core data structures and OOP tracks.",
        ar: "المرتكز الأساسي اللازم قبل مسارات هياكل البيانات والبرمجة الكائنية."
      }
    },
    {
      pathId: "object-oriented-programming",
      domains: ["Object-Oriented Programming"],
      title: { en: "Object-Oriented Programming & SOLID", ar: "البرمجة كائنية التوجه ومبادئ SOLID" },
      startUnitId: "unit-oop-classes-encapsulation",
      prereqDomains: [
        { domain: "Programming Fundamentals", label: { en: "Programming Fundamentals", ar: "أساسيات البرمجة" } }
      ],
      gapReason: {
        en: "Strengthens encapsulation, interfaces, polymorphism, and SOLID design habits.",
        ar: "يعزز التغليف والواجهات وتعدد الأشكال ومبادئ التصميم البرمجي SOLID."
      },
      nextReason: {
        en: "Great next step for structuring clean maintainable production modules.",
        ar: "خطوة مميزة لبناء وحدات برمجية نظيفة وقابلة للصيانة."
      }
    },
    {
      pathId: "discrete-mathematics",
      domains: ["Discrete Mathematics"],
      title: { en: "Discrete Mathematics for Computing", ar: "الرياضيات المتقطعة لعلوم الحاسوب" },
      startUnitId: "unit-dm-propositional-logic",
      gapReason: {
        en: "Covers propositional logic, induction proofs, combinatorics, and graph properties where scores were low.",
        ar: "يغطي المنطق الرياضي والبرهان بالاستقراء والتوافيق والرسوم البيانية لتقوية نقاط الضعف."
      },
      nextReason: {
        en: "Sharpens formal proof and complexity reasoning skills.",
        ar: "يصقل مهارات الإثبات الرياضي وتحليل تعقيد الخوارزميات."
      }
    },
    {
      pathId: "data-structures",
      domains: ["Data Structures"],
      title: { en: "Core Data Structures", ar: "هياكل البيانات الأساسية" },
      startUnitId: "unit-arrays-foundations",
      prereqDomains: [
        { domain: "Programming Fundamentals", label: { en: "Programming Fundamentals", ar: "أساسيات البرمجة" } }
      ],
      gapReason: {
        en: "Addresses memory-layout trade-offs across arrays, linked lists, stacks, queues, hash tables, trees, and graphs.",
        ar: "يعالج فجوات المصفوفات والقوائم المترابطة والمكدس والطابور والتجزئة والأشجار والرسوم."
      },
      nextReason: {
        en: "Mastery of core structures directly lifts algorithm performance.",
        ar: "إتقان هياكل البيانات يرفع مباشرة كفاءة حل الخوارزميات."
      }
    },
    {
      pathId: "algorithms",
      domains: ["Algorithms"],
      title: { en: "Algorithms & Problem Solving", ar: "الخوارزميات وحل المشكلات" },
      startUnitId: "unit-complexity-foundations",
      prereqDomains: [
        { domain: "Programming Fundamentals", label: { en: "Programming Fundamentals", ar: "أساسيات البرمجة" } },
        { domain: "Data Structures", label: { en: "Data Structures", ar: "هياكل البيانات" } }
      ],
      gapReason: {
        en: "Targets Big-O analysis, searching, sorting, greedy strategies, dynamic programming, and graph traversals.",
        ar: "يستهدف تحليل التعقيد والبحث والفرز والجشع والبرمجة الديناميكية وخوارزميات الرسوم."
      },
      nextReason: {
        en: "Advances your problem solving toward optimal algorithmic complexity.",
        ar: "يرتقي بأدائك نحو اختيار الحلول ذات التعقيد الزمني الأمثل."
      }
    },
    {
      pathId: "competitive-programming",
      domains: ["Competitive Programming"],
      title: { en: "Competitive Programming Mastery", ar: "إتقان البرمجة التنافسية" },
      startUnitId: "unit-complexity-foundations",
      prereqDomains: [
        { domain: "Algorithms", label: { en: "Algorithms", ar: "الخوارزميات" } },
        { domain: "Data Structures", label: { en: "Data Structures", ar: "هياكل البيانات" } }
      ],
      gapReason: {
        en: "Focuses on prefix/difference arrays, two pointers, number theory, segment trees, and contest speed.",
        ar: "يركز على المصفوفات التراكمية والمؤشرين ونظرية الأعداد وأشجار القطع وسرعة المسابقات."
      },
      nextReason: {
        en: "Strong foundations unlocked this advanced competitive contest track.",
        ar: "أساسك القوي يؤهلك للانطلاق في مسار المسابقات المتقدمة."
      }
    },
    {
      pathId: "databases",
      domains: ["Databases"],
      title: { en: "Databases & SQL Architecture", ar: "قواعد البيانات وهندسة SQL" },
      startUnitId: "unit-db-relational-foundations",
      gapReason: {
        en: "Improves relational modeling, SQL joins and grouping, normalization (1NF to BCNF), indexing, and ACID.",
        ar: "يقوّي نمذجة الجداول، والربط والتجميع في SQL، والتطبيع، والفهارس، ومعاملات ACID."
      },
      nextReason: {
        en: "Builds backend persistence, query planning, and concurrency skills.",
        ar: "يبني مهارات تصميم قواعد البيانات وتحسين الاستعلامات والمعاملات."
      }
    },
    {
      pathId: "systems-and-engineering",
      domains: ["Operating Systems", "Networking", "Software Engineering"],
      title: { en: "OS, Networking & Software Engineering", ar: "نظم التشغيل والشبكات وهندسة البرمجيات" },
      startUnitId: "unit-os-processes-threads",
      gapReason: {
        en: "Covers concurrency, CPU scheduling, virtual memory, TCP/IP and HTTP/TLS, testing pyramids, and Git workflows.",
        ar: "يغطي التزامن والجدولة والذاكرة الافتراضية وبروتوكولات الشبكة واختبارات البرمجيات وGit."
      },
      nextReason: {
        en: "Rounds out production systems knowledge across OS, network, and clean engineering.",
        ar: "يكمل خبرتك الهندسية عبر الأنظمة والشبكات وهيكلة البرمجيات."
      }
    }
  ];

  const scoredRecommendations = PATH_CATALOG.map((item) => {
    const scores = item.domains
      .map((d) => domainPercentMap.get(d))
      .filter((val): val is number => typeof val === "number");
    const avgDomainPct = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : overallPercentage;

    const missingPrereqs = (item.prereqDomains || [])
      .filter((pr) => (domainPercentMap.get(pr.domain) ?? overallPercentage) < 60)
      .map((pr) => pr.label);

    // Prioritize weak tested areas that do NOT fail hard prerequisites, then natural starter tracks
    let priorityScore = 100 - avgDomainPct;
    if (missingPrereqs.length > 0) priorityScore -= 25 * missingPrereqs.length;
    if (overallPercentage < 50 && (item.pathId === "pre-programming" || item.pathId === "programming-fundamentals")) {
      priorityScore += 35;
    }
    if (overallPercentage >= 75 && (item.pathId === "competitive-programming" || item.pathId === "algorithms")) {
      priorityScore += 20;
    }

    return {
      priorityScore,
      rec: {
        pathId: item.pathId,
        title: item.title,
        reason: avgDomainPct < 60 ? item.gapReason : item.nextReason,
        missingPrerequisites: missingPrereqs,
        startUnitId: item.startUnitId,
        priority: 0
      } as DiagnosticPathRecommendation
    };
  })
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 4)
    .map((entry, idx) => ({
      ...entry.rec,
      priority: idx + 1
    }));

  return {
    sessionId,
    overallScore,
    maxScore,
    percentage: overallPercentage,
    domains,
    recommendedLevel,
    strongDomains,
    weakDomains,
    weakTopics,
    recommendedPaths: scoredRecommendations
  };
}
