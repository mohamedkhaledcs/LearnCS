import { AssessmentQuestion } from '@/lib/assessment/schema';

export const simplification_questions: AssessmentQuestion[] = [
{
  "id": "DM-BSIMP-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Boolean Algebra",
  "subtopic": "Simplification",
  "specialization": "Absorption Law",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Using Boolean Absorption laws, `A + (A · B)` simplifies to:",
    "ar": "باستخدام قانون الامتصاص (Absorption Law) في الجبر البوليني، يتبسط التعبير `A + (A · B)` إلى:"
  },
  "options": [
    {
      "id": "ab",
      "text": {
        "en": "A · B",
        "ar": "A · B"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "B",
        "ar": "B"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "A",
        "ar": "A"
      }
    },
    {
      "id": "one",
      "text": {
        "en": "1",
        "ar": "1"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Factoring A gives A · (1 + B). Since 1 + B = 1, the entire expression equals A · 1 = A (saving hardware logic gates).",
    "ar": "بأخذ A عاملاً مشتركاً ينتج A · (1 + B) وبما أن 1 + B = 1 تصبح النتيجة A."
  },
  "tags": [
    "discrete-math",
    "boolean-algebra"
  ]
} as AssessmentQuestion
];
