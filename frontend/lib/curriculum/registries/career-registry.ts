import { CareerPreferenceDimension, CareerPreferenceQuestion, CareerTrack, CareerExplorationResult } from "../schema/career";

export const CAREER_TRACKS: Record<CareerPreferenceDimension, CareerTrack> = {
  frontend: {
    id: "frontend",
    title: { en: "Frontend Engineering", ar: "هندسة الواجهات الأمامية" },
    description: {
      en: "Craft responsive, interactive, and visually stunning user interfaces and web applications.",
      ar: "بناء واجهات مستخدم تفاعلية وجذابة وتطبيقات ويب سريعة الاستجابة."
    },
    recommendedPathIds: ["programming-fundamentals", "data-structures"],
    keySkills: ["TypeScript", "React", "Next.js", "CSS/Tailwind", "State Management", "Web Performance"]
  },

  backend: {
    id: "backend",
    title: { en: "Backend & API Engineering", ar: "هندسة الواجهات الخلفية والـ APIs" },
    description: {
      en: "Architect robust server-side APIs, microservices, business logic, and transactional data flows.",
      ar: "تصميم واجهات برمجة التطبيقات، الخدمات المصغرة، منطق الأعمال، وتدفق البيانات."
    },
    recommendedPathIds: ["programming-fundamentals", "data-structures", "databases", "systems-and-engineering"],
    keySkills: ["C# / .NET", "Node.js", "PostgreSQL", "REST / GraphQL", "Authentication", "Caching"]
  },

  systems_programming: {
    id: "systems_programming",
    title: { en: "Systems & Embedded Programming", ar: "برمجة الأنظمة والأنظمة المدمجة" },
    description: {
      en: "Engineer low-level operating systems, memory managers, compilers, and hardware interfaces.",
      ar: "هندسة أنظمة التشغيل منخفضة المستوى، إدارة الذاكرة، المترجمات، والتعامل المباشر مع الـ Hardware."
    },
    recommendedPathIds: ["pre-programming", "programming-fundamentals", "systems-and-engineering"],
    keySkills: ["C / C++", "Rust", "Virtual Memory", "Concurrency", "Linux Kernel", "Assembly"]
  },

  data_engineering: {
    id: "data_engineering",
    title: { en: "Data Engineering & Analytics", ar: "هندسة البيانات والتحليلات" },
    description: {
      en: "Build scalable data pipelines, data warehouses, ETL workflows, and relational/NoSQL schemas.",
      ar: "بناء خطوط معالجة البيانات، مستودعات البيانات، وعمليات استخراج وتحويل البيانات."
    },
    recommendedPathIds: ["programming-fundamentals", "databases", "algorithms"],
    keySkills: ["SQL Mastery", "ETL Pipelines", "Data Modeling", "Distributed Systems", "PostgreSQL"]
  },

  ai_ml: {
    id: "ai_ml",
    title: { en: "AI & Machine Learning", ar: "الذكاء الاصطناعي وتعلم الآلة" },
    description: {
      en: "Design mathematical models, neural networks, predictive algorithms, and intelligent systems.",
      ar: "تصميم النماذج الرياضية، الشبكات العصبية، خوارزميات التنبؤ، والأنظمة الذكية."
    },
    recommendedPathIds: ["programming-fundamentals", "data-structures", "algorithms"],
    keySkills: ["Python", "Linear Algebra", "Calculus", "TensorFlow / PyTorch", "Algorithm Optimization"]
  },

  cybersecurity: {
    id: "cybersecurity",
    title: { en: "Cybersecurity & InfoSec", ar: "الأمن السيبراني وأمن المعلومات" },
    description: {
      en: "Defend computer networks, conduct security audits, protect sensitive data, and mitigate vulnerabilities.",
      ar: "حماية الشبكات الحاسوبية، تدقيق الأمان، حماية البيانات الحساسة، وسد الثغرات."
    },
    recommendedPathIds: ["pre-programming", "systems-and-engineering", "databases"],
    keySkills: ["Network Protocols", "Cryptography", "Penetration Testing", "Security Architecture"]
  },

  devops: {
    id: "devops",
    title: { en: "Cloud & DevOps Engineering", ar: "الحوسبة السحابية وهندسة العمليات" },
    description: {
      en: "Automate CI/CD pipelines, container orchestration, cloud infrastructure, and observability.",
      ar: "أتمتة خطوط التكامل والنشر، إدارة الحاويات، البنية التحتية السحابية، والمراقبة."
    },
    recommendedPathIds: ["programming-fundamentals", "systems-and-engineering", "databases"],
    keySkills: ["Docker", "Kubernetes", "CI/CD", "Linux", "Cloud (AWS/Azure)", "Monitoring"]
  },

  mobile: {
    id: "mobile",
    title: { en: "Mobile App Development", ar: "تطوير تطبيقات الهواتف الذكية" },
    description: {
      en: "Create high-performance iOS and Android applications with intuitive native interactions.",
      ar: "بناء تطبيقات iOS و Android عالية الأداء بتفاعلات أصلية وسلسة."
    },
    recommendedPathIds: ["programming-fundamentals", "data-structures"],
    keySkills: ["Flutter / React Native", "Swift / Kotlin", "Mobile UI Patterns", "Local Persistence"]
  },

  game_development: {
    id: "game_development",
    title: { en: "Game Development", ar: "تطوير ألعاب الفيديو" },
    description: {
      en: "Program game physics, 2D/3D graphics rendering, gameplay mechanics, and game loops.",
      ar: "برمجة فيزياء الألعاب، محركات التصيير ثنائية وثلاثية الأبعاد، وميكانيكا اللعب."
    },
    recommendedPathIds: ["programming-fundamentals", "data-structures", "algorithms"],
    keySkills: ["C++ / C#", "Unity / Unreal Engine", "Math & Physics", "Graphics Shaders", "Data Optimization"]
  }
};

