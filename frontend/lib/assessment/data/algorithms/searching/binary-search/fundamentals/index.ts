import { AssessmentQuestion } from '@/lib/assessment/schema';

export const fundamentals_questions: AssessmentQuestion[] = [
{
  "id": "AL-SEARCH-M-002",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Binary Search",
  "specialization": "Prerequisites",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What is a mandatory prerequisite for using Binary Search on an array?",
    "ar": "ما هو الشرط الأساسي الذي يجب توافره لاستخدام الـ Binary Search على Array؟"
  },
  "options": [
    {
      "id": "unique",
      "text": {
        "en": "The Array must contain only unique elements.",
        "ar": "يجب أن تحتوي الـ Array على عناصر فريدة فقط."
      }
    },
    {
      "id": "positive",
      "text": {
        "en": "The Array must contain only positive integers.",
        "ar": "يجب أن تحتوي الـ Array على أعداد صحيحة موجبة فقط."
      }
    },
    {
      "id": "sorted",
      "text": {
        "en": "The Array must be sorted.",
        "ar": "يجب أن تكون الـ Array مرتبة (sorted)."
      }
    },
    {
      "id": "even",
      "text": {
        "en": "The Array must have an even number of elements.",
        "ar": "يجب أن تحتوي الـ Array على عدد زوجي من العناصر."
      }
    }
  ],
  "correctAnswer": "sorted",
  "explanation": {
    "en": "Binary Search eliminates half of the remaining search interval at each comparison, which is mathematically valid only if the elements are sorted in monotonic order.",
    "ar": "يستبعد البحث الثنائي نصف مجال البحث في كل مقارنة، وهذا يصح رياضياً فقط إذا كانت المصفوفة مرتبة ترتيباً رتيباً (sorted)."
  }
} as AssessmentQuestion,
{
  "id": "AL-BSR-E-002",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Binary Search",
  "specialization": "Max Steps",
  "difficulty": "easy",
  "type": "complexity",
  "question": {
    "en": "In a sorted catalog containing ~1,000,000 books (`~2^20`), approximately how many Binary Search probes AT MOST confirm missing/found?",
    "ar": "في فهرس مرتب يضم نحو 1,000,000 عنصر (`~2^20`)، كم عدد مقارنات البحث الثنائي على الأكثر؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Roughly 1,000 comparisons (`sqrt(N)`)",
        "ar": "حوالي 1,000 مقارنة"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Roughly 20 comparisons",
        "ar": "حوالي 20 مقارنة فقط"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Roughly 500,000 comparisons (`N / 2`)",
        "ar": "حوالي 500,000 مقارنة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Roughly 200 comparisons (`10 * log`)",
        "ar": "حوالي 200 مقارنة"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Every comparison eliminates half of remaining candidates: `2^20 = 1,048,576`, so at most ~20 probes suffice!",
    "ar": "كل مقارنة تستبعد نصف المساحة؛ وبما أن `2^20` تفوق المليون، تكفي ~20 خطوة فقط."
  },
  "tags": [
    "binary-search",
    "complexity",
    "logarithm"
  ]
} as AssessmentQuestion,
{
  "id": "AL-BSR-M-003",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Binary Search",
  "specialization": "Midpoint Overflow",
  "difficulty": "medium",
  "type": "debugging",
  "question": {
    "en": "Why should classic integer Binary Search write `mid = lo + (hi - lo) / 2` rather than `mid = (lo + hi) / 2`?",
    "ar": "لماذا يكتب المبرمجون `mid = lo + (hi - lo) / 2` بدلاً من `(lo + hi) / 2` في البحث الثنائي؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Plain `(lo + hi) / 2` divides integers cleanly only when length equals a power of two",
        "ar": "لأن الصيغة القديمة `(lo + hi)/2` لا تقسم صحيحاً إلا عندما يكون طول المصفوفة من قوى 2"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Right-offset midpoint math upgrades Binary Search smoothly into O(1) hash lookup",
        "ar": "الصيغة الحديثة تحول البحث الثنائي مباشرة إلى جدول تجزئة يعمل بزمن O(1) ثابت"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "`lo + hi` can overflow 32-bit int near `INT_MAX`; `lo + (hi - lo) / 2` stays safe",
        "ar": "مجموع `lo + hi` قد يفيض في int 32-بت؛ بينما صيغة الفرق `lo + (hi - lo)/2` آمنة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Right arithmetic prevents comparing negative indices at lo = 0",
        "ar": "تمنع المقارنة السالبة عند البداية"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Famous Java/C++ bug fixed in JDK `Arrays.binarySearch`: when `lo` and `hi` exceed `1.1e9`, adding them wraps negative!",
    "ar": "جمع حدين كبيرين يتعدى حد الـ `2.14e9` ليصبح سالباً، بينما `lo + (hi - lo) / 2` لا يتجاوز الحد أبداً."
  },
  "tags": [
    "binary-search",
    "overflow",
    "debugging"
  ]
} as AssessmentQuestion,
{
  "id": "AL-BSR-M-004",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Binary Search",
  "specialization": "Lower vs Upper Bound",
  "difficulty": "medium",
  "type": "code-trace",
  "codeSnippet": "vector<int> v = {10, 20, 20, 20, 35};\nauto it1 = lower_bound(v.begin(), v.end(), 20);\nauto it2 = upper_bound(v.begin(), v.end(), 20);",
  "codeLanguage": "cpp",
  "question": {
    "en": "In C++, which 0-based indices do `it1` (`lower_bound` of 20) and `it2` (`upper_bound` of 20) point to in `{10, 20, 20, 20, 35}`?",
    "ar": "في المصفوفة `{10, 20, 20, 20, 35}`، إلى أي فهرسين تشير `lower_bound(20)` و`upper_bound(20)` في C++؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "it1 -> index 1, it2 -> index 3 (last 20)",
        "ar": "it1 عند 1 و it2 عند 3"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "it1 -> index 0, it2 -> index 4",
        "ar": "it1 عند 0 و it2 عند 4"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "it1 -> index 3, it2 -> index 4",
        "ar": "it1 عند 3 و it2 عند 4"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "it1 -> index 1 (`>= 20`), it2 -> index 4 (`> 20` value 35)",
        "ar": "it1 عند الفهرس 1 و it2 عند الفهرس 4 (القيمة 35)"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "`lower_bound` yields first index `>= 20` (1); `upper_bound` yields first index strictly `> 20` (4). Count of `20` equals `4 - 1 = 3`!",
    "ar": "ترجع `lower_bound` أول خانة `>= 20` (فهرس 1) و`upper_bound` أول خانة `> 20` (فهرس 4)."
  },
  "tags": [
    "lower-bound",
    "upper-bound",
    "binary-search"
  ]
} as AssessmentQuestion,
{
  "id": "AL-BSR-H-005",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Binary Search",
  "specialization": "First True Boundary",
  "difficulty": "hard",
  "type": "code-trace",
  "codeSnippet": "while (lo < hi) {\n  int mid = lo + (hi - lo) / 2;\n  if (isGood(mid)) hi = mid;\n  else lo = mid + 1;\n}",
  "codeLanguage": "cpp",
  "question": {
    "en": "On a monotonic boolean array `[F, F, F, T, T]`, what does `lo` converge cleanly to when this loop stops (`lo == hi`)?",
    "ar": "على مصفوفة رتيبة `[F, F, F, T, T]`، إلامَ يستقر المؤشر `lo` عند انتهاء الحلقة أعلاه (`lo == hi`)؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "The index of the FIRST `True` item cleanly",
        "ar": "فهرس أول عنصر يحقق `True`"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "The index of the LAST `False` item cleanly",
        "ar": "فهرس آخر عنصر False"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "The index of the LAST `True` item cleanly",
        "ar": "فهرس آخر عنصر True"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Infinite hang whenever `hi` is odd",
        "ar": "تعلق في حلقة لا نهائية"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Keeping true candidates (`hi = mid`) and strictly excluding failing left candidates (`lo = mid + 1`) lands `lo == hi` exactly on the first `T`.",
    "ar": "استبعاد النطاق الكاذب بـ `lo = mid + 1` وحصر الصحيح في `hi = mid` يدفع المؤشرين للالتقاء عند أول `True`."
  },
  "tags": [
    "binary-search",
    "invariant",
    "monotonic"
  ]
} as AssessmentQuestion,
{
  "id": "AL-BSR-E-006",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Binary Search",
  "specialization": "Precondition",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What indispensable property MUST hold before Binary Search can safely eliminate half a slice based on `mid`?",
    "ar": "ما الشرط الجوهري الواجب تحققه في البيانات قبل الاعتماد على البحث الثنائي لاستبعاد نصف النطاق؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "All elements must be strictly even integers",
        "ar": "أن تكون كل الأرقام زوجية"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "The elements or search predicate must follow a monotonic sorted order",
        "ar": "أن تكون العناصر مرتبةً أو يتبع الشرط سلوكاً رتيباً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Array length must equal an exact power of two cleanly",
        "ar": "أن يكون الطول من قوى 2"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Elements cannot contain duplicate numbers anywhere",
        "ar": "ألا تحتوي القيم على تكرارات"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Monotonicity guarantees that discarding `mid < target` never accidentally discards a valid match on the discarded side (duplicates ARE fine!).",
    "ar": "الترتيب أو الرتابة تضمن صحة الاستبعاد، ولا يضر وجود عناصر مكررة أبداً."
  },
  "tags": [
    "binary-search",
    "monotonic",
    "precondition"
  ]
} as AssessmentQuestion
];
