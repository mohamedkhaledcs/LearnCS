import { AssessmentQuestion } from '@/lib/assessment/schema';

export const constants_questions: AssessmentQuestion[] = [
{
  "id": "PF-CONST-E-001",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Variables & Data Types",
  "subtopic": "Constants",
  "specialization": "Immutability",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why should fixed configuration values like `PI` or `MAX_RETRIES` be declared `const` instead of mutable variables?",
    "ar": "لماذا يفضل تعريف القيم الثابتة مثل `PI` أو `MAX_RETRIES` باستخدام `const` بدلاً من متغيرات عادية؟"
  },
  "options": [
    {
      "id": "ram",
      "text": {
        "en": "Constants occupy literally zero bytes in machine instructions, stack frames, and data RAM",
        "ar": "الثوابت لا تستهلك أي بايت مطلقاً في الذاكرة ولا توجد داخل الملف التنفيذي النهائي"
      }
    },
    {
      "id": "safe",
      "text": {
        "en": "Prevents accidental mutation and signals fixed intent across the codebase",
        "ar": "يمنع التعديل الخطأ ويوضح ثبات القيمة للمبرمج والمترجم"
      }
    },
    {
      "id": "net",
      "text": {
        "en": "Mutable variables cannot be evaluated cleanly inside iterative loop headers or closures",
        "ar": "المتغيرات العادية القابلة للتعديل يُمنع استخدامها داخل حلقات التكرار في اللغات الحديثة"
      }
    },
    {
      "id": "type",
      "text": {
        "en": "const converts integers to strings automatically",
        "ar": "تحول الأرقام لنصوص تلقائياً"
      }
    }
  ],
  "correctAnswer": "safe",
  "explanation": {
    "en": "Marking unchanging bindings `const`/`final` enforces read-only invariants at compile time and eliminates bugs caused by unintended mutation.",
    "ar": "الالتزام بـ const يمنع إعادة الإسناد العرضي ويكشف الأخطاء وقت الترجمة كما يحسن قابلية القراءة."
  },
  "tags": [
    "variables",
    "constants"
  ]
} as AssessmentQuestion,
{
  "id": "PF-VAR-E-003",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Variables & Data Types",
  "subtopic": "Constants",
  "specialization": "Immutability",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why should architectural constants like `MAX_RETRY_COUNT` or `TAX_RATE` be declared using `const` / `readonly`?",
    "ar": "لماذا نعرّف الثوابت مثل `MAX_RETRY_COUNT` باستخدام `const` أو `readonly` بدلاً من متغير عادي؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "To allow external functions to reassign the limit dynamically mid-loop",
        "ar": "للسماح للدوال الأخرى بتعديل الحد أثناء الحلقات"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "To automatically serialize variables straight into browser localStorage",
        "ar": "لحفظ المتغير تلقائياً في localStorage"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "To block accidental reassignment and clarify unchanging intent cleanly",
        "ar": "لمنع إعادة التعيين الخطأ وإظهار أن القيمة ثابتة في التصميم"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Because compilers refuse compiling lowercase integer identifiers cleanly",
        "ar": "لأن المترجم يرفض المتغيرات غير الثابتة"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Constants document immutability directly to teammates and turn accidental overwrites into immediate compile-time errors.",
    "ar": "تفرض الثوابت حماية من التعديل العرضي وترفع وضوح الكود وقابليته للصيانة."
  },
  "tags": [
    "const",
    "constants",
    "clean-code"
  ]
} as AssessmentQuestion
];
