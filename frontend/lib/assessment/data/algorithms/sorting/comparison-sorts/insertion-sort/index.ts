import { AssessmentQuestion } from '@/lib/assessment/schema';

export const insertion_sort_questions: AssessmentQuestion[] = [
{
  "id": "AL-INS-E-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Sorting",
  "subtopic": "Insertion Sort",
  "specialization": "Nearly Sorted Arrays",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why do hybrid library sorts (like Timsort and Introsort) switch to Insertion Sort on small or nearly sorted subarrays?",
    "ar": "لماذا تتحول خوارزميات الفرز الهجينة (مثل Timsort و Introsort) إلى Insertion Sort مع المصفوفات الصغيرة أو شبه المرتبة؟"
  },
  "options": [
    {
      "id": "logn",
      "text": {
        "en": "Insertion Sort mathematically executes arbitrary random permutations in O(log N) comparisons",
        "ar": "تعمل خوارزمية الإدراج في زمن O(log N) حتى مع أسوأ الترتيبات المعكوسة بالكامل"
      }
    },
    {
      "id": "heap",
      "text": {
        "en": "It allocates O(N) auxiliary priority heap buffers to eliminate scalar loop variables",
        "ar": "تعتمد على حجز مساحة إضافية بحجم O(N) في الكومة لتسريع تبديل العناصر المتجاورة"
      }
    },
    {
      "id": "parallel",
      "text": {
        "en": "It requires zero comparisons",
        "ar": "لأنها لا تقوم بأي مقارنات"
      }
    },
    {
      "id": "fast",
      "text": {
        "en": "Low constant overhead and O(N) adaptive speed on nearly sorted inputs",
        "ar": "لقلة ثوابتها وسرعتها الخطية تقريباً O(N) مع البيانات شبه المرتبة"
      }
    }
  ],
  "correctAnswer": "fast",
  "explanation": {
    "en": "Insertion Sort shifts each key only as far left as its inversions require, making it adaptive (O(N) on nearly sorted data) and cache-friendly with zero recursion overhead.",
    "ar": "يتكيف Insertion Sort مع عدد الانعكاسات القليلة في البيانات شبه المرتبة، ولا يفرض عبء استدعاءات عودية على المصفوفات الصغيرة."
  },
  "tags": [
    "sorting",
    "insertion-sort"
  ]
} as AssessmentQuestion,
{
  "id": "AL-SRT-M-004",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Sorting",
  "subtopic": "Insertion Sort",
  "specialization": "Nearly Sorted Speed",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why do industrial hybrid sorts like Python Timsort and C++ Introsort switch to **Insertion Sort** for tiny slices (`N <= 16`) or nearly sorted arrays?",
    "ar": "لماذا تتحول خوارزميات الفرز الحديثة مثل `Timsort` و`Introsort` إلى **Insertion Sort** للمقاطع الصغيرة (`N <= 16`) أو شبه المرتبة؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Recursive Merge Sort strictly stops functioning on slices below 16 items",
        "ar": "لأن خوارزمية الدمج تعجز تماماً عن العمل العودي إذا قل طول الجزء عن 16 عنصراً"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Minimal constant overhead, cache locality, and ~O(N) runs when nearly sorted",
        "ar": "قلة الثابت التشغيلي وملاءمة الـ Cache وسرعة ~O(N) للبيانات شبه المرتبة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Insertion Sort builds parallel lock-free hash indices over string chunks",
        "ar": "لأنه يعتمد داخلياً على خرائط تجزئة متوازية لفرز ملفات تفوق 64 جيجابايت بدون RAM"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "To allow sorting strings larger than 64 GB without RAM",
        "ar": "لفرز 64 جيجابايت بدون RAM"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "When inputs contain very few inversions or `N <= 16`, Insertion Sort beats recursive divide-and-conquer cleanly in wall-clock speed.",
    "ar": "للمصفوفات الصغيرة أو شبه المرتبة يكون Insertion Sort عملياً أسرع وأقل كلفة في الـ Cache والنداءات."
  },
  "tags": [
    "insertion-sort",
    "timsort",
    "hybrid-sorting"
  ]
} as AssessmentQuestion
];
