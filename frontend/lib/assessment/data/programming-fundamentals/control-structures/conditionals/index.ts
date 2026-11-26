import { AssessmentQuestion } from '@/lib/assessment/schema';

export const conditionals_questions: AssessmentQuestion[] = [
{
  "id": "PF-COND-E-001",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Control Structures",
  "subtopic": "Conditionals & Switch",
  "specialization": "Fallthrough & Branches",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "In C/C++/Java/JS `switch` statements, what happens if a matching `case` forgets the `break;` statement?",
    "ar": "في عبارة `switch` بلغات مثل C/C++/Java/JS، ماذا يحدث عند نسيان تعليمة `break;` في نهاية إحدى حالات `case`؟"
  },
  "options": [
    {
      "id": "stop",
      "text": {
        "en": "Modern C++, Java, and JavaScript compilers fail immediately with a syntax error if `break` is omitted",
        "ar": "تتوقف اللغات فور غياب `break` وتُظهر خطأ ترجمة إجبارياً يمنع تشغيل البرنامج نهائياً"
      }
    },
    {
      "id": "exit",
      "text": {
        "en": "Execution executes the matched statement once and jumps cleanly back to the first `case`",
        "ar": "ينفذ الحالة المطابقة ثم يقفز عائداً لأول `case` في بداية كتلة switch للتحقق من جديد"
      }
    },
    {
      "id": "skip",
      "text": {
        "en": "It breaks out automatically",
        "ar": "يخرج تلقائياً"
      }
    },
    {
      "id": "fall",
      "text": {
        "en": "Control falls through into subsequent `case` blocks until `break`",
        "ar": "يمر التنفيذ تلقائياً للحالات التالية (Fall-through) حتى يصادف `break`"
      }
    }
  ],
  "correctAnswer": "fall",
  "explanation": {
    "en": "Traditional C-style switch labels act as jump targets rather than self-contained blocks, requiring `break;` (or `return`) to prevent accidental fall-through.",
    "ar": "لا تغلق الحالات في C-style switch نفسها تلقائياً، لذا نحتاج إلى break لمنع تنفيذ الحالة التالية."
  },
  "tags": [
    "control-flow",
    "logic",
    "branching"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-PRG-M-005",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Type Checking",
  "subtopic": "Static Analysis",
  "specialization": "Compile Warnings",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What immediate value does TypeScript (`tsc --noEmit`) or C# strict static typing provide compared to untyped scripts?",
    "ar": "ما الفائدة المباشرة من الفحص الساكن الصارم للأنواع (مثل `TypeScript` أو `C#`) مقارنةً بالكتابة دون أنواع؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Replaces unit tests, API routing, and PostgreSQL indexing automatically",
        "ar": "يلغي الحاجة للاختبارات وقاعدة البيانات تماماً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Forces CPU clocks to run double speed in production browsers",
        "ar": "يضاعف تردد المعالج في المتصفح"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Converts Arabic interface strings dynamically to English tokens",
        "ar": "يترجم الواجهات تلقائياً"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Surfaces misspelled fields, null mismatches, and wrong types before running code",
        "ar": "يكتشف أخطاء الأسماء وأنواع المعاملات وتجاهل قيم null قبل تشغيل البرنامج أصلاً"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Static type checks catch API contract mismatches immediately during editing/CI builds.",
    "ar": "فحص الأنواع الساكن يوقف التمريرات الخاطئة وتغييرات الحقول قبل وصولها للمستخدمين."
  },
  "tags": [
    "typescript",
    "static-analysis",
    "quality"
  ]
} as AssessmentQuestion,
{
  "id": "PF-CND-E-002",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Control Structures",
  "subtopic": "Conditionals",
  "specialization": "Branch Order",
  "difficulty": "easy",
  "type": "debugging",
  "codeSnippet": "if (score >= 50) grade = 'C';\nelse if (score >= 90) grade = 'A';",
  "codeLanguage": "cpp",
  "question": {
    "en": "What bug occurs when `score = 96` enters this poorly ordered `if / else if` block?",
    "ar": "ما الخطأ الذي يحدث عند تمرير `score = 96` إلى هذا التسلسل الشرطي غير المرتب؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "It triggers syntax failure due to overlapping thresholds",
        "ar": "يفشل المترجم بسبب تداخل الشروط"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "It overwrites `'A'` twice after exiting `'C'`",
        "ar": "يكتب `'A'` بعد الخروج من `'C'`"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "It grades `96` as `'C'` because `>= 50` matches first and short-circuits `'A'`",
        "ar": "يمنح درجة `'C'` لأن شرط `>= 50` يتحقق أولاً فيتخطى فرع `'A'`"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "It treats score as negative due to single-quote characters",
        "ar": "يحول الدرجة إلى رقم سالب"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Broad thresholds checked first swallow higher ranges; `else if` thresholds must order strictest (`>= 90`) down to broadest (`>= 50`).",
    "ar": "يجب ترتيب سلاسل `if / else if` من الشرط الأعلى والأخص (`>= 90`) إلى الأوسع (`>= 50`)."
  },
  "tags": [
    "conditionals",
    "bug-hunt",
    "ordering"
  ]
} as AssessmentQuestion,
{
  "id": "PF-CND-M-004",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Control Structures",
  "subtopic": "Conditionals",
  "specialization": "Guard Clauses",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What clean refactoring pattern removes deep 4-level `if / else` nesting inside validation functions?",
    "ar": "ما النمط البرمجي الذي يزيل التداخل العميق لأربع مستويات من `if / else` داخل دوال التحقق؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Replacing nested positive branches with early-return Guard Clauses",
        "ar": "استخدام الحراس المبكرة Guard Clauses والعودة الفورية لحالات الفشل"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Replacing booleans with nested try-catch blocks inside loops",
        "ar": "استبدال الشروط بحلقات try-catch متداخلة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Converting functions into global static arrays",
        "ar": "تحويل الدالة لمصفوفة عامة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Duplicating condition expressions twice at the bottom",
        "ar": "تكرار نفس الشروط في نهاية الدالة"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Returning early when invalid inputs appear flattens control flow to a clean linear happy path.",
    "ar": "إرجاع الأخطاء مبكراً يبسط قراءة الدالة ويحافظ على تسطيح البنية."
  },
  "tags": [
    "clean-code",
    "guard-clauses",
    "conditionals"
  ]
} as AssessmentQuestion,
{
  "id": "PF-CND-H-006",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Control Structures",
  "subtopic": "Conditionals",
  "specialization": "Ternary & Switch",
  "difficulty": "hard",
  "type": "code-trace",
  "codeSnippet": "int code = 2, res = 0;\nswitch (code) {\n  case 1: res += 10;\n  case 2: res += 20;\n  case 3: res += 30; break;\n}",
  "codeLanguage": "cpp",
  "question": {
    "en": "Because `case 2` omits a `break;`, what exact value lands in `res` after executing this switch in C++?",
    "ar": "بسبب عدم وجود `break;` في نهاية `case 2`، ما القيمة النهائية في `res` بعد تشغيل الكود في C++؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "20",
        "ar": "20"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "60",
        "ar": "60"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "50",
        "ar": "50"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "30",
        "ar": "30"
      }
    }
  ],
  "correctAnswer": "d",
  "explanation": {
    "en": "Execution jumps to `case 2` (`res = 20`) and falls straight through into `case 3` (`res += 30` -> `50`) before hitting `break;`.",
    "ar": "ينزلق التنفيذ من `case 2` (+20) مباشرة إلى `case 3` (+30) قبل التوقف عند `break;` فيصبح المجموع 50."
  },
  "tags": [
    "switch",
    "fallthrough",
    "trace"
  ]
} as AssessmentQuestion
];
