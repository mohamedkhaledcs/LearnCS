import { AssessmentQuestion } from '@/lib/assessment/schema';

export const scc_questions: AssessmentQuestion[] = [
{
  "id": "CP-SCC-H-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Graph Techniques",
  "subtopic": "Strongly Connected Components (SCC)",
  "specialization": "Kosaraju / Tarjan",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "If you contract every Strongly Connected Component (SCC) of a directed graph into a single super-node, what structure does the resulting condensation graph always form?",
    "ar": "إذا تم دمج كل مكون مترابط بقوة (SCC) في رسم موجه داخل عقدة كبرى واحدة، فما نوع الرسم الناتج (Condensation Graph) دائماً؟"
  },
  "options": [
    {
      "id": "dag",
      "text": {
        "en": "A Directed Acyclic Graph (DAG)",
        "ar": "رسم بياني موجه خالٍ من الدورات (DAG)"
      }
    },
    {
      "id": "tree",
      "text": {
        "en": "An undirected binary tree",
        "ar": "شجرة ثنائية غير موجهة"
      }
    },
    {
      "id": "comp",
      "text": {
        "en": "A single cycle",
        "ar": "دورة واحدة مغلقة"
      }
    },
    {
      "id": "bip",
      "text": {
        "en": "A disconnected forest with zero edges",
        "ar": "غابة بدون حواف"
      }
    }
  ],
  "correctAnswer": "dag",
  "explanation": {
    "en": "If two super-nodes lay on a cycle between each other, every vertex in both would be mutually reachable and belong to the SAME maximal SCC.",
    "ar": "لو وجدت دورة بين مكونين لكانت جميع رؤوسهما قابلة للوصول لبعضها البعض ولاندَمجا في SCC واحد؛ لذا فالرسم المختزل دائماً DAG."
  },
  "tags": [
    "cp",
    "graphs",
    "scc"
  ]
} as AssessmentQuestion
];
