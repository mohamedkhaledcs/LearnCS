import { AssessmentQuestion } from '@/lib/assessment/schema';

export const composition_questions: AssessmentQuestion[] = [
{
  "id": "OOP-COMP-M-001",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Relationships",
  "subtopic": "Composition",
  "specialization": "Strong Lifecycle Ownership",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "An `Order` creates and exclusively owns its `OrderLineItem` parts: deleting the Order deletes its LineItems. Which relationship is this?",
    "ar": "ينشئ الطلب `Order` عناصر الفاتورة `OrderLineItem` ويمتلكها حصرياً بحيث يُحذف العنصر بحذف الطلب. ما نوع العلاقة؟"
  },
  "options": [
    {
      "id": "comp",
      "text": {
        "en": "Composition",
        "ar": "التركيب"
      }
    },
    {
      "id": "agg",
      "text": {
        "en": "Aggregation (independent lifetime)",
        "ar": "Aggregation"
      }
    },
    {
      "id": "poly",
      "text": {
        "en": "Polymorphism",
        "ar": "تعدد الأشكال"
      }
    },
    {
      "id": "lsp",
      "text": {
        "en": "Multiple Inheritance",
        "ar": "وراثة متعددة"
      }
    }
  ],
  "correctAnswer": "comp",
  "explanation": {
    "en": "Composition (filled UML diamond) binds part lifetime strictly to the owning parent entity.",
    "ar": "يعني Composition ملكية كاملة بحيث لا وجود للجزء بمعزل عن الكل."
  },
  "tags": [
    "oop",
    "relationships"
  ]
} as AssessmentQuestion
];
