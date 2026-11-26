import { AssessmentQuestion } from '@/lib/assessment/schema';

export const _1d_dp_questions: AssessmentQuestion[] = [
{
  "id": "AL-DP1D-E-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Dynamic Programming",
  "subtopic": "1D DP",
  "specialization": "State Transitions",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "In Climbing Stairs where you can take 1 or 2 steps at a time, what recurrence computes ways[i]?",
    "ar": "في مسألة صعود الدرج (خطوة أو خطوتين في كل مرة)، ما هي العلاقة التكرارية الصحيحة لحساب عدد الطرق ways[i]؟"
  },
  "options": [
    {
      "id": "mul",
      "text": {
        "en": "ways[i] = ways[i - 1] * ways[i - 2]",
        "ar": "ways[i] = ways[i - 1] * ways[i - 2]"
      }
    },
    {
      "id": "sum",
      "text": {
        "en": "ways[i] = ways[i - 1] + ways[i - 2]",
        "ar": "ways[i] = ways[i - 1] + ways[i - 2]"
      }
    },
    {
      "id": "max",
      "text": {
        "en": "ways[i] = max(ways[i - 1], ways[i - 2])",
        "ar": "ways[i] = max(ways[i - 1], ways[i - 2])"
      }
    },
    {
      "id": "inc",
      "text": {
        "en": "ways[i] = ways[i - 1] + 2",
        "ar": "ways[i] = ways[i - 1] + 2"
      }
    }
  ],
  "correctAnswer": "sum",
  "explanation": {
    "en": "Step i can be reached from step i-1 (via a 1-step hop) or step i-2 (via a 2-step hop), so total distinct ways equal their sum.",
    "ar": "يمكن الوصول للدرجة i إما من الدرجة i-1 بخطوة واحدة أو من الدرجة i-2 بخطوتين، لذا فعدد الطرق الكلي هو مجموعهما."
  },
  "tags": [
    "dp",
    "dynamic-programming",
    "1d-dp"
  ]
} as AssessmentQuestion,
{
  "id": "AL-DPR-M-003",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Dynamic Programming",
  "subtopic": "1D DP",
  "specialization": "House Robber / Climbing",
  "difficulty": "medium",
  "type": "code-trace",
  "codeSnippet": "dp[i] = max(dp[i - 1], val[i] + dp[i - 2]);",
  "codeLanguage": "cpp",
  "question": {
    "en": "Which classic constraint motivates the transition `dp[i] = max(dp[i-1], val[i] + dp[i-2])`?",
    "ar": "ما القيد الذي تعبّر عنه معادلة الانتقال `dp[i] = max(dp[i - 1], val[i] + dp[i - 2])`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Counting ordered distinct coin sequences summing to N modulo 10^9 + 7",
        "ar": "عد طرق تكوين المبلغ المالي مع احتساب اختلاف الترتيب باقي قسمة 10^9 + 7"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Finding minimum character edit distance across two unequal ASCII words",
        "ar": "حساب أقل مسافة تعديل وحذف واستبدال بين سلسلتين نصيتين مختلفتي الطول تماماً"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Maximum sum choosing strictly non-adjacent items (`i-1` and `i` excluded)",
        "ar": "أقصى مجموع باختيار عناصر غير متجاورة دون جمع `i-1` و`i` معاً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Maximizing continuous sorted subarray lengths",
        "ar": "إيجاد أطول سلسلة متزايدة"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Either skip item `i` (keeping `dp[i-1]`) or pick `i` adding best score up to `i - 2`, enforcing non-adjacency in `O(N)` time and `O(1)` rolling space.",
    "ar": "إما ترك العنصر `i` والاعتماد على `i-1` أو أخذه وإضافة أفضل مجموع حتى `i-2`."
  },
  "tags": [
    "1d-dp",
    "transitions",
    "dp"
  ]
} as AssessmentQuestion
];
