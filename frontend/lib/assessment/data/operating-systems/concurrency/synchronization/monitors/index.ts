import { AssessmentQuestion } from '@/lib/assessment/schema';

export const monitors_questions: AssessmentQuestion[] = [
{
  "id": "OS-MON-H-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "Concurrency",
  "subtopic": "Monitors & Condition Variables",
  "specialization": "Structured Synchronization",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "In a Monitor with a Condition Variable, why should `cond.wait()` ALWAYS be wrapped inside a `while (!condition)` loop instead of `if (!condition)`?",
    "ar": "عند استخدام متغير شرطي (Condition Variable) داخل Monitor، لماذا نضع `cond.wait()` داخل حلقة `while (!condition)` بدلاً من `if`؟"
  },
  "options": [
    {
      "id": "fast",
      "text": {
        "en": "C++ and POSIX compilers forbid placing an `if` branch anywhere near a mutex critical section",
        "ar": "معيار C++ وPOSIX يمنع كتابة جملة الشرط `if` بجوار أي قفل Mutex في الدوال المتزامنة"
      }
    },
    {
      "id": "spur",
      "text": {
        "en": "Guards against spurious wakeups and state changes before lock re-acquisition",
        "ar": "لإعادة فحص الشرط بعد الاستيقاظ تحسباً للاستيقاظ الزائف أو تغير الحالة"
      }
    },
    {
      "id": "once",
      "text": {
        "en": "Calling `cond.wait()` keeps the associated mutex locked permanently until the program exits",
        "ar": "دالة `cond.wait()` تبقي القفل محجوزاً طوال وقت الانتظار ولا تحرره لبقية الخيوط أبداً"
      }
    },
    {
      "id": "dead",
      "text": {
        "en": "To force a deadlock",
        "ar": "لإحداث جمود"
      }
    }
  ],
  "correctAnswer": "spur",
  "explanation": {
    "en": "Mesa-style monitors allow another thread to enter between `notify()` and the waiter re-acquiring the mutex, plus OS kernels can deliver spurious wakeups: hence `while (!ready) wait()`.",
    "ar": "في أنظمة Mesa قد يتغير الشرط بين الإشعار واستعادة القفل كما قد يحدث استيقاظ عرضي؛ لذا ففحص while إلزامي دائماً."
  },
  "tags": [
    "os",
    "concurrency"
  ]
} as AssessmentQuestion
];
