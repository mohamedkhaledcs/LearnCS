import { AssessmentQuestion } from '@/lib/assessment/schema';

export const binary_search_trees_questions: AssessmentQuestion[] = [
{
  "id": "DS-TREE-M-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Trees",
  "subtopic": "Binary Search Trees",
  "specialization": "Traversal",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "In a Binary Search Tree (BST), which traversal method visits the Nodes in ascending sorted order?",
    "ar": "في الـ Binary Search Tree (BST)، أي طريقة عبور (traversal) تزور الـ Nodes بترتيب تصاعدي؟"
  },
  "options": [
    {
      "id": "in",
      "text": {
        "en": "In-order Traversal",
        "ar": "In-order Traversal"
      }
    },
    {
      "id": "pre",
      "text": {
        "en": "Pre-order Traversal",
        "ar": "Pre-order Traversal"
      }
    },
    {
      "id": "post",
      "text": {
        "en": "Post-order Traversal",
        "ar": "Post-order Traversal"
      }
    },
    {
      "id": "level",
      "text": {
        "en": "Level-order Traversal",
        "ar": "Level-order Traversal"
      }
    }
  ],
  "correctAnswer": "in",
  "explanation": {
    "en": "In-order traversal visits Left -> Node -> Right. Because BSTs maintain Left < Node < Right at every vertex, In-order visits every node in sorted ascending order.",
    "ar": "يزور العبور الداخلي (In-order) الفرع الأيسر ثم العقدة ثم الأيمن، وبما أن BST تحفظ القاعدة Left < Node < Right فسيظهر الناتج مرتباً تصاعدياً."
  }
} as AssessmentQuestion
];
