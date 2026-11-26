import { AssessmentQuestion } from '@/lib/assessment/schema';

export const return_values_questions: AssessmentQuestion[] = [
{
  "id": "PF-RET-E-001",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Functions",
  "subtopic": "Return Values",
  "specialization": "Early Return",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How does executing a `return` statement affect remaining code inside the same function, and why is Early Return recommended?",
    "ar": "كيف يؤثر تنفيذ جملة `return` على باقي السطور داخل نفس الدالة، ولماذا يُنصح بـ Early Return؟"
  },
  "options": [
    {
      "id": "loop",
      "text": {
        "en": "Breaks only out of inner nested loops and runs remaining trailing lines afterward",
        "ar": "يخرج فقط من الحلقة التكرارية الداخلية ويكمل تنفيذ بقية الأسطر أسفل الدالة"
      }
    },
    {
      "id": "slow",
      "text": {
        "en": "Triggers unnecessary compiler stack checks that slow application startup times",
        "ar": "يبطئ المترجم"
      }
    },
    {
      "id": "exit",
      "text": {
        "en": "Exits the function immediately, helping eliminate deep nesting",
        "ar": "ينهي الدالة فوراً ويرجع التحكم، مما يقلل التداخل العميق"
      }
    },
    {
      "id": "null",
      "text": {
        "en": "Erases global variables",
        "ar": "يمسح جميع المتغيرات العامة المرتبطة بالوحدة البرمجية قبل إغلاق الدالة"
      }
    }
  ],
  "correctAnswer": "exit",
  "explanation": {
    "en": "Guard clauses with early returns handle edge cases cleanly at the top of a function, keeping the happy path shallow and readable.",
    "ar": "تفحص شروط الحراسة المبكرة الحالات الاستثنائية وتخرج بـ return فوراً، فيبقى المسار الرئيسي واضحاً وبلا تعشيش زائد."
  },
  "tags": [
    "functions",
    "modular"
  ]
} as AssessmentQuestion,
{
  "id": "PF-FNC-E-004",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Functions",
  "subtopic": "Return Values",
  "specialization": "Void vs Return",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why is a helper returning a computed value usually easier to test and reuse than one mutating global state directly?",
    "ar": "لماذا يسهل اختبار وإعادة استخدام الدوال التي تُرجع القيم المحسوبة عبر `return` مقارنةً بتلك التي تعدل متغيرات عامة؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Void functions cannot use parameters or loops cleanly in any language",
        "ar": "لأن دوال void تمنع استخدام الحلقات والمعاملات"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Returning integers allocates unlimited permanent RAM outside functions",
        "ar": "لأن إرجاع الأرقام يحجز ذاكرة دائمة"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Pure input",
        "ar": "لأن الدوال المعتمِدة على مدخلاتها فقط خالية من الآثار الجانبية المخفية وسهلة التوقع"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Global variables automatically expire after one second",
        "ar": "لأن المتغيرات العامة تختفي بعد ثانية"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Decoupling calculations cleanly from shared side effects lets unit tests assert inputs against outputs deterministically.",
    "ar": "الدالة النقية تجعل اختبارات الوحدات سريعة وموثوقة بلا تهيئة لحالات عامة معقدة."
  },
  "tags": [
    "functions",
    "pure-functions",
    "testing"
  ]
} as AssessmentQuestion,
{
  "id": "PF-FNC-H-006",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Functions",
  "subtopic": "Return Values",
  "specialization": "Missing Return Path",
  "difficulty": "hard",
  "type": "debugging",
  "codeSnippet": "int clampPos(int x) {\n  if (x > 0) return x;\n  // forgot return 0 here\n}",
  "codeLanguage": "cpp",
  "question": {
    "en": "What risk occurs in C++ if execution falls off the end of a non-void function like `clampPos(-5)` without hitting `return`?",
    "ar": "ما الخطر في لغة C++ إذا خرج التنفيذ من دالة غير `void` مثل `clampPos(-5)` دون المرور بجملة `return`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Triggers Undefined Behavior returning unpredictable garbage or corrupt state",
        "ar": "يقع سلوك غير معرّف (Undefined Behavior) قد يعيد قيماً عشوائية أو يفسد التنفيذ"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Compiler automatically inserts `return 0;` identically to `main()`",
        "ar": "يضيف المترجم `return 0;` تلقائياً كما في `main()`"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Re-runs the function from the start automatically",
        "ar": "يعاد استدعاء الدالة من البداية"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Throws an automatic JavaScript `NaN` exception",
        "ar": "يرمي استثناء NaN"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Unlike `main()`, returning without a value in non-void C++ functions is Undefined Behavior; compile with `-Werror=return-type`!",
    "ar": "عدم وجود `return` في كل المسارات بالدوال غير الفارغة سلوك غير معرّف؛ فعّل تحذيرات المترجم لاكتشافه فوراً."
  },
  "tags": [
    "cpp",
    "return-values",
    "undefined-behavior"
  ]
} as AssessmentQuestion
];
