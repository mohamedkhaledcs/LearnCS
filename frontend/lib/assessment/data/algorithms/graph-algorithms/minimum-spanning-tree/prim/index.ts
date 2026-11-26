import { AssessmentQuestion } from '@/lib/assessment/schema';

export const prim_questions: AssessmentQuestion[] = [
{
  "id": "AL-PRIM-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Graph Algorithms",
  "subtopic": "Prim MST",
  "specialization": "Tree Expansion",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Unlike Kruskal's edge-sorting strategy, how does Prim's MST algorithm grow its tree?",
    "ar": "بخلاف استراتيجية Kruskal، كيف تنمو شجرة الامتداد الصغرى في خوارزمية Prim؟"
  },
  "options": [
    {
      "id": "del",
      "text": {
        "en": "Iteratively removes the heaviest edges inside cycles until exactly V - 1 edges remain",
        "ar": "تحذف أثقل الحواف داخل الدورات المغلقة تدريجياً حتى يتبقى بالضبط V - 1 حافة فقط"
      }
    },
    {
      "id": "all",
      "text": {
        "en": "Precomputes all-pairs shortest distances first via Floyd-Warshall before trimming leaves",
        "ar": "تحسب جميع أقصر المسارات بين كل زوج من الرؤوس أولاً عبر فلويد-وارشال ثم تحذف الفائض"
      }
    },
    {
      "id": "stack",
      "text": {
        "en": "Uses a LIFO stack without comparing edge weights",
        "ar": "تستخدم Stack دون مقارنة أوزان الحواف"
      }
    },
    {
      "id": "grow",
      "text": {
        "en": "Expands from one vertex via a min-heap choosing the cheapest edge outward",
        "ar": "تبدأ من عقدة وتضم أرخص حافة تخرج لعقدة جديدة باستخدام Min-Heap"
      }
    }
  ],
  "correctAnswer": "grow",
  "explanation": {
    "en": "Prim's maintains a single connected tree growing outward by always pulling the minimum-weight cut edge from a priority queue, reaching O(E log V) with adjacency lists.",
    "ar": "تُنمّي خوارزمية Prim الشجرة من رأس البداية بسحب أرخص حافة متصلة بمجموعة الرؤوس خارج الشجرة من طابور الأولوية (Min-Heap)."
  },
  "tags": [
    "graphs",
    "mst",
    "prim"
  ]
} as AssessmentQuestion
];
