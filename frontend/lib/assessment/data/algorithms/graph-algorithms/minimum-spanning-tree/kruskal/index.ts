import { AssessmentQuestion } from '@/lib/assessment/schema';

export const kruskal_questions: AssessmentQuestion[] = [
{
  "id": "AL-KRUSK-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Graph Algorithms",
  "subtopic": "Kruskal MST",
  "specialization": "Greedy & DSU",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "How does Kruskal's algorithm construct a Minimum Spanning Tree (MST) while avoiding cycles?",
    "ar": "كيف تبني خوارزمية Kruskal شجرة الامتداد الصغرى (MST) مع تجنب تكوين دورات (Cycles)؟"
  },
  "options": [
    {
      "id": "bfs_tree",
      "text": {
        "en": "Runs unweighted Breadth-First Search starting outward from the highest-degree node",
        "ar": "تشغل البحث بالعرض BFS دون اعتبار للأوزان انطلاقاً من العقدة ذات أعلى درجة اتصال"
      }
    },
    {
      "id": "matrix",
      "text": {
        "en": "Inverts the dense adjacency weight matrix iteratively via Floyd-Warshall loops",
        "ar": "تعكس مصفوفة المجاورة الكثيفة عبر خوارزمية Floyd-Warshall قبل استخراج الحواف"
      }
    },
    {
      "id": "sort_dsu",
      "text": {
        "en": "Sorts edges ascending and merges endpoints with DSU when disconnected",
        "ar": "ترتب الحواف تصاعدياً وتدمج أطرافها غير المتصلة عبر DSU"
      }
    },
    {
      "id": "dfs_neg",
      "text": {
        "en": "Selects the heaviest edges first via DFS",
        "ar": "تختار أثقل الحواف أولاً عبر DFS"
      }
    }
  ],
  "correctAnswer": "sort_dsu",
  "explanation": {
    "en": "Kruskal sorts E edges in O(E log E) and checks find(u) != find(v) in near-O(1) via DSU (Union-Find) to greedily add safe minimum edges.",
    "ar": "تفرز Kruskal الحواف من الأخف للأثقل وتتحقق عبر DSU أن الرأسين في مكونين مختلفين قبل إضافة الحافة حتى لا تتكون دورة."
  },
  "tags": [
    "graphs",
    "mst",
    "kruskal",
    "dsu"
  ]
} as AssessmentQuestion,
{
  "id": "AL-GTR-H-005",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Graph Algorithms",
  "subtopic": "MST",
  "specialization": "Kruskal vs Shortest Path",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "True or False: The unique path between two cities inside a graph's **Minimum Spanning Tree** is guaranteed to equal the **Shortest Path** between them in the original graph.",
    "ar": "صواب أم خطأ: المسار بين مدينتين داخل شجرة التغطية الصغرى (MST) يساوي دائماً أقصر مسار بينهما في الرسم الأصلي."
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "True unconditionally whenever all graph edge weights are distinct positive integers",
        "ar": "صواب دائماً بلا شروط ما دامت جميع أوزان حواف الرسم موجبة ومختلفة القيم تماماً"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "False: MST minimizes total tree weight sum, not pairwise shortest path",
        "ar": "خطأ: MST تصغّر مجموع الشبكة الكلي وقد تطيل المسار بين رأسين محددين"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "True strictly across sparse bipartite networks unless Dijkstra skips lazy deletions",
        "ar": "صواب حصرياً في الرسوم ثنائية التقسيم المتصلة ما لم يتعطل حذف كومة ديكسترا"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "True unless Dijkstra skips lazy deletions cleanly",
        "ar": "صواب إلا مع كسل الكومة"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Counterexample: triangle edges `(A-B=5, B-C=5, A-C=9)`: MST omits `A-C=9` for total weight 10, making `A->B->C` cost 10 instead of direct shortest path 9!",
    "ar": "في مثلث بأضلاع 5 و5 و9، تختار MST الضلعين 5+5=10 وتتجاهل 9، رغم أن أقصر مسار بين طرفي الضلع الثالث هو 9 مباشرة."
  },
  "tags": [
    "mst",
    "dijkstra",
    "graphs"
  ]
} as AssessmentQuestion
];
