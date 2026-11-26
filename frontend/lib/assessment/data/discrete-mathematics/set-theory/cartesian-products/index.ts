import { AssessmentQuestion } from '@/lib/assessment/schema';

export const cartesian_products_questions: AssessmentQuestion[] = [
{
  "id": "DM-CART-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Set Theory",
  "subtopic": "Cartesian Products",
  "specialization": "Ordered Pairs",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "If `|A| = 3` and `|B| = 5`, how many ordered pairs are in the Cartesian Product `A × B`?",
    "ar": "إذا كانت `|A| = 3` و `|B| = 5`، فكم زوجاً مرتباً يوجد في الجداء الديكارتي `A × B`؟"
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
      "id": "243",
      "text": {
        "en": "243",
        "ar": "243"
      }
    },
    {
      "id": "125",
      "text": {
        "en": "125",
        "ar": "125"
      }
    },
    {
      "id": "15",
      "text": {
        "en": "15 (= 3 · 5)",
        "ar": "15 (= 3 · 5)"
      }
    }
  ],
  "correctAnswer": "15",
  "explanation": {
    "en": "A × B pairs every element of A with every element of B, so |A × B| = |A| · |B| = 15 (fundamental to SQL CROSS JOINs).",
    "ar": "كل عنصر في A يرتبط بكل عنصر في B، لذا الحجم هو 3 × 5 = 15 (وهي الفكرة الأساسية وراء CROSS JOIN في SQL)."
  },
  "tags": [
    "discrete-math",
    "sets"
  ]
} as AssessmentQuestion
];