export const CAREER_QUESTIONS: CareerPreferenceQuestion[] = [
  {
    id: "q-primary-interest",
    questionText: {
      en: "When you imagine building software, which part excites you the most?",
      ar: "عندما تتخيل بناء البرمجيات، أي جزء يثير اهتمامك أكثر؟"
    },
    options: [
      {
        id: "opt-ui",
        text: { en: "Visual design, user experience, animations, and fluid interactions.", ar: "التصميم المرئي، تجربة المستخدم، الحركات، والتفاعلات السلسة." },
        signals: { frontend: 3, mobile: 2 }
      },
      {
        id: "opt-api",
        text: { en: "System architecture, server logic, databases, and high-volume APIs.", ar: "معمارية الأنظمة، منطق الخوادم، قواعد البيانات، وواجهات برمجة التطبيقات." },
        signals: { backend: 3, data_engineering: 2, devops: 1 }
      },
      {
        id: "opt-lowlevel",
        text: { en: "Operating systems, hardware memory, CPU cycles, and low-level performance.", ar: "أنظمة التشغيل، إدارة الـ Hardware والذاكرة، دورات الـ CPU، والأداء منخفض المستوى." },
        signals: { systems_programming: 3, cybersecurity: 2 }
      },
      {
        id: "opt-math",
        text: { en: "Mathematical patterns, algorithmic models, and intelligent predictions.", ar: "الأنماط الرياضية، النماذج الخوارزمية، والتنبؤات الذكية." },
        signals: { ai_ml: 3, data_engineering: 2 }
      }
    ]
  },
  {
    id: "q-problem-type",
    questionText: {
      en: "Which type of problem would you enjoy solving on a typical workday?",
      ar: "أي نوع من المشاكل تستمتع بحله في يوم عمل نموذجي؟"
    },
    options: [
      {
        id: "opt-query-optim",
        text: { en: "Optimizing database queries and structuring multi-table relational models.", ar: "تحسين استعلامات قواعد البيانات وبناء النماذج العلائقية متعددة الجداول." },
        signals: { databases: 2, data_engineering: 3, backend: 2 } as any
      },
      {
        id: "opt-security",
        text: { en: "Analyzing network packets, defending systems, and hardening security vulnerabilities.", ar: "تحليل حزم الشبكة، حماية الأنظمة، وسد الثغرات الأمنية." },
        signals: { cybersecurity: 3, systems_programming: 2, devops: 1 }
      },
      {
        id: "opt-infra",
        text: { en: "Automating server deployments, cloud scaling, and containerized clusters.", ar: "أتمتة نشر الخوادم، التوسع السحابي، وإدارة مجموعات الحاويات." },
        signals: { devops: 3, backend: 1, systems_programming: 1 }
      },
      {
        id: "opt-gaming",
        text: { en: "Simulating physics, collision detection, and rendering 3D graphics.", ar: "محاكاة الفيزياء، كشف التصادمات، وتصيير الرسوم ثلاثية الأبعاد." },
        signals: { game_development: 3, systems_programming: 2 }
      }
    ]
  },
  {
    id: "q-hardware-affinity",
    questionText: {
      en: "How close do you want to be to the underlying computer hardware?",
      ar: "ما مدى قربك المفضل من عتاد الحاسوب الفعلي؟"
    },
    options: [
      {
        id: "opt-close-hardware",
        text: { en: "Directly managing memory pointers, cache lines, and registers.", ar: "إدارة مؤشرات الذاكرة مباشرة وخطوط الكاش وسجلات المعالج." },
        signals: { systems_programming: 3, game_development: 2, cybersecurity: 1 }
      },
      {
        id: "opt-balanced-arch",
        text: { en: "Balanced: focusing on clean architecture, services, and transactions.", ar: "متوازن: التركيز على المعمارية النظيفة، الخدمات، والمعاملات." },
        signals: { backend: 2, data_engineering: 2, devops: 2 }
      },
      {
        id: "opt-high-abstract",
        text: { en: "High abstraction: focusing on user workflows, accessibility, and devices.", ar: "تجريد عالي: التركيز على سير عمل المستخدم، سهولة الوصول، والأجهزة." },
        signals: { frontend: 3, mobile: 3 }
      }
    ]
  },
  {
    id: "q-scale-environment",
    questionText: {
      en: "What scale or application context appeals to you most?",
      ar: "ما هو النطاق أو سياق التطبيق الأكثر جاذبية بالنسبة لك؟"
    },
    options: [
      {
        id: "opt-mobile-apps",
        text: { en: "Consumer apps carried in people's pockets on iOS and Android.", ar: "تطبيقات المستهلكين التي يحملها الناس في جيوبهم على iOS و Android." },
        signals: { mobile: 3, frontend: 1 }
      },
      {
        id: "opt-cloud-services",
        text: { en: "Enterprise cloud platforms powering millions of transactions per second.", ar: "المنصات السحابية للمؤسسات التي تعالج ملايين المعاملات في الثانية." },
        signals: { backend: 3, devops: 2, data_engineering: 2 }
      },
      {
        id: "opt-ai-research",
        text: { en: "Machine intelligence, large language models, and predictive analytics.", ar: "الذكاء الاصطناعي، النماذج اللغوية الضخمة، والتحليلات التنبؤية." },
        signals: { ai_ml: 3, data_engineering: 2 }
      },
      {
        id: "opt-sec-defense",
        text: { en: "Defending critical digital infrastructure against cyber intrusions.", ar: "الدفاع عن البنية التحتية الرقمية الحيوية ضد الاختراقات السيبرانية." },
        signals: { cybersecurity: 3, systems_programming: 2 }
      }
    ]
  }
];

