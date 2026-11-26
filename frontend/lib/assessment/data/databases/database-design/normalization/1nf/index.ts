import { AssessmentQuestion } from '@/lib/assessment/schema';

export const _1nf_questions: AssessmentQuestion[] = [
{
  "id": "DB-1NF-E-001",
  "language": "both",
  "domain": "Databases",
  "topic": "Database Design",
  "subtopic": "1NF",
  "specialization": "Atomicity",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which condition defines First Normal Form (1NF)?",
    "ar": "ما الشرط الأساسي لتحقيق الشكل الطبيعي الأول (First Normal Form - 1NF)؟"
  },
  "options": [
    {
      "id": "trans",
      "text": {
        "en": "No transitive dependencies exist",
        "ar": "عدم وجود اعتماديات متعدية"
      }
    },
    {
      "id": "part",
      "text": {
        "en": "No partial key dependencies",
        "ar": "عدم وجود اعتماديات جزئية"
      }
    },
    {
      "id": "atom",
      "text": {
        "en": "Every cell holds only a single atomic value",
        "ar": "كل خانة تحتوي على قيمة ذرية واحدة فقط"
      }
    },
    {
      "id": "bcnf",
      "text": {
        "en": "Every determinant is a candidate key",
        "ar": "كل محدد هو مفتاح مرشح"
      }
    }
  ],
  "correctAnswer": "atom",
  "explanation": {
    "en": "1NF bans multi-valued attributes in a single column (e.g., 'phone1, phone2' in one cell) and enforces atomic domain values per column.",
    "ar": "يمنع 1NF تخزين عدة قيم في خلية واحدة، ويفرض أن يحوي كل عمود قيمة واحدة غير قابلة للتجزئة."
  },
  "tags": [
    "databases",
    "normalization"
  ]
} as AssessmentQuestion
];
