import { AssessmentQuestion } from '@/lib/assessment/schema';

export const circular_linked_list_questions: AssessmentQuestion[] = [
{
  "id": "DS-CLL-E-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Linked Lists",
  "subtopic": "Circular Linked List",
  "specialization": "Tail Loopback",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How does the last node of a Circular Singly Linked List differ from a standard Singly Linked List?",
    "ar": "بم تختلف العقدة الأخيرة في Circular Singly Linked List عن القائمة المفردة العادية؟"
  },
  "options": [
    {
      "id": "val",
      "text": {
        "en": "Its stored integer payload must always remain pinned cleanly to zero",
        "ar": "يجب أن تحمل العقدة الأخيرة القيمة الصفرية 0 دائماً لتمييز نهاية الحلقة الدائرية"
      }
    },
    {
      "id": "arr",
      "text": {
        "en": "Every circular tail node stays allocated statically inside the main stack frame",
        "ar": "تُخزن في المكدس دائماً"
      }
    },
    {
      "id": "head",
      "text": {
        "en": "Last node's next points back to head instead of NULL",
        "ar": "مؤشر next في آخر عقدة يعود إلى head بدلاً من NULL"
      }
    },
    {
      "id": "two",
      "text": {
        "en": "It has three next pointers",
        "ar": "تمتلك العقدة الأخيرة ثلاثة مؤشرات next متتالية تربطها بمنتصف القائمة ورأسها"
      }
    }
  ],
  "correctAnswer": "head",
  "explanation": {
    "en": "Pointing tail->next = head forms a continuous ring, suitable for round-robin CPU scheduling queues and cyclic buffers.",
    "ar": "تشير العقدة الأخيرة إلى الرأس فتتشكل حلقة متصلة مفيدة في جدولة Round-Robin."
  },
  "tags": [
    "linked-lists"
  ]
} as AssessmentQuestion,
{
  "id": "DS-LL-E-006",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Linked Lists",
  "subtopic": "Circular Linked List",
  "specialization": "Termination Check",
  "difficulty": "easy",
  "type": "debugging",
  "question": {
    "en": "When traversing a non-empty Circular Linked List starting from `head`, which loop stop condition prevents spinning forever?",
    "ar": "عند المرور على قائمة مترابطة دائرية غير فارغة بدءاً من `head`، أي شرط توقف يمنع الدوران اللانهائي؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Run plain `while (curr != nullptr)` until null termination stops traversal",
        "ar": "الاستمرار في حلقة `while (curr != nullptr)` حتى ينتهي المؤشر عند القيمة الفارغة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Break immediately once `curr->next` numerically equals array index position zero",
        "ar": "التوقف بمجرد أن يصبح الحقل `curr->val` سالباً أو يطابق مؤشر العقدة index 0"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Advance once first (`do ... while (curr != head)`), stopping back at `head`",
        "ar": "التحرك أولاً ثم التوقف فور العودة إلى `head` (`do ... while`)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Stopping whenever `curr->next` matches index 0",
        "ar": "التوقف عند الفهرس 0"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Because the tail links back cleanly to `head`, no `null` exists; stopping upon revisiting `head` completes exactly one pass.",
    "ar": "لأن النهاية تعود لـ `head` ولا يوجد `null`، نتوقف بمجرد رجوع المؤشر إلى `head` بعد خطوة البداية."
  },
  "tags": [
    "circular-linked-list",
    "traversal",
    "edge-case"
  ]
} as AssessmentQuestion
];
