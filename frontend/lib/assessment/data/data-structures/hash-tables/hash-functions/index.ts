import { AssessmentQuestion } from '@/lib/assessment/schema';

export const hash_functions_questions: AssessmentQuestion[] = [
{
  "id": "DS-HASHF-M-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Hash Tables",
  "subtopic": "Hash Functions & Load Factor",
  "specialization": "Rehashing",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why do standard Hash Table implementations resize (rehash) when the Load Factor α = N / M exceeds a threshold (e.g. 0.75)?",
    "ar": "لماذا توسع جداول التجزئة حجمها (Rehashing) عندما يتجاوز معامل التحميل α = N / M حداً معيناً مثل 0.75؟"
  },
  "options": [
    {
      "id": "o1avg",
      "text": {
        "en": "Keeps probe chains short to maintain O(1) expected lookup time",
        "ar": "لتقليص التصادمات وإبقاء متوسط زمن البحث والإدراج عند O(1)"
      }
    },
    {
      "id": "enc",
      "text": {
        "en": "To re-encrypt stored keys cleanly with stronger 256-bit hashing keys automatically",
        "ar": "لتشفير جميع مفاتيح الجدول تلقائياً بمفاتيح أمان أطول عند ازدياد عدد العناصر"
      }
    },
    {
      "id": "sort",
      "text": {
        "en": "So keys stay sorted alphabetically",
        "ar": "للحفاظ على المفاتيح مرتبة أبجدياً"
      }
    },
    {
      "id": "free",
      "text": {
        "en": "To shrink physical RAM consumption down cleanly whenever collisions occur",
        "ar": "لتقليل استهلاك الذاكرة الفيزيائية وإعادة المساحة الزائدة للنظام عند امتلاء السلاسل"
      }
    }
  ],
  "correctAnswer": "o1avg",
  "explanation": {
    "en": "As N approaches or exceeds bucket count M, collision probability grows rapidly toward O(N) chains/clusters. Doubling capacity and rehashing keeps average O(1) amortized cost.",
    "ar": "كلما ارتفع معامل التحميل زادت التصادمات واقترب الأداء من O(N)؛ ومضاعفة السعة مع إعادة التوزيع تحافظ على O(1) مستهلك."
  },
  "tags": [
    "hash-tables",
    "load-factor"
  ]
} as AssessmentQuestion,
{
  "id": "DS-HSH-E-002",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Hash Tables",
  "subtopic": "Hash Functions",
  "specialization": "Deterministic Mapping",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What non-negotiable invariant MUST any valid Hash Table hash function `h(key)` guarantee?",
    "ar": "ما الخاصية الإلزامية التي يجب أن تضمنها أي دالة تجزئة `h(key)` صالحة داخل جدول التجزئة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Equal keys MUST always map to the exact same hash bucket deterministically",
        "ar": "المفاتيح المتساوية يجب أن تعطي دائماً نفس ناتج التجزئة بثبات تام"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Different keys can never share any hash bucket even inside finite arrays",
        "ar": "مستحيل تماماً تطابق مفتاحين مختلفين في دلو واحد"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Hashing preserves strictly ascending lexicographical sorting order",
        "ar": "تحافظ دالة التجزئة على الترتيب الأبجدي التصاعدي"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Hash values change randomly upon consecutive dictionary reads",
        "ar": "تتغير قيمة التجزئة عشوائياً في كل قراءة"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Without determinism (`k1 == k2 => h(k1) == h(k2)`), lookups would inspect the wrong bucket; collisions CAN occur and are handled by chaining/probing.",
    "ar": "التكرار المتوقع للتصادم يُحل بالسلاسل، لكن التحديد الحتمي للمفتاح نفسه شرط أساسي وإلا ضاعت القيمة."
  },
  "tags": [
    "hash-table",
    "hashing",
    "invariants"
  ]
} as AssessmentQuestion,
{
  "id": "DS-HSH-M-004",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Hash Tables",
  "subtopic": "HashMap vs TreeMap",
  "specialization": "Ordering Tradeoff",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why choose an ordered Balanced BST map (`std::map` / `TreeMap`, `O(log N)`) over an `unordered_map` (`O(1)` avg)?",
    "ar": "متى يفضَّل اختيار خريطة شجرية مرتبة (`std::map` / `TreeMap` بزمن `O(log N)`) بدلاً من `unordered_map` (`O(1)`)؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "When TreeMaps completely eliminate pointer node memory overhead per element",
        "ar": "لأن خرائط الأشجار تلغي الحاجة لحجز أي مؤشرات عقد داخل الذاكرة تماماً مقارنة بالجدول"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "When seeking strictly O(1) expected key lookup without sorted range scans",
        "ar": "عندما نحتاج لبحث متوسط O(1) ثابت دون أي متطلبات للترتيب الأبجدي أو النطاقي"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "When needing sorted key traversal, `lower_bound` queries, or worst-case O(log N)",
        "ar": "عند طلب المرور المرتب، أو `lower_bound`، أو ضمان أسوأ حالة O(log N)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "When seeking strictly O(1) lookup without needing range ordering",
        "ar": "عند الحاجة لبحث O(1) بدون ترتيب"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Hash maps scatter keys arbitrarily so range/successor queries take `O(N)`; balanced BST maps maintain sorted invariants at `O(log N)`.",
    "ar": "جداول التجزئة تفقد الترتيب ولا تدعم `lower_bound`، بينما تحفظ الأشجار المتوازنة الترتيب مع أمان ضد تصادمات أسوأ حالة."
  },
  "tags": [
    "hashmap",
    "treemap",
    "tradeoffs"
  ]
} as AssessmentQuestion,
{
  "id": "DS-HSH-H-005",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Hash Tables",
  "subtopic": "Mutable Keys",
  "specialization": "Hash Corruption",
  "difficulty": "hard",
  "type": "scenario",
  "question": {
    "en": "What severe bug happens if a mutable object inserted into a Python `set` or Java `HashMap` mutates a field used inside its hash calculation?",
    "ar": "ما الخطأ الخطير الذي يقع إذا تغير حقل يُحسب منه الـ Hash داخل كائن بعد إدراجه كمفتاح في `HashMap` أو `HashSet`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "The runtime intercepts property writes automatically and rehashes the object in O(1)",
        "ar": "تلتقط الخريطة أي تعديل على الحقل تلقائياً وتنقل الكائن للدلو الصحيح في زمن O(1)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Surrounding table buckets collapse proportionally cutting allocated heap capacity by half",
        "ar": "تتقلص دلاء الجدول تلقائياً للنصف وتتحول كافة المفاتيح المجاورة لأرقام سالبة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "All unrelated keys turn negative immediately",
        "ar": "تتحول بقية المفاتيح لأعداد سالبة"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Entry stays stranded in its old bucket while lookups check its new hash bucket",
        "ar": "يبقى الكائن في الدلو القديم بينما تبحث الخريطة في الدلو الجديد فتفقده"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Hash keys must remain immutable while stored inside a hash container; otherwise the computed bucket diverges from actual placement.",
    "ar": "لذا تُشترط مفاتيح غير قابلة للتعديل مثل النصوص و`tuple` لأن تغير الـ Hash يُفقد أثر العنصر داخل الجدول."
  },
  "tags": [
    "immutable-keys",
    "hash-table",
    "edge-case"
  ]
} as AssessmentQuestion,
{
  "id": "DS-HSH-E-006",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Hash Tables",
  "subtopic": "Rehashing",
  "specialization": "Load Factor",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What metric `alpha = elementCount / bucketCount` guides when a dynamic Hash Table allocates a larger bucket table?",
    "ar": "ما المقياس `elementCount / bucketCount` الذي يدفع جدول التجزئة إلى توسيع مصفوفته (Rehashing)؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Load Factor",
        "ar": "معامل الامتلاء"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Tree Height Ratio",
        "ar": "نسبة ارتفاع الشجرة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "TLB Hit Rate",
        "ar": "معدل إصابة TLB"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Quantum Slice",
        "ar": "الشريحة الزمنية"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Keeping Load Factor bounded (`~0.75` max) preserves short average bucket chains and O(1) lookup.",
    "ar": "إبقاء معامل الامتلاء تحت ~0.75 يحفظ سلاسل التصادم قصيرة وسرعة الوصول فورية."
  },
  "tags": [
    "load-factor",
    "rehashing",
    "hash-table"
  ]
} as AssessmentQuestion
];
