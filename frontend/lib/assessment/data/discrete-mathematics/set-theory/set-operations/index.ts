import { AssessmentQuestion } from '@/lib/assessment/schema';

export const set_operations_questions: AssessmentQuestion[] = [
{
  "id": "DM-SETOP-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Set Theory",
  "subtopic": "Set Operations",
  "specialization": "Set Difference & Symmetric Difference",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Given `A = {1, 2, 3, 4}` and `B = {3, 4, 5}`, what is `A \\ B` (set difference)?",
    "ar": "إذا كانت `A = {1, 2, 3, 4}` و `B = {3, 4, 5}`، فما ناتج الفرق `A \\ B`؟"
  },
  "options": [
    {
      "id": "12",
      "text": {
        "en": "{1, 2}",
        "ar": "{1, 2}"
      }
    },
    {
      "id": "34",
      "text": {
        "en": "{3, 4}",
        "ar": "{3, 4}"
      }
    },
    {
      "id": "125",
      "text": {
        "en": "{1, 2, 5}",
        "ar": "{1, 2, 5}"
      }
    },
    {
      "id": "5",
      "text": {
        "en": "{5}",
        "ar": "{5}"
      }
    }
  ],
  "correctAnswer": "12",
  "explanation": {
    "en": "A \\ B removes from A any elements present in B (removing 3 and 4), leaving {1, 2}. Note {1, 2, 5} would be symmetric difference A Δ B.",
    "ar": "الفرق A \\ B يبقي عناصر A غير الموجودة في B (أي حذف 3 و 4 فيبقى {1, 2})."
  },
  "tags": [
    "discrete-math",
    "sets"
  ]
} as AssessmentQuestion,
{
  "id": "DM-SET-E-002",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Set Theory",
  "subtopic": "Set Operations",
  "specialization": "Cardinality Union",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Given set `A = {1, 2, 3, 4}` and `B = {3, 4, 5}`, what equals `|A ∪ B|`?",
    "ar": "إذا كانت `A = {1, 2, 3, 4}` و`B = {3, 4, 5}`، فما عدد عناصر الاتحاد `|A ∪ B|`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "5",
        "ar": "5"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "7",
        "ar": "7"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "2",
        "ar": "2"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "4",
        "ar": "4"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "`A ∪ B = {1, 2, 3, 4, 5}` deduplicates overlapping `{3, 4}`, leaving size `4 + 3 - 2 = 5`.",
    "ar": "الاتحاد يزيل العناصر المشتركة المكررة `{3, 4}` فتبقى 5 عناصر فريدة."
  },
  "tags": [
    "sets",
    "cardinality",
    "union"
  ]
} as AssessmentQuestion
];
