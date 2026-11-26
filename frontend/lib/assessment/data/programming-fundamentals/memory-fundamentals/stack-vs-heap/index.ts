import { AssessmentQuestion } from '@/lib/assessment/schema';

export const stack_vs_heap_questions: AssessmentQuestion[] = [
{
  "id": "PF-MEM-H-001",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Memory Fundamentals",
  "subtopic": "Stack vs Heap",
  "specialization": "Allocation",
  "difficulty": "hard",
  "type": "concept",
  "question": {
    "en": "Which of the following is typically allocated on the Heap rather than the Stack?",
    "ar": "أي من التالي يتم تخصيصه (allocated) عادةً في الـ Heap بدلاً من الـ Stack؟"
  },
  "options": [
    {
      "id": "dynamic",
      "text": {
        "en": "Dynamically allocated objects",
        "ar": "الكائنات المخصصة ديناميكياً"
      }
    },
    {
      "id": "local",
      "text": {
        "en": "Local primitive variables inside a function",
        "ar": "المتغيرات البدائية المحلية داخل الدالة"
      }
    },
    {
      "id": "pointer",
      "text": {
        "en": "The memory address stored in a pointer",
        "ar": "عنوان الذاكرة المخزن في المؤشر (pointer)"
      }
    },
    {
      "id": "params",
      "text": {
        "en": "Function parameters",
        "ar": "معاملات الدالة (Function parameters)"
      }
    }
  ],
  "correctAnswer": "dynamic",
  "explanation": {
    "en": "Local primitives and parameters live on the automatic LIFO Stack, whereas objects allocated dynamically at runtime with new/malloc live on the Heap until freed or garbage-collected.",
    "ar": "تُحجز المتغيرات المحلية على المكدس (Stack)، أما الكائنات المخصصة ديناميكياً أثناء التشغيل via new/malloc فتعيش في الـ Heap."
  }
} as AssessmentQuestion,
{
  "id": "PRE-RAM-E-004",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Memory Fundamentals",
  "subtopic": "Primary vs Secondary",
  "specialization": "Volatility",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which hardware component preserves files across a complete power shutdown vs clears contents when power cuts?",
    "ar": "أي مكوّن يحتفظ بالملفات بعد إطفاء الجهاز تماماً مقارنةً بالذاكرة التي تفرغ محتواها عند انقطاع الكهرباء؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Volatile DRAM preserves files across reboots while SSD drives reset to zeros",
        "ar": "الذاكرة RAM تحفظ الملفات بعد الإغلاق بينما يصفّر قرص SSD"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "CPU L1 cache persists all application binaries permanently across power cycles",
        "ar": "مخبأ L1 يحتفظ بكل البرامج بشكل دائم عند قطع التيار"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Both RAM and SSD wipe stored contents equally on shutdown unless backed by GPU VRAM",
        "ar": "كلاهما يفقد البيانات بالتساوي ما لم يتصل بذاكرة الرسوميات"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Non-volatile SSD/HDD storage preserves files; volatile DRAM (RAM) clears them",
        "ar": "تخزين SSD/HDD الدائم يحفظ الملفات بينما تفرغ الذاكرة المتطايرة RAM محتواها"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "DRAM requires continuous electrical refresh pulses and clears rapidly on power loss, whereas Flash SSD/magnetic platters store persistent bytes.",
    "ar": "ذاكرة RAM متطايرة تفقد شحنتها فور الإغلاق بينما يحتفظ قرص SSD بالملفات بشكل دائم."
  },
  "tags": [
    "hardware",
    "ram",
    "ssd"
  ]
} as AssessmentQuestion,
{
  "id": "PF-MEM-E-002",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Memory Fundamentals",
  "subtopic": "Stack vs Heap",
  "specialization": "Lifetime Rules",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "When do ordinary local variables allocated on the Call Stack automatically vanish?",
    "ar": "متى تتحرر المتغيرات المحلية المحجوزة على مكدس الاستدعاء (Call Stack) تلقائياً؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Only when the operating system reboots",
        "ar": "فقط عند إعادة تشغيل النظام"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Immediately when their enclosing function scope returns and pops its stack frame",
        "ar": "فور انتهاء الدالة أو الخروج من نطاقها وانبثاق إطارها من الـ Stack"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Only after manually invoking `delete` inside callers",
        "ar": "فقط بعد استدعاء `delete` يدوياً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Only when Heap free capacity exceeds 90 percent",
        "ar": "فقط عند امتلاء Heap"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "Stack frames unwind LIFO on function return automatically with zero manual deallocation needed.",
    "ar": "إطار الدالة في Stack يزول تلقائياً بمجرد الخروج من الدالة بتكلفة ثابتة."
  },
  "tags": [
    "stack",
    "lifetime",
    "memory"
  ]
} as AssessmentQuestion,
{
  "id": "PF-MEM-M-004",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Memory Fundamentals",
  "subtopic": "Memory Leaks",
  "specialization": "Heap Cleanup",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Which condition directly defines a Memory Leak in a long-running C++ server process?",
    "ar": "ما التعريف الدقيق لتسرب الذاكرة (Memory Leak) في برنامج خادم يعمل لفترات طويلة؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "Local stack ints leaving scope when loops terminate",
        "ar": "تحرير متغيرات محلية بعد خروج الحلقة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Declaring too many read-only string literals cleanly",
        "ar": "كثرة النصوص الثابتة"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Using `std::unique_ptr` inside scoped handlers",
        "ar": "استخدام `unique_ptr` داخل المعالجات"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "Heap allocations remaining unfreed while references to them are lost across requests",
        "ar": "حجز كتل في Heap وعدم تحريرها بعد فقدان كل مؤشر يصل إليها عبر الزمن"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Lost unfreed heap chunks accumulate endlessly until Out-Of-Memory kills the service; RAII smart pointers eliminate this cleanly.",
    "ar": "تراكم الكتل المحجوزة غير المحررة يستنزف RAM حتى الانهيار، بينما تمنع المؤشرات الذكية RAII ذلك."
  },
  "tags": [
    "memory-leak",
    "heap",
    "raii"
  ]
} as AssessmentQuestion
];
