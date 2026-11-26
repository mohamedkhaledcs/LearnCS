import { AssessmentQuestion } from '@/lib/assessment/schema';

export const chaining_questions: AssessmentQuestion[] = [
{
  "id": "DS-HASH-H-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Hash Tables",
  "subtopic": "Collision Handling",
  "specialization": "Collision Resolution",
  "difficulty": "hard",
  "type": "scenario",
  "question": {
    "en": "When implementing a Hash Table, two keys hash to the same index. If we resolve this by storing a Linked List at that index, what is this technique called?",
    "ar": "عند برمجة Hash Table، حصل مفتاحان (keys) على نفس الـ index. إذا قمنا بحل ذلك عن طريق تخزين Linked List في هذا الـ index، ماذا تسمى هذه التقنية؟"
  },
  "options": [
    {
      "id": "linear_probing",
      "text": {
        "en": "Linear Probing",
        "ar": "Linear Probing"
      }
    },
    {
      "id": "chaining",
      "text": {
        "en": "Separate Chaining",
        "ar": "Separate Chaining"
      }
    },
    {
      "id": "double_hashing",
      "text": {
        "en": "Double Hashing",
        "ar": "Double Hashing"
      }
    },
    {
      "id": "quadratic_probing",
      "text": {
        "en": "Quadratic Probing",
        "ar": "Quadratic Probing"
      }
    }
  ],
  "correctAnswer": "chaining",
  "explanation": {
    "en": "Separate Chaining resolves bucket collisions by placing colliding entries into a secondary collection (typically a linked list or small dynamic bucket) at each array slot.",
    "ar": "تحل تقنية Separate Chaining تصادمات التجزئة بتخزين قائمة مترابطة من العناصر المتصادمة داخل نفس الخانة (bucket)."
  }
} as AssessmentQuestion,
{
  "id": "DS-HSH-M-003",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Hash Tables",
  "subtopic": "Collisions",
  "specialization": "Separate Chaining vs Probing",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Compare **Separate Chaining** vs **Open Addressing (Linear Probing)**: what happens when two keys collide on bucket `idx`?",
    "ar": "ما الفرق بين أسلوب **السلاسل المنفصلة Separate Chaining** و**العنونة المفتوحة Open Addressing** عند تصادم مفتاحين في الخانة `idx`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Chaining overwrites older stored items silently while Open Addressing drops new inserts",
        "ar": "تحذف السلاسل العنصر الأقدم بصمت بينما ترفض العنونة المفتوحة إدخال أي عنصر متصادم"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Chaining appends to a bucket list; Open Addressing probes for another empty slot",
        "ar": "السلاسل تضيف لقائمة بالدلو؛ والعنونة المفتوحة تبحث عن خانة فارغة تالية"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Open Addressing handles unlimited excess load past 100% without ever needing resizing",
        "ar": "تتسع العنونة المفتوحة لعناصر تفوق حجم المصفوفة بكثير دون الحاجة لأي إعادة تحجيم"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Separate Chaining converts buckets dynamically into sorted B+ disk files",
        "ar": "السلاسل تخزن الملفات على القرص"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Open Addressing packs values inside one flat array (great cache locality, must keep load < 1), whereas chaining chains overflow items per slot.",
    "ar": "السلاسل المنفصلة تتحمل معامل امتلاء أكبر، بينما العنونة المفتوحة توفر تجاوراً أفضل في Cache مع اشتراط بقاء المعامل أقل من 1."
  },
  "tags": [
    "hashing",
    "chaining",
    "probing"
  ]
} as AssessmentQuestion
];
