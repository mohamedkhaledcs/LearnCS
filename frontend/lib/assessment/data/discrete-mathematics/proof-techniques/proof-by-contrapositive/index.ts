import { AssessmentQuestion } from '@/lib/assessment/schema';

export const proof_by_contrapositive_questions: AssessmentQuestion[] = [
{
  "id": "DM-CPOS-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Proof Techniques",
  "subtopic": "Contrapositive Proof",
  "specialization": "Indirect Implication",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "To prove \"If `n²` is odd, then `n` is odd\" by Contrapositive, what exact statement do you prove directly?",
    "ar": "لإثبات العبارة \"إذا كان `n²` فردياً فإن `n` فردي\" بالمعاكس الإيجابي (Contrapositive)، ما العبارة التي نثبتها مباشرة؟"
  },
  "options": [
    {
      "id": "conv",
      "text": {
        "en": "If n is odd, then n² is odd",
        "ar": "إذا كان n فردياً فإن n² فردي"
      }
    },
    {
      "id": "contra",
      "text": {
        "en": "Assume n² is odd AND n is odd",
        "ar": "نفترض أن n² فردي و n فردي"
      }
    },
    {
      "id": "cpos",
      "text": {
        "en": "If n is NOT odd (even), then n² is NOT odd (even)",
        "ar": "إذا لم يكن n فردياً (أي زوجياً)، فإن n² زوجي أيضاً"
      }
    },
    {
      "id": "inv",
      "text": {
        "en": "If n² is even, then n is odd",
        "ar": "إذا كان n² زوجياً فإن n فردي"
      }
    }
  ],
  "correctAnswer": "cpos",
  "explanation": {
    "en": "Contrapositive turns `P -> Q` into `¬Q -> ¬P`. Proving `n = 2k => n² = 2(2k²)` (even) is trivial algebra!",
    "ar": "يحوّل المعاكس الإيجابي P -> Q إلى ¬Q -> ¬P؛ وإثبات أن مربع الزوجي زوجي أبسط بكثير من الجذر التربيعي."
  },
  "tags": [
    "discrete-math",
    "proofs"
  ]
} as AssessmentQuestion
];
