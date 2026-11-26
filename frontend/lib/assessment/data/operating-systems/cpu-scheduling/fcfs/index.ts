import { AssessmentQuestion } from '@/lib/assessment/schema';

export const fcfs_questions: AssessmentQuestion[] = [
{
  "id": "OS-FCFS-E-001",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "CPU Scheduling",
  "subtopic": "FCFS",
  "specialization": "Convoy Effect",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What is the classic performance drawback known as the 'Convoy Effect' in First-Come, First-Served (FCFS) scheduling?",
    "ar": "ما هي مشكلة الأداء المعروفة بـ 'تأثير القافلة' (Convoy Effect) في جدولة FCFS؟"
  },
  "options": [
    {
      "id": "starve",
      "text": {
        "en": "Low-priority interactive jobs can never run even after the CPU becomes completely idle",
        "ar": "لا تُنفذ العمليات ذات الأولوية المنخفضة أبداً حتى لو أصبح المعالج فارغاً تماماً لساعات"
      }
    },
    {
      "id": "preempt",
      "text": {
        "en": "Excessive context switches every millisecond drop overall user-mode throughput drastically",
        "ar": "يُسبب كثرة تبديل السياق كل مللي ثانية ضياعاً كاملاً في إنتاجية المعالج داخل الطابور"
      }
    },
    {
      "id": "convoy",
      "text": {
        "en": "Short fast tasks stall behind one long CPU-bound job, raising average wait time",
        "ar": "تتراكم المهام القصيرة السريعة خلف مهمة واحدة طويلة مما يرفع متوسط الانتظار"
      }
    },
    {
      "id": "leak",
      "text": {
        "en": "Kernel heap overflow",
        "ar": "امتلاء الـ Heap"
      }
    }
  ],
  "correctAnswer": "convoy",
  "explanation": {
    "en": "Because FCFS is non-preemptive, one 50ms CPU burst arriving 1ms before five 2ms tasks delays all five, hurting responsiveness.",
    "ar": "بسبب عدم المقاطعة في FCFS، إذا سبقت عملية طويلة العمليات القصيرة تعطل الجميع وأهدر وقت الاستجابة."
  },
  "tags": [
    "os",
    "scheduling"
  ]
} as AssessmentQuestion,
{
  "id": "OS-SCH-E-002",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "CPU Scheduling",
  "subtopic": "FCFS",
  "specialization": "Convoy Effect",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "When one huge 120ms CPU calculation blocks four tiny 2ms interactive clicks in First-Come First-Served (`FCFS`), this slow bottleneck is called:",
    "ar": "عندما تحجز مهمة ثقيلة بمدة 120ms المعالجَ وتُجبر أربع مهام سريعة بمدة 2ms على الانتظار خلفها في جدول FCFS، تسمى هذه الظاهرة:"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Virtual Page Faulting",
        "ar": "خطأ الصفحة الافتراضية"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "L1 Spatial Prefetching",
        "ar": "الجلب المسبق للـ Cache"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "The Convoy Effect",
        "ar": "تأثير القافلة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Circular Buffer Underflow",
        "ar": "نقص المخزن الدائري"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Non-preemptive FCFS lets one slow CPU-bound process stall fast I/O jobs, sharply raising average wait time.",
    "ar": "انتظار المهام الصغيرة خلف عملية ضخمة غير منقطعة يرفع متوسط وقت الانتظار بشدة."
  },
  "tags": [
    "convoy-effect",
    "fcfs",
    "scheduling"
  ]
} as AssessmentQuestion,
{
  "id": "OS-SCH-M-003",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "CPU Scheduling",
  "subtopic": "Round Robin",
  "specialization": "Time Quantum Choice",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What happens if an interactive OS sets its Round Robin Time Quantum HUGE (e.g. 60 seconds per slice)?",
    "ar": "ماذا يحدث إذا ضبط نظام التشغيل شريحة الوقت Quantum في Round Robin بقيمة ضخمة جداً (مثل 60 ثانية)؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Context switching overhead immediately rises to 100% total CPU core saturation",
        "ar": "تستنزف عملية تبديل السياق كامل طاقة المعالج وتدفع الحمل إلى 100% طوال الوقت"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Starvation disappears instantly purely by elevating all background priority limits",
        "ar": "يختفي التجويع تماماً بمجرد تضخيم الشريحة وتسبق المهام القصيرة بالذكاء التلقائي"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Starvation disappears purely by elevating priority thresholds",
        "ar": "يتحول تلقائياً لجدولة الأولويات"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Preemption stops firing, making it behave like sluggish non-preemptive FCFS",
        "ar": "تختفي المقاطعة عملياً ويتدهور الجدول إلى FCFS البطئ تفاعلياً"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "When `quantum` exceeds burst times, every job runs straight to completion sequentially: behaving identically to FCFS!",
    "ar": "كل مهمة تنتهي قبل انتهاء شريحتها الطويلة فيضيع التناوب السريع الذي يمنح استجابة تفاعلية للواجهة."
  },
  "tags": [
    "round-robin",
    "quantum",
    "scheduling"
  ]
} as AssessmentQuestion,
{
  "id": "OS-SCH-H-005",
  "language": "both",
  "domain": "Operating Systems",
  "topic": "CPU Scheduling",
  "subtopic": "Metrics",
  "specialization": "Turnaround vs Waiting",
  "difficulty": "hard",
  "type": "code-trace",
  "codeSnippet": "// Non-preemptive FCFS starting at t = 0:\n// P1 arrives t=0 (burst=5), P2 arrives t=1 (burst=3)",
  "codeLanguage": "text",
  "question": {
    "en": "Compute exact **Waiting Time** (`Start - Arrival`) for `P2` under FCFS above:",
    "ar": "احسب **زمن الانتظار** الدقيق (`بداية التنفيذ - زمن الوصول`) للعملية `P2` في جدول FCFS أعلاه:"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "0 ms",
        "ar": "0 ms"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "4 ms",
        "ar": "4 ms"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "5 ms",
        "ar": "5 ms"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "8 ms",
        "ar": "8 ms"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "`P1` occupies `[0..5]`. `P2` waited from arrival `t = 1` until starting on CPU at `t = 5` -> wait time = `5 - 1 = 4`.",
    "ar": "تنتهي `P1` عند `t = 5`، فتبدأ `P2` بعد انتظار دام `5 - 1 = 4` وحدات."
  },
  "tags": [
    "fcfs",
    "metrics",
    "waiting-time"
  ]
} as AssessmentQuestion
];
