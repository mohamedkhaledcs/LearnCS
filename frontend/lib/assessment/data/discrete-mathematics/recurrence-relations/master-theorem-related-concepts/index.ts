import { AssessmentQuestion } from '@/lib/assessment/schema';

export const master_theorem_related_concepts_questions: AssessmentQuestion[] = [
{
  "id": "DM-MAST-H-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Recurrence Relations",
  "subtopic": "Master Theorem",
  "specialization": "Merge Sort Case",
  "difficulty": "hard",
  "type": "complexity",
  "question": {
    "en": "By the Master Theorem, what is the tight asymptotic bound for Merge Sort's recurrence `T(n) = 2·T(n/2) + Θ(n)`?",
    "ar": "باستخدام مبرهنة الماستر (Master Theorem)، ما الحل الدقيق لعلاقة فرز الدمج `T(n) = 2·T(n/2) + Θ(n)`؟"
  },
  "options": [
    {
      "id": "on",
      "text": {
        "en": "Θ(n) linear work across every level via Master Theorem Case 1 dominance",
        "ar": "Θ(n) تعقيد خطي صافٍ لأن جذر شجرة التكرار يهيمن على كل العمل المتبقي"
      }
    },
    {
      "id": "nlogn",
      "text": {
        "en": "Θ(n log n) via Master Theorem Case 2",
        "ar": "Θ(n log n) وفق الحالة الثانية لمبرهنة الماستر"
      }
    },
    {
      "id": "on2",
      "text": {
        "en": "Θ(n²) quadratic bound matching Master Theorem Case 3 at the leaves",
        "ar": "Θ(n²) تعقيد تربيعي لأن دمج نصفين بحجم n/2 يضاعف عدد العمليات في كل مستوى"
      }
    },
    {
      "id": "ologn",
      "text": {
        "en": "Θ(log n)",
        "ar": "Θ(log n)"
      }
    }
  ],
  "correctAnswer": "nlogn",
  "explanation": {
    "en": "Since n^(log₂ 2) = n¹ matches combine cost f(n) = Θ(n), Master Theorem Case 2 gives Θ(n log n).",
    "ar": "لأن n^(log₂ 2) = n يطابق عمل الدمج Θ(n)، تنطبق الحالة الثانية لمبرهنة الماستر وتعطي Θ(n log n)."
  },
  "tags": [
    "discrete-math",
    "recurrence",
    "sorting"
  ]
} as AssessmentQuestion,
{
  "id": "DM-CNT-M-004",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Recurrence Relations",
  "subtopic": "Master Theorem",
  "specialization": "Asymptotic Solution",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "What closed Big-O bound solves the Divide-and-Conquer recurrence `T(N) = 2 * T(N / 2) + O(1)` (such as full tree traversal)?",
    "ar": "ما الحل المغلق لعلاقة التكرار `T(N) = 2 * T(N / 2) + O(1)` (كما في مسح شجرة متوازنة كاملة)؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "O(log N)",
        "ar": "O(log N)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(N log N)",
        "ar": "O(N log N)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(N^2)",
        "ar": "O(N^2)"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "O(N)",
        "ar": "O(N)"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Master Theorem Case 1: leaves dominate `N^(log_2 2) = N^1`, exceeding `O(1)` root combine work -> `O(N)`.",
    "ar": "الأوراق تسيطر حسب الحالة الأولى لمبرهنة Master عند `N^(log2 2) = N` فيكون الناتج `O(N)`."
  },
  "tags": [
    "master-theorem",
    "recurrence",
    "complexity"
  ]
} as AssessmentQuestion
];
