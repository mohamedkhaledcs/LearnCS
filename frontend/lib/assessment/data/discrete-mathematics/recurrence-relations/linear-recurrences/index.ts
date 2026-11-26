import { AssessmentQuestion } from '@/lib/assessment/schema';

export const linear_recurrences_questions: AssessmentQuestion[] = [
{
  "id": "DM-LINREC-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Recurrence Relations",
  "subtopic": "Linear Recurrences",
  "specialization": "Fibonacci Characteristic",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Given `T(n) = T(n - 1) + 1` with `T(0) = 0`, what is the closed-form solution for T(n)?",
    "ar": "إذا كانت العلاقة التكرارية `T(n) = T(n - 1) + 1` مع `T(0) = 0`، فما الصيغة المغلقة لـ T(n)؟"
  },
  "options": [
    {
      "id": "2n",
      "text": {
        "en": "T(n) = 2^n",
        "ar": "T(n) = 2^n"
      }
    },
    {
      "id": "logn",
      "text": {
        "en": "T(n) = log₂(n)",
        "ar": "T(n) = log₂(n)"
      }
    },
    {
      "id": "n2",
      "text": {
        "en": "T(n) = n²",
        "ar": "T(n) = n²"
      }
    },
    {
      "id": "n",
      "text": {
        "en": "T(n) = n",
        "ar": "T(n) = n -> O(n)"
      }
    }
  ],
  "correctAnswer": "n",
  "explanation": {
    "en": "Unrolling `T(n) = T(n-1) + 1 = T(n-2) + 2 = ... = T(0) + n = n`, modeling linear recursion without halving.",
    "ar": "بفك العلاقة خطوة خطوة يتراكم 1 في كل خطوة حتى نصل للصفر فيكون الناتج n."
  },
  "tags": [
    "discrete-math",
    "recurrence",
    "complexity"
  ]
} as AssessmentQuestion
];
