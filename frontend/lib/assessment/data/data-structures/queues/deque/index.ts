import { AssessmentQuestion } from '@/lib/assessment/schema';

export const deque_questions: AssessmentQuestion[] = [
{
  "id": "DS-DEQ-M-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Queues",
  "subtopic": "Deque",
  "specialization": "Monotonic Queue",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which capability defines a Deque (Double-Ended Queue) and makes it ideal for O(N) Sliding Window Maximum?",
    "ar": "ما الخاصية التي تميز الـ Deque وتجعله مناسباً لخوارزمية أكبر عنصر في النافذة المنزلقة بزمن O(N)؟"
  },
  "options": [
    {
      "id": "mid",
      "text": {
        "en": "O(1) deletion at arbitrary middle positions",
        "ar": "الحذف في O(1) من أي موضع بالمنتصف"
      }
    },
    {
      "id": "min",
      "text": {
        "en": "O(1) binary search inside unsorted buffers",
        "ar": "بحث ثنائي في O(1) لبيانات غير مرتبة"
      }
    },
    {
      "id": "disk",
      "text": {
        "en": "Persistent B-Tree disk paging",
        "ar": "التخزين على القرص كـ B-Tree"
      }
    },
    {
      "id": "ends",
      "text": {
        "en": "Supports O(1) insertion and deletion at BOTH the front and the back",
        "ar": "يدعم الإضافة والحذف في O(1) من كلا الطرفين"
      }
    }
  ],
  "correctAnswer": "ends",
  "explanation": {
    "en": "In Sliding Window Maximum, old out-of-window indices pop from the front while smaller tail candidates pop from the back in amortized O(1) using a deque.",
    "ar": "يدعم Deque إخراج العناصر المنتهية صلاحيتها من الأمام وحذف الأصغر قيمة من الخلف في زمن O(1)."
  },
  "tags": [
    "queue",
    "deque",
    "cp"
  ]
} as AssessmentQuestion,
{
  "id": "DS-SQ-M-004",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Queues",
  "subtopic": "Deque",
  "specialization": "Capabilities",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What operations does a Double-Ended Queue (`Deque`) support in `O(1)` time that a basic Stack or Queue cannot combine?",
    "ar": "ما العمليات التي يدعمها الرتل ذو النهايتين (`Deque`) بزمن `O(1)` ولا يجتمع معاً في Stack أو Queue العادي؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Arbitrary middle insertion without scanning links",
        "ar": "الإدراج في منتصف العناصر في O(1)"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Insertion AND removal cleanly at BOTH front and back ends",
        "ar": "الإدراج والحذف من الطرفين الأمامي والخلفي في وقت ثابت `O(1)`"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Constant-time string pattern hashing across keys",
        "ar": "تجزئة النصوص بوقت ثابت"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Maintaining sorted tree height strictly under log N",
        "ar": "توازن الشجرة تحت log N"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "A Deque offers `push_front/pop_front` and `push_back/pop_back` in O(1), powering sliding window min/max cleanly.",
    "ar": "يدعم `Deque` الطرفين الأمامي والخلفي في `O(1)` وهو مثالي لمسائل القيم العظمى/الصغرى ضمن نافذة انزلاق."
  },
  "tags": [
    "deque",
    "queues",
    "o1"
  ]
} as AssessmentQuestion
];
