import { AssessmentQuestion } from '@/lib/assessment/schema';

export const kanban_questions: AssessmentQuestion[] = [
{
  "id": "SE-KAN-E-001",
  "language": "both",
  "domain": "Software Engineering",
  "topic": "Methodologies",
  "subtopic": "Kanban",
  "specialization": "WIP Limits",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why does a Kanban board enforce Work-In-Progress (WIP) limits on columns like 'In Review' or 'In Progress'?",
    "ar": "لماذا تفرض لوحة كانبان (Kanban Board) حدوداً للعمل الجاري (WIP Limits) على أعمدة مثل 'قيد التنفيذ' أو 'قيد المراجعة'؟"
  },
  "options": [
    {
      "id": "sprint",
      "text": {
        "en": "Locks engineering tasks strictly into rigid four-week non-interruptible sprint cycles",
        "ar": "لتقييد فريق التطوير بدورات زمنية صارمة مدتها أربعة أسابيع دون قبول تغييرات"
      }
    },
    {
      "id": "ban",
      "text": {
        "en": "Eliminates mandatory peer code reviews and automated testing checks across branches",
        "ar": "لمنع مراجعات الكود والاختبارات الآلية حتى تنتقل البطاقات بسرعة نحو عمود الإنجاز"
      }
    },
    {
      "id": "flow",
      "text": {
        "en": "Exposes bottlenecks early, cuts context switching, and speeds continuous flow",
        "ar": "لكشف الاختناقات وتقليل تشتت السياق وتسريع تدفق إنجاز المهام"
      }
    },
    {
      "id": "slow",
      "text": {
        "en": "To prevent closing completed tickets",
        "ar": "لمنع إنهاء التذاكر"
      }
    }
  ],
  "correctAnswer": "flow",
  "explanation": {
    "en": "Unlike fixed time-boxed sprints, Kanban pulls items continuously and limits WIP so team members finish started tasks instead of juggling 10 half-done features.",
    "ar": "تحديد WIP يمنع تراكم عشرات المهام المفتوحة غير المكتملة ويشجع الفريق على إنهاء المهام وتدفقها بسلاسة."
  },
  "tags": [
    "sdlc",
    "agile"
  ]
} as AssessmentQuestion
];
