import { AssessmentQuestion } from '@/lib/assessment/schema';

export const arithmetic_questions: AssessmentQuestion[] = [
{
  "id": "PF-ARITH-E-001",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Operators & Expressions",
  "subtopic": "Arithmetic & Modulo",
  "specialization": "Modulo Operator",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which condition reliably tests whether a non-negative integer `n` is divisible by 3?",
    "ar": "أي تعبير يتحقق بدقة مما إذا كان العدد الصحيح غير السالب `n` يقبل القسمة على 3؟"
  },
  "options": [
    {
      "id": "div",
      "text": {
        "en": "n / 3 == 0",
        "ar": "n / 3 == 0"
      }
    },
    {
      "id": "and",
      "text": {
        "en": "(n & 3) == 0",
        "ar": "(n & 3) == 0"
      }
    },
    {
      "id": "mod",
      "text": {
        "en": "n % 3 == 0",
        "ar": "n % 3 == 0"
      }
    },
    {
      "id": "eq",
      "text": {
        "en": "n == 3",
        "ar": "n == 3"
      }
    }
  ],
  "correctAnswer": "mod",
  "explanation": {
    "en": "The modulo operator `%` computes the division remainder; a remainder of 0 proves exact divisibility.",
    "ar": "يحسب العامل `%` باقي القسمة الصحيحة؛ فإذا كان الباقي صفراً فهذا يعني قابلية القسمة التامة."
  },
  "tags": [
    "operators",
    "variables"
  ]
} as AssessmentQuestion,
{
  "id": "PF-VAR-M-004",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Operators & Expressions",
  "subtopic": "Arithmetic",
  "specialization": "Modulo Operator",
  "difficulty": "medium",
  "type": "code-trace",
  "codeSnippet": "int sec = 125;\nint mins = sec / 60;\nint rem = sec % 60;",
  "codeLanguage": "cpp",
  "question": {
    "en": "After executing this C++ snippet, what do `(mins, rem)` hold?",
    "ar": "بعد تنفيذ الأسطر البرمجية أعلاه، ما قيمتا المتغيرين `(mins, rem)`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "mins = 1, rem = 65",
        "ar": "mins = 1 و rem = 65"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "mins = 2, rem = 15",
        "ar": "mins = 2 و rem = 15"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "mins = 5, rem = 2",
        "ar": "mins = 5 و rem = 2"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "mins = 2, rem = 5",
        "ar": "mins = 2 و rem = 5"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "125 seconds divides into 2 whole minutes (`2 * 60 = 120`) with a modulo remainder of `5` seconds.",
    "ar": "125 ثانية تساوي دقيقتين كاملتين (`120` ثانية) والباقي عبر `%` هو `5` ثوانٍ."
  },
  "tags": [
    "modulo",
    "arithmetic",
    "variables"
  ]
} as AssessmentQuestion,
{
  "id": "PF-VAR-H-006",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Operators & Expressions",
  "subtopic": "Increment Operators",
  "specialization": "Pre vs Post Increment",
  "difficulty": "hard",
  "type": "code-trace",
  "codeSnippet": "int x = 5;\nint y = x++;\nint z = ++x;",
  "codeLanguage": "cpp",
  "question": {
    "en": "After running those three C++ statements, what final values are stored in `(x, y, z)`?",
    "ar": "بعد تنفيذ التعليمات الثلاث أعلاه بلغة C++، ما القيم النهائية لـ `(x, y, z)`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "x = 7, y = 6, z = 7",
        "ar": "x = 7, y = 6, z = 7"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "x = 7, y = 5, z = 7",
        "ar": "x = 7, y = 5, z = 7"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "x = 6, y = 5, z = 6",
        "ar": "x = 6, y = 5, z = 6"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "x = 7, y = 5, z = 6",
        "ar": "x = 7, y = 5, z = 6"
      }
    }
  ],
  "correctAnswer": "d",
  "explanation": {
    "en": "Post-increment `x++` returns old value `5` to `y` then bumps `x` to `6`; pre-increment `++x` bumps `x` to `7` first and assigns `7` to `z`.",
    "ar": "`x++` يُسند القيمة القديمة (5) ثم يرفع x إلى 6، بينما `++x` يرفع x أولاً إلى 7 ثم يسندها إلى z."
  },
  "tags": [
    "operators",
    "increment",
    "trace"
  ]
} as AssessmentQuestion
];
