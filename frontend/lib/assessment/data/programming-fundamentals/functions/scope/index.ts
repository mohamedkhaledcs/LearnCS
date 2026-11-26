import { AssessmentQuestion } from '@/lib/assessment/schema';

export const scope_questions: AssessmentQuestion[] = [
{
  "id": "PF-SCOPE-M-001",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Functions",
  "subtopic": "Scope & Shadowing",
  "specialization": "Lexical Scope",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What does Lexical (Block) Scope guarantee about a variable `x` declared inside an `if { int x = 5; }` block?",
    "ar": "ماذا يضمن النطاق المعجمي (Block Scope) للمتغير `x` المعرّف داخل كتلة شرطية `if { int x = 5; }`؟"
  },
  "options": [
    {
      "id": "glob",
      "text": {
        "en": "`x` automatically escapes outward into global namespace scope across the entire file",
        "ar": "يتحول المتغير تلقائياً إلى متغير عام يظهر في كافة دوال الملف البرمجي بعد الإنشاء"
      }
    },
    {
      "id": "heap",
      "text": {
        "en": "`x` persists permanently in static heap storage even after the program exits main()",
        "ar": "يظل المتغير محجوزاً في الذاكرة الدائمة حتى بعد إغلاق البرنامج وانتهاء التنفيذ"
      }
    },
    {
      "id": "same",
      "text": {
        "en": "Outer variables cannot have the name `x`",
        "ar": "يُمنع تسمية متغير خارجي بنفس الاسم"
      }
    },
    {
      "id": "blk",
      "text": {
        "en": "Visible and alive strictly inside `{ ... }`, inaccessible outside it",
        "ar": "مرئي وحي داخل أقواس `{ ... }` فقط ويزول خارجها"
      }
    }
  ],
  "correctAnswer": "blk",
  "explanation": {
    "en": "Block-scoped variables enter scope upon declaration and are destroyed when execution leaves the closing brace `}`.",
    "ar": "يبدأ عمر المتغير المحلي عند تعريفه وينتهي تلقائياً عند الخروج من قوس الإغلاق `}` للكتلة."
  },
  "tags": [
    "functions",
    "scope"
  ]
} as AssessmentQuestion,
{
  "id": "PF-FNC-M-003",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Functions",
  "subtopic": "Scope",
  "specialization": "Lexical Shadowing",
  "difficulty": "medium",
  "type": "code-trace",
  "codeSnippet": "int bonus = 100;\nvoid apply() { int bonus = 50; }\n// After calling apply(), read global bonus:",
  "codeLanguage": "cpp",
  "question": {
    "en": "What happens inside `apply()` when redeclaring `int bonus = 50;` with the same name as outer `bonus`?",
    "ar": "ماذا يحدث عند إعادة التصريح `int bonus = 50;` داخل `apply()` بنفس اسم المتغير الخارجي `bonus`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Outer `bonus` silently sums both declarations together leaving total `150`",
        "ar": "تُجمع القيمتان تلقائياً داخل النطاق المشترك لتصبح قيمة المتغير الأصلي 150 فوراً"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Inner `bonus` shadows the outer one, leaving outer `bonus = 100` intact",
        "ar": "يحجب الداخلي الخارجي محلياً (Shadowing) ويبقى الخارجي `100` سليماً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Allocated stack memory shrinks proportionally causing a hardware stack exception",
        "ar": "يتقلص المكدس تلقائياً عند العودة ثم يطلق المعالج مقاطعة خطأ فادح في الذاكرة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Hardware raises an illegal stack interrupt",
        "ar": "يتوقف المعالج بمقاطعة خطأ"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Local shadowing binds a fresh inner variable on the stack frame without touching the shadowed outer binding.",
    "ar": "إعادة التعريف تنشئ متغيراً محلياً مستقلاً داخل إطار الدالة دون المساس بالمتغير الأعلى."
  },
  "tags": [
    "scope",
    "shadowing",
    "functions"
  ]
} as AssessmentQuestion
];
