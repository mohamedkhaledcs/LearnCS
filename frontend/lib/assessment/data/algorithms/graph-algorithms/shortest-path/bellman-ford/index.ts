import { AssessmentQuestion } from '@/lib/assessment/schema';

export const bellman_ford_questions: AssessmentQuestion[] = [
{
  "id": "AL-BF-M-001",
  "language": "both",
  "domain": "Algorithms",
  "topic": "Graph Algorithms",
  "subtopic": "Bellman-Ford",
  "specialization": "Negative Cycles",
  "difficulty": "medium",
  "type": "complexity",
  "question": {
    "en": "Why does Bellman-Ford relax all E edges (V - 1) times, and what does an extra V-th relaxation pass detect?",
    "ar": "لماذا تُجري خوارزمية Bellman-Ford عملية الاسترخاء (relaxation) لكل الحواف (V-1) مرة، وماذا تكتشف الدورة الإضافية رقم V؟"
  },
  "options": [
    {
      "id": "negcyc",
      "text": {
        "en": "Max path uses V - 1 edges; relaxation on pass V signals a negative cycle",
        "ar": "أطول مسار بسيط V - 1 حافة؛ والتحسن في الدورة V يكشف دورة سالبة"
      }
    },
    {
      "id": "mst",
      "text": {
        "en": "Executing the V-th pass yields a valid Minimum Spanning Tree over edge costs",
        "ar": "تبني الدورة الإضافية شجرة الامتداد الصغرى المثلى وتنهي حساب جميع التفرعات"
      }
    },
    {
      "id": "disconnect",
      "text": {
        "en": "Pass V confirms the graph is bipartite",
        "ar": "تؤكد أن الرسم ثنائي التقسيم"
      }
    },
    {
      "id": "dense",
      "text": {
        "en": "An extra V-th relaxation sweep drops time complexity cleanly from O(VE) down to O(V log V)",
        "ar": "تقلص الدورة الإضافية زمن الخوارزمية الكلي من O(VE) إلى O(V log V) دائماً"
      }
    }
  ],
  "correctAnswer": "negcyc",
  "explanation": {
    "en": "Without negative cycles, shortest paths take <= V-1 edges. Any further distance reduction on the V-th iteration indicates a negative-weight cycle.",
    "ar": "في غياب الدورات السالبة لا يتعدى أقصر مسار V-1 حافة؛ أي تحسن بعد ذلك يعني دوراناً لا نهائياً في دورة مجموع أوزانها سالب."
  },
  "tags": [
    "graphs",
    "shortest-path",
    "bellman-ford"
  ]
} as AssessmentQuestion
];
