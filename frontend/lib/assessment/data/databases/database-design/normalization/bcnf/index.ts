import { AssessmentQuestion } from '@/lib/assessment/schema';

export const bcnf_questions: AssessmentQuestion[] = [
{
  "id": "DB-BCNF-H-001",
  "language": "both",
  "domain": "Databases",
  "topic": "Database Design",
  "subtopic": "BCNF",
  "specialization": "Superkeys",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "How is Boyce-Codd Normal Form (BCNF) stricter than 3NF?",
    "ar": "في أي نقطة يُعد نموذج BCNF أكثر صرامة من 3NF؟"
  },
  "options": [
    {
      "id": "join",
      "text": {
        "en": "BCNF strictly forbids defining foreign keys referencing parent lookup tables across schemas",
        "ar": "تمنع صيغة BCNF تعريف أي مفاتيح أجنبية تربط بين الجداول في القواعد العلائقية"
      }
    },
    {
      "id": "super",
      "text": {
        "en": "Every determinant X in a non-trivial X -> Y must be a superkey",
        "ar": "في كل تبعية غير بديهية X -> Y يجب أن يكون X مفتاحاً فائقاً"
      }
    },
    {
      "id": "idx",
      "text": {
        "en": "Achieving BCNF removes all secondary B-Tree indexes leaving heap storage exclusively",
        "ar": "تزيل BCNF كافة الفهارس الثانوية وتفرض الاعتماد على مسح الجدول كاملاً عند الاستعلام"
      }
    },
    {
      "id": "1nf",
      "text": {
        "en": "BCNF allows nested arrays",
        "ar": "يسمح بالمصفوفات المتداخلة"
      }
    }
  ],
  "correctAnswer": "super",
  "explanation": {
    "en": "3NF permits X -> Y if Y is part of a candidate key, whereas BCNF forbids any determinant X that isn't a full superkey.",
    "ar": "يغلق BCNF الثغرة المتبقية في 3NF ويشترط أن يكون كل عمود يحدد قيماً أخرى Superkey."
  },
  "tags": [
    "databases",
    "normalization"
  ]
} as AssessmentQuestion
];
