import { AssessmentQuestion } from '@/lib/assessment/schema';

export const tree_dp_questions: AssessmentQuestion[] = [
{
  "id": "AL-DPTREE-H-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Dynamic Programming",
  "subtopic": "Tree DP",
  "specialization": "DFS Bottom-Up",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "In Tree Dynamic Programming (e.g., Maximum Independent Set on a Tree), in which order are node DP states computed?",
    "ar": "في البرمجة الديناميكية على الأشجار (Tree DP)، بأي ترتيب تُحسب قيم الحالات للعقد؟"
  },
  "options": [
    {
      "id": "bfs",
      "text": {
        "en": "Top-down breadth-first traversal ending early before reaching tree leaf vertices",
        "ar": "المرور بالعرض من الأعلى للأسفل مع التوقف قبل احتساب أوراق الشجرة الطرفية"
      }
    },
    {
      "id": "sorted",
      "text": {
        "en": "Evaluating node states purely in alphabetical order of vertex string labels",
        "ar": "تقييم الحالات الديناميكية بترتيب أسماء العقد أبجدياً دون مراعاة علاقة الأب والابن"
      }
    },
    {
      "id": "random",
      "text": {
        "en": "Random permutation of tree edges",
        "ar": "ترتيب عشوائي لحواف الشجرة"
      }
    },
    {
      "id": "postorder",
      "text": {
        "en": "Bottom-up post-order DFS: finish children before computing parent",
        "ar": "من الأسفل للأعلى بـ Post-order DFS: الأبناء قبل حساب الأب"
      }
    }
  ],
  "correctAnswer": "postorder",
  "explanation": {
    "en": "Because a rooted tree is a DAG directed down from parent to children, post-order DFS ensures every child subtree state is finalized before combining into the parent.",
    "ar": "لأن الشجرة هيكل هرمي، يضمن العبور البعدي (Post-order DFS) اكتمال حساب جميع الأشجار الفرعية للأبناء قبل دمجه في العقدة الأب."
  },
  "tags": [
    "dp",
    "trees",
    "dfs"
  ]
} as AssessmentQuestion
];
