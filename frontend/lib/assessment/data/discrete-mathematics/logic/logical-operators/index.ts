import { AssessmentQuestion } from '@/lib/assessment/schema';

export const logical_operators_questions: AssessmentQuestion[] = [
{
  "id": "DM-OP-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Logic",
  "subtopic": "Logical Operators",
  "specialization": "Implication",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "When is the logical implication `p -> q` (if p, then q) evaluated as FALSE?",
    "ar": "متى تكون عبارة الاقتضاء الشرطي `p -> q` (إذا كان p فإن q) خاطئة (FALSE) فقط؟"
  },
  "options": [
    {
      "id": "ft",
      "text": {
        "en": "Only when p is False and q is True",
        "ar": "عندما يكون p خطأ و q صواب"
      }
    },
    {
      "id": "tf",
      "text": {
        "en": "Only when p is True and q is False",
        "ar": "فقط عندما يكون p صائباً (True) و q خاطئاً (False)"
      }
    },
    {
      "id": "ff",
      "text": {
        "en": "Only when both p and q are False",
        "ar": "عندما يكون كلاهما خطأ"
      }
    },
    {
      "id": "always",
      "text": {
        "en": "Whenever p equals q",
        "ar": "عندما يتساوى p و q"
      }
    }
  ],
  "correctAnswer": "tf",
  "explanation": {
    "en": "Think of `p -> q` as a contract promise: it is only broken (False) when the premise `p` holds True yet the conclusion `q` fails (False).",
    "ar": "يكون الشرط `p -> q` خاطئاً فقط في حالة واحدة: تحقق الشرط p (True) مع فشل النتيجة q (False)."
  },
  "tags": [
    "discrete-math",
    "logic",
    "truth-tables"
  ]
} as AssessmentQuestion
];
