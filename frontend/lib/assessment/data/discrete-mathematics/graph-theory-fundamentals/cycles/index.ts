import { AssessmentQuestion } from '@/lib/assessment/schema';

export const cycles_questions: AssessmentQuestion[] = [
{
  "id": "DM-GCYC-M-001",
  "language": "both",
  "domain": "Discrete Mathematics",
  "topic": "Graph Theory",
  "subtopic": "Cycles & Euler/Hamilton",
  "specialization": "Eulerian Circuit",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "When does a connected undirected graph have an Eulerian Circuit (visiting EVERY edge exactly once and returning to start)?",
    "ar": "متى يمتلك رسم بياني غير موجه متصل دورة أويلر (Eulerian Circuit: يمر بكل حافة مرة واحدة فقط ويعود للبداية)؟"
  },
  "options": [
    {
      "id": "even",
      "text": {
        "en": "If and only if EVERY vertex has an EVEN degree",
        "ar": "إذا وفقط إذا كانت درجة (Degree) كل رأس في الرسم عدداً زوجياً"
      }
    },
    {
      "id": "odd",
      "text": {
        "en": "When every vertex has degree 3",
        "ar": "عندما تكون كل الدرجات تساوي 3"
      }
    },
    {
      "id": "tree",
      "text": {
        "en": "Whenever the graph is a tree",
        "ar": "عندما يكون شجرة"
      }
    },
    {
      "id": "prime",
      "text": {
        "en": "When V is prime",
        "ar": "عندما يكون عدد الرؤوس أولياً"
      }
    }
  ],
  "correctAnswer": "even",
  "explanation": {
    "en": "Entering and leaving a vertex consumes 2 incident edges per visit, so every vertex must have even degree to support a closed Eulerian tour (Euler 1736).",
    "ar": "كل عبور من خلال رأس يستخدم حافتين (دخول وخروج)، لذا يجب أن تكون درجة كل رأس زوجية."
  },
  "tags": [
    "discrete-math",
    "graphs"
  ]
} as AssessmentQuestion
];
