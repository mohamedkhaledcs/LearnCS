import { AssessmentQuestion } from '@/lib/assessment/schema';

export const merge_sort_questions: AssessmentQuestion[] = [
{
  "id": "AL-SORT-M-002",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Sorting",
  "subtopic": "Merge Sort",
  "specialization": "Complexity Analysis",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What is a major disadvantage of standard Merge Sort compared to Quick Sort?",
    "ar": "ما هو العيب الرئيسي لـ Merge Sort القياسي مقارنة بـ Quick Sort؟"
  },
  "options": [
    {
      "id": "space",
      "text": {
        "en": "Merge Sort requires O(n) auxiliary space.",
        "ar": "الـ Merge Sort يتطلب مساحة إضافية O(n)."
      }
    },
    {
      "id": "time",
      "text": {
        "en": "Merge Sort has a worse worst-case time complexity.",
        "ar": "أسوأ time complexity لـ Merge Sort أبطأ."
      }
    },
    {
      "id": "stable",
      "text": {
        "en": "Merge Sort is not a stable sort.",
        "ar": "الـ Merge Sort ليس ترتيباً مستقراً (stable sort)."
      }
    },
    {
      "id": "recursive",
      "text": {
        "en": "Merge Sort cannot be implemented recursively.",
        "ar": "لا يمكن برمجة Merge Sort باستخدام الـ recursion."
      }
    }
  ],
  "correctAnswer": "space",
  "explanation": {
    "en": "Standard array-based Merge Sort needs an O(n) auxiliary buffer to merge sorted subarrays, whereas Quick Sort sorts in-place using O(log n) stack space on average.",
    "ar": "يحتاج Merge Sort القياسي إلى مصفوفة مساعدة بحجم O(n) لدمج الأجزاء المرتبة، بينما يعمل Quick Sort في نفس الذاكرة (in-place) بمساحة مكدس O(log n) في المتوسط."
  }
} as AssessmentQuestion,
{
  "id": "AL-SRT-E-002",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Sorting",
  "subtopic": "Merge Sort",
  "specialization": "Complexities",
  "difficulty": "easy",
  "type": "complexity",
  "question": {
    "en": "What are the worst-case Time and Auxiliary Space complexities of standard array Merge Sort?",
    "ar": "ما التعقيد الزمني في أسوأ حالة والتعقيد المكاني الإضافي لخوارزمية Merge Sort القياسية على المصفوفات؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Time O(N^2) worst-case, Space O(1)",
        "ar": "الزمن O(N^2) والمساحة O(1)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Time O(N log N), Space O(1) strictly in-place",
        "ar": "الزمن O(N log N) والمساحة O(1)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Time O(N + K), Space O(N)",
        "ar": "الزمن O(N + K) والمساحة O(N)"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Time O(N log N) worst-case, Space O(N) temporary merge buffer",
        "ar": "الزمن O(N log N) دائماً والمساحة الإضافية O(N) لمصفوفة الدمج"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Merge Sort always halving evenly guarantees `O(N log N)` even on reverse-sorted arrays, needing `O(N)` temporary merge scratch storage.",
    "ar": "تقسم Merge Sort المصفوفة لنصفين بانتظام فزمنها `O(N log N)` دائماً مع مصفوفة مساعدة `O(N)` للدمج."
  },
  "tags": [
    "merge-sort",
    "complexity",
    "sorting"
  ]
} as AssessmentQuestion,
{
  "id": "AL-SRT-E-006",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Sorting",
  "subtopic": "Stability",
  "specialization": "Multi-Key Sort",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "You sort support tickets by `timestamp` ascending, then re-sort by `priority` using a **Stable** sort. For tickets sharing the SAME priority, how are they ordered?",
    "ar": "فرزتَ التذاكر أولاً حسب الوقت تصاعدياً، ثم أعدتَ فرزها حسب الأولوية بخوارزمية فرز **ثابتة (Stable)**. كيف تترتب التذاكر المتساوية في الأولوية؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Shuffled in random heap order regardless of timestamps",
        "ar": "تتبعثر عشوائياً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Reversed strictly descending by ticket creation date",
        "ar": "تنعكس زمنياً للخلف"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Deduplicated down cleanly to one ticket per timestamp",
        "ar": "تُحذف التذاكر المكررة"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Sorted chronologically by earlier `timestamp` cleanly preserved from pass 1",
        "ar": "تظل مرتبة زمنياً حسب التوقيت المحفوظ من الجولة الأولى"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "A Stable sort retains original relative ties (`timestamp` order) whenever primary comparison keys (`priority`) are equal.",
    "ar": "الفرز الثابت يحافظ على الترتيب السابق للعناصر المتساوية في المفتاح الجديد."
  },
  "tags": [
    "stable-sort",
    "sorting",
    "multi-key"
  ]
} as AssessmentQuestion
];
