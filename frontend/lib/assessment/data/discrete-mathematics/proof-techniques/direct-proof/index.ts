import { AssessmentQuestion } from '@/lib/assessment/schema';

export const direct_proof_questions: AssessmentQuestion[] = [
{
  "id": "DM-DIRP-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Proof Techniques",
  "subtopic": "Direct Proof",
  "specialization": "Parity Algebra",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "In a direct proof showing that the sum of two odd integers `a` and `b` is even, how do you express `a` and `b`?",
    "ar": "في البرهان المباشر لإثبات أن مجموع أي عددين فرديين `a` و `b` هو عدد زوجي، كيف نكتب `a` و `b` جبرياً؟"
  },
  "options": [
    {
      "id": "2k1",
      "text": {
        "en": "a = 2k + 1 and b = 2m + 1 (yielding a + b = 2(k + m + 1))",
        "ar": "a = 2k + 1 و b = 2m + 1، فينتج a + b = 2(k + m + 1)"
      }
    },
    {
      "id": "samek",
      "text": {
        "en": "Write both as a = 2k + 1 and b = 2k + 1, forcing both odd integers to be identical",
        "ar": "تعبير العددين بصيغة متطابقة a = 2k + 1 و b = 2k + 1 مع فرض تساويهما دائماً"
      }
    },
    {
      "id": "even",
      "text": {
        "en": "a = 2k and b = 2m",
        "ar": "a = 2k و b = 2m"
      }
    },
    {
      "id": "ex",
      "text": {
        "en": "Evaluate three concrete pairs like 3 + 5 = 8 to generalize across all integers",
        "ar": "الاكتفاء بفحص ثلاثة أمثلة عددية مثل 3 + 5 = 8 لتعميم النتيجة كبرهان رياضي"
      }
    }
  ],
  "correctAnswer": "2k1",
  "explanation": {
    "en": "Independent integers require independent variables `k` and `m`; factoring out `2` proves the sum satisfies the definition of an even integer.",
    "ar": "يلزم استخدام متغيرين مستقلين k و m لإثبات التعميم لكل زوج، ومن ثم إخراج 2 عاملاً مشتركاً."
  },
  "tags": [
    "discrete-math",
    "proofs"
  ]
} as AssessmentQuestion
];
