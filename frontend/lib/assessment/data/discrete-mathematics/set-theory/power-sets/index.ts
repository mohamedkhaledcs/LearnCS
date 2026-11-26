import { AssessmentQuestion } from '@/lib/assessment/schema';

export const power_sets_questions: AssessmentQuestion[] = [
{
  "id": "DM-PSET-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Set Theory",
  "subtopic": "Power Sets",
  "specialization": "Cardinality 2^N",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "If set A has cardinality |A| = 4, what is the cardinality of its Power Set `|P(A)|`?",
    "ar": "إذا كان حجم المجموعة A هو |A| = 4، فكم عدد عناصر مجموعة القوى `|P(A)|`؟"
  },
  "options": [
    {
      "id": "8",
      "text": {
        "en": "8",
        "ar": "8"
      }
    },
    {
      "id": "24",
      "text": {
        "en": "24 (= 4!)",
        "ar": "24 (= 4!)"
      }
    },
    {
      "id": "16",
      "text": {
        "en": "16 (= 2⁴ subsets)",
        "ar": "16 (= 2⁴ مجموعة جزئية)"
      }
    },
    {
      "id": "4",
      "text": {
        "en": "4",
        "ar": "4"
      }
    }
  ],
  "correctAnswer": "16",
  "explanation": {
    "en": "For each of the 4 elements, a subset can independently include or exclude it -> 2 × 2 × 2 × 2 = 2⁴ = 16 subsets (matching 4-bit bitmasks 0000..1111).",
    "ar": "لكل عنصر خياران (موجود أو غير موجود)، فيصبح عدد المجموعات الجزئية الكلي 2⁴ = 16 (وهو مبدأ Bitmasks في البرمجة التنافسية)."
  },
  "tags": [
    "discrete-math",
    "sets",
    "bitmask"
  ]
} as AssessmentQuestion,
{
  "id": "DM-SET-M-004",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Set Theory",
  "subtopic": "Power Sets",
  "specialization": "Subset Count",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "A set `S` has 5 distinct items. How many subsets sit inside Power Set `P(S)` (including `{}` and `S`)?",
    "ar": "مجموعة `S` تضم 5 عناصر مختلفة. كم مجموعة جزئية تحويها مجموعة القوى `P(S)` شاملة المجموعة الخالية؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "10",
        "ar": "10"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "25",
        "ar": "25"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "32",
        "ar": "32"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "120",
        "ar": "120"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "Each element independently has 2 choices (in or out): `2^5 = 32` total subsets.",
    "ar": "لكل عنصر خياران (موجود أو غائب) فتكون كل المجموعات الجزئية `2^5 = 32`."
  },
  "tags": [
    "power-set",
    "subsets",
    "combinatorics"
  ]
} as AssessmentQuestion
];
