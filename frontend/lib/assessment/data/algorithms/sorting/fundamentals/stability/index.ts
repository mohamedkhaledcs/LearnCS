import { AssessmentQuestion } from '@/lib/assessment/schema';

export const stability_questions: AssessmentQuestion[] = [
{
  "id": "AL-STAB-E-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Sorting",
  "subtopic": "Stability",
  "specialization": "Equal Key Ordering",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What does it mean for a sorting algorithm to be 'Stable'?",
    "ar": "ماذا يعني أن خوارزمية الفرز 'مستقرة' (Stable Sort)؟"
  },
  "options": [
    {
      "id": "crash",
      "text": {
        "en": "The sorting routine guarantees zero runtime exceptions on arbitrary null arrays",
        "ar": "ضمان عدم انهيار الخوارزمية أو رمي استثناء ذاكرة عند معالجة مصفوفات فارغة"
      }
    },
    {
      "id": "o1",
      "text": {
        "en": "It always takes O(1) memory",
        "ar": "التزام الخوارزمية بمساحة ذاكرة إضافية ثابتة O(1) لا تتغير بتضاعف عدد العناصر"
      }
    },
    {
      "id": "rand",
      "text": {
        "en": "Repeatedly sorting identical inputs intentionally yields varying tie orderings",
        "ar": "أنها تعطي مخرجات مختلفة عند تساوي القيم"
      }
    },
    {
      "id": "rel",
      "text": {
        "en": "Equal-key elements keep their original relative input order",
        "ar": "العناصر المتساوية بالمفتاح تحفظ ترتيبها النسبي الأصلي"
      }
    }
  ],
  "correctAnswer": "rel",
  "explanation": {
    "en": "Stability is vital for multi-key sorting (e.g., sorting records by name first, then stably sorting by department keeps names alphabetical within each department).",
    "ar": "يُحافظ الفرز المستقر على الترتيب السابق للعناصر المتساوية، وهو أساسي عند الفرز حسب عدة حقول متتالية."
  },
  "tags": [
    "sorting",
    "stability"
  ]
} as AssessmentQuestion
];
