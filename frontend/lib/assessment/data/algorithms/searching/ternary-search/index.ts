import { AssessmentQuestion } from '@/lib/assessment/schema';

export const ternary_search_questions: AssessmentQuestion[] = [
{
  "id": "AL-TERN-H-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Ternary Search",
  "specialization": "Unimodal Optimization",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "What mathematical property must a continuous function f(x) satisfy for Ternary Search to find its unique maximum?",
    "ar": "ما الخاصية الرياضية اللازمة لدالة f(x) لتنجح خوارزمية Ternary Search في إيجاد قيمتها العظمى الوحيدة؟"
  },
  "options": [
    {
      "id": "lin",
      "text": {
        "en": "Strictly linear everywhere",
        "ar": "خطية تماماً في كل المجال"
      }
    },
    {
      "id": "uni",
      "text": {
        "en": "Unimodal",
        "ar": "أحادية المنوال"
      }
    },
    {
      "id": "per",
      "text": {
        "en": "Periodic with multiple equal peaks",
        "ar": "دورية ذات قمم متكررة متساوية"
      }
    },
    {
      "id": "rand",
      "text": {
        "en": "Arbitrary oscillating noise",
        "ar": "دالة عشوائية متعددة القمم"
      }
    }
  ],
  "correctAnswer": "uni",
  "explanation": {
    "en": "Comparing f(m1) and f(m2) on thirds safely discards one outer third only when there is a single peak (unimodal shape).",
    "ar": "تعتمد Ternary Search على مقارنة نقطتي الثلثين m1 و m2 لاستبعاد ثلث من المدى، ولا يصح ذلك إلا إذا كانت الدالة بقمة واحدة (Unimodal)."
  },
  "tags": [
    "searching",
    "ternary-search",
    "cp"
  ]
} as AssessmentQuestion,
{
  "id": "AL-BOA-M-004",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Searching",
  "subtopic": "Ternary Search",
  "specialization": "Unimodal Functions",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "When is **Ternary Search** (`m1, m2`) used instead of standard Binary Search?",
    "ar": "متى تُستخدم خوارزمية **البحث الثلاثي (Ternary Search)** بدلاً من البحث الثنائي المعتاد؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Finding the single peak minimum or maximum of a Unimodal function",
        "ar": "إيجاد القمة الصغرى أو العظمى الوحيدة لدالة أحادية النسق"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Searching unordered hash tables in O(1)",
        "ar": "البحث في جداول التجزئة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Splitting graphs into three disjoint components",
        "ar": "تقسيم الرسم لثلاثة أجزاء"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Sorting integer keys in O(N)",
        "ar": "فرز الأعداد"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Comparing two interior points `f(m1)` vs `f(m2)` eliminates one third of a convex/unimodal domain cleanly toward the unique extremum.",
    "ar": "تقسم نقطتا الاختبار المدى لثلاثة أثلاث للتقارب نحو القمة الوحيدة لدوال التقعر."
  },
  "tags": [
    "ternary-search",
    "unimodal",
    "algorithms"
  ]
} as AssessmentQuestion
];
