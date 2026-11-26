import { AssessmentQuestion } from '@/lib/assessment/schema';

export const floyd_warshall_questions: AssessmentQuestion[] = [
{
  "id": "AL-FW-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Graph Algorithms",
  "subtopic": "Floyd-Warshall",
  "specialization": "All-Pairs Shortest Path",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What does Floyd-Warshall compute, and what is its standard time complexity for V vertices?",
    "ar": "ما الذي تحسبه خوارزمية Floyd-Warshall وما هو تعقيدها الزمني القياسي لعدد V من الرؤوس؟"
  },
  "options": [
    {
      "id": "sssp",
      "text": {
        "en": "Single-source shortest paths in O(V log V)",
        "ar": "أقصر مسار من مصدر واحد في O(V log V)"
      }
    },
    {
      "id": "apsp",
      "text": {
        "en": "All-pairs shortest paths in O(V³) time",
        "ar": "أقصر مسار بين كل زوج من الرؤوس (All-Pairs) بزمن O(V³)"
      }
    },
    {
      "id": "topo",
      "text": {
        "en": "Topological ordering in O(V + E)",
        "ar": "الترتيب الطوبولوجي في O(V + E)"
      }
    },
    {
      "id": "maxflow",
      "text": {
        "en": "Maximum bipartite matching in O(VE)",
        "ar": "أقصى مطابقة في O(VE)"
      }
    }
  ],
  "correctAnswer": "apsp",
  "explanation": {
    "en": "Floyd-Warshall uses 3 nested loops (intermediate vertex k, source i, target j) to compute shortest distances between every pair (i, j) in O(V³) time.",
    "ar": "تستخدم 3 حلقات متداخلة لاختبار كل رأس كوسيط k بين كل زوج (i, j)، مما يحل مسألة All-Pairs Shortest Path في زمن O(V³)."
  },
  "tags": [
    "graphs",
    "floyd-warshall",
    "shortest-path"
  ]
} as AssessmentQuestion
];
