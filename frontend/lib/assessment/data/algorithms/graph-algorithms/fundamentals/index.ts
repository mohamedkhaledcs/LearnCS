import { AssessmentQuestion } from '@/lib/assessment/schema';

export const fundamentals_questions: AssessmentQuestion[] = [
{
  "id": "AL-GRAPH-E-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Graph Algorithms",
  "subtopic": "Fundamentals",
  "specialization": "Degrees & Edges",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "According to the Handshaking Lemma, for any undirected graph with E edges, what is the sum of degrees of all vertices?",
    "ar": "وفقاً لمبرهنة المصافحة، لأي رسم بياني غير موجه يحتوي على E حافة، كم يساوي مجموع درجات جميع الرؤوس؟"
  },
  "options": [
    {
      "id": "2e",
      "text": {
        "en": "2 · E",
        "ar": "2 · E"
      }
    },
    {
      "id": "e",
      "text": {
        "en": "E",
        "ar": "E"
      }
    },
    {
      "id": "e2",
      "text": {
        "en": "E²",
        "ar": "E²"
      }
    },
    {
      "id": "v",
      "text": {
        "en": "V - 1",
        "ar": "V - 1"
      }
    }
  ],
  "correctAnswer": "2e",
  "explanation": {
    "en": "Every undirected edge has two endpoints, so adding each edge contributes +1 to the degree of both incident vertices, totaling 2E.",
    "ar": "كل حافة غير موجهة تصل بين رأسين، لذا فإنها تضيف 1 لدرجة كل طرف، وبالتالي المجموع الكلي للدرجات يساوي 2E."
  },
  "tags": [
    "graphs",
    "discrete-math"
  ]
} as AssessmentQuestion,
{
  "id": "DS-GRP-M-004",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Graphs",
  "subtopic": "Weighted Graphs",
  "specialization": "List Storage",
  "difficulty": "medium",
  "type": "code-trace",
  "codeSnippet": "vector<vector<pair<int, int>>> adj(n); // {neighbor, weight}\nadj[u].push_back({v, w});",
  "codeLanguage": "cpp",
  "question": {
    "en": "What exact space complexity does this Weighted Adjacency List consume for `V` nodes and `E` directed edges?",
    "ar": "ما التعقيد المكاني الذي تستهلكه قائمة الجوار الموزونة أعلاه لعدد `V` رأس و`E` حافة موجّهة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "O(V + E)",
        "ar": "O(V + E)"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "O(V^2)",
        "ar": "O(V^2)"
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
        "en": "O(E log V)",
        "ar": "O(E log V)"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Allocating `V` vector headers plus 1 pair per directed edge uses strictly `O(V + E)` memory cleanly.",
    "ar": "نحجز `V` قائمة جوار مضافاً إليها زوج واحد لكل حافة، أي `O(V + E)` فقط."
  },
  "tags": [
    "adjacency-list",
    "weighted-graph",
    "space"
  ]
} as AssessmentQuestion,
{
  "id": "DS-GRP-H-005",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Graphs",
  "subtopic": "Handshaking Lemma",
  "specialization": "Degree Sum",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "Summing the vertex degrees across ALL nodes in ANY undirected graph having `E` edges ALWAYS equals what number?",
    "ar": "مجموع درجات جميع الرؤوس في أي رسم بياني غير موجّه يحوي `E` حافة يساوي دائماً:"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "E",
        "ar": "E"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "2 * E",
        "ar": "2 * E"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "E - 1",
        "ar": "E - 1"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "V * (V - 1)",
        "ar": "V * (V - 1)"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Each edge contributes +1 degree to both of its two endpoint vertices -> total degree sum equals `2 * E` cleanly.",
    "ar": "كل حافة تزيد درجة رأسيها الاثنين بمقدار 1 لكل منهما، لذا المجموع دائماً ضعف عدد الحواف (`2E`)."
  },
  "tags": [
    "graph-theory",
    "handshaking-lemma",
    "degrees"
  ]
} as AssessmentQuestion,
{
  "id": "DS-GRP-E-006",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Graphs",
  "subtopic": "Components",
  "specialization": "Component Count",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How can we count the number of disconnected Islands / Connected Components inside an undirected graph in `O(V + E)`?",
    "ar": "كيف نحسب عدد الجزر أو المكونات المتصلة (Connected Components) في رسم غير موجّه بزمن `O(V + E)`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Divide total adjacency matrix row entries strictly by undirected graph edge counts",
        "ar": "قسمة مجموع صفوف مصفوفة المجاورة مباشرة على عدد الحواف لإيجاد المكونات المنفصلة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Sort weighted edges descending and walk adjacent components using Two Pointers",
        "ar": "تشغيل خوارزمية Floyd-Warshall الشاملة بين جميع الأزواج بزمن خطي O(V)"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Loop `0..V-1`, launching BFS/DFS on each unvisited node and counting starts",
        "ar": "المرور على الرؤوس وبدء BFS/DFS من كل غير مزور مع عدّ الانطلاقات"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Run Floyd-Warshall all-pairs matrix relaxation in O(V)",
        "ar": "تشغيل فلويد-وارشال في O(V)"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Each fresh DFS/BFS paints one entire connected component visited in linear time, counting components cleanly in `O(V + E)`.",
    "ar": "كل جولة BFS/DFS تكتشف مكوّناً متصلاً كاملاً وتعتمده مزوراً، فعدد الانطلاقات يساوي عدد المكونات."
  },
  "tags": [
    "connected-components",
    "bfs",
    "dfs"
  ]
} as AssessmentQuestion,
{
  "id": "AL-GTR-E-002",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Graph Algorithms",
  "subtopic": "BFS",
  "specialization": "Shortest Hop Guarantee",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why does **Breadth-First Search (BFS)** guarantee finding shortest paths (minimum edges) when ALL edges share equal cost `1`?",
    "ar": "لماذا يضمن **البحث بالعرض أولاً (BFS)** إيجاد أقصر مسار (أقل عدد حواف) عندما تكون الأوزان متساوية (غير موزونة)؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "FIFO stacks pop heaviest priority path edges immediately ignoring hop depth counts",
        "ar": "لأن المكدس يخرج أثقل الحواف أولاً ويرتب قوائم الجيران تصاعدياً قبل الانطلاق العودي"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "BFS sorts neighbor lists ascending lexicographically before running recursive traversal",
        "ar": "لأن جميع الرسوم البيانية غير الموزونة خالية تماماً من الدورات والمسارات المتقاطعة"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "FIFO explores all distance-d vertices before queuing distance-(d+1) nodes",
        "ar": "الرتل FIFO يزور كل عقد البُعد d قبل إدخال أي عقدة على البُعد d+1"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Because unweighted graphs never contain cycles cleanly",
        "ar": "لأن الرسوم غير الموزونة خالية من الدورات"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Wavefront expansion strictly by hop layer guarantees the first discovery of any target arrives along minimum edges.",
    "ar": "التوسع الموجي طبقة تلو الأخرى يعني أن أول وصول لأي عقدة هو حتماً عبر أقل عدد خطوات."
  },
  "tags": [
    "bfs",
    "shortest-path",
    "graphs"
  ]
} as AssessmentQuestion,
{
  "id": "AL-GTR-E-006",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Graph Algorithms",
  "subtopic": "Multi-Source BFS",
  "specialization": "Simultaneous Grid Waves",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "To find the distance from EVERY grid cell to the NEAREST exit among 50 fire exits simultaneously, how can BFS solve it in one `O(R * C)` pass?",
    "ar": "لحساب مسافة كل خلية في شبكة إلى **أقرب** مخرج من بين 50 مخرجاً في وقت واحد، كيف يحلها BFS بجولة واحدة بزمن `O(R * C)`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Run 50 separate DFS scans and pick minimum array per cell",
        "ar": "تشغيل 50 جولة DFS منفصلة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Multiply Dijkstra distances across all boundary walls",
        "ar": "تشغيل ديكسترا لكل جدار"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Push ALL 50 exits simultaneously into the initial Queue with `dist = 0`",
        "ar": "إدخال جميع المخارج الـ 50 معاً إلى الرتل Queue في البداية بمسافة `0`"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Sort grid coordinates descending first",
        "ar": "فرز الإحداثيات تنازلياً"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Seeding all 50 sources at `dist = 0` expands synchronized wave layers cleanly in single `O(V + E)` linear work.",
    "ar": "إدراج كل نقاط البداية في الطابور عند المستوى صفر ينشر الموجة الأقرب لكل خلية دفعة واحدة."
  },
  "tags": [
    "multi-source-bfs",
    "bfs",
    "grids"
  ]
} as AssessmentQuestion
];
