import { AssessmentQuestion } from '@/lib/assessment/schema';

export const logical_questions: AssessmentQuestion[] = [
{
  "id": "PF-LOG-E-001",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Operators & Expressions",
  "subtopic": "Logical Operators",
  "specialization": "Short-Circuit Guard",
  "difficulty": "easy",
  "type": "code-trace",
  "codeLanguage": "cpp",
  "codeSnippet": "if (ptr != nullptr && ptr->isValid()) {\n    process(ptr);\n}",
  "question": {
    "en": "Why does placing `ptr != nullptr` FIRST prevent a null-pointer crash here?",
    "ar": "لماذا يمنع وضع `ptr != nullptr` أولاً حدوث انهيار (Null Pointer Crash) في هذا الشرط؟"
  },
  "options": [
    {
      "id": "swap",
      "text": {
        "en": "The compiler launches both left and right boolean operands concurrently and masks traps",
        "ar": "ينفذ المترجم طرفي الشرط معاً بالتوازي ثم يتجاهل أي خطأ وصول للذاكرة إذا كان أحدهما false"
      }
    },
    {
      "id": "cast",
      "text": {
        "en": "&& converts nullptr to an empty object",
        "ar": "تحوّل && المؤشر الفارغ لكائن"
      }
    },
    {
      "id": "order",
      "text": {
        "en": "Standard C++ and Java always evaluate `&&` operands strictly from right to left",
        "ar": "تقوم لغات البرمجة بتقييم معاملات `&&` من اليمين إلى اليسار دائماً قبل التحقق"
      }
    },
    {
      "id": "sc",
      "text": {
        "en": "Short-circuiting skips `ptr->isValid()` whenever `ptr != nullptr` fails",
        "ar": "التقييم المختصر يتوقف عند فشل `ptr != nullptr` ولا يستدعي `ptr->isValid()`"
      }
    }
  ],
  "correctAnswer": "sc",
  "explanation": {
    "en": "For `A && B`, if `A` is false the whole expression cannot be true, so `B` is never evaluated: protecting null/bounds guards across C++, Java, C#, JS, and Python.",
    "ar": "في عامل الوصل &&، إذا كان الطرف الأيسر false فنتيجة التعبير حتماً false فيتوقف التقييم فوراً دون فحص الطرف الأيمن."
  },
  "tags": [
    "control-flow",
    "logic",
    "branching"
  ]
} as AssessmentQuestion,
{
  "id": "PF-CND-M-003",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Operators & Expressions",
  "subtopic": "Logical Operators",
  "specialization": "Short-Circuit Guard",
  "difficulty": "medium",
  "type": "code-trace",
  "codeSnippet": "int idx = arr.size();\nif (idx < arr.size() && arr[idx] == 10) {\n  found = true;\n}",
  "codeLanguage": "cpp",
  "question": {
    "en": "Why does `if (idx < arr.size() && arr[idx] == 10)` avoid crashing with an out-of-bounds read here?",
    "ar": "لماذا لا ينهار الشرط `if (idx < arr.size() && arr[idx] == 10)` بقراءة خارج المصفوفة رغم أن `idx == arr.size()`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Right-hand operands run only asynchronously after the function returns",
        "ar": "لأن الطرف الأيمن يعمل بعد عودة الدالة"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "C++ arrays pad ten sentinel elements silently past `size()`",
        "ar": "لأن المصفوفة تضيف عشرة عناصر احتياطية"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Comparisons return `-1` safely whenever index bounds exceed length",
        "ar": "لأن المقارنة ترجع -1 عند تجاوز الطول"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "`&&` stops immediately when `idx < arr.size()` is false via short-circuiting",
        "ar": "يتوقف المعامل `&&` فوراً عند فشل `idx < arr.size()` بفضل التقييم المختصر"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "Left-to-right short-circuit evaluation refuses evaluating `arr[idx]` once the bounds check returns false.",
    "ar": "فشل الجزء الأيسر يمنع تنفيذ الجزء الأيمن تماماً، مما يحمي من تجاوز الحدود."
  },
  "tags": [
    "short-circuit",
    "logical-operators",
    "safety"
  ]
} as AssessmentQuestion,
{
  "id": "PF-CND-E-005",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Operators & Expressions",
  "subtopic": "Logical Operators",
  "specialization": "De Morgan",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which condition matches `!(isExpired || isBlocked)` identically cleanly for booleans?",
    "ar": "أي عبارة منطقية تكافئ التعبير `!(isExpired || isBlocked)` تماماً؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "!isExpired || !isBlocked",
        "ar": "!isExpired || !isBlocked"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "!isExpired && !isBlocked",
        "ar": "!isExpired && !isBlocked"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "isExpired && !isBlocked",
        "ar": "isExpired && !isBlocked"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "!(isExpired && isBlocked)",
        "ar": "!(isExpired && isBlocked)"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "De Morgan's Law distributes `!` over OR by flipping it to AND: `!(A || B) <=> !A && !B`.",
    "ar": "حسب قانون دي مورغان ينقلب `||` إلى `&&` مع نفي الطرفين."
  },
  "tags": [
    "logic",
    "de-morgan",
    "conditionals"
  ]
} as AssessmentQuestion
];
