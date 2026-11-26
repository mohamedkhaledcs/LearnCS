import { AssessmentQuestion } from '@/lib/assessment/schema';

export const coordinate_compression_questions: AssessmentQuestion[] = [
{
  "id": "CP-COORD-M-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Techniques",
  "subtopic": "Coordinate Compression",
  "specialization": "Large Domains",
  "difficulty": "medium",
  "type": "scenario",
  "question": {
    "en": "You have N = 10⁵ coordinates up to 10⁹ that must be indexed into a Fenwick Tree. How do you handle the 10⁹ value range?",
    "ar": "لديك N = 10⁵ إحداثيات تصل قيمتها إلى 10⁹ وتحتاج فهرستها في Fenwick Tree؛ كيف تتعامل مع هذا المدى الضخم؟"
  },
  "options": [
    {
      "id": "alloc",
      "text": {
        "en": "Statically allocate a 10^9-element global C++ integer buffer inside fixed BSS memory",
        "ar": "حجز مصفوفة ثابتة ضخمة بحجم مليار عنصر مباشرة في الذاكرة العامة قبل بدء الحل"
      }
    },
    {
      "id": "mod",
      "text": {
        "en": "Index values straight via modulo `x % 10^5` collisions inside the Fenwick tree buffer",
        "ar": "استخدام باقي القسمة `x % 10^5` مباشرة كفهرس داخل شجرة Fenwick دون معالجة التصادم"
      }
    },
    {
      "id": "float",
      "text": {
        "en": "Convert integers to IEEE-754 floats",
        "ar": "تحويلها لأعداد عشرية float"
      }
    },
    {
      "id": "comp",
      "text": {
        "en": "Coordinate Compression maps sorted unique values to compact ranks [1..N]",
        "ar": "ضغط الإحداثيات: فرز القيم الفريدة واستبدال كل قيمة برتبتها في [1..N]"
      }
    }
  ],
  "correctAnswer": "comp",
  "explanation": {
    "en": "Only the relative ordering between the at most 10⁵ coordinates matters for comparisons/Fenwick queries, so mapping unique values to [1..N] reduces space from 10⁹ to 10⁵ in O(N log N).",
    "ar": "لأن المطلوب هو الحفاظ على الترتيب النسبي فقط، يتم تعيين الرتبة [1..N] للقيم الفريدة مما يقلص الذاكرة إلى 10⁵ فقط."
  },
  "tags": [
    "cp",
    "coordinate-compression",
    "range-queries"
  ]
} as AssessmentQuestion,
{
  "id": "CP-INT-M-004",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Competitive Programming",
  "subtopic": "Verdicts",
  "specialization": "RE vs TLE vs MLE",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "An online judge returns **RTE / Runtime Error (SIGSEGV)** on test 4 even though small sample tests passed. What is the likeliest cause?",
    "ar": "عند تسليم حل لمسابقة يظهر الحكم **Runtime Error (RE / SIGSEGV)** في الاختبار الرابع رغم نجاح الأمثلة الصغيرة؛ ما السبب الأرجح؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Algorithm ran strictly too slowly in O(N²) complexity without violating memory bounds",
        "ar": "الخوارزمية بطيئة فقط في الزمن التربيعي O(N²) دون حدوث أي خطأ في الذاكرة أو المكدس"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Out-of-bounds access, division by zero, or deep recursion overflow on max inputs",
        "ar": "تجاوز حدود المصفوفة، قسمة على صفر، أو فيضان المكدس مع القيود القصوى"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Returning Wrong Answer on 64-bit floating-point decimal rounding precision boundaries",
        "ar": "طباعة مسافة بيضاء زائدة أو خطأ تقريب عشري بسيط عند مقارنة مخرجات الإجابة النهائية"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Returning Wrong Answer on arithmetic rounding precision",
        "ar": "خطأ تقريب عشري فقط"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Slow execution yields `TLE` (Time Limit); wrong logic yields `WA`; crashing via invalid memory/division/stack yields `RTE`!",
    "ar": "البطء يعطي `TLE` والنتيجة الخطأ تعطي `WA`، أما الانهيار وتجاوز الحدود فيعطي `Runtime Error`."
  },
  "tags": [
    "judge-verdicts",
    "debugging",
    "cp"
  ]
} as AssessmentQuestion,
{
  "id": "CP-INT-H-005",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Competitive Programming",
  "subtopic": "Meet in the Middle",
  "specialization": "Splitting Exponential N=40",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "Given `N = 40` numbers (`a[i] <= 10^12`), can any subset sum equal `T`? Why does **Meet in the Middle** solve `N = 40` smoothly?",
    "ar": "بوجود `N = 40` رقماً ضخماً تصل لقيمة `10^12`، كيف تحل تقنية **اللقاء في المنتصف (Meet in the Middle)** مسألة وجود مجموعة جزئية مجموعها `T`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Allocates a contiguous 1D DP matrix of length `T = 10^13` directly in heap memory",
        "ar": "يحجز مصفوفة برمجة ديناميكية ضخمة بحجم `10^13` عنصر مباشرة داخل الذاكرة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Executes full `O(2^40)` subset enumeration comfortably within ten milliseconds",
        "ar": "يختبر كافة الاحتمالات البالغة `2^40` حالة متتالية بسهولة في أقل من عشر مللي ثانية"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Splits N=40 into two 20-item halves (~10^6 sums each) and searches complements",
        "ar": "يقسم النطاق لنصفين بحجم 20 (~مليون مجموع) ثم يطابق المكملات بالبحث الثنائي"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Sorts elements ascending and greedily subtracts largest prefixes",
        "ar": "تطرح أكبر العناصر جشعاً"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "`2^40 ~ 10^12` overflows 1s badly; halving cuts exponent to `2 * 2^20 ~ 2 * 10^6` matched via sorting + binary search/two pointers!",
    "ar": "`2^40` مستحيل زمنياً، بينما تنصيفها إلى مجموعتي `2^20` (~مليون) ينفذ بسهولة مع البحث الثنائي."
  },
  "tags": [
    "meet-in-the-middle",
    "cp",
    "algorithms"
  ]
} as AssessmentQuestion,
{
  "id": "CP-INT-E-006",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Competitive Programming",
  "subtopic": "Coordinate Compression",
  "specialization": "Compressing Huge Ranges",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "When `N = 10^5` coordinates span huge bounds `[-10^9, +10^9]` and only relative ordering (`<, ==`) matters for BIT/Freq counting, which technique maps them into `[0..N-1]`?",
    "ar": "عندما تصل قيم `N = 10^5` عنصر إلى حدود `10^9` ولكن يهمنا ترتيبها النسبي فقط لبناء BIT أو مصفوفة تكرار، ما التقنية المستخدمة لضغطها في `[0..N-1]`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Bellman-Ford negative cycle relaxation table flattening across 64-bit bounds",
        "ar": "تسطيح خوارزمية بيلمان فورد وحجز مصفوفة منطقية بحجم مليارين في الذاكرة مباشرة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Allocating a flat two-billion-entry global boolean lookup array directly in RAM",
        "ar": "تحويل كافة الأعداد الصحيحة الكبيرة تلقائياً إلى سلاسل نصية بالنظام الست عشري Hex"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Converting integers cleanly into Base-16 hex text",
        "ar": "تحويلها لنصوص Hex"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Coordinate Compression",
        "ar": "ضغط الإحداثيات (Coordinate Compression)"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Mapping sparse huge values cleanly into compact ranks `[0 .. U-1]` preserves order invariants while shrinking space to `O(N)`.",
    "ar": "تحويل القيم المتباعدة إلى رتب متسلسلة متقاربة يحافظ على الترتيب ويسمح باستخدام فهارس مصفوفة صغيرة."
  },
  "tags": [
    "coordinate-compression",
    "cp",
    "arrays"
  ]
} as AssessmentQuestion
];
