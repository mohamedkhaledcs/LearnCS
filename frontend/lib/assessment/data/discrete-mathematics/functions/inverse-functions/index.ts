import { AssessmentQuestion } from '@/lib/assessment/schema';

export const inverse_functions_questions: AssessmentQuestion[] = [
{
  "id": "DM-INV-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Functions",
  "subtopic": "Inverse Functions",
  "specialization": "Roundtrip Identity",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "If `f(x) = 3x - 6` on ℝ, what is `f⁻¹(y)`?",
    "ar": "إذا كانت الدالة `f(x) = 3x - 6` على الأعداد الحقيقية، فما هي الدالة العكسية `f⁻¹(y)`؟"
  },
  "options": [
    {
      "id": "bad1",
      "text": {
        "en": "3y + 6",
        "ar": "3y + 6"
      }
    },
    {
      "id": "bad2",
      "text": {
        "en": "(y - 6) / 3",
        "ar": "(y - 6) / 3"
      }
    },
    {
      "id": "bad3",
      "text": {
        "en": "1 / (3y - 6)",
        "ar": "1 / (3y - 6)"
      }
    },
    {
      "id": "ok",
      "text": {
        "en": "(y + 6) / 3",
        "ar": "(y + 6) / 3"
      }
    }
  ],
  "correctAnswer": "ok",
  "explanation": {
    "en": "Solving `y = 3x - 6` for `x` gives `y + 6 = 3x`, hence `x = (y + 6) / 3`. Notice `f⁻¹(f(x)) = x`.",
    "ar": "بحل المعادلة `y = 3x - 6` بالنسبة لـ x نحصل على `x = (y + 6) / 3`."
  },
  "tags": [
    "discrete-math",
    "functions"
  ]
} as AssessmentQuestion
];
