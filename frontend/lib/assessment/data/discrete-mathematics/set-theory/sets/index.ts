import { AssessmentQuestion } from '@/lib/assessment/schema';

export const sets_questions: AssessmentQuestion[] = [
{
  "id": "DM-SET-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Set Theory",
  "subtopic": "Sets & Cardinality",
  "specialization": "Duplicates & Order",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "In mathematical set notation, what is the cardinality `|S|` of the set `S = {3, 1, 3, 2, 1}`?",
    "ar": "في نظرية المجموعات، ما هو حجم المجموعة (Cardinality) `|S|` للمجموعة `S = {3, 1, 3, 2, 1}`؟"
  },
  "options": [
    {
      "id": "five",
      "text": {
        "en": "5, counting repeated duplicate integers individually in order of appearance",
        "ar": "5، لأن تكرار العدد أكثر من مرة يُحسب عنصراً مستقلاً حسب موقعه داخل الأقواس"
      }
    },
    {
      "id": "two",
      "text": {
        "en": "2, retaining strictly the smallest and largest distinct integers inside braces",
        "ar": "2"
      }
    },
    {
      "id": "six",
      "text": {
        "en": "6",
        "ar": "6، بإضافة العنصر الفارغ تلقائياً عند احتساب حجم أي مجموعة منتهية من الأعداد"
      }
    },
    {
      "id": "three",
      "text": {
        "en": "3, because mathematical sets deduplicate elements and ignore order",
        "ar": "3، لأن المجموعات تمنع التكرار وتهمل الترتيب"
      }
    }
  ],
  "correctAnswer": "three",
  "explanation": {
    "en": "{3, 1, 3, 2, 1} denotes the exact same set as {1, 2, 3}, containing 3 distinct elements.",
    "ar": "المجموعة تُعرّف بعناصرها الفريدة فقط، لذا {3, 1, 3, 2, 1} تساوي {1, 2, 3} وحجمها 3."
  },
  "tags": [
    "discrete-math",
    "sets"
  ]
} as AssessmentQuestion
];
