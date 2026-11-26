import { AssessmentQuestion } from '@/lib/assessment/schema';

export const interval_dp_questions: AssessmentQuestion[] = [
{
  "id": "AL-DPINT-H-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Dynamic Programming",
  "subtopic": "Interval DP",
  "specialization": "Matrix Chain",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "In Matrix Chain Multiplication Interval DP, what do the DP indices dp[i][j] represent?",
    "ar": "في مسألة ضرب سلسلة المصفوفات باستخدام Interval DP، ماذا تمثل الحالة dp[i][j]؟"
  },
  "options": [
    {
      "id": "dim",
      "text": {
        "en": "The resulting dimensions after adding matrices i and j",
        "ar": "أبعاد المصفوفة الناتجة عن جمع i و j"
      }
    },
    {
      "id": "cost",
      "text": {
        "en": "Minimum scalar multiplications required to compute product of matrices i through j",
        "ar": "الحد الأدنى لعدد عمليات الضرب لحساب جداء المصفوفات من i إلى j"
      }
    },
    {
      "id": "maxval",
      "text": {
        "en": "Maximum element inside matrix range [i, j]",
        "ar": "أكبر عنصر داخل النطاق [i, j]"
      }
    },
    {
      "id": "count",
      "text": {
        "en": "The count of zero entries in matrix i",
        "ar": "عدد الأصفار في المصفوفة i"
      }
    }
  ],
  "correctAnswer": "cost",
  "explanation": {
    "en": "Interval DP evaluates subranges [i, j] in increasing length, splitting at every k in [i, j-1] to minimize dp[i][k] + dp[k+1][j] + splitCost.",
    "ar": "تحسب Interval DP الفترات حسب الطول تصاعدياً، مجربةً كل نقطة تقسيم k لتقليل تكلفة دمج الجزأين الأيسر والأيمن."
  },
  "tags": [
    "dp",
    "interval-dp"
  ]
} as AssessmentQuestion
];
