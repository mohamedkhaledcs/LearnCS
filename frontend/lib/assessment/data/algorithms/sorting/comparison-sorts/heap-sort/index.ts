import { AssessmentQuestion } from '@/lib/assessment/schema';

export const heap_sort_questions: AssessmentQuestion[] = [
{
  "id": "AL-HEAPSORT-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Sorting",
  "subtopic": "Heap Sort",
  "specialization": "Complexity Guarantees",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which combination accurately characterizes Heap Sort?",
    "ar": "أي وصف يمثل خصائص خوارزمية Heap Sort بدقة؟"
  },
  "options": [
    {
      "id": "stable",
      "text": {
        "en": "O(N log N) worst-case time, O(N) extra scratch buffers, strictly stable",
        "ar": "أسوأ زمن O(N log N)، تحتاج مساحة O(N) إضافية للدمج، ومستقرة تماماً"
      }
    },
    {
      "id": "quad",
      "text": {
        "en": "O(N²) worst-case time on sorted arrays, O(1) space, stable across ties",
        "ar": "أسوأ زمن O(N²) تربيعي مع المصفوفات المرتبة مسبقاً ومساحة ثابتة O(1)"
      }
    },
    {
      "id": "in_place",
      "text": {
        "en": "O(N log N) worst-case time, O(1) extra space, unstable",
        "ar": "أسوأ زمن O(N log N)، مساحة O(1) في المكان، غير مستقرة"
      }
    },
    {
      "id": "linear",
      "text": {
        "en": "O(N) worst-case time on arbitrary floats",
        "ar": "أسوأ زمن O(N) لأي أرقام عشرية"
      }
    }
  ],
  "correctAnswer": "in_place",
  "explanation": {
    "en": "Heap Sort avoids Quick Sort's O(N²) worst case and Merge Sort's O(N) extra memory, giving O(N log N) worst-case time in O(1) space, though long-distance swaps break stability.",
    "ar": "يجمع Heap Sort بين ضمان O(N log N) في أسوأ حالة والمساحة الثابتة O(1)، لكن التباديل البعيدة في الكومة تفقده الاستقرار."
  },
  "tags": [
    "sorting",
    "heap-sort",
    "heaps"
  ]
} as AssessmentQuestion
];
