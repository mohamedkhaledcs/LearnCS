import { AssessmentQuestion } from '@/lib/assessment/schema';

export const meet_in_the_middle_questions: AssessmentQuestion[] = [
{
  "id": "CP-MITM-H-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Techniques",
  "subtopic": "Meet in the Middle",
  "specialization": "Exponential Split",
  "difficulty": "hard",
  "type": "complexity",
  "question": {
    "en": "Subset Sum with N = 40 and huge values (10¹⁸) cannot use 2^40 (~10¹²) brute force or DP by sum. How does Meet-in-the-Middle solve it?",
    "ar": "في مسألة Subset Sum مع N = 40 وقيم تصل لـ 10¹⁸، كيف يحل أسلوب Meet-in-the-Middle المشكلة؟"
  },
  "options": [
    {
      "id": "split",
      "text": {
        "en": "Splits into two 20-item halves, generates ~2^20 sums each, and merges pairs",
        "ar": "تقسيم المصفوفة لنصفين بحجم 20 وحساب ~2^20 مجموعاً لكل نصف ثم الدمج"
      }
    },
    {
      "id": "greedy",
      "text": {
        "en": "Repeatedly selects the largest remaining numbers greedily until reaching or passing target S",
        "ar": "تختار أكبر الأرقام المتبقية بشكل جشع متتابعاً حتى تقترب من المجموع المطلوب ثم تتوقف"
      }
    },
    {
      "id": "bfs",
      "text": {
        "en": "Runs unweighted Breadth-First Search directly across all 10^18 integer states in one queue",
        "ar": "تشغّل خوارزمية BFS مباشرة على جميع الحالات الرقمية حتى 10^18 في طابور واحد ضخم"
      }
    },
    {
      "id": "radix",
      "text": {
        "en": "Uses Radix Sort only",
        "ar": "يستخدم Radix Sort فقط"
      }
    }
  ],
  "correctAnswer": "split",
  "explanation": {
    "en": "Halving the exponent turns O(2^40) (~1 trillion) into O(2^20 · log 2^20) (~20 million operations), comfortably passing 1-second CP time limits.",
    "ar": "تنصيف الأس يحول 2^40 (تريليون) إلى قرابة 2^20 (مليون) لكل نصف، مما ينجح بسهولة ضمن حدود وقت المسابقات."
  },
  "tags": [
    "cp",
    "meet-in-the-middle",
    "binary-search"
  ]
} as AssessmentQuestion
];
