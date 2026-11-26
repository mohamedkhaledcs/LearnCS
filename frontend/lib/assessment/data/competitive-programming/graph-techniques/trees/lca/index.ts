import { AssessmentQuestion } from '@/lib/assessment/schema';

export const lca_questions: AssessmentQuestion[] = [
{
  "id": "CP-LCA-H-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Graph Techniques",
  "subtopic": "Lowest Common Ancestor (LCA)",
  "specialization": "Binary Lifting",
  "difficulty": "hard",
  "type": "complexity",
  "question": {
    "en": "With Binary Lifting (up[v][k] = 2^k-th ancestor of v), what are the preprocessing and per-query complexities for LCA in a tree of N nodes?",
    "ar": "باستخدام القفز الثنائي (Binary Lifting) في شجرة من N عقدة، ما هو تعقيد التحضير وزمن كل استعلام LCA؟"
  },
  "options": [
    {
      "id": "bl",
      "text": {
        "en": "O(N log N) build/space, O(log N) per LCA query",
        "ar": "تحضير ومساحة O(N log N)، وكل استعلام في O(log N)"
      }
    },
    {
      "id": "on2",
      "text": {
        "en": "O(N²) all-pairs preprocessing memory table with O(N) upward per-query scan",
        "ar": "تحضير بمساحة O(N²) وجدول كامل مع زمن O(N) عند كل استعلام عن الجد المشترك"
      }
    },
    {
      "id": "o1n",
      "text": {
        "en": "O(N) build, O(N) query",
        "ar": "بناء خطي O(N) للمصفوفة مقابل صعود خطي O(N) للإجابة عن كل استعلام شجري"
      }
    },
    {
      "id": "olog",
      "text": {
        "en": "O(log N) preprocessing array allowing O(1) arbitrary dynamic distance updates",
        "ar": "تحضير O(log N)"
      }
    }
  ],
  "correctAnswer": "bl",
  "explanation": {
    "en": "Each node stores log₂(N) jump pointers (up[v][k] = up[up[v][k-1]][k-1]), allowing jumping nodes to equal depth and lifting to just below their LCA in O(log N).",
    "ar": "يخزن كل رأس جدولاً من log₂(N) أسلاف بقوى العدد 2، مما يمكّن من مساواة العمق والقفز للوصول للـ LCA في O(log N) خطوة."
  },
  "tags": [
    "cp",
    "trees",
    "lca"
  ]
} as AssessmentQuestion
];
