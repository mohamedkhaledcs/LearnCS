import { AssessmentQuestion } from '@/lib/assessment/schema';

export const subsequences_questions: AssessmentQuestion[] = [
{
  "id": "AL-DPLCS-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Dynamic Programming",
  "subtopic": "Subsequences",
  "specialization": "LCS & LIS",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "What is the optimal time complexity to compute the Longest Increasing Subsequence (LIS) of an array of length N using patience-sorting / binary search?",
    "ar": "ما هو أفضل تعقيد زمني لإيجاد أطول تسلسل فرعي متزايد (LIS) لمصفوفة بطول N باستخدام Binary Search؟"
  },
  "options": [
    {
      "id": "nlogn",
      "text": {
        "en": "O(N log N)",
        "ar": "O(N log N)"
      }
    },
    {
      "id": "on2",
      "text": {
        "en": "O(N²)",
        "ar": "O(N²)"
      }
    },
    {
      "id": "on",
      "text": {
        "en": "O(N)",
        "ar": "O(N)"
      }
    },
    {
      "id": "n2logn",
      "text": {
        "en": "O(N² log N)",
        "ar": "O(N² log N)"
      }
    }
  ],
  "correctAnswer": "nlogn",
  "explanation": {
    "en": "Maintaining an array of smallest tail values for increasing subsequences of each length allows binary searching replacement positions in O(log N) per element.",
    "ar": "الاحتفاظ بمصفوفة لأصغر قيمة نهاية لكل طول واستخدام lower_bound بالبحث الثنائي يحل LIS في O(N log N)."
  },
  "tags": [
    "dp",
    "lis",
    "binary-search"
  ]
} as AssessmentQuestion,
{
  "id": "AL-DPR-M-004",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Dynamic Programming",
  "subtopic": "Subsequences",
  "specialization": "LIS Complexities",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "What runtime improves Longest Increasing Subsequence (LIS) cleanly from `O(N^2)` DP down to handle `N = 200,000`?",
    "ar": "ما التعقيد المحسّن لإيجاد أطول سلسلة متزايدة (LIS) لمصفوفة بطول `N = 200,000` مقارنةً بالحل التربيعي `O(N^2)`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "O(N * sqrt(N)) square-root block decomposition over sorted prefix buckets",
        "ar": "O(N * sqrt(N)) باستخدام تقسيم الجذر التربيعي على صناديق البادئة المرتبة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(2^N) recursive bitmask subset exploration across sorted numeric sequences",
        "ar": "O(2^N) عبر توليد جميع المجموعات الجزئية الممكنة وفحص تزايد كل مجموعة على حدة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(2^N) subset generation",
        "ar": "O(2^N)"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "O(N log N) using `tails` array + `lower_bound` Binary Search",
        "ar": "O(N log N) عبر مصفوفة `tails` والبحث الثنائي بـ `lower_bound`"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Maintaining minimum ending values per subsequence length forms a monotonic array searchable via `lower_bound` in `O(log N)` per element.",
    "ar": "مصفوفة أصغر نهاية ممكنة لكل طول تكون مرتبةً تصاعدياً، فيتحدث موضع كل رقم بالبحث الثنائي في `O(log N)`."
  },
  "tags": [
    "lis",
    "dp",
    "binary-search"
  ]
} as AssessmentQuestion
];
