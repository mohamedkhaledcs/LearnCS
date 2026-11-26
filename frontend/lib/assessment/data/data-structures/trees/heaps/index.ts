import { AssessmentQuestion } from '@/lib/assessment/schema';

export const heaps_questions: AssessmentQuestion[] = [
{
  "id": "DS-HEAP-M-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Trees",
  "subtopic": "Heaps",
  "specialization": "Heapify Complexity",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "Using Floyd's bottom-up heapify algorithm on an unsorted array of N elements, what is the time complexity to build a valid Binary Heap?",
    "ar": "باستخدام خوارزمية Floyd (bottom-up heapify) على مصفوفة غير مرتبة من N عنصراً، ما تعقيد بناء كومة (Binary Heap)؟"
  },
  "options": [
    {
      "id": "on",
      "text": {
        "en": "O(N) linear time",
        "ar": "O(N) زمن خطي"
      }
    },
    {
      "id": "nlogn",
      "text": {
        "en": "O(N log N)",
        "ar": "O(N log N)"
      }
    },
    {
      "id": "on2",
      "text": {
        "en": "O(N²)",
        "ar": "O(N²)"
      }
    },
    {
      "id": "ologn",
      "text": {
        "en": "O(log N)",
        "ar": "O(log N)"
      }
    }
  ],
  "correctAnswer": "on",
  "explanation": {
    "en": "Half of the nodes are leaves (height 0), a quarter have height 1, etc. Summing N/2^(k+1) * k converges strictly to O(N), faster than N individual insertions O(N log N).",
    "ar": "معظم العقد قريبة من الأوراق ولا تتحرك سوى خطوة أو خطوتين، لذا يثبت التحليل الرياضي أن البناء من الأسفل للأعلى هو O(N) وليس O(N log N)."
  },
  "tags": [
    "trees",
    "heaps",
    "priority-queue"
  ]
} as AssessmentQuestion,
{
  "id": "DS-TRE-M-004",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Heaps & Priority Queues",
  "subtopic": "Binary Heaps",
  "specialization": "Heap Array Index",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "In a standard 0-indexed Binary Heap stored inside an array, which index holds the LEFT child of node at index `i`?",
    "ar": "في Binary Heap المخزّن داخل مصفوفة تبدأ بالفهرس 0، ما فهرس الابن الأيسر للعقدة الموجودة في الموضع `i`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "i / 2",
        "ar": "i / 2"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "2 * i + 2",
        "ar": "2 * i + 2"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "i * i + 1",
        "ar": "i * i + 1"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "2 * i + 1",
        "ar": "2 * i + 1"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Under 0-based heap indexing, node `i` places children at `2*i + 1` (left) and `2*i + 2` (right), with parent `(i - 1) / 2`.",
    "ar": "في الفهرسة الصفرية يكون الابن الأيسر عند `2*i + 1` والأيمن عند `2*i + 2`."
  },
  "tags": [
    "heap",
    "binary-tree",
    "indexing"
  ]
} as AssessmentQuestion
];