export function calculateCareerMatches(
  answers: Record<string, string>,
  userId: string = "local-user"
): CareerExplorationResult & { recommendedTracks: CareerTrack[] } {
  const scores: Record<CareerPreferenceDimension, number> = {
    frontend: 0,
    backend: 0,
    mobile: 0,
    ai_ml: 0,
    cybersecurity: 0,
    data_engineering: 0,
    devops: 0,
    game_development: 0,
    systems_programming: 0
  };

  CAREER_QUESTIONS.forEach((q) => {
    const selectedOptionId = answers[q.id];
    if (!selectedOptionId) return;

    const opt = q.options.find((o) => o.id === selectedOptionId);
    if (!opt) return;

    Object.entries(opt.signals).forEach(([dim, weight]) => {
      if (dim in scores && typeof weight === "number") {
        scores[dim as CareerPreferenceDimension] += weight;
      }
    });
  });

  // Sort dimensions by accumulated score descending
  const sortedDimensions = (Object.keys(scores) as CareerPreferenceDimension[]).sort(
    (a, b) => scores[b] - scores[a]
  );

  const topRecommendations = sortedDimensions.slice(0, 3);
  const recommendedTracks = topRecommendations.map((dim) => CAREER_TRACKS[dim]);

  return {
    userId,
    dimensionScores: scores,
    topRecommendations,
    recommendedTracks
  };
}
