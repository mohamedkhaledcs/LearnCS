import { AssessmentQuestion } from '@/lib/assessment/schema';

export const tree_traversals_questions: AssessmentQuestion[] = [
{
  "id": "DS-TTR-E-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Trees",
  "subtopic": "Tree Traversals",
  "specialization": "DFS vs Level Order",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which tree traversal order is most useful for deleting or freeing a tree from leaves upward to the root?",
    "ar": "أي ترتيب عبور (Tree Traversal) هو الأنسب لحذف عقد الشجرة وتفريغ ذاكرتها من الأوراق صعوداً للجذر؟"
  },
  "options": [
    {
      "id": "pre",
      "text": {
        "en": "Pre-order (Node -> Left -> Right)",
        "ar": "القبلي Pre-order"
      }
    },
    {
      "id": "in",
      "text": {
        "en": "In-order (Left -> Node -> Right)",
        "ar": "الداخلي In-order"
      }
    },
    {
      "id": "level",
      "text": {
        "en": "Top-down Level-order",
        "ar": "حسب المستويات من الأعلى"
      }
    },
    {
      "id": "post",
      "text": {
        "en": "Post-order",
        "ar": "العبور البعدي Post-order"
      }
    }
  ],
  "correctAnswer": "post",
  "explanation": {
    "en": "Post-order processes both children completely before acting on the parent node, avoiding dangling pointers while deleting subtrees.",
    "ar": "يزور Post-order الأبناء أولاً ثم يحذف العقدة الأب، مما يمنع فقدان المؤشرات أثناء الحذف."
  },
  "tags": [
    "trees",
    "traversals"
  ]
} as AssessmentQuestion,
{
  "id": "DS-TRE-M-003",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Trees",
  "subtopic": "Tree Traversals",
  "specialization": "DFS Traversals",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which traversal order computes subtree sizes or frees child nodes cleanly BEFORE deleting/processing their parent?",
    "ar": "أي ترتيب مرور شجري يعالج/يحسب الأبناء أولاً قبل التعامل مع العقدة الأب؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Preorder (Node, Left, Right)",
        "ar": "Preorder (الأب ثم اليسار ثم اليمين)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Reverse BFS from bottom leaves only",
        "ar": "عكس BFS من الأوراق فقط"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Postorder (Left, Right, Node)",
        "ar": "Postorder"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Random Adjacency Sweep",
        "ar": "مسح عشوائي للحواف"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Postorder finishes both Left and Right subtrees before returning up to combine or release the parent node.",
    "ar": "يمر Postorder على كامل الفروع السفلية أولاً، لذا يُستخدم في جمع أحجام الفروع وحذف العقد بأمان."
  },
  "tags": [
    "postorder",
    "tree-traversal",
    "dfs"
  ]
} as AssessmentQuestion
];
