import { AssessmentQuestion } from '@/lib/assessment/schema';

export const association_questions: AssessmentQuestion[] = [
{
  "id": "OOP-ASSOC-E-001",
  "language": "both",
  "domain": "Object-Oriented Programming",
  "topic": "Relationships",
  "subtopic": "Association",
  "specialization": "Independent Lifetimes",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "A `Teacher` interacts with `Student` objects without owning their lifecycle. Which OOP relationship does this exemplify?",
    "ar": "يتفاعل كائن `Teacher` مع كائنات `Student` دون امتلاك أو تحكم بدورة حياتهم. أي علاقة OOP يمثل ذلك؟"
  },
  "options": [
    {
      "id": "comp",
      "text": {
        "en": "Strong Composition",
        "ar": "Composition قوي"
      }
    },
    {
      "id": "inh",
      "text": {
        "en": "Single Inheritance",
        "ar": "الوراثة"
      }
    },
    {
      "id": "assoc",
      "text": {
        "en": "Association",
        "ar": "الارتباط"
      }
    },
    {
      "id": "over",
      "text": {
        "en": "Operator Overloading",
        "ar": "التحميل الزائد"
      }
    }
  ],
  "correctAnswer": "assoc",
  "explanation": {
    "en": "Association models loose acquaintance/communication between independent objects.",
    "ar": "تعبر Association عن ارتباط عام بين كائنين مستقلين تماماً في الوجود."
  },
  "tags": [
    "oop",
    "relationships"
  ]
} as AssessmentQuestion
];
