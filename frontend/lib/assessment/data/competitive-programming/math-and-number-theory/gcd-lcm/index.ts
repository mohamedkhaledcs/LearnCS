import { AssessmentQuestion } from '@/lib/assessment/schema';

export const gcd_lcm_questions: AssessmentQuestion[] = [
{
  "id": "CP-GCD-E-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Math & Number Theory",
  "subtopic": "GCD & LCM",
  "specialization": "Euclidean Algorithm",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which mathematical identity computes lcm(a, b) from gcd(a, b) safely without early 64-bit integer overflow?",
    "ar": "أي صيغة تحسب المضاعف المشترك الأصغر lcm(a, b) بأمان من القاسم المشترك الأكبر gcd(a, b) لتجنب فيض الأعداد الصحيحة؟"
  },
  "options": [
    {
      "id": "mul_first",
      "text": {
        "en": "(a + b) / gcd(a, b)",
        "ar": "(a + b) / gcd(a, b)"
      }
    },
    {
      "id": "prod_gcd",
      "text": {
        "en": "a * b * gcd(a, b)",
        "ar": "a * b * gcd(a, b)"
      }
    },
    {
      "id": "diff",
      "text": {
        "en": "abs(a - b) * gcd(a, b)",
        "ar": "abs(a - b) * gcd(a, b)"
      }
    },
    {
      "id": "div_first",
      "text": {
        "en": "(a / gcd(a, b)) * b",
        "ar": "(a / gcd(a, b)) * b"
      }
    }
  ],
  "correctAnswer": "div_first",
  "explanation": {
    "en": "Since gcd(a, b) divides a evenly, dividing a by gcd(a, b) BEFORE multiplying by b keeps intermediate products bounded.",
    "ar": "بما أن gcd(a, b) يقسم a دون باقٍ، فإن القسمة قبل الضرب تحمي من حدوث Overflow قبل اختصار القاسم المشترك."
  },
  "tags": [
    "cp",
    "number-theory",
    "gcd"
  ]
} as AssessmentQuestion,
{
  "id": "CP-NTH-E-002",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Math & Number Theory",
  "subtopic": "Euclidean GCD",
  "specialization": "Trace",
  "difficulty": "easy",
  "type": "code-trace",
  "codeSnippet": "long long gcd(long long a, long long b) {\n  return b == 0 ? a : gcd(b, a % b);\n}",
  "codeLanguage": "cpp",
  "question": {
    "en": "Trace `gcd(48, 18)` step-by-step. What greatest common divisor returns cleanly?",
    "ar": "تتبّع تنفيذ خوارزمية إقليدس على `gcd(48, 18)`؛ ما الناتج النهائي المرجَع؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "9",
        "ar": "9"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "6",
        "ar": "6"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "3",
        "ar": "3"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "18",
        "ar": "18"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "`gcd(48, 18)` -> `gcd(18, 12)` -> `gcd(12, 6)` -> `gcd(6, 0)` -> returns `6` cleanly.",
    "ar": "الخطوات: `(48,18) -> (18,12) -> (12,6) -> (6,0)` ليعود القاسم المشترك الأكبر `6`."
  },
  "tags": [
    "gcd",
    "euclidean",
    "number-theory"
  ]
} as AssessmentQuestion
];
