import { AssessmentQuestion } from '@/lib/assessment/schema';

export const bubble_sort_questions: AssessmentQuestion[] = [
{
  "id": "AL-BUB-E-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Sorting",
  "subtopic": "Bubble Sort",
  "specialization": "Best Case Optimization",
  "difficulty": "easy",
  "type": "complexity",
  "question": {
    "en": "With an early-exit flag checking whether any swaps occurred in a pass, what is Bubble Sort's best-case time complexity on an already-sorted array?",
    "ar": "عند إضافة علم للتوقف المبكر إذا لم يحدث أي تبديل (swap) في الدورة، ما هو أفضل تعقيد زمني لـ Bubble Sort على مصفوفة مرتبة أصلاً؟"
  },
  "options": [
    {
      "id": "on2",
      "text": {
        "en": "O(N²)",
        "ar": "O(N²)"
      }
    },
    {
      "id": "on",
      "text": {
        "en": "O(N)",
        "ar": "O(N)"
      }
    },
    {
      "id": "ologn",
      "text": {
        "en": "O(log N)",
        "ar": "O(log N)"
      }
    },
    {
      "id": "o1",
      "text": {
        "en": "O(1)",
        "ar": "O(1)"
      }
    }
  ],
  "correctAnswer": "on",
  "explanation": {
    "en": "On an already sorted input, the first pass performs N-1 comparisons, records 0 swaps, and stops immediately -> O(N).",
    "ar": "على مصفوفة مرتبة بالفعل، تمر الخوارزمية دورة واحدة من N-1 مقارنة، ولا تجد أي تبديل، فتتوقف فوراً بزمن O(N)."
  },
  "tags": [
    "sorting",
    "bubble-sort"
  ]
} as AssessmentQuestion
];
