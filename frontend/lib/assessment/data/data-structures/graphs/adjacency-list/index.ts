import { AssessmentQuestion } from '@/lib/assessment/schema';

export const adjacency_list_questions: AssessmentQuestion[] = [
{
  "id": "DS-ADJL-E-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Graphs",
  "subtopic": "Adjacency List",
  "specialization": "Space Complexity",
  "difficulty": "easy",
  "type": "complexity",
  "question": {
    "en": "For a sparse graph with V = 10⁵ vertices and E = 2·10⁵ edges, what is the memory complexity of an Adjacency List?",
    "ar": "لرسم بياني متناثر فيه V = 10⁵ رؤوس و E = 2·10⁵ حواف، ما تعقيد المساحة لتمثيل Adjacency List؟"
  },
  "options": [
    {
      "id": "v2",
      "text": {
        "en": "O(V²)",
        "ar": "O(V²)"
      }
    },
    {
      "id": "ve_mul",
      "text": {
        "en": "O(V · E)",
        "ar": "O(V · E)"
      }
    },
    {
      "id": "e2",
      "text": {
        "en": "O(E²)",
        "ar": "O(E²)"
      }
    },
    {
      "id": "ve",
      "text": {
        "en": "O(V + E)",
        "ar": "O(V + E)"
      }
    }
  ],
  "correctAnswer": "ve",
  "explanation": {
    "en": "An Adjacency List stores V vertex headers and only existing edges (E for directed, 2E for undirected), using O(V + E) memory instead of intractable O(V²).",
    "ar": "يخزن Adjacency List قوائم بالجيران الموجودين فعلياً فقط، فيحتاج O(V + E) بدلاً من مصفوفة O(V²) التي تفوق الذاكرة عند 10⁵."
  },
  "tags": [
    "graphs",
    "adjacency-list"
  ]
} as AssessmentQuestion,
{
  "id": "DS-GRP-E-002",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Graphs",
  "subtopic": "Representations",
  "specialization": "List vs Matrix",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which graph representation handles `O(1)` direct edge-existence check `hasEdge(u, v)` cleanly at `O(V^2)` memory cost?",
    "ar": "أي تمثيل للرسوم البيانية يتحقق من وجود حافة مباشرة `hasEdge(u, v)` في `O(1)` على حساب ذاكرة `O(V^2)`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Edge List vector",
        "ar": "قائمة الحواف (Edge List)"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Adjacency List vector",
        "ar": "قائمة الجوار (Adjacency List)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Adjacency Matrix",
        "ar": "مصفوفة الجوار"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Disjoint Set Union array",
        "ar": "مصفوفة DSU"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "An Adjacency Matrix reads `adj[u][v]` directly in O(1), making it ideal for small dense graphs (`V <= ~2000`).",
    "ar": "قراءة الخانة `adj[u][v]` في المصفوفة فورية `O(1)` وتصلح فقط للرسوم الكثيفة أو ذات عدد الرؤوس المحدود."
  },
  "tags": [
    "graphs",
    "adjacency-matrix",
    "representations"
  ]
} as AssessmentQuestion
];
