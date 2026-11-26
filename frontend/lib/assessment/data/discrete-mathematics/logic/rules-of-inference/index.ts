import { AssessmentQuestion } from '@/lib/assessment/schema';

export const rules_of_inference_questions: AssessmentQuestion[] = [
{
  "id": "DM-INF-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Logic",
  "subtopic": "Rules of Inference",
  "specialization": "Modus Ponens vs Modus Tollens",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "From premises `(1) p -> q` and `(2) ¬q`, what valid conclusion does Modus Tollens infer?",
    "ar": "انطلاقاً من المقدمات `(1) p -> q` و `(2) ¬q`، ما النتيجة الصحيحة وفق قاعدة Modus Tollens؟"
  },
  "options": [
    {
      "id": "p",
      "text": {
        "en": "p",
        "ar": "p"
      }
    },
    {
      "id": "q",
      "text": {
        "en": "q",
        "ar": "q"
      }
    },
    {
      "id": "np",
      "text": {
        "en": "¬p (not p)",
        "ar": "¬p (نفي p)"
      }
    },
    {
      "id": "fall",
      "text": {
        "en": "No valid conclusion",
        "ar": "لا استنتاج صحيح"
      }
    }
  ],
  "correctAnswer": "np",
  "explanation": {
    "en": "Since `p -> q` is equivalent to `¬q -> ¬p`, knowing `¬q` immediately yields `¬p` (Modus Tollens).",
    "ar": "بما أن `p -> q` تكافئ `¬q -> ¬p`، فمعرفة `¬q` تستلزم حتماً `¬p`."
  },
  "tags": [
    "discrete-math",
    "logic",
    "proofs"
  ]
} as AssessmentQuestion
];
