import { AssessmentQuestion } from '@/lib/assessment/schema';

export const basic_questions: AssessmentQuestion[] = [
{
  "id": "CP-SEG-M-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Range Queries",
  "subtopic": "Segment Tree",
  "specialization": "Memory & Complexity",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "For an array of size N, how much array space is safely allocated for a standard 1-indexed binary Segment Tree, and what is its build/query complexity?",
    "ar": "لمصفوفة بحجم N، كم الحجم الآمن لحجز Segment Tree ثنائية، وما هو تعقيد البناء والاستعلام؟"
  },
  "options": [
    {
      "id": "nlogn",
      "text": {
        "en": "N linear memory, O(N log N) build, and strict O(1) arbitrary point mutations",
        "ar": "مساحة خطية N فقط وبناء O(N log N) مع تحديث النقاط في وقت ثابت O(1)"
      }
    },
    {
      "id": "4n",
      "text": {
        "en": "4·N memory, O(N) build, O(log N) update/query",
        "ar": "مساحة 4·N، بناء O(N)، وتحديث/استعلام في O(log N)"
      }
    },
    {
      "id": "n2",
      "text": {
        "en": "N² matrix memory allocation with O(N²) build and constant query lookups",
        "ar": "حجز مصفوفة مربعة بحجم N² وبناء O(N²) لتحقيق استعلامات سريعة"
      }
    },
    {
      "id": "logn",
      "text": {
        "en": "log(N) memory, O(N) query",
        "ar": "مساحة log(N) واستعلام O(N)"
      }
    }
  ],
  "correctAnswer": "4n",
  "explanation": {
    "en": "Rounding N up to the next power of 2 can take up to 2N leaves, meaning a complete binary tree needs up to ~4N slots. Build visits each node once O(N), queries visit <= 4 log N nodes.",
    "ar": "لضمان عدم تجاوز المصفوفة عند تقريب N لأقرب قوة لـ 2، نحتاج حتى 4N عنصراً؛ ويبني هيكل الشجرة في O(N) ويستعلم في O(log N)."
  },
  "tags": [
    "cp",
    "segment-tree",
    "range-queries"
  ]
} as AssessmentQuestion,
{
  "id": "CP-RNG-M-004",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Advanced Data Structures",
  "subtopic": "Segment Trees",
  "specialization": "Lazy Propagation",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why does **Lazy Propagation** keep Segment Tree RANGE Updates (`add +v to ALL items in [L..R]`) fast at `O(log N)` instead of `O(N)`?",
    "ar": "كيف يحافظ **التحديث الكسول (Lazy Propagation)** في شجرة القطع Segment Tree على سرعة تحديث النطاق `[L..R]` في `O(log N)` بدلاً من `O(N)`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Caches pending range deltas on ancestor nodes, pushing down only when visited",
        "ar": "يحفظ التعديل المعلّق على العقدة المغطية ويمرره للأبناء فقط عند زيارتهم"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Skips left child subtrees permanently whenever updates exceed half of array N",
        "ar": "يتجاهل الفروع اليسرى من الشجرة كلياً كلما تجاوز نطاق التحديث نصف المصفوفة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Replaces segment leaf buffers with sequential static difference array sweeps cleanly",
        "ar": "يحذف الأوراق من الشجرة ويستعيض عنها بمسح مصفوفة فروق خطية ثابتة دائماً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Converts range minimum queries into simple difference array subtractions",
        "ar": "يستعمل مصفوفة الفروق"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Visiting at most `~4 log N` fully covered segment boundary nodes defers propagating down to leaves until needed cleanly.",
    "ar": "الوقوف عند العقد المغطاة بالكامل وتأجيل التمرير للأسفل يحفظ زمن الاستعلام والتحديث عند `O(log N)`."
  },
  "tags": [
    "segment-tree",
    "lazy-propagation",
    "cp"
  ]
} as AssessmentQuestion,
{
  "id": "CP-RNG-E-006",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Advanced Data Structures",
  "subtopic": "Segment Trees vs BIT",
  "specialization": "Structure Choice",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "For dynamic Range **Minimum** Queries with arbitrary point updates (NO range pops), why prefer Segment Tree over plain Fenwick BIT?",
    "ar": "لاستعلامات **أصغر قيمة في نطاق (Range Minimum Query)** مع تحديثات نقطية عشوائية، لماذا نختار Segment Tree بدلاً من Fenwick BIT البسيطة؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Standard Fenwick BIT structures strictly fail on arrays with negative numbers",
        "ar": "تنهار شجرة Fenwick BIT كلياً وتخرج أرقاماً خاطئة مع المصفوفات ذات الأعداد السالبة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Segment Trees execute point assignments inside sorted ranges in strict O(1) steps",
        "ar": "تقوم شجرة القطع بتحديث قيم العناصر المفردة في وقت ثابت O(1) أسرع من كل الشجر"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "`min` has no inverse like subtraction, while Segment Trees merge any subranges",
        "ar": "تفتقر `min` لعملية عكسية كالطرح، بينما تدمج شجرة القطع الفترتين مباشرة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "BIT arrays exceed 64-bit integer addressing limits at N = 1000",
        "ar": "لأن BIT تتجاوز الذاكرة عند 1000"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "BIT answers prefix `[1..R]` and `[1..L-1]` requiring an inverse `-` to isolate `[L..R]` (works for `+` and `^`, NOT `min`/`max`/`gcd` cleanly); Segment Trees merge left/right children directly!",
    "ar": "استعلام المدى `[L..R]` في BIT يعتمد على طرح `[1..L-1]` من `[1..R]` وهذا يتطلب عملية عكسية غير موجودة في `min` أو `gcd`."
  },
  "tags": [
    "segment-tree",
    "fenwick-tree",
    "rmq"
  ]
} as AssessmentQuestion
];
