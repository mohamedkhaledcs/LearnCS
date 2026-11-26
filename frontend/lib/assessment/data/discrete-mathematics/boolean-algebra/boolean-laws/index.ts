import { AssessmentQuestion } from '@/lib/assessment/schema';

export const boolean_laws_questions: AssessmentQuestion[] = [
{
  "id": "DM-BLAW-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Boolean Algebra",
  "subtopic": "De Morgan's Laws",
  "specialization": "Negation Duals",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "According to De Morgan's Laws, `¬(A ∨ B)` simplifies identically to:",
    "ar": "وفقاً لقوانين دي مورغان (De Morgan's Laws)، يكافئ التعبير `¬(A ∨ B)`:"
  },
  "options": [
    {
      "id": "d2",
      "text": {
        "en": "(¬A) ∨ (¬B)",
        "ar": "(¬A) ∨ (¬B)"
      }
    },
    {
      "id": "d1",
      "text": {
        "en": "(¬A) ∧ (¬B)",
        "ar": "(¬A) ∧ (¬B)"
      }
    },
    {
      "id": "d3",
      "text": {
        "en": "A ∧ B",
        "ar": "A ∧ B"
      }
    },
    {
      "id": "d4",
      "text": {
        "en": "¬A ∨ B",
        "ar": "¬A ∨ B"
      }
    }
  ],
  "correctAnswer": "d1",
  "explanation": {
    "en": "De Morgan's Laws negate each term and flip OR (∨) <-> AND (∧): `!(A || B) === (!A && !B)`.",
    "ar": "ينفي قانون دي مورغان كل حد ويعكس المعامل المنطقي بين OR و AND."
  },
  "tags": [
    "discrete-math",
    "boolean-algebra",
    "logic"
  ]
} as AssessmentQuestion,
{
  "id": "DM-LOG-M-004",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Boolean Algebra",
  "subtopic": "Boolean Laws",
  "specialization": "Absorption Law",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Using Boolean Absorption Law, what does `A || (A && B)` always simplify to cleanly?",
    "ar": "باستخدام قانون الامتصاص الجبري البولياني، إلى ماذا يختصر التعبير `A || (A && B)` دائماً؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "A && B",
        "ar": "A && B"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "A alone",
        "ar": "A وحده"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "B only",
        "ar": "B فقط"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "!A || B",
        "ar": "!A || B"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "If `A` is true, `A || ...` is already true; if `A` is false, `A && B` is false too -> `A` governs everything (`A(1 + B) = A`).",
    "ar": "إذا صدقت A تحققت العبارة تلقائياً، وإذا كذبت A كذب الشطر الثاني أيضاً، فالنتيجة تطابق `A`."
  },
  "tags": [
    "boolean-algebra",
    "simplification",
    "laws"
  ]
} as AssessmentQuestion
];
