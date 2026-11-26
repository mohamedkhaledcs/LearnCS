import { AssessmentQuestion } from '@/lib/assessment/schema';

export const truth_tables_questions: AssessmentQuestion[] = [
{
  "id": "DM-TT-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Logic",
  "subtopic": "Truth Tables",
  "specialization": "Row Count",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How many rows appear in a complete truth table for a compound proposition containing N distinct atomic variables?",
    "ar": "كم صفاً يحتوي عليه جدول الصدق الكامل لعبارة منطقية مركبة فيها N متغيراً ذرياً مختلفاً؟"
  },
  "options": [
    {
      "id": "n2",
      "text": {
        "en": "N² rows",
        "ar": "N² صفوف"
      }
    },
    {
      "id": "2mult",
      "text": {
        "en": "2 · N rows",
        "ar": "2 · N صفوف"
      }
    },
    {
      "id": "2n",
      "text": {
        "en": "2^N rows",
        "ar": "2^N صفوف"
      }
    },
    {
      "id": "fact",
      "text": {
        "en": "N! rows",
        "ar": "N! صفوف"
      }
    }
  ],
  "correctAnswer": "2n",
  "explanation": {
    "en": "Each of the N Boolean variables independently takes 2 states (T or F), yielding 2 × 2 × ... × 2 = 2^N distinct truth assignments.",
    "ar": "كل متغير منطقي له قيمتان (True أو False)، فيصبح إجمالي التركيبات الممكنة 2^N صفاً."
  },
  "tags": [
    "discrete-math",
    "logic",
    "truth-tables"
  ]
} as AssessmentQuestion
];
