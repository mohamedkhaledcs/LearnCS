import { AssessmentQuestion } from '@/lib/assessment/schema';

export const primitive_types_questions: AssessmentQuestion[] = [
{
  "id": "PF-VAR-E-001",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Variables & Data Types",
  "subtopic": "Primitive Types",
  "specialization": "Memory",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which of the following data types typically occupies 8 bits (1 byte) of memory in most programming languages?",
    "ar": "أي من أنواع البيانات التالية تشغل عادةً 8 بت (1 بايت) من الذاكرة في معظم لغات البرمجة؟"
  },
  "options": [
    {
      "id": "integer",
      "text": {
        "en": "Integer",
        "ar": "Integer"
      }
    },
    {
      "id": "double",
      "text": {
        "en": "Double",
        "ar": "Double"
      }
    },
    {
      "id": "boolean",
      "text": {
        "en": "Boolean",
        "ar": "Boolean"
      }
    },
    {
      "id": "char",
      "text": {
        "en": "Char (ASCII)",
        "ar": "Char (ASCII)"
      }
    }
  ],
  "correctAnswer": "char",
  "explanation": {
    "en": "A standard 8-bit ASCII char occupies 1 byte (8 bits), whereas standard ints are typically 32 bits (4 bytes) and IEEE-754 doubles are 64 bits (8 bytes).",
    "ar": "يشغل النوع char (ASCII) بايتاً واحداً (8 بت) عادةً، بينما يشغل int غالباً 4 بايتات وdouble يشغل 8 بايتات."
  }
} as AssessmentQuestion,
{
  "id": "PRE-CPU-M-002",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Computer Basics",
  "subtopic": "Memory Hierarchy",
  "specialization": "CPU Cache Locality",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "Why does sequential traversal over a contiguous array run substantially faster on modern CPUs than traversing scattered nodes?",
    "ar": "لماذا يكون المرور المتسلسل على مصفوفة متجاورة أسرع بكثير من تتبع عقد متفرقة في الذاكرة؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Hardware preloads 64-byte cache lines holding neighboring array items on the first read",
        "ar": "لأن العتاد يحمّل Cache Line كاملاً يحوي العناصر المجاورة منذ أول قراءة"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "RAM chips permanently freeze pointers that are stored in non-contiguous memory blocks",
        "ar": "لأن ذاكرة RAM تجمّد المؤشرات الموجودة في الكتل غير المتجاورة"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Pointer dereferencing bypasses the ALU and forces full OS disk swapping per node",
        "ar": "لأن تتبع المؤشرات يتجاوز وحدة ALU ويفرض التبديل إلى القرص دائماً"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Modern CPUs execute pointer instructions in emulated 8-bit compatibility mode",
        "ar": "لأن المعالجات الحديثة تنفذ المؤشرات بوضع محاكاة 8-بت فقط"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Spatial locality inside 64-byte L1/L2 cache lines serves subsequent contiguous reads from ultra-fast SRAM cache instead of paying DRAM wait cycles.",
    "ar": "التقارب المكاني داخل Cache Line يجعل قراءات المصفوفة المتتالية تصيب الـ Cache مباشرة دون انتظار DRAM."
  },
  "tags": [
    "hardware",
    "cache",
    "architecture"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-REP-E-002",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Data Representation",
  "subtopic": "Hexadecimal",
  "specialization": "Base-16 Conversion",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "What decimal integer equals the hexadecimal literal `0x2A`?",
    "ar": "ما القيمة العشرية للرقم السداسي عشري `0x2A`؟"
  },
  "options": [
    {
      "id": "a",
      "text": {
        "en": "30 decimal (`2 * 10 + 10`)",
        "ar": "30 عشري (`2 * 10 + 10`)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "42 decimal (`2 * 16 + 10`)",
        "ar": "42 عشري"
      }
    },
    {
      "id": "b",
      "text": {
        "en": "210 decimal (`2` concatenated with `10`)",
        "ar": "210 عشري"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "58 decimal (`3 * 16 + 10`)",
        "ar": "58 عشري"
      }
    }
  ],
  "correctAnswer": "c",
  "explanation": {
    "en": "In base-16, digit `2` represents `2 * 16 = 32` and digit `A` equals `10`, summing cleanly to `42`.",
    "ar": "في الأساس 16 تساوي الخانة الثانية `2 * 16 = 32` ويقابل الرمز `A` القيمة 10 ليكون المجموع 42."
  },
  "tags": [
    "binary",
    "hex",
    "number-systems"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-REP-M-004",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Data Representation",
  "subtopic": "Signed Integers",
  "specialization": "Two's Complement",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "What exact numerical range does an 8-bit SIGNED integer in Two's Complement span?",
    "ar": "ما النطاق العددي الدقيق الذي يمثله عدد صحيح مؤشَّر من 8 بت باستخدام المتمم الثنائي (Two's Complement)؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "From -127 through +128 inclusive",
        "ar": "من -127 إلى +128"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "From 0 through +255 unsigned only",
        "ar": "من 0 إلى +255 فقط"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "From -256 through +255 inclusive",
        "ar": "من -256 إلى +255"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "From -128 through +127 inclusive",
        "ar": "من -128 إلى +127 شاملاً الصفر"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "An n-bit signed two's complement integer covers `[-2^(n-1), 2^(n-1) - 1]`, which for `n = 8` is `-128` to `+127`.",
    "ar": "المدى لأي عرض n بت هو من `-2^(n-1)` إلى `2^(n-1) - 1` أي من -128 إلى 127 للبايت الواحد."
  },
  "tags": [
    "twos-complement",
    "binary",
    "integers"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-REP-E-005",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Data Representation",
  "subtopic": "Character Encoding",
  "specialization": "UTF-8 vs ASCII",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Why did UTF-8 become the universal default encoding over plain 7-bit ASCII across modern web platforms?",
    "ar": "لماذا أصبح ترميز UTF-8 هو المعيار العالمي السائد على الويب بدلاً من الاقتصار على ASCII ذي السبعة بتات؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Keeps ASCII compatibility while encoding Arabic and global scripts cleanly",
        "ar": "يحفظ توافق ASCII مع ترميز العربية وكل اللغات والرموز بأحجام مرنة"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "UTF-8 natively compresses binary PNG photo streams straight inside JSON strings",
        "ar": "يضغط الصور تلقائياً داخل النصوص لكنه يضاعف حجم الحروف الإنجليزية البسيطة وجوباً"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "Web browsers restrict standard JSON APIs exclusively to 7-bit ASCII byte offsets",
        "ar": "تفرض المتصفحات قيود ASCII 7-بت على واجهات JSON ما لم يُعطّل الفحص في الإعدادات"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Browsers restrict JSON APIs strictly to ASCII byte 0x7F unless disabled",
        "ar": "لأن المتصفحات تمنع JSON بالرموز الدولية"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Valid ASCII bytes (`0x00..0x7F`) are identical in UTF-8, while multi-byte sequences seamlessly cover over a million Unicode code points.",
    "ar": "الأحرف الإنجليزية في UTF-8 تطابق ASCII في بايت واحد، مع ترميز بقية اللغات مثل العربية باستخدام 2 إلى 4 بايت."
  },
  "tags": [
    "utf8",
    "ascii",
    "unicode"
  ]
} as AssessmentQuestion,
{
  "id": "PRE-PRG-M-003",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Compilation",
  "subtopic": "Toolchains",
  "specialization": "AOT vs JIT",
  "difficulty": "medium",
  "type": "concept",
  "question": {
    "en": "How does a managed runtime like .NET CLR or JVM differ cleanly from pure ahead-of-time C++ compilation?",
    "ar": "كيف يختلف تنفيذ برامج .NET أو Java (Managed Runtime) عن الترجمة المباشرة الكاملة AOT في C++؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "Managed languages execute ASCII characters directly without compiling any representation",
        "ar": "تنفذ النصوص مباشرة بدون ترجمة وسيطة نهائياً"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "Managed platforms compile source to intermediate bytecode, then JIT-compile and run GC memory safety",
        "ar": "تُترجم للغة وسيطة Bytecode ثم يترجمها محرك JIT أثناء التشغيل مع إدارة ذاكرة آمنة (GC)"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "C++ relies strictly on browser JavaScript engines during desktop binary linking",
        "ar": "تعتمد C++ على متصفح الويب للربط"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "Managed bytecode stores all integer variables exclusively inside disk databases",
        "ar": "تخزن Bytecode كل المتغيرات على القرص الصلب"
      }
    }
  ],
  "correctAnswer": "a",
  "explanation": {
    "en": "Intermediate IL/Bytecode balances platform portability with Just-In-Time native machine optimization.",
    "ar": "الشفرة الوسيطة تحقق التوافق بين الأنظمة مع تحسين الأداء لحظة التشغيل عبر JIT."
  },
  "tags": [
    "compilers",
    "jit",
    "architecture"
  ]
} as AssessmentQuestion,
{
  "id": "PF-VAR-E-005",
  "language": "both",
  "domain": "Programming Fundamentals",
  "topic": "Variables & Data Types",
  "subtopic": "Primitive Types",
  "specialization": "Boolean vs String",
  "difficulty": "easy",
  "type": "concept",
  "question": {
    "en": "Which JavaScript expression evaluates to `true` despite a subtle loose-coercion bug (`==` vs `===`)?",
    "ar": "أي تعبير في JavaScript يعطي `true` بسبب التحويل الضمني رغم خطأ اختلاف النوع عند استخدام `==`؟"
  },
  "options": [
    {
      "id": "b",
      "text": {
        "en": "\"5\" == 5",
        "ar": "\"5\" == 5"
      }
    },
    {
      "id": "a",
      "text": {
        "en": "\"5\" === 5",
        "ar": "\"5\" === 5"
      }
    },
    {
      "id": "c",
      "text": {
        "en": "false === 0",
        "ar": "false === 0"
      }
    },
    {
      "id": "d",
      "text": {
        "en": "null === undefined",
        "ar": "null === undefined"
      }
    }
  ],
  "correctAnswer": "b",
  "explanation": {
    "en": "Loose equality `==` coerces strings to numbers silently (`\"5\" == 5` is true), whereas strict `===` checks both type and value.",
    "ar": "المقارنة المَرِنة `==` تحول النص لرقم ضمنياً، لذا يفضل المبرمجون `===` الصارمة في النوع والقيمة."
  },
  "tags": [
    "coercion",
    "javascript",
    "types"
  ]
} as AssessmentQuestion
];
