import { AssessmentQuestion } from '@/lib/assessment/schema';

export const dijkstra_questions: AssessmentQuestion[] = [
{
  "id": "AL-GRAPH-H-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Graph Algorithms",
  "subtopic": "Shortest Path",
  "specialization": "Dijkstra",
  "difficulty": "hard",
  "type": "scenario",
  "question": {
    "en": "When using Dijkstra's Algorithm to find the shortest path in a Graph, which of the following graph properties will cause the algorithm to fail?",
    "ar": "عند استخدام Algorithm دايكسترا (Dijkstra) لإيجاد أقصر مسار في Graph، أي من الخصائص التالية ستتسبب في فشل الـ Algorithm؟"
  },
  "options": [
    {
      "id": "directed",
      "text": {
        "en": "The Graph is directed.",
        "ar": "الـ Graph موجه (directed)."
      }
    },
    {
      "id": "cycles",
      "text": {
        "en": "The Graph contains cycles.",
        "ar": "الـ Graph يحتوي على دورات (cycles)."
      }
    },
    {
      "id": "disconnected",
      "text": {
        "en": "The Graph is not fully connected.",
        "ar": "الـ Graph غير متصل بالكامل."
      }
    },
    {
      "id": "negative_edges",
      "text": {
        "en": "The Graph contains negative weight edges.",
        "ar": "الـ Graph يحتوي على مسارات بوزن سالب (negative weight edges)."
      }
    }
  ],
  "correctAnswer": "negative_edges",
  "explanation": {
    "en": "Dijkstra greedily finalizes the closest unvisited vertex assuming path weights never decrease later; negative-weight edges break that invariant, requiring Bellman-Ford instead.",
    "ar": "تعتمد Dijkstra على أن إضافة حافة لا تقلل المسافة؛ وجود أوزان سالبة يكسر هذا الافتراض، لذا نستخدم Bellman-Ford عند وجود أوزان سالبة."
  }
} as AssessmentQuestion,
{
  "id": "AL-GTR-M-003",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Graph Algorithms",
  "subtopic": "Shortest Paths",
  "specialization": "Algorithm Selection",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "A road map contains positive AND negative edge weights (e.g. tolls and energy recovery) and may even hold negative-sum cycles. Which single-source algorithm handles it cleanly?",
    "ar": "خريطة طرق تحوي أوزاناً موجبة وأخرى سالبة وقد توجد فيها دورة مجموعها سالب. أي خوارزمية تعالجها وتكشف الدورة السالبة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Standard Dijkstra with Min-Heap",
        "ar": "ديكسترا بكومة الأولوية"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Standard unweighted BFS",
        "ar": "BFS العادي"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Prim's Minimum Spanning Tree",
        "ar": "خوارزمية بريم للشجرة الصغرى"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Bellman-Ford",
        "ar": "بيلمان-فورد (Bellman-Ford)"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "Bellman-Ford runs in `O(V * E)` allowing negative weights and detects negative cycles cleanly if any edge still relaxes on iteration `V`.",
    "ar": "تُجري بيلمان-فورد استرخاءً لكل الحواف `V-1` مرة مما يعالج الأوزان السالبة ويكشف أي تحسن مستمر بالدورة `V`."
  },
  "tags": [
    "bellman-ford",
    "negative-cycle",
    "shortest-path"
  ]
} as AssessmentQuestion,
{
  "id": "AL-GTR-M-004",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Graph Algorithms",
  "subtopic": "Dijkstra",
  "specialization": "Sparse Complexity",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "Using an Adjacency List + Binary Min-Heap (`priority_queue`), what is Dijkstra's time complexity on `V` vertices and `E` non-negative edges?",
    "ar": "باستخدام قائمة الجوار وكومة الأولوية Min-Heap، ما التعقيد الزمني لخوارزمية ديكسترا على رسم بـ `V` عقدة و`E` حافة؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "O((V + E) log V)",
        "ar": "O((V + E) log V)"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "O(V + E)",
        "ar": "O(V + E)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "O(V * E)",
        "ar": "O(V * E)"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "O(V^3)",
        "ar": "O(V^3)"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Up to `E` heap pushes/pops each cost `O(log V)`, giving crisp `O((V + E) log V)` speed on large sparse road graphs.",
    "ar": "كل إدراج أو سحب في الكومة يكلف `log V` ليكون الإجمالي `O((V + E) log V)`."
  },
  "tags": [
    "dijkstra",
    "complexity",
    "graphs"
  ]
} as AssessmentQuestion
];
