import { AssessmentQuestion } from '@/lib/assessment/schema';

export const red_black_questions: AssessmentQuestion[] = [
{
  "id": "DS-RB-H-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Trees",
  "subtopic": "Red-Black Trees",
  "specialization": "Practical Adoption",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "Why do C++ `std::map` and Java `TreeMap` prefer Red-Black Trees over stricter AVL Trees?",
    "ar": "لماذا تفضل مكتبات مثل `std::map` في C++ و `TreeMap` في Java استخدام Red-Black Tree بدلاً من AVL الصارمة؟"
  },
  "options": [
    {
      "id": "o1",
      "text": {
        "en": "Red-Black Trees perform key lookup and predecessor iteration in guaranteed O(1) worst-case time",
        "ar": "تمنح شجرة Red-Black تعقيد بحث O(1) ثابتاً في أسوأ الحالات مقارنة بـ O(log N) لـ AVL"
      }
    },
    {
      "id": "unsorted",
      "text": {
        "en": "AVL Trees strictly forbid storing signed integers or ordered strings due to height checks",
        "ar": "لأن AVL لا تدعم الأعداد"
      }
    },
    {
      "id": "rot",
      "text": {
        "en": "Allowing height up to 2·log₂(N+1) cuts costly tree rotations to O(1) amortized",
        "ar": "تسمح بارتفاع حتى 2·log₂(N+1) فتقلل الدورانات إلى O(1) استهلاكياً"
      }
    },
    {
      "id": "mem",
      "text": {
        "en": "AVL trees require O(N²) memory",
        "ar": "تتطلب أشجار AVL مساحة ذاكرة مربعة O(N²) لتخزين معاملات التوازن في كل عقدة فرعية"
      }
    }
  ],
  "correctAnswer": "rot",
  "explanation": {
    "en": "AVL is slightly faster for lookup-heavy workloads due to tighter balance, while Red-Black requires at most 2-3 rotations on insert/delete, making writes faster.",
    "ar": "توفر AVL بحثاً أسرع قليلاً، لكن Red-Black أسرع في التعديلات الكثيرة لأنها تتطلب عدداً محدوداً جداً من الدورانات."
  },
  "tags": [
    "trees",
    "red-black"
  ]
} as AssessmentQuestion
];
