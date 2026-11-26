import { AssessmentQuestion } from '@/lib/assessment/schema';

export const priority_queue_questions: AssessmentQuestion[] = [
{
  "id": "DS-PQ-M-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Queues",
  "subtopic": "Priority Queue",
  "specialization": "Heap Complexity",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "With a binary heap backing a Priority Queue of N elements, what are the complexities of push(), top()/peek(), and pop()?",
    "ar": "عند بناء طابور الأولوية (Priority Queue) باستخدام Binary Heap لحجم N، ما تعقيد عمليات push() و top() و pop()؟"
  },
  "options": [
    {
      "id": "const",
      "text": {
        "en": "O(1) constant runtime across push, peek/top, and pop operations simultaneously",
        "ar": "O(1) زمن ثابت لجميع عمليات الإضافة والاطلاع والإزالة دون إعادة موازنة"
      }
    },
    {
      "id": "lin",
      "text": {
        "en": "push: O(N), top: O(1), pop: O(N)",
        "ar": "push في O(N) مع top في O(1) وإزالة pop في O(N) بسبب إزاحة الكومة كاملة"
      }
    },
    {
      "id": "heap",
      "text": {
        "en": "push: O(log N), top: O(1), pop: O(log N)",
        "ar": "push: O(log N)، top: O(1)، pop: O(log N)"
      }
    },
    {
      "id": "nlog",
      "text": {
        "en": "O(N log N) push and pop re-sorting with O(log N) top inspection overhead",
        "ar": "push: O(N log N)"
      }
    }
  ],
  "correctAnswer": "heap",
  "explanation": {
    "en": "The extreme element always rests at the heap root (index 0) for O(1) peek, while bubble-up on push and sift-down on pop traverse tree height log₂(N).",
    "ar": "يوجد العنصر ذو الأولوية القصوى في الجذر في O(1)، بينما تستغرق إعادة موازنة الكومة عند الإدراج أو الحذف ارتفاع الشجرة O(log N)."
  },
  "tags": [
    "priority-queue",
    "heaps"
  ]
} as AssessmentQuestion
];
