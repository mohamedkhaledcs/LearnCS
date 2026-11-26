import { AssessmentQuestion } from '@/lib/assessment/schema';

export const linear_search_questions: AssessmentQuestion[] = [
{
  "id": "AL-SEARCH-E-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Linear Search",
  "specialization": "Fundamentals",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What is the worst-case time complexity of Linear Search?",
    "ar": "ما هو أسوأ time complexity لعملية البحث الخطي (Linear Search)؟"
  },
  "options": [
    {
      "id": "o1",
      "text": {
        "en": "O(1)",
        "ar": "O(1)"
      }
    },
    {
      "id": "on",
      "text": {
        "en": "O(n)",
        "ar": "O(n)"
      }
    },
    {
      "id": "ologn",
      "text": {
        "en": "O(log n)",
        "ar": "O(log n)"
      }
    },
    {
      "id": "on2",
      "text": {
        "en": "O(n²)",
        "ar": "O(n²)"
      }
    }
  ],
  "correctAnswer": "on",
  "explanation": {
    "en": "In the worst case (when the target is at the last position or absent), Linear Search inspects all n elements sequentially, taking O(n) time.",
    "ar": "في أسوأ الحالات (عندما يكون الهدف في النهاية أو غير موجود)، يفحص البحث الخطي جميع العناصر الـ n بالتسلسل، مستغرقاً وقت O(n)."
  }
} as AssessmentQuestion,
{
  "id": "AL-LNS-E-002",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Linear Search",
  "specialization": "Best Case",
  "difficulty": "easy",
  "type": "complexity",
  "question": {
    "en": "In Best-Case analysis of Linear Search on a 1,000,000-item array, how many elements are inspected before returning?",
    "ar": "في أفضل حالة (Best Case) للبحث الخطي على مصفوفة طولها مليون عنصر، كم عنصراً يُفحص قبل التوقف؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "1 comparison (`O(1)`) when index 0 matches target",
        "ar": "عنصر واحد (`O(1)`) إذا وُجد الهدف في الفهرس 0"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "log2(N) ~ 20 comparisons",
        "ar": "20 مقارنة (لوغاريتمياً)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "500,000 comparisons average",
        "ar": "نصف مليون مقارنة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "1,000,000 full array comparisons",
        "ar": "مليون مقارنة كاملة"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "If the desired target sits at `arr[0]`, linear search hits on step 1 and returns immediately in `O(1)`.",
    "ar": "إذا صادف الهدف أول عنصر يتوقف البحث فوراً بعد مقارنة واحدة."
  },
  "tags": [
    "linear-search",
    "best-case",
    "searching"
  ]
} as AssessmentQuestion,
{
  "id": "AL-LNS-M-003",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Linear Search",
  "specialization": "Last Occurrence Scan",
  "difficulty": "medium",
  "type": "code-trace",
  "codeSnippet": "int lastIdx = -1;\nfor (int i = n - 1; i >= 0; i--) {\n  if (a[i] == target) { lastIdx = i; break; }\n}",
  "codeLanguage": "cpp",
  "question": {
    "en": "Why scan backward (`n - 1` down to `0`) cleanly when searching solely for the LAST occurrence of `target` in an unsorted list?",
    "ar": "لماذا نبدأ المسح الخطي من النهاية `n - 1` نزولاً نحو `0` عند البحث عن **آخر ظهور** للهدف في مصفوفة غير مرتبة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Prevents slow quadratic O(N²) array re-sorting inside unsigned descending indices",
        "ar": "يمنع تعقيد الفرز التربيعي O(N²) ويحول المصفوفة غير المرتبة لبنية بحث ثنائية تلقائياً"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "First hit from the right IS the last occurrence, enabling immediate return",
        "ar": "أول تطابق من اليمين هو نفسه آخر ظهور، فيتوقف فوراً عبر `break`"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Scanning backward reorganizes unsorted lists cleanly into sorted binary search trees",
        "ar": "لأن ذاكرة الوصول العشوائي تقرأ العناصر عكسياً بزمن لوغاريتمي أسرع O(log N)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "RAM reads backwards in O(log N) hardware time",
        "ar": "لأن الذاكرة تقرأ عكسياً بـ O(log N)"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Scanning from the tail stops immediately at the highest matching index without scanning earlier prefix entries unnecessarily.",
    "ar": "البحث العكسي يعطي آخر موضع بأول تطابق دون إكمال باقي المصفوفة."
  },
  "tags": [
    "linear-search",
    "optimization",
    "arrays"
  ]
} as AssessmentQuestion,
{
  "id": "AL-LNS-M-004",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Linear Search",
  "specialization": "Sorting Break-Even",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "You receive an UNSORTED array of `10^6` integers and must check existence for only ONE single query `X`. Which strategy wins?",
    "ar": "لديك مصفوفة **غير مرتبة** من مليون رقم وتريد التحقق من وجود رقم واحد `X` لمرة واحدة فقط. أي طريقة أسرع؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Heap Sort (`O(N log N)`) followed by Binary Search (`O(log N)`)",
        "ar": "فرز المصفوفة أولاً ثم بحث ثنائي"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Build an AVL Tree across all items first (`O(N log N)`)",
        "ar": "بناء شجرة AVL كاملة أولاً"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Direct O(N) Linear Scan without spending O(N log N) sorting first",
        "ar": "بحث خطي مباشر بزمن `O(N)` دون دفع تكلفة الفرز `O(N log N)`"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Bubble Sort backward (`O(N^2)`)",
        "ar": "فرز الفقاعة التنازلي"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Sorting pays `~20M` operations; scanning once visits at most `1M` elements in cache-friendly sequential order!",
    "ar": "الفرز يتطلب نحو 20 ضعف عدد العمليات لعملية بحث واحدة فقط؛ لذا ينتصر البحث الخطي لمرة واحدة."
  },
  "tags": [
    "linear-search",
    "tradeoffs",
    "sorting"
  ]
} as AssessmentQuestion,
{
  "id": "AL-LNS-E-005",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Linear Search",
  "specialization": "Linked Lists",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why must searching inside a sorted Linked List fall back to `O(N)` traversal instead of `O(log N)` Binary Search?",
    "ar": "لماذا يضطر البحث داخل قائمة مترابطة مرتبة إلى `O(N)` بدلاً من تطبيق البحث الثنائي بزمن `O(log N)`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Linked lists strictly forbid storing sorted integer keys in node memory blocks",
        "ar": "القوائم المترابطة تمنع تخزين الأعداد المرتبة تصاعدياً داخل عقدها في الذاكرة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Dereferencing adjacent node pointers incurs O(N²) CPU arithmetic translation cost",
        "ar": "تكلفة مقارنة المؤشرات تبلغ O(N²) في العتاد بسبب تشتت العناوين عن جدول التقسيم"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Modulo division fails on heap addresses",
        "ar": "القسمة لا تعمل مع المؤشرات"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "No O(1) random midpoint access; reaching `mid` takes O(N) pointer hops",
        "ar": "غياب الوصول العشوائي في O(1)؛ فبلوغ المنتصف يتطلب O(N) قفزة متتالية"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Binary Search requires `O(1)` midpoint lookup (`arr[mid]`), which contiguous arrays support and pointer lists do not.",
    "ar": "تعتمد سرعة البحث الثنائي على الوصول للمنتصف فورياً `arr[mid]`، وهذا غير متاح في Linked List."
  },
  "tags": [
    "linear-search",
    "linked-list",
    "binary-search"
  ]
} as AssessmentQuestion,
{
  "id": "AL-LNS-H-006",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Linear Search",
  "specialization": "Return Inside Loop",
  "difficulty": "hard",
  "type": "debugging",
  "codeSnippet": "int search(const vector<int>& a, int t) {\n  for (int i = 0; i < (int)a.size(); i++) {\n    if (a[i] == t) return i;\n    return -1;\n  }\n  return -1;\n}",
  "codeLanguage": "cpp",
  "question": {
    "en": "Trace calling `search({5, 9, 12}, 12)` on this broken function. What does it return incorrectly and why?",
    "ar": "تتبّع استدعاء `search({5, 9, 12}, 12)` في هذا الكود المعطوب؛ ما الناتج الخطأ ولماذا؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Returns -1 at `i = 0` because `return -1` executes inside the loop",
        "ar": "يعيد -1 فوراً عند `i = 0` لوجود `return -1` داخل الحلقة قبل إكمالها"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Returns valid target index `2` cleanly after checking all three integer array slots",
        "ar": "يعيد الفهرس الصحيح `2` بنجاح بعد فحص العناصر الثلاثة كلها بالترتيب داخل الحلقة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Returns raw target element `12` directly instead of returning its matched array index",
        "ar": "يعيد القيمة المستهدفة `12` نفسها بالخطأ بدلاً من إرجاع موقعها الفهرسي الصحيح"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Loops infinitely forever",
        "ar": "يدخل في حلقة لا نهائية"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Only return `-1` AFTER checking ALL elements outside the `for` loop.",
    "ar": "عدم مطابقة `a[0]` لا يعني عدم وجود الهدف لاحقاً؛ يجب ترك `return -1` لخارج الحلقة."
  },
  "tags": [
    "debugging",
    "linear-search",
    "bugs"
  ]
} as AssessmentQuestion
];
