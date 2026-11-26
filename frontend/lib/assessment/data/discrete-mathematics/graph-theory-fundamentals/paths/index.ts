import { AssessmentQuestion } from '@/lib/assessment/schema';

export const paths_questions: AssessmentQuestion[] = [
{
  "id": "DM-GPATH-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Graph Theory",
  "subtopic": "Walks, Trails & Paths",
  "specialization": "Simple Path Definition",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What distinguishes a 'Simple Path' from a general 'Walk' in a graph?",
    "ar": "ما الفرق بين المسار البسيط (Simple Path) والمشي العام (Walk) في الرسم البياني؟"
  },
  "options": [
    {
      "id": "weight",
      "text": {
        "en": "A Walk must sum edge weights strictly to zero while Simple Paths use positive costs",
        "ar": "الـ Walk يربط الرؤوس بلا أوزان رقمية بينما يتطلب المسار البسيط أوزاناً موجبة فقط"
      }
    },
    {
      "id": "dir",
      "text": {
        "en": "Simple Paths only exist in directed graphs",
        "ar": "توجد في الرسوم الموجهة فقط"
      }
    },
    {
      "id": "closed",
      "text": {
        "en": "Simple Paths must always avoid repeated starts whereas Walks cannot pass intermediate nodes",
        "ar": "المسار البسيط يبدأ وينتهي عند الرأس نفسه دوماً بخلاف الـ Walk المفتوح من الطرفين"
      }
    },
    {
      "id": "norep",
      "text": {
        "en": "Simple Paths never repeat vertices/edges, whereas Walks may revisit them",
        "ar": "المسار البسيط لا يكرر أي رأس، بينما يسمح الـ Walk بتكرار الرؤوس والحواف"
      }
    }
  ],
  "correctAnswer": "norep",
  "explanation": {
    "en": "In graph theory: Walk = arbitrary edge sequence; Trail = no repeated edges; Path (simple path) = no repeated vertices.",
    "ar": "الـ Walk يسمح بالتكرار، و Trail يمنع تكرار الحواف، أما Simple Path فيمنع تكرار الرؤوس تماماً."
  },
  "tags": [
    "discrete-math",
    "graphs"
  ]
} as AssessmentQuestion
];
