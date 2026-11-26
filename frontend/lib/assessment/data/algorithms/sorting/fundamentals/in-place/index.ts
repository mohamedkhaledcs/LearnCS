import { AssessmentQuestion } from '@/lib/assessment/schema';

export const in_place_questions: AssessmentQuestion[] = [
{
  "id": "AL-INP-E-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Sorting",
  "subtopic": "In-Place Sorting",
  "specialization": "Auxiliary Memory",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What auxiliary space budget typically qualifies an algorithm as 'In-Place'?",
    "ar": "ما مقدار الذاكرة الإضافية (Auxiliary Space) الذي يصنف الخوارزمية كخوارزمية 'في المكان' (In-Place)؟"
  },
  "options": [
    {
      "id": "small",
      "text": {
        "en": "O(1) constant auxiliary space (or O(log N) recursion stack)",
        "ar": "O(1) مساحة مساعدة ثابتة (أو O(log N) لمكدس الاستدعاء)"
      }
    },
    {
      "id": "on2",
      "text": {
        "en": "Allocating an O(N²) dense scratch matrix buffer throughout execution",
        "ar": "حجز مصفوفة مساعدة مربعة الحجم O(N²) في الذاكرة لتخزين نسخ المراحل الوسيطة"
      }
    },
    {
      "id": "disk",
      "text": {
        "en": "Writing temporary input array clones sequentially onto NVMe SSD swap files",
        "ar": "نقل النسخ الإضافية من المصفوفة مؤقتاً إلى القرص الصلب SSD لتحرير ذاكرة RAM"
      }
    },
    {
      "id": "none",
      "text": {
        "en": "Using zero CPU registers",
        "ar": "عدم استخدام أي مسجلات معالج"
      }
    }
  ],
  "correctAnswer": "small",
  "explanation": {
    "en": "In-place algorithms transform the input array directly using only a small constant/logarithmic amount of extra scratch space.",
    "ar": "تعدل الخوارزميات التي تعمل في المكان نفس المصفوفة دون حجز نسخة أخرى بحجم البيانات O(N)."
  },
  "tags": [
    "sorting",
    "space-complexity"
  ]
} as AssessmentQuestion
];
