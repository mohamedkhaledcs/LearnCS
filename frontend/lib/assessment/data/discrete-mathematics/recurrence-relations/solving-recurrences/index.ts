import { AssessmentQuestion } from '@/lib/assessment/schema';

export const solving_recurrences_questions: AssessmentQuestion[] = [
{
  "id": "DM-SOLREC-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Recurrence Relations",
  "subtopic": "Solving Recurrences",
  "specialization": "Binary Search Recurrence",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "What asymptotic time complexity satisfies the recurrence `T(n) = T(n/2) + O(1)`?",
    "ar": "ما التعقيد الزمني الذي يحقق العلاقة التكرارية `T(n) = T(n/2) + O(1)`؟"
  },
  "options": [
    {
      "id": "logn",
      "text": {
        "en": "Θ(log n)",
        "ar": "Θ(log n)"
      }
    },
    {
      "id": "on",
      "text": {
        "en": "Θ(n)",
        "ar": "Θ(n)"
      }
    },
    {
      "id": "nlogn",
      "text": {
        "en": "Θ(n log n)",
        "ar": "Θ(n log n)"
      }
    },
    {
      "id": "n2",
      "text": {
        "en": "Θ(n²)",
        "ar": "Θ(n²)"
      }
    }
  ],
  "correctAnswer": "logn",
  "explanation": {
    "en": "Only one subproblem of size n/2 is visited with O(1) work per level across log₂(n) levels, yielding Θ(log n) (Binary Search).",
    "ar": "نستدعي فرعاً واحداً بنصف الحجم مع عمل ثابت في كل مستوى عبر log₂(n) مستوى (تعقيد البحث الثنائي)."
  },
  "tags": [
    "discrete-math",
    "recurrence",
    "binary-search"
  ]
} as AssessmentQuestion
];
