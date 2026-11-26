import { AssessmentQuestion } from '@/lib/assessment/schema';

export const difference_arrays_questions: AssessmentQuestion[] = [
{
  "id": "CP-DIFF-M-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Techniques",
  "subtopic": "Difference Arrays",
  "specialization": "Range Updates",
  "difficulty": "medium",
  "type": "code-trace",
  "codeLanguage": "cpp",
  "codeSnippet": "// Add +val to every element in [L, R]\ndiff[L] += val;\ndiff[R + 1] -= val;",
  "question": {
    "en": "How does performing Q range-add updates with a Difference Array diff[] achieve O(Q + N) total time?",
    "ar": "كيف يحقق تنفيذ Q تحديثاً للإضافة على نطاقات [L, R] باستخدام مصفوفة الفروق diff[] زمناً كلياً O(Q + N)؟"
  },
  "options": [
    {
      "id": "segtree",
      "text": {
        "en": "Internally constructs a 4N recursive Segment Tree node layout for each incoming query",
        "ar": "يشغل داخلياً شجرة Segment Tree بحجم 4N لكل عملية تحديث مدى تصل إلى الدالة"
      }
    },
    {
      "id": "sort",
      "text": {
        "en": "It sorts all updates descending first",
        "ar": "ترتب التحديثات تنازلياً أولاً"
      }
    },
    {
      "id": "o1upd",
      "text": {
        "en": "Updates 2 endpoints in O(1) per query, then rebuilds values via 1 prefix sum",
        "ar": "يعدّل حدين فقط في O(1) لكل تحديث ثم يعيد بناء المصفوفة بمسحPrefix Sum واحد"
      }
    },
    {
      "id": "n2",
      "text": {
        "en": "Immediately increments every array index from L to R inside each query iteration loop",
        "ar": "يعدل جميع العناصر الواقعة بين L و R فوراً داخل حلقة متداخلة عند كل طلب تحديث"
      }
    }
  ],
  "correctAnswer": "o1upd",
  "explanation": {
    "en": "Marking +val at L and -val at R+1 makes the final prefix sweep accumulate +val across [L..R] and cancel it starting at R+1.",
    "ar": "إضافة +val عند L وطرحها عند R+1 يجعل المجموع التراكمي اللاحق يُطبّق الزيادة على [L..R] فقط ويلغيها من R+1."
  },
  "tags": [
    "cp",
    "difference-arrays",
    "arrays"
  ]
} as AssessmentQuestion,
{
  "id": "CP-ARR-M-003",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Array Techniques",
  "subtopic": "Difference Array",
  "specialization": "Batch Updates",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which problem structure is tailor-made for a Difference Array (`D[L] += v; D[R+1] -= v`) rather than Segment Tree?",
    "ar": "أي نمط مسائل يناسب مصفوفة الفروق Difference Array بدقة دون الحاجة لشجرة قطع معقدة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Applying Q offline range additions first, followed by reading the final updated array once",
        "ar": "تطبيق Q تعديلاً على فترات أولاً ثم قراءة المصفوفة النهائية بعد دمج الفروق في النهاية"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Interleaving random point assignments with range minimum queries live at every step",
        "ar": "تداخل تعديلات النقاط مع استعلامات أصغر قيمة لحظياً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Finding shortest weighted paths along directed graphs with negative cycles",
        "ar": "حساب أقصر مسار بأوزان سالبة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Compressing Huffman frequencies inside sparse text files",
        "ar": "ضغط النصوص بشجرة هوفمان"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Difference arrays compress Q batch interval additions into O(1) each plus ONE O(N) final prefix reconstruction sweep.",
    "ar": "مصفوفة الفروق تنفذ كل تحديث فترة في `O(1)` متبوعة بمسح جمع تراكمي واحد في النهاية بزمن `O(N + Q)`."
  },
  "tags": [
    "difference-array",
    "cp",
    "ranges"
  ]
} as AssessmentQuestion,
{
  "id": "CP-ARR-M-006",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Array Techniques",
  "subtopic": "Difference Array",
  "specialization": "Right Boundary Safety",
  "difficulty": "medium",
  "type": "scenario",
  "codeSnippet": "// Apply +v to [L..R] cleanly inside 0-indexed N-length diff array",
  "codeLanguage": "cpp",
  "question": {
    "en": "When applying `D[L] += v; if (R + 1 < N) D[R + 1] -= v;` on an N-sized buffer, what bug hits if you skip the `R + 1 < N` guard?",
    "ar": "عند التعديل `D[L] += v; D[R + 1] -= v;`، ما الخطأ عند نسيان التحقق `if (R + 1 < N)` عندما يشمل التحديث آخر عنصر `R = N - 1`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Final prefix sweep wraps negative offsets silently back onto zero index cells",
        "ar": "تلتف عملية الجمع التراكمي تلقائياً وتعيد القيم السالبة إلى الخانة الصفرية دون ضرر"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "C++ range compilers automatically skip evaluating `D[N]` writes without crashing",
        "ar": "يتجاهل المترجم الكتابة عند الفهرس `N` تلقائياً ولا يؤثر ذلك على صحة النتائج"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Compilers automatically skip index `N` cleanly",
        "ar": "يتجاوز المترجم الفهرس N تلقائياً"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Accessing `D[N]` writes out-of-bounds unless `D` has size `N + 1`",
        "ar": "تكتب في `D[N]` خارج حدود المصفوفة ما لم تُحجز بحجم `N + 1` أو يُفحص الحد"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Sizing `D` to `N + 1` (or checking `R + 1 < N`) prevents out-of-bounds corruption when updating suffixes ending at `N - 1`.",
    "ar": "حجز `N + 1` أو وضع شرط الحماية يحمي الذاكرة عند انتهاء الفترة عند العنصر الأخير."
  },
  "tags": [
    "difference-array",
    "bounds",
    "edge-case"
  ]
} as AssessmentQuestion
];
