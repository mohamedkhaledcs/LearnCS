import { AssessmentQuestion } from '@/lib/assessment/schema';

export const subsets_questions: AssessmentQuestion[] = [
{
  "id": "DM-SUB-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Set Theory",
  "subtopic": "Subsets & Empty Set",
  "specialization": "∅ Properties",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which statement is ALWAYS true regarding the empty set `∅` and any set `A`?",
    "ar": "أي عبارة صحيحة دائماً بشأن المجموعة الخالية `∅` وأي مجموعة `A`؟"
  },
  "options": [
    {
      "id": "elem",
      "text": {
        "en": "∅ ∈ A is always true",
        "ar": "∅ ∈ A صحيحة دائماً"
      }
    },
    {
      "id": "both",
      "text": {
        "en": "∅ ⊆ A is always true",
        "ar": "∅ ⊆ A صحيحة دائماً"
      }
    },
    {
      "id": "eq",
      "text": {
        "en": "{∅} = ∅",
        "ar": "{∅} = ∅"
      }
    },
    {
      "id": "card",
      "text": {
        "en": "|{∅}| = 0",
        "ar": "|{∅}| = 0"
      }
    }
  ],
  "correctAnswer": "both",
  "explanation": {
    "en": "Every element in ∅ (vacuously all zero elements) is in A, making ∅ ⊆ A true for all A. Note `{∅}` has cardinality 1 (containing ∅), so `{∅} != ∅`.",
    "ar": "المجموعة الخالية مجموعة جزئية من كل مجموعة، أما `{∅}` فهي مجموعة تحتوي عنصراً واحداً هو المجموعة الخالية."
  },
  "tags": [
    "discrete-math",
    "sets"
  ]
} as AssessmentQuestion
];
