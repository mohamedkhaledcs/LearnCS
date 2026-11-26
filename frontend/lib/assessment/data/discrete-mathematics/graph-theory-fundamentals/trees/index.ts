import { AssessmentQuestion } from '@/lib/assessment/schema';

export const trees_questions: AssessmentQuestion[] = [
{
  "id": "DM-GTREE-E-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Graph Theory",
  "subtopic": "Tree Invariants",
  "specialization": "Vertices and Edges",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which property is TRUE of EVERY undirected Tree with V vertices?",
    "ar": "أي عبارة صحيحة دوماً عن أي شجرة غير موجهة (Tree) مكونة من V رأساً؟"
  },
  "options": [
    {
      "id": "v",
      "text": {
        "en": "It always contains V edges, at least one simple cycle, and non-unique node paths",
        "ar": "تحتوي على V حافة بالضبط ودورة مغلقة واحدة على الأقل مع تعدد المسارات بين الرؤوس"
      }
    },
    {
      "id": "vm1",
      "text": {
        "en": "Connected, acyclic, has V - 1 edges, and a unique path per vertex pair",
        "ar": "متصلة بلا دورات، بها V - 1 حافة، ومسار وحيد بين كل رأسين"
      }
    },
    {
      "id": "deg",
      "text": {
        "en": "Every vertex inside a connected tree must maintain degree two except the single leaf node",
        "ar": "يجب أن يمتلك كل رأس في الشجرة درجة تساوي 2 تماماً باستثناء رأس الجذر والأوراق المتطرفة"
      }
    },
    {
      "id": "comp",
      "text": {
        "en": "It has at least 2 disconnected components",
        "ar": "تحتوي على مكونين منفصلين"
      }
    }
  ],
  "correctAnswer": "vm1",
  "explanation": {
    "en": "Adding even one edge between existing vertices of a tree creates a cycle; removing any edge disconnects it into 2 trees.",
    "ar": "تمثل الشجرة الحد الأدنى من الحواف المتصلة (V - 1)؛ إضافة حافة تخلق دورة، وحذف حافة يفصل الشجرة."
  },
  "tags": [
    "discrete-math",
    "graphs",
    "trees"
  ]
} as AssessmentQuestion
];
