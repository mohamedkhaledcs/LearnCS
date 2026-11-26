import { AssessmentQuestion } from '@/lib/assessment/schema';

export const semaphores_questions: AssessmentQuestion[] = [
{
  "id": "OS-SEM-M-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Concurrency",
  "subtopic": "Semaphores",
  "specialization": "Mutex vs Counting Semaphore",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "How does a Counting Semaphore differ conceptually from a Mutex lock?",
    "ar": "كيف يختلف الـ Counting Semaphore مفاهيمياً عن قفل Mutex؟"
  },
  "options": [
    {
      "id": "perm",
      "text": {
        "en": "Mutex enforces single-thread ownership; Semaphore counts N permits",
        "ar": "الـ Mutex له مالك واحد يفتحه؛ والـ Semaphore عداد لـ N أذونات"
      }
    },
    {
      "id": "busy",
      "text": {
        "en": "A standard Mutex permits up to 100 concurrent threads inside one critical section simultaneously",
        "ar": "يسمح Mutex بدخول 100 خيط إلى المنطقة الحرجة في الوقت نفسه مع تبديل عشوائي بينهم"
      }
    },
    {
      "id": "spin",
      "text": {
        "en": "Semaphores strictly spin in busy loops and cannot put waiting threads to sleep via the kernel",
        "ar": "لا يستطيع Semaphore تنويم الخيوط المنتظرة عبر النواة بل يدور دائماً في حلقة busy-wait"
      }
    },
    {
      "id": "same",
      "text": {
        "en": "They are identical names with zero differences",
        "ar": "متطابقان تماماً"
      }
    }
  ],
  "correctAnswer": "perm",
  "explanation": {
    "en": "A counting semaphore initialized to `K` coordinates Producer-Consumer bounded buffers or connection pools of size `K`, while a Mutex enforces mutual exclusion ownership.",
    "ar": "يفيد Counting Semaphore في إدارة عدد محدود N من الموارد أو تنسيق Producer-Consumer، بينما يحمي Mutex ملكية قسم حرج لخيط واحد."
  },
  "tags": [
    "os",
    "concurrency"
  ]
} as AssessmentQuestion
];
