import { AssessmentQuestion } from '@/lib/assessment/schema';

export const race_conditions_questions: AssessmentQuestion[] = [
{
  "id": "OS-RACE-M-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Concurrency",
  "subtopic": "Race Conditions",
  "specialization": "Non-Atomic Read-Modify-Write",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "If two threads concurrently run `counter++` 1,000,000 times on a shared unprotected `int`, why is the final value often LESS than 2,000,000?",
    "ar": "إذا نفذ خيطان معاً العملية `counter++` مليون مرة لكل منهما على نفس المتغير المشترك دون حماية، لماذا تقل النتيجة النهائية غالباً عن 2,000,000؟"
  },
  "options": [
    {
      "id": "slow",
      "text": {
        "en": "Hardware CPU cores intentionally drop loop iterations to avoid thermal overheating",
        "ar": "يتعمد المعالج تخطي بعض دورات التكرار السريعة لتخفيف حرارته أثناء التشغيل الكثيف"
      }
    },
    {
      "id": "ovf",
      "text": {
        "en": "Adding two million positive increments overflows 64-bit signed integer capacity",
        "ar": "الوصول إلى مليوني زيادة يتجاوز الحد الأقصى المسموح للأعداد الصحيحة بترميز 64 بت"
      }
    },
    {
      "id": "race",
      "text": {
        "en": "`counter++` spans Load -> Add -> Store, letting threads overwrite updates",
        "ar": "عملية `counter++` ثلاث خطوات (قراءة-زيادة-كتابة) يتداخل فيها الخيطان"
      }
    },
    {
      "id": "tls",
      "text": {
        "en": "Shared variables live in registers automatically",
        "ar": "المتغيرات المشتركة مستقلة تلقائياً"
      }
    }
  ],
  "correctAnswer": "race",
  "explanation": {
    "en": "Protecting the critical section with a Mutex or hardware `atomic<int>` ensures indivisible read-modify-write execution.",
    "ar": "يجب حماية القسم الحرج باستخدام Mutex أو عملية ذرية Atomic لضمان عدم التداخل."
  },
  "tags": [
    "os",
    "concurrency",
    "threads"
  ]
} as AssessmentQuestion,
{
  "id": "OS-PRC-M-003",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Concurrency",
  "subtopic": "Race Conditions",
  "specialization": "Non-Atomic Operations",
  "difficulty": "medium",
  "type": "debugging",
  "codeSnippet": "// Shared global int total = 0; accessed by 4 threads concurrently:\nfor (int i = 0; i < 10000; i++) total++;",
  "codeLanguage": "cpp",
  "question": {
    "en": "Why will `total` frequently finish BELOW `40,000` without locks or `std::atomic<int>`?",
    "ar": "لماذا ينتهي المتغير `total` غالباً بقيمة أقل من `40,000` عند تشغيله عبر 4 خيوط متزامنة دون قفل أو `atomic`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Worker loops pause automatically after executing ten thousand shared CPU cycles",
        "ar": "تتوقف الحلقات تلقائياً عند بلوغ عشرة آلاف دورة معالج وتُسقط البتات فوق 32768"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Multi-core CPUs drop unsigned low bits silently above integer value 32768",
        "ar": "تعكس المعالجات متعددة الأنوية المتغيرات العامة عشوائياً ما لم تُسبق بكلمة const"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "`total++` spans Load -> Add -> Store, causing lost interleaved writes",
        "ar": "`total++` ثلاث خطوات (قراءة-جمع-كتابة) يتداخل فيها الخيطان فتضيع زيادات"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Stack registers drop low bits on overflow above 32768",
        "ar": "تسقط البتات بعد 32768"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Hardware read-modify-write is NOT indivisible unless guarded via Mutex or lock-free `atomic` instructions.",
    "ar": "التحديث غير الذري يسمح لخيطين بقراءة القيمة القديمة نفسها ثم الكتابة فوق تعديل بعضهما."
  },
  "tags": [
    "race-condition",
    "atomic",
    "concurrency"
  ]
} as AssessmentQuestion
];
