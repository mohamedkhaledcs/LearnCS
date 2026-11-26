import { AssessmentQuestion } from '@/lib/assessment/schema';

export const aggregation_questions: AssessmentQuestion[] = [
{
  "id": "OOP-AGG-M-001",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Relationships",
  "subtopic": "Aggregation",
  "specialization": "Weak Has-A",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "A `Library` holds references to `Book` objects, and if the Library closes, those Books can still exist or move elsewhere. What relationship is this?",
    "ar": "تضم المكتبة `Library` مراجع لكتب `Book`، وإذا أُغلقت المكتبة تبقى الكتب موجودة ويمكن نقلها؛ ما نوع هذه العلاقة؟"
  },
  "options": [
    {
      "id": "comp",
      "text": {
        "en": "Composition (strong ownership)",
        "ar": "Composition"
      }
    },
    {
      "id": "agg",
      "text": {
        "en": "Aggregation",
        "ar": "التجميع"
      }
    },
    {
      "id": "abs",
      "text": {
        "en": "Abstract Class",
        "ar": "فئة مجردة"
      }
    },
    {
      "id": "stat",
      "text": {
        "en": "Static binding",
        "ar": "ربط ساكن"
      }
    }
  ],
  "correctAnswer": "agg",
  "explanation": {
    "en": "Aggregation is a weak whole-part relationship (hollow UML diamond) where child objects are passed in externally and outlive the container.",
    "ar": "في Aggregation يُنشأ الجزء بالخارج ويُمرر للحاوي ولا يُدمر بتدمير الحاوي."
  },
  "tags": [
    "oop",
    "relationships"
  ]
} as AssessmentQuestion
];
