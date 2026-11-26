import { AssessmentQuestion } from '@/lib/assessment/schema';

export const traversal_questions: AssessmentQuestion[] = [
{
  "id": "DS-ARRTRAV-E-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Arrays",
  "subtopic": "Traversal",
  "specialization": "Cache Locality",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why is iterating sequentially over an array significantly faster in practice than traversing a linked list of equal length?",
    "ar": "لماذا يعد العبور المتسلسل عبر مصفوفة أسرع عملياً بكثير من عبور قائمة مترابطة بنفس الطول؟"
  },
  "options": [
    {
      "id": "big_o",
      "text": {
        "en": "Array sequential scan runs in O(1) time while linked-list scan takes O(N²)",
        "ar": "عبور المصفوفة يستغرق O(1) نظرياً بينما عبور القائمة المترابطة يستهلك O(N²)"
      }
    },
    {
      "id": "cache",
      "text": {
        "en": "Contiguous elements enable CPU spatial cache locality and prefetching",
        "ar": "تجاور العناصر يرفع كفاءة ذاكرة الكاش والجلب المسبق للبيانات"
      }
    },
    {
      "id": "no_cpu",
      "text": {
        "en": "Arrays bypass CPU caches completely and stream straight from display registers",
        "ar": "تتجاوز المصفوفات وحدة الحساب والمنطق في المعالج ولا تحتاج قراءة العناوين أبداً"
      }
    },
    {
      "id": "ram",
      "text": {
        "en": "Linked lists reside on the hard disk",
        "ar": "تُخزن القوائم على القرص الصلب"
      }
    }
  ],
  "correctAnswer": "cache",
  "explanation": {
    "en": "Both traversals are asymptotically O(N), but sequential array access loads multiple neighboring elements per CPU cache line, avoiding costly random pointer-chasing cache misses.",
    "ar": "كلاهما O(N) نظرياً، لكن المصفوفات تستفيد من تحميل سطر كامل في الكاش دفعة واحدة وتجنب القفز العشوائي في الذاكرة."
  },
  "tags": [
    "arrays",
    "memory",
    "cache"
  ]
} as AssessmentQuestion
];
