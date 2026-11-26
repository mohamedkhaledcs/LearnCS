import { AssessmentQuestion } from '@/lib/assessment/schema';

export const composition_questions: AssessmentQuestion[] = [
{
  "id": "DM-COMP-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Functions",
  "subtopic": "Composition",
  "specialization": "Order of Application",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Given `f(x) = 2x + 1` and `g(x) = x²`, what is `(f ∘ g)(3)`?",
    "ar": "إذا كانت `f(x) = 2x + 1` و `g(x) = x²`، فما قيمة التركيب `(f ∘ g)(3)`؟"
  },
  "options": [
    {
      "id": "49",
      "text": {
        "en": "49 (which is g(f(3)))",
        "ar": "49"
      }
    },
    {
      "id": "14",
      "text": {
        "en": "14",
        "ar": "14"
      }
    },
    {
      "id": "19",
      "text": {
        "en": "19 (since f(g(3)) = f(9) = 2(9) + 1)",
        "ar": "19 (لأن f(g(3)) = f(9) = 19)"
      }
    },
    {
      "id": "21",
      "text": {
        "en": "21",
        "ar": "21"
      }
    }
  ],
  "correctAnswer": "19",
  "explanation": {
    "en": "Function composition (f ∘ g)(x) applies the inner right function g first (`g(3) = 9`), then feeds its result to `f(9) = 19`. Note composition is NOT commutative.",
    "ar": "يُنفذ التابع الداخلي g أولاً (`g(3) = 9`) ثم يمرر الناتج للدالة f (`f(9) = 19`)."
  },
  "tags": [
    "discrete-math",
    "functions"
  ]
} as AssessmentQuestion
];
