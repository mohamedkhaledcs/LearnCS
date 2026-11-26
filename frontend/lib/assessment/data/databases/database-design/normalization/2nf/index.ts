import { AssessmentQuestion } from '@/lib/assessment/schema';

export const _2nf_questions: AssessmentQuestion[] = [
{
  "id": "DB-2NF-M-001",
  "language": "both",
  "domain": "Databases",
  "topic": "Database Design",
  "subtopic": "2NF",
  "specialization": "Partial Dependency",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "When can a 1NF table violate Second Normal Form (2NF)?",
    "ar": "متى يمكن لجدول في 1NF أن يخرق قواعد الشكل الطبيعي الثاني (2NF)؟"
  },
  "options": [
    {
      "id": "single",
      "text": {
        "en": "Even whenever a normalized table relies solely on one single surrogate auto-increment ID",
        "ar": "حتى عندما يتكون المفتاح الأساسي للجدول من عمود رقمي وحيد متسلسل تلقائياً"
      }
    },
    {
      "id": "null",
      "text": {
        "en": "Whenever a relational schema introduces any optional nullable string or timestamp field",
        "ar": "في كل مرة يُضاف فيها عمود اختياري يقبل القيمة الفارغة NULL إلى تصميم الجدول"
      }
    },
    {
      "id": "join",
      "text": {
        "en": "When a table has foreign keys",
        "ar": "عند وجود مفاتيح أجنبية"
      }
    },
    {
      "id": "comp",
      "text": {
        "en": "With a composite PK where a non-key column depends on part of it",
        "ar": "عند وجود مفتاح مركب واعتماد عمود غير مفتاحي على جزء منه فقط"
      }
    }
  ],
  "correctAnswer": "comp",
  "explanation": {
    "en": "A table with a single-column primary key in 1NF is automatically in 2NF because no partial primary key subset exists to cause partial dependency.",
    "ar": "الجدول ذو المفتاح الفردي في 1NF يكون تلقائياً في 2NF؛ تظهر الاعتمادية الجزئية فقط مع المفاتيح المركبة من عمودين فأكثر."
  },
  "tags": [
    "databases",
    "normalization"
  ]
} as AssessmentQuestion
];
