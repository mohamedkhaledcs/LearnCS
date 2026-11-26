import { AssessmentQuestion } from '@/lib/assessment/schema';

export const sum_rule_questions: AssessmentQuestion[] = [
{
  "id": "DM-SUMR-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Counting",
  "subtopic": "Sum Rule",
  "specialization": "Disjoint Choices",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "A student must pick EITHER 1 of 4 backend projects OR 1 of 3 AI projects (not both). By the Sum Rule, how many project choices exist?",
    "ar": "على طالب اختيار مشروع واحد إما من 4 مشاريع Backend أو من 3 مشاريع AI (لا كليهما). وفق قاعدة الجمع، كم خياراً لديه؟"
  },
  "options": [
    {
      "id": "12",
      "text": {
        "en": "12 (= 4 × 3)",
        "ar": "12 (= 4 × 3)"
      }
    },
    {
      "id": "7",
      "text": {
        "en": "7 (= 4 + 3)",
        "ar": "7 (= 4 + 3)"
      }
    },
    {
      "id": "1",
      "text": {
        "en": "1",
        "ar": "1"
      }
    },
    {
      "id": "64",
      "text": {
        "en": "64",
        "ar": "64"
      }
    }
  ],
  "correctAnswer": "7",
  "explanation": {
    "en": "Mutually exclusive disjoint event choices are summed (4 + 3 = 7), whereas independent sequential choices multiply (Product Rule).",
    "ar": "عند اختيار بديل واحد فقط بين مجموعتين منفصلتين نجمع الخيارات (قاعدة الجمع)."
  },
  "tags": [
    "discrete-math",
    "counting"
  ]
} as AssessmentQuestion
];
