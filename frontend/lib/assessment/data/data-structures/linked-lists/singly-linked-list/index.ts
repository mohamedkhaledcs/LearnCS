import { AssessmentQuestion } from '@/lib/assessment/schema';

export const singly_linked_list_questions: AssessmentQuestion[] = [
{
  "id": "DS-LL-M-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Linked Lists",
  "subtopic": "Singly Linked List",
  "specialization": "Performance",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What is the time complexity of inserting a new Node at the beginning of a Singly Linked List?",
    "ar": "ما هو الـ time complexity لإضافة Node جديد في بداية Singly Linked List؟"
  },
  "options": [
    {
      "id": "o1",
      "text": {
        "en": "O(1)",
        "ar": "O(1)"
      }
    },
    {
      "id": "on",
      "text": {
        "en": "O(n)",
        "ar": "O(n)"
      }
    },
    {
      "id": "ologn",
      "text": {
        "en": "O(log n)",
        "ar": "O(log n)"
      }
    },
    {
      "id": "on2",
      "text": {
        "en": "O(n²)",
        "ar": "O(n²)"
      }
    }
  ],
  "correctAnswer": "o1",
  "explanation": {
    "en": "Inserting at the head of a singly linked list only sets newNode.next = head and updates head = newNode, requiring O(1) operations regardless of list length.",
    "ar": "الإدراج في بداية القائمة المترابطة الفردية يكتفي بتحديث مؤشرين (newNode.next و head)، وهي عملية O(1) ثابتة الزمن."
  }
} as AssessmentQuestion,
{
  "id": "DS-LL-E-002",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Linked Lists",
  "subtopic": "Singly Linked List",
  "specialization": "Random Access Cost",
  "difficulty": "easy",
  "type": "complexity",
  "question": {
    "en": "What is the time complexity to read the k-th element in a Singly Linked List given only the `head` pointer?",
    "ar": "ما التعقيد الزمني للوصول إلى العنصر رقم `k` في قائمة مترابطة أحادية بدءاً من المؤشر `head` فقط؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "O(1) via contiguous byte-offset arithmetic",
        "ar": "O(1) مباشرة عبر العنوان"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "O(log N) via binary midpoint jumps",
        "ar": "O(log N) عبر التنصيف"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(N) because pointers walk linearly node by node",
        "ar": "O(N) لأننا مضطرون للتنقل عبر المؤشرات عقدة تلو الأخرى"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(N log N) sorting nodes by address",
        "ar": "O(N log N)"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "Linked list nodes sit non-contiguously in memory, forcing sequential `next` pointer hops (`O(k) -> O(N)` worst case).",
    "ar": "لعدم تجاور العقد في الذاكرة لا بد من تتبع الروابط المتسلسلة حتى العقدة `k`."
  },
  "tags": [
    "linked-list",
    "complexity",
    "memory"
  ]
} as AssessmentQuestion,
{
  "id": "DS-LL-M-004",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Linked Lists",
  "subtopic": "Singly Linked List",
  "specialization": "Dummy Head Sentinel",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why do seasoned engineers allocate a temporary `dummy` node (`dummy.next = head`) before merging or filtering linked lists?",
    "ar": "لماذا يضع المهندسون عقدة وهمية (`dummy.next = head`) قبل دمج أو تصفية القوائم المترابطة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "To unify head insertions/deletions with middle-node logic",
        "ar": "لتوحيد معالجة العقدة الأولى مع بقية العقد وإزالة الشروط الخاصة عند حذف الرأس"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "To convert singly lists into doubly linked circular buffers immediately",
        "ar": "لتحويلها تلقائياً لقائمة دائرية مزدوجة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "To compress linked-list node memory into stack registers cleanly",
        "ar": "لتصغير حجم العقد داخل المسجلات"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "To enable O(log N) binary indexing directly over list values",
        "ar": "لتمكين البحث الثنائي داخل القائمة"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Every real node now guarantees a non-null `prev` (`dummy` for head), simplifying edge logic and returning `dummy.next`.",
    "ar": "بفضل العقدة الوهمية يصبح لكل عقدة حقيقية سابقة مضمونة، وتعود النتيجة النهائية عبر `dummy.next`."
  },
  "tags": [
    "linked-list",
    "sentinel",
    "clean-code"
  ]
} as AssessmentQuestion,
{
  "id": "DS-LL-H-005",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Linked Lists",
  "subtopic": "Cycle Detection",
  "specialization": "Floyd Cycle",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "What makes Floyd's Slow/Fast pointer cycle detector superior in space complexity to using a HashSet of visited pointers?",
    "ar": "بماذا يتفوق أسلوب المؤشر البطيء والسريع (Floyd's Cycle) مكانياً على حفظ العناوين في `HashSet` لاكتشاف الدورة؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "It detects cycles in O(1) constant steps independent of list size N",
        "ar": "يكتشف الدورة في خطوة واحدة دائماً"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "It achieves O(1) auxiliary space instead of O(N) extra hash table nodes",
        "ar": "يحقق مساحة إضافية `O(1)` فقط بدلاً من استهلاك `O(N)` في جدول تجزئة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "It deletes negative cycle edges simultaneously without reading list values",
        "ar": "يحذف الحواف السالبة تلقائياً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "It caches adjacent 64-byte pointer allocations in RAM",
        "ar": "يحفظ العقد متجاورة في RAM"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Slow and Fast use just two pointer variables (`O(1)` extra RAM), whereas a visited HashSet requires `O(N)` memory.",
    "ar": "يحتاج فقط لمتغيرَي مؤشرين (مساحة ثابتة `O(1)`) مقارنةً بحجز كل العناوين."
  },
  "tags": [
    "floyd-cycle",
    "two-pointers",
    "linked-list"
  ]
} as AssessmentQuestion
];
