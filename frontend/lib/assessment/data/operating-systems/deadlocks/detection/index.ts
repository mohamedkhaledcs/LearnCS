import { AssessmentQuestion } from '@/lib/assessment/schema';

export const detection_questions: AssessmentQuestion[] = [
{
  "id": "OS-DLDET-M-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Deadlocks",
  "subtopic": "Deadlock Detection",
  "specialization": "Wait-For Graph",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "In a system with single instances of each resource type, how is a Deadlock detected using a Wait-For Graph?",
    "ar": "في نظام بمورد واحد من كل نوع، كيف نكتشف الجمود عبر رسم الانتظار (Wait-For Graph)؟"
  },
  "options": [
    {
      "id": "cyc",
      "text": {
        "en": "Deadlock exists iff the directed Wait-For Graph has a cycle",
        "ar": "يوجد جمود إذا وفقط إذا احتوى رسم الانتظار الموجه على دورة"
      }
    },
    {
      "id": "bfs",
      "text": {
        "en": "Whenever total active threads inside the graph strictly exceed four nodes",
        "ar": "كلما زاد عدد العقد المنتظرة داخل رسم الموارد عن أربع عمليات متزامنة معاً"
      }
    },
    {
      "id": "leaf",
      "text": {
        "en": "Whenever a vertex has out-degree 0",
        "ar": "عندما تساوي درجة الخروج 0"
      }
    },
    {
      "id": "deg",
      "text": {
        "en": "Wait-For Graphs always form undirected trees guaranteed free of cyclic paths",
        "ar": "يرمز رسم الانتظار دائماً إلى شجرة غير موجهة يستحيل تشكل دورات مغلقة بداخلها"
      }
    }
  ],
  "correctAnswer": "cyc",
  "explanation": {
    "en": "Edge `Pi -> Pj` means `Pi` waits for a lock currently held by `Pj`; a cycle `P1 -> P2 -> P1` proves circular deadlock (resolved via victim rollback/abort in DBMSs and OSs).",
    "ar": "السهم `Pi -> Pj` يعني انتظار الأول لمورد يملكه الثاني، وأي دورة مغلقة تثبت وقوع Deadlock."
  },
  "tags": [
    "os",
    "deadlocks",
    "graphs"
  ]
} as AssessmentQuestion
];
