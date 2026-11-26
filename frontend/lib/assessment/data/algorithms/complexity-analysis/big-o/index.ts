import { AssessmentQuestion } from '@/lib/assessment/schema';

export const big_o_questions: AssessmentQuestion[] = [
{
  "id": "AL-BIGO-E-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Complexity Analysis",
  "subtopic": "Big-O",
  "specialization": "Asymptotic Bounds",
  "difficulty": "easy",
  "type": "complexity",
  "question": {
    "en": "Which Big-O expression simplifies f(n) = 5n² + 100n + 42 correctly?",
    "ar": "أي تعبير Big-O يبسّط الدالة f(n) = 5n² + 100n + 42 بشكل صحيح؟"
  },
  "options": [
    {
      "id": "on2",
      "text": {
        "en": "O(n²)",
        "ar": "O(n²)"
      }
    },
    {
      "id": "o5n2",
      "text": {
        "en": "O(5n²)",
        "ar": "O(5n²)"
      }
    },
    {
      "id": "on2plusn",
      "text": {
        "en": "O(n² + n)",
        "ar": "O(n² + n)"
      }
    },
    {
      "id": "on3",
      "text": {
        "en": "O(n³)",
        "ar": "O(n³)"
      }
    }
  ],
  "correctAnswer": "on2",
  "explanation": {
    "en": "Big-O drops constant coefficients (5) and lower-order terms (100n + 42), keeping only the dominant growth term n².",
    "ar": "يحذف تحليل Big-O المعاملات الثابتة (5) والحدود الأقل نمواً (100n + 42)، ويحتفظ فقط بالحد الأسرع نمواً وهو n²."
  },
  "tags": [
    "complexity",
    "big-o",
    "asymptotics"
  ]
} as AssessmentQuestion,
{
  "id": "AL-CMP-E-002",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Complexity Analysis",
  "subtopic": "Big-O",
  "specialization": "Scaling Order",
  "difficulty": "easy",
  "type": "complexity",
  "question": {
    "en": "Rank these Big-O growth classes strictly from fastest (smallest) to slowest (largest) for huge inputs `N`:",
    "ar": "رتّب دوال التعقيد التالية تصاعدياً من الأسرع (الأصغر نمواً) إلى الأبطأ لقيم `N` الضخمة:"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "O(1) < O(N) < O(log N) < O(N log N) < O(N^2)",
        "ar": "O(1) < O(N) < O(log N) < O(N log N) < O(N^2)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(log N) < O(1) < O(N) < O(N^2) < O(N log N)",
        "ar": "O(log N) < O(1) < O(N) < O(N^2) < O(N log N)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(N) < O(N log N) < O(log N) < O(2^N) < O(N^2)",
        "ar": "O(N) < O(N log N) < O(log N) < O(2^N) < O(N^2)"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "O(1) < O(log N) < O(N) < O(N log N) < O(N^2)",
        "ar": "O(1) < O(log N) < O(N) < O(N log N) < O(N^2)"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Constant precedes logarithmic, which precedes linear, linearithmic `N log N`, and quadratic `N^2` cleanly.",
    "ar": "الثابت يسبق اللوغاريتمي، يليه الخطي، ثم `N log N`، ثم التربيعي `N^2`."
  },
  "tags": [
    "big-o",
    "complexity",
    "ordering"
  ]
} as AssessmentQuestion,
{
  "id": "AL-CMP-E-005",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Complexity Analysis",
  "subtopic": "Big-O",
  "specialization": "Independent Inputs",
  "difficulty": "easy",
  "type": "complexity",
  "codeSnippet": "for (int x : users) checkUser(x);    // |users| = U\nfor (int y : logs) indexLog(y);      // |logs| = L",
  "codeLanguage": "cpp",
  "question": {
    "en": "Given TWO independent collections of sizes `U` and `L`, what is the Big-O time of two sequential loops?",
    "ar": "عند معالجة قائمتين مستقلتين بحجمَي `U` و`L` في حلقتين متتاليتين (غير متداخلتين)، ما التعقيد الصحيح؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "O(U * L)",
        "ar": "O(U * L)"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "O(U^2 + L^2)",
        "ar": "O(U^2 + L^2)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(U + L)",
        "ar": "O(U + L)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(U log L)",
        "ar": "O(U log L)"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "Sequential loops over distinct variables sum cleanly (`O(U + L)`); never drop one independent variable assuming `U == L`.",
    "ar": "الحلقات المتتالية تجمع تعقيداتها، ولا نحذف أحدهما عندما يرتبطان بمتغيرين مختلفين `U` و`L`."
  },
  "tags": [
    "big-o",
    "multi-variable",
    "complexity"
  ]
} as AssessmentQuestion
];
