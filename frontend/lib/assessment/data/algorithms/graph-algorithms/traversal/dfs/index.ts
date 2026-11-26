import { AssessmentQuestion } from '@/lib/assessment/schema';

export const dfs_questions: AssessmentQuestion[] = [
{
  "id": "AL-DFS-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Graph Algorithms",
  "subtopic": "DFS",
  "specialization": "Applications",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "During Depth-First Search (DFS) on a directed graph, how is a cycle detected?",
    "ar": "أثناء البحث بالعمق أولاً (DFS) على رسم بياني موجه، كيف يتم اكتشاف وجود دورة (Cycle)؟"
  },
  "options": [
    {
      "id": "cross",
      "text": {
        "en": "Visiting any previously untouched white vertex adjacent to the root node",
        "ar": "الانتقال عبر حافة طبيعية نحو عقدة بيضاء لم يسبق زيارتها من أي مسار آخر"
      }
    },
    {
      "id": "deg0",
      "text": {
        "en": "Reaching an isolated sink vertex whose directed outgoing degree equals zero",
        "ar": "الوصول إلى عقدة نهاية صماء لا تخرج منها أي حواف موجهة نحو بقية العقد"
      }
    },
    {
      "id": "back",
      "text": {
        "en": "Finding a back-edge to a vertex currently active on the recursion stack",
        "ar": "رصد حافة عائدة إلى رأس ما زال نشطاً على مكدس الاستدعاء"
      }
    },
    {
      "id": "fifo",
      "text": {
        "en": "When the BFS queue becomes empty",
        "ar": "عندما يفرغ طابور BFS"
      }
    }
  ],
  "correctAnswer": "back",
  "explanation": {
    "en": "Using 3 colors (Unvisited/Visiting/Visited), an edge from a Visiting node to another node currently in the Visiting state proves a directed cycle exists.",
    "ar": "باستخدام التلوين الثلاثي (غير مزار / قيد الزيارة / مكتمل)، يشير وجود سهم من عقدة حالية إلى عقدة قيد الزيارة في نفس المسار إلى وجود دورة موجهة."
  },
  "tags": [
    "graphs",
    "dfs",
    "cycle-detection"
  ]
} as AssessmentQuestion
];
