import { AssessmentQuestion } from '@/lib/assessment/schema';

export const tree_diameter_questions: AssessmentQuestion[] = [
{
  "id": "CP-DIAM-M-001",
  "language": "both",
  "domain": "Competitive Programming",
  "topic": "Graph Techniques",
  "subtopic": "Tree Diameter",
  "specialization": "Two-DFS / BFS Method",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "How does the classic two-BFS/DFS algorithm find the diameter (longest simple path) of a tree in O(V) time?",
    "ar": "كيف تجد خوارزمية الـ BFS/DFS المرتين قطر الشجرة (أطول مسار بسيط) في زمن O(V)؟"
  },
  "options": [
    {
      "id": "root",
      "text": {
        "en": "Compute strictly twice the root node depth without traversing second endpoints",
        "ar": "نضرب أقصى عمق من الجذر في 2 فقط لنحصل على أطول مسار داخل أي شجرة"
      }
    },
    {
      "id": "two",
      "text": {
        "en": "BFS from u finds farthest x; a second BFS from x reaches farthest y",
        "ar": "BFS من u يجد أبعد عقدة x، ثم BFS من x يجد الطرف الآخر y"
      }
    },
    {
      "id": "floyd",
      "text": {
        "en": "Run dense Floyd-Warshall across every vertex triple in guaranteed O(V) time",
        "ar": "نشغل خوارزمية Floyd-Warshall الشاملة للحصول على كل المسافات في زمن O(V) خطي"
      }
    },
    {
      "id": "cnt",
      "text": {
        "en": "Count leaf nodes minus 1",
        "ar": "عدد الأوراق مطروحاً منه 1"
      }
    }
  ],
  "correctAnswer": "two",
  "explanation": {
    "en": "In a tree (non-negative edge weights), the farthest vertex x from any arbitrary start vertex is guaranteed to be one endpoint of a longest path.",
    "ar": "في أي شجرة بأوزان غير سالبة، أبعد رأس عن أي عقدة بداية عشوائية يُثبت رياضياً أنه أحد طرفي القطر الفعلي."
  },
  "tags": [
    "cp",
    "trees",
    "graphs"
  ]
} as AssessmentQuestion
];
