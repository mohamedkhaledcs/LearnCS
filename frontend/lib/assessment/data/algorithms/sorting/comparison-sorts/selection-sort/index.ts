import { AssessmentQuestion } from '@/lib/assessment/schema';

export const selection_sort_questions: AssessmentQuestion[] = [
{
  "id": "AL-SEL-E-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Sorting",
  "subtopic": "Selection Sort",
  "specialization": "Write Minimization",
  "difficulty": "easy",
  "type": "complexity",
  "question": {
    "en": "How many array swaps (writes) does Selection Sort perform in the worst case on N elements?",
    "ar": "كم عملية تبديل (Swap) كحد أقصى تنفذها خوارزمية Selection Sort لفرز N عنصراً؟"
  },
  "options": [
    {
      "id": "n2",
      "text": {
        "en": "O(N²) swaps",
        "ar": "O(N²) تبديلات"
      }
    },
    {
      "id": "nlogn",
      "text": {
        "en": "O(N log N) swaps",
        "ar": "O(N log N) تبديلات"
      }
    },
    {
      "id": "n",
      "text": {
        "en": "At most N - 1 swaps",
        "ar": "على الأكثر N - 1 تبديل -> O(N) كتابة"
      }
    },
    {
      "id": "zero",
      "text": {
        "en": "0 swaps",
        "ar": "0 تبديلات"
      }
    }
  ],
  "correctAnswer": "n",
  "explanation": {
    "en": "Selection Sort performs O(N²) comparisons to find the minimum in each pass, but executes only 1 swap per outer pass -> at most N - 1 swaps.",
    "ar": "على الرغم من أن المقارنات O(N²)، لا تجري الخوارزمية إلا تبديلاً واحداً فقط في نهاية كل دورة، مما يجعلها مفيدة إذا كانت الكتابة للذاكرة مكلفة."
  },
  "tags": [
    "sorting",
    "selection-sort"
  ]
} as AssessmentQuestion
];
