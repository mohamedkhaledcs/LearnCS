import { AssessmentQuestion } from '@/lib/assessment/schema';

export const avl_questions: AssessmentQuestion[] = [
{
  "id": "DS-AVL-M-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Trees",
  "subtopic": "AVL Trees",
  "specialization": "Rotations & Balance Factor",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What balance invariant does an AVL Tree enforce at every node to guarantee O(log N) worst-case height?",
    "ar": "ما شرط التوازن الذي تفرضه شجرة AVL عند كل عقدة لضمان ارتفاع O(log N) دائماً؟"
  },
  "options": [
    {
      "id": "exact",
      "text": {
        "en": "Every node subtree must contain strictly identical element counts on left and right",
        "ar": "يجب أن يتطابق عدد العقد الكلي في الفرع الأيمن والفرع الأيسر عند كل عقدة تماماً"
      }
    },
    {
      "id": "bf",
      "text": {
        "en": "|height(L) - height(R)| <= 1 maintained via LL/RR/LR/RL rotations",
        "ar": "بقاء |height(L) - height(R)| <= 1 باستخدام الدورانات الأربعة"
      }
    },
    {
      "id": "black",
      "text": {
        "en": "Coloring nodes in cycles",
        "ar": "تلوين الدورات"
      }
    },
    {
      "id": "heap",
      "text": {
        "en": "Every parent node value must strictly exceed both child keys without tree height rules",
        "ar": "يشترط أن تتفوق قيمة كل عقدة أب على أبنائها دون قيود على ارتفاع الأفرع"
      }
    }
  ],
  "correctAnswer": "bf",
  "explanation": {
    "en": "Keeping balance factor in {-1, 0, +1} ensures AVL height never exceeds ~1.44 log₂(N), eliminating skewed O(N) BST degradation.",
    "ar": "إبقاء عامل التوازن بين -1 و +1 يضمن ألا تنحرف الشجرة كقائمة خطية، فتبقى كل العمليات في O(log N)."
  },
  "tags": [
    "trees",
    "avl",
    "bst"
  ]
} as AssessmentQuestion,
{
  "id": "DS-TRE-E-006",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Trees",
  "subtopic": "Balanced Trees",
  "specialization": "Why Balance Matters",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why do production BST containers like `std::set` and `TreeMap` apply Red-Black or AVL rotations after inserts?",
    "ar": "لماذا تجري أشجار البحث المتقدمة مثل Red-Black وAVL دورانات توازن (Rotations) بعد الإدراج؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Provide O(1) arbitrary array-like random indexing directly without root walking",
        "ar": "لتمكين الوصول العشوائي المباشر لأي عنصر في زمن O(1) دون التتبع من عقدة الجذر"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Guarantee O(log N) height even under already-sorted insertion streams",
        "ar": "لضمان بقاء الارتفاع `O(log N)` ومنع تدهور الشجرة إلى `O(N)` مع المدخلات المرتبة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Automatically delete identical key insertions silently without comparing elements",
        "ar": "لحذف القيم المكررة تلقائياً ودمج الأوراق الشجرية في رتل دائري منظم باستمرار"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "To convert BST leaves permanently into FIFO Circular Queues",
        "ar": "لتحويل الأوراق إلى رتل دائري"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Rebalancing rotations prevent sorted inputs from building an unbalanced linear chain of height N.",
    "ar": "الموازنة التلقائية تبقي أطول فرع متناسباً مع `log N` مهما كان ترتيب المدخلات."
  },
  "tags": [
    "avl",
    "red-black",
    "bst"
  ]
} as AssessmentQuestion
];
