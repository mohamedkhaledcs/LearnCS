import { AssessmentQuestion } from '@/lib/assessment/schema';

export const graph_properties_questions: AssessmentQuestion[] = [
{
  "id": "DM-GPROP-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Graph Theory",
  "subtopic": "Graph Properties",
  "specialization": "Complete Graph Edges",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "How many edges does a simple undirected Complete Graph Kₙ with N vertices contain?",
    "ar": "كم حافة يحتوي عليها الرسم البياني الكامل (Complete Graph Kₙ) غير الموجه الذي يضم N رأساً؟"
  },
  "options": [
    {
      "id": "n2",
      "text": {
        "en": "N²",
        "ar": "N²"
      }
    },
    {
      "id": "n1",
      "text": {
        "en": "N - 1",
        "ar": "N - 1"
      }
    },
    {
      "id": "nc2",
      "text": {
        "en": "N·(N - 1) / 2",
        "ar": "N·(N - 1) / 2"
      }
    },
    {
      "id": "2n",
      "text": {
        "en": "2·N",
        "ar": "2·N"
      }
    }
  ],
  "correctAnswer": "nc2",
  "explanation": {
    "en": "Each pair of distinct vertices has exactly one edge connecting it -> C(N, 2) = N(N - 1)/2 edges.",
    "ar": "يوجد حافة واحدة بين كل زوج من الرؤوس، أي C(N, 2) = N(N-1)/2."
  },
  "tags": [
    "discrete-math",
    "graphs"
  ]
} as AssessmentQuestion
];
