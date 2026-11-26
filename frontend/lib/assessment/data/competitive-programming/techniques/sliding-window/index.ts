import { AssessmentQuestion } from '@/lib/assessment/schema';

export const sliding_window_questions: AssessmentQuestion[] = [
{
  "id": "CP-SW-E-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Techniques",
  "subtopic": "Sliding Window",
  "specialization": "Subarrays",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "When is a variable-size Sliding Window [L, R] valid for finding the longest subarray with sum <= S?",
    "ar": "متى تكون تقنية النافذة المنزلقة (Sliding Window) صالحة لإيجاد أطول مصفوفة فرعية مجموعها <= S؟"
  },
  "options": [
    {
      "id": "nonneg",
      "text": {
        "en": "All values are non-negative, ensuring window sum changes monotonically",
        "ar": "عندما تكون العناصر غير سالبة لضمان التزايد والتناقص الرتيب للمجموع"
      }
    },
    {
      "id": "neg",
      "text": {
        "en": "Strictly when the input array includes negative numbers canceling oversized window prefixes",
        "ar": "فقط عند احتواء المصفوفة على أعداد سالبة تخفض المجموع تلقائياً عند توسيع الطرف الأيمن"
      }
    },
    {
      "id": "sorted",
      "text": {
        "en": "Only when input integers sit sorted strictly descending from left boundary to right",
        "ar": "فقط عندما تكون جميع عناصر المصفوفة مرتبة تنازلياً بالكامل من البداية إلى النهاية"
      }
    },
    {
      "id": "prime",
      "text": {
        "en": "When array length is a prime number",
        "ar": "عندما يكون طول المصفوفة عدداً أولياً"
      }
    }
  ],
  "correctAnswer": "nonneg",
  "explanation": {
    "en": "If elements can be negative, expanding R might lower the sum and shrinking L might raise it, breaking the two-pointer window invariant (use Prefix Sums + Map/Deque instead).",
    "ar": "إذا وُجدت أعداد سالبة فقد يقل المجموع عند التوسيع مما يكسر رتابة النافذة، لذا تتطلب النافذة المتغيرة قيماً غير سالبة."
  },
  "tags": [
    "cp",
    "two-pointers",
    "sliding-window"
  ]
} as AssessmentQuestion,
{
  "id": "CP-TWP-M-003",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Two Pointers & Sliding Window",
  "subtopic": "Sliding Window",
  "specialization": "Fixed Window Sum",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "Finding the maximum sum across EVERY contiguous subarray of exact fixed length `k` inside an N-element array using a sliding window runs in:",
    "ar": "ما التعقيد الزمني لإيجاد أكبر مجموع لمقطع متجاور بطول ثابت `k` في مصفوفة طولها `N` باستخدام النافذة المنزلقة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "O(N * k)",
        "ar": "O(N * k)"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "O(N)",
        "ar": "O(N)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(N log k)",
        "ar": "O(N log k)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(k^2)",
        "ar": "O(k^2)"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Each slide step adds ONE incoming right item (`+a[i]`) and subtracts ONE outgoing left item (`-a[i-k]`) in O(1) -> O(N) total!",
    "ar": "في كل خطوة نضيف العنصر الداخل ونطرح العنصر الخارج بزمن ثابت `O(1)` فيكون الإجمالي `O(N)`."
  },
  "tags": [
    "sliding-window",
    "complexity",
    "arrays"
  ]
} as AssessmentQuestion,
{
  "id": "CP-TWP-H-005",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Two Pointers & Sliding Window",
  "subtopic": "Sliding Window",
  "specialization": "Negative Breakage",
  "difficulty": "hard",
  "type": "scenario",
  "question": {
    "en": "Why does shrinking variable Sliding Window (`while (sum > K) sum -= a[L++];`) FAIL when `a` includes NEGATIVE integers?",
    "ar": "لماذا تفشل النافذة المتغيرة بالانكماش عندما تحوي المصفوفة أعداداً **سالبة** لمسألة 'أطول مقطع مجموعه `<= K`'؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Sliding windows accept strictly decimal limits across floating boundaries inside C++ loops",
        "ar": "النافذة المنزلقة لا تعمل إلا مع حدود عشرية حقيقية بدلاً من الأعداد الصحيحة دائماً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Subtracting negative array elements triggers runtime heap leaks inside fixed loop indices",
        "ar": "طرح العناصر السالبة من متغير المجموع يسبب تسرب ذاكرة فوري في حلقات المصفوفة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Indices L and R cross zero pointers automatically",
        "ar": "لأن المؤشرين يخرجان للصفر"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Negative entries break monotonicity, invalidating early `L++` shrinks",
        "ar": "القيم السالبة تكسر رتابة المجموع وتُفسد قرار تقليص `L++`"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Monotonic sliding windows require elements >= 0 so expanding right never decreases sums; negative items need Prefix Sums + Binary Search / Monotonic Deque.",
    "ar": "تتطلب النافذة المنزلقة رتابة النمو؛ ووجود أعداد سالبة يستدعي Prefix Sum مع Deque رتيب أو TreeMap."
  },
  "tags": [
    "sliding-window",
    "negatives",
    "edge-case"
  ]
} as AssessmentQuestion,
{
  "id": "CP-TWP-E-006",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Two Pointers & Sliding Window",
  "subtopic": "Sliding Window",
  "specialization": "Distinct Substring Window",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "When finding the longest substring without duplicate characters via Sliding Window `[L..R]`, what helper structure tracks characters inside the active window?",
    "ar": "لإيجاد أطول سلسلة فرعية بدون تكرار أي حرف عبر النافذة المنزلقة، ما البنية الأنسب لتتبع الحروف داخل النافذة الحالية؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "A frequency array or Hash Map (`char -> count/lastIdx`) updated in O(1)",
        "ar": "مصفوفة تكرار أو خريطة تجزئة (`Hash Map`) تُحدَّث في `O(1)`"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Sorting `[L..R]` from scratch via Bubble Sort at every `R`",
        "ar": "إعادة فرز النافذة في كل خطوة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "A Dijkstra shortest-path heap per character",
        "ar": "كومة أولوية ديكسترا"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "A 2D Prefix Matrix sizing `26^4`",
        "ar": "مصفوفة ثنائية ضخمة"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "An O(1) frequency array (`int freq[256]`) or Hash Map lets `R` expand and `L` shrink over duplicates cleanly in `O(N)` total time.",
    "ar": "تتيح مصفوفة عد الحروف تحديث النافذة فورياً والاحتفاظ بزمن خطي `O(N)`."
  },
  "tags": [
    "sliding-window",
    "strings",
    "hash-map"
  ]
} as AssessmentQuestion
];
