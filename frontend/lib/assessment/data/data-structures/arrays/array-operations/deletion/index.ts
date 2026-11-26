import { AssessmentQuestion } from '@/lib/assessment/schema';

export const deletion_questions: AssessmentQuestion[] = [
{
  "id": "DS-ARRDEL-E-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Arrays",
  "subtopic": "Deletion",
  "specialization": "Amortized Back Pop vs Middle Delete",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Deleting the LAST element of a dynamic array takes O(1), whereas deleting at the middle (index N/2) takes...",
    "ar": "حذف العنصر الأخير في مصفوفة ديناميكية يستغرق O(1)، بينما حذف عنصر في المنتصف (N/2) يستغرق..."
  },
  "options": [
    {
      "id": "o1",
      "text": {
        "en": "O(1) constant time by clearing the targeted cell without moving later indices",
        "ar": "O(1) دائماً لأن مسح العنصر الوسطي يترك الخانة محذوفة تلقائياً دون تحريك البقية"
      }
    },
    {
      "id": "ologn",
      "text": {
        "en": "O(log N) using midpoint pointer partitioning across the trailing array elements",
        "ar": "O(log N)"
      }
    },
    {
      "id": "nlogn",
      "text": {
        "en": "O(N log N)",
        "ar": "O(N log N) لأن لغة البرمجة تعيد فرز نصف المصفوفة الأيمن تلقائياً بعد كل حذف"
      }
    },
    {
      "id": "on",
      "text": {
        "en": "O(N) due to shifting remaining trailing elements left by one index",
        "ar": "O(N) بسبب إزاحة العناصر اللاحقة لليسار لسد الفجوة"
      }
    }
  ],
  "correctAnswer": "on",
  "explanation": {
    "en": "Removing the tail simply decrements the size counter in O(1), whereas middle deletion must left-shift ~N/2 elements to keep the array contiguous -> O(N).",
    "ar": "حذف العنصر الأخير يقلص مؤشر الطول فقط في O(1)، أما الحذف من المنتصف فيجبر نصف العناصر على التحرك لليسار O(N)."
  },
  "tags": [
    "arrays",
    "data-structures"
  ]
} as AssessmentQuestion,
{
  "id": "DS-ARR-H-006",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Arrays",
  "subtopic": "Deletion",
  "specialization": "Order-Agnostic Delete",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "When relative element order does NOT matter inside an unsorted dynamic array, how can you delete index `i` in `O(1)` time?",
    "ar": "إذا لم يكن الترتيب النسبي مهماً في مصفوفة ديناميكية، كيف يمكن حذف العنصر عند الفهرس `i` في زمن ثابت `O(1)`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Null out index `i` and rebuild a binary search tree on every second delete",
        "ar": "ترك الفهرس فارغاً وبناء شجرة بحث لاحقاً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Shift elements left from `N - 1` toward `i` in double batches",
        "ar": "إزاحة العناصر من النهاية نحو i على دفعتين"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Copy the last element `arr.back()` into `arr[i]` and run `arr.pop_back()`",
        "ar": "نسخ آخر عنصر `arr.back()` إلى الموضع `arr[i]` ثم حذف الأخير `pop_back()`"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Reverse the array twice so index `i` arrives at slot zero",
        "ar": "عكس المصفوفة مرتين"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Swap-and-pop removes arbitrary indices in strictly `O(1)` when element ordering need not be preserved.",
    "ar": "استبدال العنصر المحذوف بالعنصر الأخير ثم تقليص الطول ينجز الحذف في `O(1)` بدلاً من الإزاحة `O(N)`."
  },
  "tags": [
    "arrays",
    "deletion",
    "o1-trick"
  ]
} as AssessmentQuestion
];
