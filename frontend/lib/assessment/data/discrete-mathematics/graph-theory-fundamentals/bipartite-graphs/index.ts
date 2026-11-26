import { AssessmentQuestion } from '@/lib/assessment/schema';

export const bipartite_graphs_questions: AssessmentQuestion[] = [
{
  "id": "DM-BIP-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Graph Theory",
  "subtopic": "Bipartite Graphs",
  "specialization": "Odd-Length Cycle Criterion",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What is the exact necessary and sufficient condition for a graph to be Bipartite (2-colorable)?",
    "ar": "ما هو الشرط اللازم والكافي لكي يكون الرسم البياني ثنائي التجزئة (Bipartite: قابل للتلوين بلونين)؟"
  },
  "options": [
    {
      "id": "noeven",
      "text": {
        "en": "Contains strictly zero cycles of even length across any connected graph component",
        "ar": "ألا يحتوي الرسم البياني على أي دورة ذات طول زوجي في أي مكون متصل فيه"
      }
    },
    {
      "id": "k3",
      "text": {
        "en": "Every triangle K₃ is bipartite",
        "ar": "المثلث K₃ ثنائي التجزئة"
      }
    },
    {
      "id": "noodd",
      "text": {
        "en": "Contains NO cycles of odd length (checked via BFS/DFS 2-coloring)",
        "ar": "خلو الرسم تماماً من أي دورة ذات طول فردي (يُفحص بتلوين BFS/DFS)"
      }
    },
    {
      "id": "tree",
      "text": {
        "en": "Only completely disconnected graphs containing zero edges qualify as bipartite sets",
        "ar": "تقتصر ثنائية التجزئة على الرسوم المفككة التي تخلو تماماً من الحواف والاتصالات"
      }
    }
  ],
  "correctAnswer": "noodd",
  "explanation": {
    "en": "An odd cycle like a triangle (length 3) forces two adjacent vertices to share the same color; any graph without odd cycles (including all trees!) is Bipartite.",
    "ar": "أي دورة فردية (مثل المثلث) يستحيل تلوينها بلونين؛ فخلو الرسم من الدورات الفردية يكفي لكونه Bipartite."
  },
  "tags": [
    "discrete-math",
    "graphs"
  ]
} as AssessmentQuestion
];
