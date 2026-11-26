import { AssessmentQuestion } from '@/lib/assessment/schema';

export const knapsack_questions: AssessmentQuestion[] = [
{
  "id": "AL-DPKNAP-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Dynamic Programming",
  "subtopic": "0/1 Knapsack",
  "specialization": "Space Optimization",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "In space-optimized 1D 0/1 Knapsack, why must the capacity loop iterate backwards from W down to weight[i]?",
    "ar": "في النسخة المحسنة الـ 1D من مسألة حقيبة الظهر (0/1 Knapsack)، لماذا يجب أن تدور حلقة السعة بالعكس من W نزولاً إلى weight[i]؟"
  },
  "options": [
    {
      "id": "sort",
      "text": {
        "en": "Because items must be sorted descending by value first",
        "ar": "لأنه يجب ترتيب العناصر تنازلياً حسب القيمة أولاً"
      }
    },
    {
      "id": "speed",
      "text": {
        "en": "Backwards loops are twice as fast in modern CPUs",
        "ar": "لأن الحلقات التنازلية أسرع بمرتين في المعالجات"
      }
    },
    {
      "id": "neg",
      "text": {
        "en": "To allow negative weights safely",
        "ar": "للسماح بالأوزان السالبة بأمان"
      }
    },
    {
      "id": "reuse",
      "text": {
        "en": "To prevent using the same item multiple times within the current iteration",
        "ar": "لمنع استخدام نفس العنصر أكثر من مرة داخل نفس الدورة"
      }
    }
  ],
  "correctAnswer": "reuse",
  "explanation": {
    "en": "Iterating from W down to weight[i] ensures dp[w - weight[i]] still holds values from the previous item row (i - 1), enforcing the at-most-once 0/1 rule.",
    "ar": "الدوران من الأعلى للأسفل يضمن أن القيمة dp[w - weight[i]] لا تزال تخص الصف السابق (i-1)، مما يمنع تكرار أخذ نفس العنصر (وهو الفرق عن Unbounded Knapsack)."
  },
  "tags": [
    "dp",
    "knapsack",
    "dynamic-programming"
  ]
} as AssessmentQuestion,
{
  "id": "AL-DPR-H-005",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Dynamic Programming",
  "subtopic": "Knapsack",
  "specialization": "1D Loop Direction",
  "difficulty": "hard",
  "type": "code-trace",
  "codeSnippet": "for (auto [w, val] : items)\n  for (int c = W; c >= w; c--)\n    dp[c] = max(dp[c], dp[c - w] + val);",
  "codeLanguage": "cpp",
  "question": {
    "en": "In space-compressed `O(W)` 0/1 Knapsack, what changes behaviorally if you accidentally loop `c` forward (`w` to `W`) instead of backward (`W` down to `w`)?",
    "ar": "في النسخة المضغوطة لـ 0/1 Knapsack أعلاه، ماذا يتغير إذا عكست اتجاه حلقة السعة `c` لتصبح تصاعدية من `w` إلى `W`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Converts into Unbounded Knapsack, reusing the same item repeatedly",
        "ar": "تتحول إلى Unbounded Knapsack وتسمح بتكرار العنصر نفسه عدة مرات"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Forces all final dynamic programming transition values down to negative zero instantly",
        "ar": "تصفر جميع قيم الجدول تلقائياً وتتجاوز سعة المصفوفة المخصصة في الذاكرة فوراً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Reduces overall asymptotic runtime strictly from O(N · W) down to O(N + W)",
        "ar": "تنخفض تكلفة الخوارزمية الكلية من O(N · W) إلى O(N + W) مع ضمان صحة النتيجة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Runtime improves strictly from O(N * W) to O(N + W)",
        "ar": "ينخفض الزمن إلى O(N + W)"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Forward sweep updates `dp[c - w]` BEFORE computing `dp[c]` in the SAME item iteration, reusing the same item cleanly (`Unbounded Knapsack`)!",
    "ar": "التكرار التصاعدي يقرأ قيماً محدّثة لنفس العنصر الحالي فيتكرر أخذه، بينما التنازلي يضمن أخذ كل عنصر مرة واحدة فقط."
  },
  "tags": [
    "knapsack",
    "space-optimization",
    "dp"
  ]
} as AssessmentQuestion
];
