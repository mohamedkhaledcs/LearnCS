import { AssessmentQuestion } from '@/lib/assessment/schema';

export const connectivity_questions: AssessmentQuestion[] = [
{
  "id": "DM-GCONN-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Graph Theory",
  "subtopic": "Connectivity & Bridges",
  "specialization": "Bridge Definition",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "In an undirected graph, what defines a 'Bridge' (cut-edge)?",
    "ar": "في رسم بياني غير موجه، ما هو تعريف الحافة الجسرية (Bridge / Cut-edge)؟"
  },
  "options": [
    {
      "id": "heavy",
      "text": {
        "en": "Whichever graph edge carries the strictly largest positive numerical path weight",
        "ar": "الحافة صاحبة أكبر وزن رقمي موجب في الرسم البياني الموزون بأكمله"
      }
    },
    {
      "id": "self",
      "text": {
        "en": "A self-loop (u, u)",
        "ar": "حلقة ذاتية"
      }
    },
    {
      "id": "leaf",
      "text": {
        "en": "Any arbitrary edge inside a symmetric complete clique graph such as K₅",
        "ar": "أي حافة اختيارية تقع داخل رسم بياني متكامل ومتصل بالكامل مثل K₅"
      }
    },
    {
      "id": "inc",
      "text": {
        "en": "An edge whose removal increases the number of connected components",
        "ar": "حافة يؤدي حذفها لزيادة عدد المكونات المتصلة بالرسم"
      }
    }
  ],
  "correctAnswer": "inc",
  "explanation": {
    "en": "Tarjan's Bridge-finding DFS finds bridges in O(V + E): critical for identifying single points of failure in computer networks!",
    "ar": "حذف الجسر يفصل شبكة الاتصال؛ تُكتشف الجسور بخوارزمية Tarjan في O(V + E) لتحليل نقاط الضعف بالشبكات."
  },
  "tags": [
    "discrete-math",
    "graphs"
  ]
} as AssessmentQuestion
];
