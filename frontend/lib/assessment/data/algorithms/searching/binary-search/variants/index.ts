import { AssessmentQuestion } from '@/lib/assessment/schema';

export const variants_questions: AssessmentQuestion[] = [
{
  "id": "AL-BSVAR-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Binary Search Variants",
  "specialization": "Lower Bound",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "In a sorted array with duplicates [1, 2, 2, 2, 5], what does lower_bound(2) find?",
    "ar": "في مصفوفة مرتبة بها تكرارات [1, 2, 2, 2, 5]، ماذا تُرجع دالة lower_bound(2)؟"
  },
  "options": [
    {
      "id": "last",
      "text": {
        "en": "Index 3: the last occurrence of 2",
        "ar": "الفهرس 3: آخر ظهور للرقم 2"
      }
    },
    {
      "id": "after",
      "text": {
        "en": "Index 4: the first element strictly > 2",
        "ar": "الفهرس 4: أول عنصر أكبر قطعا من 2"
      }
    },
    {
      "id": "neg",
      "text": {
        "en": "-1 whenever duplicates appear",
        "ar": "-1 عند وجود تكرار"
      }
    },
    {
      "id": "first",
      "text": {
        "en": "Index 1: the FIRST position where value >= 2",
        "ar": "الفهرس 1: أول موضع تكون فيه القيمة >= 2"
      }
    }
  ],
  "correctAnswer": "first",
  "explanation": {
    "en": "lower_bound(x) locates the leftmost index i where arr[i] >= x (first 2 at index 1), while upper_bound(x) finds the first index where arr[i] > x (index 4).",
    "ar": "تجد lower_bound(x) أول فهرس يحقق arr[i] >= x (أي الفهرس 1)، بينما تجد upper_bound أول عنصر أكبر تماماً من 2."
  },
  "tags": [
    "binary-search",
    "searching"
  ]
} as AssessmentQuestion,
{
  "id": "AL-BOA-E-002",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Binary Search Variants",
  "specialization": "Recognition",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which problem wording most strongly signals **Binary Search on Answer**?",
    "ar": "أي صياغة في نص مسألة خوارزمية تدل بقوة على تطبيق **البحث الثنائي على الإجابة**؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Count all distinct directed paths between arbitrary pairs inside cyclic flow networks",
        "ar": "عد جميع المسارات الموجهة الممكنة بين كل زوج من الرؤوس في رسم يحتوي دورات"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Print neighbor adjacency lists cleanly in ascending integer order from vertex zero",
        "ar": "طباعة قوائم الجيران مرتبة تصاعدياً انطلاقاً من الرأس رقم صفر في الرسم غير الموزون"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Minimize maximum load / maximize minimum gap when feasibility `check(x)` is easy",
        "ar": "تقليل الحد الأقصى أو تعظيم الفجوة الدنيا مع سهولة دالة التحقق `check(x)`"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "'Print adjacency edges ascending from vertex zero'",
        "ar": "طباعة الجيران تصاعدياً"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Min-max / max-min optimization problems turn hard searches into simple greedy `can(X)` threshold probes.",
    "ar": "مسائل تصغير الأقصى أو تعظيم الأدنى تحقق خاصية الرتابة وتُختبر بدالة `can(mid)` بسرعة."
  },
  "tags": [
    "binary-search-on-answer",
    "optimization",
    "cp"
  ]
} as AssessmentQuestion,
{
  "id": "AL-BOA-M-003",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Binary Search Variants",
  "specialization": "Total Complexity",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "You binary search answer space `[1 .. 10^9]` and each greedy `can(mid)` check iterates an N-element array in `O(N)`. Total complexity is:",
    "ar": "نبحث ثنائياً في مجال إجابات `[1 .. 10^9]` وتستغرق دالة التحقق `can(mid)` زمناً خطياً `O(N)`. ما التعقيد الكلي؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "O(N + log(10^9))",
        "ar": "O(N + log(10^9))"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(10^9 / N)",
        "ar": "O(10^9 / N)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(N^2 * log N)",
        "ar": "O(N^2 * log N)"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "O(N * log(10^9))",
        "ar": "O(N * log(10^9))"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Around 30 binary search probes each call an `O(N)` greedy validator -> `~30N`, comfortably passing `N <= 10^5..10^6`!",
    "ar": "حوالي 30 خطوة بحث ثنائي فقط، في كل واحدة نتحقق بزمن `O(N)`."
  },
  "tags": [
    "binary-search-on-answer",
    "complexity",
    "cp"
  ]
} as AssessmentQuestion,
{
  "id": "AL-BOA-H-005",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Binary Search Variants",
  "specialization": "Real Precision Loop",
  "difficulty": "hard",
  "type": "code-trace",
  "codeSnippet": "double lo = 0, hi = 1e9;\nfor (int iter = 0; iter < 85; iter++) {\n  double mid = (lo + hi) / 2.0;\n  if (can(mid)) lo = mid; else hi = mid;\n}",
  "codeLanguage": "cpp",
  "question": {
    "en": "What error class does looping `for (int iter = 0; iter < 85; iter++)` eliminate on floating-point Binary Search?",
    "ar": "ما الخلل الذي يمنعه تكرار الحلقة 85 مرة بالعدد الثابت في البحث الثنائي على الأعداد العشرية `double`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Converts `double` binary values cleanly into exact mathematical rational fractions",
        "ar": "يحوّل القيم العشرية في المعالج إلى كسور رياضية دقيقة خالية تماماً من أخطاء التقريب"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Prevents `while (hi - lo > 1e-12)` infinite hangs when ULP precision saturates",
        "ar": "يمنع تجمد `hi - lo > 1e-12` للأبد عند تشبع دقة `double` (ULP)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Lowers asymptotic complexity of every monotonic `can(mid)` call down to O(1)",
        "ar": "يخفض تعقيد دالة التحقق `can(mid)` نفسها من خطي O(N) إلى وقت ثابت O(1)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Guarantees zero rounding discrepancy for all integer modulos",
        "ar": "يلغي أخطاء باقي القسمة"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "At `1e9`, `double` unit-in-last-place exceeds `1e-12`, stalling `while (hi - lo > 1e-12)` cleanly; 85 fixed halvings finish fast with `~1e-25` relative resolution.",
    "ar": "عند `1e9` تكون أصغر فجوة تمثلها `double` أكبر من `1e-12` فتمتنع عن التقلص؛ 85 دورة مضمونة التوقف بدقة عالية."
  },
  "tags": [
    "floating-point",
    "binary-search",
    "precision"
  ]
} as AssessmentQuestion,
{
  "id": "AL-BOA-E-006",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Binary Search Variants",
  "specialization": "Bound Sizing",
  "difficulty": "easy",
  "type": "scenario",
  "question": {
    "en": "Suppose answer `ans` ranges up to `10^14` (summing `10^5` array elements around `10^9`). What bug strikes if `lo, hi, mid` use 32-bit `int`?",
    "ar": "إذا وصلت قيمة الإجابة إلى `10^14`، ما الخطأ الذي يقع إذا استُخدم `int` ذات 32-بت لمتغيرات `lo, hi, mid`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Modern 64-bit compilers refuse initializing literal integer bounds past one billion",
        "ar": "المترجمات الحديثة 64-بت ترفض كلياً تعريف الثوابت الرقمية الأكبر من مليار أثناء البناء"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Only initializing `lo = 0` strictly avoids any 32-bit integer arithmetic overflow",
        "ar": "يتحول البحث الثنائي تلقائياً إلى حلقة O(N²) عند استخدام أرقام تتجاوز المليارين"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Signed 32-bit `int` overflows past `2.14e9`, truncating mid bounds",
        "ar": "يفيض `int` 32-بت بعد `2.14e9` وتُبتر الحدود معطية نتائج خاطئة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Only `lo = 0` avoids integer overflow",
        "ar": "الصفر فقط يمنع الفيضان"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Always declare search boundaries (`lo`, `hi`, `mid`, `ans`) and validator accumulators as `long long` (64-bit) whenever answer bounds exceed `10^9`.",
    "ar": "استخدم دائماً `long long` للحدود والمنتصف والنتيجة عند المسائل ذات النطاقات الكبيرة."
  },
  "tags": [
    "overflow",
    "long-long",
    "binary-search"
  ]
} as AssessmentQuestion
];
