import { AssessmentQuestion } from '@/lib/assessment/schema';

export const avoidance_questions: AssessmentQuestion[] = [
{
  "id": "OS-DLAV-H-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Deadlocks",
  "subtopic": "Banker's Algorithm",
  "specialization": "Safe State",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "In Dijkstra's Banker's Algorithm for Deadlock Avoidance, what is a 'Safe State'?",
    "ar": "في خوارزمية المصرفي (Banker's Algorithm) لتجنب الجمود، ماذا تعني الحالة الآمنة (Safe State)؟"
  },
  "options": [
    {
      "id": "dead",
      "text": {
        "en": "An Unsafe State guarantees an immediate deadlock within the very next CPU instruction",
        "ar": "الحالة غير الآمنة تعني حتمية حدوث Deadlock فوري في التعليمة البرمجية التالية مباشرة"
      }
    },
    {
      "id": "root",
      "text": {
        "en": "Running as SuperAdmin root user",
        "ar": "تشغيل كافة العمليات بصلاحيات الجذر SuperAdmin لتجاوز قيود الموارد العتادية بالكامل"
      }
    },
    {
      "id": "lock",
      "text": {
        "en": "Allocating strictly zero hardware resources to every background thread until reboot",
        "ar": "تخصيص 0 موارد للكل"
      }
    },
    {
      "id": "safe",
      "text": {
        "en": "A sequence exists allowing every process to obtain max needs and finish",
        "ar": "يوجد تسلسل تنفيذ آمن يسمح لكل عملية بأخذ كامل احتياجها وإنهاء عملها"
      }
    }
  ],
  "correctAnswer": "safe",
  "explanation": {
    "en": "An Unsafe State isn't necessarily already deadlocked, but cannot guarantee avoidance if every process requests its declared maximum concurrently.",
    "ar": "الحالة الآمنة تضمن وجود مخرج للجميع؛ أما الحالة غير الآمنة فقد تقود للجمود لو طلبت العمليات حدها الأقصى معاً."
  },
  "tags": [
    "os",
    "deadlocks"
  ]
} as AssessmentQuestion
];
