import { AssessmentQuestion } from '@/lib/assessment/schema';

export const bfs_questions: AssessmentQuestion[] = [
{
  "id": "AL-BFS-E-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Graph Algorithms",
  "subtopic": "BFS",
  "specialization": "Shortest Path Unweighted",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which data structure drives Breadth-First Search (BFS), and why is it ideal for unweighted shortest paths?",
    "ar": "ما هي بنية البيانات التي يعتمد عليها البحث بالعرض أولاً (BFS)، ولماذا يناسب أقصر مسار غير موزون؟"
  },
  "options": [
    {
      "id": "s",
      "text": {
        "en": "Stack (LIFO): dives as deep as possible before backtracking",
        "ar": "مكدس (Stack - LIFO): يغوص لأعمق مسار أولاً"
      }
    },
    {
      "id": "q",
      "text": {
        "en": "Queue (FIFO): explores vertices layer-by-layer by increasing edge distance",
        "ar": "طابور (Queue - FIFO)"
      }
    },
    {
      "id": "bst",
      "text": {
        "en": "Binary Search Tree: sorts vertices alphabetically",
        "ar": "شجرة بحث ثنائية لفرز العقد أبجدياً"
      }
    },
    {
      "id": "pq",
      "text": {
        "en": "Monotonic Stack only",
        "ar": "مكدس رتيب فقط"
      }
    }
  ],
  "correctAnswer": "q",
  "explanation": {
    "en": "FIFO ordering visits all vertices at distance d before any vertex at distance d + 1, guaranteeing the first time a node is discovered is via a shortest path in unweighted graphs.",
    "ar": "يضمن الطابور FIFO زيارة جميع الرؤوس ذات المسافة d قبل الرؤوس ذات المسافة d+1، لذا فإن أول زيارة لأي عقدة تكون عبر أقصر مسار."
  },
  "tags": [
    "graphs",
    "bfs",
    "queue"
  ]
} as AssessmentQuestion
];
