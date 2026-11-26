import { AssessmentQuestion } from '@/lib/assessment/schema';

export const topological_sorting_questions: AssessmentQuestion[] = [
{
  "id": "CP-TOPO-M-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Graph Techniques",
  "subtopic": "Topological Sorting",
  "specialization": "Kahn's Algorithm",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which condition MUST a directed graph satisfy to have a valid Topological Ordering?",
    "ar": "ما الشرط الحتمي الذي يجب أن يحققه الرسم البياني الموجه ليكون له ترتيب طوبولوجي (Topological Ordering)؟"
  },
  "options": [
    {
      "id": "conn",
      "text": {
        "en": "It must be a Complete Graph",
        "ar": "يجب أن يكون رسماً كاملاً"
      }
    },
    {
      "id": "neg",
      "text": {
        "en": "All edge weights must be positive",
        "ar": "يجب أن تكون الأوزان موجبة"
      }
    },
    {
      "id": "tree",
      "text": {
        "en": "Every node must have in-degree >= 2",
        "ar": "يجب أن تكون درجة الدخول >= 2 لكل عقدة"
      }
    },
    {
      "id": "dag",
      "text": {
        "en": "It must be a Directed Acyclic Graph",
        "ar": "يجب أن يكون رسماً موجهاً خالياً من الدورات (DAG)"
      }
    }
  ],
  "correctAnswer": "dag",
  "explanation": {
    "en": "A cycle A -> B -> A makes it impossible for A to precede B while B precedes A. Kahn's in-degree queue detects cycles if fewer than V nodes are processed.",
    "ar": "وجود أي دورة يمنع ترتيب العقد بحيث تسبق البداية النهاية في كل سهم؛ لذا يُشترط أن يكون Graph خالياً من الدورات (DAG)."
  },
  "tags": [
    "cp",
    "graphs",
    "topological-sort"
  ]
} as AssessmentQuestion,
{
  "id": "DS-GRP-M-003",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Graph Algorithms",
  "subtopic": "Topological Sort",
  "specialization": "DAG Prerequisite",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "If Kahn's Topological Sort finishes processing fewer than all `V` vertices (`order.size() < V`), what did the directed graph contain?",
    "ar": "إذا انتهى الفرز الطوبولوجي (Kahn's Algorithm) بإخراج عدد رؤوس أقل من `V` الكلي، فماذا يعني ذلك عن الرسم الموجّه؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "All vertices contained identical zero edge weights across disconnected components",
        "ar": "تشترك جميع الرؤوس في أوزان حواف صفرية متطابقة تجعل الرسم شجرة ثنائية متوازنة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Every remaining node formed an exact balanced Binary Search Tree subcomponent",
        "ar": "لا توجد أي حواف موجهة أصلية تربط بين مكونات الرسم البياني المنفصلة نهائياً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "No edges existed anywhere between components",
        "ar": "لا توجد أي حواف في الرسم"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "At least one Directed Cycle blocked remaining in-degrees from hitting 0",
        "ar": "وجود دورة موجّهة على الأقل منعت تصفير درجات الدخول لبقية الرؤوس"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Every cycle keeps all cycle members at `indegree >= 1` permanently, making Kahn's algorithm an effortless cycle detector in prerequisites (just like LearnCS!).",
    "ar": "الرؤوس الواقعة في دورة لا تصل درجة دخولها للصفر أبداً، مما يجعل خوارزمية كان أداة قياسية لكشف دورات المتطلبات المسبقة."
  },
  "tags": [
    "topological-sort",
    "dag",
    "cycle-detection"
  ]
} as AssessmentQuestion
];
