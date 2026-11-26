import { AssessmentQuestion } from '@/lib/assessment/schema';

export const binary_trees_questions: AssessmentQuestion[] = [
{
  "id": "DS-BT-E-001",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Trees",
  "subtopic": "Binary Trees",
  "specialization": "Height vs Nodes",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What is the maximum number of nodes in a binary tree of height h (where single-node root has height h = 0)?",
    "ar": "ما الحد الأقصى لعدد العقد في شجرة ثنائية ارتفاعها h (باعتبار الجذر وحده بارتفاع 0)؟"
  },
  "options": [
    {
      "id": "2h",
      "text": {
        "en": "2^h",
        "ar": "2^h"
      }
    },
    {
      "id": "h2",
      "text": {
        "en": "h² + 1",
        "ar": "h² + 1"
      }
    },
    {
      "id": "2mult",
      "text": {
        "en": "2 · h + 1",
        "ar": "2 · h + 1"
      }
    },
    {
      "id": "2h1",
      "text": {
        "en": "2^(h + 1) - 1",
        "ar": "2^(h + 1) - 1"
      }
    }
  ],
  "correctAnswer": "2h1",
  "explanation": {
    "en": "Level k contains at most 2^k nodes; summing geometric series 2^0 + 2^1 + ... + 2^h equals 2^(h + 1) - 1.",
    "ar": "يضم المستوى k على الأكثر 2^k عقدة، ومجموع المتسلسلة الهندسية من 0 إلى h هو 2^(h + 1) - 1."
  },
  "tags": [
    "trees",
    "bst"
  ]
} as AssessmentQuestion,
{
  "id": "DS-TRE-E-002",
  "language": "both",
  "domain": "Data Structures",
  "topic": "Trees",
  "subtopic": "Binary Trees",
  "specialization": "Edge Count",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Any valid Tree containing exactly `N` vertices ALWAYS contains how many edges?",
    "ar": "أي شجرة صحيحة مكوّنة من `N` رأس (Vertex) تحتوي دائماً بالضبط على كم حافة (Edge)؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "N edges",
        "ar": "N حافة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "N - 1 edges",
        "ar": "N - 1 حافة"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "N + 1 edges",
        "ar": "N + 1 حافة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "2 * N edges",
        "ar": "2 * N حافة"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "Every non-root vertex attaches via 1 parent edge (`N - 1` total edges), guaranteeing connectivity with zero cycles.",
    "ar": "كل عقدة باستثناء الجذر ترتبط بأب واحد، فيكون مجموع الحواف `N - 1` دون أي دورات."
  },
  "tags": [
    "trees",
    "properties",
    "graphs"
  ]
} as AssessmentQuestion
];
