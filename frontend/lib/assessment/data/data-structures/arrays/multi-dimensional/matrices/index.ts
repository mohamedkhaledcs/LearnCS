import { AssessmentQuestion } from '@/lib/assessment/schema';

export const matrices_questions: AssessmentQuestion[] = [
{
  "id": "DS-MAT-M-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Arrays",
  "subtopic": "Matrices",
  "specialization": "Row-Major Memory Layout",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "In C/C++ (row-major order), which nested loop order maximizes cache hits when summing a 4096×4096 2D matrix A[r][c]?",
    "ar": "في لغات مثل C/C++ ذات التخزين Row-Major، أي ترتيب للحلقات المتداخلة يحقق أعلى استفادة من الكاش عند جمع مصفوفة A[r][c]؟"
  },
  "options": [
    {
      "id": "rc",
      "text": {
        "en": "Outer loop over rows r, inner loop over columns c",
        "ar": "الحلقة الخارجية للصفوف r والداخلية للأعمدة c"
      }
    },
    {
      "id": "cr",
      "text": {
        "en": "Outer loop over columns c, inner loop over rows r",
        "ar": "الحلقة الخارجية للأعمدة c والداخلية للصفوف r"
      }
    },
    {
      "id": "both",
      "text": {
        "en": "Both produce identical hardware cache misses",
        "ar": "الترتيبان متطابقان تماماً في الأداء"
      }
    },
    {
      "id": "diag",
      "text": {
        "en": "Traversing anti-diagonals",
        "ar": "العبور القُطري العكسي"
      }
    }
  ],
  "correctAnswer": "rc",
  "explanation": {
    "en": "In row-major layout, A[r][c] and A[r][c+1] sit right next to each other in RAM. Stepping c in the inner loop streams sequential cache lines.",
    "ar": "في Row-Major تتجاور عناصر الصف الواحد في الذاكرة، لذا فالتحرك عبر الأعمدة c في الحلقة الداخلية يستغل الكاش بأفضل صورة."
  },
  "tags": [
    "arrays",
    "matrices",
    "memory"
  ]
} as AssessmentQuestion,
{
  "id": "DS-ARR-M-005",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Arrays",
  "subtopic": "2D Matrices",
  "specialization": "Row-Major Locality",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "For a 4000x4000 matrix in C++ or C#, why does outer-row / inner-column scanning (`m[r][c]`) outperform column-major loops (`m[c][r]`)?",
    "ar": "لمصفوفة ضخمة `4000x4000`، لماذا يكون المرور الصفّي `m[r][c]` أسرع من المرور العمودي `m[c][r]`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "32-bit integer column indices overflow stack hardware registers during swaps",
        "ar": "فهرس العمود لا يتسع داخل مسجلات المكدس فيؤدي لإبطاء تعليمات المقارنة المزدوجة"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Row elements sit adjacent in RAM, maximizing L1/L2 CPU cache hits",
        "ar": "تجاور عناصر الصف في RAM يرفع كفاءة مخبأ المعالج L1/L2 إلى أقصاها"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Nested C# runtime compilers reverse matrix rows into column arrays automatically",
        "ar": "تقلّص الحلقات الأفقية عدد مقارنات المعالج إلى النصف وتعكس الإحداثيات تلقائياً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "C# reverses matrix coordinates automatically during compilation",
        "ar": "لأن المترجم يعكس الإحداثيات"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Row-major memory layout puts `m[r][c+1]` right beside `m[r][c]`; column-major strides skip `4000 * sizeof(T)` bytes per step, causing constant cache misses.",
    "ar": "تخزين Row-major يضع عناصر الصف متلاصقة، بينما القفز بين الصفوف عمودياً يضيع الـ Cache في كل خطوة."
  },
  "tags": [
    "matrix",
    "cache-locality",
    "arrays"
  ]
} as AssessmentQuestion
];
