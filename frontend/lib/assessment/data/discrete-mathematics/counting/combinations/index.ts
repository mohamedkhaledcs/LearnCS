import { AssessmentQuestion } from '@/lib/assessment/schema';

export const combinations_questions: AssessmentQuestion[] = [
{
  "id": "DM-COMB-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Counting",
  "subtopic": "Combinations",
  "specialization": "Unordered Subsets",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How many distinct 3-person teams (order does NOT matter) can be chosen from 5 programmers?",
    "ar": "كم فريقاً مختلفاً مكوناً من 3 مبرمجين (الترتيب غير مهم) يمكن اختياره من بين 5 مبرمجين؟"
  },
  "options": [
    {
      "id": "10",
      "text": {
        "en": "10 (= C(5, 3))",
        "ar": "10 (= C(5, 3))"
      }
    },
    {
      "id": "60",
      "text": {
        "en": "60 (ordered permutations P(5, 3) when selection order matters)",
        "ar": "60 (عدد التراتيب P(5, 3) لو كان ترتيب المناصب مهماً)"
      }
    },
    {
      "id": "15",
      "text": {
        "en": "15 (choosing pairs cleanly from 6 distinct team candidates)",
        "ar": "15 (ناتج اختيار زوجين عشوائيين من أصل ستة متسابقين)"
      }
    },
    {
      "id": "25",
      "text": {
        "en": "25",
        "ar": "25"
      }
    }
  ],
  "correctAnswer": "10",
  "explanation": {
    "en": "Combinations divide permutations by r! to ignore internal team ordering: C(5, 3) = 60 / 6 = 10.",
    "ar": "لأن الترتيب غير مهم نقسم التباديل على 3! فينتج 60 / 6 = 10 توافيق."
  },
  "tags": [
    "discrete-math",
    "counting",
    "combinatorics"
  ]
} as AssessmentQuestion,
{
  "id": "DM-CNT-M-003",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Counting",
  "subtopic": "Permutations vs Combinations",
  "specialization": "Order Choice",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "How many unordered 2-person study pairs can form cleanly from a group of 6 students?",
    "ar": "كم زوجاً دراسياً مختلفاً (شخصين بدون أهمية للترتيب) يمكن تكوينه من مجموعة تضم 6 طلاب؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "30 pairs",
        "ar": "30 زوجاً"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "12 pairs",
        "ar": "12 زوجاً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "15 pairs",
        "ar": "15 زوجاً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "36 pairs",
        "ar": "36 زوجاً"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "`C(6, 2) = (6 * 5) / 2 = 15` distinct pairs since `{Ali, Sara}` equals `{Sara, Ali}`.",
    "ar": "بالتوافيق `C(6, 2) = (6 * 5) / 2 = 15` لأن الترتيب داخل الزوج غير مؤثر."
  },
  "tags": [
    "combinations",
    "counting",
    "ncr"
  ]
} as AssessmentQuestion
];
