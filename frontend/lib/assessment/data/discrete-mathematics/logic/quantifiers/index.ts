import { AssessmentQuestion } from '@/lib/assessment/schema';

export const quantifiers_questions: AssessmentQuestion[] = [
{
  "id": "DM-QUANT-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Logic",
  "subtopic": "Quantifiers",
  "specialization": "De Morgan's Law for Quantifiers",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What is the exact logical negation of `∀x P(x)` ('For all x, P(x) holds')?",
    "ar": "ما هو النفي المنطقي الدقيق للعبارة الكلية `∀x P(x)` ('لكل x يتحقق P(x)')؟"
  },
  "options": [
    {
      "id": "alln",
      "text": {
        "en": "∀x ¬P(x): every single domain element satisfies ¬P(x) unconditionally",
        "ar": "∀x ¬P(x): جميع العناصر في المجال دون استثناء تجعل العبارة P(x) خاطئة"
      }
    },
    {
      "id": "exn",
      "text": {
        "en": "∃x ¬P(x): there exists an x where P(x) is false",
        "ar": "∃x ¬P(x): يوجد عنصر واحد على الأقل x لا يحقق P(x)"
      }
    },
    {
      "id": "ex",
      "text": {
        "en": "∃x P(x)",
        "ar": "∃x P(x)"
      }
    },
    {
      "id": "none",
      "text": {
        "en": "¬∀x ¬P(x): no counterexample falsifying P(x) exists inside the domain",
        "ar": "¬∀x ¬P(x): يستحيل وجود أي مثال مضاد ينفي صحة العبارة في كل المجال"
      }
    }
  ],
  "correctAnswer": "exn",
  "explanation": {
    "en": "Disproving a universal claim only requires a single counterexample `x` where `P(x)` fails: `¬(∀x P(x)) ≡ ∃x ¬P(x)`.",
    "ar": "لدحض تعميم كلي `∀x P(x)` يكفي وجود مثال مضاد واحد `∃x ¬P(x)`."
  },
  "tags": [
    "discrete-math",
    "logic",
    "quantifiers"
  ]
} as AssessmentQuestion,
{
  "id": "DM-LOG-M-003",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Logic",
  "subtopic": "Quantifiers",
  "specialization": "Disproving Universal",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What is the exact formal negation of the universal statement: `'Every prime number is odd'` (`All x, Prime(x) -> Odd(x)`)?",
    "ar": "ما النفي المنطقي الدقيق للعبارة الكلية: `'كل عدد أولي هو عدد فردي'`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "There exists at least one prime number that is NOT odd",
        "ar": "يوجد عدد أولي واحد على الأقل ليس فردياً (مثل 2)"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Every prime number is even",
        "ar": "كل عدد أولي هو عدد زوجي"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "No prime integers exist anywhere",
        "ar": "لا توجد أي أعداد أولية"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Every odd number is prime",
        "ar": "كل عدد فردي هو أولي"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Negating `All x, P(x)` switches quantifier to existential: `Exists x such that !P(x)`, disproved cleanly by `x = 2`.",
    "ar": "نفي الكلّي `لكل` هو الوجودي `يوجد واحد على الأقل ينفي الصفة`، والمثال المضاد هو العدد الأولي الزوجي 2."
  },
  "tags": [
    "quantifiers",
    "negation",
    "logic"
  ]
} as AssessmentQuestion
];
