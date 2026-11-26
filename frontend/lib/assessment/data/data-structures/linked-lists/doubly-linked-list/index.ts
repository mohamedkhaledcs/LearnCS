import { AssessmentQuestion } from '@/lib/assessment/schema';

export const doubly_linked_list_questions: AssessmentQuestion[] = [
{
  "id": "DS-DLL-M-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Linked Lists",
  "subtopic": "Doubly Linked List",
  "specialization": "Node Deletion",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Given ONLY a direct pointer to node P in a Doubly Linked List (with head/tail sentinels), what is the time complexity to delete P?",
    "ar": "بافتراض وجود مؤشر مباشر للعقدة P فقط داخل Doubly Linked List، ما تعقيد حذف العقدة P؟"
  },
  "options": [
    {
      "id": "on",
      "text": {
        "en": "O(N), requiring a sequential linear walk starting strictly from the head sentinel",
        "ar": "O(N)، لأنه يتوجب البحث الخطي المتسلسل من مؤشر الرأس head للوصول للسابق"
      }
    },
    {
      "id": "o1",
      "text": {
        "en": "O(1), since P.prev directly accesses the preceding node",
        "ar": "O(1)، لأن P.prev يمنح وصولاً فورياً للعقدة السابقة"
      }
    },
    {
      "id": "ologn",
      "text": {
        "en": "O(log N) binary hopping over midpoint doubly linked node pointers",
        "ar": "O(log N)"
      }
    },
    {
      "id": "on2",
      "text": {
        "en": "O(N²)",
        "ar": "O(N²) بسبب ضرورة تحديث مؤشرات كل العقد اللاحقة في كل خطوة حذف"
      }
    }
  ],
  "correctAnswer": "o1",
  "explanation": {
    "en": "Unlike a singly linked list (where you'd need O(N) to find the previous node), a doubly linked node already stores P.prev, enabling O(1) pointer rewiring (critical for LRU caches).",
    "ar": "تمتلك العقدة في Doubly Linked List مؤشر prev، فتُربط السابقة بالتالية في O(1) مباشرة (وهو أساس بنية LRU Cache)."
  },
  "tags": [
    "linked-lists",
    "pointers"
  ]
} as AssessmentQuestion,
{
  "id": "DS-LL-M-003",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Linked Lists",
  "subtopic": "Doubly Linked List",
  "specialization": "LRU Eviction",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Given a direct pointer to an arbitrary middle node `X`, why does deleting `X` run in `O(1)` inside a Doubly Linked List vs `O(N)` in a Singly Linked List?",
    "ar": "بفرض امتلاك مؤشر مباشر على عقدة في المنتصف `X`، لماذا يُحذف `X` في `O(1)` في القائمة المزدوجة Doubly مقابل `O(N)` في الأحادية؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Doubly linked list nodes sit packed inside strictly contiguous memory arrays automatically",
        "ar": "ترتّب القائمة المزدوجة جميع عقدها في مواقع متجاورة متتالية في الذاكرة كالمصفوفة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Singly linked list structs strictly disallow dereferencing trailing `next` twice",
        "ar": "تمنع القائمة الأحادية تتبع `next` مرتين بينما تعتمد المزدوجة على جدول تجزئة داخلي"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Doubly linked lists auto-hash every integer key internally",
        "ar": "لأنها تستخدم جدول تجزئة داخلياً"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "`X->prev` sits directly on `X`, avoiding an O(N) scan from `head`",
        "ar": "تحفظ العقدة مؤشر سابقتها `X->prev` مباشرة دون بحث من البداية"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Having direct access to both `X->prev` and `X->next` rewires links in O(1): the foundation of Hash Map + Doubly Linked List LRU Caches.",
    "ar": "توفر المؤشرين `prev` و`next` معاً يتيح فك وربط الروابط المحيطة بـ `X` في وقت ثابت `O(1)`."
  },
  "tags": [
    "doubly-linked-list",
    "lru-cache",
    "o1"
  ]
} as AssessmentQuestion
];
