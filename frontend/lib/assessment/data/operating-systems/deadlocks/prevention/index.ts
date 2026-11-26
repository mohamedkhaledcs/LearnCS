import { AssessmentQuestion } from '@/lib/assessment/schema';

export const prevention_questions: AssessmentQuestion[] = [
{
  "id": "OS-DLPREV-M-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Deadlocks",
  "subtopic": "Deadlock Prevention",
  "specialization": "Lock Ordering",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why does requiring all threads to acquire multiple locks strictly in ascending global Lock-ID order eliminate deadlocks?",
    "ar": "لماذا يمنع إلزام جميع الخيوط بأخذ الأقفال بترتيب تصاعدي عالمي موحد حدوث الـ Deadlock؟"
  },
  "options": [
    {
      "id": "mut",
      "text": {
        "en": "Lock ordering eliminates Mutual Exclusion so all threads mutate shared queues together",
        "ar": "يلغي الاستبعاد المتبادل تماماً ليسمح لجميع الخيوط بالكتابة في الذاكرة الحرجة معاً"
      }
    },
    {
      "id": "pre",
      "text": {
        "en": "Global lock IDs delete OS mutex objects completely and convert threads to lock-free mode",
        "ar": "يقوم بحذف أقفال النظام كلياً وتحويل تنفيذ العمليات إلى نمط غير متزامن بلا أقفال"
      }
    },
    {
      "id": "circ",
      "text": {
        "en": "Strict global lock ordering makes Circular Wait impossible",
        "ar": "الترتيب التصاعدي الموحد يكسر شرط الانتظار الدائري (Circular Wait) تماماً"
      }
    },
    {
      "id": "ram",
      "text": {
        "en": "It doubles RAM speed",
        "ar": "يسرع الرام"
      }
    }
  ],
  "correctAnswer": "circ",
  "explanation": {
    "en": "If Thread A waits for lock_5 while holding lock_2, whoever holds lock_5 can never be waiting on any lock <= 2: eliminating circular dependencies completely.",
    "ar": "الانتقال دائماً من قفل برقم أصغر لرقم أكبر يجعل تكوّن حلقة مفرغة مستحيلاً رياضياً."
  },
  "tags": [
    "os",
    "concurrency",
    "deadlocks"
  ]
} as AssessmentQuestion,
{
  "id": "OS-PRC-H-005",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Concurrency",
  "subtopic": "Deadlocks",
  "specialization": "Deadlock Conditions",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "Coffman's 4 Deadlock conditions require Mutual Exclusion, Hold-and-Wait, No Preemption, AND Circular Wait. What happens if your code breaks strictly **Circular Wait**?",
    "ar": "تتطلب شروط Deadlock الأربعة الاستئثار، والاحتفاظ مع الانتظار، وعدم الانتزاع، والانتظار الدائري. ماذا يتحقق إذا كسَرنا **الانتظار الدائري** فقط؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Deadlock becomes mathematically impossible even while keeping Mutex locks active",
        "ar": "يستحيل حدوث Deadlock تماماً مع بقاء الأقفال متاحة للاستخدام بأمان"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Race conditions vanish automatically with zero synchronization needed",
        "ar": "تختفي حالات السباق بلا أقفال"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "All threads collapse into single-process batch loops cleanly",
        "ar": "تندمج كل الخيوط في حلقة واحدة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Deadlocks still trigger whenever three threads acquire locks ascending",
        "ar": "يحدث deadlock مع ثلاثة خيوط"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "ALL FOUR Coffman conditions must hold together for deadlock; imposing strict global lock-ordering prevents cycles cleanly!",
    "ar": "يجب اجتماع الشروط الأربعة معاً ليقع الـ Deadlock؛ ففرض ترتيب موحد لأخذ الأقفال يكسر الحلقة ويمنعه كلياً."
  },
  "tags": [
    "deadlock",
    "coffman",
    "locking"
  ]
} as AssessmentQuestion
];
